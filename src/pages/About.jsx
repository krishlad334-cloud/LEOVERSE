import React from 'react';
import { ArrowRight } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import Button from '../components/common/Button';

export const About = () => {
  const breadcrumbs = [{ label: 'About LEOVERSE' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      {/* Hero statement */}
      <div className="py-12 md:py-20 max-w-3xl space-y-4">
        <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#77746E]">
          The LEOVERSE Menswear Manifesto
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#242321] leading-[1.1]">
          Everyday Essentials. Elevated.
        </h1>
        <p className="text-base sm:text-lg text-[#77746E] font-light leading-relaxed pt-2">
          LEOVERSE was founded on a simple realization: the everyday menswear we spend the majority of our lives in deserves the highest level of consideration. We build timeless menswear foundations that bridge unhurried comfort with architectural cut precision.
        </p>
      </div>

      {/* Large visual banner: Bespoke Menswear Atelier */}
      <div className="aspect-[16/8] bg-[#EAE5DC] overflow-hidden mb-16 sm:mb-24">
        <img
          src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1600&q=85"
          alt="LEOVERSE Menswear Atelier Story"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Philosophy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pb-20 border-b border-[#D8D2C8]">
        <div className="space-y-3">
          <span className="text-xs font-bold tracking-[0.2em] text-[#77746E] uppercase">01 / Materiality</span>
          <h2 className="text-xl font-medium text-[#242321]">Natural Fibers Only</h2>
          <p className="text-xs sm:text-sm text-[#77746E] leading-relaxed">
            We partner exclusively with certified mills specializing in 260 GSM Supima cottons, 19.5-micron Australian merino wool, and pure French Normandy flax linen.
          </p>
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold tracking-[0.2em] text-[#77746E] uppercase">02 / Proportion</span>
          <h2 className="text-xl font-medium text-[#242321]">Unhurried Tailoring</h2>
          <p className="text-xs sm:text-sm text-[#77746E] leading-relaxed">
            Neither rigidly formal nor shapelessly loose. Our menswear patterns are engineered with subtle shoulder drops, single and double forward pleats, and generous chest drapes.
          </p>
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold tracking-[0.2em] text-[#77746E] uppercase">03 / Longevity</span>
          <h2 className="text-xl font-medium text-[#242321]">Made to Outlive Seasons</h2>
          <p className="text-xs sm:text-sm text-[#77746E] leading-relaxed">
            We release small-batch editions rather than seasonal discards. Every piece is constructed with reinforced binding, horn buttons, and bound seams engineered to survive decades of continuous wear.
          </p>
        </div>
      </div>

      {/* Craft Section */}
      <div id="craft" className="py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <div className="lg:col-span-6 space-y-5">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#77746E]">
            Atelier Process
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#242321]">
            Small-batch production with master tailors at the center.
          </h2>
          <p className="text-xs sm:text-sm text-[#77746E] leading-relaxed">
            Every garment begins with bespoke paper patterns drafted in our design studio. Rather than mass-manufacturing in tens of thousands, our master cutters produce in batches of 150 to 300 units per colorway.
          </p>
          <p className="text-xs sm:text-sm text-[#77746E] leading-relaxed">
            This deliberate restraint eliminates deadstock, minimizes fiber waste, and guarantees that each horn button, hand-stitched collar roll, and double-needle hem receives meticulous inspection.
          </p>
          <div className="pt-2">
            <Button to="/shop" variant="primary" icon={ArrowRight} iconPosition="right">
              Explore Menswear Pieces
            </Button>
          </div>
        </div>

        <div className="lg:col-span-6 aspect-[4/3] bg-[#EAE5DC] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80"
            alt="LEOVERSE Menswear Craftsmanship"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
