import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle2, Search, ArrowRight, ChevronRight, ShoppingBag } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import { formatPrice } from '../utils/formatPrice';
import { getCustomerOrders } from '../services/productService';

export const AccountOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setOrders(getCustomerOrders());
  }, []);

  const filteredOrders = orders.filter((o) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      o.orderId.toLowerCase().includes(q) ||
      (o.trackingNumber && o.trackingNumber.toLowerCase().includes(q)) ||
      (o.items && o.items.some((it) => it.name && it.name.toLowerCase().includes(q)))
    );
  });

  const breadcrumbs = [
    { label: 'My Account', to: '/account' },
    { label: 'My Orders' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="py-6 border-b border-[#D8D2C8] dark:border-[#27272A] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68962] dark:text-[#C5A880]">
            Order Management
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#242321] dark:text-white mt-1">
            My Orders & Tracking
          </h1>
        </div>

        {/* Search Order Box */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID or item..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-[#1E1E22] border border-[#D8D2C8] dark:border-[#383842] rounded-xl text-[#242321] dark:text-white placeholder-gray-500 focus:outline-none focus:border-[#A68962]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-[#FAF9F6] dark:bg-[#1A1A1E] rounded-2xl border border-[#D8D2C8] dark:border-[#27272A] p-8 space-y-4">
          <Package className="w-12 h-12 text-gray-400 mx-auto stroke-[1.5]" />
          <h2 className="text-lg font-bold text-[#242321] dark:text-white">
            No orders found
          </h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {searchQuery
              ? `No orders matching "${searchQuery}". Try searching by another keyword.`
              : "You haven't placed any orders yet. Discover our latest menswear arrivals."}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#242321] dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider rounded-xl transition hover:opacity-90"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const isDelivered = order.status === 'Delivered';
            const isConfirmed = order.status === 'Confirmed';
            const items = order.items || [];

            return (
              <div
                key={order.orderId}
                className="bg-white dark:bg-[#18181C] border border-[#D8D2C8] dark:border-[#27272A] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition"
              >
                {/* Header Strip */}
                <div className="bg-[#FAF9F6] dark:bg-[#202026] p-4 sm:p-5 border-b border-[#EAE5DC] dark:border-[#27272A] flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-500 block">
                        Order Placed
                      </span>
                      <span className="font-semibold text-[#242321] dark:text-white">
                        {order.date}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-500 block">
                        Order ID
                      </span>
                      <span className="font-mono font-bold text-[#242321] dark:text-white">
                        {order.orderId}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-500 block">
                        Total Amount
                      </span>
                      <span className="font-bold text-[#242321] dark:text-white">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        isDelivered
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                          : isConfirmed
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300'
                      }`}
                    >
                      {isDelivered ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Truck className="w-3.5 h-3.5" />
                      )}
                      <span>{order.status}</span>
                    </span>

                    <Link
                      to={`/account/orders/${order.orderId}`}
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#A68962] hover:underline"
                    >
                      <span>Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Items List */}
                <div className="p-4 sm:p-6 divide-y divide-[#F0ECE1] dark:divide-[#27272A]">
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                    >
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
                          <p className="text-xs text-gray-500 font-mono">
                            Size: <strong className="text-black dark:text-white">{item.size || item.selectedSize || 'M'}</strong> | Color: <strong className="text-black dark:text-white">{item.color || item.selectedColor || 'Standard'}</strong> | Qty: {item.quantity}
                          </p>
                          <p className="text-xs font-bold text-[#242321] dark:text-white">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>

                      {item.productId && (
                        <Link
                          to={`/product/${item.productId}`}
                          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#D8D2C8] dark:border-[#383842] rounded-lg text-xs font-bold uppercase tracking-wider text-[#242321] dark:text-white hover:border-[#A68962] transition"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Buy Again</span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Tracking Footer */}
                {order.trackingNumber && (
                  <div className="bg-[#FAF9F6]/50 dark:bg-[#1A1A1E] px-4 sm:px-6 py-3 border-t border-[#EAE5DC] dark:border-[#27272A] flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#A68962]" />
                      <span>
                        Courier: <strong className="text-[#242321] dark:text-white">{order.courier || 'Bluedart Express Priority'}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        AWB: <strong className="font-mono text-[#242321] dark:text-white">{order.trackingNumber}</strong>
                      </span>
                    </div>

                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                      Estimated Delivery by {order.estimatedDelivery || 'In 3-5 business days'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AccountOrders;
