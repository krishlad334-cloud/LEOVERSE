import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export const BrandStory = () => {
  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left: Text Content */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#77746E]">
            Our Design Philosophy
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#242321] leading-[1.08]">
            Made to stay. <br />
            Not to stand still.
          </h2>

          <div className="space-y-4 text-sm text-[#77746E] leading-relaxed font-light">
            <p>
              We don't subscribe to the disposable churn of trend cycles. Every LEOVERSE garment is engineered to become a permanent foundation of your wardrobe, softening and gaining character with every wear.
            </p>
            <p>
              From combing high-density Australian merino wool to preshrinking heavy organic cotton oxford cloths, our process is anchored in quiet patience and architectural cut precision.
            </p>
          </div>

          <div className="pt-2">
            <Button
              to="/about"
              variant="outline"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
            >
              Our Approach
            </Button>
          </div>
        </div>

        {/* Right: Craftsmanship / Atelier Photography */}
        <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] bg-[#EAE5DC] overflow-hidden shadow-xs">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&q=85"
            alt="LEOVERSE Atelier Tailoring Craftsmanship"
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-103"
          />
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
