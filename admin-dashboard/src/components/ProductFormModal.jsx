import { useState, useEffect } from 'react';
import { uploadImageToStorage } from '../services/firebase';
import {
  X,
  Upload,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react';

const PRESET_BRANDS = [
  'Atelier Leo',
  'Royale Heritage',
  'Riviera Studio',
  'Urban Minimal',
  'Streetweavers',
  'Bespoke Sartorial',
  'AeroSport',
];

const PRESET_DEPARTMENTS = ['Men', 'Women', 'Kids', 'Accessories'];

const PRESET_CATEGORIES = [
  'Casual Wear',
  'Formal Wear',
  'Occasion Wear',
  'Streetwear',
  'Summer Wear',
  'Winter Wear',
  'Accessories',
];

const PRESET_SUBCATEGORIES = [
  'Shirts',
  'T-Shirts',
  'Jeans',
  'Trousers',
  'Suits & Blazers',
  'Jackets & Coats',
  'Sneakers',
  'Formal Shoes',
  'Watches & Accessories',
  'Dresses',
  'Kurtas',
];

const PRESET_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];

const DEFAULT_COLOR_SWATCHES = [
  { name: 'Prussian Navy', hex: '#2C4152' },
  { name: 'Warm Gold', hex: '#D5A249' },
  { name: 'Crisp White', hex: '#FFFFFF' },
  { name: 'Midnight Black', hex: '#1B1B1E' },
  { name: 'Cognac Leather', hex: '#9E5B32' },
  { name: 'Stone Grey', hex: '#A3A3A3' },
  { name: 'Olive Green', hex: '#556B2F' },
];

