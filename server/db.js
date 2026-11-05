import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { seedCategories, seedProducts, seedOrders, seedReviews } from './seedData.js';

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_PATH = path.resolve(DB_DIR, 'ecommerce.db');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

export const db = new DatabaseSync(DB_PATH);

// Enable WAL mode & foreign keys for performance and reliability
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

// 1. Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    department TEXT NOT NULL,
    subcategories TEXT,
    image TEXT,
    itemCount INTEGER DEFAULT 0,
    createdAt TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT DEFAULT 'ATELIER LEO',
    department TEXT NOT NULL,
    category TEXT NOT NULL,
    categorySlug TEXT NOT NULL,
    subcategory TEXT,
    mrp REAL NOT NULL,
    sellingPrice REAL NOT NULL,
    stock INTEGER DEFAULT 50,
    sizes TEXT,
    colors TEXT,
    description TEXT,
    details TEXT,
    fabricCare TEXT,
    fit TEXT,
    tags TEXT,
    rating REAL DEFAULT 4.8,
    reviewCount INTEGER DEFAULT 0,
    isPublished INTEGER DEFAULT 1,
    isFeatured INTEGER DEFAULT 0,
    isNew INTEGER DEFAULT 0,
    isBestSeller INTEGER DEFAULT 0,
    createdAt TEXT,
    updatedAt TEXT
  );

  CREATE TABLE IF NOT EXISTS product_media (
    id TEXT PRIMARY KEY,
    productId TEXT,
    type TEXT NOT NULL, -- 'image' or 'video'
    url TEXT NOT NULL,
    thumbnailUrl TEXT,
    title TEXT,
    fileName TEXT,
    fileSize INTEGER DEFAULT 0,
    duration INTEGER DEFAULT 0,
    displayOrder INTEGER DEFAULT 0,
    viewsCount INTEGER DEFAULT 0,
    createdAt TEXT,
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS analytics_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    eventType TEXT NOT NULL,
    productId TEXT,
    mediaId TEXT,
    visitorId TEXT NOT NULL,
    watchDuration REAL DEFAULT 0,
    metadata TEXT,
    timestamp TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics_events(eventType, productId, timestamp);
  CREATE INDEX IF NOT EXISTS idx_analytics_visitor ON analytics_events(visitorId, productId);
  CREATE INDEX IF NOT EXISTS idx_analytics_media ON analytics_events(mediaId, eventType);

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    orderNumber TEXT UNIQUE NOT NULL,
    visitorId TEXT,
    customerName TEXT NOT NULL,
    customerEmail TEXT NOT NULL,
    customerPhone TEXT,
    shippingAddress TEXT,
    paymentMethod TEXT DEFAULT 'UPI / Cards',
    paymentStatus TEXT DEFAULT 'Paid',
    subtotal REAL NOT NULL,
    discount REAL DEFAULT 0,
    shippingFee REAL DEFAULT 0,
    totalAmount REAL NOT NULL,
    status TEXT DEFAULT 'Confirmed',
    createdAt TEXT
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId TEXT NOT NULL,
    productId TEXT NOT NULL,
    productName TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    size TEXT,
    color TEXT,
    FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    productId TEXT NOT NULL,
    userName TEXT NOT NULL,
    rating INTEGER NOT NULL,
    title TEXT,
    comment TEXT NOT NULL,
    verifiedPurchase INTEGER DEFAULT 1,
    likesCount INTEGER DEFAULT 0,
    createdAt TEXT,
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT NOT NULL,
    type TEXT DEFAULT 'newsletter',
    subject TEXT,
    message TEXT,
    targetEmail TEXT DEFAULT 'krishlad334@gmail.com',
    status TEXT DEFAULT 'new',
    createdAt TEXT
  );

  CREATE TABLE IF NOT EXISTS system_settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// 2. Seeder function to populate initial marketplace data if fresh or forced
