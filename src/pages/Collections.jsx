import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import collectionsData from '../data/collections';

export const Collections = () => {
  const breadcrumbs = [{ label: 'All Collections' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="pb-8 mb-8 border-b border-[#D8D2C8] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#77746E] block mb-1">
            Capsule Archive & Editorial
          </span>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#242321]">
            LEOVERSE Collections
          </h1>
          <p className="text-xs sm:text-sm text-[#77746E] mt-2">
            Curated thematic releases designed as modular wardrobes. Each piece in a collection is intentionally patterned to complement the others.
          </p>
        </div>

        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#252522] text-[#FAF9F6] text-xs uppercase tracking-wider font-semibold hover:bg-black transition-all shadow-sm shrink-0"
        >
          <span>Shop All Men's Garments</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {collectionsData.map((col) => (
          <Link
            key={col.slug}
            to={`/collections/${col.slug}`}
            className="group flex flex-col select-none border border-[#D8D2C8] bg-[#FAF9F6] overflow-hidden"
          >
            <div className="relative aspect-[16/10] bg-[#EAE5DC] overflow-hidden">
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
              />
              <span className="absolute top-4 left-4 bg-[#FAF9F6]/90 backdrop-blur-xs text-[#242321] text-[10px] uppercase font-semibold tracking-[0.14em] px-2.5 py-1">
                {col.season}
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-2">
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-medium text-[#242321] group-hover:text-[#77746E] transition-colors">
                  {col.title}
                </h2>
                <ArrowRight className="w-4 h-4 text-[#242321] opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0 shrink-0" />
              </div>
              <p className="text-xs text-[#77746E] leading-relaxed">
                {col.subtitle}
              </p>
              <span className="text-[11px] text-[#242321] font-medium uppercase tracking-wider block pt-2">
                Discover {col.itemCount} Pieces →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collections;
