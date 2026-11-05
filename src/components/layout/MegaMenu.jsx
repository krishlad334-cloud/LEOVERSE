import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Tag, ChevronRight } from 'lucide-react';
import { MEGA_MENU_CONFIG, BRANDS } from '../../services/productService';

export const MegaMenu = ({ activeCategory, onClose, onMouseEnter, onMouseLeave }) => {
  if (!activeCategory || !MEGA_MENU_CONFIG[activeCategory]) {
    return null;
  }

  const config = MEGA_MENU_CONFIG[activeCategory];

  return (
    <div
      className="absolute top-full left-0 w-full bg-white dark:bg-[#18181C] text-[#242321] dark:text-[#F3EFE6] shadow-2xl border-t border-b border-[#E8E3D9] dark:border-[#27272A] z-50 animate-in fade-in slide-in-from-top-1 duration-150 select-none"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave || onClose}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Subcategory Columns */}
          <div className="col-span-8 lg:col-span-9 grid grid-cols-3 lg:grid-cols-4 gap-6">
            {config.columns.map((col, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#2C4152] dark:text-[#D5A249] pb-1 border-b border-gray-200 dark:border-gray-800">
                  {col.title}
                </h3>
                <ul className="space-y-1">
                  {col.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link
                        to={item.href}
                        onClick={onClose}
                        className="flex items-center gap-2 py-1.5 px-2.5 -mx-2.5 rounded-lg text-xs text-gray-600 dark:text-gray-300 hover:text-[#1D2A35] dark:hover:text-[#D5A249] hover:bg-amber-50/80 dark:hover:bg-[#25252D] hover:translate-x-1 transition-all duration-150 group font-medium cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-[#D5A249] group-hover:scale-125 transition-all shrink-0" />
                        <span className="group-hover:font-semibold transition-all">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Quick Brands Column */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#2C4152] dark:text-[#D5A249] pb-1 border-b border-gray-200 dark:border-gray-800">
                Featured Brands
              </h3>
              <ul className="space-y-1">
                {BRANDS.slice(0, 5).map((brand, bIdx) => (
                  <li key={bIdx}>
                    <Link
                      to={`/products?brand=${encodeURIComponent(brand)}`}
                      onClick={onClose}
                      className="flex items-center gap-2 py-1.5 px-2.5 -mx-2.5 rounded-lg text-xs text-gray-600 dark:text-gray-300 hover:text-[#1D2A35] dark:hover:text-[#D5A249] hover:bg-amber-50/80 dark:hover:bg-[#25252D] hover:translate-x-1 transition-all duration-150 group font-medium cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-[#D5A249] group-hover:scale-125 transition-all shrink-0" />
                      <span className="group-hover:font-semibold transition-all">{brand}</span>
                    </Link>
                  </li>
                ))}
                <li className="pt-1.5">
                  <Link
                    to="/products"
                    onClick={onClose}
                    className="flex items-center gap-1.5 py-1 px-2.5 -mx-2.5 text-[11px] font-bold uppercase tracking-wider text-[#D5A249] hover:text-[#BF8D35] hover:underline cursor-pointer group"
                  >
                    <span>View All Brands</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Visual Promo Card */}
          {config.featuredPromo && (
            <div className="col-span-4 lg:col-span-3">
              <div className="relative rounded-2xl overflow-hidden group border border-[#EAE5DC] dark:border-[#27272A] bg-[#FAF9F6] dark:bg-[#202026] shadow-sm">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={config.featuredPromo.image}
                    alt={config.featuredPromo.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5 text-white space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-bold tracking-widest uppercase">
                    <Sparkles className="w-2.5 h-2.5 text-[#D5A249]" />
                    <span>{config.featuredPromo.tag}</span>
                  </div>
                  <h4 className="text-sm font-bold tracking-wide uppercase leading-tight drop-shadow-sm">
                    {config.featuredPromo.title}
                  </h4>
                  <p className="text-[11px] text-gray-200 line-clamp-2 leading-snug">
                    {config.featuredPromo.desc}
                  </p>
                  <Link
                    to={config.featuredPromo.link}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D5A249] group-hover:text-white pt-1 transition-colors"
                  >
                    <span>Discover Drop</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mega Menu Bottom Bar: Offers & Trust */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#2C4152] dark:text-gray-200">
              <Tag className="w-3.5 h-3.5 text-rose-600" />
              <span>Use Code <strong className="font-mono text-rose-600 dark:text-rose-400 font-bold">LUXE15</strong> for flat 15% off</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Complimentary shipping on orders above ₹2,499</span>
          </div>

          <Link
            to={config.href}
            onClick={onClose}
            className="font-bold uppercase tracking-wider text-xs text-[#2C4152] dark:text-white hover:text-[#D5A249] inline-flex items-center gap-1 transition-colors"
          >
            <span>Explore All {config.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
