/**
 * Formats a number to Indian Rupee format (e.g. ₹2,999)
 */
export function formatPrice(amount) {
  if (amount === null || amount === undefined) return '';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculates discount percentage
 */
export function getDiscountPercentage(originalPrice, salePrice) {
  if (!originalPrice || !salePrice || salePrice >= originalPrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}
