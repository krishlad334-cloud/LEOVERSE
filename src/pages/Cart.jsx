import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';

export const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    isFreeShipping,
    amountToFreeShipping,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    grandTotal,
  } = useCart();

  const breadcrumbs = [{ label: 'Shopping Bag' }];

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Breadcrumb items={breadcrumbs} />
        <EmptyState
          icon={ShoppingBag}
          title="Your shopping bag is empty"
          description="You haven't added any pieces yet. Explore our latest arrivals or foundational essentials to begin building your everyday rotation."
          actionLabel="Explore Collections"
          actionTo="/shop"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="pb-8 mb-8 border-b border-[#D8D2C8] dark:border-[#27272A]">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#242321] dark:text-white">
          Shopping Bag
        </h1>
        <p className="text-xs text-[#77746E] dark:text-gray-400 mt-1">
          Review your selected menswear pieces and proceed to express checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-7 divide-y divide-[#D8D2C8] dark:divide-[#27272A] -mt-6">
          {cartItems.map((item) => (
            <CartItem
              key={item.cartItemId}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5">
          <CartSummary
            subtotal={subtotal}
            shippingFee={shippingFee}
            isFreeShipping={isFreeShipping}
            amountToFreeShipping={amountToFreeShipping}
            discount={discount}
            appliedCoupon={appliedCoupon}
            onApplyCoupon={applyCoupon}
            onRemoveCoupon={removeCoupon}
            grandTotal={grandTotal}
            showCheckoutButton={true}
            cartItems={cartItems}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