const LUXURY_PHOTO_SUGGESTIONS = [
  { label: 'Navy Casual Shirt', url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80' },
  { label: 'Tailored Blazer', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80' },
  { label: 'White Sneakers', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80' },
  { label: 'Chronograph Watch', url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80' },
  { label: 'Evening Dress', url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80' },
  { label: 'Japanese Denim', url: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80' },
];

export default function ProductFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Atelier Leo',
    department: 'Men',
    category: 'Casual Wear',
    subcategory: 'Shirts',
    price: 3490,
    salePrice: 2490,
    discountPercent: 29,
    stock: 20,
    isPublished: true,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 12,
    images: [],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Prussian Navy', hex: '#2C4152' },
      { name: 'Crisp White', hex: '#FFFFFF' },
    ],
    description: '',
    fabric: '100% Long-Staple Cotton',
    fit: 'Relaxed Tailored',
    care: 'Machine wash cold with like colors.',
  });

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#2C4152');
  const [customSizeInput, setCustomSizeInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        images: initialData.images || [],
        sizes: initialData.sizes || ['M', 'L'],
        colors: initialData.colors || [{ name: 'Prussian Navy', hex: '#2C4152' }],
        price: Number(initialData.price || initialData.mrp || 2990),
        salePrice: Number(initialData.salePrice || initialData.sellingPrice || initialData.price || 2490),
        discountPercent: Number(initialData.discountPercent || initialData.discount || 0),
        stock: Number(initialData.stock !== undefined ? initialData.stock : 15),
        isPublished: initialData.isPublished !== false,
      });
    } else {
      setFormData({
        name: '',
        brand: 'Atelier Leo',
        department: 'Men',
        category: 'Casual Wear',
        subcategory: 'Shirts',
        price: 3490,
        salePrice: 2490,
        discountPercent: 29,
        stock: 20,
        isPublished: true,
        isFeatured: false,
        isNew: true,
        isBestSeller: false,
        rating: 4.8,
        reviewCount: 12,
        images: [
          'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
        ],
        sizes: ['M', 'L', 'XL'],
        colors: [
          { name: 'Prussian Navy', hex: '#2C4152' },
          { name: 'Crisp White', hex: '#FFFFFF' },
        ],
        description: 'Premium tailored fashion staple engineered with finest materials and meticulous finishing.',
        fabric: '100% Long-Staple Cotton',
        fit: 'Contemporary Regular',
        care: 'Machine wash cold with like colors.',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Auto-calculate discount when price or salePrice changes
  const handlePriceChange = (field, val) => {
    const num = Math.max(0, Number(val) || 0);
    const updated = { ...formData, [field]: num };
    if (field === 'price' && num > 0 && updated.salePrice) {
      updated.discountPercent = Math.max(0, Math.round(((num - updated.salePrice) / num) * 100));
    } else if (field === 'salePrice' && updated.price > 0) {
      updated.discountPercent = Math.max(0, Math.round(((updated.price - num) / updated.price) * 100));
    }
    setFormData(updated);
  };

  // Image upload handler via Firebase Storage
  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingImage(true);
    setErrorMsg('');
    try {
      const uploadedUrls = [];
      for (const file of Array.from(files)) {
        const url = await uploadImageToStorage(file, 'products');
        if (url) uploadedUrls.push(url);
      }
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
    } catch (err) {
      setErrorMsg('Image upload failed: ' + err.message);
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  // Direct URL addition
  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, imageUrlInput.trim()],
    }));
    setImageUrlInput('');
  };

  // Quick suggestion click
  const handleAddSuggestion = (url) => {
    if (formData.images.includes(url)) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSetCoverImage = (index) => {
    setFormData((prev) => {
      const imgs = [...prev.images];
      const [selected] = imgs.splice(index, 1);
      return { ...prev, images: [selected, ...imgs] };
    });
  };

  // Size toggles
  const handleToggleSize = (size) => {
    setFormData((prev) => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
      };
    });
  };

  const handleAddCustomSize = () => {
    const s = customSizeInput.trim().toUpperCase();
    if (!s || formData.sizes.includes(s)) return;
    setFormData((prev) => ({ ...prev, sizes: [...prev.sizes, s] }));
    setCustomSizeInput('');
  };

  // Color management
  const handleAddPresetColor = (swatch) => {
    if (formData.colors.some((c) => c.name.toLowerCase() === swatch.name.toLowerCase())) return;
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, swatch],
    }));
  };

  const handleAddCustomColor = () => {
    if (!newColorName.trim()) return;
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: newColorName.trim(), hex: newColorHex }],
    }));
    setNewColorName('');
  };

  const handleRemoveColor = (index) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Product title is required.');
      return;
    }
    if (formData.images.length === 0) {
      setErrorMsg('Please upload or select at least one product image.');
      return;
    }
    if (formData.sizes.length === 0) {
      setErrorMsg('Please select at least one size.');
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      mrp: Number(formData.price),
      salePrice: Number(formData.salePrice),
      sellingPrice: Number(formData.salePrice),
      discountPercent: Number(formData.discountPercent),
      discount: Number(formData.discountPercent),
      stock: Number(formData.stock),
      inStock: Number(formData.stock) > 0,
      updatedAt: new Date().toISOString(),
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[96vh] sm:max-h-[92vh] flex flex-col border border-gray-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#2C4152] text-white flex items-center justify-between border-b border-[#2C4152]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D5A249]" />
            <h2 className="text-base sm:text-lg font-serif font-bold tracking-wide">
              {isEditing ? 'Edit Fashion Product' : 'Add New Fashion Product'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section: Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-[#2C4152] uppercase tracking-wider">
                Product Title *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Pure Linen Italian Cutaway Collar Shirt"
                className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D5A249] focus:border-transparent outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C4152] uppercase tracking-wider">
                Brand
              </label>
              <select
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D5A249] outline-none bg-white cursor-pointer"
              >
                {PRESET_BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section: Department, Category, Subcategory */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C4152] uppercase tracking-wider">
                Department
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D5A249] outline-none bg-white cursor-pointer"
              >
                {PRESET_DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C4152] uppercase tracking-wider">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D5A249] outline-none bg-white cursor-pointer"
              >
                {PRESET_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C4152] uppercase tracking-wider">
                Subcategory
              </label>
              <select
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D5A249] outline-none bg-white cursor-pointer"
              >
                {PRESET_SUBCATEGORIES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section: Pricing & Inventory */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5F5F5] border border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C4152]">
                Original MRP (₹/$) *
              </label>
              <input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => handlePriceChange('price', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-[#D5A249] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C4152]">
                Selling Price (₹/$) *
              </label>
              <input
                type="number"
                min="0"
                value={formData.salePrice}
                onChange={(e) => handlePriceChange('salePrice', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-[#D5A249] outline-none font-bold text-[#2C4152]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C4152]">
                Discount %
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discountPercent}
                  onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-[#D5A249] outline-none"
                />
                <span className="text-xs font-bold px-2 py-1 bg-[#D5A249]/20 text-[#2C4152] rounded">
                  {formData.discountPercent}%
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C4152]">
                Stock Quantity *
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-[#D5A249] outline-none"
              />
            </div>
          </div>

          {/* Section: Multiple Images Management */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <label className="text-xs font-semibold text-[#2C4152] uppercase tracking-wider block">
                  Product Images (Multiple Supported) *
                </label>
                <span className="text-[11px] text-gray-500">
                  First image acts as primary catalog cover. Drag or click "Set Cover" to reorder.
                </span>
              </div>
              <label className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-[#2C4152] text-white hover:bg-[#1E2D3A] cursor-pointer transition-colors shadow-xs w-full sm:w-auto">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingImage ? 'Uploading to Storage...' : 'Upload Photos'}</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </label>
            </div>

            {/* URL input field */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="Or paste an image URL (e.g. Unsplash URL)..."
                className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D5A249] outline-none"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="px-3 py-1.5 text-xs font-semibold rounded-md bg-[#F5F5F5] border border-gray-300 text-[#2C4152] hover:bg-gray-200 cursor-pointer"
              >
                Add URL
              </button>
            </div>

            {/* Quick Suggestions Chips */}
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-[10px] text-gray-400 uppercase font-semibold shrink-0">
                Preset Suggestions:
              </span>
              {LUXURY_PHOTO_SUGGESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddSuggestion(item.url)}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-[#2C4152]/5 text-[#2C4152] hover:bg-[#D5A249]/20 hover:text-[#2C4152] border border-[#2C4152]/10 shrink-0 transition-colors"
                >
                  + {item.label}
                </button>
              ))}
            </div>

            {/* Images Preview Grid */}
            {formData.images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
                {formData.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`group relative aspect-3/4 rounded-lg overflow-hidden border-2 ${
                      idx === 0 ? 'border-[#D5A249] ring-2 ring-[#D5A249]/30' : 'border-gray-200'
                    } bg-gray-50`}
                  >
                    <img
                      src={img}
                      alt={`Product ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {idx === 0 && (
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-[#D5A249] text-[#2C4152] text-[9px] font-bold uppercase rounded shadow-xs">
                        Cover
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1">
                      {idx !== 0 && (
                        <button
                          type="button"
                          onClick={() => handleSetCoverImage(idx)}
                          className="px-2 py-0.5 text-[9px] font-semibold bg-white text-[#2C4152] rounded hover:bg-[#D5A249]"
                        >
                          Set Cover
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="p-1 rounded-full bg-red-600 text-white hover:bg-red-700"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-lg border-2 border-dashed border-gray-300 text-center text-gray-400">
                <ImageIcon className="w-8 h-8 mx-auto mb-1 stroke-1" />
                <p className="text-xs">No images uploaded yet. Upload images or select presets above.</p>
              </div>
            )}
          </div>

          {/* Section: Sizes Available */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#2C4152] uppercase tracking-wider block">
              Available Sizes *
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_SIZES.map((size) => {
                const isSelected = formData.sizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleToggleSize(size)}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-[#2C4152] text-white shadow-xs'
                        : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            {/* Custom size addition */}
            <div className="flex items-center gap-2 max-w-xs mt-2">
              <input
                type="text"
                placeholder="Custom Size (e.g. 46, Free Size)"
                value={customSizeInput}
                onChange={(e) => setCustomSizeInput(e.target.value)}
                className="px-2.5 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-[#D5A249] outline-none"
              />
              <button
                type="button"
                onClick={handleAddCustomSize}
                className="px-2.5 py-1 text-xs font-semibold bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Add Size
              </button>
            </div>
          </div>

          {/* Section: Available Colors */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-[#2C4152] uppercase tracking-wider block">
              Colors & Shades
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-gray-300 shadow-2xs text-xs"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="font-medium text-gray-700">{color.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(idx)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Preset Colors Picker */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-gray-400 uppercase font-semibold">
                Quick Presets:
              </span>
              {DEFAULT_COLOR_SWATCHES.map((swatch, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddPresetColor(swatch)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/20"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span>{swatch.name}</span>
                </button>
              ))}
            </div>

            {/* Custom Color Creator */}
            <div className="flex items-center gap-2 max-w-sm pt-1">
              <input
                type="color"
                value={newColorHex}
                onChange={(e) => setNewColorHex(e.target.value)}
                className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                title="Select Hex Color"
              />
              <input
                type="text"
                placeholder="Color Name (e.g. Royal Azure)"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                className="flex-1 px-2.5 py-1 text-xs border border-gray-300 rounded outline-none"
              />
              <button
                type="button"
                onClick={handleAddCustomColor}
                className="px-2.5 py-1 text-xs font-semibold bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Add
              </button>
            </div>
          </div>

          {/* Section: Description & Specs */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#2C4152] uppercase tracking-wider block">
              Editorial Description
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of craftsmanship, texture, drape, and styling suggestions..."
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D5A249] outline-none"
            />
          </div>

          {/* Section: Publish & Promotional Switches */}
          <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-sm font-bold text-[#2C4152] block">
                  Publish to Customer Storefront
                </span>
                <span className="text-[11px] text-gray-500">
                  When enabled, this product immediately appears live on the customer shopping platform.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2C4152]"></div>
              </label>
            </div>

            <div className="flex flex-wrap gap-6 pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded text-[#2C4152] focus:ring-[#D5A249]"
                />
                <span>Featured Collection</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="rounded text-[#2C4152] focus:ring-[#D5A249]"
                />
                <span>New Arrival Badge</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.isBestSeller}
                  onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                  className="rounded text-[#2C4152] focus:ring-[#D5A249]"
                />
                <span>Best Seller Badge</span>
              </label>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-gray-200 flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 sm:py-2 text-xs font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 active:scale-95 transition-all cursor-pointer w-full sm:w-auto text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 sm:py-2 text-xs font-bold text-[#1D2A35] bg-[#D5A249] hover:bg-[#E5B55E] active:scale-98 rounded-lg transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
            >
              <Check className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes & Sync Store' : 'Publish Product to Store'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
