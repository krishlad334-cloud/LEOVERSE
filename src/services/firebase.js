import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// -------------------------------------------------------------
// Firebase Configuration
// -------------------------------------------------------------
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'YOUR_API_KEY' &&
  !firebaseConfig.apiKey.includes('placeholder')
);

// Collections
export const COLLECTION_PRODUCTS = 'products';
export const COLLECTION_CATEGORIES = 'categories';
export const COLLECTION_ORDERS = 'orders';

// Reactive local channel for fallback cross-tab sync when running offline/local
const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('leoverse_firestore_sync')
  : null;

// Initialize Firebase App
let app = null;
let db = null;
let storage = null;
let auth = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
    auth = getAuth(app);
    console.info('[Firebase] Connected to Firebase Project:', firebaseConfig.projectId);
  } catch (err) {
    console.warn('[Firebase] Initialization error, falling back to local reactive storage:', err);
    app = null;
    db = null;
    storage = null;
    auth = null;
  }
} else {
  console.info('[Firebase] VITE_FIREBASE_API_KEY not configured. Running in Local-Reactive fallback mode with BroadcastChannel cross-tab sync.');
}

export { app, db, storage, auth };

// -------------------------------------------------------------
// Storage Helpers
// -------------------------------------------------------------

/**
 * Upload an image file to Firebase Storage (with local data URL fallback)
 * @param {File} file 
 * @param {string} folder 
 * @returns {Promise<string>} Download URL
 */
