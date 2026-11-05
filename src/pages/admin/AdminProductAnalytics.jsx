import React, { useEffect, useState } from 'react';
import {
  Eye,
  Users,
  Image as ImageIcon,
  Play,
  Clock,
  Heart,
  ShoppingCart,
  TrendingUp,
  Calendar,
  ChevronDown,
  RefreshCw,
  ExternalLink,
  Percent
} from 'lucide-react';
import { getProducts, getProductAnalytics } from '../../services/api';

export const AdminProductAnalytics = ({ initialProductId }) => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(initialProductId || '');
  const [dateRange, setDateRange] = useState('30d');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts()
      .then((prods) => {
        setProducts(prods);
        if (!selectedProductId && prods.length > 0) {
          setSelectedProductId(initialProductId || prods[0].id);
        }
      })
      .catch((err) => console.error('Failed to load products list', err));
  }, [initialProductId]);

  const loadAnalytics = async () => {
    if (!selectedProductId) return;
    setLoading(true);
    setError('');
    try {
      const res = await getProductAnalytics(selectedProductId, {
        range: dateRange,
        startDate: dateRange === 'custom' ? customStart : null,
        endDate: dateRange === 'custom' ? customEnd : null
      });
      setAnalytics(res);
    } catch (err) {
      setError(err.message || 'Failed to load product analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedProductId) {
      loadAnalytics();
    }
  }, [selectedProductId, dateRange]);

  const handleApplyCustomDate = (e) => {
    e.preventDefault();
    if (!customStart) return;
    setDateRange('custom');
    loadAnalytics();
  };

  const formatSeconds = (sec) => {
    if (!sec) return '0s';
    const m = Math.floor(sec / 60);
    const s = Math.round(sec % 60);
    if (m === 0) return `${s}s`;
    return `${m}m ${s}s`;
  };

  const metrics = analytics?.metrics;
  const maxTrend = Math.max(...(analytics?.dailyTrend || []).map((t) => t.views), 1);

  return (
    <div className="space-y-6">
      {/* Top Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D6] dark:border-[#27272A]">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-[0.12em] uppercase text-[#1E1E1E] dark:text-white">
              Individual Style Analytics
            </h1>
            <span className="text-[10px] bg-[#F8F6F2] dark:bg-[#202026] text-[#A68962] dark:text-[#C5A880] border border-[#E5E0D6] dark:border-[#2E2E36] font-extrabold px-2 py-0.5 rounded uppercase">
              SQL Event Engine
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 tracking-wide mt-1 font-semibold">
            Deep-dive metrics computed from database events without counting raw refreshes as unique visitors
          </p>
        </div>

        {/* Product selector dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[260px]">
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full appearance-none bg-white dark:bg-[#18181C] border border-[#DCD5C9] dark:border-[#2E2E36] text-[#1E1E1E] dark:text-white text-xs font-bold py-2.5 pl-3.5 pr-8 rounded-xl focus:outline-none focus:border-[#A68962] cursor-pointer shadow-xs"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-3 pointer-events-none" />
          </div>

          <button
            onClick={loadAnalytics}
            className="p-2.5 bg-white dark:bg-[#18181C] hover:bg-gray-50 dark:hover:bg-[#202026] border border-[#DCD5C9] dark:border-[#2E2E36] rounded-xl text-gray-700 dark:text-gray-300 transition shadow-xs cursor-pointer"
            title="Refresh Analytics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#A68962]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Date Range Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl shadow-xs">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-[#A68962] dark:text-[#C5A880]" />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Date Filter:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'today', label: 'Today' },
            { id: '7d', label: 'Past 7 Days' },
            { id: '30d', label: 'Past 30 Days' },
            { id: 'custom', label: 'Custom Range' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDateRange(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition cursor-pointer ${
                dateRange === tab.id
                  ? 'bg-[#1E1E1E] dark:bg-[#C5A880] text-white dark:text-black shadow-xs'
                  : 'bg-[#F8F6F2] dark:bg-[#202026] text-gray-700 dark:text-gray-300 hover:bg-[#EAE5DC] dark:hover:bg-[#2A2A34]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {dateRange === 'custom' && (
          <form onSubmit={handleApplyCustomDate} className="flex items-center space-x-2 text-xs w-full sm:w-auto pt-2 sm:pt-0">
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="bg-[#FAF9F6] dark:bg-[#202026] border border-[#DCD5C9] dark:border-[#2E2E36] text-black dark:text-white px-2.5 py-1 rounded-lg text-xs focus:outline-none focus:border-[#A68962]"
              required
            />
            <span className="text-gray-400">to</span>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="bg-[#FAF9F6] dark:bg-[#202026] border border-[#DCD5C9] dark:border-[#2E2E36] text-black dark:text-white px-2.5 py-1 rounded-lg text-xs focus:outline-none focus:border-[#A68962]"
            />
            <button
              type="submit"
              className="px-3.5 py-1 bg-[#1E1E1E] dark:bg-[#C5A880] text-white dark:text-black font-bold rounded-lg text-xs hover:bg-black transition cursor-pointer"
            >
              Apply
            </button>
          </form>
        )}
      </div>

      {loading && !analytics ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-3">
          <RefreshCw className="w-8 h-8 text-[#A68962] animate-spin" />
          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Querying style metrics...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center space-y-3">
          <p className="text-red-700 text-sm font-medium">{error}</p>
          <button
            onClick={loadAnalytics}
            className="px-4 py-2 bg-red-700 text-white text-xs font-bold uppercase rounded-lg"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Selected Product Banner Header */}
          <div className="p-5 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center space-x-4">
              <img
                src={analytics?.thumbnail || 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=200&q=80'}
                alt={analytics?.productName}
                className="w-16 h-20 object-cover rounded-xl border border-[#E5E0D6] dark:border-[#27272A] shadow-sm"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] bg-[#F8F6F2] dark:bg-[#202026] text-[#A68962] dark:text-[#C5A880] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider border border-[#E5E0D6] dark:border-[#2E2E36]">
                    {analytics?.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">{analytics?.brand}</span>
                </div>
                <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E1E1E] dark:text-white mt-1">
                  {analytics?.productName}
                </h2>
                <div className="flex items-center space-x-3 mt-1.5 text-xs">
                  <span className="font-bold text-[#1E1E1E] dark:text-white">₹{analytics?.sellingPrice?.toLocaleString()}</span>
                  <span className="text-gray-400 line-through">₹{analytics?.mrp?.toLocaleString()}</span>
                  <span className="text-gray-600 dark:text-gray-300">Stock: <strong className="text-black dark:text-white">{analytics?.stock} units</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href={`/product/${analytics?.productId}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#F8F6F2] dark:bg-[#202026] hover:bg-[#EAE5DC] dark:hover:bg-[#2A2A34] border border-[#E5E0D6] dark:border-[#2E2E36] text-xs font-bold text-gray-800 dark:text-gray-200 rounded-xl transition shadow-xs"
              >
                <span>View Product Page</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#A68962]" />
              </a>
            </div>
          </div>

          {/* Primary 9 Metrics Cards Required */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {/* Total Product Views */}
            <div className="p-4 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl shadow-xs">
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Total Page Views</span>
                <Eye className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              </div>
              <p className="text-2xl font-bold text-[#1E1E1E] dark:text-white mt-2">
                {metrics?.totalViews?.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Database events logged</p>
            </div>

            {/* Unique Visitors */}
            <div className="p-4 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl shadow-xs">
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Unique Visitors</span>
                <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-2">
                {metrics?.uniqueVisitors?.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Deduplicated visitor IDs</p>
            </div>

            {/* Total Image Views */}
            <div className="p-4 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl shadow-xs">
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Image Views</span>
                <ImageIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-[#1E1E1E] dark:text-white mt-2">
                {metrics?.totalImageViews?.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Total photo impressions</p>
            </div>

            {/* Total Video Plays */}
            <div className="p-4 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl shadow-xs">
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Video Plays</span>
                <Play className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              </div>
              <p className="text-2xl font-bold text-pink-600 dark:text-pink-400 mt-2">
                {metrics?.totalVideoPlays?.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Runway video starts</p>
            </div>

            {/* Avg Video Watch Duration */}
            <div className="p-4 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl shadow-xs">
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Avg Watch Time</span>
                <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-400 mt-2">
                {formatSeconds(metrics?.avgVideoWatchDuration)}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Total: {formatSeconds(metrics?.totalWatchDuration)}</p>
            </div>

            {/* Wishlist Additions */}
            <div className="p-4 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl shadow-xs">
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Wishlist Adds</span>
                <Heart className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              </div>
              <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-2">
                {metrics?.wishlistAdditions?.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Shoppers saved style</p>
            </div>

            {/* Add-to-cart Count */}
            <div className="p-4 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl shadow-xs">
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Cart Additions</span>
                <ShoppingCart className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mt-2">
                {metrics?.cartAdditions?.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Added to shopping bag</p>
            </div>

            {/* Orders Placed */}
            <div className="p-4 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl shadow-xs">
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Orders / Units</span>
                <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              </div>
              <p className="text-2xl font-bold text-teal-700 dark:text-teal-400 mt-2">
                {metrics?.ordersCount} <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">({metrics?.unitsSold} units)</span>
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5 font-medium">₹{metrics?.revenue?.toLocaleString()} revenue</p>
            </div>

            {/* Conversion Rate */}
            <div className="col-span-2 p-4 bg-gradient-to-br from-white dark:from-[#18181C] to-[#F8F6F2] dark:to-[#202026] border border-[#C5A880] rounded-2xl shadow-xs">
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#A68962] dark:text-[#C5A880]">
                  Purchase Conversion Rate
                </span>
                <Percent className="w-4 h-4 text-[#A68962] dark:text-[#C5A880]" />
              </div>
              <div className="flex items-baseline space-x-2 mt-2">
                <p className="text-2xl font-bold text-[#1E1E1E] dark:text-white">
                  {metrics?.conversionRate}%
                </p>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                  ({metrics?.ordersCount} / {metrics?.uniqueVisitors} visitors)
                </span>
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                Orders divided by unique visitor sessions
              </p>
            </div>
          </div>

          {/* Visitor Engagement Conversion Funnel */}
          <div className="p-6 bg-white border border-[#E5E0D6] rounded-2xl shadow-xs">
            <h3 className="text-xs font-bold tracking-wider uppercase text-[#1E1E1E] mb-4">
              Shopper Conversion Funnel for this Style
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              {[
                { step: '1. Unique Visitors', val: metrics?.uniqueVisitors, pct: '100%' },
                { step: '2. Image Views', val: metrics?.totalImageViews, pct: metrics?.uniqueVisitors > 0 ? `${Math.round((metrics?.totalImageViews / metrics?.uniqueVisitors) * 100)}%` : '0%' },
                { step: '3. Video Plays', val: metrics?.totalVideoPlays, pct: metrics?.uniqueVisitors > 0 ? `${Math.round((metrics?.totalVideoPlays / metrics?.uniqueVisitors) * 100)}%` : '0%' },
                { step: '4. Cart Adds', val: metrics?.cartAdditions, pct: metrics?.uniqueVisitors > 0 ? `${Math.round((metrics?.cartAdditions / metrics?.uniqueVisitors) * 100)}%` : '0%' },
                { step: '5. Completed Orders', val: metrics?.ordersCount, pct: `${metrics?.conversionRate}%` }
              ].map((f, idx) => (
                <div key={idx} className="p-3 bg-[#FAF9F6] border border-[#E5E0D6] rounded-xl flex flex-col justify-between">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{f.step}</span>
                  <div className="my-2">
                    <span className="text-lg font-bold text-[#1E1E1E]">{f.val}</span>
                    <span className="text-[11px] block text-[#A68962] font-bold">{f.pct} rate</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#A68962] h-full rounded-full"
                      style={{ width: `${Math.min(100, Math.max(5, parseFloat(f.pct) || 10))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Trend Time Series Chart */}
          <div className="p-6 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-bold tracking-wider uppercase text-[#1E1E1E] dark:text-white">
                  Activity Timeline for this Style
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Daily Views vs. Unique Visitors vs. Video Plays</p>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <span className="flex items-center space-x-1 text-sky-700 dark:text-sky-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-sky-600" />
                  <span>Views</span>
                </span>
                <span className="flex items-center space-x-1 text-emerald-700 dark:text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Visitors</span>
                </span>
                <span className="flex items-center space-x-1 text-pink-700 dark:text-pink-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-pink-500" />
                  <span>Video Plays</span>
                </span>
              </div>
            </div>

            <div className="h-44 flex items-end justify-between gap-1 sm:gap-2 pt-4 pb-2 border-b border-gray-100 dark:border-[#27272A]">
              {(analytics?.dailyTrend || []).map((t, idx) => {
                const viewH = Math.max(6, Math.round((t.views / maxTrend) * 100));
                const visitorH = Math.max(4, Math.round((t.visitors / maxTrend) * 100));
                const videoH = Math.max(2, Math.round((t.videoPlays / maxTrend) * 100));

                return (
                  <div key={idx} className="flex-1 flex items-end justify-center gap-0.5 group relative h-full">
                    <div className="absolute -top-12 z-20 hidden group-hover:flex flex-col items-center pointer-events-none">
                      <div className="bg-[#1E1E1E] dark:bg-[#202026] text-white text-[10px] rounded px-2.5 py-1 shadow-xl whitespace-nowrap border border-transparent dark:border-[#2E2E36]">
                        <span className="font-bold">{t.date}: </span>
                        <span className="text-sky-300">{t.views} views</span>,{' '}
                        <span className="text-emerald-300">{t.visitors} unique</span>,{' '}
                        <span className="text-pink-300">{t.videoPlays} plays</span>
                      </div>
                      <div className="w-1.5 h-1.5 bg-[#1E1E1E] dark:bg-[#202026] rotate-45 -mt-1" />
                    </div>

                    <div style={{ height: `${viewH}%` }} className="w-1/3 max-w-[10px] bg-sky-600 rounded-t" />
                    <div style={{ height: `${visitorH}%` }} className="w-1/3 max-w-[10px] bg-emerald-600 rounded-t" />
                    <div style={{ height: `${videoH}%` }} className="w-1/3 max-w-[10px] bg-pink-500 rounded-t" />
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400 font-medium">
              <span>Start of Period</span>
              <span>Today (Live)</span>
            </div>
          </div>

          {/* TWO BREAKDOWN TABLES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Views Breakdown Table */}
            <div className="p-6 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-bold tracking-wider uppercase text-[#1E1E1E] dark:text-white">
                    Photo Impressions Breakdown
                  </h3>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">
                  {analytics?.imageBreakdown?.length || 0} Gallery Photos
                </span>
              </div>

              {(!analytics?.imageBreakdown || analytics.imageBreakdown.length === 0) ? (
                <p className="text-xs text-gray-400 py-6 text-center">No images currently mapped to this style.</p>
              ) : (
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-[#27272A] text-gray-500 dark:text-gray-400 uppercase tracking-wider text-[10px]">
                        <th className="pb-2.5 font-bold">Photo</th>
                        <th className="pb-2.5 font-bold text-center">Total Views</th>
                        <th className="pb-2.5 font-bold text-center">Unique Viewers</th>
                        <th className="pb-2.5 font-bold text-right">View Share</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-[#27272A]">
                      {analytics.imageBreakdown.map((img) => {
                        const totalImgs = metrics?.totalImageViews || 1;
                        const share = Math.round((img.viewCount / totalImgs) * 100);
                        return (
                          <tr key={img.mediaId} className="hover:bg-[#FBF9F5] dark:hover:bg-[#202026] transition">
                            <td className="py-2.5 flex items-center space-x-3">
                              <img
                                src={img.url}
                                alt={img.title}
                                className="w-10 h-12 object-cover rounded-md border border-[#E5E0D6] dark:border-[#27272A]"
                              />
                              <div className="max-w-[140px] truncate">
                                <p className="font-bold text-gray-900 dark:text-white truncate text-xs">{img.title || img.fileName}</p>
                                <span className="text-[10px] text-gray-400 font-mono">{img.mediaId}</span>
                              </div>
                            </td>
                            <td className="py-2.5 text-center font-bold text-sky-700 dark:text-sky-400">
                              {img.viewCount}
                            </td>
                            <td className="py-2.5 text-center text-emerald-700 dark:text-emerald-400 font-bold">
                              {img.uniqueViewers}
                            </td>
                            <td className="py-2.5 text-right font-bold text-[#A68962] dark:text-[#C5A880]">
                              {share}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Video Plays Breakdown Table */}
            <div className="p-6 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Play className="w-4 h-4 text-pink-600" />
                  <h3 className="text-xs font-bold tracking-wider uppercase text-[#1E1E1E] dark:text-white">
                    Video Plays & Retention Breakdown
                  </h3>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">
                  {analytics?.videoBreakdown?.length || 0} Product Videos
                </span>
              </div>

              {(!analytics?.videoBreakdown || analytics.videoBreakdown.length === 0) ? (
                <div className="text-center py-8 text-gray-400 text-xs space-y-1">
                  <p className="font-semibold">No runway videos mapped yet.</p>
                  <p className="text-[11px] text-gray-400">Upload an MP4 runway video in the Media Library.</p>
                </div>
              ) : (
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-[#27272A] text-gray-500 dark:text-gray-400 uppercase tracking-wider text-[10px]">
                        <th className="pb-2.5 font-bold">Video</th>
                        <th className="pb-2.5 font-bold text-center">Plays</th>
                        <th className="pb-2.5 font-bold text-center">Unique Users</th>
                        <th className="pb-2.5 font-bold text-right">Length</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-[#27272A]">
                      {analytics.videoBreakdown.map((vid) => (
                        <tr key={vid.mediaId} className="hover:bg-[#FBF9F5] transition">
                          <td className="py-2.5 flex items-center space-x-3">
                            <div className="relative w-12 h-12 bg-black rounded-lg overflow-hidden shrink-0">
                              <img
                                src={vid.thumbnailUrl || analytics?.thumbnail}
                                alt={vid.title}
                                className="w-full h-full object-cover opacity-75"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Play className="w-3.5 h-3.5 text-white fill-white" />
                              </div>
                            </div>
                            <div className="max-w-[130px] truncate">
                              <p className="font-bold text-gray-900 truncate text-xs">{vid.title || vid.fileName}</p>
                              <span className="text-[10px] text-pink-600 font-bold font-mono">Runway Reel</span>
                            </div>
                          </td>
                          <td className="py-2.5 text-center font-bold text-pink-600">
                            {vid.playCount}
                          </td>
                          <td className="py-2.5 text-center text-emerald-700 font-bold">
                            {vid.uniquePlayers}
                          </td>
                          <td className="py-2.5 text-right font-bold text-gray-900">
                            {vid.videoDuration || 18}s
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProductAnalytics;
