import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import products from '../../data/products';
import ProductGrid from '../products/ProductGrid';

export const NewArrivals = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filterTabs = [
    { label: 'All New Drops', value: 'all' },
    { label: 'Summer Wear', value: 'summer-wear' },
    { label: 'Winter Wear', value: 'winter-wear' },
    { label: 'Formal Wear', value: 'formal-wear' },
    { label: 'Wedding Wear', value: 'wedding-wear' },
    { label: 'Streetwear', value: 'streetwear' },
    { label: 'Ethnic Wear', value: 'ethnic-wear' },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true;
    return p.categorySlug === activeTab;
  }).slice(0, 4);

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#77746E] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Latest Men's Clothing Releases</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#242321]">
            New, not just for now.
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#77746E] mt-1">
            Freshly drafted silhouettes engineered for longevity.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`text-xs uppercase tracking-wider px-3.5 py-1.5 border transition-all shrink-0 cursor-pointer font-medium ${
                activeTab === tab.value
                  ? 'bg-[#252522] text-[#FAF9F6] border-[#252522] shadow-xs'
                  : 'bg-transparent text-[#77746E] border-[#D8D2C8] hover:text-[#242321] hover:border-[#242321]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Link
          to="/new-arrivals"
          className="hidden md:flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] font-semibold text-[#242321] hover:text-[#77746E] transition-colors shrink-0"
        >
          <span>View All ({products.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid */}
      <ProductGrid products={filteredProducts} columns={4} />

      {/* Mobile view all link */}
      <div className="mt-8 text-center md:hidden">
        <Link
          to="/new-arrivals"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] font-bold text-[#242321] underline underline-offset-4"
        >
          <span>View All New Arrivals ({products.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
};

export default NewArrivals;
