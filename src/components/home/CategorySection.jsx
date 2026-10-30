import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import categories from '../../data/categories';

export const CategorySection = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedCategories = showAll ? categories : categories.slice(0, 8);

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#77746E] block mb-1">
            Shop By Clothing Category
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#242321]">
            Men's Wardrobe Curations.
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#77746E] mt-1">
            From relaxed everyday essentials to wedding couture.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-xs uppercase tracking-[0.14em] font-semibold text-[#242321] hover:text-[#77746E] border-b border-[#242321] pb-0.5 transition-colors cursor-pointer"
          >
            {showAll ? 'Show Top Curations' : `View All (${categories.length}) Categories`}
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayedCategories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.slug}`}
            className="group flex flex-col select-none bg-[#FAF9F6] border border-[#D8D2C8]/70 hover:border-[#242321] transition-all p-2 sm:p-2.5"
          >
            {/* Image Container with Male Model */}
            <div className="relative aspect-[4/5] bg-[#EAE5DC] overflow-hidden mb-3">
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover object-[center_25%] transition-transform duration-700 ease-out group-hover:scale-106"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
              
              {/* Count badge */}
              <span className="absolute bottom-2.5 right-2.5 bg-[#FAF9F6]/90 backdrop-blur-xs text-[#242321] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                {cat.itemCount} Designs
              </span>
            </div>

            {/* Category Meta */}
            <div className="flex items-center justify-between pt-1">
              <div className="min-w-0 pr-2">
                <h3 className="text-xs sm:text-sm font-bold text-[#242321] group-hover:text-[#77746E] transition-colors truncate">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#77746E] truncate mt-0.5">
                  {cat.tagline}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#242321] opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0 shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
