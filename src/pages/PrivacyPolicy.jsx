import React from 'react';
import Breadcrumb from '../components/common/Breadcrumb';

export const PrivacyPolicy = () => {
  const breadcrumbs = [{ label: 'Privacy Policy' }];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="pb-8 mb-8 border-b border-[#D8D2C8]">
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#77746E] block mb-1">
          Data Governance
        </span>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#242321]">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#77746E] mt-2">
          Effective October 2026
        </p>
      </div>

      <div className="prose prose-stone text-xs sm:text-sm text-[#77746E] leading-relaxed space-y-6">
        <p>
          LEOVERSE respects your privacy. We collect only the information necessary to fulfill your garment orders, coordinate shipping logistics, and offer personalized sizing recommendations.
        </p>
        <p>
          We never monetize or trade your personal information with external advertising brokers. All transaction data is processed over TLS 1.3 encrypted protocols.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
