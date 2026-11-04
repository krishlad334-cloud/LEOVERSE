import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import products from '../../data/products';
import ProductGrid from '../products/ProductGrid';

export const DailyEssentials = () => {
  // Grab the 3 daily essential products
  const dailyProducts = products.filter((p) => p.isDailyEssential).slice(0, 3);

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-8 sm:mb-12">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#77746E] dark:text-[#C5A880] block mb-1">
            Foundation Menswear
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#242321] dark:text-white">
            The daily rotation.
          </h2>
        </div>
        <Link
          to="/shop?collection=daily-essentials"
          className="group flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] font-medium text-[#242321] dark:text-white hover:text-[#77746E] dark:hover:text-[#C5A880] transition-colors"
        >
          <span>Shop Essentials</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 3 Column Grid */}
      <ProductGrid products={dailyProducts} columns={3} />
    </section>
  );
};

export default DailyEssentials;
