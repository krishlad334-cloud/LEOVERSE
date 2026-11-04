import React from 'react';
import { Feather, HeartHandshake, Compass, RotateCcw } from 'lucide-react';

export const BrandBenefits = () => {
  const benefits = [
    {
      icon: Feather,
      title: 'Thoughtful Materials',
      description: 'Organic combed cotton, fine Australian merino, and pure Normandy flax linen.',
    },
    {
      icon: HeartHandshake,
      title: 'Everyday Comfort',
      description: 'Engineered silhouettes designed to move effortlessly with your daily rhythm.',
    },
    {
      icon: Compass,
      title: 'Considered Design',
      description: 'Timeless wardrobe foundations crafted in small batches to outlive seasonal trends.',
    },
    {
      icon: RotateCcw,
      title: 'Effortless Returns',
      description: '30-day door-step exchanges and complimentary shipping on orders over ₹2,999.',
    },
  ];

  return (
    <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#D8D2C8] dark:border-[#27272A] transition-colors">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {benefits.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#EAE5DC] dark:bg-[#1E1E24] flex items-center justify-center text-[#242321] dark:text-[#C5A880] mb-1">
                <Icon className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#242321] dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs text-[#77746E] dark:text-[#D1C9BE] leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BrandBenefits;