export async function uploadImageToStorage(file, folder = 'products') {
  if (storage && isFirebaseConfigured) {
    try {
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const storageRef = ref(storage, `${folder}/${filename}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (error) {
      console.error('[Firebase Storage] Upload failed, falling back to local object URL:', error);
    }
  }

  // Fallback: Convert to persistent Data URL / Object URL for local/offline demo
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Delete an image from Firebase Storage
 */
export async function deleteImageFromStorage(url) {
  if (!storage || !isFirebaseConfigured || !url || !url.includes('firebasestorage')) {
    return;
  }
  try {
    const fileRef = ref(storage, url);
    await deleteObject(fileRef);
  } catch (err) {
    console.warn('[Firebase Storage] Delete failed or file not found:', err);
  }
}

// -------------------------------------------------------------
// Firestore Helpers for Products
// -------------------------------------------------------------

const LOCAL_PRODUCTS_KEY = 'leoverse_firestore_products';

function getLocalProducts() {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveLocalProducts(products) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
    if (syncChannel) {
      syncChannel.postMessage({ type: 'PRODUCTS_UPDATED', timestamp: Date.now() });
    }
  } catch (e) {
    console.error('Failed to write local products:', e);
  }
}

/**
 * Subscribe to Published Products (For Customer Storefront)
 * Automatically syncs in real-time with Firestore onSnapshot,
 * and falls back to BroadcastChannel for local development.
 * @param {(products: Array) => void} callback 
 * @returns {() => void} unsubscribe function
 */
export function subscribeToPublishedProducts(callback) {
  if (db && isFirebaseConfigured) {
    try {
      const q = query(
        collection(db, COLLECTION_PRODUCTS),
        where('isPublished', '==', true)
      );
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const products = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }));
          callback(products);
        },
        (error) => {
          console.error('[Firestore] subscribeToPublishedProducts error:', error);
          // Fallback to local
          const local = getLocalProducts().filter((p) => p.isPublished !== false);
          callback(local);
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn('[Firestore] Query error, falling back to local:', err);
    }
  }

  // Fallback: Local reactive subscription + Cross-Origin Bridge
  const emitLocal = () => {
    const all = getLocalProducts();
    const published = all.filter((p) => p.isPublished !== false);
    callback(published);

    // Asynchronously sync with SQLite API /api/products
    if (typeof fetch !== 'undefined') {
      fetch('/api/products')
        .then((r) => (r.ok ? r.json() : []))
        .then((apiProds) => {
          if (Array.isArray(apiProds) && apiProds.length > 0) {
            const current = getLocalProducts();
            const currentIds = new Set(current.map((p) => p.id));
            let hasNew = false;
            const merged = [...current];
            apiProds.forEach((ap) => {
              if (!currentIds.has(ap.id)) {
                merged.unshift(ap);
                hasNew = true;
              }
            });
            if (hasNew) {
              saveLocalProducts(merged);
              callback(merged.filter((p) => p.isPublished !== false));
            }
          }
        })
        .catch(() => {});
    }
  };

  emitLocal();

  // Setup invisible cross-origin bridge iframe to port 5174 (Admin Studio)
  if (typeof document !== 'undefined' && !document.getElementById('leoverse-admin-bridge')) {
    try {
      const bridgeFrame = document.createElement('iframe');
      bridgeFrame.id = 'leoverse-admin-bridge';
      bridgeFrame.src = 'http://localhost:5174/bridge.html';
      bridgeFrame.style.display = 'none';
      bridgeFrame.style.width = '0';
      bridgeFrame.style.height = '0';
      bridgeFrame.style.border = 'none';
      document.body.appendChild(bridgeFrame);
    } catch (e) {
      console.debug('[Bridge Frame skipped]', e);
    }
  }

  const handleMessage = (e) => {
    // 1. BroadcastChannel or window.postMessage
    if (e.data?.type === 'PRODUCTS_UPDATED') {
      emitLocal();
      return;
    }

    // 2. Direct Cross-Origin Product Creation from Admin (Port 5174)
    if (e.data?.type === 'LEOVERSE_PRODUCT_CREATED' && e.data.product) {
      const current = getLocalProducts();
      const next = [e.data.product, ...current.filter((p) => p.id !== e.data.product.id)];
      saveLocalProducts(next);
      emitLocal();
      return;
    }

    // 3. Product Updates from Admin
    if (e.data?.type === 'LEOVERSE_PRODUCT_UPDATED' && e.data.id) {
      const current = getLocalProducts();
      const next = current.map((p) => (p.id === e.data.id ? { ...p, ...e.data.updates } : p));
      saveLocalProducts(next);
      emitLocal();
      return;
    }

    // 4. Product Deletion
    if (e.data?.type === 'LEOVERSE_PRODUCT_DELETED' && e.data.id) {
      const current = getLocalProducts();
      const next = current.filter((p) => p.id !== e.data.id);
      saveLocalProducts(next);
      emitLocal();
      return;
    }

    // 5. Product Toggle
    if (e.data?.type === 'LEOVERSE_PRODUCT_TOGGLED' && e.data.id) {
      const current = getLocalProducts();
      const next = current.map((p) => (p.id === e.data.id ? { ...p, isPublished: e.data.isPublished } : p));
      saveLocalProducts(next);
      emitLocal();
      return;
    }

    // 6. Bridge Full Sync
    if ((e.data?.type === 'LEOVERSE_BRIDGE_SYNC' || e.data?.type === 'LEOVERSE_CATALOG_SEEDED') && Array.isArray(e.data.products || e.data.allProducts)) {
      const list = e.data.products || e.data.allProducts;
      if (list.length > 0) {
        saveLocalProducts(list);
        emitLocal();
      }
    }
  };

  const handleStorage = (e) => {
    if (e.key === LOCAL_PRODUCTS_KEY) {
      emitLocal();
    }
  };

  const handleFocus = () => {
    emitLocal();
  };

  if (syncChannel) syncChannel.addEventListener('message', handleMessage);
  window.addEventListener('message', handleMessage);
  window.addEventListener('storage', handleStorage);
  window.addEventListener('focus', handleFocus);

  return () => {
    if (syncChannel) syncChannel.removeEventListener('message', handleMessage);
    window.removeEventListener('message', handleMessage);
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener('focus', handleFocus);
  };
}

/**
 * Subscribe to All Products (For Admin Dashboard)
 * Shows both published and draft products.
 * @param {(products: Array) => void} callback 
 * @returns {() => void} unsubscribe function
 */
export function subscribeToAllProducts(callback) {
  if (db && isFirebaseConfigured) {
    try {
      const q = query(collection(db, COLLECTION_PRODUCTS));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const products = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }));
          callback(products);
        },
        (error) => {
          console.error('[Firestore] subscribeToAllProducts error:', error);
          callback(getLocalProducts());
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn('[Firestore] Error subscribing to all products:', err);
    }
  }

  // Local fallback
  const emitLocal = () => callback(getLocalProducts());
  emitLocal();

  const handleMessage = (e) => {
    if (e.data?.type === 'PRODUCTS_UPDATED') {
      emitLocal();
    }
  };

  const handleStorage = (e) => {
    if (e.key === LOCAL_PRODUCTS_KEY) {
      emitLocal();
    }
  };

  if (syncChannel) syncChannel.addEventListener('message', handleMessage);
  window.addEventListener('storage', handleStorage);

  return () => {
    if (syncChannel) syncChannel.removeEventListener('message', handleMessage);
    window.removeEventListener('storage', handleStorage);
  };
}

/**
 * Add a new product to Firestore
 */
export async function createFirestoreProduct(productData) {
  const cleanData = {
    ...productData,
    isPublished: productData.isPublished ?? true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (db && isFirebaseConfigured) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_PRODUCTS), {
        ...cleanData,
        serverCreatedAt: serverTimestamp(),
      });
      return { id: docRef.id, ...cleanData };
    } catch (err) {
      console.error('[Firestore] addDoc failed, writing locally:', err);
    }
  }

  // Fallback: Local save
  const localList = getLocalProducts();
  const newProduct = {
    ...cleanData,
    id: `prod_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  };
  saveLocalProducts([newProduct, ...localList]);
  return newProduct;
}

/**
 * Update an existing product in Firestore
 */
export async function updateFirestoreProduct(id, updates) {
  const cleanUpdates = {
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  if (db && isFirebaseConfigured) {
    try {
      const docRef = doc(db, COLLECTION_PRODUCTS, id);
      await updateDoc(docRef, cleanUpdates);
      return { id, ...cleanUpdates };
    } catch (err) {
      console.error('[Firestore] updateDoc failed, writing locally:', err);
    }
  }

  // Fallback: Local update
  const localList = getLocalProducts();
  const updatedList = localList.map((p) => (p.id === id ? { ...p, ...cleanUpdates } : p));
  saveLocalProducts(updatedList);
  return { id, ...cleanUpdates };
}

/**
 * Delete a product from Firestore
 */
export async function deleteFirestoreProduct(id) {
  if (db && isFirebaseConfigured) {
    try {
      const docRef = doc(db, COLLECTION_PRODUCTS, id);
      await deleteDoc(docRef);
      return true;
    } catch (err) {
      console.error('[Firestore] deleteDoc failed, deleting locally:', err);
    }
  }

  // Fallback: Local delete
  const localList = getLocalProducts();
  saveLocalProducts(localList.filter((p) => p.id !== id));
  return true;
}

/**
 * Toggle Publish status of a product
 */
export async function toggleFirestoreProductPublish(id, isPublished) {
  return updateFirestoreProduct(id, { isPublished });
}

/**
 * Seed Firestore or Local Storage with initial catalog
 */
export async function seedFirestoreCatalog(initialProducts = []) {
  if (initialProducts.length === 0) return 0;

  if (db && isFirebaseConfigured) {
    try {
      let count = 0;
      for (const p of initialProducts) {
        const docRef = doc(db, COLLECTION_PRODUCTS, p.id || `prod_${count}`);
        await setDoc(docRef, {
          ...p,
          isPublished: p.isPublished ?? true,
          seededAt: new Date().toISOString(),
        }, { merge: true });
        count++;
      }
      return count;
    } catch (err) {
      console.error('[Firestore] Batch seed failed, saving locally:', err);
    }
  }

  // Local fallback
  const existing = getLocalProducts();
  const existingIds = new Set(existing.map((e) => e.id));
  const merged = [...existing];
  for (const p of initialProducts) {
    if (!existingIds.has(p.id)) {
      merged.push({ ...p, isPublished: p.isPublished ?? true });
    }
  }
  saveLocalProducts(merged);
  return merged.length;
}
