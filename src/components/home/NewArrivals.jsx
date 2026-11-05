import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getProducts } from '../../services/api';
import { subscribeCatalogUpdates } from '../../services/productService';
import ProductGrid from '../products/ProductGrid';

const FILTER_TABS = [
  { id: 'All', label: 'All Menswear' },
  { id: "Men's Apparel", label: 'Shirts & Polos' },
  { id: "Men's Tailoring", label: 'Suits & Blazers' },
  { id: "Men's Ethnic", label: 'Ethnic Wear' },
  { id: "Men's Accessories", label: 'Accessories' }
];

export const NewArrivals = () => {
  const [activeDept, setActiveDept] = useState('All');
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchNew = () => {
      getProducts({ sort: 'newest' })
        .then((data) => {
          setAllProducts(data);
        })
        .catch(() => {});
    };

    fetchNew();
    const unsub = subscribeCatalogUpdates(fetchNew);
    return () => unsub();
  }, []);

  const displayedProducts = allProducts.filter((p) => {
    if (activeDept === 'All') return true;
    return p.department?.toLowerCase() === activeDept.toLowerCase() ||
           p.category?.toLowerCase().includes(activeDept.toLowerCase());
  }).slice(0, 4);

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#A68962] dark:text-[#C5A880] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seasonal Drops & Releases</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#1E1E1E] dark:text-white">
            New Arrivals.
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
            Freshly drafted menswear silhouettes across tailoring, casual linens, and heritage ethnic wear.
          </p>
        </div>

        {/* Department Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveDept(tab.id)}
              className={`text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-lg border transition-all shrink-0 cursor-pointer font-bold ${
                activeDept === tab.id
                  ? 'bg-[#1E1E1E] dark:bg-[#C5A880] text-white dark:text-black border-[#1E1E1E] dark:border-[#C5A880] shadow-sm'
                  : 'bg-white dark:bg-[#18181C] text-gray-600 dark:text-gray-300 border-[#E5E0D6] dark:border-[#27272A] hover:text-[#1E1E1E] dark:hover:text-white hover:border-[#1E1E1E] dark:hover:border-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Link
          to="/new-arrivals"
          className="group hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#1E1E1E] dark:text-gray-200 hover:text-[#A68962] dark:hover:text-[#C5A880] transition-colors"
        >
          <span>View All Drops</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <ProductGrid products={displayedProducts} columns={4} />
    </section>
  );
};

export default NewArrivals;
