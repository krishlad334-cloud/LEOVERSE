import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight, Copy, Check, Clock } from 'lucide-react';
import products from '../../data/products';
import ProductGrid from '../products/ProductGrid';

export const SpecialOffers = () => {
  const [copiedCode, setCopiedCode] = React.useState(null);

  // Grab products with discounts
  const saleProducts = products.filter((p) => p.salePrice).slice(0, 4);

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
      {/* Editorial Promo Banner Box */}
      <div className="bg-[#EAE5DC] dark:bg-[#18181C] border border-[#D8D2C8] dark:border-[#27272A] rounded-2xl p-6 sm:p-10 lg:p-12 mb-12 sm:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#252522] dark:bg-[#202026] text-[#FAF9F6] dark:text-[#C5A880] text-[10px] font-bold tracking-[0.24em] uppercase rounded">
              <Clock className="w-3 h-3 text-[#DCD5CA] dark:text-[#C5A880]" />
              Limited-Time Seasonal Event
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#242321] dark:text-white leading-[1.05]">
              Privilege Pricing on Archival Men's Clothing.
            </h2>
            <p className="text-sm text-[#77746E] dark:text-[#D1C9BE] leading-relaxed max-w-xl">
              Enjoy complimentary seasonal discounts on selected tailoring, pure French linen summer wear, and heavyweight loopback fleece hoodies. No discount codes required at checkout for marked-down garments.
            </p>
          </div>

          {/* Coupon codes box */}
          <div className="lg:col-span-5 bg-[#FAF9F6] dark:bg-[#151518] border border-[#D8D2C8] dark:border-[#27272A] rounded-xl p-5 sm:p-6 space-y-3.5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#77746E] dark:text-[#C5A880] block">
              Active Privilege Promo Codes
            </span>

            {/* Code 1 */}
            <div className="flex items-center justify-between p-3 bg-[#EAE5DC]/60 dark:bg-[#1E1E24] border border-[#D8D2C8] dark:border-[#2E2E36] rounded-lg">
              <div>
                <span className="font-mono text-sm font-bold text-[#242321] dark:text-white block tracking-wider">
                  LEO10
                </span>
                <span className="text-[11px] text-[#77746E] dark:text-gray-400">
                  10% Off your entire first order
                </span>
              </div>
              <button
                type="button"
                onClick={() => copyCode('LEO10')}
                className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-bold bg-[#252522] dark:bg-[#C5A880] text-[#FAF9F6] dark:text-black hover:bg-black dark:hover:bg-[#d8c09a] rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copiedCode === 'LEO10' ? (
                  <>
                    <Check className="w-3 h-3" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy
                  </>
                )}
              </button>
            </div>

            {/* Code 2 */}
            <div className="flex items-center justify-between p-3 bg-[#EAE5DC]/60 dark:bg-[#1E1E24] border border-[#D8D2C8] dark:border-[#2E2E36] rounded-lg">
              <div>
                <span className="font-mono text-sm font-bold text-[#242321] dark:text-white block tracking-wider">
                  ELEVATED
                </span>
                <span className="text-[11px] text-[#77746E] dark:text-gray-400">
                  ₹500 Flat Discount over ₹3,999
                </span>
              </div>
              <button
                type="button"
                onClick={() => copyCode('ELEVATED')}
                className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-bold bg-[#252522] dark:bg-[#C5A880] text-[#FAF9F6] dark:text-black hover:bg-black dark:hover:bg-[#d8c09a] rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copiedCode === 'ELEVATED' ? (
                  <>
                    <Check className="w-3 h-3" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sale Garments Grid */}
      <div className="space-y-8">
        <div className="flex items-baseline justify-between border-b border-[#D8D2C8] dark:border-[#27272A] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68962] dark:text-[#C5A880] block mb-1">
              Seasonal Markdowns
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#242321] dark:text-white">
              Featured Sale Pieces
            </h3>
          </div>

          <Link
            to="/sale"
            className="group flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] font-semibold text-[#242321] dark:text-white hover:text-[#77746E] dark:hover:text-[#C5A880] transition-colors"
          >
            <span>View All Sale ({products.filter((p) => p.salePrice).length})</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ProductGrid products={saleProducts} columns={4} />
      </div>
    </section>
  );
};

export default SpecialOffers;