export function seedDatabase(force = false) {
  const prodCount = db.prepare('SELECT COUNT(*) as cnt FROM products').get().cnt;
  // Also check if any old women/kids product exists
  const hasOldNonMenswear = db.prepare("SELECT COUNT(*) as cnt FROM products WHERE department IN ('Women', 'Kids')").get().cnt > 0;

  if (prodCount > 0 && !force && !hasOldNonMenswear) return;

  console.log('[DB] Seeding 100% Menswear Fashion Catalog into SQLite database...');

  // Wipe clean to ensure strictly pure menswear
  db.exec(`
    DELETE FROM order_items;
    DELETE FROM orders;
    DELETE FROM analytics_events;
    DELETE FROM product_media;
    DELETE FROM reviews;
    DELETE FROM products;
    DELETE FROM categories;
  `);

  const now = Date.now();
  const dayMs = 86400000;

  // Insert Categories
  const insertCat = db.prepare(`
    INSERT INTO categories (id, name, slug, department, subcategories, image, itemCount, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const c of seedCategories) {
    insertCat.run(c.id, c.name, c.slug, c.department, c.subcategories, c.image, c.itemCount, new Date(now - 30 * dayMs).toISOString());
  }

  // Insert Products & Media
  const insertProd = db.prepare(`
    INSERT INTO products (
      id, name, brand, department, category, categorySlug, subcategory,
      mrp, sellingPrice, stock, sizes, colors, description, details,
      fabricCare, fit, tags, rating, reviewCount, isPublished, isFeatured,
      isNew, isBestSeller, createdAt, updatedAt
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?
    )
  `);

  const insertMedia = db.prepare(`
    INSERT INTO product_media (
      id, productId, type, url, thumbnailUrl, title, fileName, fileSize, duration, displayOrder, viewsCount, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const productList = seedProducts;
  for (const p of productList) {
    const created = new Date(now - Math.floor(Math.random() * 20 + 10) * dayMs).toISOString();
    insertProd.run(
      p.id, p.name, p.brand, p.department, p.category, p.categorySlug, p.subcategory,
      p.mrp, p.sellingPrice, p.stock, p.sizes, p.colors, p.description, p.details,
      p.fabricCare, p.fit, p.tags, p.rating, p.reviewCount, p.isPublished, p.isFeatured,
      p.isNew, p.isBestSeller, created, created
    );

    // Insert Images
    if (Array.isArray(p.images)) {
      p.images.forEach((imgUrl, idx) => {
        const mediaId = `med-img-${p.id}-${idx + 1}`;
        insertMedia.run(
          mediaId,
          p.id,
          'image',
          imgUrl,
          imgUrl,
          `${p.name} - Gallery Photo ${idx + 1}`,
          `photo_${idx + 1}.jpg`,
          Math.floor(Math.random() * 1500000 + 500000),
          0,
          idx,
          0,
          created
        );
      });
    }

    // Insert Videos (100% male models)
    if (Array.isArray(p.videos)) {
      p.videos.forEach((vid, idx) => {
        const mediaId = `med-vid-${p.id}-${idx + 1}`;
        insertMedia.run(
          mediaId,
          p.id,
          'video',
          vid.url,
          vid.thumbnailUrl || p.images[0],
          vid.title || `${p.name} - Runway Video`,
          `runway_${idx + 1}.mp4`,
          Math.floor(Math.random() * 8000000 + 4000000),
          vid.duration || 18,
          idx,
          0,
          created
        );
      });
    }
  }

  // Insert pure menswear unassigned media
  insertMedia.run(
    'med-unassigned-01',
    null,
    'image',
    'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80',
    'Editorial Menswear Trench Coat Lookbook',
    'editorial_menswear_trench.jpg',
    1840000,
    0,
    0,
    14,
    new Date(now - 7 * dayMs).toISOString()
  );
  insertMedia.run(
    'med-unassigned-02',
    null,
    'video',
    '/videos/hero-fashion-male.mp4',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    'Studio Menswear Evening Suiting Reel',
    'menswear_suiting_reel.mp4',
    6420000,
    22,
    0,
    38,
    new Date(now - 5 * dayMs).toISOString()
  );

  // Insert Orders
  const insertOrder = db.prepare(`
    INSERT INTO orders (
      id, orderNumber, visitorId, customerName, customerEmail, customerPhone,
      shippingAddress, paymentMethod, paymentStatus, subtotal, discount, shippingFee,
      totalAmount, status, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertOrderItem = db.prepare(`
    INSERT INTO order_items (orderId, productId, productName, price, quantity, size, color)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const o of seedOrders) {
    insertOrder.run(
      o.id, o.orderNumber, o.visitorId, o.customerName, o.customerEmail, o.customerPhone,
      o.shippingAddress, o.paymentMethod, o.paymentStatus, o.subtotal, o.discount, o.shippingFee,
      o.totalAmount, o.status, o.createdAt
    );
    for (const item of o.items) {
      insertOrderItem.run(o.id, item.productId, item.productName, item.price, item.quantity, item.size, item.color);
    }
  }

  // Insert Reviews
  const insertReview = db.prepare(`
    INSERT INTO reviews (id, productId, userName, rating, title, comment, verifiedPurchase, likesCount, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const r of seedReviews) {
    insertReview.run(r.id, r.productId, r.userName, r.rating, r.title, r.comment, r.verifiedPurchase, r.likesCount, r.createdAt);
  }

  // Generate realistic historical analytics events across past 30 days
  const insertEvent = db.prepare(`
    INSERT INTO analytics_events (eventType, productId, mediaId, visitorId, watchDuration, metadata, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const mediaRows = db.prepare('SELECT id, productId, type FROM product_media').all();
  const mediaByProduct = {};
  for (const m of mediaRows) {
    if (!m.productId) continue;
    if (!mediaByProduct[m.productId]) mediaByProduct[m.productId] = { images: [], videos: [] };
    if (m.type === 'image') mediaByProduct[m.productId].images.push(m.id);
    else mediaByProduct[m.productId].videos.push(m.id);
  }

  const visitors = Array.from({ length: 60 }, (_, i) => `v_${1000 + i}`);

  for (let dayOffset = 30; dayOffset >= 0; dayOffset--) {
    const dayTimestamp = new Date(now - dayOffset * dayMs);
    const dayIso = dayTimestamp.toISOString();

    for (const prod of productList) {
      const visitorCountThisDay = Math.floor(Math.random() * 8 + 3);
      const prodMedia = mediaByProduct[prod.id] || { images: [], videos: [] };

      for (let v = 0; v < visitorCountThisDay; v++) {
        const visitorId = visitors[(v * 7 + dayOffset * 3) % visitors.length];
        
        const viewsCount = Math.random() < 0.35 ? 2 : 1;
        for (let viewIdx = 0; viewIdx < viewsCount; viewIdx++) {
          insertEvent.run('page_view', prod.id, null, visitorId, 0, null, dayIso);
        }

        for (const imgId of prodMedia.images) {
          if (Math.random() > 0.25) {
            insertEvent.run('image_view', prod.id, imgId, visitorId, 0, null, dayIso);
            db.prepare('UPDATE product_media SET viewsCount = viewsCount + 1 WHERE id = ?').run(imgId);
          }
        }

        for (const vidId of prodMedia.videos) {
          if (Math.random() < 0.45) {
            const duration = Math.floor(Math.random() * 16 + 6);
            insertEvent.run('video_play', prod.id, vidId, visitorId, 0, null, dayIso);
            insertEvent.run('video_watch', prod.id, vidId, visitorId, duration, null, dayIso);
            db.prepare('UPDATE product_media SET viewsCount = viewsCount + 1 WHERE id = ?').run(vidId);
          }
        }

        if (Math.random() < 0.15) {
          insertEvent.run('wishlist_add', prod.id, null, visitorId, 0, null, dayIso);
        }

        if (Math.random() < 0.12) {
          insertEvent.run('cart_add', prod.id, null, visitorId, 0, null, dayIso);
        }
      }
    }
  }

  for (const o of seedOrders) {
    for (const item of o.items) {
      insertEvent.run('order_placed', item.productId, null, o.visitorId || 'v_unknown', 0, JSON.stringify({ orderId: o.id, amount: item.price * item.quantity }), o.createdAt);
    }
  }

  console.log('[DB] Pure Menswear Seeding completed successfully!');
}

// Automatically seed on initialization if fresh or needed
seedDatabase(false);

// ==========================================
// 3. Database Operations & Helper Functions
// ==========================================

export function getAllCategories() {
  return db.prepare('SELECT * FROM categories ORDER BY name').all();
}

export function createCategory(cat) {
  const id = cat.id || `cat-${Date.now()}`;
  const slug = cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const createdAt = new Date().toISOString();
  db.prepare(`
    INSERT INTO categories (id, name, slug, department, subcategories, image, itemCount, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    cat.name,
    slug,
    cat.department || "Men's Apparel",
    typeof cat.subcategories === 'string' ? cat.subcategories : JSON.stringify(cat.subcategories || []),
    cat.image || '',
    Number(cat.itemCount || 0),
    createdAt
  );
  return db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
}

export function updateCategory(id, updates) {
  const existing = db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
  if (!existing) return null;

  db.prepare(`
    UPDATE categories SET
      name = COALESCE(?, name),
      department = COALESCE(?, department),
      subcategories = COALESCE(?, subcategories),
      image = COALESCE(?, image),
      itemCount = COALESCE(?, itemCount)
    WHERE id = ?
  `).run(
    updates.name ?? null,
    updates.department ?? null,
    updates.subcategories ? (typeof updates.subcategories === 'string' ? updates.subcategories : JSON.stringify(updates.subcategories)) : null,
    updates.image ?? null,
    updates.itemCount !== undefined ? Number(updates.itemCount) : null,
    id
  );
  return db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
}

export function deleteCategory(id) {
  return db.prepare('DELETE FROM categories WHERE id = ?').run(id);
}

export function getProducts(filters = {}) {
  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (filters.categorySlug) {
    query += ' AND categorySlug = ?';
    params.push(filters.categorySlug);
  }

  if (filters.department && filters.department !== 'All') {
    if (filters.department.toLowerCase() === 'men') {
      query += ' AND LOWER(department) LIKE ?';
      params.push('%men%');
    } else {
      query += ' AND LOWER(department) LIKE ?';
      params.push(`%${filters.department.toLowerCase()}%`);
    }
  }

  if (filters.category && filters.category !== 'All') {
    query += ' AND LOWER(category) = LOWER(?)';
    params.push(filters.category);
  }

  if (filters.subcategory && filters.subcategory !== 'All') {
    query += ' AND LOWER(subcategory) = LOWER(?)';
    params.push(filters.subcategory);
  }

  if (filters.search) {
    query += ' AND (LOWER(name) LIKE ? OR LOWER(brand) LIKE ? OR LOWER(description) LIKE ? OR LOWER(tags) LIKE ?)';
    const s = `%${filters.search.toLowerCase()}%`;
    params.push(s, s, s, s);
  }

  if (filters.minPrice) {
    query += ' AND sellingPrice >= ?';
    params.push(Number(filters.minPrice));
  }

  if (filters.maxPrice) {
    query += ' AND sellingPrice <= ?';
    params.push(Number(filters.maxPrice));
  }

  if (filters.inStock === 'true' || filters.inStock === true) {
    query += ' AND stock > 0';
  }

  if (filters.publishedOnly === 'true' || filters.publishedOnly === true || filters.publishedOnly === 1) {
    query += ' AND isPublished = 1';
  }

  switch (filters.sort) {
    case 'price-asc':
      query += ' ORDER BY sellingPrice ASC';
      break;
    case 'price-desc':
      query += ' ORDER BY sellingPrice DESC';
      break;
    case 'rating':
      query += ' ORDER BY rating DESC, reviewCount DESC';
      break;
    case 'newest':
      query += ' ORDER BY createdAt DESC';
      break;
    case 'discount':
      query += ' ORDER BY ((mrp - sellingPrice) / mrp) DESC';
      break;
    default:
      query += ' ORDER BY isFeatured DESC, isBestSeller DESC, createdAt DESC';
  }

  const rows = db.prepare(query).all(...params);
  return rows.map(attachProductMedia);
}

export function getProductById(id) {
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  if (!row) return null;
  return attachProductMedia(row);
}

function attachProductMedia(product) {
  const media = db.prepare('SELECT * FROM product_media WHERE productId = ? ORDER BY displayOrder ASC, createdAt ASC').all(product.id);
  const images = media.filter(m => m.type === 'image');
  const videos = media.filter(m => m.type === 'video');

  const discountPercent = product.mrp > 0 ? Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100) : 0;

  return {
    ...product,
    discountPercent,
    sizes: safeJsonParse(product.sizes, []),
    colors: safeJsonParse(product.colors, []),
    details: safeJsonParse(product.details, []),
    tags: safeJsonParse(product.tags, []),
    images: images.map(m => m.url),
    imageMedia: images,
    videos: videos.map(v => ({
      id: v.id,
      url: v.url,
      thumbnailUrl: v.thumbnailUrl || (images[0] ? images[0].url : ''),
      title: v.title,
      duration: v.duration,
      viewsCount: v.viewsCount
    })),
    media
  };
}

function safeJsonParse(str, fallback) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

export function createProduct(prod) {
  const id = prod.id || `prod-${Date.now()}`;
  const now = new Date().toISOString();
  const categorySlug = prod.categorySlug || (prod.category ? prod.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : 'general');

  db.prepare(`
    INSERT INTO products (
      id, name, brand, department, category, categorySlug, subcategory,
      mrp, sellingPrice, stock, sizes, colors, description, details,
      fabricCare, fit, tags, rating, reviewCount, isPublished, isFeatured,
      isNew, isBestSeller, createdAt, updatedAt
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?
    )
  `).run(
    id,
    prod.name,
    prod.brand || 'ATELIER LEO',
    prod.department || "Men's Apparel",
    prod.category || 'Shirts & Polos',
    categorySlug,
    prod.subcategory || '',
    Number(prod.mrp || prod.sellingPrice || 0),
    Number(prod.sellingPrice || 0),
    Number(prod.stock ?? 50),
    typeof prod.sizes === 'string' ? prod.sizes : JSON.stringify(prod.sizes || ['S', 'M', 'L', 'XL']),
    typeof prod.colors === 'string' ? prod.colors : JSON.stringify(prod.colors || [{ name: 'Default', hex: '#111111' }]),
    prod.description || '',
    typeof prod.details === 'string' ? prod.details : JSON.stringify(prod.details || []),
    prod.fabricCare || '',
    prod.fit || 'Regular Fit',
    typeof prod.tags === 'string' ? prod.tags : JSON.stringify(prod.tags || []),
    Number(prod.rating || 5.0),
    Number(prod.reviewCount || 0),
    prod.isPublished !== undefined ? (prod.isPublished ? 1 : 0) : 1,
    prod.isFeatured ? 1 : 0,
    prod.isNew ? 1 : 0,
    prod.isBestSeller ? 1 : 0,
    now,
    now
  );

  if (Array.isArray(prod.mediaIds) && prod.mediaIds.length > 0) {
    const updateMediaStmt = db.prepare('UPDATE product_media SET productId = ? WHERE id = ?');
    for (const mId of prod.mediaIds) {
      updateMediaStmt.run(id, mId);
    }
  }

  return getProductById(id);
}

export function updateProduct(id, updates) {
  const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  if (!existing) return null;

  const now = new Date().toISOString();
  db.prepare(`
    UPDATE products SET
      name = COALESCE(?, name),
      brand = COALESCE(?, brand),
      department = COALESCE(?, department),
      category = COALESCE(?, category),
      categorySlug = COALESCE(?, categorySlug),
      subcategory = COALESCE(?, subcategory),
      mrp = COALESCE(?, mrp),
      sellingPrice = COALESCE(?, sellingPrice),
      stock = COALESCE(?, stock),
      sizes = COALESCE(?, sizes),
      colors = COALESCE(?, colors),
      description = COALESCE(?, description),
      details = COALESCE(?, details),
      fabricCare = COALESCE(?, fabricCare),
      fit = COALESCE(?, fit),
      tags = COALESCE(?, tags),
      isPublished = COALESCE(?, isPublished),
      isFeatured = COALESCE(?, isFeatured),
      isNew = COALESCE(?, isNew),
      isBestSeller = COALESCE(?, isBestSeller),
      updatedAt = ?
    WHERE id = ?
  `).run(
    updates.name ?? null,
    updates.brand ?? null,
    updates.department ?? null,
    updates.category ?? null,
    updates.categorySlug ?? null,
    updates.subcategory ?? null,
    updates.mrp !== undefined ? Number(updates.mrp) : null,
    updates.sellingPrice !== undefined ? Number(updates.sellingPrice) : null,
    updates.stock !== undefined ? Number(updates.stock) : null,
    updates.sizes ? (typeof updates.sizes === 'string' ? updates.sizes : JSON.stringify(updates.sizes)) : null,
    updates.colors ? (typeof updates.colors === 'string' ? updates.colors : JSON.stringify(updates.colors)) : null,
    updates.description ?? null,
    updates.details ? (typeof updates.details === 'string' ? updates.details : JSON.stringify(updates.details)) : null,
    updates.fabricCare ?? null,
    updates.fit ?? null,
    updates.tags ? (typeof updates.tags === 'string' ? updates.tags : JSON.stringify(updates.tags)) : null,
    updates.isPublished !== undefined ? (updates.isPublished ? 1 : 0) : null,
    updates.isFeatured !== undefined ? (updates.isFeatured ? 1 : 0) : null,
    updates.isNew !== undefined ? (updates.isNew ? 1 : 0) : null,
    updates.isBestSeller !== undefined ? (updates.isBestSeller ? 1 : 0) : null,
    now,
    id
  );

  return getProductById(id);
}

export function togglePublishProduct(id) {
  const prod = db.prepare('SELECT isPublished FROM products WHERE id = ?').get(id);
  if (!prod) return null;
  const newStatus = prod.isPublished === 1 ? 0 : 1;
  db.prepare('UPDATE products SET isPublished = ?, updatedAt = ? WHERE id = ?').run(newStatus, new Date().toISOString(), id);
  return { id, isPublished: newStatus };
}

export function deleteProduct(id) {
  db.prepare('DELETE FROM product_media WHERE productId = ?').run(id);
  db.prepare('DELETE FROM reviews WHERE productId = ?').run(id);
  db.prepare('DELETE FROM analytics_events WHERE productId = ?').run(id);
  return db.prepare('DELETE FROM products WHERE id = ?').run(id);
}

// Media
export function getMediaList(filters = {}) {
  let query = 'SELECT m.*, p.name as productName FROM product_media m LEFT JOIN products p ON m.productId = p.id WHERE 1=1';
  const params = [];

  if (filters.type && filters.type !== 'all') {
    query += ' AND m.type = ?';
    params.push(filters.type);
  }

  if (filters.productId) {
    if (filters.productId === 'unassigned') {
      query += ' AND (m.productId IS NULL OR m.productId = "")';
    } else {
      query += ' AND m.productId = ?';
      params.push(filters.productId);
    }
  }

  if (filters.search) {
    query += ' AND (LOWER(m.title) LIKE ? OR LOWER(m.fileName) LIKE ? OR LOWER(p.name) LIKE ?)';
    const s = `%${filters.search.toLowerCase()}%`;
    params.push(s, s, s);
  }

  query += ' ORDER BY m.createdAt DESC';
  return db.prepare(query).all(...params);
}

export function addMediaRecord(media) {
  const id = media.id || `med-${crypto.randomBytes(6).toString('hex')}`;
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO product_media (
      id, productId, type, url, thumbnailUrl, title, fileName, fileSize, duration, displayOrder, viewsCount, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    media.productId || null,
    media.type || 'image',
    media.url,
    media.thumbnailUrl || media.url,
    media.title || media.fileName || 'Media Asset',
    media.fileName || 'media_asset',
    Number(media.fileSize || 0),
    Number(media.duration || 0),
    Number(media.displayOrder || 0),
    0,
    now
  );
  return db.prepare('SELECT * FROM product_media WHERE id = ?').get(id);
}

export function updateMediaRecord(id, updates) {
  db.prepare(`
    UPDATE product_media SET
      productId = COALESCE(?, productId),
      title = COALESCE(?, title),
      displayOrder = COALESCE(?, displayOrder)
    WHERE id = ?
  `).run(
    updates.productId !== undefined ? updates.productId : null,
    updates.title ?? null,
    updates.displayOrder !== undefined ? Number(updates.displayOrder) : null,
    id
  );
  return db.prepare('SELECT * FROM product_media WHERE id = ?').get(id);
}

export function deleteMediaRecord(id) {
  return db.prepare('DELETE FROM product_media WHERE id = ?').run(id);
}

// Track Event
export function trackEvent({ eventType, productId, mediaId, visitorId, watchDuration = 0, metadata = null }) {
  if (!eventType || !visitorId) {
    throw new Error('eventType and visitorId are required');
  }

  const timestamp = new Date().toISOString();
  db.prepare(`
    INSERT INTO analytics_events (eventType, productId, mediaId, visitorId, watchDuration, metadata, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    eventType,
    productId || null,
    mediaId || null,
    visitorId,
    Number(watchDuration || 0),
    metadata ? (typeof metadata === 'string' ? metadata : JSON.stringify(metadata)) : null,
    timestamp
  );

  if (mediaId && (eventType === 'image_view' || eventType === 'video_play')) {
    db.prepare('UPDATE product_media SET viewsCount = viewsCount + 1 WHERE id = ?').run(mediaId);
  }

  return { success: true, timestamp };
}

// Admin Overview
export function getAdminOverview() {
  const totalProducts = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
  const totalPhotos = db.prepare("SELECT COUNT(*) as count FROM product_media WHERE type = 'image'").get().count;
  const totalVideos = db.prepare("SELECT COUNT(*) as count FROM product_media WHERE type = 'video'").get().count;
  const totalCustomers = db.prepare('SELECT COUNT(DISTINCT customerEmail) as count FROM orders').get().count;

  const totalProductViews = db.prepare("SELECT COUNT(*) as count FROM analytics_events WHERE eventType = 'page_view'").get().count;
  const uniqueVisitors = db.prepare("SELECT COUNT(DISTINCT visitorId) as count FROM analytics_events WHERE eventType = 'page_view'").get().count;
  const totalVideoViews = db.prepare("SELECT COUNT(*) as count FROM analytics_events WHERE eventType = 'video_play'").get().count;
  const totalWishlistAdditions = db.prepare("SELECT COUNT(*) as count FROM analytics_events WHERE eventType = 'wishlist_add'").get().count;
  const totalCartAdditions = db.prepare("SELECT COUNT(*) as count FROM analytics_events WHERE eventType = 'cart_add'").get().count;
  
  const orderStats = db.prepare(`
    SELECT COUNT(*) as count, COALESCE(SUM(totalAmount), 0) as revenue
    FROM orders
  `).get();
  const totalOrders = orderStats.count;
  const totalRevenue = orderStats.revenue;

  const bestSellers = db.prepare(`
    SELECT 
      p.id, p.name, p.brand, p.sellingPrice, p.stock, p.department, p.category,
      COALESCE(SUM(oi.quantity), 0) as unitsSold,
      COALESCE(SUM(oi.price * oi.quantity), 0) as totalSales
    FROM products p
    JOIN order_items oi ON p.id = oi.productId
    GROUP BY p.id
    ORDER BY unitsSold DESC, totalSales DESC
    LIMIT 5
  `).all();

  const bestSellersWithThumbs = bestSellers.map(b => {
    const thumb = db.prepare("SELECT url FROM product_media WHERE productId = ? AND type = 'image' LIMIT 1").get(b.id);
    return { ...b, thumbnail: thumb ? thumb.url : '' };
  });

  const mostViewed = db.prepare(`
    SELECT 
      p.id, p.name, p.brand, p.sellingPrice, p.department, p.category,
      COUNT(ae.id) as viewsCount,
      COUNT(DISTINCT ae.visitorId) as uniqueVisitors
    FROM products p
    JOIN analytics_events ae ON p.id = ae.productId AND ae.eventType = 'page_view'
    GROUP BY p.id
    ORDER BY viewsCount DESC
    LIMIT 5
  `).all();

  const mostViewedWithThumbs = mostViewed.map(m => {
    const thumb = db.prepare("SELECT url FROM product_media WHERE productId = ? AND type = 'image' LIMIT 1").get(m.id);
    return { ...m, thumbnail: thumb ? thumb.url : '' };
  });

  const dailyHistory = [];
  const now = Date.now();
  for (let i = 13; i >= 0; i--) {
    const dayStart = new Date(now - i * 86400000);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(now - i * 86400000);
    dayEnd.setHours(23, 59, 59, 999);

    const startIso = dayStart.toISOString();
    const endIso = dayEnd.toISOString();

    const views = db.prepare(`
      SELECT COUNT(*) as count FROM analytics_events 
      WHERE eventType = 'page_view' AND timestamp >= ? AND timestamp <= ?
    `).get(startIso, endIso).count;

    const videoPlays = db.prepare(`
      SELECT COUNT(*) as count FROM analytics_events 
      WHERE eventType = 'video_play' AND timestamp >= ? AND timestamp <= ?
    `).get(startIso, endIso).count;

    const ordersSum = db.prepare(`
      SELECT COUNT(*) as count, COALESCE(SUM(totalAmount), 0) as revenue FROM orders
      WHERE createdAt >= ? AND createdAt <= ?
    `).get(startIso, endIso);

    dailyHistory.push({
      date: dayStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views,
      videoPlays,
      orders: ordersSum.count,
      revenue: Math.round(ordersSum.revenue)
    });
  }

  return {
    totalProducts,
    totalPhotos,
    totalVideos,
    totalCustomers,
    totalProductViews,
    uniqueVisitors,
    totalVideoViews,
    totalWishlistAdditions,
    totalCartAdditions,
    totalOrders,
    totalRevenue,
    bestSellingProducts: bestSellersWithThumbs,
    mostViewedProducts: mostViewedWithThumbs,
    dailyHistory
  };
}

// Product Analytics
export function getIndividualProductAnalytics(productId, { range = '30d', startDate = null, endDate = null } = {}) {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
  if (!product) return null;

  const now = new Date();
  let startTime;
  let endTime = new Date();

  if (range === 'today') {
    startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  } else if (range === '7d') {
    startTime = new Date(now.getTime() - 7 * 86400000);
  } else if (range === 'custom' && startDate) {
    startTime = new Date(startDate);
    if (endDate) endTime = new Date(endDate);
  } else {
    startTime = new Date(now.getTime() - 30 * 86400000);
  }

  const startIso = startTime.toISOString();
  const endIso = endTime.toISOString();

  const viewStats = db.prepare(`
    SELECT 
      COUNT(*) as totalViews,
      COUNT(DISTINCT visitorId) as uniqueVisitors
    FROM analytics_events
    WHERE productId = ? AND eventType = 'page_view' AND timestamp >= ? AND timestamp <= ?
  `).get(productId, startIso, endIso);

  const totalViews = viewStats.totalViews;
  const uniqueVisitors = viewStats.uniqueVisitors;

  const totalImageViews = db.prepare(`
    SELECT COUNT(*) as count
    FROM analytics_events
    WHERE productId = ? AND eventType = 'image_view' AND timestamp >= ? AND timestamp <= ?
  `).get(productId, startIso, endIso).count;

  const imageBreakdown = db.prepare(`
    SELECT 
      pm.id as mediaId, pm.url, pm.title, pm.fileName,
      COUNT(ae.id) as viewCount,
      COUNT(DISTINCT ae.visitorId) as uniqueViewers
    FROM product_media pm
    LEFT JOIN analytics_events ae ON pm.id = ae.mediaId AND ae.eventType = 'image_view' AND ae.timestamp >= ? AND ae.timestamp <= ?
    WHERE pm.productId = ? AND pm.type = 'image'
    GROUP BY pm.id
    ORDER BY viewCount DESC
  `).all(startIso, endIso, productId);

  const totalVideoPlays = db.prepare(`
    SELECT COUNT(*) as count
    FROM analytics_events
    WHERE productId = ? AND eventType = 'video_play' AND timestamp >= ? AND timestamp <= ?
  `).get(productId, startIso, endIso).count;

  const watchStats = db.prepare(`
    SELECT 
      COALESCE(AVG(watchDuration), 0) as avgDuration,
      COALESCE(SUM(watchDuration), 0) as totalDuration
    FROM analytics_events
    WHERE productId = ? AND eventType = 'video_watch' AND timestamp >= ? AND timestamp <= ?
  `).get(productId, startIso, endIso);

  const avgVideoWatchDuration = Math.round(watchStats.avgDuration * 10) / 10;
  const totalWatchDuration = Math.round(watchStats.totalDuration);

  const videoBreakdown = db.prepare(`
    SELECT 
      pm.id as mediaId, pm.url, pm.thumbnailUrl, pm.title, pm.fileName, pm.duration as videoDuration,
      COUNT(ae.id) as playCount,
      COUNT(DISTINCT ae.visitorId) as uniquePlayers
    FROM product_media pm
    LEFT JOIN analytics_events ae ON pm.id = ae.mediaId AND ae.eventType = 'video_play' AND ae.timestamp >= ? AND ae.timestamp <= ?
    WHERE pm.productId = ? AND pm.type = 'video'
    GROUP BY pm.id
    ORDER BY playCount DESC
  `).all(startIso, endIso, productId);

  const wishlistAdditions = db.prepare(`
    SELECT COUNT(*) as count
    FROM analytics_events
    WHERE productId = ? AND eventType = 'wishlist_add' AND timestamp >= ? AND timestamp <= ?
  `).get(productId, startIso, endIso).count;

  const cartAdditions = db.prepare(`
    SELECT COUNT(*) as count
    FROM analytics_events
    WHERE productId = ? AND eventType = 'cart_add' AND timestamp >= ? AND timestamp <= ?
  `).get(productId, startIso, endIso).count;

  const orderStats = db.prepare(`
    SELECT 
      COALESCE(SUM(oi.quantity), 0) as totalUnits,
      COUNT(DISTINCT oi.orderId) as ordersCount,
      COALESCE(SUM(oi.price * oi.quantity), 0) as revenue
    FROM order_items oi
    JOIN orders o ON oi.orderId = o.id
    WHERE oi.productId = ? AND o.createdAt >= ? AND o.createdAt <= ?
  `).get(productId, startIso, endIso);

  const ordersCount = orderStats.ordersCount;
  const unitsSold = orderStats.totalUnits;
  const revenue = orderStats.revenue;
  const conversionRate = uniqueVisitors > 0 ? Math.round((ordersCount / uniqueVisitors) * 1000) / 10 : 0;

  const trendDays = range === 'today' ? 1 : (range === '7d' ? 7 : 14);
  const dailyTrend = [];
  for (let i = trendDays - 1; i >= 0; i--) {
    const dStart = new Date(endTime.getTime() - i * 86400000);
    dStart.setHours(0, 0, 0, 0);
    const dEnd = new Date(endTime.getTime() - i * 86400000);
    dEnd.setHours(23, 59, 59, 999);

    const sIso = dStart.toISOString();
    const eIso = dEnd.toISOString();

    const dViews = db.prepare(`
      SELECT COUNT(*) as count FROM analytics_events 
      WHERE productId = ? AND eventType = 'page_view' AND timestamp >= ? AND timestamp <= ?
    `).get(productId, sIso, eIso).count;

    const dVisitors = db.prepare(`
      SELECT COUNT(DISTINCT visitorId) as count FROM analytics_events 
      WHERE productId = ? AND eventType = 'page_view' AND timestamp >= ? AND timestamp <= ?
    `).get(productId, sIso, eIso).count;

    const dVideoPlays = db.prepare(`
      SELECT COUNT(*) as count FROM analytics_events 
      WHERE productId = ? AND eventType = 'video_play' AND timestamp >= ? AND timestamp <= ?
    `).get(productId, sIso, eIso).count;

    dailyTrend.push({
      date: dStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views: dViews,
      visitors: dVisitors,
      videoPlays: dVideoPlays
    });
  }

  const thumb = db.prepare("SELECT url FROM product_media WHERE productId = ? AND type = 'image' LIMIT 1").get(productId);

  return {
    productId,
    productName: product.name,
    brand: product.brand,
    department: product.department,
    category: product.category,
    sellingPrice: product.sellingPrice,
    mrp: product.mrp,
    stock: product.stock,
    thumbnail: thumb ? thumb.url : '',
    dateRange: {
      range,
      startDate: startIso,
      endDate: endIso
    },
    metrics: {
      totalViews,
      uniqueVisitors,
      totalImageViews,
      totalVideoPlays,
      avgVideoWatchDuration,
      totalWatchDuration,
      wishlistAdditions,
      cartAdditions,
      ordersCount,
      unitsSold,
      revenue,
      conversionRate
    },
    imageBreakdown,
    videoBreakdown,
    dailyTrend
  };
}

// Orders
export function createCustomerOrder(orderData) {
  const id = `ord-${Date.now()}`;
  const orderNumber = `LVO-${Math.floor(10000 + Math.random() * 90000)}`;
  const now = new Date().toISOString();

  let subtotal = 0;
  for (const item of orderData.items || []) {
    subtotal += Number(item.price) * Number(item.quantity || 1);
  }

  const discount = Number(orderData.discount || 0);
  const shippingFee = subtotal > 2000 ? 0 : 150;
  const totalAmount = Math.max(0, subtotal - discount + shippingFee);

  db.prepare(`
    INSERT INTO orders (
      id, orderNumber, visitorId, customerName, customerEmail, customerPhone,
      shippingAddress, paymentMethod, paymentStatus, subtotal, discount, shippingFee,
      totalAmount, status, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    orderNumber,
    orderData.visitorId || 'v_guest',
    orderData.customerName,
    orderData.customerEmail,
    orderData.customerPhone || '',
    orderData.shippingAddress,
    orderData.paymentMethod || 'Credit Card / UPI',
    'Paid',
    subtotal,
    discount,
    shippingFee,
    totalAmount,
    'Confirmed',
    now
  );

  const insertItem = db.prepare(`
    INSERT INTO order_items (orderId, productId, productName, price, quantity, size, color)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const updateStock = db.prepare(`
    UPDATE products SET stock = MAX(0, stock - ?) WHERE id = ?
  `);

  for (const item of orderData.items || []) {
    insertItem.run(
      id,
      item.productId,
      item.name || item.productName || 'Menswear Garment',
      Number(item.price || 0),
      Number(item.quantity || 1),
      item.size || 'M',
      item.color || 'Standard'
    );

    updateStock.run(Number(item.quantity || 1), item.productId);

    trackEvent({
      eventType: 'order_placed',
      productId: item.productId,
      visitorId: orderData.visitorId || 'v_guest',
      metadata: { orderId: id, orderNumber, total: totalAmount }
    });
  }

  return getOrderById(id);
}

export function getAllOrders() {
  const orders = db.prepare('SELECT * FROM orders ORDER BY createdAt DESC').all();
  return orders.map(o => {
    const items = db.prepare('SELECT * FROM order_items WHERE orderId = ?').all(o.id);
    return { ...o, items };
  });
}

export function getOrderById(id) {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
  if (!order) return null;
  const items = db.prepare('SELECT * FROM order_items WHERE orderId = ?').all(order.id);
  return { ...order, items };
}

export function updateOrderStatus(id, status) {
  db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id);
  return getOrderById(id);
}

// Reviews
export function getProductReviews(productId) {
  return db.prepare('SELECT * FROM reviews WHERE productId = ? ORDER BY createdAt DESC').all(productId);
}

export function addProductReview(review) {
  const id = `rev-${Date.now()}`;
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO reviews (id, productId, userName, rating, title, comment, verifiedPurchase, likesCount, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    review.productId,
    review.userName || 'Gentleman Connoisseur',
    Number(review.rating || 5),
    review.title || '',
    review.comment,
    1,
    0,
    now
  );

  const stats = db.prepare(`
    SELECT AVG(rating) as avgRating, COUNT(*) as cnt
    FROM reviews WHERE productId = ?
  `).get(review.productId);

  const roundedRating = Math.round(stats.avgRating * 10) / 10;
  db.prepare(`
    UPDATE products SET rating = ?, reviewCount = ? WHERE id = ?
  `).run(roundedRating, stats.cnt, review.productId);

  return db.prepare('SELECT * FROM reviews WHERE id = ?').get(id);
}

// Inquiries & VIP Subscriptions
export function createInquiry(data) {
  const id = `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO inquiries (id, name, email, type, subject, message, targetEmail, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    data.name || 'VIP Client',
    data.email,
    data.type || 'newsletter',
    data.subject || 'VIP Newsletter Subscription',
    data.message || '',
    data.targetEmail || 'krishlad334@gmail.com',
    'new',
    now
  );
  return getInquiryById(id);
}

export function getAllInquiries() {
  return db.prepare('SELECT * FROM inquiries ORDER BY createdAt DESC').all();
}

export function getInquiryById(id) {
  return db.prepare('SELECT * FROM inquiries WHERE id = ?').get(id);
}

export function updateInquiryStatus(id, status) {
  db.prepare('UPDATE inquiries SET status = ? WHERE id = ?').run(status, id);
  return getInquiryById(id);
}

export function deleteInquiry(id) {
  db.prepare('DELETE FROM inquiries WHERE id = ?').run(id);
  return { success: true };
}

// System Settings
export function getSetting(key, defaultValue = null) {
  const row = db.prepare('SELECT value FROM system_settings WHERE key = ?').get(key);
  return row ? JSON.parse(row.value) : defaultValue;
}

export function setSetting(key, value) {
  const str = JSON.stringify(value);
  db.prepare(`
    INSERT INTO system_settings (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `).run(key, str);
  return value;
}
