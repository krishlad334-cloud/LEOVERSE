import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Check, X, Shield, Truck } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../common/Button';

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
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;
    const res = onApplyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCode('');
    }
  };

  const freeShippingThreshold = 2999;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="bg-[#EAE5DC]/50 border border-[#D8D2C8] p-6 sm:p-8 space-y-6">
      <h3 className="text-sm font-semibold tracking-[0.14em] uppercase text-[#242321] pb-3 border-b border-[#D8D2C8]">
        Order Summary
      </h3>

      {/* Free Shipping Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs tracking-wider">
          {isFreeShipping ? (
            <span className="text-[#242321] font-medium flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" />
              You've unlocked complimentary shipping!
            </span>
          ) : (
            <span className="text-[#77746E]">
              Add <strong className="text-[#242321]">{formatPrice(amountToFreeShipping)}</strong> more for complimentary shipping
            </span>
          )}
          <span className="text-[11px] text-[#77746E]">{progressPercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#D8D2C8] overflow-hidden">
          <div
            className="h-full bg-[#252522] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Subtotal, Shipping, Discount, Total */}
      <div className="space-y-3 text-xs tracking-wider border-b border-[#D8D2C8] pb-6">
        <div className="flex justify-between text-[#77746E]">
          <span>Subtotal</span>
          <span className="text-[#242321] font-medium">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-[#77746E]">
          <span>Estimated Shipping</span>
          <span className="text-[#242321] font-medium">
            {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-[#9B7D72]">
            <span>Promotional Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm sm:text-base font-semibold text-[#242321] pt-3 border-t border-[#D8D2C8]/70">
          <span>Estimated Total</span>
          <span>{formatPrice(grandTotal)}</span>
        </div>
      </div>

      {/* Promo coupon input */}
      <div>
        {appliedCoupon ? (
          <div className="flex items-center justify-between p-3 bg-[#FAF9F6] border border-[#D8D2C8] text-xs">
            <div className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-[#242321]" />
              <span className="font-semibold text-[#242321]">{appliedCoupon.code}</span>
              <span className="text-[#77746E]">({appliedCoupon.name})</span>
            </div>
            <button
              type="button"
              onClick={onRemoveCoupon}
              className="text-[#77746E] hover:text-[#242321] p-1 cursor-pointer"
              aria-label="Remove coupon"
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
                placeholder="Promo code (e.g. LEO10)"
                className="flex-1 px-3 py-2 bg-[#FAF9F6] border border-[#D8D2C8] text-xs text-[#242321] placeholder-[#77746E] focus:outline-none focus:border-[#242321]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#252522] text-[#FAF9F6] text-xs uppercase tracking-wider font-medium hover:bg-[#383733] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
            {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
          </form>
        )}
      </div>

      {/* Checkout button */}
      {showCheckoutButton && (
        <div className="space-y-3">
          <Button to="/checkout" variant="primary" fullWidth size="lg">
            Proceed to Checkout
          </Button>
          <div className="text-center">
            <Link
              to="/shop"
              className="text-xs text-[#77746E] hover:text-[#242321] underline underline-offset-4 tracking-wider uppercase transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}

      {/* Trust badges */}
      <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#77746E]">
        <Shield className="w-3.5 h-3.5 text-[#242321]" />
        <span>Secure encrypted checkout • 30-day effortless returns</span>
      </div>
    </div>
  );
};

export default CartSummary;
