import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, PackageOpen, RefreshCw, X, Check, ArrowUpDown } from 'lucide-react';
import { getProducts, getCategories } from '../services/api';
import ProductGrid from '../components/products/ProductGrid';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Read URL query params
  const departmentParam = searchParams.get('department') || 'All';
  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || 'featured';

  const [department, setDepartment] = useState(departmentParam);
  const [category, setCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [sortBy, setSortBy] = useState(sortParam);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Sync state if URL search params change during render
  const searchParamsString = searchParams.toString();
  const [prevParamsString, setPrevParamsString] = useState(searchParamsString);
  if (prevParamsString !== searchParamsString) {
    setPrevParamsString(searchParamsString);
    setDepartment(searchParams.get('department') || 'All');
    setCategory(searchParams.get('category') || 'All');
    setSearchQuery(searchParams.get('search') || '');
    setSortBy(searchParams.get('sort') || 'featured');
  }

  // Load categories
  useEffect(() => {
    let active = true;
    getCategories()
      .then((data) => {
        if (active) setCategories(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Fetch products from SQLite API
  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setLoading(true);
    });

    getProducts({
      department: department !== 'All' ? department : undefined,
      category: category !== 'All' ? category : undefined,
      search: searchQuery || undefined,
      maxPrice: maxPrice < 15000 ? maxPrice : undefined,
      inStock: inStockOnly || undefined,
      sort: sortBy
    })
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((err) => {
        console.error('Failed to load products', err);
        if (!cancelled) setProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [department, category, searchQuery, sortBy, maxPrice, inStockOnly]);

  const handleDepartmentChange = (newDept) => {
    setDepartment(newDept);
    setCategory('All');
    const p = new URLSearchParams(searchParams);
    if (newDept !== 'All') p.set('department', newDept);
    else p.delete('department');
    p.delete('category');
    setSearchParams(p);
  };

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    const p = new URLSearchParams(searchParams);
    if (newCat !== 'All') p.set('category', newCat);
    else p.delete('category');
    setSearchParams(p);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    const p = new URLSearchParams(searchParams);
    p.set('sort', newSort);
    setSearchParams(p);
  };

  const clearAllFilters = () => {
    setDepartment('All');
    setCategory('All');
    setSearchQuery('');
    setMaxPrice(15000);
    setInStockOnly(false);
    setSearchParams({});
  };

  // Filter categories by selected department
  const filteredCategories = department === 'All'
    ? categories
    : categories.filter((c) => c.department?.toLowerCase() === department.toLowerCase());

  const breadcrumbs = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    ...(department !== 'All' ? [{ label: department }] : [])
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <Breadcrumb items={breadcrumbs} />

      {/* Page Title & Department Switcher Tabs */}
      <div className="mt-4 mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E5E0D6] dark:border-[#27272A] pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1E1E] dark:text-white">
              {department !== 'All' ? `${department}'s Fashion Collection` : 'All Apparel & Luxury Accessories'}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">
              Showing {products.length} garments and accessories
            </p>
          </div>

          {/* Sort Dropdown & Mobile Filter Toggle */}
          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center space-x-1.5 px-3 py-2 bg-white dark:bg-[#18181C] border border-[#DCD5C9] dark:border-[#2E2E36] text-xs font-bold text-[#1E1E1E] dark:text-white rounded-lg shadow-xs cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#A68962] dark:text-[#C5A880]" />
              <span>Filters</span>
            </button>

            <span className="text-gray-500 dark:text-gray-400 font-medium hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-white dark:bg-[#18181C] border border-[#DCD5C9] dark:border-[#2E2E36] text-[#1E1E1E] dark:text-white text-xs font-semibold py-2 px-3 rounded-lg focus:outline-none focus:border-[#A68962] cursor-pointer"
            >
              <option value="featured">Featured / Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest Arrivals</option>
              <option value="discount">Highest Discount %</option>
            </select>
          </div>
        </div>

        {/* Menswear Department Switcher Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {[
            { id: 'All', label: 'All Menswear' },
            { id: "Men's Apparel", label: 'Shirts & Polos' },
            { id: "Men's Tailoring", label: 'Suits & Blazers' },
            { id: "Men's Casuals", label: 'Streetwear' },
            { id: "Men's Ethnic", label: 'Ethnic Wear' },
            { id: "Men's Accessories", label: 'Accessories' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleDepartmentChange(item.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer shrink-0 ${
                department === item.id
                  ? 'bg-[#1E1E1E] dark:bg-[#C5A880] text-white dark:text-black shadow-sm'
                  : 'bg-[#F8F6F2] dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#2A2A34] text-gray-700 dark:text-gray-300 hover:bg-[#EAE5DC] dark:hover:bg-[#202026]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid: Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 bg-[#F8F6F2] dark:bg-[#18181C] p-5 rounded-2xl border border-[#E5E0D6] dark:border-[#27272A] h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D6] dark:border-[#27272A]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] dark:text-white">Filters</span>
            <button
              onClick={clearAllFilters}
              className="text-[11px] text-[#A68962] dark:text-[#C5A880] hover:underline font-semibold cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Categories Filter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] dark:text-white mb-3">
              Category
            </h4>
            <div className="space-y-1.5 max-h-52 overflow-y-auto text-xs">
              <button
                onClick={() => handleCategoryChange('All')}
                className={`w-full text-left px-2 py-1.5 rounded font-medium transition cursor-pointer ${
                  category === 'All'
                    ? 'bg-[#1E1E1E] dark:bg-[#C5A880] text-white dark:text-black font-bold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-[#EAE5DC] dark:hover:bg-[#202026]'
                }`}
              >
                All Categories
              </button>
              {filteredCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`w-full text-left px-2 py-1.5 rounded font-medium transition cursor-pointer ${
                    category === cat.name
                      ? 'bg-[#1E1E1E] dark:bg-[#C5A880] text-white dark:text-black font-bold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-[#EAE5DC] dark:hover:bg-[#202026]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-4 border-t border-[#E5E0D6] dark:border-[#27272A]">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold uppercase tracking-wider text-[#1E1E1E] dark:text-white">Max Price</span>
              <span className="font-bold text-[#A68962] dark:text-[#C5A880]">₹{maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#1E1E1E] dark:accent-[#C5A880] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mt-1 font-mono">
              <span>₹1,000</span>
              <span>₹15,000</span>
            </div>
          </div>

          {/* Stock Availability */}
          <div className="pt-4 border-t border-[#E5E0D6] dark:border-[#27272A]">
            <label className="flex items-center space-x-2 text-xs font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-[#1E1E1E] dark:accent-[#C5A880] rounded cursor-pointer"
              />
              <span>In Stock Items Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
              <RefreshCw className="w-8 h-8 text-[#A68962] animate-spin" />
              <p className="text-xs text-gray-500 uppercase tracking-widest">Loading garments from database...</p>
            </div>
          ) : products.length === 0 ? (
            <EmptyState
              icon={PackageOpen}
              title="No Products Match Your Criteria"
              description="Try adjusting your filters or price ranges to view more items."
              actionLabel="Reset All Filters"
              onAction={clearAllFilters}
            />
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>

      {/* Mobile Slide-Out Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden flex justify-end">
          <div className="w-4/5 max-w-sm bg-[#FAF9F6] dark:bg-[#18181C] text-[#242321] dark:text-[#F3EFE6] h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D6] dark:border-[#27272A]">
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#A68962] dark:text-[#C5A880]" />
                  <span className="text-sm font-bold uppercase tracking-wider text-[#1E1E1E] dark:text-white">Filters</span>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-gray-500 hover:text-black dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] dark:text-white mb-3">
                  Categories
                </h4>
                <div className="space-y-1.5 max-h-52 overflow-y-auto text-xs pr-1">
                  <button
                    onClick={() => handleCategoryChange('All')}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition cursor-pointer ${
                      category === 'All'
                        ? 'bg-[#1E1E1E] dark:bg-[#C5A880] text-white dark:text-black font-bold'
                        : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-[#202026] border border-[#E5E0D6] dark:border-[#2A2A34]'
                    }`}
                  >
                    All Categories
                  </button>
                  {filteredCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.name)}
                      className={`w-full text-left px-3 py-2 rounded-xl font-medium transition cursor-pointer ${
                        category === cat.name
                          ? 'bg-[#1E1E1E] dark:bg-[#C5A880] text-white dark:text-black font-bold'
                          : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-[#202026] border border-[#E5E0D6] dark:border-[#2A2A34]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Slider */}
              <div className="pt-4 border-t border-[#E5E0D6] dark:border-[#27272A]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold uppercase tracking-wider text-[#1E1E1E] dark:text-white">Max Price</span>
                  <span className="font-bold text-[#A68962] dark:text-[#C5A880]">₹{maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#1E1E1E] dark:accent-[#C5A880] cursor-pointer"
                />
              </div>

              {/* In Stock */}
              <div className="pt-4 border-t border-[#E5E0D6] dark:border-[#27272A]">
                <label className="flex items-center space-x-2 text-xs font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 accent-[#1E1E1E] dark:accent-[#C5A880] rounded"
                  />
                  <span>In Stock Items Only</span>
                </label>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#E5E0D6] dark:border-[#27272A] flex space-x-3">
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex-1 py-3 bg-white dark:bg-[#202026] border border-[#E5E0D6] dark:border-[#2A2A34] text-gray-700 dark:text-gray-300 text-xs font-bold rounded-xl cursor-pointer"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#1E1E1E] dark:bg-[#C5A880] text-white dark:text-black text-xs font-bold rounded-xl shadow-md cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
