import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import categories from '../data/categories';
import products from '../data/products';
import ProductGrid from '../components/products/ProductGrid';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';

export const CategoryPage = () => {
  const { slug } = useParams();

  const category = useMemo(() => {
    return categories.find((c) => c.slug === slug);
  }, [slug]);

  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.categorySlug === slug);
  }, [slug]);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <EmptyState
          title="Category Not Found"
          description="The clothing category you are looking for does not exist or has been relocated."
          actionLabel="View All Men's Clothing"
          actionTo="/shop"
        />
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Shop All', to: '/shop' },
    { label: category.name }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 select-none">
      <Breadcrumb items={breadcrumbs} />

      {/* Category Editorial Hero Banner */}
      <div className="relative overflow-hidden bg-[#252522] text-[#FAF9F6] border border-[#D8D2C8] mb-10 sm:mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#DCD5CA]">
              Men's Clothing Collection
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#FAF9F6]">
              {category.name}
            </h1>
            <p className="font-serif italic text-base sm:text-lg text-[#EAE5DC]/90">
              {category.tagline}
            </p>
            <p className="text-xs sm:text-sm text-[#DCD5CA]/80 leading-relaxed font-light max-w-xl pt-2">
              {category.description}
            </p>
            <div className="pt-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FAF9F6] bg-white/10 px-3 py-1 border border-white/15">
                {categoryProducts.length} Curated Garments Available
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

      {/* Filter / Shop Link Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-[#D8D2C8] mb-8">
        <span className="text-xs uppercase font-bold tracking-wider text-[#77746E]">
          Showing {categoryProducts.length} items
        </span>
        <Link
          to={`/shop?category=${category.slug}`}
          className="text-xs uppercase tracking-wider font-semibold text-[#242321] hover:underline flex items-center gap-1.5"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Open Full Filter View</span>
        </Link>
      </div>

      {/* Product Grid */}
      <ProductGrid products={categoryProducts} columns={4} />
    </div>
  );
};

export default CategoryPage;
