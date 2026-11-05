import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
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
import { INITIAL_SEED_PRODUCTS } from '../data/seedCatalog';

// Firebase Configuration (read from environment or parent .env)
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

export const COLLECTION_PRODUCTS = 'products';
export const COLLECTION_CATEGORIES = 'categories';
export const COLLECTION_ORDERS = 'orders';

const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('leoverse_firestore_sync')
  : null;

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
    console.info('[Admin Firebase] Connected to:', firebaseConfig.projectId);
  } catch (err) {
    console.warn('[Admin Firebase] Init error, falling back to local sync:', err);
  }
}

export { app, db, storage, auth };

// Storage Upload
export async function uploadImageToStorage(file, folder = 'products') {
  if (storage && isFirebaseConfigured) {
    try {
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const storageRef = ref(storage, `${folder}/${filename}`);
      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    } catch (err) {
      console.error('[Admin Firebase Storage] Upload failed:', err);
    }
  }

  // Fallback to local Data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Local storage fallback key
const LOCAL_PRODUCTS_KEY = 'leoverse_firestore_products';
const STOREFRONT_API = 'http://localhost:5173/api/products';

function broadcastToStorefront(payload) {
  if (typeof window === 'undefined') return;
  try {
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage(payload, '*');
    }
    if (syncChannel) {
      syncChannel.postMessage(payload);
    }
  } catch (err) {
    console.debug('[Broadcast error]', err);
  }
}

