import React from 'react';
import ProductGrid from './ProductGrid';

export const RelatedProducts = ({ products = [], title = "Consider Also" }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 border-t border-[#D8D2C8]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-[#242321]">
          {title}
        </h2>
      </div>
      <ProductGrid products={products.slice(0, 4)} columns={4} />
    </section>
  );
};

export default RelatedProducts;
