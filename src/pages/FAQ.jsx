import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      category: 'Sizing & Tailoring',
      question: 'How do LEOVERSE men’s garments fit compared to standard sizes?',
      answer: 'All LEOVERSE garments are cut according to international tailored standards. Our casual and streetwear items (such as the 280 GSM Boxy Tee) feature architectural drop-shoulder silhouettes designed for relaxed ease. Our formal blazers and trousers are tailored regular with generous ease for movement. We advise taking your standard chest or waist measurement, or consulting our comprehensive Size Guide.'
    },
    {
      category: 'Fabric & Materials',
      question: 'What fabrics do you use in your men’s clothing collections?',
      answer: 'We exclusively source premium natural and specialized technical textiles: 280–480 GSM combed organic ringspun cottons, 19.5-micron Australian merino wool, pure Normandy French flax linen, Super 130s worsted Italian wool for our formal blazers, and Bhagalpur raw silk for ethnic kurtas. We never use cheap polyester shortcuts on our core staples.'
    },
    {
      category: 'Delivery & Shipping',
      question: 'What are your delivery timelines and shipping charges?',
      answer: 'We provide complimentary premium express air shipping on all orders above ₹2,999 across India. Standard orders are dispatched within 24 to 48 hours from our central atelier. Metro deliveries typically arrive within 2–3 business days, and non-metro areas within 4–5 business days.'
    },
    {
      category: 'Returns & Exchanges',
      question: 'What is your return and doorstep exchange policy?',
      answer: 'We provide a generous 30-day effortless return and exchange policy on all unworn clothing with original tags attached. If an item does not fit as desired, our courier partner will arrive at your doorstep with the replacement size or pick up the garment for a full refund.'
    },
    {
      category: 'Payment & Promo Codes',
      question: 'How do I use promo codes like LEO10 or ELEVATED?',
      answer: 'You can enter your promotional code in the order summary section on the Cart or Checkout page. Simply enter LEO10 for 10% off your entire first purchase or ELEVATED for ₹500 flat off orders above ₹3,999.'
    },
    {
      category: 'Garment Care',
      question: 'How should I care for my heavy cotton and linen garments?',
      answer: 'For our 280 GSM boxy tees and loopback hoodies, we recommend machine washing inside-out in cold water with similar colors and hang drying in the shade to preserve garment shape and dye intensity. Pure linen shirts benefit from a light steam while slightly damp.'
    }
  ];

  const breadcrumbs = [{ label: 'Frequently Asked Questions' }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 select-none">
      <Breadcrumb items={breadcrumbs} />

      <div className="py-6 border-b border-[#D8D2C8] mb-8 space-y-2 text-center sm:text-left">
        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#77746E]">
          Client Concierge Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#242321]">
          Frequently Asked Questions
        </h1>
        <p className="font-serif italic text-base sm:text-lg text-[#77746E]">
          Everything you need to know about our men's clothing, tailoring, and doorstep logistics.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-[#FAF9F6] border border-[#D8D2C8] overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#EAE5DC]/30 transition-colors"
              >
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#77746E] block mb-1">
                    {faq.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#242321]">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#242321] transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-5 pt-0 text-xs sm:text-sm text-[#77746E] leading-relaxed border-t border-[#D8D2C8]/50 mt-1">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
