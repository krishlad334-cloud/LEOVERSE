// Real-time analytics tracking client
import { trackEvent } from '../services/api';

const VISITOR_ID_KEY = 'leoverse_visitor_id';

export function getVisitorId() {
  let vid = localStorage.getItem(VISITOR_ID_KEY);
  if (!vid) {
    vid = 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem(VISITOR_ID_KEY, vid);
  }
  return vid;
}

export function trackProductView(productId) {
  if (!productId) return;
  const vid = getVisitorId();
  
  // Throttle duplicate page views within 10 minutes in same tab session
  const sessionKey = `viewed_${productId}`;
  const lastViewed = sessionStorage.getItem(sessionKey);
  const now = Date.now();
  if (lastViewed && now - Number(lastViewed) < 600000) {
    // Already viewed in the last 10 minutes in this tab, skip spamming
    return;
  }
  sessionStorage.setItem(sessionKey, String(now));

  trackEvent({
    eventType: 'page_view',
    productId,
    visitorId: vid
  }).catch(() => {});
}

export function trackImageView(productId, mediaId) {
  if (!productId || !mediaId) return;
  const vid = getVisitorId();

  // Deduplicate image view per session to prevent rapid thumbnail hover spam
  const sessionKey = `img_viewed_${mediaId}`;
  if (sessionStorage.getItem(sessionKey)) return;
  sessionStorage.setItem(sessionKey, '1');

  trackEvent({
    eventType: 'image_view',
    productId,
    mediaId,
    visitorId: vid
  }).catch(() => {});
}

export function trackVideoPlay(productId, mediaId) {
  if (!productId || !mediaId) return;
  const vid = getVisitorId();
  trackEvent({
    eventType: 'video_play',
    productId,
    mediaId,
    visitorId: vid
  }).catch(() => {});
}

export function trackVideoWatchDuration(productId, mediaId, durationSeconds) {
  if (!productId || !mediaId || durationSeconds <= 0) return;
  const vid = getVisitorId();
  trackEvent({
    eventType: 'video_watch',
    productId,
    mediaId,
    visitorId: vid,
    watchDuration: Math.round(durationSeconds)
  }).catch(() => {});
}

export function trackWishlistAddition(productId) {
  if (!productId) return;
  const vid = getVisitorId();
  trackEvent({
    eventType: 'wishlist_add',
    productId,
    visitorId: vid
  }).catch(() => {});
}

export function trackCartAddition(productId) {
  if (!productId) return;
  const vid = getVisitorId();
  trackEvent({
    eventType: 'cart_add',
    productId,
    visitorId: vid
  }).catch(() => {});
}
