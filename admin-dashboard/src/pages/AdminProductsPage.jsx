import { useState, useMemo, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  CheckCircle,
  EyeOff,
  Edit,
  Trash2,
  Grid,
  List,
  Sparkles,
  Package,
  Eye,
  ExternalLink,
} from 'lucide-react';

export default function AdminProductsPage({
  products = [],
  initialSearch = '',
  onOpenAddProduct,
  onEditProduct,
  onDeleteProduct,
  onTogglePublish,
}) {
  const [searchTerm, setSearchTerm] = useState(initialSearch || '');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All'); // 'All', 'published', 'draft'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [prevInitialSearch, setPrevInitialSearch] = useState(initialSearch);
  if (prevInitialSearch !== initialSearch) {
    setPrevInitialSearch(initialSearch);
    setSearchTerm(initialSearch || '');
  }

  const departments = ['All', 'Men', 'Women', 'Kids', 'Accessories'];

  // Filtered list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Department
      if (selectedDept !== 'All' && p.department?.toLowerCase() !== selectedDept.toLowerCase()) {
        return false;
      }
      // 2. Publication status
      if (selectedStatus === 'published' && p.isPublished === false) return false;
      if (selectedStatus === 'draft' && p.isPublished !== false) return false;

      // 3. Search query
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = p.name?.toLowerCase().includes(q);
        const matchesBrand = p.brand?.toLowerCase().includes(q);
        const matchesSub = p.subcategory?.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesSub) return false;
      }
      return true;
    });
  }, [products, selectedDept, selectedStatus, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl font-bold font-serif text-[#2C4152] tracking-wide">
            Product Catalog Management
          </h1>
          <p className="text-xs text-gray-500">
            Publish, edit, upload photography, and adjust inventory in Firestore.
          </p>
        </div>

        <button
          onClick={onOpenAddProduct}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-[#D5A249] text-[#2C4152] hover:bg-[#E4BA68] transition-all shadow-sm cursor-pointer w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Unified Department Tabs, Status Filter & View Mode Controls */}
      <div className="p-3 sm:p-4 rounded-xl bg-white border border-gray-200 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Department Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none -mx-1 px-1">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                  selectedDept === dept
                    ? 'bg-[#2C4152] text-white shadow-xs'
                    : 'bg-[#F5F5F5] text-gray-700 hover:bg-gray-200 hover:text-[#2C4152]'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Right Controls: Status Filter Dropdown & View Mode Toggle */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100 shrink-0">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-9 px-3 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-[#D5A249] focus:ring-1 focus:ring-[#D5A249] cursor-pointer hover:border-[#D5A249] font-medium text-gray-700 transition-colors w-full sm:w-auto"
                aria-label="Filter products by status"
              >
                <option value="All">All Statuses</option>
                <option value="published">Published Live</option>
                <option value="draft">Drafts Only</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded text-xs transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-xs text-[#2C4152] font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded text-xs transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white shadow-xs text-[#2C4152] font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Results Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold text-gray-500">
          Showing <span className="font-bold text-[#2C4152]">{filteredProducts.length}</span> products
        </span>
      </div>

      {/* Content Rendering: Grid vs Table */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-gray-200">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-[#2C4152]">No products found</h3>
          <p className="text-xs text-gray-500 mt-1">Try resetting search filters or click "Add New Product" to create one.</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* LUXURY EDITORIAL GRID VIEW (2 per row on mobile, 3 on md, 4 on xl) */
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 lg:gap-6">
          {filteredProducts.map((p) => {
            const isPub = p.isPublished !== false;
            const fallbackImg =
              'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80';
            const coverImg = p.images?.[0] || fallbackImg;
            const price = Number(p.price || p.mrp || 2490);
            const salePrice = Number(p.salePrice || p.sellingPrice || price);
            const discount =
              p.discountPercent ||
              p.discount ||
              (price > salePrice ? Math.round(((price - salePrice) / price) * 100) : 0);
            const stock = Number(p.stock !== undefined ? p.stock : 20);
            const isLowStock = stock > 0 && stock <= 5;
            const isOutOfStock = stock <= 0;

            return (
              <div
                key={p.id}
                className="group relative bg-white rounded-xl sm:rounded-2xl border border-gray-200/90 shadow-2xs hover:shadow-xl hover:border-[#D5A249]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Image Container with Luxury 3:4 Editorial Aspect Ratio */}
                  <div className="relative aspect-3/4 bg-neutral-100 overflow-hidden select-none">
                    <img
                      src={coverImg}
                      alt={p.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackImg;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Gradient shade on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Top Left: Interactive Status Pill */}
                    <button
                      type="button"
                      onClick={() => onTogglePublish(p.id, !isPub)}
                      className={`absolute top-2 left-2 sm:top-3 sm:left-3 inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wide shadow-md backdrop-blur-md transition-all duration-200 cursor-pointer active:scale-95 ${
                        isPub
                          ? 'bg-white/95 text-emerald-800 border border-emerald-300/80 hover:bg-emerald-50'
                          : 'bg-[#1D2A35]/90 text-gray-200 border border-white/20 hover:bg-[#1D2A35]'
                      }`}
                      title={isPub ? 'Click to set as Draft (Hide from customer store)' : 'Click to Publish live to storefront'}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isPub ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'
                        }`}
                      />
                      <span className="hidden sm:inline">{isPub ? 'Live on Store' : 'Draft Only'}</span>
                      <span className="sm:hidden">{isPub ? 'Live' : 'Draft'}</span>
                    </button>

                    {/* Top Right: Stock / Sold Out Badge */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col items-end gap-1 pointer-events-none">
                      {isOutOfStock ? (
                        <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold tracking-wider uppercase bg-gray-900/90 text-white shadow-md backdrop-blur-md">
                          Sold Out
                        </span>
                      ) : isLowStock ? (
                        <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold tracking-wider uppercase bg-rose-600/90 text-white shadow-md backdrop-blur-md animate-pulse">
                          {stock} left
                        </span>
                      ) : (
                        <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-semibold bg-black/60 text-white shadow-md backdrop-blur-md">
                          {stock} vault
                        </span>
                      )}
                    </div>

                    {/* Bottom Right: Photo Counter Badge */}
                    {p.images && p.images.length > 1 && (
                      <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 px-1.5 sm:px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-white text-[8px] sm:text-[10px] font-medium tracking-wider flex items-center gap-1 pointer-events-none">
                        <span>{p.images.length} photos</span>
                      </span>
                    )}

                    {/* Quick Hover Preview Button (Bottom Left) */}
                    <a
                      href={`http://localhost:5173/product/${p.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 hover:bg-white text-[#1D2A35] text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 flex items-center gap-1 sm:gap-1.5 cursor-pointer"
                      title="Open Live Product Page in customer storefront"
                    >
                      <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D5A249]" />
                      <span className="hidden sm:inline">Preview</span>
                    </a>
                  </div>

                  {/* Card Editorial Details */}
                  <div className="p-2.5 sm:p-4 space-y-2 sm:space-y-2.5">
                    {/* Brand & Department Meta Row */}
                    <div className="flex items-center justify-between gap-1 sm:gap-2">
                      <span className="font-serif tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[10px] sm:text-xs font-bold text-[#D5A249] truncate">
                        {p.brand || 'ATELIER LEO'}
                      </span>
                      <span className="text-[8px] sm:text-[10px] font-bold text-[#2C4152] bg-[#2C4152]/10 px-1.5 sm:px-2.5 py-0.5 rounded-full truncate max-w-[75px] sm:max-w-none">
                        {p.department} • {p.subcategory || p.category || 'Apparel'}
                      </span>
                    </div>

                    {/* Product Title & ID */}
                    <div>
                      <h3
                        className="text-xs sm:text-sm font-bold text-[#1D2A35] line-clamp-1 leading-snug group-hover:text-[#D5A249] transition-colors"
                        title={p.name}
                      >
                        {p.name}
                      </h3>
                      <span className="text-[8px] sm:text-[9px] text-gray-400 font-mono block mt-0.5">
                        #{p.id?.substring(0, 12)}
                      </span>
                    </div>

                    {/* Pricing Row with INR Symbol & Discount Pill */}
                    <div className="flex items-baseline gap-1.5 sm:gap-2 pt-1 border-t border-gray-100 flex-wrap">
                      <span className="font-bold text-sm sm:text-base text-[#1D2A35]">
                        ₹{salePrice.toLocaleString('en-IN')}
                      </span>
                      {price > salePrice && (
                        <>
                          <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                            ₹{price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[8px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 sm:px-2 py-0.5 rounded-md border border-emerald-200">
                            {discount}%
                          </span>
                        </>
                      )}
                    </div>

                    {/* Specifications: Sizes & Colors in Clean Minimalist Rows */}
                    <div className="space-y-1.5 sm:space-y-2 pt-1">
                      {/* Sizes Chips */}
                      {p.sizes && p.sizes.length > 0 && (
                        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                          <span className="text-[8px] sm:text-[9px] uppercase font-bold text-gray-400 tracking-wider">
                            Sizes:
                          </span>
                          <div className="flex items-center gap-1 flex-wrap">
                            {p.sizes.slice(0, 4).map((s, idx) => (
                              <span
                                key={idx}
                                className="px-1 sm:px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-bold bg-gray-50 text-gray-700 border border-gray-200 shadow-2xs"
                              >
                                {s}
                              </span>
                            ))}
                            {p.sizes.length > 4 && (
                              <span className="text-[8px] sm:text-[9px] text-gray-400 font-medium">
                                +{p.sizes.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Color Swatch Dots */}
                      {p.colors && p.colors.length > 0 && (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className="text-[8px] sm:text-[9px] uppercase font-bold text-gray-400 tracking-wider">
                            Colors:
                          </span>
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            {p.colors.slice(0, 4).map((c, idx) => {
                              const hex = typeof c === 'object' ? c.hex : '#2C4152';
                              const name = typeof c === 'object' ? c.name : c;
                              return (
                                <span
                                  key={idx}
                                  className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full border border-black/20 shadow-2xs ring-1 ring-white shrink-0"
                                  style={{ backgroundColor: hex }}
                                  title={name}
                                />
                              );
                            })}
                            {p.colors.length > 4 && (
                              <span className="text-[8px] sm:text-[9px] text-gray-400 font-medium">
                                +{p.colors.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer: Clean Luxury Edit Command & Quick Actions */}
                <div className="p-2 sm:p-3 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between gap-1 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => onEditProduct(p)}
                    className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-[#2C4152] hover:bg-[#D5A249] text-white hover:text-[#1D2A35] text-[11px] sm:text-xs font-bold transition-all shadow-xs hover:shadow-md active:scale-98 flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer"
                  >
                    <Edit className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Edit</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <a
                      href={`http://localhost:5173/product/${p.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-gray-500 hover:text-[#2C4152] bg-white hover:bg-gray-100 border border-gray-200/80 active:scale-95 transition-all cursor-pointer shadow-2xs"
                      title="Preview on Live Store"
                    >
                      <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => onDeleteProduct(p)}
                      className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-gray-400 hover:text-rose-600 bg-white hover:bg-rose-50 border border-gray-200/80 active:scale-95 transition-all cursor-pointer shadow-2xs"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW (Responsive Dual Layout) */
        <div>
          {/* Mobile Cards (md:hidden) */}
          <div className="md:hidden space-y-3">
            {filteredProducts.map((p) => {
              const isPub = p.isPublished !== false;
              const fallbackImg =
                'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=150&q=80';
              const coverImg = p.images?.[0] || fallbackImg;
              const price = Number(p.price || p.mrp || 2490);
              const salePrice = Number(p.salePrice || p.sellingPrice || price);
              const discount =
                p.discountPercent ||
                p.discount ||
                (price > salePrice ? Math.round(((price - salePrice) / price) * 100) : 0);

              return (
                <div
                  key={p.id}
                  className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={coverImg}
                      alt={p.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackImg;
                      }}
                      className="w-14 h-18 object-cover rounded-lg border border-gray-200 shrink-0 shadow-2xs"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold text-[#D5A249] uppercase tracking-wider">
                          {p.brand || 'LEOVERSE'}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#2C4152]/10 text-[#2C4152]">
                          {p.department} • {p.subcategory || p.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-[#1D2A35] text-xs line-clamp-2 mt-1 leading-snug">
                        {p.name}
                      </h4>
                      <span className="text-[9px] text-gray-400 font-mono block mt-1">
                        #{p.id?.substring(0, 14)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="font-bold text-[#1D2A35] text-sm">
                        ₹{salePrice.toLocaleString()}
                      </span>
                      {price > salePrice && (
                        <>
                          <span className="line-through text-gray-400 text-[10px]">
                            ₹{price.toLocaleString()}
                          </span>
                          <span className="text-emerald-700 font-bold text-[9px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            {discount}% OFF
                          </span>
                        </>
                      )}
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      (p.stock || 0) < 5 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {(p.stock || 0) <= 0 ? 'Out of Stock' : `${p.stock} in stock`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 gap-2">
                    <button
                      type="button"
                      onClick={() => onTogglePublish(p.id, !isPub)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                        isPub
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-gray-100 text-gray-600 border border-gray-300'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isPub ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                      <span>{isPub ? 'Live on Store' : 'Draft Only'}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <a
                        href={`http://localhost:5173/product/${p.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-gray-600 hover:text-[#2C4152] bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all"
                        title="Preview on Store"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => onEditProduct(p)}
                        className="px-3 py-1.5 text-[11px] font-bold text-[#1D2A35] bg-[#D5A249] hover:bg-[#c4923e] active:scale-95 rounded-lg transition-all"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteProduct(p)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-95 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table (hidden md:block) */}
          <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-xs">
                <thead className="bg-[#2C4152] text-white font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-3">Dept & Category</th>
                    <th className="py-3 px-3">Price & Discount</th>
                    <th className="py-3 px-3">Sizes</th>
                    <th className="py-3 px-3">Colors</th>
                    <th className="py-3 px-3 text-center">Stock</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((p) => {
                    const isPub = p.isPublished !== false;
                    return (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={p.images?.[0] || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=150&q=80'}
                            alt={p.name}
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=150&q=80';
                            }}
                            className="w-10 h-14 object-cover rounded-lg border border-gray-200 shadow-2xs"
                          />
                          <div className="max-w-[200px]">
                            <span className="font-bold text-[#2C4152] block line-clamp-1">{p.name}</span>
                            <span className="text-[10px] font-semibold text-[#D5A249]">{p.brand}</span>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <span className="font-medium text-[#2C4152]">{p.department}</span>
                          <span className="block text-[10px] text-gray-500">{p.subcategory || p.category}</span>
                        </td>

                        <td className="py-3 px-3">
                          <span className="font-bold text-[#2C4152]">₹{p.salePrice || p.price}</span>
                          {p.discountPercent > 0 && (
                            <span className="block text-[10px] text-emerald-600 font-bold">
                              {p.discountPercent}% OFF
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-3">
                          <div className="flex flex-wrap gap-1 max-w-[120px]">
                            {p.sizes?.map((s, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 rounded text-[9px] bg-gray-100 text-gray-700">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1">
                            {p.colors?.map((c, idx) => (
                              <span
                                key={idx}
                                className="w-3 h-3 rounded-full border border-black/20"
                                style={{ backgroundColor: typeof c === 'object' ? c.hex : '#2C4152' }}
                                title={typeof c === 'object' ? c.name : c}
                              />
                            ))}
                          </div>
                        </td>

                        <td className="py-3 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            (p.stock || 0) < 5 ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {p.stock || 0}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => onTogglePublish(p.id, !isPub)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer ${
                              isPub ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {isPub ? 'Published' : 'Draft'}
                          </button>
                        </td>

                        <td className="py-3 px-4 text-right space-x-1">
                          <a
                            href={`http://localhost:5173/product/${p.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-gray-400 hover:text-[#2C4152] rounded inline-block"
                            title="Preview on Store"
                          >
                            <Eye className="w-4 h-4 inline" />
                          </a>
                          <button
                            onClick={() => onEditProduct(p)}
                            className="p-1.5 text-gray-600 hover:text-[#2C4152] rounded"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 inline" />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(p)}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
