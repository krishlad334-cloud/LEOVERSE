import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export const ProductSort = ({ value, sortBy, onChange }) => {
  const activeValue = value || sortBy || 'featured';

  return (
    <div className="flex items-center space-x-2 text-xs tracking-wider">
      <label htmlFor="sort-select" className="text-[#77746E] uppercase hidden sm:inline">
        Sort By:
      </label>
      <div className="relative">
        <select
          id="sort-select"
          value={activeValue}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-[#F7F5F0] border border-[#D8D2C8] py-2 pl-3 pr-8 text-xs font-medium uppercase tracking-wider text-[#242321] focus:outline-none focus:border-[#242321] cursor-pointer"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest Arrivals</option>
          <option value="popularity">Popularity</option>
          <option value="bestselling">Bestselling</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#77746E]">
          <ArrowUpDown className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};

export default ProductSort;
