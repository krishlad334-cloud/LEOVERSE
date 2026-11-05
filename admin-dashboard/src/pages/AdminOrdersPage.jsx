import { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, Clock, Truck, Search, ExternalLink } from 'lucide-react';

const LOCAL_ORDERS_KEY = 'leoverse_orders';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_ORDERS_KEY);
      if (stored) {
        setOrders(JSON.parse(stored));
      } else {
        // Sample orders for visual polish
        setOrders([
          {
            id: 'ORD-8942-LEO',
            customerName: 'Aarav Mehta',
            email: 'aarav.mehta@example.com',
            phone: '+91 98201 44521',
            status: 'Delivered',
            total: 13990,
            date: '2026-11-04T14:30:00Z',
            paymentMethod: 'UPI',
            items: [
              { name: 'Double-Breasted Silk-Blend Dinner Blazer', qty: 1, price: 13990 }
            ],
            address: { city: 'Mumbai', state: 'Maharashtra', pincode: '400050' }
          },
          {
            id: 'ORD-7611-LEO',
            customerName: 'Devansh Singhania',
            email: 'devansh.s@example.com',
            phone: '+91 98112 39012',
            status: 'In Transit',
            total: 7380,
            date: '2026-11-05T09:15:00Z',
            paymentMethod: 'Credit Card',
            items: [
              { name: 'Pure Egyptian Cotton Mandarin Casual Shirt', qty: 2, price: 2490 },
              { name: 'Minimalist Italian Calfskin Low Sneakers', qty: 1, price: 4890 }
            ],
            address: { city: 'New Delhi', state: 'Delhi', pincode: '110001' }
          }
        ]);
      }
    } catch {
      setOrders([]);
    }
  }, []);

  const filteredOrders = orders.filter((o) => {
    if (filterStatus !== 'All' && o.status?.toLowerCase() !== filterStatus.toLowerCase()) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchId = o.id?.toLowerCase().includes(q);
      const matchCust = o.customerName?.toLowerCase().includes(q);
      if (!matchId && !matchCust) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl font-bold font-serif text-[#2C4152] tracking-wide">
            Customer Orders & Fulfillment
          </h1>
          <p className="text-xs text-gray-500">
            Real-time orders placed on the customer shopping platform.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <div className="relative flex items-center w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4 shrink-0" strokeWidth={2} />
            </div>
            <input
              type="text"
              placeholder="Search by order ID or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 pl-9 pr-3 text-xs border border-gray-300 rounded-lg outline-none focus:border-[#D5A249] focus:ring-1 focus:ring-[#D5A249] bg-white w-full sm:w-64 transition-all"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-9 px-3 text-xs border border-gray-300 rounded-lg bg-white outline-none cursor-pointer hover:border-[#D5A249] transition-colors w-full sm:w-auto"
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-gray-200">
          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-[#2C4152]">No customer orders match</h3>
          <p className="text-xs text-gray-500 mt-1">Orders submitted from the customer checkout will appear here.</p>
        </div>
      ) : (
        <div>
          {/* Mobile Order Cards (md:hidden) */}
          <div className="md:hidden space-y-3">
            {filteredOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-2.5"
              >
                {/* Header: Order ID & Status */}
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="font-mono font-bold text-xs text-[#2C4152]">#{ord.id}</span>
                    <span className="block text-[10px] text-gray-400 mt-0.5">
                      {new Date(ord.date || ord.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    ord.status === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : ord.status === 'In Transit'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {ord.status === 'Delivered' && <CheckCircle className="w-3 h-3" />}
                    {ord.status === 'In Transit' && <Truck className="w-3 h-3" />}
                    {ord.status !== 'Delivered' && ord.status !== 'In Transit' && <Clock className="w-3 h-3" />}
                    <span>{ord.status || 'Confirmed'}</span>
                  </span>
                </div>

                {/* Customer & Location */}
                <div className="text-xs pt-2 border-t border-gray-100">
                  <span className="font-bold text-[#2C4152] block">
                    {ord.customerName || ord.shippingAddress?.fullName || 'Valued Client'}
                  </span>
                  <span className="text-[10px] text-gray-500">
                    {ord.address?.city || ord.shippingAddress?.city || 'Mumbai'}, {ord.address?.pincode || ord.shippingAddress?.pincode || '400001'}
                  </span>
                </div>

                {/* Items Preview */}
                {ord.items && ord.items.length > 0 && (
                  <div className="bg-gray-50/80 rounded-lg p-2.5 space-y-1 text-xs">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px] text-gray-700">
                        <span className="truncate max-w-[220px]">{it.name}</span>
                        <span className="text-gray-400 font-semibold ml-2">x{it.quantity || it.qty || 1}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Total & Payment */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  <span className="text-gray-500 text-[11px]">Payment: <strong className="text-gray-700">{ord.paymentMethod || 'Prepaid'}</strong></span>
                  <span className="font-bold text-[#2C4152] text-sm">₹{(ord.total || 0).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table (hidden md:block) */}
          <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-xs">
                <thead className="bg-[#2C4152] text-white font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Order ID & Date</th>
                    <th className="py-3 px-3">Customer & Location</th>
                    <th className="py-3 px-3">Purchased Items</th>
                    <th className="py-3 px-3">Total & Payment</th>
                    <th className="py-3 px-3 text-center">Fulfillment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-bold text-[#2C4152] block font-mono">{ord.id}</span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(ord.date || ord.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-bold text-[#2C4152] block">{ord.customerName || ord.shippingAddress?.fullName || 'Valued Client'}</span>
                        <span className="text-[10px] text-gray-500">
                          {ord.address?.city || ord.shippingAddress?.city || 'Mumbai'}, {ord.address?.pincode || ord.shippingAddress?.pincode || '400001'}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <div className="space-y-0.5 max-w-xs">
                          {ord.items?.map((it, idx) => (
                            <div key={idx} className="text-[11px] text-gray-700 flex items-center justify-between">
                              <span className="truncate max-w-[200px]">{it.name}</span>
                              <span className="text-gray-400 font-semibold ml-2">x{it.quantity || it.qty || 1}</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-bold text-[#2C4152] text-sm">₹{(ord.total || 0).toLocaleString()}</span>
                        <span className="block text-[10px] text-gray-500 font-medium">{ord.paymentMethod || 'Prepaid'}</span>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.status === 'In Transit'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ord.status === 'Delivered' && <CheckCircle className="w-3 h-3" />}
                          {ord.status === 'In Transit' && <Truck className="w-3 h-3" />}
                          {ord.status !== 'Delivered' && ord.status !== 'In Transit' && <Clock className="w-3 h-3" />}
                          <span>{ord.status || 'Confirmed'}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
