/**
 * Sorts products based on selected sorting option
 */
export function sortProducts(products, sortBy = 'featured') {
  const list = [...products];

  switch (sortBy) {
    case 'newest':
      return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || (b.id.localeCompare(a.id)));
    case 'price-asc':
      return list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    case 'price-desc':
      return list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    case 'rating':
      return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case 'bestselling':
      return list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    case 'featured':
    default:
      return list.sort((a, b) => (b.featuredOrder || 0) - (a.featuredOrder || 0));
  }
}
