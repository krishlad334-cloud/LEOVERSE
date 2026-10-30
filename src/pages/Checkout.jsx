import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, CreditCard, Smartphone, Building, Truck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
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

  const [paymentMethod, setPaymentMethod] = useState('card');
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
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please provide a 10-digit mobile number';
    }
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.pincode.trim()) {
      errs.pincode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      errs.pincode = 'Valid 6-digit PIN code required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const orderId = `LV-${Math.floor(100000 + Math.random() * 900000)}`;
    const completedOrder = {
      orderId,
      customer: formData,
      items: cartItems.map((item) => ({
        name: item.name,
        color: item.selectedColor || item.colors?.[0]?.name || 'Standard',
        size: item.selectedSize || item.sizes?.[0] || 'Standard',
        price: item.salePrice || item.price,
        quantity: item.quantity,
        image: item.images?.[0] || '',
      })),
      total: grandTotal,
      paymentMethod,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Tailoring in Progress',
      trackingNumber: `DEL-IND-${Math.floor(100000 + Math.random() * 900000)}`,
      courier: 'Bluedart Express Priority Air',
      estimatedDelivery: '3-4 business days',
    };

    // Save to localStorage orders list
    try {
      const existing = JSON.parse(localStorage.getItem('leoverse_orders') || '[]');
      localStorage.setItem('leoverse_orders', JSON.stringify([completedOrder, ...existing]));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }

    setOrderSuccess(completedOrder);
    clearCart();
  };

  const breadcrumbs = [
    { label: 'Bag', to: '/cart' },
    { label: 'Checkout' },
  ];

  if (orderSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
        <div className="w-16 h-16 bg-[#EAE5DC] text-[#242321] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 stroke-[1.25]" />
        </div>
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#77746E]">
          Order Confirmed
        </span>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#242321] mt-2 mb-3">
          Thank you for choosing LEOVERSE.
        </h1>
        <p className="text-sm text-[#77746E] max-w-lg mx-auto mb-6">
          Your reservation has been recorded under order reference <strong className="text-[#242321]">{orderSuccess.orderId}</strong>. A confirmation note has been dispatched to {orderSuccess.customer.email}.
        </p>

        {/* Demo Notice Alert */}
        <div className="bg-[#EAE5DC]/50 border border-[#D8D2C8] p-4 text-xs text-[#77746E] max-w-lg mx-auto mb-8 text-left space-y-1">
          <span className="font-semibold text-[#242321] block uppercase tracking-wider">
            Frontend Demonstration
          </span>
          <p>
            No actual financial transaction occurred. All order details were simulated in client memory.
          </p>
        </div>

        {/* Order Summary Receipt */}
        <div className="bg-[#FAF9F6] border border-[#D8D2C8] p-6 text-left max-w-lg mx-auto mb-8 space-y-3">
          <div className="flex justify-between text-xs pb-3 border-b border-[#D8D2C8]">
            <span className="text-[#77746E]">Recipient:</span>
            <span className="font-medium text-[#242321]">{orderSuccess.customer.fullName}</span>
          </div>
          <div className="flex justify-between text-xs pb-3 border-b border-[#D8D2C8]">
            <span className="text-[#77746E]">Delivery to:</span>
            <span className="font-medium text-[#242321] text-right">
              {orderSuccess.customer.city}, {orderSuccess.customer.state} - {orderSuccess.customer.pincode}
            </span>
          </div>
          <div className="flex justify-between text-xs pb-3 border-b border-[#D8D2C8]">
            <span className="text-[#77746E]">Amount:</span>
            <span className="font-bold text-[#242321]">{formatPrice(orderSuccess.total)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#77746E]">Payment Method:</span>
            <span className="font-medium text-[#242321] uppercase">{orderSuccess.paymentMethod}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button to="/order-tracking" variant="primary" size="lg">
            Track This Order →
          </Button>
          <Button to="/shop" variant="secondary" size="lg">
            Continue Exploring
          </Button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-medium text-[#242321]">Your bag is currently empty</h2>
        <p className="text-xs text-[#77746E]">Please select garments before checking out.</p>
        <Button to="/shop" variant="primary">Return to Shop</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="pb-8 mb-8 border-b border-[#D8D2C8]">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#242321]">
          Checkout
        </h1>
        <p className="text-xs text-[#77746E] mt-1">
          Provide your delivery details and choose your preferred method of settlement.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left: Shipping & Payment Form */}
          <div className="lg:col-span-7 space-y-10">
            {/* Contact Information */}
            <section className="space-y-4">
              <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[#242321] pb-2 border-b border-[#D8D2C8]">
                1. Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Kabir Sethi"
                  error={errors.fullName}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="kabir@example.com"
                  error={errors.email}
                  required
                />
              </div>
              <Input
                label="Phone Number (for delivery updates)"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="10-digit mobile number"
                error={errors.phone}
                required
              />
            </section>

            {/* Shipping Address */}
            <section className="space-y-4">
              <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[#242321] pb-2 border-b border-[#D8D2C8]">
                2. Delivery Destination
              </h2>
              <Input
                label="Street Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="House / Flat / Building, Street"
                error={errors.address}
                required
              />
              <Input
                label="Apartment, suite, landmark (optional)"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                placeholder="Near heritage park"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Mumbai"
                  error={errors.city}
                  required
                />
                <div>
                  <label className="block text-xs uppercase tracking-[0.08em] font-medium text-[#242321] mb-2">
                    State <span className="text-[#9B7D72]">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-transparent border border-[#D8D2C8] text-sm text-[#242321] focus:outline-none focus:border-[#242321]"
                  >
                    {indianStates.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
                <Input
                  label="PIN Code"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="400001"
                  error={errors.pincode}
                  required
                />
              </div>
            </section>

            {/* Payment Method Selector */}
            <section className="space-y-4">
              <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[#242321] pb-2 border-b border-[#D8D2C8]">
                3. Payment Method
              </h2>
              <div className="space-y-3">
                {/* Credit / Debit Card */}
                <label className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                  paymentMethod === 'card' ? 'border-[#242321] bg-[#FAF9F6]' : 'border-[#D8D2C8] bg-transparent'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-[#252522]"
                    />
                    <CreditCard className="w-4 h-4 text-[#242321]" />
                    <span className="text-xs font-medium uppercase tracking-wider text-[#242321]">
                      Credit or Debit Card
                    </span>
                  </div>
                  <span className="text-[11px] text-[#77746E]">Visa, Mastercard, RuPay</span>
                </label>

                {/* UPI */}
                <label className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                  paymentMethod === 'upi' ? 'border-[#242321] bg-[#FAF9F6]' : 'border-[#D8D2C8] bg-transparent'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-[#252522]"
                    />
                    <Smartphone className="w-4 h-4 text-[#242321]" />
                    <span className="text-xs font-medium uppercase tracking-wider text-[#242321]">
                      UPI Instant Transfer
                    </span>
                  </div>
                  <span className="text-[11px] text-[#77746E]">Google Pay, PhonePe, Paytm</span>
                </label>

                {/* Net Banking */}
                <label className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                  paymentMethod === 'netbanking' ? 'border-[#242321] bg-[#FAF9F6]' : 'border-[#D8D2C8] bg-transparent'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="netbanking"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                      className="accent-[#252522]"
                    />
                    <Building className="w-4 h-4 text-[#242321]" />
                    <span className="text-xs font-medium uppercase tracking-wider text-[#242321]">
                      Net Banking
                    </span>
                  </div>
                  <span className="text-[11px] text-[#77746E]">HDFC, ICICI, SBI, Axis</span>
                </label>

                {/* Cash on Delivery */}
                <label className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                  paymentMethod === 'cod' ? 'border-[#242321] bg-[#FAF9F6]' : 'border-[#D8D2C8] bg-transparent'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#252522]"
                    />
                    <Truck className="w-4 h-4 text-[#242321]" />
                    <span className="text-xs font-medium uppercase tracking-wider text-[#242321]">
                      Pay Upon Delivery
                    </span>
                  </div>
                  <span className="text-[11px] text-[#77746E]">Cash or UPI at doorstep</span>
                </label>
              </div>
            </section>
          </div>

          {/* Right: Order Review & Place Button */}
          <div className="lg:col-span-5">
            <div className="bg-[#EAE5DC]/50 border border-[#D8D2C8] p-6 sm:p-8 space-y-6 sticky top-28">
              <h3 className="text-sm font-semibold tracking-[0.14em] uppercase text-[#242321] pb-3 border-b border-[#D8D2C8]">
                Your Order ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </h3>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto divide-y divide-[#D8D2C8] pr-1">
                {cartItems.map((item) => (
                  <div key={item.cartItemId} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-14 object-cover shrink-0 bg-[#EAE5DC]" />
                      <div>
                        <p className="font-medium text-[#242321] truncate max-w-[160px]">{item.name}</p>
                        <p className="text-[11px] text-[#77746E]">
                          {item.selectedSize} / {item.selectedColor} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium text-[#242321] shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2.5 text-xs tracking-wider border-t border-[#D8D2C8] pt-4">
                <div className="flex justify-between text-[#77746E]">
                  <span>Subtotal</span>
                  <span className="text-[#242321] font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#77746E]">
                  <span>Shipping</span>
                  <span className="text-[#242321] font-medium">
                    {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#9B7D72]">
                    <span>Discount {appliedCoupon && `(${appliedCoupon.code})`}</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-semibold text-[#242321] pt-3 border-t border-[#D8D2C8]">
                  <span>Total Due</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
              >
                Place Order • {formatPrice(grandTotal)}
              </Button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#77746E] pt-2">
                <ShieldCheck className="w-4 h-4 text-[#242321]" />
                <span>256-bit SSL encrypted • Risk-free demo checkout</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
