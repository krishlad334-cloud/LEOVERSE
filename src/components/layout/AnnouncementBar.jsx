import React, { useState } from 'react';
import { X } from 'lucide-react';

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#EAE5DC] text-[#242321] text-[11px] md:text-xs font-medium tracking-[0.1em] uppercase py-2 px-4 border-b border-[#D8D2C8] relative transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-center">
        <div className="hidden sm:block text-[#77746E] w-24 text-left">
          Crafted in India
        </div>
        <div className="flex-1 text-center truncate">
          <span>Complimentary shipping on orders above ₹2,999</span>
          <span className="mx-2 text-[#77746E] hidden md:inline">•</span>
          <span className="hidden md:inline text-[#77746E]">30-Day Effortless Returns</span>
        </div>
        <div className="w-24 text-right flex justify-end items-center">
          <button
            onClick={() => setIsVisible(false)}
            className="text-[#77746E] hover:text-[#242321] transition-colors p-0.5 cursor-pointer"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
