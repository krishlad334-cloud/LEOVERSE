import React, { useEffect, useState } from 'react';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  ExternalLink,
  Search,
  Filter,
  Check,
  X,
  Upload,
  AlertCircle,
  RefreshCw,
  Video
} from 'lucide-react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  togglePublishProduct,
  getCategories,
  getMedia
} from '../../services/api';

export const AdminProducts = ({ onNavigateToAnalytics }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mediaLibrary, setMediaLibrary] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Add / Edit Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [form, setForm] = useState({
    name: '',
    brand: 'ATELIER LEO',
    department: "Men's Apparel",
    category: '',
    subcategory: '',
    mrp: 3499,
    sellingPrice: 2499,
    stock: 25,
    sizesText: 'S, M, L, XL, XXL',
    colorsText: 'Onyx Black:#111111, Sand Ecru:#E3DAC9',
    description: '',
    fabricCare: '',
    fit: 'Relaxed Tailored',
    detailsText: '',
    isPublished: 1,
    selectedMediaIds: []
  });

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [prods, cats, media] = await Promise.all([
        getProducts({
          category: categoryFilter !== 'All' ? categoryFilter : undefined,
          search: search || undefined
        }),
        getCategories(),
        getMedia()
      ]);
      setProducts(prods);
      setCategories(cats);
      setMediaLibrary(media);
    } catch (err) {
      setError(err.message || 'Failed to load catalog');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [categoryFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadData();
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setForm({
      name: '',
      brand: 'ATELIER LEO',
      department: "Men's Apparel",
      category: categories[0]?.name || 'Shirts & Polos',
      subcategory: 'French Flax Linen',
      mrp: 3499,
      sellingPrice: 2499,
      stock: 30,
      sizesText: 'S, M, L, XL, XXL',
      colorsText: 'Sand Ecru:#E3DAC9, Onyx Black:#1A1A1A, Navy:#1B1F38',
      description: 'Handcrafted luxury menswear tailored with French flax linen and Australian shell buttons.',
      fabricCare: 'Dry clean or machine wash cold gentle.',
      fit: 'Relaxed Tailored',
      detailsText: '100% Pure Normandy French Linen\nAustralian mother-of-pearl buttons\nConvertible Cuban camp collar',
      isPublished: 1,
      selectedMediaIds: []
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    const sizesStr = Array.isArray(prod.sizes) ? prod.sizes.join(', ') : '';
    const colorsStr = Array.isArray(prod.colors)
      ? prod.colors.map(c => `${c.name}:${c.hex}`).join(', ')
      : '';
    const detailsStr = Array.isArray(prod.details) ? prod.details.join('\n') : '';
    const mediaIds = Array.isArray(prod.media) ? prod.media.map(m => m.id) : [];

    setForm({
      name: prod.name,
      brand: prod.brand || 'ATELIER LEO',
      department: prod.department || "Men's Apparel",
      category: prod.category,
      subcategory: prod.subcategory || '',
      mrp: prod.mrp,
      sellingPrice: prod.sellingPrice,
      stock: prod.stock,
      sizesText: sizesStr,
      colorsText: colorsStr,
      description: prod.description || '',
      fabricCare: prod.fabricCare || '',
      fit: prod.fit || 'Regular',
      detailsText: detailsStr,
      isPublished: prod.isPublished,
      selectedMediaIds: mediaIds
    });
    setModalOpen(true);
  };

  const handleTogglePublish = async (id) => {
    try {
      await togglePublishProduct(id);
      await loadData();
    } catch (err) {
      alert(err.message || 'Failed to toggle status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product permanently? All associated analytics will also be cleaned up.')) return;
    try {
      await deleteProduct(id);
      await loadData();
    } catch (err) {
      alert(err.message || 'Failed to delete product');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const sizes = form.sizesText.split(',').map(s => s.trim()).filter(Boolean);
      const colors = form.colorsText.split(',').map(c => {
        const parts = c.split(':');
        return {
          name: parts[0]?.trim() || 'Color',
          hex: parts[1]?.trim() || '#111111'
        };
      }).filter(c => c.name);

      const details = form.detailsText.split('\n').map(d => d.trim()).filter(Boolean);

      const payload = {
        name: form.name,
        brand: form.brand,
        department: form.department || "Men's Apparel",
        category: form.category,
        subcategory: form.subcategory,
        mrp: Number(form.mrp),
        sellingPrice: Number(form.sellingPrice),
        stock: Number(form.stock),
        sizes,
        colors,
        description: form.description,
        fabricCare: form.fabricCare,
        fit: form.fit,
        details,
        isPublished: form.isPublished,
        mediaIds: form.selectedMediaIds
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
      } else {
        await createProduct(payload);
      }

      setModalOpen(false);
      await loadData();
    } catch (err) {
      setError(err.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const discountPercent = form.mrp > 0
    ? Math.round(((form.mrp - form.sellingPrice) / form.mrp) * 100)
    : 0;

  const displayedProducts = products.filter((p) => {
    if (statusFilter === 'Published') return p.isPublished === 1;
    if (statusFilter === 'Draft') return p.isPublished === 0;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D6] dark:border-[#27272A]">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-[0.12em] uppercase text-[#1E1E1E] dark:text-white">
            Men's Product Catalog
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 tracking-wide mt-1 font-semibold">
            Pure Menswear Collection: Shirts, Trousers, Suiting, Streetwear, Ethnic & Accessories
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#1E1E1E] dark:bg-[#C5A880] hover:bg-black dark:hover:bg-[#B3956E] text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Menswear Style</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl space-y-4 shadow-xs">
        {/* Top Controls Row: Search Bar + Status Filter + Count / Clear */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-2xl">
            {/* Search input */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
              <input
                type="text"
                placeholder="Search styles by name, category, fabric, or tag..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#F8F6F2] dark:bg-[#202026] border border-[#DCD5C9] dark:border-[#2E2E36] text-[#1E1E1E] dark:text-white text-xs pl-9 pr-8 py-2.5 rounded-xl focus:outline-none focus:border-[#A68962] transition"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-2.5 text-gray-400 hover:text-black dark:hover:text-white p-0.5 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Status filter dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#F8F6F2] dark:bg-[#202026] border border-[#DCD5C9] dark:border-[#2E2E36] text-[#1E1E1E] dark:text-white text-xs font-semibold py-2.5 px-3 rounded-xl focus:outline-none focus:border-[#A68962] cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published Only</option>
              <option value="Draft">Drafts / Hidden</option>
            </select>
          </div>

          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 self-end md:self-auto">
            <span className="font-semibold">Showing {displayedProducts.length} of {products.length} Styles</span>
            {(categoryFilter !== 'All' || statusFilter !== 'All' || search) && (
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter('All');
                  setStatusFilter('All');
                  setSearch('');
                }}
                className="text-[#A68962] dark:text-[#C5A880] font-bold hover:underline cursor-pointer ml-1"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Category Pills (Clean Flex Wrap without chunky horizontal scrollbar) */}
        <div className="pt-3 border-t border-[#E5E0D6] dark:border-[#27272A] flex flex-wrap items-center gap-1.5 sm:gap-2 no-scrollbar">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mr-1 hidden sm:inline">
            Department:
          </span>
          <button
            onClick={() => setCategoryFilter('All')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition cursor-pointer flex items-center space-x-1.5 ${
              categoryFilter === 'All'
                ? 'bg-[#1E1E1E] dark:bg-[#C5A880] text-white dark:text-black shadow-xs'
                : 'bg-[#F8F6F2] dark:bg-[#202026] text-gray-700 dark:text-gray-300 hover:bg-[#EAE5DC] dark:hover:bg-[#2A2A34] border border-[#E5E0D6]/60 dark:border-[#2E2E36]'
            }`}
          >
            <span>All Menswear</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              categoryFilter === 'All'
                ? 'bg-black/20 dark:bg-black/30 text-current'
                : 'bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-400'
            }`}>
              {products.length}
            </span>
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat.name).length;
            const isSelected = categoryFilter === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.name)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition cursor-pointer flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-[#1E1E1E] dark:bg-[#C5A880] text-white dark:text-black shadow-xs'
                    : 'bg-[#F8F6F2] dark:bg-[#202026] text-gray-700 dark:text-gray-300 hover:bg-[#EAE5DC] dark:hover:bg-[#2A2A34] border border-[#E5E0D6]/60 dark:border-[#2E2E36]'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected
                    ? 'bg-black/20 dark:bg-black/30 text-current'
                    : 'bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-3">
          <RefreshCw className="w-8 h-8 text-[#A68962] animate-spin" />
          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Loading menswear styles...</p>
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#E5E0D6] rounded-2xl space-y-3">
          <Package className="w-10 h-10 text-gray-400 mx-auto" />
          <p className="text-sm font-bold text-gray-700">No menswear styles found</p>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-[#1E1E1E] text-white font-bold text-xs rounded-xl uppercase tracking-wider"
          >
            Create First Style
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#FAF9F6] dark:bg-[#202026] border-b border-[#E5E0D6] dark:border-[#27272A] text-gray-500 dark:text-gray-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4 font-bold">Menswear Style</th>
                  <th className="py-3.5 px-3 font-bold">Category</th>
                  <th className="py-3.5 px-3 font-bold">Price & Discount</th>
                  <th className="py-3.5 px-3 font-bold text-center">Stock</th>
                  <th className="py-3.5 px-3 font-bold text-center">Status</th>
                  <th className="py-3.5 px-3 font-bold text-center">Analytics</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#27272A]">
                {displayedProducts.map((p) => {
                  const thumb = p.images?.[0] || 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=150&q=80';
                  const isLowStock = p.stock <= 5;
                  const hasVideo = p.videos?.length > 0;
                  return (
                    <tr key={p.id} className="hover:bg-[#FBF9F5] dark:hover:bg-[#202026] transition">
                      {/* Product */}
                      <td className="py-3 px-4 flex items-center space-x-3">
                        <div className="relative shrink-0">
                          <img
                            src={thumb}
                            alt={p.name}
                            className="w-12 h-14 object-cover rounded-lg border border-[#E5E0D6]"
                          />
                          {hasVideo && (
                            <span className="absolute bottom-1 right-1 p-0.5 bg-pink-600 rounded text-white" title="Runway Video">
                              <Video className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                        <div className="max-w-[200px] truncate">
                          <p className="font-bold text-[#1E1E1E] dark:text-white truncate text-xs">{p.name}</p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{p.brand} • <span className="font-mono text-gray-400">{p.id}</span></p>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-3">
                        <span className="text-[10px] bg-[#F8F6F2] dark:bg-[#202026] text-[#A68962] dark:text-[#C5A880] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider border border-[#E5E0D6] dark:border-[#2E2E36]">
                          {p.category}
                        </span>
                        {p.subcategory && <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">{p.subcategory}</p>}
                      </td>

                      {/* Pricing */}
                      <td className="py-3 px-3">
                        <div className="flex items-baseline space-x-1.5">
                          <span className="font-bold text-[#1E1E1E] dark:text-white text-xs">₹{p.sellingPrice.toLocaleString()}</span>
                          <span className="text-gray-400 line-through text-[11px]">₹{p.mrp.toLocaleString()}</span>
                        </div>
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                          {p.discountPercent}% OFF
                        </span>
                      </td>

                      {/* Stock */}
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          isLowStock
                            ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                            : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        }`}>
                          {p.stock} units
                        </span>
                        {isLowStock && <span className="block text-[9px] text-amber-700 dark:text-amber-400 mt-0.5 font-bold">Low Stock Alert</span>}
                      </td>

                      {/* Status Toggle */}
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => handleTogglePublish(p.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer transition ${
                            p.isPublished
                              ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-200'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {p.isPublished ? 'Published' : 'Draft / Hidden'}
                        </button>
                      </td>

                      {/* Analytics Shortcut */}
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => onNavigateToAnalytics?.(p.id)}
                          className="px-2.5 py-1 bg-[#F8F6F2] dark:bg-[#202026] hover:bg-[#1E1E1E] hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 transition cursor-pointer inline-flex items-center space-x-1 border border-[#E5E0D6] dark:border-[#2E2E36]"
                        >
                          <BarChart3 className="w-3 h-3" />
                          <span>Stats</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <a
                            href={`/product/${p.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-gray-500 hover:text-black dark:hover:text-white transition"
                            title="Preview in Store"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 text-gray-500 hover:text-[#A68962] dark:hover:text-[#C5A880] transition cursor-pointer"
                            title="Edit Style"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 transition cursor-pointer"
                            title="Delete Style"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto text-[#242321] dark:text-[#F3EFE6] p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D6] dark:border-[#27272A]">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-[#A68962] dark:text-[#C5A880]" />
                <h3 className="text-base font-serif font-bold tracking-wider uppercase text-[#1E1E1E] dark:text-white">
                  {editingProduct ? "Edit Men's Garment" : "Add New Men's Garment"}
                </h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-black dark:hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                    Garment Title *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. The Riviera Camp Collar Linen Shirt"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl text-[#1E1E1E] focus:outline-none focus:border-[#A68962]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                    Brand Label
                  </label>
                  <input
                    type="text"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl text-[#1E1E1E] focus:outline-none focus:border-[#A68962]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl text-[#1E1E1E] focus:outline-none focus:border-[#A68962]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    value={form.subcategory}
                    onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                    placeholder="e.g. French Flax Linen"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl text-[#1E1E1E] focus:outline-none focus:border-[#A68962]"
                  />
                </div>
              </div>

              <div className="p-4 bg-[#F8F6F2] border border-[#E5E0D6] rounded-xl grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                <div>
                  <label className="block text-gray-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                    MRP (₹) *
                  </label>
                  <input
                    type="number"
                    value={form.mrp}
                    onChange={(e) => setForm({ ...form, mrp: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DCD5C9] rounded-lg text-black font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={form.sellingPrice}
                    onChange={(e) => setForm({ ...form, sellingPrice: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DCD5C9] rounded-lg text-black font-semibold"
                    required
                  />
                </div>

                <div>
                  <span className="block text-gray-500 uppercase tracking-wider text-[10px] font-bold">
                    Discount %
                  </span>
                  <div className="mt-1 font-bold text-emerald-700 text-base">
                    {discountPercent}% OFF
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                    Inventory Stock *
                  </label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DCD5C9] rounded-lg text-black font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                    Sizes (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={form.sizesText}
                    onChange={(e) => setForm({ ...form, sizesText: e.target.value })}
                    placeholder="S, M, L, XL, XXL"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl text-black"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                    Colors (Name:#HEX, Name:#HEX)
                  </label>
                  <input
                    type="text"
                    value={form.colorsText}
                    onChange={(e) => setForm({ ...form, colorsText: e.target.value })}
                    placeholder="Sand Ecru:#E3DAC9, Onyx Black:#111111"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl text-black"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                  Assign Media from Library (Photos & Runway Videos)
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-44 overflow-y-auto p-3 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl">
                  {mediaLibrary.map((m) => {
                    const isSelected = form.selectedMediaIds.includes(m.id);
                    return (
                      <div
                        key={m.id}
                        onClick={() => {
                          const next = isSelected
                            ? form.selectedMediaIds.filter(id => id !== m.id)
                            : [...form.selectedMediaIds, m.id];
                          setForm({ ...form, selectedMediaIds: next });
                        }}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition ${
                          isSelected ? 'border-[#1E1E1E] ring-2 ring-black/20' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={m.thumbnailUrl || m.url} alt={m.title} className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute top-1 right-1 bg-[#1E1E1E] text-white rounded-full p-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                        <span className="absolute bottom-1 left-1 text-[8px] bg-black/80 text-white px-1 rounded uppercase">
                          {m.type}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="pub-toggle-edit"
                  checked={form.isPublished === 1}
                  onChange={(e) => setForm({ ...form, isPublished: e.target.checked ? 1 : 0 })}
                  className="w-4 h-4 accent-[#1E1E1E] rounded cursor-pointer"
                />
                <label htmlFor="pub-toggle-edit" className="text-gray-800 font-semibold cursor-pointer">
                  Publish style live on customer store
                </label>
              </div>

              <div className="pt-4 border-t border-[#E5E0D6] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#1E1E1E] hover:bg-black text-white font-bold uppercase tracking-wider rounded-xl transition cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingProduct ? 'Update Style' : 'Create Menswear Style'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
