import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, PackageOpen } from 'lucide-react';
import productsData from '../data/products';
import { filterProducts } from '../utils/filterProducts';
import { sortProducts } from '../utils/sortProducts';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import ProductSort from '../components/products/ProductSort';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract query parameters
  const initialCategory = searchParams.get('category') || 'all';
  const initialSort = searchParams.get('sort') || 'featured';
  const initialCollection = searchParams.get('collection');

  const [sortBy, setSortBy] = useState(initialSort);
  const [filters, setFilters] = useState({
    category: initialCategory,
    size: 'all',
    color: 'all',
    fabric: 'all',
    fit: 'all',
    occasion: 'all',
    maxPrice: 15000,
    searchQuery: '',
    inStockOnly: false,
  });

  // Sync state if URL query params change
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const s = searchParams.get('sort') || 'featured';
    setFilters((prev) => (prev.category === cat ? prev : { ...prev, category: cat }));
    setSortBy((prev) => (prev === s ? prev : s));
  }, [searchParams]);

  // Handle filter changes and update URL
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    const newParams = new URLSearchParams(searchParams);
    if (newFilters.category && newFilters.category !== 'all') {
      newParams.set('category', newFilters.category);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    const newParams = new URLSearchParams(searchParams);
    if (newSort !== 'featured') {
      newParams.set('sort', newSort);
    } else {
      newParams.delete('sort');
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    const reset = {
      category: 'all',
      size: 'all',
      color: 'all',
      fabric: 'all',
      fit: 'all',
      occasion: 'all',
      maxPrice: 15000,
      searchQuery: '',
      inStockOnly: false,
    };
    setFilters(reset);
    setSortBy('featured');
    setSearchParams({});
  };

  // Collect all distinct colors from products
  const availableColors = useMemo(() => {
    const map = new Map();
    productsData.forEach((p) => {
      p.colors?.forEach((c) => {
        if (!map.has(c.name)) {
          map.set(c.name, c);
        }
      });
    });
    return Array.from(map.values());
  }, []);

  // Filter and sort products
  const processedProducts = useMemo(() => {
    let list = productsData;
    if (initialCollection === 'daily-essentials') {
      list = list.filter((p) => p.isDailyEssential);
    }
    const filtered = filterProducts(list, filters);
    return sortProducts(filtered, sortBy);
  }, [filters, sortBy, initialCollection]);

  const breadcrumbs = [
    { label: 'Shop', to: '/shop' },
    ...(filters.category !== 'all' ? [{ label: filters.category.replace('-', ' ') }] : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      {/* Title & Top Toolbar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-8 border-b border-[#D8D2C8]">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#77746E] block mb-1">
            Wardrobe Essentials
          </span>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#242321] capitalize">
            {filters.category === 'all'
              ? (initialCollection === 'daily-essentials' ? 'The Daily Rotation' : 'All Essentials')
              : filters.category.replace('-', ' ')}
          </h1>
          <p className="text-xs text-[#77746E] mt-1">
            Showing {processedProducts.length} {processedProducts.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>

        {/* Toolbar: Mobile filter button & Sort selector */}
        <div className="flex items-center justify-between md:justify-end gap-4">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#D8D2C8] bg-transparent text-xs uppercase tracking-wider font-medium text-[#242321]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <ProductSort value={sortBy} onChange={handleSortChange} />
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="flex items-start">
        {/* Desktop Sidebar Filters */}
        <ProductFilters
          filters={filters}
          onChange={handleFiltersChange}
          onReset={handleResetFilters}
          availableColors={availableColors}
        />

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <ProductFilters
            filters={filters}
            onChange={handleFiltersChange}
            onReset={handleResetFilters}
            availableColors={availableColors}
            isMobileDrawer={true}
            onCloseMobileDrawer={() => setMobileFilterOpen(false)}
          />
        )}

        {/* Product Grid or Empty State */}
        <div className="flex-1 min-w-0">
          {processedProducts.length > 0 ? (
            <ProductGrid products={processedProducts} columns={3} />
          ) : (
            <EmptyState
              icon={PackageOpen}
              title="No garments matched your filters"
              description="Try adjusting your selected filters, clearing color or size preferences, or resetting price ranges."
              actionLabel="Clear all filters"
              onAction={handleResetFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
