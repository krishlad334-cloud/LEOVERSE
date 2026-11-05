import React, { useEffect, useState, useCallback } from 'react';
import { ShoppingBag, RefreshCw, CheckCircle2, Clock, Truck, PackageCheck, User, MapPin, Calendar } from 'lucide-react';
import { getOrders, updateOrderStatus } from '../../services/api';

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const run = async () => {
      await Promise.resolve();
      if (active) loadData();
    };
    run();
    return () => {
      active = false;
    };
  }, [loadData]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      await loadData();
    } catch (err) {
      alert(err.message || 'Failed to update order status');
    }
  };

  const statusColors = {
    Confirmed: 'bg-blue-50 text-blue-800 border-blue-200',
    Processing: 'bg-amber-50 text-amber-800 border-amber-200',
    Shipped: 'bg-purple-50 text-purple-800 border-purple-200',
    Delivered: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D6] dark:border-[#27272A]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-[0.12em] uppercase text-[#1E1E1E] dark:text-white">
            Customer Orders & Shipments
          </h1>
          <p className="text-xs text-[#77746E] dark:text-gray-400 tracking-wide mt-1">
            Real customer purchases with full item breakdowns, shipping details, and status controls
          </p>
        </div>

        <button
          onClick={loadData}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white dark:bg-[#202026] hover:bg-[#F8F6F2] dark:hover:bg-[#2A2A34] border border-[#E5E0D6] dark:border-[#2E2E36] rounded-xl text-[#1E1E1E] dark:text-white text-xs font-semibold uppercase tracking-wider transition shadow-xs cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#A68962]' : 'text-gray-500'}`} />
          <span>Refresh Orders</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-3">
          <RefreshCw className="w-8 h-8 text-[#A68962] animate-spin" />
          <p className="text-xs text-gray-500 uppercase tracking-widest">Loading customer orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl space-y-3 shadow-xs">
          <ShoppingBag className="w-10 h-10 text-gray-400 mx-auto" />
          <p className="text-sm font-semibold text-[#1E1E1E] dark:text-white">No orders placed yet</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Orders placed by customers will appear here in real-time.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] hover:border-[#DCD5C9] dark:hover:border-[#383844] rounded-2xl p-5 sm:p-6 transition space-y-4 shadow-xs hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E0D6] dark:border-[#27272A]">
                <div className="flex items-center space-x-3.5">
                  <div className="p-3 rounded-xl bg-[#F8F6F2] dark:bg-[#202026] text-[#A68962] dark:text-[#C5A880] border border-[#E5E0D6] dark:border-[#2E2E36]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-[#1E1E1E] dark:text-white">{ord.orderNumber}</span>
                      <span className="text-[10px] font-mono text-gray-400 bg-[#F8F6F2] dark:bg-[#202026] px-2 py-0.5 rounded border border-[#E5E0D6] dark:border-[#2E2E36]">ID: {ord.id}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      <span className="font-semibold text-[#1E1E1E] dark:text-white">{ord.customerName}</span> • <span className="text-gray-500 dark:text-gray-400">{ord.customerEmail}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-left sm:text-right">
                    <span className="text-base font-extrabold text-[#1E1E1E] dark:text-white">
                      ₹{ord.totalAmount?.toLocaleString()}
                    </span>
                    <span className="block text-[11px] text-[#A68962] dark:text-[#C5A880] font-semibold uppercase tracking-wider">{ord.paymentMethod}</span>
                  </div>

                  <select
                    value={ord.status}
                    onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                    className={`text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-xl border cursor-pointer transition ${
                      statusColors[ord.status] || 'bg-gray-100 text-gray-800 border-gray-300'
                    }`}
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Items in order */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Ordered Menswear Items:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                  {(ord.items || []).map((item, idx) => (
                    <div key={idx} className="p-3 bg-[#F8F6F2] dark:bg-[#202026] rounded-xl flex items-center justify-between border border-[#E5E0D6] dark:border-[#2E2E36]">
                      <div className="pr-2 truncate">
                        <p className="font-bold text-[#1E1E1E] dark:text-white truncate">{item.productName}</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                          Size: <strong className="text-[#1E1E1E] dark:text-white">{item.size}</strong> • Color: <strong className="text-[#1E1E1E] dark:text-white">{item.color}</strong> • Qty: <strong className="text-[#1E1E1E] dark:text-white">{item.quantity}</strong>
                        </p>
                      </div>
                      <span className="font-bold text-[#A68962] dark:text-[#C5A880] shrink-0">₹{(item.price * item.quantity)?.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer row */}
              <div className="pt-2 text-xs text-gray-500 flex flex-wrap items-center justify-between gap-2 border-t border-[#E5E0D6]">
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>Shipping Address: <strong className="text-[#1E1E1E] font-medium">{ord.shippingAddress}</strong></span>
                </div>
                <div className="flex items-center space-x-1.5 text-gray-400 font-mono text-[11px]">
                  <Calendar className="w-3 h-3" />
                  <span>Placed: {new Date(ord.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
