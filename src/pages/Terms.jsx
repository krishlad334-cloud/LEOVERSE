import React from 'react';
import Breadcrumb from '../components/common/Breadcrumb';

export const Terms = () => {
  const breadcrumbs = [{ label: 'Terms & Conditions' }];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="pb-8 mb-8 border-b border-[#D8D2C8]">
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#77746E] block mb-1">
          Legal Notice
        </span>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#242321]">
          Terms & Conditions
        </h1>
        <p className="text-xs sm:text-sm text-[#77746E] mt-2">
          Effective October 2026
        </p>
      </div>

      <div className="prose prose-stone text-xs sm:text-sm text-[#77746E] leading-relaxed space-y-6">
        <p>
          Welcome to LEOVERSE. By exploring our digital flagship, browsing our collections, or placing reservations, you agree to comply with our store protocols and brand guidelines.
        </p>
        <p>
          All creative visual assets, silhouettes, photography, and text content are the intellectual property of LEOVERSE Apparel.
        </p>
      </div>
    </div>
  );
};

export default Terms;
