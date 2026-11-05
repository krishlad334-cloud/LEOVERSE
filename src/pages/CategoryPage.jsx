import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import categories from '../data/categories';
import { getProductCatalog } from '../services/productService';
import ProductCard from '../components/products/ProductCard';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';

export const CategoryPage = () => {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState('featured');

  const category = useMemo(() => {
    return categories.find((c) => c.slug === slug);
  }, [slug]);

  const categoryResult = useMemo(() => {
    if (!category) return { products: [], totalCount: 0 };
    return getProductCatalog({
      category: category.slug,
      sort: sortBy,
      limit: 50
    });
  }, [category, sortBy]);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <EmptyState
          title="Category Not Found"
          description="The clothing category you are looking for does not exist or has been relocated."
          actionLabel="View All Fashion"
          actionTo="/products"
        />
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Shop All', to: '/products' },
    { label: category.name }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 select-none">
      <Breadcrumb items={breadcrumbs} />

      {/* Category Editorial Hero Banner */}
      <div className="relative overflow-hidden bg-[#252522] text-[#FAF9F6] border border-[#D8D2C8] dark:border-[#27272A] rounded-2xl mb-10 sm:mb-14 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-[0.24em] text-[#DCD5CA]">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              <span>Curated Atelier Collection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#FAF9F6]">
              {category.name}
            </h1>
            <p className="font-serif italic text-base sm:text-lg text-[#EAE5DC]/90">
              {category.tagline}
            </p>
            <p className="text-xs sm:text-sm text-[#DCD5CA]/80 leading-relaxed font-light max-w-xl pt-1">
              {category.description}
            </p>
            <div className="pt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FAF9F6] bg-white/10 px-3 py-1 rounded-lg border border-white/15">
                {categoryResult.totalCount} Garments Available
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
                Code LUXE15 for 15% Savings
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] bg-[#1E1E1C] overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover object-[center_25%]"
            />
          </div>
        </div>
      </div>

      {/* Filter / Sort Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D8D2C8] dark:border-[#27272A] mb-8 gap-4">
        <span className="text-xs uppercase font-bold tracking-wider text-[#77746E]">
          Showing {categoryResult.products.length} of {categoryResult.totalCount} items
        </span>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold uppercase tracking-wider text-gray-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-[#D8D2C8] dark:border-[#383842] bg-[#FAF9F6] dark:bg-[#1E1E22] text-[#242321] dark:text-white text-xs font-semibold focus:outline-none"
            >
              <option value="featured">Featured / Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>

          <Link
            to={`/products?category=${encodeURIComponent(category.slug)}`}
            className="text-xs uppercase tracking-wider font-bold text-[#A68962] hover:underline flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Open Multifaceted Filters</span>
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categoryResult.products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
