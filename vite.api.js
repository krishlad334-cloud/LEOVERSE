import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import * as db from './server/db.js';

const MAX_BODY_SIZE = 80 * 1024 * 1024; // 80 MB for video uploads

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_SIZE) {
        reject(new Error('File upload exceeds maximum limit (80 MB)'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-visitor-id');
  res.end(JSON.stringify(data));
}

export function leoverseApiPlugin() {
  return {
    name: 'leoverse-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Only intercept /api/*
        if (!req.url.startsWith('/api/')) {
          return next();
        }

        const urlObj = new URL(req.url, 'http://localhost');
        const pathname = urlObj.pathname;
        const method = req.method;

        // Handle CORS Preflight
        if (method === 'OPTIONS') {
          res.statusCode = 204;
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-visitor-id');
          return res.end();
        }

        try {
          // ------------------------------------
          // Analytics Track Event
          // ------------------------------------
          if (pathname === '/api/analytics/track' && method === 'POST') {
            const body = await readJsonBody(req);
            const visitorId = body.visitorId || req.headers['x-visitor-id'] || 'v_guest';
            const result = db.trackEvent({
              eventType: body.eventType,
              productId: body.productId,
              mediaId: body.mediaId,
              visitorId,
              watchDuration: body.watchDuration,
              metadata: body.metadata
            });
            return sendJson(res, 200, result);
          }

          // ------------------------------------
          // Admin Overview Dashboard
          // ------------------------------------
          if (pathname === '/api/admin/overview' && method === 'GET') {
            const overview = db.getAdminOverview();
            return sendJson(res, 200, overview);
          }

          // ------------------------------------
          // Product Analytics (Per Individual Product)
          // ------------------------------------
          const prodAnalyticsMatch = pathname.match(/^\/api\/admin\/products\/([^/]+)\/analytics$/);
          if (prodAnalyticsMatch && method === 'GET') {
            const productId = prodAnalyticsMatch[1];
            const range = urlObj.searchParams.get('range') || '30d';
            const startDate = urlObj.searchParams.get('startDate');
            const endDate = urlObj.searchParams.get('endDate');

            const analytics = db.getIndividualProductAnalytics(productId, { range, startDate, endDate });
            if (!analytics) {
              return sendJson(res, 404, { error: 'Product not found' });
            }
            return sendJson(res, 200, analytics);
          }

          // ------------------------------------
          // Categories
          // ------------------------------------
          if (pathname === '/api/categories') {
            if (method === 'GET') {
              const cats = db.getAllCategories();
              return sendJson(res, 200, cats);
            }
            if (method === 'POST') {
              const body = await readJsonBody(req);
              const created = db.createCategory(body);
              return sendJson(res, 201, created);
            }
          }

          const catIdMatch = pathname.match(/^\/api\/categories\/([^/]+)$/);
          if (catIdMatch) {
            const catId = catIdMatch[1];
            if (method === 'PUT') {
              const body = await readJsonBody(req);
              const updated = db.updateCategory(catId, body);
              return sendJson(res, 200, updated);
            }
            if (method === 'DELETE') {
              db.deleteCategory(catId);
              return sendJson(res, 200, { success: true });
            }
          }

          // ------------------------------------
          // Products
          // ------------------------------------
          if (pathname === '/api/products' && method === 'GET') {
            const filters = {
              department: urlObj.searchParams.get('department'),
              category: urlObj.searchParams.get('category'),
              categorySlug: urlObj.searchParams.get('categorySlug'),
              subcategory: urlObj.searchParams.get('subcategory'),
              search: urlObj.searchParams.get('search'),
              minPrice: urlObj.searchParams.get('minPrice'),
              maxPrice: urlObj.searchParams.get('maxPrice'),
              sort: urlObj.searchParams.get('sort'),
              inStock: urlObj.searchParams.get('inStock'),
              publishedOnly: urlObj.searchParams.get('publishedOnly')
            };
            const products = db.getProducts(filters);
            return sendJson(res, 200, products);
          }

          if (pathname === '/api/products' && method === 'POST') {
            const body = await readJsonBody(req);
            const created = db.createProduct(body);
            return sendJson(res, 201, created);
          }

          const prodToggleMatch = pathname.match(/^\/api\/products\/([^/]+)\/toggle-publish$/);
          if (prodToggleMatch && method === 'POST') {
            const productId = prodToggleMatch[1];
            const updated = db.togglePublishProduct(productId);
            if (!updated) return sendJson(res, 404, { error: 'Product not found' });
            return sendJson(res, 200, updated);
          }

          const prodIdMatch = pathname.match(/^\/api\/products\/([^/]+)$/);
          if (prodIdMatch) {
            const productId = prodIdMatch[1];
            if (method === 'GET') {
              const prod = db.getProductById(productId);
              if (!prod) return sendJson(res, 404, { error: 'Product not found' });
              return sendJson(res, 200, prod);
            }
            if (method === 'PUT') {
              const body = await readJsonBody(req);
              const updated = db.updateProduct(productId, body);
              if (!updated) return sendJson(res, 404, { error: 'Product not found' });
              return sendJson(res, 200, updated);
            }
            if (method === 'DELETE') {
              db.deleteProduct(productId);
              return sendJson(res, 200, { success: true });
            }
          }

          // ------------------------------------
          // Media Library
          // ------------------------------------
          if (pathname === '/api/media' && method === 'GET') {
            const filters = {
              type: urlObj.searchParams.get('type'),
              productId: urlObj.searchParams.get('productId'),
              search: urlObj.searchParams.get('search')
            };
            const mediaList = db.getMediaList(filters);
            return sendJson(res, 200, mediaList);
          }

          if (pathname === '/api/media/upload' && method === 'POST') {
            const body = await readJsonBody(req);
            // Expected body: { fileData: base64, fileName, fileType, title, productId, duration }
            if (!body.fileData || !body.fileType) {
              return sendJson(res, 400, { error: 'fileData and fileType are required' });
            }

            const isVideo = body.fileType.startsWith('video/');
            const ext = body.fileType.includes('mp4') ? 'mp4' : (body.fileType.includes('webm') ? 'webm' : (body.fileType.includes('png') ? 'png' : 'jpg'));
            const uniqueName = `upload_${Date.now()}_${crypto.randomBytes(4).toString('hex')}.${ext}`;
            const uploadDir = path.resolve(process.cwd(), 'public', 'media', 'uploads');

            if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir, { recursive: true });
            }

            const buffer = Buffer.from(body.fileData, 'base64');
            fs.writeFileSync(path.resolve(uploadDir, uniqueName), buffer);

            const fileUrl = `/media/uploads/${uniqueName}`;
            const mediaRecord = db.addMediaRecord({
              productId: body.productId || null,
              type: isVideo ? 'video' : 'image',
              url: fileUrl,
              thumbnailUrl: isVideo ? (body.thumbnailUrl || '/images/video-placeholder.jpg') : fileUrl,
              title: body.title || body.fileName || uniqueName,
              fileName: body.fileName || uniqueName,
              fileSize: buffer.length,
              duration: body.duration || 0
            });

            return sendJson(res, 201, mediaRecord);
          }

          const mediaIdMatch = pathname.match(/^\/api\/media\/([^/]+)$/);
          if (mediaIdMatch) {
            const mediaId = mediaIdMatch[1];
            if (method === 'PUT') {
              const body = await readJsonBody(req);
              const updated = db.updateMediaRecord(mediaId, body);
              return sendJson(res, 200, updated);
            }
            if (method === 'DELETE') {
              db.deleteMediaRecord(mediaId);
              return sendJson(res, 200, { success: true });
            }
          }

          // ------------------------------------
          // Orders
          // ------------------------------------
          if (pathname === '/api/orders') {
            if (method === 'GET') {
              const orders = db.getAllOrders();
              return sendJson(res, 200, orders);
            }
            if (method === 'POST') {
              const body = await readJsonBody(req);
              const order = db.createCustomerOrder(body);
              return sendJson(res, 201, order);
            }
          }

          const orderStatusMatch = pathname.match(/^\/api\/orders\/([^/]+)\/status$/);
          if (orderStatusMatch && method === 'PUT') {
            const orderId = orderStatusMatch[1];
            const body = await readJsonBody(req);
            const updated = db.updateOrderStatus(orderId, body.status);
            return sendJson(res, 200, updated);
          }

          // ------------------------------------
          // Reviews
          // ------------------------------------
          if (pathname === '/api/reviews') {
            if (method === 'GET') {
              const productId = urlObj.searchParams.get('productId');
              if (!productId) return sendJson(res, 400, { error: 'productId is required' });
              const reviews = db.getProductReviews(productId);
              return sendJson(res, 200, reviews);
            }
            if (method === 'POST') {
              const body = await readJsonBody(req);
              const review = db.addProductReview(body);
              return sendJson(res, 201, review);
            }
          }

          // ------------------------------------
          // Admin Auth
          // ------------------------------------
          if (pathname === '/api/auth/admin-login' && method === 'POST') {
            const body = await readJsonBody(req);
            // Default demo password check
            if (body.password === 'admin123' || body.password === 'leoverse-studio' || body.isDemoBypass) {
              return sendJson(res, 200, {
                success: true,
                token: 'adm_' + crypto.randomBytes(16).toString('hex'),
                user: {
                  name: 'Studio Administrator',
                  email: 'admin@leoverse.com',
                  role: 'admin'
                }
              });
            }
            return sendJson(res, 401, { error: 'Invalid admin credentials' });
          }

          // 404 for unknown api routes
          return sendJson(res, 404, { error: `Endpoint ${pathname} not found` });
        } catch (err) {
          console.error('[API ERROR]', err);
          return sendJson(res, 500, { error: err.message || 'Internal Server Error' });
        }
      });
    }
  };
}
