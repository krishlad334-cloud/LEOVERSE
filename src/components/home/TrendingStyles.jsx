import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import products from '../../data/products';
import ProductGrid from '../products/ProductGrid';

export const TrendingStyles = () => {
  // Streetwear & modern trending items
  const trendingProducts = products
    .filter((p) => p.categorySlug === 'streetwear' || p.tags.includes('streetwear'))
    .slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-[#252522] dark:bg-[#151518] border-y border-transparent dark:border-[#27272A] text-[#FAF9F6] select-none transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 border-b border-[#383733] dark:border-[#27272A] pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FAF9F6]/15 dark:bg-[#202026] text-[#DCD5CA] dark:text-[#C5A880] text-[10px] font-bold tracking-[0.2em] uppercase mb-2 rounded">
              <Sparkles className="w-3 h-3 text-[#DCD5CA] dark:text-[#C5A880]" />
              Modern Streetwear & Kinetic Drape
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FAF9F6] dark:text-white">
              Trending Styles.
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-[#DCD5CA]/80 dark:text-[#D1C9BE] mt-1">
              Heavyweight 280–480 GSM combed cottons, baggy skate denim, and boxy drop-shoulders.
            </p>
          </div>

          <Link
            to="/shop?category=streetwear"
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-bold text-[#FAF9F6] dark:text-white hover:text-[#DCD5CA] dark:hover:text-[#C5A880] transition-colors"
          >
            <span>Shop All Streetwear</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Grid */}
        <ProductGrid products={trendingProducts} columns={4} />
      </div>
    </section>
  );
};

export default TrendingStyles;
