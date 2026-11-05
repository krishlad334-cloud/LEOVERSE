import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { History, ArrowRight } from 'lucide-react';
import { getRecentlyViewed, getProductCatalog } from '../../services/productService';
import ProductCard from '../products/ProductCard';

export const RecentlyViewedSection = () => {
  const [items, setItems] = useState(() => {
    const recent = getRecentlyViewed();
    if (recent.length > 0) return recent;
    const fallback = getProductCatalog({ filterType: 'featured', limit: 4 });
    return fallback.products;
  });

  useEffect(() => {
    const recent = getRecentlyViewed();
    if (recent.length > 0) {
      setItems(recent);
    }
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 select-none border-t border-[#EAE5DC] dark:border-[#27272A]">
      <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#EAE5DC] dark:border-[#27272A]">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-3.5 h-3.5 text-[#A68962]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A68962] dark:text-[#C5A880]">
              Personalized Discovery
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#242321] dark:text-white mt-1">
            Recently Viewed & Recommended
          </h2>
        </div>
        <Link
          to="/products"
          className="text-xs font-bold uppercase tracking-wider text-[#A68962] hover:underline flex items-center gap-1"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewedSection;
