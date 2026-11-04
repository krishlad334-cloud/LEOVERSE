import React from 'react';

export const BrandQuote = () => {
  return (
    <section className="py-20 md:py-32 bg-[#EAE5DC]/60 dark:bg-[#151518] border-y border-[#D8D2C8]/70 dark:border-[#27272A] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#77746E] dark:text-[#C5A880] block">
          Our Everyday Credo
        </span>

        <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.3] text-[#242321] dark:text-white font-normal">
          “Getting dressed should be the simplest good decision you make each day.”
        </blockquote>

        <p className="text-xs tracking-[0.2em] uppercase text-[#77746E] dark:text-gray-400">
          — LEOVERSE Editorial
        </p>
      </div>
    </section>
  );
};

export default BrandQuote;
