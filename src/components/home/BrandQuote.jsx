import React from 'react';

export const BrandQuote = () => {
  return (
    <section className="py-20 md:py-32 bg-[#EAE5DC]/60 border-y border-[#D8D2C8]/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#77746E] block">
          Our Everyday Credo
        </span>

        <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.3] text-[#242321] font-normal">
          “Getting dressed should be the simplest good decision you make each day.”
        </blockquote>

        <p className="text-xs tracking-[0.2em] uppercase text-[#77746E]">
          — LEOVERSE Editorial
        </p>
      </div>
    </section>
  );
};

export default BrandQuote;
