import React from 'react';
import ProductCard from './ProductCard';

export const ProductGrid = ({
  products = [],
  columns = 4, // 2 | 3 | 4
  className = '',
}) => {
  const gridColsClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns] || 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className={`grid ${gridColsClass} gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
