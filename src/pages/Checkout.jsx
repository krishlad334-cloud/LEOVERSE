import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, CreditCard, Smartphone, Building, Truck, ArrowLeft, Sparkles, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { createOrder } from '../services/api';
import { getVisitorId } from '../utils/analytics';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Breadcrumb from '../components/common/Breadcrumb';

export const Checkout = () => {
  const {
    cartItems,
    subtotal,
    shippingFee,
    discount,
    appliedCoupon,
    grandTotal,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('UPI / QR Code');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const indianStates = [
    'Andhra Pradesh', 'Delhi', 'Goa', 'Gujarat', 'Karnataka',
    'Kerala', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu',
    'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = '10-digit phone number is required';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode)) errs.pincode = '6-digit Indian PIN is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const orderPayload = {
        visitorId: getVisitorId(),
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: `${formData.address}, ${formData.apartment ? formData.apartment + ', ' : ''}${formData.city}, ${formData.state} - ${formData.pincode}`,
        paymentMethod,
        discount: discount || 0,
        items: cartItems.map((item) => ({
          productId: item.id,
          productName: item.name,
          price: item.sellingPrice || item.salePrice || item.price,
          quantity: item.quantity,
          size: item.selectedSize || 'M',
          color: item.selectedColor || 'Standard'
        }))
      };

      // Real database write to SQLite
      const created = await createOrder(orderPayload);
      setOrderSuccess(created);
      clearCart();
    } catch (err) {
      alert(err.message || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  const breadcrumbs = [
    { label: 'Bag', to: '/cart' },
    { label: 'Checkout' },
  ];

  if (orderSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#A68962]">
          Order Confirmed & Placed in Database
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#1E1E1E] mt-2 mb-3">
          Thank you for choosing LEOVERSE.
        </h1>
        <p className="text-sm text-gray-600 max-w-lg mx-auto mb-6">
          Your order has been recorded under reference <strong className="text-black font-mono">{orderSuccess.orderNumber}</strong>. An electronic receipt has been dispatched to {orderSuccess.customerEmail}.
        </p>

        {/* Order confirmation details */}
        <div className="bg-[#F8F6F2] border border-[#E5E0D6] rounded-2xl p-6 text-xs text-gray-700 max-w-lg mx-auto mb-8 text-left space-y-3">
          <div className="flex items-center space-x-2 text-emerald-700 font-bold uppercase tracking-wider text-[11px]">
            <Sparkles className="w-4 h-4" />
            <span>Order Confirmed & Verified</span>
          </div>
          <p>
            Your order has been registered with our atelier team. You will receive real-time shipment updates via email and SMS as your handcrafted garments are prepared.
          </p>
          <div className="pt-2 border-t border-[#E5E0D6] flex justify-between font-bold text-black text-sm">
            <span>Total Paid:</span>
            <span>₹{orderSuccess.totalAmount?.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/shop"
            className="px-6 py-3 bg-[#1E1E1E] hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
          >
            Continue Shopping
          </Link>
          <Link
            to="/admin"
            className="px-6 py-3 bg-[#C5A880] hover:bg-[#B3956E] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition"
          >
            Inspect in Admin Dashboard →
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-gray-800">Your Shopping Bag is Empty</h2>
        <p className="text-sm text-gray-500">Add apparel pieces from our collection before checking out.</p>
        <Link
          to="/shop"
          className="inline-block px-6 py-3 bg-[#1E1E1E] text-white text-xs font-bold uppercase tracking-wider rounded-xl"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1E1E] dark:text-white mt-4 mb-8">
        Secure Checkout & Delivery
      </h1>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Customer Info, Shipping Address, Payment */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Contact Information */}
          <div className="bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1E1E1E] dark:text-white pb-3 border-b border-[#E5E0D6] dark:border-[#27272A]">
              1. Contact & Customer Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Vikram Singhania"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[#F9F7F2] dark:bg-[#202026] border border-[#DCD5C9] dark:border-[#2E2E36] text-black dark:text-white rounded-xl text-xs focus:outline-none focus:border-[#A68962]"
                />
                {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="vikram@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[#F9F7F2] dark:bg-[#202026] border border-[#DCD5C9] dark:border-[#2E2E36] text-black dark:text-white rounded-xl text-xs focus:outline-none focus:border-[#A68962]"
                />
                {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Mobile Number (for delivery updates) *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[#F9F7F2] dark:bg-[#202026] border border-[#DCD5C9] dark:border-[#2E2E36] text-black dark:text-white rounded-xl text-xs focus:outline-none focus:border-[#A68962]"
                />
                {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* 2. Shipping Address */}
          <div className="bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1E1E1E] dark:text-white pb-3 border-b border-[#E5E0D6] dark:border-[#27272A]">
              2. Shipping Address
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Street Address / House / Flat *</label>
                <input
                  type="text"
                  name="address"
                  placeholder="e.g. 42 Golf Links, Tower B, Apt 14"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[#F9F7F2] dark:bg-[#202026] border border-[#DCD5C9] dark:border-[#2E2E36] text-black dark:text-white rounded-xl text-xs focus:outline-none focus:border-[#A68962]"
                />
                {errors.address && <p className="text-[11px] text-red-600 mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Mumbai"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-[#F9F7F2] dark:bg-[#202026] border border-[#DCD5C9] dark:border-[#2E2E36] text-black dark:text-white rounded-xl text-xs focus:outline-none focus:border-[#A68962]"
                  />
                  {errors.city && <p className="text-[11px] text-red-600 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-[#F9F7F2] dark:bg-[#202026] border border-[#DCD5C9] dark:border-[#2E2E36] text-black dark:text-white rounded-xl text-xs focus:outline-none focus:border-[#A68962]"
                  >
                    {indianStates.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">PIN Code *</label>
                  <input
                    type="text"
                    maxLength={6}
                    name="pincode"
                    placeholder="400001"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-[#F9F7F2] dark:bg-[#202026] border border-[#DCD5C9] dark:border-[#2E2E36] text-black dark:text-white rounded-xl text-xs focus:outline-none focus:border-[#A68962]"
                  />
                  {errors.pincode && <p className="text-[11px] text-red-600 mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1E1E1E] dark:text-white pb-3 border-b border-[#E5E0D6] dark:border-[#27272A]">
              3. Payment Selection
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { id: 'UPI / QR Code', label: 'UPI / Google Pay / PhonePe', icon: Smartphone },
                { id: 'Credit / Debit Card', label: 'Credit / Debit Card (Visa, MC, Amex)', icon: CreditCard },
                { id: 'Net Banking', label: 'Net Banking (All Indian Banks)', icon: Building },
                { id: 'Cash on Delivery', label: 'Pay On Delivery (COD)', icon: Truck }
              ].map((p) => {
                const Icon = p.icon;
                const isSelected = paymentMethod === p.id;
                return (
                  <label
                    key={p.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer flex items-center space-x-3 transition ${
                      isSelected
                        ? 'border-[#A68962] bg-[#F8F6F2] dark:bg-[#202026]'
                        : 'border-[#E5E0D6] dark:border-[#2A2A34] hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={isSelected}
                      onChange={() => setPaymentMethod(p.id)}
                      className="accent-[#A68962]"
                    />
                    <Icon className="w-4 h-4 text-[#A68962]" />
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{p.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F8F6F2] dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl p-6 space-y-4 sticky top-24 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] dark:text-white pb-3 border-b border-[#E5E0D6] dark:border-[#27272A]">
              Order Summary ({cartItems.length} items)
            </h3>

            {/* Items list preview */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 py-1">
                  <img
                    src={item.images?.[0] || 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=100&q=80'}
                    alt={item.name}
                    className="w-12 h-14 object-cover rounded-lg border border-[#E5E0D6] dark:border-[#27272A]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs text-gray-900 dark:text-white truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">
                      Size: {item.selectedSize} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-xs text-gray-900 dark:text-white">
                    {formatPrice((item.sellingPrice || item.salePrice || item.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price breakup */}
            <div className="pt-3 border-t border-[#E5E0D6] dark:border-[#27272A] space-y-2 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-gray-900 dark:text-white font-semibold">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-medium">
                  <span>Coupon Savings</span>
                  <span>- {formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Delivery</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700 dark:text-emerald-400">FREE</strong> : formatPrice(shippingFee)}</span>
              </div>
              <div className="pt-3 border-t border-[#E5E0D6] dark:border-[#27272A] flex justify-between text-sm font-bold text-gray-900 dark:text-white">
                <span>Grand Total</span>
                <span className="text-base text-[#1E1E1E] dark:text-white">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-[#1E1E1E] dark:bg-[#C5A880] hover:bg-black dark:hover:bg-[#B3956E] text-white dark:text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl shadow-xl transition cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Order...</span>
                </>
              ) : (
                <span>Confirm & Place Order • {formatPrice(grandTotal)}</span>
              )}
            </button>

            <div className="pt-2 flex items-center justify-center space-x-2 text-[10px] text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>256-Bit Encrypted Secure SSL Checkout</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
