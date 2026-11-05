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

  useEffect(() => {
    if (initialSearch !== undefined) {
      setSearchTerm(initialSearch);
    }
  }, [initialSearch]);

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-[#D5A249] text-[#2C4152] hover:bg-[#E4BA68] transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-4">
        {/* Department Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-1.5">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedDept === dept
                    ? 'bg-[#2C4152] text-white shadow-xs'
                    : 'bg-[#F5F5F5] text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded text-xs transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-xs text-[#2C4152]' : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded text-xs transition-colors ${
                viewMode === 'table' ? 'bg-white shadow-xs text-[#2C4152]' : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search & Status Filter Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80 flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4 shrink-0" strokeWidth={2.2} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, brand, subcategory..."
              className="w-full h-9 pl-9 pr-3 text-xs border border-gray-300 rounded-lg focus:border-[#D5A249] focus:ring-1 focus:ring-[#D5A249] outline-none bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-gray-500 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-9 px-3 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-[#D5A249] focus:ring-1 focus:ring-[#D5A249] cursor-pointer hover:border-[#D5A249] transition-colors"
            >
              <option value="All">All Statuses</option>
              <option value="published">Published Only (Storefront Active)</option>
              <option value="draft">Drafts Only (Hidden)</option>
            </select>
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
        /* LUXURY EDITORIAL GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
            const isLowStock = (p.stock || 0) > 0 && (p.stock || 0) <= 5;
            const isOutOfStock = (p.stock || 0) === 0;

            return (
              <div
                key={p.id}
                className="group relative bg-white rounded-2xl border border-gray-200/90 shadow-2xs hover:shadow-xl hover:border-[#D5A249]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Image Container with Editorial Aspect Ratio */}
                  <div className="relative aspect-3/4 bg-neutral-100 overflow-hidden select-none">
                    <img
                      src={coverImg}
                      alt=""
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackImg;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Gradient shade on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Top Left: Floating Interactive Status Pill */}
                    <button
                      type="button"
                      onClick={() => onTogglePublish(p.id, !isPub)}
                      className={`absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide shadow-xs backdrop-blur-md transition-all duration-200 cursor-pointer ${
                        isPub
                          ? 'bg-emerald-600/90 hover:bg-emerald-600 text-white border border-emerald-400/30'
                          : 'bg-[#121A21]/80 hover:bg-[#121A21] text-gray-200 border border-white/20'
                      }`}
                      title={isPub ? 'Click to set as Draft (Hide from Store)' : 'Click to Publish to Store'}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isPub ? 'bg-emerald-300 animate-pulse' : 'bg-gray-400'
                        }`}
                      />
                      <span>{isPub ? 'Live on Store' : 'Draft Only'}</span>
                    </button>

                    {/* Top Right: Badges (Discount or Low Stock) */}
                    <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1 pointer-events-none">
                      {isLowStock && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-rose-600/90 text-white shadow-xs backdrop-blur-xs">
                          {p.stock} left
                        </span>
                      )}
                      {isOutOfStock && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-gray-900/90 text-white shadow-xs backdrop-blur-xs">
                          Sold Out
                        </span>
                      )}
                    </div>

                    {/* Bottom Right: Photo Counter */}
                    {p.images && p.images.length > 1 && (
                      <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium tracking-wider flex items-center gap-1 pointer-events-none">
                        <span>{p.images.length} photos</span>
                      </span>
                    )}

                    {/* Quick Hover Preview Button */}
                    <a
                      href={`http://localhost:5173/product/${p.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 hover:bg-white text-[#2C4152] text-[10px] font-bold tracking-wider uppercase shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                      title="Open Live Product Page"
                    >
                      <Eye className="w-3 h-3 text-[#D5A249]" />
                      <span>Preview</span>
                    </a>
                  </div>

                  {/* Card Editorial Body */}
                  <div className="p-4 space-y-3">
                    {/* Brand & Department Meta Row */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-serif tracking-[0.2em] uppercase text-[11px] font-bold text-[#D5A249]">
                        {p.brand || 'LEOVERSE'}
                      </span>
                      <span className="text-[10px] font-medium text-gray-500 bg-gray-100/80 border border-gray-200/70 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                        {p.department} • {p.subcategory || p.category}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3
                      className="text-[13px] font-bold text-[#1D2A35] line-clamp-1 leading-snug group-hover:text-[#D5A249] transition-colors"
                      title={p.name}
                    >
                      {p.name}
                    </h3>

                    {/* Pricing Row with INR Symbol & Discount Pill */}
                    <div className="flex items-baseline gap-2 pt-0.5">
                      <span className="font-bold text-base text-[#1D2A35]">
                        ₹{salePrice.toLocaleString('en-IN')}
                      </span>
                      {price > salePrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{price.toLocaleString('en-IN')}
                        </span>
                      )}
                      {discount > 0 && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Meta Specifications: Sizes & Colors in Clean Rows */}
                    <div className="space-y-2 pt-1 border-t border-gray-100">
                      {/* Sizes Chips */}
                      {p.sizes && p.sizes.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                            Sizes:
                          </span>
                          <div className="flex items-center gap-1 flex-wrap">
                            {p.sizes.slice(0, 4).map((s, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-gray-50 text-gray-700 border border-gray-200"
                              >
                                {s}
                              </span>
                            ))}
                            {p.sizes.length > 4 && (
                              <span className="text-[10px] text-gray-400 font-medium">
                                +{p.sizes.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Color Swatch Dots */}
                      {p.colors && p.colors.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                            Colors:
                          </span>
                          <div className="flex items-center gap-1.5">
                            {p.colors.slice(0, 5).map((c, idx) => {
                              const hex = typeof c === 'object' ? c.hex : '#2C4152';
                              const name = typeof c === 'object' ? c.name : c;
                              return (
                                <span
                                  key={idx}
                                  className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-2xs ring-1 ring-white"
                                  style={{ backgroundColor: hex }}
                                  title={name}
                                />
                              );
                            })}
                            {p.colors.length > 5 && (
                              <span className="text-[10px] text-gray-400 font-medium">
                                +{p.colors.length - 5}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Bar */}
                <div className="px-4 py-3 bg-[#F9FAFB] border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onTogglePublish(p.id, !isPub)}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      isPub
                        ? 'text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 shadow-2xs'
                        : 'text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isPub ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                    <span>{isPub ? 'Live' : 'Draft'}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <a
                      href={`http://localhost:5173/product/${p.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-gray-500 hover:text-[#2C4152] hover:bg-white hover:shadow-2xs transition-all cursor-pointer"
                      title="Preview on Live Store"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => onEditProduct(p)}
                      className="p-1.5 rounded-lg text-gray-600 hover:text-[#D5A249] hover:bg-white hover:shadow-2xs transition-all cursor-pointer"
                      title="Edit Product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteProduct(p)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
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
      )}
    </div>
  );
}
