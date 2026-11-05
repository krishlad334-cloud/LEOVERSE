/* oxlint-disable react/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'leoverse_cart';
const COUPON_KEY = 'leoverse_coupon';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Failed to read cart from localStorage', e);
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem(COUPON_KEY);
      if (!saved) return null;
      return JSON.parse(saved);
    } catch {
      return null;
    }
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_KEY);
      }
    } catch (e) {
      console.error('Failed to save coupon', e);
    }
  }, [appliedCoupon]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    if (!product) return;
    const size = selectedSize || product.sizes?.[0] || 'Standard';
    const color = selectedColor || (product.colors?.[0]?.name ?? 'Standard');
    const colorHex = product.colors?.find(c => c.name === color)?.hex || '#242321';
    
    // Unique ID based on product ID, size, and color
    const cartItemId = `${product.id}-${size}-${color}`;

    setCartItems((prev) => {
      const prevItems = Array.isArray(prev) ? prev : [];
      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + quantity,
        };
        return updated;
      } else {
        const itemPrice = product.sellingPrice ?? product.salePrice ?? product.price ?? 1999;
        const newItem = {
          cartItemId,
          id: product.id,
          productId: product.id,
          name: product.name,
          subtitle: product.subtitle,
          price: itemPrice,
          sellingPrice: itemPrice,
          originalPrice: product.mrp ?? product.price ?? itemPrice,
          image: product.images?.[0] || product.image || '',
          images: product.images || (product.image ? [product.image] : []),
          selectedSize: size,
          size: size,
          selectedColor: color,
          color: color,
          colorHex: colorHex,
          quantity: quantity,
          category: product.category,
        };
        return [...prevItems, newItem];
      }
    });

    showNotification(`Added ${product.name} (${size}) to your bag`);
  };

  const removeFromCart = (idOrCartItemId, size, color) => {
    setCartItems((prev) => {
      const prevItems = Array.isArray(prev) ? prev : [];
      return prevItems.filter((item) => {
        if (item.cartItemId && item.cartItemId === idOrCartItemId) return false;
        if (size && color) {
          if (item.id === idOrCartItemId && (item.size === size || item.selectedSize === size) && (item.color === color || item.selectedColor === color)) return false;
          if (item.productId === idOrCartItemId && (item.size === size || item.selectedSize === size) && (item.color === color || item.selectedColor === color)) return false;
        }
        if (item.id === idOrCartItemId || item.productId === idOrCartItemId || item.cartItemId === idOrCartItemId) return false;
        return true;
      });
    });
    showNotification('Item removed from your bag', 'info');
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) => {
      const prevItems = Array.isArray(prev) ? prev : [];
      return prevItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'LEO10' || cleanCode === 'WELCOME10') {
      const coupon = { code: cleanCode, discountPercentage: 10, name: '10% Off First Order' };
      setAppliedCoupon(coupon);
      showNotification('Coupon applied: 10% discount added!');
      return { success: true, message: 'Coupon applied successfully' };
    } else if (cleanCode === 'ELEVATED') {
      const coupon = { code: cleanCode, discountAmount: 500, name: '₹500 Seasonal Voucher' };
      setAppliedCoupon(coupon);
      showNotification('Coupon applied: ₹500 discount added!');
      return { success: true, message: 'Coupon applied successfully' };
    } else {
      return { success: false, message: 'Invalid promo code. Try "LEO10" or "ELEVATED".' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showNotification('Coupon removed', 'info');
  };

  // Safe calculations with Array.isArray
  const safeItems = Array.isArray(cartItems) ? cartItems : [];
  const cartCount = safeItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const subtotal = safeItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

  // Free shipping above ₹2,999
  const freeShippingThreshold = 2999;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = safeItems.length === 0 ? 0 : (isFreeShipping ? 0 : 250);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercentage) {
      discount = Math.round((subtotal * appliedCoupon.discountPercentage) / 100);
    } else if (appliedCoupon.discountAmount) {
      discount = Math.min(subtotal, appliedCoupon.discountAmount);
    }
  }

  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cartItems: safeItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        shippingFee,
        isFreeShipping,
        amountToFreeShipping,
        discount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        grandTotal,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartProvider;
