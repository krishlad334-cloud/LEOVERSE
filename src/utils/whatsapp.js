export const OFFICIAL_WHATSAPP_PHONE = '919408982003';
export const OFFICIAL_WEBSITE_URL = 'https://leoverse.com';
export const OFFICIAL_WEBSITE_IMAGE_URL = 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80';

/**
 * Builds the official WhatsApp concierge inquiry message containing the greeting,
 * inquiry text, LEOVERSE website URL, and the official campaign image preview URL.
 *
 * @param {Object} [options]
 * @param {string} [options.websiteUrl]
 * @param {string} [options.imageUrl]
 * @returns {string} Formatted WhatsApp message
 */
export const buildWhatsAppMessage = ({
  websiteUrl = OFFICIAL_WEBSITE_URL,
  imageUrl = OFFICIAL_WEBSITE_IMAGE_URL,
} = {}) => {
  return [
    'Hello LEOVERSE! 👋',
    '',
    'I visited your website and would like to know more about your clothing collections:',
    '',
    `🌐 Website: ${websiteUrl}`,
    `📸 Collection Image: ${imageUrl}`,
    '',
    'Could you please share details on sizing, availability, and latest arrivals? Thank you!',
  ].join('\n');
};

/**
 * Generates the complete wa.me click-to-chat URL with international phone number
 * and pre-filled message including website and image links.
 *
 * @param {Object} [options]
 * @param {string} [options.phoneNumber]
 * @param {string} [options.websiteUrl]
 * @param {string} [options.imageUrl]
 * @param {string} [options.message]
 * @returns {string} wa.me URL
 */
export const getWhatsAppUrl = ({
  phoneNumber = OFFICIAL_WHATSAPP_PHONE,
  websiteUrl = OFFICIAL_WEBSITE_URL,
  imageUrl = OFFICIAL_WEBSITE_IMAGE_URL,
  message,
} = {}) => {
  const cleanPhone = String(phoneNumber).replace(/[^0-9]/g, '');
  const text = message || buildWhatsAppMessage({ websiteUrl, imageUrl });
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
};
