import React, { useState, useMemo } from 'react';
import { Tag, SlidersHorizontal, Clock } from 'lucide-react';
import products from '../data/products';
import ProductGrid from '../components/products/ProductGrid';
import ProductSort from '../components/products/ProductSort';
import ProductFilters from '../components/products/ProductFilters';
import Breadcrumb from '../components/common/Breadcrumb';
import { filterProducts } from '../utils/filterProducts';
import { sortProducts } from '../utils/sortProducts';

export const SalePage = () => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    category: 'all',
    size: 'all',
    color: 'all',
    fabric: 'all',
    fit: 'all',
    occasion: 'all',
    filterType: 'sale', // Discounted items only
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

  const breadcrumbs = [{ label: 'Sale & Offers' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 select-none">
      <Breadcrumb items={breadcrumbs} />

      {/* Header Banner */}
      <div className="bg-[#252522] dark:bg-[#18181C] text-[#FAF9F6] p-6 sm:p-10 border border-[#D8D2C8] dark:border-[#27272A] rounded-2xl mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FAF9F6]/15 dark:bg-[#202026] text-[#DCD5CA] dark:text-[#C5A880] text-[10px] font-bold tracking-[0.24em] uppercase rounded">
          <Clock className="w-3 h-3 text-[#DCD5CA] dark:text-[#C5A880]" />
          Special Offers & Seasonal Markdowns
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FAF9F6] dark:text-white">
          Sale & Seasonal Offers
        </h1>
        <p className="font-serif italic text-base sm:text-lg text-[#DCD5CA]/90 dark:text-[#D1C9BE]">
          Up to 30% off selected tailoring, linen summer shirts, and heavyweight fleece.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-[#D8D2C8] dark:border-[#27272A] mb-8">
        <button
          type="button"
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#242321] dark:text-white px-3 py-2 border border-[#D8D2C8] dark:border-[#27272A] bg-[#FAF9F6] dark:bg-[#18181C] rounded-lg"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
        </button>

        <span className="text-xs uppercase tracking-wider text-[#77746E] dark:text-gray-400 font-medium hidden sm:inline">
          Showing {processedProducts.length} discounted pieces
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
              filterType: 'sale',
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

export default SalePage;
