import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Tag, ShieldCheck } from 'lucide-react';

const MESSAGES = [
  {
    icon: Sparkles,
    tag: "SPECIAL PRIVILEGE",
    text: "Complimentary Express Delivery on all orders above ₹2,499 across India.",
    code: "FREESHIP"
  },
  {
    icon: Tag,
    tag: "MID-SEASON PRIVATE SALE",
    text: "Enjoy Flat 15% Savings on SS26 tailoring & linen garments with code",
    code: "LUXE15"
  },
  {
    icon: ShieldCheck,
    tag: "ATELIER PROMISE",
    text: "Hassle-Free 30-Day Doorstep Returns & Handcrafted Small-Batch Guarantee.",
    code: null
  }
];

export const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const msg = MESSAGES[index];
  const IconComponent = msg.icon;

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % MESSAGES.length);
  };

  return (
    <div className="bg-[#1A1A1D] text-[#E5E0D6] border-b border-[#2A2A30] text-[11px] select-none py-1.5 px-3 sm:px-6 relative z-40 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Indicator */}
        <div className="hidden lg:flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-[#C5A880]">
          <span>LEOVERSE LUXE MENSWEAR</span>
          <span>•</span>
          <span>INDIA</span>
        </div>

        {/* Center Animated Announcement */}
        <div className="flex-1 flex items-center justify-center space-x-2 text-center overflow-hidden">
          <button
            type="button"
            onClick={handlePrev}
            className="p-0.5 text-gray-400 hover:text-white transition cursor-pointer"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center space-x-2 text-xs transition-opacity duration-300">
            <IconComponent className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span className="font-bold text-[10px] tracking-wider uppercase text-[#C5A880] hidden sm:inline">
              [{msg.tag}]
            </span>
            <span className="text-gray-200">{msg.text}</span>
            {msg.code && (
              <span className="px-1.5 py-0.5 rounded bg-white/15 text-white font-mono font-bold text-[10px] tracking-wider border border-white/20">
                {msg.code}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="p-0.5 text-gray-400 hover:text-white transition cursor-pointer"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Quick Links */}
        <div className="hidden md:flex items-center space-x-4 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
          <a href="/account/orders" className="hover:text-white transition">Track Order</a>
          <span>•</span>
          <a href="/faq" className="hover:text-white transition">24/7 Concierge</a>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
