import { useState, useMemo, useEffect } from 'react';
import {
  Package,
  CheckCircle2,
  Clock,
  TrendingUp,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { INITIAL_SEED_PRODUCTS } from '../data/seedCatalog';

const DEPARTMENTS = ['All', 'Men', 'Women', 'Kids', 'Accessories'];

export default function AdminDashboardPage({
  products = [],
  globalSearch = '',
  onOpenAddProduct,
  onSeedCatalog,
  onEditProduct,
  onTogglePublish,
  setActiveTab,
}) {
  const [seeding, setSeeding] = useState(false);
  const [seedSuccessMsg, setSeedSuccessMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState(globalSearch || '');
  const [activeDept, setActiveDept] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'published' | 'draft'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [prevGlobalSearch, setPrevGlobalSearch] = useState(globalSearch);
  if (prevGlobalSearch !== globalSearch) {
    setPrevGlobalSearch(globalSearch);
    if (globalSearch !== undefined) {
      setSearchTerm(globalSearch);
      setCurrentPage(1);
    }
  }

  // Catalog Metrics
  const totalProducts = products.length;
  const publishedProducts = products.filter((p) => p.isPublished !== false).length;
  const draftProducts = totalProducts - publishedProducts;
  const totalStock = products.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);
  const totalValue = products.reduce(
    (acc, p) => acc + (Number(p.salePrice || p.price || 0) * (Number(p.stock) || 0)),
    0
  );

  // Department counts
  const deptCounts = useMemo(() => {
    const counts = { Men: 0, Women: 0, Kids: 0, Accessories: 0 };
    products.forEach((p) => {
      const d = p.department || 'Men';
      if (counts[d] !== undefined) counts[d]++;
      else counts.Men++;
    });
    return counts;
  }, [products]);

  // Filtered & Searched Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Department
      if (activeDept !== 'All' && (p.department || 'Men').toLowerCase() !== activeDept.toLowerCase()) {
        return false;
      }
      // 2. Status
      if (statusFilter === 'published' && p.isPublished === false) return false;
      if (statusFilter === 'draft' && p.isPublished !== false) return false;

      // 3. Search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = (p.name || '').toLowerCase().includes(q);
        const matchesBrand = (p.brand || '').toLowerCase().includes(q);
        const matchesSub = (p.subcategory || p.category || '').toLowerCase().includes(q);
        const matchesId = (p.id || '').toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesSub && !matchesId) return false;
      }

      return true;
    });
  }, [products, activeDept, statusFilter, searchTerm]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const pagedProducts = filteredProducts.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedSuccessMsg('');
    try {
      await onSeedCatalog(INITIAL_SEED_PRODUCTS);
      setSeedSuccessMsg(`Master catalog refreshed with ${INITIAL_SEED_PRODUCTS.length} luxury fashion items.`);
      setTimeout(() => setSeedSuccessMsg(''), 4000);
    } catch (e) {
      console.error(e);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* Clean Top Title Bar (No bulky banner) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#2C4152] tracking-wide">
            Catalog & Operations Overview
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time management for customer storefront collections and inventory.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Subtle Refresh / Sync Button */}
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white hover:bg-[#2C4152] hover:text-white hover:border-[#2C4152] text-[#2C4152] border border-gray-300 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-2xs"
            title="Re-sync initial master catalog"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D5A249]" />
            <span>{seeding ? 'Syncing...' : 'Sync Catalog'}</span>
          </button>
        </div>
      </div>

      {seedSuccessMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{seedSuccessMsg}</span>
        </div>
      )}

      {/* Metrics Grid (2 per line on mobile, 4 on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {/* Metric 1: Total Products */}
        <div className="p-3 sm:p-4 rounded-xl bg-white border border-gray-200 shadow-2xs hover:border-[#2C4152]/30 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-medium text-gray-500">Total Products</span>
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#2C4152]/5 text-[#2C4152]">
              <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#2C4152] mt-1.5 sm:mt-2">{totalProducts}</p>
          <div className="flex items-center gap-1 mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] text-gray-500 flex-wrap">
            <span>{deptCounts.Men} Men</span>
            <span>•</span>
            <span>{deptCounts.Women} Wmn</span>
            <span>•</span>
            <span>{deptCounts.Kids} Kids</span>
          </div>
        </div>

        {/* Metric 2: Published Live */}
        <div className="p-3 sm:p-4 rounded-xl bg-white border border-gray-200 shadow-2xs hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-medium text-gray-500">Published Live</span>
            <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1.5 sm:mt-2">{publishedProducts}</p>
          <div className="flex items-center gap-1.5 mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] text-emerald-700 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="truncate">Visible on store</span>
          </div>
        </div>

        {/* Metric 3: Drafts / Inactive */}
        <div className="p-3 sm:p-4 rounded-xl bg-white border border-gray-200 shadow-2xs hover:border-[#D5A249]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-medium text-gray-500">Drafts / Inactive</span>
            <div className="p-1.5 sm:p-2 rounded-lg bg-amber-50 text-[#D5A249]">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#D5A249] mt-1.5 sm:mt-2">{draftProducts}</p>
          <div className="flex items-center gap-1.5 mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] text-gray-500">
            <span className="truncate">Hidden from store</span>
          </div>
        </div>

        {/* Metric 4: Total Units & Valuation */}
        <div className="p-3 sm:p-4 rounded-xl bg-white border border-gray-200 shadow-2xs hover:border-blue-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-medium text-gray-500">Units in Vault</span>
            <div className="p-1.5 sm:p-2 rounded-lg bg-blue-50 text-blue-600">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#2C4152] mt-1.5 sm:mt-2">{totalStock}</p>
          <div className="flex items-center gap-1 mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] text-gray-500 truncate">
            <span>Val: <strong className="text-[#2C4152]">₹{totalValue.toLocaleString()}</strong></span>
          </div>
        </div>
      </div>

      {/* Full-Width Storefront Catalog Table (Clean, no description box) */}
      <div className="w-full p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-4">
        {/* Table Top Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#2C4152] uppercase tracking-wider">
                Storefront Catalog Products
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2C4152]/10 text-[#2C4152]">
                {filteredProducts.length} items
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Publish or unpublish items, edit pricing or inventory, and preview live on customer storefront.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('products')}
              className="text-xs font-bold text-[#2C4152] hover:text-[#D5A249] flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors w-full sm:w-auto justify-center"
            >
              <span>Manage Full Catalog</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Department Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Department Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none w-full md:w-auto -mx-1 px-1">
            {DEPARTMENTS.map((dept) => {
              const count = dept === 'All' ? totalProducts : (deptCounts[dept] || 0);
              const isActive = activeDept === dept;
              return (
                <button
                  key={dept}
                  onClick={() => {
                    setActiveDept(dept);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98] shrink-0 ${
                    isActive
                      ? 'bg-[#2C4152] text-white shadow-xs'
                      : 'bg-[#F5F5F5] text-gray-700 hover:bg-gray-200 hover:text-[#2C4152]'
                  }`}
                >
                  <span>{dept}</span>
                  <span className={`ml-1 text-[10px] ${isActive ? 'text-[#D5A249]' : 'text-gray-400'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Status Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 sm:w-64 flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search className="w-3.5 h-3.5 shrink-0" strokeWidth={2.2} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Filter products..."
                className="w-full h-9 pl-9 pr-3 text-xs border border-gray-300 rounded-lg outline-none focus:border-[#D5A249] focus:ring-1 focus:ring-[#D5A249] bg-white transition-all placeholder-gray-400"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 px-3 text-xs border border-gray-300 rounded-lg outline-none bg-white font-medium text-gray-700 cursor-pointer hover:border-[#D5A249] transition-colors w-full sm:w-auto"
            >
              <option value="All">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* MOBILE VIEW (md:hidden): Touch-Friendly Responsive Cards */}
        <div className="md:hidden space-y-3">
          {pagedProducts.length === 0 ? (
            <div className="py-10 text-center text-gray-400 bg-gray-50 rounded-xl border border-gray-200">
              <Package className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="font-semibold text-gray-500 text-xs">No matching products found</p>
              <p className="text-[11px] text-gray-400 mt-1">Try clearing filters or search term</p>
            </div>
          ) : (
            pagedProducts.map((item) => {
              const isPub = item.isPublished !== false;
              const mrp = Number(item.price || item.mrp || 2490);
              const salePrice = Number(item.salePrice || item.sellingPrice || mrp);
              const discount = item.discountPercent || (mrp > salePrice ? Math.round(((mrp - salePrice) / mrp) * 100) : 0);
              const stock = Number(item.stock !== undefined ? item.stock : 20);
              const thumb = item.images?.[0] || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=150&q=80';

              return (
                <div
                  key={item.id}
                  className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-2xs hover:border-[#D5A249]/60 transition-all space-y-3"
                >
                  {/* Top Row: Thumbnail + Item Meta */}
                  <div className="flex items-start gap-3">
                    <img
                      src={thumb}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=150&q=80';
                      }}
                      className="w-14 h-18 object-cover rounded-lg border border-gray-200 shrink-0 shadow-2xs"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold text-[#D5A249] uppercase tracking-wider truncate">
                          {item.brand || 'Atelier Leo'}
                        </span>
                        <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold bg-[#2C4152]/10 text-[#2C4152] shrink-0">
                          {item.department || 'Men'} • {item.subcategory || item.category || 'Apparel'}
                        </span>
                      </div>
                      <h4 className="font-bold text-[#2C4152] text-xs line-clamp-2 mt-1 leading-snug">
                        {item.name}
                      </h4>
                      <span className="text-[9px] text-gray-400 font-mono block mt-1">
                        #{item.id?.substring(0, 14)}
                      </span>
                    </div>
                  </div>

                  {/* Pricing & Stock Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="font-bold text-[#2C4152] text-sm">
                        ₹{salePrice.toLocaleString()}
                      </span>
                      {mrp > salePrice && (
                        <>
                          <span className="line-through text-gray-400 text-[10px]">
                            ₹{mrp.toLocaleString()}
                          </span>
                          <span className="text-emerald-700 font-bold text-[9px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            {discount}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      stock <= 0
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : stock < 6
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      {stock <= 0 ? 'Out of Stock' : `${stock} in vault`}
                    </span>
                  </div>

                  {/* Actions & Status Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 gap-2">
                    {/* Status Toggle Button */}
                    <button
                      type="button"
                      onClick={() => onTogglePublish(item.id, !isPub)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                        isPub
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                          : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                      }`}
                      title="Click to toggle live customer storefront visibility"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isPub ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                      <span>{isPub ? 'Live on Store' : 'Draft Only'}</span>
                    </button>

                    {/* Preview & Edit Action Buttons */}
                    <div className="flex items-center gap-1.5">
                      <a
                        href={`http://localhost:5173/product/${item.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-lg text-gray-700 hover:text-[#2C4152] bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all flex items-center gap-1 text-[11px] font-semibold cursor-pointer border border-gray-200"
                        title="Preview on customer storefront"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#D5A249]" />
                        <span>Preview</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => onEditProduct(item)}
                        className="px-3.5 py-1.5 text-[11px] font-bold text-[#1D2A35] bg-[#D5A249] hover:bg-[#c4923e] active:scale-95 rounded-lg transition-all shadow-2xs cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* DESKTOP TABLE VIEW (hidden md:block) */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200/80 -mx-1 sm:mx-0">
          <table className="w-full min-w-[700px] text-left text-xs">
            <thead className="bg-[#F5F5F5] text-gray-600 font-semibold uppercase text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Dept / Subcategory</th>
                <th className="py-3 px-4">Pricing</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pagedProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold text-gray-500">No matching products found</p>
                    <p className="text-[11px] text-gray-400 mt-1">Try clearing filters or click "Sync Catalog"</p>
                  </td>
                </tr>
              ) : (
                pagedProducts.map((item) => {
                  const isPub = item.isPublished !== false;
                  const mrp = Number(item.price || item.mrp || 2490);
                  const salePrice = Number(item.salePrice || item.sellingPrice || mrp);
                  const discount = item.discountPercent || (mrp > salePrice ? Math.round(((mrp - salePrice) / mrp) * 100) : 0);
                  const stock = Number(item.stock !== undefined ? item.stock : 20);
                  const thumb = item.images?.[0] || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=150&q=80';

                  return (
                    <tr key={item.id} className="hover:bg-amber-50/20 transition-colors group">
                      {/* ITEM: Thumbnail + Name + Brand */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={thumb}
                            alt={item.name}
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=150&q=80';
                            }}
                            className="w-10 h-13 object-cover rounded-md border border-gray-200 shadow-2xs group-hover:scale-105 transition-transform shrink-0"
                          />
                          <div className="max-w-[260px] min-w-0">
                            <span className="font-bold text-[#2C4152] block truncate text-xs" title={item.name}>
                              {item.name}
                            </span>
                            <span className="text-[10px] text-[#D5A249] font-semibold block uppercase tracking-wider mt-0.5">
                              {item.brand || 'Atelier Leo'}
                            </span>
                            <span className="text-[9px] text-gray-400 font-mono">
                              #{item.id?.substring(0, 12)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* DEPT / SUBCATEGORY */}
                      <td className="py-3 px-4">
                        <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#2C4152]/10 text-[#2C4152]">
                          {item.department || 'Men'}
                        </span>
                        <span className="block text-[11px] text-gray-600 font-medium mt-1 truncate max-w-[160px]">
                          {item.subcategory || item.category || 'Apparel'}
                        </span>
                      </td>

                      {/* PRICING */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#2C4152] text-xs">
                          ₹{salePrice.toLocaleString()}
                        </div>
                        {mrp > salePrice && (
                          <div className="flex items-center gap-1.5 text-[10px] mt-0.5">
                            <span className="line-through text-gray-400">₹{mrp.toLocaleString()}</span>
                            <span className="text-emerald-600 font-bold">
                              {discount}% OFF
                            </span>
                          </div>
                        )}
                      </td>

                      {/* STOCK */}
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          stock <= 0
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : stock < 6
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}>
                          {stock <= 0 ? 'Out of Stock' : `${stock} in vault`}
                        </span>
                      </td>

                      {/* STATUS TOGGLE */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => onTogglePublish(item.id, !isPub)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95 ${
                            isPub
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
                          }`}
                          title="Click to toggle live storefront visibility"
                        >
                          {isPub ? '● Published' : '○ Draft'}
                        </button>
                      </td>

                      {/* ACTIONS: Preview, Edit */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Preview in Live Store */}
                          <a
                            href={`http://localhost:5173/product/${item.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-md text-gray-500 hover:text-[#2C4152] hover:bg-gray-200 hover:scale-110 active:scale-90 transition-all cursor-pointer"
                            title="Preview on customer storefront"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </a>

                          {/* Edit Button */}
                          <button
                            onClick={() => onEditProduct(item)}
                            className="px-3 py-1 text-[11px] font-bold text-[#2C4152] bg-[#F5F5F5] hover:bg-[#D5A249] hover:text-[#1D2A35] hover:shadow-xs hover:scale-105 active:scale-95 rounded-md transition-all cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500 gap-2.5">
            <span className="text-center sm:text-left">
              Showing <strong className="text-[#2C4152]">{(safePage - 1) * itemsPerPage + 1}</strong> to{' '}
              <strong className="text-[#2C4152]">
                {Math.min(safePage * itemsPerPage, filteredProducts.length)}
              </strong> of <strong className="text-[#2C4152]">{filteredProducts.length}</strong> items
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="p-1.5 rounded-md border border-gray-200 hover:bg-[#2C4152] hover:text-white hover:border-[#2C4152] active:scale-95 disabled:opacity-40 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-bold text-[#2C4152]">
                {safePage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="p-1.5 rounded-md border border-gray-200 hover:bg-[#2C4152] hover:text-white hover:border-[#2C4152] active:scale-95 disabled:opacity-40 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
