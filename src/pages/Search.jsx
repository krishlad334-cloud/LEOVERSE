import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, X, Tag } from 'lucide-react';
import { getProductCatalog } from '../services/productService';
import ProductCard from '../components/products/ProductCard';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(urlQuery);

  useEffect(() => {
    setSearchTerm((prev) => (prev === urlQuery ? prev : urlQuery));
  }, [urlQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchParams({});
  };

  const handleSuggestionClick = (keyword) => {
    setSearchTerm(keyword);
    setSearchParams({ q: keyword });
  };

  const suggestedKeywords = [
    'Linen Shirt',
    'Oversized Tee',
    'Tailored Blazer',
    'Silk Dress',
    'Chinos',
    'Sneakers',
    'Raw Silk Kurta',
    'Chronograph'
  ];

  const searchResults = useMemo(() => {
    if (!urlQuery.trim()) return [];
    const res = getProductCatalog({ search: urlQuery, limit: 50 });
    return res.products;
  }, [urlQuery]);

  const fallbackFeatured = useMemo(() => {
    const res = getProductCatalog({ filterType: 'featured', limit: 4 });
    return res.products;
  }, []);

  const breadcrumbs = [{ label: 'Search' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="max-w-2xl mx-auto text-center py-8 space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A68962]">
            Discovery Engine
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#242321] dark:text-white mt-1">
            Search LEOVERSE Atelier
          </h1>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product name, brand, fabric, or category..."
            className="w-full pl-12 pr-12 py-3.5 bg-[#FAF9F6] dark:bg-[#1E1E22] border border-[#D8D2C8] dark:border-[#383842] rounded-2xl text-xs sm:text-sm text-[#242321] dark:text-white placeholder-[#77746E] focus:outline-none focus:border-[#A68962] shadow-sm"
            autoFocus
          />
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#77746E]" />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#77746E] hover:text-[#242321] cursor-pointer"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Suggested tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-[#77746E] uppercase tracking-wider flex items-center gap-1 font-semibold text-[11px]">
            <Tag className="w-3 h-3 text-[#A68962]" /> Popular:
          </span>
          {suggestedKeywords.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleSuggestionClick(tag)}
              className="px-3 py-1 rounded-full bg-[#FAF9F6] dark:bg-[#202026] hover:bg-[#EAE5DC] dark:hover:bg-[#2A2A34] text-[#242321] dark:text-gray-200 border border-[#D8D2C8] dark:border-[#383842] transition-colors cursor-pointer text-xs"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="pt-8 border-t border-[#D8D2C8] dark:border-[#27272A]">
        {urlQuery ? (
          <div>
            <div className="flex items-center justify-between pb-6">
              <p className="text-xs uppercase font-bold tracking-wider text-[#77746E]">
                Showing {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{urlQuery}"
              </p>
              {searchResults.length > 0 && (
                <Link
                  to={`/products?search=${encodeURIComponent(urlQuery)}`}
                  className="text-xs font-bold uppercase tracking-wider text-[#A68962] hover:underline"
                >
                  View in Full Filter Catalog
                </Link>
              )}
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {searchResults.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={SearchIcon}
                title="No pieces found"
                description={`We couldn't find any results matching "${urlQuery}". Try searching for categories like "linen", "shirt", "blazer", or "pants".`}
                actionLabel="Explore All Clothing"
                actionTo="/products"
              />
            )}
          </div>
        ) : (
          <div className="py-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A68962] mb-6 text-center">
              Curated Wardrobe Foundations
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {fallbackFeatured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
