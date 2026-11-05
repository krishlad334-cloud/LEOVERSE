import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProductByIdOrSlug } from '../services/productService';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'leoverse_wishlist';

export const WishlistProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Failed to read wishlist from localStorage', e);
      return [];
    }
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 2800);
  };

  const safeIds = Array.isArray(wishlistIds) ? wishlistIds : [];

  const isInWishlist = (productId) => {
    return safeIds.includes(productId);
  };

  const addToWishlist = (product) => {
    if (!product) return;
    if (!safeIds.includes(product.id)) {
      setWishlistIds((prev) => [...(Array.isArray(prev) ? prev : []), product.id]);
      showNotification(`Saved "${product.name}" to your wishlist`);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistIds((prev) => (Array.isArray(prev) ? prev : []).filter((id) => id !== productId));
    showNotification('Item removed from your wishlist');
  };

  const toggleWishlist = (product) => {
    if (!product) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Hydrate full product objects for the wishlist page safely from master catalog
  const wishlistProducts = safeIds
    .map((id) => getProductByIdOrSlug(id))
    .filter(Boolean);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds: safeIds,
        wishlistProducts,
        wishlistCount: safeIds.length,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        notification,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;
