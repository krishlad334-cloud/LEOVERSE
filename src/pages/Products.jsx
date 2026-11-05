import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  X,
  Sparkles
} from 'lucide-react';
import { getProductCatalog, subscribeCatalogUpdates, BRANDS, DEPARTMENTS } from '../services/productService';
import ProductCard from '../components/products/ProductCard';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import { formatPrice } from '../utils/formatPrice';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', '38', '40', '42'];
const COLORS = [
  { name: 'Black', hex: '#1C1C1E' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Navy', hex: '#1B263B' },
  { name: 'Sand', hex: '#D6CEBF' },
  { name: 'Sage', hex: '#8F9D8B' },
  { name: 'Brown', hex: '#5A3E2B' },
  { name: 'Grey', hex: '#77746E' }
];

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [catalogVersion, setCatalogVersion] = useState(0);

  useEffect(() => {
    const unsub = subscribeCatalogUpdates(() => {
      setCatalogVersion((v) => v + 1);
    });
    return () => unsub();
  }, []);

  // URL Query Parameters
  const departmentParam = searchParams.get('department') || 'All';
  const categoryParam = searchParams.get('category') || 'All';
  const subcategoryParam = searchParams.get('subcategory') || 'All';
  const brandParam = searchParams.get('brand') || 'All';
  const sortParam = searchParams.get('sort') || 'featured';
  const searchParam = searchParams.get('search') || '';
  const minPriceParam = Number(searchParams.get('minPrice')) || 0;
  const maxPriceParam = Number(searchParams.get('maxPrice')) || 25000;
  const sizeParam = searchParams.get('size') || 'All';
  const colorParam = searchParams.get('color') || 'All';
  const discountParam = Number(searchParams.get('discountMin')) || 0;
  const ratingParam = Number(searchParams.get('ratingMin')) || 0;
  const inStockParam = searchParams.get('inStock') === 'true';

  // State
  const [department, setDepartment] = useState(departmentParam);
  const [category, setCategory] = useState(categoryParam);
  const [subcategory, setSubcategory] = useState(subcategoryParam);
  const [selectedBrands, setSelectedBrands] = useState(
    brandParam !== 'All' ? brandParam.split(',') : []
  );
  const [selectedSizes, setSelectedSizes] = useState(
    sizeParam !== 'All' ? sizeParam.split(',') : []
  );
  const [selectedColors, setSelectedColors] = useState(
    colorParam !== 'All' ? colorParam.split(',') : []
  );
  const [priceRange, setPriceRange] = useState({ min: minPriceParam, max: maxPriceParam });
  const [discountMin, setDiscountMin] = useState(discountParam);
  const [ratingMin, setRatingMin] = useState(ratingParam);
  const [inStockOnly, setInStockOnly] = useState(inStockParam);
  const [sortBy, setSortBy] = useState(sortParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);

  // Sync state if URL changes externally during render
  const searchParamsString = searchParams.toString();
  const [prevParamsString, setPrevParamsString] = useState(searchParamsString);
  if (prevParamsString !== searchParamsString) {
    setPrevParamsString(searchParamsString);
    setDepartment(searchParams.get('department') || 'All');
    setCategory(searchParams.get('category') || 'All');
    setSubcategory(searchParams.get('subcategory') || 'All');
    setSelectedBrands(searchParams.get('brand') ? searchParams.get('brand').split(',') : []);
    setSelectedSizes(searchParams.get('size') ? searchParams.get('size').split(',') : []);
    setSelectedColors(searchParams.get('color') ? searchParams.get('color').split(',') : []);
    setPriceRange({
      min: Number(searchParams.get('minPrice')) || 0,
      max: Number(searchParams.get('maxPrice')) || 25000
    });
    setDiscountMin(Number(searchParams.get('discountMin')) || 0);
    setRatingMin(Number(searchParams.get('ratingMin')) || 0);
    setInStockOnly(searchParams.get('inStock') === 'true');
    setSortBy(searchParams.get('sort') || 'featured');
    setSearchQuery(searchParams.get('search') || '');
    setPage(1);
  }

  // Update URL helper
  const updateQueryParams = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => {
      if (val === undefined || val === null || val === '' || val === 'All' || (Array.isArray(val) && val.length === 0)) {
        params.delete(key);
      } else if (Array.isArray(val)) {
        params.set(key, val.join(','));
      } else {
        params.set(key, val);
      }
    });
    setSearchParams(params);
  };

  const handleBrandToggle = (brandName) => {
    const next = selectedBrands.includes(brandName)
      ? selectedBrands.filter((b) => b !== brandName)
      : [...selectedBrands, brandName];
    setSelectedBrands(next);
    updateQueryParams({ brand: next });
  };

  const handleSizeToggle = (sz) => {
    const next = selectedSizes.includes(sz)
      ? selectedSizes.filter((s) => s !== sz)
      : [...selectedSizes, sz];
    setSelectedSizes(next);
    updateQueryParams({ size: next });
  };

  const handleColorToggle = (col) => {
    const next = selectedColors.includes(col)
      ? selectedColors.filter((c) => c !== col)
      : [...selectedColors, col];
    setSelectedColors(next);
    updateQueryParams({ color: next });
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    setSortBy(val);
    updateQueryParams({ sort: val });
  };

  const handleDepartmentChange = (dept) => {
    setDepartment(dept);
    setCategory('All');
    setSubcategory('All');
    updateQueryParams({ department: dept, category: 'All', subcategory: 'All' });
  };

  const handleClearAll = () => {
    setDepartment('All');
    setCategory('All');
    setSubcategory('All');
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange({ min: 0, max: 25000 });
    setDiscountMin(0);
    setRatingMin(0);
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  // Fetch filtered catalog
  const catalogResult = useMemo(() => {
    void catalogVersion;
    return getProductCatalog({
      department: department !== 'All' ? department : undefined,
      category: category !== 'All' ? category : undefined,
      subcategory: subcategory !== 'All' ? subcategory : undefined,
      brand: selectedBrands.length > 0 ? selectedBrands : undefined,
      size: selectedSizes.length > 0 ? selectedSizes : undefined,
      color: selectedColors.length > 0 ? selectedColors : undefined,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      discountMin,
      ratingMin,
      inStockOnly,
      search: searchQuery,
      sort: sortBy,
      page,
      limit: 12
    });
  }, [
    department,
    category,
    subcategory,
    selectedBrands,
    selectedSizes,
    selectedColors,
    priceRange,
    discountMin,
    ratingMin,
    inStockOnly,
    searchQuery,
    sortBy,
    page,
    catalogVersion
  ]);

  const activeFilterCount =
    (department !== 'All' ? 1 : 0) +
    (category !== 'All' ? 1 : 0) +
    (subcategory !== 'All' ? 1 : 0) +
    selectedBrands.length +
    selectedSizes.length +
    selectedColors.length +
    (priceRange.max < 25000 || priceRange.min > 0 ? 1 : 0) +
    (discountMin > 0 ? 1 : 0) +
    (ratingMin > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const breadcrumbs = [
    { label: 'Shop All', to: '/products' },
    ...(department !== 'All' ? [{ label: department, to: `/products?department=${department}` }] : []),
    ...(category !== 'All' ? [{ label: category }] : []),
    ...(subcategory !== 'All' ? [{ label: subcategory }] : [])
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <Breadcrumb items={breadcrumbs} />

      {/* Promotional Top Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1B1B1E] via-[#2A2A30] to-[#1B1B1E] text-white rounded-2xl p-6 sm:p-8 mb-8 border border-[#383842] shadow-sm">
        <div className="max-w-xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
            <Sparkles className="w-3 h-3 text-[#C5A880]" />
            <span>AJIO LUXE MENSWEAR REFERENCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
            {department !== 'All' ? `${department}'s Atelier` : "The Curated Collection"}
            {subcategory !== 'All' && ` • ${subcategory}`}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 font-light">
            Showing <strong className="font-semibold text-white">{catalogResult.totalCount}</strong> luxury fashion garments tailored with high-grade European textiles and bespoke finishing.
          </p>
        </div>
      </div>

      {/* Control Bar: Department Quick Tabs + Mobile Filter Trigger + Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-[#EAE5DC] dark:border-[#27272A]">
        {/* Department Quick Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {['All', ...DEPARTMENTS].map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => handleDepartmentChange(dept)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                department === dept
                  ? 'bg-[#242321] text-white dark:bg-white dark:text-black shadow-xs'
                  : 'bg-[#FAF9F6] dark:bg-[#1E1E22] text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white border border-[#D8D2C8] dark:border-[#383842]'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Right Sort & Mobile Filter */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF9F6] dark:bg-[#1E1E22] border border-[#D8D2C8] dark:border-[#383842] text-xs font-bold uppercase tracking-wider text-[#242321] dark:text-white"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#A68962]" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 hidden sm:inline">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="px-3 py-2 text-xs font-semibold bg-[#FAF9F6] dark:bg-[#1E1E22] border border-[#D8D2C8] dark:border-[#383842] rounded-xl text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962] cursor-pointer"
            >
              <option value="featured">Featured / Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="discount">Highest Discount</option>
              <option value="rating">Customer Rating</option>
              <option value="bestselling">Popular & Bestsellers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Pills Bar */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pb-6">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Active:
          </span>

          {department !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] text-xs font-medium text-[#242321] dark:text-white">
              <span>Dept: {department}</span>
              <button onClick={() => handleDepartmentChange('All')} className="hover:text-red-600"><X className="w-3 h-3" /></button>
            </span>
          )}

          {selectedBrands.map((b) => (
            <span key={b} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] text-xs font-medium text-[#242321] dark:text-white">
              <span>{b}</span>
              <button onClick={() => handleBrandToggle(b)} className="hover:text-red-600"><X className="w-3 h-3" /></button>
            </span>
          ))}

          {selectedSizes.map((s) => (
            <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] text-xs font-medium text-[#242321] dark:text-white">
              <span>Size: {s}</span>
              <button onClick={() => handleSizeToggle(s)} className="hover:text-red-600"><X className="w-3 h-3" /></button>
            </span>
          ))}

          {selectedColors.map((c) => (
            <span key={c} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] text-xs font-medium text-[#242321] dark:text-white">
              <span>Color: {c}</span>
              <button onClick={() => handleColorToggle(c)} className="hover:text-red-600"><X className="w-3 h-3" /></button>
            </span>
          ))}

          {discountMin > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-medium text-rose-700 dark:text-rose-300">
              <span>{discountMin}%+ OFF</span>
              <button onClick={() => { setDiscountMin(0); updateQueryParams({ discountMin: 0 }); }} className="hover:text-red-900"><X className="w-3 h-3" /></button>
            </span>
          )}

          {inStockOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              <span>In Stock Only</span>
              <button onClick={() => { setInStockOnly(false); updateQueryParams({ inStock: false }); }} className="hover:text-emerald-900"><X className="w-3 h-3" /></button>
            </span>
          )}

          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs font-bold uppercase tracking-wider text-rose-600 hover:underline cursor-pointer pl-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 bg-white dark:bg-[#18181C] border border-[#EAE5DC] dark:border-[#27272A] rounded-2xl p-6 space-y-6 sticky top-28 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE5DC] dark:border-[#27272A]">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#A68962] dark:text-[#C5A880] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters & Refine</span>
            </h2>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="text-[11px] font-semibold text-rose-600 hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          {/* 1. Brands Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#242321] dark:text-white">
              Brand
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {BRANDS.map((brandName) => {
                const checked = selectedBrands.includes(brandName);
                return (
                  <label
                    key={brandName}
                    className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleBrandToggle(brandName)}
                        className="rounded text-[#A68962] focus:ring-[#A68962]"
                      />
                      <span>{brandName}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 2. Price Range Filter */}
          <div className="space-y-3 pt-3 border-t border-[#F0ECE1] dark:border-[#27272A]">
            <div className="flex justify-between items-center text-xs">
              <h3 className="font-bold uppercase tracking-wider text-[#242321] dark:text-white">Price</h3>
              <span className="font-mono text-gray-500">Up to {formatPrice(priceRange.max)}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={25000}
              step={500}
              value={priceRange.max}
              onChange={(e) => {
                const max = Number(e.target.value);
                setPriceRange((prev) => ({ ...prev, max }));
              }}
              onMouseUp={() => updateQueryParams({ maxPrice: priceRange.max })}
              onTouchEnd={() => updateQueryParams({ maxPrice: priceRange.max })}
              className="w-full accent-[#A68962] cursor-pointer"
            />
            <div className="flex gap-2">
              {[
                { label: '< ₹2.5k', max: 2500 },
                { label: '< ₹5k', max: 5000 },
                { label: '< ₹10k', max: 10000 },
                { label: 'All', max: 25000 }
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setPriceRange((prev) => ({ ...prev, max: p.max }));
                    updateQueryParams({ maxPrice: p.max });
                  }}
                  className={`flex-1 py-1 text-[10px] font-bold uppercase rounded-lg border transition ${
                    priceRange.max === p.max
                      ? 'bg-[#242321] text-white dark:bg-white dark:text-black border-transparent'
                      : 'border-[#D8D2C8] dark:border-[#383842] text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Sizes Filter */}
          <div className="space-y-3 pt-3 border-t border-[#F0ECE1] dark:border-[#27272A]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#242321] dark:text-white">
              Size
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {SIZES.map((sz) => {
                const active = selectedSizes.includes(sz);
                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => handleSizeToggle(sz)}
                    className={`w-9 h-8 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                      active
                        ? 'bg-[#242321] text-white dark:bg-white dark:text-black'
                        : 'bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] text-gray-700 dark:text-gray-300 hover:border-[#A68962]'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Colors Filter */}
          <div className="space-y-3 pt-3 border-t border-[#F0ECE1] dark:border-[#27272A]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#242321] dark:text-white">
              Color
            </h3>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((col) => {
                const active = selectedColors.includes(col.name);
                return (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => handleColorToggle(col.name)}
                    title={col.name}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition cursor-pointer ${
                      active
                        ? 'border-[#A68962] bg-[#FAF9F6] dark:bg-[#24242A] text-black dark:text-white font-bold ring-1 ring-[#A68962]'
                        : 'border-[#D8D2C8] dark:border-[#383842] text-gray-600 dark:text-gray-400 hover:border-gray-400'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/20"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span>{col.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Discount Filter */}
          <div className="space-y-2 pt-3 border-t border-[#F0ECE1] dark:border-[#27272A]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#242321] dark:text-white">
              Minimum Discount
            </h3>
            <div className="grid grid-cols-2 gap-1.5">
              {[10, 20, 30, 40].map((disc) => (
                <button
                  key={disc}
                  type="button"
                  onClick={() => {
                    const next = discountMin === disc ? 0 : disc;
                    setDiscountMin(next);
                    updateQueryParams({ discountMin: next });
                  }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                    discountMin === disc
                      ? 'bg-rose-600 text-white'
                      : 'bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {disc}% and above
                </button>
              ))}
            </div>
          </div>

          {/* 6. Availability */}
          <div className="pt-3 border-t border-[#F0ECE1] dark:border-[#27272A]">
            <label className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => {
                  setInStockOnly(e.target.checked);
                  updateQueryParams({ inStock: e.target.checked });
                }}
                className="rounded text-[#A68962]"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Product Cards Grid */}
        <main className="lg:col-span-9 space-y-8">
          {catalogResult.products.length === 0 ? (
            <div className="bg-white dark:bg-[#18181C] border border-[#EAE5DC] dark:border-[#27272A] rounded-2xl p-12 text-center space-y-4">
              <EmptyState
                icon={SlidersHorizontal}
                title="No Garments Match Filters"
                description="Try broadening your filters or resetting the criteria to discover other curated luxury styles."
                actionLabel="Reset All Filters"
                actionTo="/products"
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                {catalogResult.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              {catalogResult.totalPages > 1 && (
                <div className="pt-8 border-t border-[#EAE5DC] dark:border-[#27272A] flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Page <strong className="text-black dark:text-white">{catalogResult.currentPage}</strong> of {catalogResult.totalPages}
                  </span>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] disabled:opacity-40 cursor-pointer"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={page >= catalogResult.totalPages}
                      onClick={() => setPage((p) => p + 1)}
                      className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#242321] dark:bg-white text-white dark:text-black disabled:opacity-40 cursor-pointer"
                    >
                      Next Page
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Mobile Slide-Over Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white dark:bg-[#18181C] text-[#242321] dark:text-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE5DC] dark:border-[#27272A]">
              <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#A68962]" />
                <span>Filters</span>
              </h3>
              <button onClick={() => setMobileFilterOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            {/* Mobile Brands */}
            <div>
              <h4 className="text-xs font-bold uppercase mb-2">Brand</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {BRANDS.map((b) => (
                  <label key={b} className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(b)}
                      onChange={() => handleBrandToggle(b)}
                    />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mobile Sizes */}
            <div>
              <h4 className="text-xs font-bold uppercase mb-2">Size</h4>
              <div className="flex flex-wrap gap-1.5">
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => handleSizeToggle(sz)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold ${
                      selectedSizes.includes(sz) ? 'bg-[#242321] text-white' : 'border border-gray-300'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAE5DC] dark:border-[#27272A] flex gap-3">
              <button
                type="button"
                onClick={() => { handleClearAll(); setMobileFilterOpen(false); }}
                className="flex-1 py-2.5 bg-gray-200 dark:bg-gray-800 text-xs font-bold uppercase rounded-xl"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#242321] dark:bg-white text-white dark:text-black text-xs font-bold uppercase rounded-xl"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
