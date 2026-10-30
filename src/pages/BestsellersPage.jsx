import React, { useState, useMemo } from 'react';
import { Flame, SlidersHorizontal } from 'lucide-react';
import products from '../data/products';
import ProductGrid from '../components/products/ProductGrid';
import ProductSort from '../components/products/ProductSort';
import ProductFilters from '../components/products/ProductFilters';
import Breadcrumb from '../components/common/Breadcrumb';
import { filterProducts } from '../utils/filterProducts';
import { sortProducts } from '../utils/sortProducts';

export const BestsellersPage = () => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [filters, setFilters] = useState({
    category: 'all',
    size: 'all',
    color: 'all',
    fabric: 'all',
    fit: 'all',
    occasion: 'all',
    filterType: 'bestseller', // Bestsellers only
    maxPrice: 15000,
    searchQuery: '',
    inStockOnly: false,
  });

  const availableColors = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      p.colors?.forEach((c) => {
        if (!map.has(c.name)) map.set(c.name, c);
      });
    });
    return Array.from(map.values());
  }, []);

  const processedProducts = useMemo(() => {
    const filtered = filterProducts(products, filters);
    return sortProducts(filtered, sortBy);
  }, [filters, sortBy]);

  const breadcrumbs = [{ label: 'Bestsellers' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 select-none">
      <Breadcrumb items={breadcrumbs} />

      {/* Header */}
      <div className="py-6 sm:py-8 border-b border-[#D8D2C8] mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-900 text-[#FAF9F6] text-[10px] font-bold tracking-[0.24em] uppercase">
          <Flame className="w-3 h-3 text-amber-300" />
          Customer Favorites
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#242321]">
          LEOVERSE Bestsellers
        </h1>
        <p className="font-serif italic text-base sm:text-lg text-[#77746E]">
          The most acclaimed, repeatedly ordered men's clothing essentials.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-[#D8D2C8] mb-8">
        <button
          type="button"
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#242321] px-3 py-2 border border-[#D8D2C8] bg-[#FAF9F6]"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
        </button>

        <span className="text-xs uppercase tracking-wider text-[#77746E] font-medium hidden sm:inline">
          Showing {processedProducts.length} bestsellers
        </span>

        <ProductSort sortBy={sortBy} onChange={setSortBy} />
      </div>

      {/* Content */}
      <div className="flex items-start">
        <ProductFilters
          filters={filters}
          onChange={setFilters}
          onReset={() =>
            setFilters({
              category: 'all',
              size: 'all',
              color: 'all',
              fabric: 'all',
              fit: 'all',
              occasion: 'all',
              filterType: 'bestseller',
              maxPrice: 15000,
              searchQuery: '',
              inStockOnly: false,
            })
          }
          availableColors={availableColors}
          isMobileDrawer={mobileFilterOpen}
          onCloseMobileDrawer={() => setMobileFilterOpen(false)}
        />

        <div className="flex-1">
          <ProductGrid products={processedProducts} columns={3} />
        </div>
      </div>
    </div>
  );
};

export default BestsellersPage;
