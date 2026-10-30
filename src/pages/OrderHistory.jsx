import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle2, Clock, Search, ArrowRight, ShieldCheck } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import { formatPrice } from '../utils/formatPrice';

const DEFAULT_ORDERS = [
  {
    orderId: 'LEO-2026-8941',
    date: 'October 28, 2026',
    status: 'In Transit',
    trackingNumber: 'DEL-IND-994821',
    courier: 'Bluedart Express Air',
    estimatedDelivery: 'November 2, 2026',
    total: 5880,
    items: [
      {
        name: 'The Essential Oversized Boxy Tee',
        color: 'Burgundy Wine',
        size: 'L',
        price: 1990,
        quantity: 1,
        image: '/images/products/burgundy-oversized-tee-1.jpg'
      },
      {
        name: 'The Heavyweight Street Stripe Hoodie',
        color: 'Jet Black',
        size: 'XL',
        price: 3890,
        quantity: 1,
        image: '/images/products/black-street-hoodie-1.jpg'
      }
    ]
  },
  {
    orderId: 'LEO-2026-7712',
    date: 'September 15, 2026',
    status: 'Delivered',
    trackingNumber: 'DEL-IND-773190',
    courier: 'Delhivery Surface Premium',
    estimatedDelivery: 'Delivered on Sept 18, 2026',
    total: 7490,
    items: [
      {
        name: 'The Italian Wool Tailored Blazer',
        color: 'Obsidian Black',
        size: '42',
        price: 7490,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];

export const OrderHistory = () => {
  const [trackingModalOrder, setTrackingModalOrder] = useState(null);
  const [orders, setOrders] = useState(DEFAULT_ORDERS);
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupAttempted, setLookupAttempted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('leoverse_orders');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders([...parsed, ...DEFAULT_ORDERS]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLookup = (e) => {
    e.preventDefault();
    setLookupAttempted(true);
    const query = lookupQuery.trim().toLowerCase();
    if (!query) return;

    const found = orders.find(
      (o) =>
        o.orderId.toLowerCase().includes(query) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase().includes(query))
    );

    if (found) {
      setLookupResult(found);
      setTrackingModalOrder(found);
    } else {
      setLookupResult(null);
    }
  };

  const breadcrumbs = [
    { label: 'My Account', to: '/account' },
    { label: 'Order History & Tracking' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 select-none">
      <Breadcrumb items={breadcrumbs} />

      <div className="py-6 border-b border-[#D8D2C8] mb-8 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#77746E]">
          Dispatch Logistics
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#242321]">
          Order History & Tracking
        </h1>
        <p className="font-serif italic text-base sm:text-lg text-[#77746E]">
          Monitor the live tailoring dispatch and courier transit of your garments.
        </p>
      </div>

      {/* Quick Lookup Bar */}
      <div className="mb-10 p-6 bg-[#FAF9F6] border border-[#D8D2C8] max-w-2xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#242321] mb-2">
          Track by Order ID or Courier AWB
        </h3>
        <p className="text-xs text-[#77746E] mb-4">
          Enter your order reference (e.g. <span className="font-mono font-semibold">LEO-2026-8941</span> or <span className="font-mono font-semibold">LV-XXXXXX</span>) to inspect dispatch milestones.
        </p>
        <form onSubmit={handleLookup} className="flex gap-2">
          <input
            type="text"
            value={lookupQuery}
            onChange={(e) => setLookupQuery(e.target.value)}
            placeholder="Enter Order ID or Tracking Number..."
            className="flex-1 bg-[#F7F5F0] border border-[#D8D2C8] px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#242321]"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#242321] text-[#F7F5F0] text-xs font-semibold uppercase tracking-wider hover:bg-[#383733] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" /> Track
          </button>
        </form>
        {lookupAttempted && !lookupResult && (
          <p className="text-xs text-red-700 mt-2">
            No consignment found matching "{lookupQuery}". Please check your order reference number.
          </p>
        )}
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-[#FAF9F6] border border-[#D8D2C8] overflow-hidden shadow-xs"
          >
            {/* Order Header bar */}
            <div className="p-4 sm:p-5 bg-[#EAE5DC]/60 border-b border-[#D8D2C8] flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#77746E] block">Order Placed</span>
                  <span className="font-semibold text-[#242321]">{order.date}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#77746E] block">Order Number</span>
                  <span className="font-mono font-bold text-[#242321]">{order.orderId}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#77746E] block">Total Amount</span>
                  <span className="font-bold text-[#242321]">{formatPrice(order.total)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1 ${
                  order.status === 'In Transit' || order.status === 'Tailoring in Progress'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-emerald-100 text-emerald-900'
                }`}>
                  {order.status === 'In Transit' || order.status === 'Tailoring in Progress' ? (
                    <Truck className="w-3 h-3" />
                  ) : (
                    <CheckCircle2 className="w-3 h-3" />
                  )}
                  {order.status}
                </span>

                <button
                  type="button"
                  onClick={() => setTrackingModalOrder(order)}
                  className="px-3 py-1 bg-[#252522] text-[#FAF9F6] text-[11px] font-semibold uppercase tracking-wider hover:bg-black transition-colors cursor-pointer"
                >
                  Track Package
                </button>
              </div>
            </div>

            {/* Items list */}
            <div className="p-5 divide-y divide-[#D8D2C8]/60">
              {order.items.map((item, i) => (
                <div key={i} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80'}
                      alt={item.name}
                      className="w-14 h-16 object-cover bg-[#EAE5DC] border border-[#D8D2C8] shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#242321] truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#77746E] mt-0.5">
                        Color: {item.color} • Size: {item.size} • Qty: {item.quantity}
                      </p>
                      <span className="text-xs font-semibold text-[#242321] block mt-1">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/shop"
                    className="text-xs font-semibold uppercase tracking-wider text-[#242321] hover:underline shrink-0"
                  >
                    Buy Again →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Live Tracking Modal */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setTrackingModalOrder(null)}
          />
          <div className="relative bg-[#FAF9F6] border border-[#D8D2C8] max-w-lg w-full p-6 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D8D2C8]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#77746E]">
                  Live Consignment Status
                </span>
                <h3 className="text-base font-bold text-[#242321]">
                  {trackingModalOrder.orderId}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTrackingModalOrder(null)}
                className="text-[#77746E] hover:text-[#242321] text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#EAE5DC]/60 border border-[#D8D2C8] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#77746E]">Carrier:</span>
                  <span className="font-semibold text-[#242321]">{trackingModalOrder.courier || 'Bluedart Express'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#77746E]">Air Waybill (AWB):</span>
                  <span className="font-mono font-bold text-[#242321]">{trackingModalOrder.trackingNumber || 'DEL-IND-884912'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#77746E]">Estimated Delivery:</span>
                  <span className="font-semibold text-emerald-800">{trackingModalOrder.estimatedDelivery || '3-4 business days'}</span>
                </div>
              </div>

              {/* Transit Steps */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    ✓
                  </div>
                  <div>
                    <span className="font-bold text-[#242321] block">Order Tailored & Dispatched</span>
                    <span className="text-[11px] text-[#77746E]">LEOVERSE Atelier Central Fulfillment, Delhi</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    ✓
                  </div>
                  <div>
                    <span className="font-bold text-[#242321] block">In Transit through Air Cargo Hub</span>
                    <span className="text-[11px] text-[#77746E]">Sorted at Regional Logistics Center</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    •
                  </div>
                  <div>
                    <span className="font-bold text-[#242321] block">Out for Doorstep Handover</span>
                    <span className="text-[11px] text-[#77746E]">Expected delivery to recipient address</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setTrackingModalOrder(null)}
                className="w-full py-2.5 bg-[#252522] text-[#FAF9F6] text-xs uppercase font-bold tracking-wider hover:bg-black transition-colors cursor-pointer"
              >
                Close Tracking Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
