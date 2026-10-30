import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../common/Button';

export const HeroSection = () => {
  return (
    <section className="relative w-full bg-[#242321] text-[#FAF9F6] overflow-hidden min-h-[75vh] sm:min-h-[82vh] lg:min-h-[90vh] flex items-center select-none">
      {/* Background Image: High-Fashion Casual Streetwear Menswear */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=2400&q=85"
          alt="LEOVERSE Menswear Casual Streetwear Campaign"
          fetchPriority="high"
          className="w-full h-full object-cover object-[center_28%] sm:object-[center_32%] lg:object-[center_35%] transition-transform duration-1000 ease-out hover:scale-102"
        />

        {/* Cinematic Gradient Overlays for High Contrast & Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 sm:bg-gradient-to-r sm:from-black/85 sm:via-black/55 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 sm:hidden" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 lg:py-36 w-full">
        <div className="max-w-2xl text-[#FAF9F6] space-y-4 sm:space-y-6">
          {/* Campaign Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF9F6]/15 backdrop-blur-md border border-[#FAF9F6]/25 text-[#FAF9F6] text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] uppercase">
            <Sparkles className="w-3 h-3 text-[#DCD5CA]" />
            <span>SS26 Streetwear Collection • Menswear</span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-[0.03em] uppercase leading-[0.93] drop-shadow-md text-[#FAF9F6]">
            OFF HOURS. <br />
            ON PURPOSE.
          </h1>

          {/* Brand Tagline & Description */}
          <p className="font-serif italic text-lg sm:text-2xl text-[#EAE5DC] font-normal pt-1 drop-shadow-xs">
            Everyday Essentials. Elevated.
          </p>

          <p className="text-xs sm:text-base md:text-lg text-[#EAE5DC]/90 font-light max-w-lg leading-relaxed drop-shadow-xs">
            Considered casual essentials for wherever the day takes you. Heavyweight 280 GSM oversized tees, baggy skate denim jorts, and relaxed drop-shoulder hoodies. Built for movement.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              to="/shop"
              variant="lightOutline"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="bg-[#FAF9F6] text-[#242321] hover:bg-[#FAF9F6]/90 border-transparent shadow-lg w-full sm:w-auto font-medium"
            >
              Shop Now
            </Button>
            <Button
              to="/category/streetwear"
              variant="lightOutline"
              size="lg"
              className="border-[#FAF9F6]/80 text-[#FAF9F6] hover:bg-[#FAF9F6] hover:text-[#242321] w-full sm:w-auto backdrop-blur-xs font-medium"
            >
              Explore Streetwear
            </Button>
          </div>

          {/* Key Specs Pill */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-[11px] text-[#EAE5DC]/80 uppercase tracking-wider">
            <span>• 100% Menswear</span>
            <span>• 280–480 GSM Pure Cottons</span>
            <span>• Boxy Drop-Shoulder Cuts</span>
            <span>• Free Shipping &gt; ₹2,999</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
