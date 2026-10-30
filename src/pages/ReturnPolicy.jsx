import React from 'react';
import Breadcrumb from '../components/common/Breadcrumb';

export const ReturnPolicy = () => {
  const breadcrumbs = [{ label: 'Returns & Exchanges' }];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="pb-8 mb-8 border-b border-[#D8D2C8]">
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#77746E] block mb-1">
          Effortless Trial
        </span>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#242321]">
          Returns & Exchanges
        </h1>
        <p className="text-xs sm:text-sm text-[#77746E] mt-2">
          30-day door-step trial period
        </p>
      </div>

      <div className="prose prose-stone text-xs sm:text-sm text-[#77746E] leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#242321]">
            1. 30-Day Doorstep Trial
          </h2>
          <p>
            We want you to feel complete confidence in your everyday essentials. You have 30 calendar days from the date of receipt to request an exchange for another size, color, or full refund.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#242321]">
            2. Condition for Return
          </h2>
          <p>
            Garments must be unworn, unwashed, and undamaged, with all original tags and cloth dust covers intact.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#242321]">
            3. Reverse Pickup
          </h2>
          <p>
            We organize complimentary reverse courier pickups from your doorstep across all serviceable PIN codes in India.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ReturnPolicy;
