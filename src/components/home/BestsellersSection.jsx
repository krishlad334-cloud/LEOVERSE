import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { getProducts } from '../../services/api';
import ProductGrid from '../products/ProductGrid';

export const BestsellersSection = () => {
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    getProducts({ sort: 'rating' })
      .then((data) => {
        setBestsellers(data.slice(0, 4));
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none border-t border-[#E5E0D6] dark:border-[#27272A]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#A68962] dark:text-[#C5A880] mb-1">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Most Coveted Garments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#1E1E1E] dark:text-white">
            LEOVERSE Bestsellers.
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
            Top-rated customer favourites spanning fine tailoring, French linens, and luxury menswear accessories.
          </p>
        </div>

        <Link
          to="/bestsellers"
          className="group flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-bold text-[#1E1E1E] dark:text-gray-200 hover:text-[#A68962] dark:hover:text-[#C5A880] transition-colors"
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
