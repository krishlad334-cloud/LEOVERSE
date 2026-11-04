// Client API Service connected to the SQLite backend

const API_BASE = '/api';

export async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const res = await fetch(url, {
    ...options,
    headers
  });

  if (!res.ok) {
    let errorMsg = `API Error: ${res.status} ${res.statusText}`;
    try {
      const errJson = await res.json();
      if (errJson.error) errorMsg = errJson.error;
    } catch {}
    throw new Error(errorMsg);
  }

  return res.json();
}

// --- Overview & Analytics ---
export function getAdminOverview() {
  return request('/admin/overview');
}

export function getProductAnalytics(productId, params = {}) {
  const q = new URLSearchParams();
  if (params.range) q.set('range', params.range);
  if (params.startDate) q.set('startDate', params.startDate);
  if (params.endDate) q.set('endDate', params.endDate);
  const queryStr = q.toString() ? `?${q.toString()}` : '';
  return request(`/admin/products/${productId}/analytics${queryStr}`);
}

export function trackEvent(payload) {
  return request('/analytics/track', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

// --- Categories ---
export function getCategories() {
  return request('/categories');
}

export function createCategory(data) {
  return request('/categories', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export function updateCategory(id, data) {
  return request(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export function deleteCategory(id) {
  return request(`/categories/${id}`, {
    method: 'DELETE'
  });
}

// --- Products ---
export function getProducts(filters = {}) {
  const q = new URLSearchParams();
  Object.entries(filters).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      q.set(key, val);
    }
  });
  const queryStr = q.toString() ? `?${q.toString()}` : '';
  return request(`/products${queryStr}`);
}

export function getProductById(id) {
  return request(`/products/${id}`);
}

export function createProduct(data) {
  return request('/products', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export function updateProduct(id, data) {
  return request(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export function togglePublishProduct(id) {
  return request(`/products/${id}/toggle-publish`, {
    method: 'POST'
  });
}

export function deleteProduct(id) {
  return request(`/products/${id}`, {
    method: 'DELETE'
  });
}

// --- Media Library ---
export function getMedia(filters = {}) {
  const q = new URLSearchParams();
  if (filters.type) q.set('type', filters.type);
  if (filters.productId) q.set('productId', filters.productId);
  if (filters.search) q.set('search', filters.search);
  const queryStr = q.toString() ? `?${q.toString()}` : '';
  return request(`/media${queryStr}`);
}

export function uploadMedia(payload) {
  return request('/media/upload', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function updateMedia(id, data) {
  return request(`/media/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export function deleteMedia(id) {
  return request(`/media/${id}`, {
    method: 'DELETE'
  });
}

// --- Orders ---
export function getOrders() {
  return request('/orders');
}

export function createOrder(orderData) {
  return request('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  });
}

export function updateOrderStatus(orderId, status) {
  return request(`/orders/${orderId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  });
}

// --- Reviews ---
export function getReviews(productId) {
  return request(`/reviews?productId=${productId}`);
}

export function submitReview(reviewData) {
  return request('/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData)
  });
}

// --- Admin Auth ---
export function adminLogin(password, isDemoBypass = false) {
  return request('/auth/admin-login', {
    method: 'POST',
    body: JSON.stringify({ password, isDemoBypass })
  });
}
