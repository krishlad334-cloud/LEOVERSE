import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export const EditorialBanner = () => {
  return (
    <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-[#252522]">
        {/* Left: Streetwear Photography (Heavyweight Loopback Hoodie & Wide Pants) */}
        <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] bg-[#1E1E1C]">
          <img
            src="/images/banners/hero-streetwear-hoodie.jpg"
            alt="LEOVERSE Monochrome Streetwear Edition"
            loading="lazy"
            className="w-full h-full object-cover object-[center_35%]"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-xs text-[#FAF9F6] px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium border border-white/10">
            LOOK 02 • MONOCHROME STREETWEAR
          </div>
        </div>

        {/* Right: Charcoal Editorial Content Panel */}
        <div className="lg:col-span-5 bg-[#252522] text-[#FAF9F6] p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
          <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#DCD5CA]/80">
            Streetwear Drop 02 • Monochrome
          </span>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#FAF9F6] leading-[1.05]">
              Heavyweight fleece. <br />
              Cut for the street.
            </h2>
            <p className="font-serif italic text-xl sm:text-2xl text-[#EAE5DC]/90 font-normal pt-1">
              Casual fashion. Zero formal compromise.
            </p>
          </div>

          <p className="text-sm text-[#DCD5CA]/85 leading-relaxed font-light">
            No stiff blazers or fragile tailoring. Engineered with substantial 480 GSM organic loopback cotton, retro sleeve piping, and wide-leg track pants designed for an architectural drape in natural motion.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Button
              to="/product/leo-002"
              variant="lightOutline"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              className="bg-[#FAF9F6] text-[#242321] hover:bg-[#FAF9F6]/90 border-transparent shadow-md"
            >
              Shop The Street Hoodie
            </Button>
            <Button
              to="/category/streetwear"
              variant="lightOutline"
              size="md"
              className="border-[#FAF9F6]/70 text-[#FAF9F6] hover:bg-[#FAF9F6] hover:text-[#242321]"
            >
              Explore Streetwear
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialBanner;
