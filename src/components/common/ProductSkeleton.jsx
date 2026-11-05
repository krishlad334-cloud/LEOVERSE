import React from 'react';

export const ProductSkeleton = () => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#18181C] border border-[#EBE6DD] dark:border-[#27272A] rounded-2xl p-2.5 space-y-3">
      {/* Image Skeleton */}
      <div className="aspect-[4/5] rounded-xl skeleton-shimmer w-full" />
      {/* Brand & Title */}
      <div className="space-y-2 px-1">
        <div className="h-3 w-1/3 rounded-sm skeleton-shimmer" />
        <div className="h-4 w-4/5 rounded-sm skeleton-shimmer" />
        <div className="h-4 w-1/2 rounded-sm skeleton-shimmer" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8, columns = 4 }) => {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-${columns} gap-4 sm:gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};

export default ProductSkeleton;
