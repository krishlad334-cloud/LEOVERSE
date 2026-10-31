import React from 'react';
import {
  OFFICIAL_WHATSAPP_PHONE,
  OFFICIAL_WEBSITE_URL,
  OFFICIAL_WEBSITE_IMAGE_URL,
  getWhatsAppUrl,
} from '../../utils/whatsapp';

/**
 * WhatsApp floating contact button for direct chat integration.
 * Connects visitors directly to the official LEOVERSE WhatsApp concierge with a
 * pre-filled proper message and LEOVERSE website image preview.
 *
 * @param {Object} props
 * @param {string} [props.phoneNumber='919408982003'] - Official WhatsApp number in international format.
 * @param {string} [props.message] - Custom pre-filled message; defaults to structured message with website & image.
 * @param {string} [props.websiteUrl] - Website link included in message.
 * @param {string} [props.imageUrl] - Image link included in message.
 * @param {string} [props.className=''] - Additional wrapper CSS classes.
 */
export const WhatsAppButton = ({
  phoneNumber = OFFICIAL_WHATSAPP_PHONE,
  message,
  websiteUrl = OFFICIAL_WEBSITE_URL,
  imageUrl = OFFICIAL_WEBSITE_IMAGE_URL,
  className = '',
}) => {
  const whatsappUrl = getWhatsAppUrl({
    phoneNumber,
    message,
    websiteUrl,
    imageUrl,
  });

  return (
    <aside
      aria-label="WhatsApp Concierge"
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center group pointer-events-auto ${className}`}
    >
      {/* Desktop hover card with LEOVERSE website image & concierge details */}
      <div
        id="whatsapp-card-preview"
        role="tooltip"
        className="hidden md:flex flex-col w-72 bg-[#FAF9F6] border border-[#D8D2C8] rounded-xl shadow-2xl overflow-hidden opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none select-none absolute bottom-full right-0 mb-3"
      >
        {/* LEOVERSE Website Hero/Lookbook Image */}
        <div className="relative h-28 w-full overflow-hidden bg-[#242321]">
          <img
            src={imageUrl}
            alt="LEOVERSE Menswear Collection"
            className="w-full h-full object-cover object-[center_30%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-3">
            <span className="text-[10px] font-bold tracking-[0.22em] text-[#FAF9F6] uppercase">
              LEOVERSE Menswear
            </span>
            <span className="text-xs text-[#EAE5DC] font-medium tracking-wide">
              Everyday Essentials. Elevated.
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3.5 space-y-2 text-left bg-[#FAF9F6]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#242321]">
              WhatsApp Concierge
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              Online
            </span>
          </div>
          <p className="text-[11px] text-[#77746E] leading-relaxed">
            Click to chat directly with our client care team regarding sizing, pieces, and orders.
          </p>
          <div className="pt-1 flex items-center justify-between border-t border-[#D8D2C8]/60 text-[10px] text-[#77746E]">
            <span>+91 9408982003</span>
            <span className="text-[#25D366] font-semibold">Includes Image & Inquiry &rarr;</span>
          </div>
        </div>
      </div>

      {/* Floating circular WhatsApp button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp (+91 9408982003)"
        aria-describedby="whatsapp-card-preview"
        className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:bg-[#20ba5a] hover:shadow-[0_6px_22px_rgba(37,211,102,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 focus-visible:ring-offset-2"
      >
        {/* Official WhatsApp Brand Icon */}
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="currentColor"
          className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.43 0-2.82-.37-4.04-1.08l-.29-.17-3.13.82.83-3.05-.19-.31a8.27 8.27 0 0 1-1.26-4.45c0-4.54 3.7-8.24 8.24-8.24m-3.23 3.35c-.21 0-.41.01-.58.02-.21.01-.45.09-.66.32-.24.26-.92.9-.92 2.2 0 1.3.95 2.55 1.08 2.72.13.17 1.82 2.91 4.49 3.96 2.22.87 2.67.7 3.15.65.48-.05 1.55-.64 1.77-1.28.22-.64.22-1.19.15-1.3-.07-.11-.24-.18-.5-.31-.26-.13-1.53-.75-1.77-.84-.24-.09-.41-.13-.58.12-.17.25-.66.85-.81 1.02-.15.17-.3.19-.56.06-.26-.13-1.1-.4-2.09-1.28-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.55-1.33-.75-1.83-.2-.5-.4-.43-.55-.44h-.58Z" />
        </svg>
      </a>
    </aside>
  );
};

export default WhatsAppButton;
