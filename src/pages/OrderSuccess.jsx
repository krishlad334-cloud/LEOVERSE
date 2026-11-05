import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ShoppingBag } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import { getCustomerOrderById } from '../services/productService';
import { formatPrice } from '../utils/formatPrice';

export const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const order = orderId ? getCustomerOrderById(orderId) : null;

  const breadcrumbs = [
    { label: 'Shopping Bag', to: '/cart' },
    { label: 'Checkout', to: '/checkout' },
    { label: 'Order Confirmed' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <Breadcrumb items={breadcrumbs} />

      <div className="mt-6 bg-white dark:bg-[#18181C] border border-[#EAE5DC] dark:border-[#27272A] rounded-3xl p-6 sm:p-12 shadow-xl text-center space-y-6">
        {/* Animated Check Badge */}
        <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-300 dark:border-emerald-700 animate-in zoom-in duration-300 shadow-sm">
          <CheckCircle2 className="w-10 h-10 stroke-[2.25]" />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#A68962] dark:text-[#C5A880]">
            Thank You For Shopping With LEOVERSE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#242321] dark:text-white tracking-tight">
            Your Order Is Confirmed!
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            We have reserved your pieces. Our atelier artisans have begun prepping your garments for pristine packaging and express dispatch.
          </p>
        </div>

        {/* Order Quick Details Card */}
        <div className="bg-[#FAF9F6] dark:bg-[#202026] rounded-2xl p-6 border border-[#EAE5DC] dark:border-[#2E2E36] max-w-xl mx-auto text-left space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EAE5DC] dark:border-[#2E2E36] text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Order Number</span>
              <span className="font-mono font-bold text-sm text-[#242321] dark:text-white">
                {order ? order.orderId : (orderId || 'LEO-2026-CONFIRMED')}
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Estimated Delivery</span>
              <span className="font-bold text-xs text-emerald-600">
                {order?.estimatedDelivery || 'In 3-5 business days'}
              </span>
            </div>
          </div>

          {order && (
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Shipping to:</span>
                <span className="font-medium text-right max-w-xs truncate text-[#242321] dark:text-white">
                  {order.customerName || 'Dev Sharma'} ({order.shippingAddress || 'Mumbai'})
                </span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Total Amount:</span>
                <span className="font-bold text-[#242321] dark:text-white">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2 text-[11px] text-gray-500">
            <Truck className="w-4 h-4 text-[#A68962]" />
            <span>Tracking updates and digital invoice sent to your email.</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          {order && (
            <Link
              to={`/account/orders/${order.orderId}`}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#242321] dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider rounded-xl transition hover:opacity-90 inline-flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Track Order Details</span>
            </Link>
          )}

          <Link
            to="/products"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF9F6] dark:bg-[#202026] text-[#242321] dark:text-white border border-[#D8D2C8] dark:border-[#383842] font-bold text-xs uppercase tracking-wider rounded-xl transition hover:border-[#A68962] inline-flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
