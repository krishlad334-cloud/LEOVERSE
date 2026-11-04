import React from 'react';
import { Truck, RotateCcw, Sparkles } from 'lucide-react';

export const BrandTicker = () => {
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#151518] border-b border-[#D8D2C8] dark:border-[#27272A] py-3.5 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs tracking-wider text-[#77746E] dark:text-[#D1C9BE] gap-4">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#242321] dark:text-[#C5A880]" />
          <span>Complimentary standard 3-day shipping on orders over ₹2,999</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-[#242321] dark:text-[#C5A880]" />
          <span>30-Day effortless returns & door-step exchanges</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#242321] dark:text-[#C5A880]" />
          <span>Small-batch tailoring & premium organic textiles</span>
        </div>
      </div>
    </div>
  );
};

export default BrandTicker;
