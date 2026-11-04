import React, { useEffect, useState } from 'react';
import {
  Package,
  Image as ImageIcon,
  Video,
  Users,
  Eye,
  Play,
  Heart,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  RefreshCw,
  Sparkles,
  BarChart3,
  Calendar
} from 'lucide-react';
import { getAdminOverview } from '../../services/api';

export const AdminDashboard = ({ onNavigateToAnalytics, onNavigateToProducts, onNavigateToMedia }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAdminOverview();
      setData(res);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard overview');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <RefreshCw className="w-8 h-8 text-[#A68962] animate-spin" />
        <p className="text-xs text-gray-500 tracking-wider uppercase font-bold">Loading live database metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center space-y-4">
        <p className="text-red-700 text-sm font-medium">{error}</p>
        <button
          onClick={loadData}
          className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider"
        >
          Retry
        </button>
      </div>
    );
  }

  const kpis = [
    { label: 'Total Products', value: data?.totalProducts, icon: Package, color: 'text-amber-700', bg: 'bg-amber-50' },
    { label: 'Product Photos', value: data?.totalPhotos, icon: ImageIcon, color: 'text-blue-700', bg: 'bg-blue-50' },
    { label: 'Product Videos', value: data?.totalVideos, icon: Video, color: 'text-purple-700', bg: 'bg-purple-50' },
    { label: 'Total Customers', value: data?.totalCustomers, icon: Users, color: 'text-emerald-700', bg: 'bg-emerald-50' },
    { label: 'Product Views', value: data?.totalProductViews, icon: Eye, color: 'text-sky-700', bg: 'bg-sky-50', sub: `${data?.uniqueVisitors} unique` },
    { label: 'Video Plays', value: data?.totalVideoViews, icon: Play, color: 'text-pink-700', bg: 'bg-pink-50' },
    { label: 'Wishlist Adds', value: data?.totalWishlistAdditions, icon: Heart, color: 'text-rose-700', bg: 'bg-rose-50' },
    { label: 'Cart Additions', value: data?.totalCartAdditions, icon: ShoppingCart, color: 'text-indigo-700', bg: 'bg-indigo-50' },
    { label: 'Total Orders', value: data?.totalOrders, icon: TrendingUp, color: 'text-teal-700', bg: 'bg-teal-50' },
    {
      label: 'Total Revenue',
      value: `₹${(data?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'text-[#A68962]',
      bg: 'bg-[#F8F6F2]',
      isLg: true
    }
  ];

  const maxRevenue = Math.max(...(data?.dailyHistory || []).map(d => d.revenue), 1);
  const maxViews = Math.max(...(data?.dailyHistory || []).map(d => d.views), 1);

  return (
    <div className="space-y-8">
      {/* Header with live refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D6] dark:border-[#27272A]">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-[0.12em] uppercase text-[#1E1E1E] dark:text-white">
            Menswear Atelier Overview
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1 font-semibold">
            Real-time atelier metrics and product analytics across customer visits, orders, and engagement
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white dark:bg-[#202026] hover:bg-gray-50 dark:hover:bg-[#2A2A34] border border-[#DCD5C9] dark:border-[#2E2E36] rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 transition shadow-xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#A68962]' : ''}`} />
            <span>Refresh Stats</span>
          </button>
        </div>
      </div>

      {/* 10 Required KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] shadow-xs hover:shadow-md transition-all duration-200 ${
                kpi.isLg ? 'col-span-2 sm:col-span-1 bg-gradient-to-br from-white dark:from-[#18181C] to-[#F8F6F2] dark:to-[#202026] border-[#C5A880]' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 truncate">
                  {kpi.label}
                </span>
                <div className={`p-2 rounded-xl ${kpi.bg} dark:bg-[#202026] ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#1E1E1E] dark:text-white">
                  {kpi.value ?? 0}
                </span>
                {kpi.sub && (
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                    {kpi.sub}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 14-Day Revenue Trend */}
        <div className="p-6 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-bold tracking-wider uppercase text-[#1E1E1E] dark:text-white">
                14-Day Revenue Trend (₹)
              </h2>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                Aggregated menswear sales from completed purchases
              </p>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-[#A68962] bg-[#F8F6F2] dark:bg-[#202026] px-3 py-1 rounded-full border border-[#E5E0D6] dark:border-[#2E2E36] font-bold">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Live Sales</span>
            </div>
          </div>

          <div className="h-52 flex items-end justify-between gap-1 sm:gap-2 pt-6 pb-2 border-b border-gray-100 dark:border-[#27272A]">
            {(data?.dailyHistory || []).map((day, idx) => {
              const heightPct = Math.max(6, Math.round((day.revenue / maxRevenue) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                  <div className="absolute -top-12 z-20 hidden group-hover:flex flex-col items-center pointer-events-none">
                    <div className="bg-[#1E1E1E] text-white text-[10px] rounded px-2.5 py-1 shadow-xl whitespace-nowrap">
                      <span className="font-bold text-[#C5A880]">₹{day.revenue.toLocaleString()}</span>
                      <span className="text-gray-300 block">{day.orders} order(s)</span>
                    </div>
                    <div className="w-1.5 h-1.5 bg-[#1E1E1E] rotate-45 -mt-1" />
                  </div>

                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full max-w-[24px] bg-gradient-to-t from-[#A68962] to-[#C5A880] rounded-t transition-all duration-300 group-hover:brightness-95"
                  />
                  <span className="text-[9px] text-gray-400 font-medium mt-2 truncate w-full text-center">
                    {day.date.split(' ')[1]}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-3 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
            <span>14 days ago</span>
            <span>Today (Live)</span>
          </div>
        </div>

        {/* Views & Video Plays Trend */}
        <div className="p-6 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-bold tracking-wider uppercase text-[#1E1E1E] dark:text-white">
                Engagement & Media Activity
              </h2>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                Daily product page views vs. video playback triggers
              </p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1.5 text-sky-700 dark:text-sky-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-sky-600" />
                <span>Page Views</span>
              </span>
              <span className="flex items-center space-x-1.5 text-pink-700 dark:text-pink-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-pink-600" />
                <span>Video Plays</span>
              </span>
            </div>
          </div>

          <div className="h-52 flex items-end justify-between gap-1 sm:gap-2 pt-6 pb-2 border-b border-gray-100 dark:border-[#27272A]">
            {(data?.dailyHistory || []).map((day, idx) => {
              const viewPct = Math.max(8, Math.round((day.views / maxViews) * 100));
              const videoPct = Math.max(4, Math.round((day.videoPlays / maxViews) * 100));
              return (
                <div key={idx} className="flex-1 flex items-end justify-center gap-0.5 group relative h-full">
                  <div className="absolute -top-12 z-20 hidden group-hover:flex flex-col items-center pointer-events-none">
                    <div className="bg-[#1E1E1E] text-white text-[10px] rounded px-2.5 py-1 shadow-xl whitespace-nowrap">
                      <div className="text-sky-300 font-bold">{day.views} Views</div>
                      <div className="text-pink-300">{day.videoPlays} Video Plays</div>
                    </div>
                    <div className="w-1.5 h-1.5 bg-[#1E1E1E] rotate-45 -mt-1" />
                  </div>

                  <div
                    style={{ height: `${viewPct}%` }}
                    className="w-1/2 max-w-[12px] bg-sky-600 rounded-t group-hover:bg-sky-700 transition"
                  />
                  <div
                    style={{ height: `${videoPct}%` }}
                    className="w-1/2 max-w-[12px] bg-pink-500 rounded-t group-hover:bg-pink-600 transition"
                  />
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-3 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
            <span>14 days ago</span>
            <span>Today (Live)</span>
          </div>
        </div>
      </div>

      {/* Two Tables: Best Selling Products & Most Viewed Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Selling Products */}
        <div className="p-6 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-bold tracking-wider uppercase text-[#1E1E1E] dark:text-white">
                Best Selling Styles
              </h2>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Highest order volume across menswear</p>
            </div>
            <button
              onClick={() => onNavigateToProducts?.()}
              className="text-xs text-[#A68962] hover:underline font-bold inline-flex items-center space-x-1 cursor-pointer"
            >
              <span>View Catalog</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 dark:border-[#27272A] text-gray-500 dark:text-gray-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-bold">Style</th>
                  <th className="pb-3 font-bold text-center">Units Sold</th>
                  <th className="pb-3 font-bold text-right">Revenue</th>
                  <th className="pb-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#27272A]">
                {(data?.bestSellingProducts || []).map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#FBF9F5] dark:hover:bg-[#202026] transition">
                    <td className="py-3 flex items-center space-x-3">
                      <img
                        src={prod.thumbnail || 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=150&q=80'}
                        alt={prod.name}
                        className="w-10 h-12 object-cover rounded-md border border-[#E5E0D6] dark:border-[#27272A]"
                      />
                      <div className="max-w-[170px] truncate">
                        <p className="font-bold text-[#1E1E1E] dark:text-white truncate">{prod.name}</p>
                        <span className="text-[10px] text-[#A68962] font-semibold">{prod.category} • ₹{prod.sellingPrice}</span>
                      </div>
                    </td>
                    <td className="py-3 text-center font-bold text-emerald-700 dark:text-emerald-400">
                      {prod.unitsSold}
                    </td>
                    <td className="py-3 text-right font-bold text-[#1E1E1E] dark:text-white">
                      ₹{Number(prod.totalSales || 0).toLocaleString()}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => onNavigateToAnalytics?.(prod.id)}
                        className="px-2.5 py-1 bg-[#F8F6F2] dark:bg-[#202026] hover:bg-[#1E1E1E] hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 transition cursor-pointer border border-[#E5E0D6] dark:border-[#2E2E36]"
                      >
                        Analytics
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Most Viewed Products */}
        <div className="p-6 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-bold tracking-wider uppercase text-[#1E1E1E] dark:text-white">
                Most Viewed Styles
              </h2>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Highest shopper traffic and impressions</p>
            </div>
            <button
              onClick={() => onNavigateToAnalytics?.()}
              className="text-xs text-[#A68962] hover:underline font-bold inline-flex items-center space-x-1 cursor-pointer"
            >
              <span>All Analytics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 dark:border-[#27272A] text-gray-500 dark:text-gray-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-bold">Style</th>
                  <th className="pb-3 font-bold text-center">Total Views</th>
                  <th className="pb-3 font-bold text-center">Unique Users</th>
                  <th className="pb-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#27272A]">
                {(data?.mostViewedProducts || []).map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#FBF9F5] dark:hover:bg-[#202026] transition">
                    <td className="py-3 flex items-center space-x-3">
                      <img
                        src={prod.thumbnail || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=150&q=80'}
                        alt={prod.name}
                        className="w-10 h-12 object-cover rounded-md border border-[#E5E0D6] dark:border-[#27272A]"
                      />
                      <div className="max-w-[170px] truncate">
                        <p className="font-bold text-[#1E1E1E] dark:text-white truncate">{prod.name}</p>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{prod.category} • ₹{prod.sellingPrice}</span>
                      </div>
                    </td>
                    <td className="py-3 text-center font-bold text-sky-700 dark:text-sky-400">
                      {prod.viewsCount}
                    </td>
                    <td className="py-3 text-center font-bold text-emerald-700 dark:text-emerald-400">
                      {prod.uniqueVisitors}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => onNavigateToAnalytics?.(prod.id)}
                        className="px-2.5 py-1 bg-[#F8F6F2] dark:bg-[#202026] hover:bg-[#1E1E1E] hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 transition cursor-pointer border border-[#E5E0D6] dark:border-[#2E2E36]"
                      >
                        Analytics
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
