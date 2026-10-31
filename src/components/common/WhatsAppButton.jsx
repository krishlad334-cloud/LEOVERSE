import React from 'react';

export const DEFAULT_WHATSAPP_PHONE = '919408982003';
export const DEFAULT_WHATSAPP_MESSAGE = 'Hello LEOVERSE! I visited your website and would like to know more about your clothing collections.';
export const DEFAULT_WHATSAPP_URL = 'https://wa.me/919408982003?text=Hello%20LEOVERSE%21%20I%20visited%20your%20website%20and%20would%20like%20to%20know%20more%20about%20your%20clothing%20collections.';

/**
 * WhatsApp floating contact button for direct chat integration.
 * Connects visitors directly to the official LEOVERSE WhatsApp concierge.
 *
 * @param {Object} props
 * @param {string} [props.phoneNumber='919408982003'] - Official WhatsApp number in international format without '+' or special characters.
 * @param {string} [props.message='Hello LEOVERSE! I visited your website and would like to know more about your clothing collections.'] - Pre-filled initial inquiry message.
 * @param {string} [props.className=''] - Additional custom wrapper CSS classes.
 */
export const WhatsAppButton = ({
  phoneNumber = DEFAULT_WHATSAPP_PHONE,
  message = DEFAULT_WHATSAPP_MESSAGE,
  className = '',
}) => {
  // Use official exact pre-compiled URL for default values, or dynamically format if custom props provided
  let whatsappUrl = DEFAULT_WHATSAPP_URL;

  if (phoneNumber !== DEFAULT_WHATSAPP_PHONE || message !== DEFAULT_WHATSAPP_MESSAGE) {
    const cleanPhone = String(phoneNumber).replace(/[^0-9]/g, '');
    const encodedMessage = message
      ? encodeURIComponent(message).replace(/!/g, '%21')
      : '';
    whatsappUrl = encodedMessage
      ? `https://wa.me/${cleanPhone}?text=${encodedMessage}`
      : `https://wa.me/${cleanPhone}`;
  }

  return (
    <aside
      aria-label="WhatsApp Concierge"
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5 group pointer-events-auto ${className}`}
    >
      {/* Desktop hover tooltip pill */}
      <span
        id="whatsapp-tooltip"
        role="tooltip"
        className="hidden md:inline-flex items-center px-3.5 py-1.5 bg-[#252522] text-[#FAF9F6] text-[11px] font-medium tracking-wider uppercase rounded-full shadow-lg border border-[#383733] opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none select-none"
      >
        Chat with us
      </span>

      {/* Floating circular WhatsApp button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        aria-describedby="whatsapp-tooltip"
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
