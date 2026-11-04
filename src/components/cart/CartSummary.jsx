import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Check, X, Shield, Truck, ArrowRight, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';

export const CartSummary = ({
  subtotal,
  shippingFee,
  isFreeShipping,
  amountToFreeShipping,
  discount,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  grandTotal,
  showCheckoutButton = true,
  cartItems = [],
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;
    const res = onApplyCoupon(couponCode);
    if (!res?.success) {
      setCouponError(res?.message || 'Invalid coupon code. Try LUXE15');
    } else {
      setCouponCode('');
    }
  };

  const freeShippingThreshold = 2499;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="bg-[#F8F6F2] dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl p-6 sm:p-8 space-y-6">
      <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#1E1E1E] dark:text-white pb-3 border-b border-[#E5E0D6] dark:border-[#27272A]">
        Order Summary
      </h3>

      {/* Free Shipping Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs tracking-wider">
          {isFreeShipping ? (
            <span className="text-emerald-800 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              You've unlocked complimentary express shipping!
            </span>
          ) : (
            <span className="text-gray-600 dark:text-gray-400">
              Add <strong className="text-black dark:text-white">{formatPrice(amountToFreeShipping)}</strong> more for free express shipping
            </span>
          )}
          <span className="text-[11px] text-gray-500 dark:text-gray-400 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#A68962] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Price Calculations */}
      <div className="space-y-3 pt-2 text-xs text-gray-600 dark:text-gray-300">
        <div className="flex justify-between">
          <span>Bag Subtotal</span>
          <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
            <span>Special Promotional Savings</span>
            <span>- {formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Estimated Delivery</span>
          <span>{shippingFee === 0 ? <strong className="text-emerald-700 dark:text-emerald-400">FREE</strong> : formatPrice(shippingFee)}</span>
        </div>

        <div className="pt-3 border-t border-[#E5E0D6] dark:border-[#27272A] flex justify-between text-sm font-bold text-gray-900 dark:text-white">
          <span>Estimated Total</span>
          <span className="text-base text-[#1E1E1E] dark:text-white">{formatPrice(grandTotal)}</span>
        </div>
      </div>

      {/* Promo Code Input */}
      <div className="pt-2 border-t border-[#E5E0D6] dark:border-[#27272A]">
        {appliedCoupon ? (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
            <div className="flex items-center space-x-2">
              <Tag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-bold">{appliedCoupon.code}</span>
              <span>({appliedCoupon.discountPercent}% off applied)</span>
            </div>
            <button
              onClick={onRemoveCoupon}
              className="text-gray-400 hover:text-black dark:hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="space-y-1.5">
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Promo code (e.g. LUXE15)"
                className="flex-1 px-3 py-2 bg-white dark:bg-[#202026] border border-[#DCD5C9] dark:border-[#2E2E36] rounded-xl text-xs text-[#1E1E1E] dark:text-white focus:outline-none focus:border-[#A68962]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#1E1E1E] dark:bg-[#C5A880] text-white dark:text-black text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-black dark:hover:bg-[#B3956E] transition cursor-pointer"
              >
                Apply
              </button>
            </div>
            {couponError && <p className="text-[11px] text-red-600 dark:text-red-400">{couponError}</p>}
          </form>
        )}
      </div>

      {/* Checkout CTA */}
      {showCheckoutButton && (
        <div className="space-y-3 pt-2">
          <Link
            to="/checkout"
            className="w-full py-4 bg-[#1E1E1E] dark:bg-[#C5A880] hover:bg-black dark:hover:bg-[#B3956E] text-white dark:text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Proceed to Secure Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="text-center">
            <Link
              to="/shop"
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white underline underline-offset-4 tracking-wider uppercase transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}

      {/* Trust badges */}
      <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
        <Shield className="w-3.5 h-3.5 text-[#A68962]" />
        <span>Direct Database Sync • 100% Genuine Couture</span>
      </div>
    </div>
  );
};

export default CartSummary;
