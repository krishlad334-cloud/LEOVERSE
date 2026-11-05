import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Smartphone,
  Building,
  Truck,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  MapPin,
  Lock,
  Plus
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { createOrder } from '../services/api';
import { getSavedAddresses } from '../services/productService';
import Breadcrumb from '../components/common/Breadcrumb';

export const Checkout = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    subtotal,
    shippingFee,
    discount,
    appliedCoupon,
    grandTotal,
    clearCart,
  } = useCart();

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI / QR Code');
  const [formData, setFormData] = useState({
    fullName: 'Dev Sharma',
    email: 'dev.sharma@example.com',
    phone: '9876543210',
    address: 'Flat 402, Highmont Residences',
    apartment: 'Off Linking Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const addrs = getSavedAddresses();
    setSavedAddresses(addrs);
    if (addrs.length > 0) {
      const def = addrs.find((a) => a.isDefault) || addrs[0];
      setSelectedAddressId(def.id);
      setFormData((prev) => ({
        ...prev,
        fullName: def.name || prev.fullName,
        phone: def.phone ? def.phone.replace(/\D/g, '').slice(-10) : prev.phone,
        address: def.addressLine1 || prev.address,
        apartment: def.addressLine2 || '',
        city: def.city || prev.city,
        state: def.state || prev.state,
        pincode: def.pincode || prev.pincode
      }));
    }
  }, []);

  const handleSelectSavedAddress = (addr) => {
    setSelectedAddressId(addr.id);
    setFormData((prev) => ({
      ...prev,
      fullName: addr.name || prev.fullName,
      phone: addr.phone ? addr.phone.replace(/\D/g, '').slice(-10) : prev.phone,
      address: addr.addressLine1 || prev.address,
      apartment: addr.addressLine2 || '',
      city: addr.city || prev.city,
      state: addr.state || prev.state,
      pincode: addr.pincode || prev.pincode
    }));
  };

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
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = '10-digit mobile number is required';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode)) errs.pincode = 'Valid 6-digit Indian PIN code required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const orderPayload = {
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: `${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        paymentMethod,
        discount: discount || 0,
        total: grandTotal,
        items: cartItems.map((item) => ({
          id: item.productId || item.id,
          productId: item.productId || item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.selectedSize || 'M',
          color: item.selectedColor || 'Standard',
          image: item.image || ''
        }))
      };

      const created = await createOrder(orderPayload);
      clearCart();
      navigate(`/order-success?orderId=${encodeURIComponent(created.orderId)}`);
    } catch (err) {
      alert(err.message || 'Failed to place order');
      setSubmitting(false);
    }
  };

  const breadcrumbs = [
    { label: 'Shopping Bag', to: '/cart' },
    { label: 'Secure Checkout' }
  ];

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-[#242321] dark:text-white">Your Shopping Bag is Empty</h1>
        <p className="text-xs text-gray-500">Please select garments to proceed to checkout.</p>
        <Link to="/products" className="inline-block px-6 py-3 bg-[#242321] text-white text-xs font-bold uppercase rounded-xl">
          Discover Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 select-none">
      <Breadcrumb items={breadcrumbs} />

      <div className="pb-6 mb-8 border-b border-[#D8D2C8] dark:border-[#27272A] flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68962] dark:text-[#C5A880]">
            Step 2 of 2 • Express Checkout
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#242321] dark:text-white mt-1">
            Shipping & Payment
          </h1>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
          <Lock className="w-3.5 h-3.5" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Form: Delivery Address & Payment Method */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Saved Address Quick Selector */}
            {savedAddresses.length > 0 && (
              <div className="bg-white dark:bg-[#18181C] border border-[#D8D2C8] dark:border-[#27272A] rounded-2xl p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#EAE5DC] dark:border-[#27272A]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#A68962]">
                    Select From Saved Addresses
                  </h3>
                  <Link to="/account/addresses" className="text-[11px] font-semibold text-gray-500 hover:text-black dark:hover:text-white">
                    Manage Addresses
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {savedAddresses.map((addr) => {
                    const isSelected = selectedAddressId === addr.id;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => handleSelectSavedAddress(addr)}
                        className={`p-3.5 rounded-xl border text-xs cursor-pointer transition ${
                          isSelected
                            ? 'border-[#A68962] bg-[#FAF9F6] dark:bg-[#202026] ring-1 ring-[#A68962]'
                            : 'border-[#D8D2C8] dark:border-[#27272A] hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-[#242321] dark:text-white mb-1">
                          <span>{addr.name}</span>
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-gray-200 dark:bg-gray-800">
                            {addr.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-600 dark:text-gray-300 line-clamp-2">
                          {addr.addressLine1}, {addr.city} - {addr.pincode}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Address Details Form */}
            <div className="bg-white dark:bg-[#18181C] border border-[#D8D2C8] dark:border-[#27272A] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#242321] dark:text-white pb-2 border-b border-[#EAE5DC] dark:border-[#27272A] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#A68962]" />
                <span>Shipping Address Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-xl text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                  />
                  {errors.fullName && <p className="text-[10px] text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                    Email Address (For Invoice & Tracking) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-xl text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                  />
                  {errors.email && <p className="text-[10px] text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-xl text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                  />
                  {errors.phone && <p className="text-[10px] text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-xl text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                  />
                  {errors.pincode && <p className="text-[10px] text-red-600 mt-1">{errors.pincode}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                    Street Address / Flat / Building *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-xl text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                  />
                  {errors.address && <p className="text-[10px] text-red-600 mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-xl text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                  />
                  {errors.city && <p className="text-[10px] text-red-600 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-xl text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                  >
                    {indianStates.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white dark:bg-[#18181C] border border-[#D8D2C8] dark:border-[#27272A] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#242321] dark:text-white pb-2 border-b border-[#EAE5DC] dark:border-[#27272A] flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#A68962]" />
                <span>Select Payment Method</span>
              </h3>

              <div className="space-y-3">
                {[
                  { id: 'UPI / QR Code', title: 'UPI Instant (GPay / PhonePe / Paytm / QR)', icon: Smartphone, desc: 'Instant verification via UPI App' },
                  { id: 'Credit / Debit Card', title: 'Credit or Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay & American Express' },
                  { id: 'Net Banking', title: 'Net Banking', icon: Building, desc: 'All Indian Premier Banks Supported' },
                  { id: 'Cash On Delivery', title: 'Cash On Delivery (COD)', icon: Truck, desc: 'Pay cash or UPI upon delivery' }
                ].map((m) => {
                  const active = paymentMethod === m.id;
                  const IconComp = m.icon;
                  return (
                    <label
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                        active
                          ? 'border-[#A68962] bg-[#FAF9F6] dark:bg-[#202026] ring-1 ring-[#A68962]'
                          : 'border-[#D8D2C8] dark:border-[#27272A] hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={active}
                        onChange={() => setPaymentMethod(m.id)}
                        className="mt-1 text-[#A68962] focus:ring-[#A68962]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <IconComp className="w-4 h-4 text-[#A68962]" />
                          <span className="text-xs font-bold text-[#242321] dark:text-white">{m.title}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">{m.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Summary: Cart Items & Financials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF9F6] dark:bg-[#18181C] border border-[#EAE5DC] dark:border-[#27272A] rounded-2xl p-6 sm:p-8 space-y-6 sticky top-28 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#242321] dark:text-white pb-3 border-b border-[#EAE5DC] dark:border-[#27272A]">
                Order Items ({cartItems.length})
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-[#EAE5DC] dark:divide-[#27272A]">
                {cartItems.map((item) => (
                  <div key={item.cartItemId} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-14 object-cover rounded-lg bg-[#EAE5DC]"
                      />
                      <div className="space-y-0.5">
                        <h4 className="font-semibold text-[#242321] dark:text-white line-clamp-1 max-w-[170px]">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-gray-500 font-mono block">
                          Size: {item.selectedSize} | Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-[#242321] dark:text-white">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-2.5 pt-3 border-t border-[#EAE5DC] dark:border-[#27272A] text-xs text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-black dark:text-white">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-rose-600 font-semibold">
                    <span>Promotional Savings (LUXE15)</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Delivery</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#EAE5DC] dark:border-[#27272A] flex justify-between text-base font-extrabold text-[#242321] dark:text-white">
                  <span>Total Payable</span>
                  <span className="text-lg">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#242321] dark:bg-white text-white dark:text-black font-extrabold text-xs uppercase tracking-[0.2em] rounded-xl transition shadow-xl hover:opacity-90 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Confirming Order...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#A68962]" />
                    <span>Confirm & Place Order</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-gray-500 leading-tight">
                By placing your order, you agree to LEOVERSE's Terms of Service and 30-Day Hassle-Free Returns.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
