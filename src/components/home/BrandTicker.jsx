import React from 'react';
import { Truck, RotateCcw, Sparkles } from 'lucide-react';

export const BrandTicker = () => {
  return (
    <div className="bg-[#FAF9F6] border-b border-[#D8D2C8] py-3.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs tracking-wider text-[#77746E] gap-4">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#242321]" />
          <span>Complimentary standard 3-day shipping on orders over ₹2,999</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-[#242321]" />
          <span>30-Day effortless returns & door-step exchanges</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#242321]" />
          <span>Small-batch tailoring & premium organic textiles</span>
        </div>
      </div>
    </div>
  );
};

export default BrandTicker;