async function syncWithStorefrontApi(method, path = '', body = null) {
  try {
    const res = await fetch(`${STOREFRONT_API}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    return await res.json();
  } catch (err) {
    console.debug('[Storefront API sync skipped]', err?.message);
    return null;
  }
}

function getLocalProducts() {
  if (typeof window === 'undefined') return INITIAL_SEED_PRODUCTS;
  try {
    const raw = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Auto-heal any stale local paths to modern high-res Unsplash photography
        let needsUpdate = false;
        const seedMap = new Map(INITIAL_SEED_PRODUCTS.map((p) => [p.id, p]));
        const sanitized = parsed.map((prod) => {
          const hasStaleLocal = (prod.images || []).some(
            (img) =>
              typeof img === 'string' &&
              (img.startsWith('/images/products/') || img.includes('1620012253295'))
          );
          if (hasStaleLocal && seedMap.has(prod.id)) {
            needsUpdate = true;
            return {
              ...prod,
              images: seedMap.get(prod.id).images,
            };
          }
          return prod;
        });

        if (needsUpdate) {
          localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(sanitized));
        }
        return sanitized;
      }
    }
    // Auto-populate initial catalog if empty so the dashboard is immediately rich & populated!
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(INITIAL_SEED_PRODUCTS));
    return INITIAL_SEED_PRODUCTS;
  } catch {
    return INITIAL_SEED_PRODUCTS;
  }
}

function saveLocalProducts(products) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
    if (syncChannel) {
      syncChannel.postMessage({ type: 'PRODUCTS_UPDATED', timestamp: Date.now() });
    }
  } catch (err) {
    console.error('Failed to save products:', err);
  }
}

/**
 * Subscribe to all products for the Admin Portal
 */
export function subscribeToAllProducts(callback) {
  if (db && isFirebaseConfigured) {
    try {
      const q = query(collection(db, COLLECTION_PRODUCTS));
      return onSnapshot(
        q,
        (snapshot) => {
          const prods = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }));
          callback(prods.length > 0 ? prods : getLocalProducts());
        },
        (err) => {
          console.error('[Firestore Admin] onSnapshot error:', err);
          callback(getLocalProducts());
        }
      );
    } catch (err) {
      console.warn('[Firestore Admin] query error:', err);
    }
  }

  // Local fallback
  const emitLocal = () => callback(getLocalProducts());
  emitLocal();

  const handleMessage = (e) => {
    if (e.data?.type === 'PRODUCTS_UPDATED' || e.data?.type === 'LEOVERSE_BRIDGE_SYNC') {
      emitLocal();
    }
  };
  const handleStorage = (e) => {
    if (e.key === LOCAL_PRODUCTS_KEY) emitLocal();
  };

  if (syncChannel) syncChannel.addEventListener('message', handleMessage);
  window.addEventListener('storage', handleStorage);

  return () => {
    if (syncChannel) syncChannel.removeEventListener('message', handleMessage);
    window.removeEventListener('storage', handleStorage);
  };
}

/**
 * Add a new product to Firestore / Local / Storefront API
 */
export async function createProduct(productData) {
  const cleanData = {
    ...productData,
    isPublished: productData.isPublished ?? true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  let createdProduct = null;

  if (db && isFirebaseConfigured) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_PRODUCTS), {
        ...cleanData,
        serverCreatedAt: serverTimestamp(),
      });
      createdProduct = { id: docRef.id, ...cleanData };
    } catch (err) {
      console.error('[Firestore Admin] addDoc failed:', err);
    }
  }

  if (!createdProduct) {
    const newId = `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    createdProduct = { ...cleanData, id: newId };
  }

  // Local save
  const localList = getLocalProducts();
  const nextList = [createdProduct, ...localList.filter((p) => p.id !== createdProduct.id)];
  saveLocalProducts(nextList);

  // Sync to Storefront API (SQLite)
  syncWithStorefrontApi('POST', '', createdProduct);

  // Broadcast to Storefront Tab
  broadcastToStorefront({
    type: 'LEOVERSE_PRODUCT_CREATED',
    product: createdProduct,
    allProducts: nextList,
  });

  return createdProduct;
}

/**
 * Update an existing product
 */
export async function updateProduct(id, updates) {
  const cleanUpdates = {
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  if (db && isFirebaseConfigured) {
    try {
      const docRef = doc(db, COLLECTION_PRODUCTS, id);
      await updateDoc(docRef, cleanUpdates);
    } catch (err) {
      console.error('[Firestore Admin] updateDoc failed:', err);
    }
  }

  const localList = getLocalProducts();
  const updatedList = localList.map((p) => (p.id === id ? { ...p, ...cleanUpdates } : p));
  saveLocalProducts(updatedList);

  // Sync to Storefront API (SQLite)
  syncWithStorefrontApi('PUT', `/${id}`, cleanUpdates);

  // Broadcast to Storefront Tab
  broadcastToStorefront({
    type: 'LEOVERSE_PRODUCT_UPDATED',
    id,
    updates: cleanUpdates,
    product: updatedList.find((p) => p.id === id),
    allProducts: updatedList,
  });

  return { id, ...cleanUpdates };
}

/**
 * Delete a product
 */
export async function deleteProduct(id) {
  if (db && isFirebaseConfigured) {
    try {
      const docRef = doc(db, COLLECTION_PRODUCTS, id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error('[Firestore Admin] deleteDoc failed:', err);
    }
  }

  const localList = getLocalProducts();
  const remaining = localList.filter((p) => p.id !== id);
  saveLocalProducts(remaining);

  // Sync to Storefront API (SQLite)
  syncWithStorefrontApi('DELETE', `/${id}`);

  // Broadcast to Storefront Tab
  broadcastToStorefront({
    type: 'LEOVERSE_PRODUCT_DELETED',
    id,
    allProducts: remaining,
  });

  return true;
}

/**
 * Toggle Publish status
 */
export async function toggleProductPublish(id, isPublished) {
  const res = await updateProduct(id, { isPublished });
  syncWithStorefrontApi('POST', `/${id}/toggle-publish`);
  broadcastToStorefront({
    type: 'LEOVERSE_PRODUCT_TOGGLED',
    id,
    isPublished,
  });
  return res;
}

/**
 * Seed master catalog into Firestore / local
 */
export async function seedCatalogToFirestore(items = INITIAL_SEED_PRODUCTS) {
  if (!items || items.length === 0) return 0;
  if (db && isFirebaseConfigured) {
    try {
      let count = 0;
      for (const item of items) {
        const docRef = doc(db, COLLECTION_PRODUCTS, item.id || `prod_${count}`);
        await setDoc(docRef, {
          ...item,
          isPublished: item.isPublished ?? true,
          seededAt: new Date().toISOString(),
        }, { merge: true });
        count++;
      }
    } catch (err) {
      console.error('[Firestore Admin] Seed error:', err);
    }
  }

  const existing = getLocalProducts();
  const idMap = new Set(existing.map((e) => e.id));
  const merged = [...existing];
  for (const item of items) {
    if (!idMap.has(item.id)) {
      merged.push({ ...item, isPublished: item.isPublished ?? true });
    }
  }
  saveLocalProducts(merged);

  broadcastToStorefront({
    type: 'LEOVERSE_CATALOG_SEEDED',
    allProducts: merged,
  });

  return merged.length;
}
