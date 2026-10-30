import React from 'react';
import { useParams } from 'react-router-dom';
import collectionsData from '../data/collections';
import productsData from '../data/products';
import ProductGrid from '../components/products/ProductGrid';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';

export const CollectionDetails = () => {
  const { slug } = useParams();
  const collection = collectionsData.find((c) => c.slug === slug);

  if (!collection) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <EmptyState
          title="Collection not found"
          description="The seasonal capsule you are looking for does not exist or has concluded."
          actionLabel="View All Collections"
          actionTo="/collections"
        />
      </div>
    );
  }

  // Filter relevant products for the collection
  const collectionProducts = productsData.filter((p) => {
    if (slug === 'streetwear-drop-01') return p.categorySlug === 'streetwear' || p.categorySlug === 'casual-wear';
    if (slug === 'monochrome-street-fleece') return p.categorySlug === 'winter-wear' || p.categorySlug === 'streetwear';
    if (slug === 'core-foundations') return p.isDailyEssential || p.isBestSeller;
    if (slug === 'casual-outerwear') return p.categorySlug === 'winter-wear' || p.categorySlug === 'casual-wear';
    return true;
  });

  const breadcrumbs = [
    { label: 'Collections', to: '/collections' },
    { label: collection.title },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      {/* Hero header */}
      <div className="relative aspect-[16/7] bg-[#252522] text-[#FAF9F6] overflow-hidden mb-12 sm:mb-16">
        <img
          src={collection.image}
          alt={collection.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
          <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#DCD5CA]">
            {collection.season}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#FAF9F6] mt-2 mb-2">
            {collection.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#DCD5CA] max-w-xl">
            {collection.subtitle}
          </p>
        </div>
      </div>

      {/* Products list */}
      <div className="pb-8 mb-8 border-b border-[#D8D2C8] flex justify-between items-baseline">
        <h2 className="text-lg font-medium text-[#242321] uppercase tracking-wider">
          Pieces in this Capsule
        </h2>
        <span className="text-xs text-[#77746E]">
          {collectionProducts.length} items
        </span>
      </div>

      <ProductGrid products={collectionProducts} columns={4} />
    </div>
  );
};

export default CollectionDetails;
