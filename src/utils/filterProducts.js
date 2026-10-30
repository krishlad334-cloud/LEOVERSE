/**
 * Filters a list of products based on various clothing criteria
 */
export function filterProducts(products, filters = {}) {
  const {
    category = 'all',
    size = 'all',
    color = 'all',
    fabric = 'all',
    fit = 'all',
    occasion = 'all',
    filterType = 'all', // 'new', 'bestseller', 'sale'
    minPrice = 0,
    maxPrice = Infinity,
    searchQuery = '',
    inStockOnly = false,
  } = filters;

  return products.filter((product) => {
    // Category filter
    if (category && category !== 'all') {
      const matchCat =
        product.category.toLowerCase() === category.toLowerCase() ||
        (product.categorySlug && product.categorySlug.toLowerCase() === category.toLowerCase());
      if (!matchCat) return false;
    }

    // Size filter
    if (size && size !== 'all') {
      if (!product.sizes || !product.sizes.includes(size)) return false;
    }

    // Color filter
    if (color && color !== 'all') {
      if (!product.colors || !product.colors.some((c) => c.name.toLowerCase() === color.toLowerCase())) {
        return false;
      }
    }

    // Fabric filter
    if (fabric && fabric !== 'all') {
      if (!product.fabric || product.fabric.toLowerCase() !== fabric.toLowerCase()) {
        return false;
      }
    }

    // Fit filter
    if (fit && fit !== 'all') {
      if (!product.fit || product.fit.toLowerCase() !== fit.toLowerCase()) {
        return false;
      }
    }

    // Occasion filter
    if (occasion && occasion !== 'all') {
      if (!product.occasion || product.occasion.toLowerCase() !== occasion.toLowerCase()) {
        return false;
      }
    }

    // Filter type (New, Bestseller, Sale)
    if (filterType === 'new' && !product.isNew) return false;
    if (filterType === 'bestseller' && !product.isBestSeller) return false;
    if (filterType === 'sale' && !product.salePrice) return false;

    // Price range
    const effectivePrice = product.salePrice ?? product.price;
    if (effectivePrice < minPrice || effectivePrice > maxPrice) {
      return false;
    }

    // In stock
    if (inStockOnly && !product.inStock) {
      return false;
    }

    // Search query
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = product.name.toLowerCase().includes(q);
      const catMatch = product.category.toLowerCase().includes(q);
      const descMatch = product.description.toLowerCase().includes(q);
      const tagMatch = product.tags && product.tags.some((t) => t.toLowerCase().includes(q));
      const fabricMatch = product.fabric && product.fabric.toLowerCase().includes(q);
      const fitMatch = product.fit && product.fit.toLowerCase().includes(q);
      const occasionMatch = product.occasion && product.occasion.toLowerCase().includes(q);
      if (!nameMatch && !catMatch && !descMatch && !tagMatch && !fabricMatch && !fitMatch && !occasionMatch) {
        return false;
      }
    }

    return true;
  });
}

export default filterProducts;
