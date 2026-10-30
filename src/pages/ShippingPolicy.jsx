import React from 'react';
import Breadcrumb from '../components/common/Breadcrumb';

export const ShippingPolicy = () => {
  const breadcrumbs = [{ label: 'Shipping Policy' }];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="pb-8 mb-8 border-b border-[#D8D2C8]">
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#77746E] block mb-1">
          Concierge Delivery
        </span>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#242321]">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#77746E] mt-2">
          Last updated: October 2026
        </p>
      </div>

      <div className="prose prose-stone text-xs sm:text-sm text-[#77746E] leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#242321]">
            1. Domestic Dispatch & Rates
          </h2>
          <p>
            All LEOVERSE orders are inspected, steam-pressed, and packed in reusable natural cotton garment dust bags at our Mumbai atelier.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Complimentary Expedited Shipping:</strong> Automatically applied to all orders above ₹2,999.</li>
            <li><strong>Standard Domestic Transit:</strong> Flat ₹250 on orders below ₹2,999. Delivered within 2–5 business days across Indian metros.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#242321]">
            2. Order Tracking
          </h2>
          <p>
            As soon as your shipment leaves our hands, an encrypted tracking link is dispatched to your registered SMS and email address. You may monitor its step-by-step progress directly.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#242321]">
            3. Signature Upon Delivery
          </h2>
          <p>
            To ensure the security of high-value wool, cashmere, and suede items, high-tier orders require a digital signature or OTP verification upon handover.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
