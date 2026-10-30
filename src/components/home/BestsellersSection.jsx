import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import products from '../../data/products';
import ProductGrid from '../products/ProductGrid';

export const BestsellersSection = () => {
  // Grab top bestseller products across categories
  const bestsellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none border-t border-[#D8D2C8]/70">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-amber-800 mb-1">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Most Coveted Garments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#242321]">
            LEOVERSE Bestsellers.
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#77746E] mt-1">
            The proven wardrobe staples chosen by thousands.
          </p>
        </div>

        <Link
          to="/bestsellers"
          className="group flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-[#242321] hover:text-[#77746E] transition-colors"
        >
          <span>View All Bestsellers</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <ProductGrid products={bestsellers} columns={4} />
    </section>
  );
};

export default BestsellersSection;
