import React from 'react';
import { useParams } from 'react-router-dom';
import { Package, Truck, CheckCircle2, Clock, Printer, ShieldCheck, MapPin, CreditCard } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import { formatPrice } from '../utils/formatPrice';
import { getCustomerOrderById } from '../services/productService';

export const OrderDetails = () => {
  const { id } = useParams();
  const order = getCustomerOrderById(id);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <EmptyState
          icon={Package}
          title="Order Not Found"
          description={`We could not locate order "${id}". Please check your order history.`}
          actionLabel="View All Orders"
          actionTo="/account/orders"
        />
      </div>
    );
  }

  const items = order.items || [];
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = order.discount || 0;
  const grandTotal = order.total || subtotal - discount;

  const breadcrumbs = [
    { label: 'My Account', to: '/account' },
    { label: 'My Orders', to: '/account/orders' },
    { label: order.orderId }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      {/* Header */}
      <div className="py-6 border-b border-[#D8D2C8] dark:border-[#27272A] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68962] dark:text-[#C5A880]">
              Order Confirmed
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-xs text-gray-500">{order.date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#242321] dark:text-white mt-1">
            Order {order.orderId}
          </h1>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 border border-[#D8D2C8] dark:border-[#383842] rounded-xl text-xs font-bold uppercase tracking-wider text-[#242321] dark:text-white hover:border-[#A68962] transition cursor-pointer self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>Print Invoice</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Tracking Timeline & Items */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Tracking Stepper */}
          <div className="bg-white dark:bg-[#18181C] border border-[#D8D2C8] dark:border-[#27272A] rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE5DC] dark:border-[#27272A] mb-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#242321] dark:text-white">
                  Shipment Progress
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Handled by <strong className="text-black dark:text-white">{order.courier || 'Bluedart Express Priority'}</strong> • AWB: <strong className="font-mono text-black dark:text-white">{order.trackingNumber || 'Pending'}</strong>
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
                {order.status || 'Confirmed'}
              </span>
            </div>

            {/* Visual Steps */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs relative">
              <div className="space-y-2">
                <div className="w-8 h-8 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="font-bold text-[#242321] dark:text-white block text-[11px] uppercase">Placed</span>
                <span className="text-[10px] text-gray-500 block">{order.date}</span>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="font-bold text-[#242321] dark:text-white block text-[11px] uppercase">Tailored</span>
                <span className="text-[10px] text-gray-500 block">Quality Verified</span>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 mx-auto rounded-full bg-[#A68962] text-white flex items-center justify-center animate-pulse">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="font-bold text-[#A68962] block text-[11px] uppercase">In Transit</span>
                <span className="text-[10px] text-gray-500 block">Bluedart Air</span>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 mx-auto rounded-full bg-gray-200 dark:bg-gray-800 text-gray-400 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="font-medium text-gray-400 block text-[11px] uppercase">Delivery</span>
                <span className="text-[10px] text-gray-500 block">By {order.estimatedDelivery || 'In 3-5 days'}</span>
              </div>
            </div>
          </div>

          {/* Garments in this Order */}
          <div className="bg-white dark:bg-[#18181C] border border-[#D8D2C8] dark:border-[#27272A] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#242321] dark:text-white pb-3 border-b border-[#EAE5DC] dark:border-[#27272A]">
              Garments in Shipment ({items.length})
            </h3>

            <div className="divide-y divide-[#F0ECE1] dark:divide-[#27272A]">
              {items.map((item, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80'}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-lg bg-[#EAE5DC]"
                    />
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-[#242321] dark:text-white">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Size: <strong className="text-black dark:text-white">{item.size || item.selectedSize || 'M'}</strong> | Color: <strong className="text-black dark:text-white">{item.color || item.selectedColor || 'Standard'}</strong> | Quantity: {item.quantity}
                      </p>
                      <p className="text-xs font-bold text-[#242321] dark:text-white">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold text-[#242321] dark:text-white">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Address, Payment & Financial Summary */}
        <div className="lg:col-span-4 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white dark:bg-[#18181C] border border-[#D8D2C8] dark:border-[#27272A] rounded-2xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A68962]">
              <MapPin className="w-4 h-4" />
              <span>Delivery Address</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              <strong className="text-black dark:text-white block text-sm mb-1">{order.customerName || 'Dev Sharma'}</strong>
              {order.shippingAddress || 'Flat 402, Highmont Residences, Bandra West, Mumbai - 400050'}
              {order.customerPhone && <><br /><span className="font-mono mt-1 block">Phone: {order.customerPhone}</span></>}
            </p>
          </div>

          {/* Payment Method */}
          <div className="bg-white dark:bg-[#18181C] border border-[#D8D2C8] dark:border-[#27272A] rounded-2xl p-6 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A68962]">
              <CreditCard className="w-4 h-4" />
              <span>Payment Details</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Method: <strong className="text-black dark:text-white">{order.paymentMethod || 'UPI / QR Code'}</strong>
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Payment Verified & Authenticated</span>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="bg-white dark:bg-[#18181C] border border-[#D8D2C8] dark:border-[#27272A] rounded-2xl p-6 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#242321] dark:text-white pb-2 border-b border-[#EAE5DC] dark:border-[#27272A]">
              Payment Summary
            </h4>
            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-black dark:text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-emerald-600 font-semibold">Free Express</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span>Special Privilege Savings</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#EAE5DC] dark:border-[#27272A] flex justify-between text-sm font-bold text-[#242321] dark:text-white">
                <span>Total Paid</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
