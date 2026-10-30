import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X, Tag } from 'lucide-react';
import productsData from '../data/products';
import ProductGrid from '../components/products/ProductGrid';
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
    'Oversized Tee',
    'Streetwear Hoodie',
    'Linen Shirt',
    'Tailored Blazer',
    'Wedding Suit',
    'Cargo Pants',
    'Merino Wool',
  ];

  const searchResults = useMemo(() => {
    if (!urlQuery.trim()) return [];
    const query = urlQuery.toLowerCase().trim();

    return productsData.filter((product) => {
      const matchName = product.name.toLowerCase().includes(query);
      const matchCategory = product.category.toLowerCase().includes(query);
      const matchSubtitle = product.subtitle?.toLowerCase().includes(query);
      const matchDesc = product.description?.toLowerCase().includes(query);
      const matchTags = product.tags?.some((t) => t.toLowerCase().includes(query));
      return matchName || matchCategory || matchSubtitle || matchDesc || matchTags;
    });
  }, [urlQuery]);

  const breadcrumbs = [{ label: 'Search' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="max-w-2xl mx-auto text-center py-8">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#242321] mb-6">
          Search LEOVERSE
        </h1>

        {/* Search Input Box */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product name, fabric, or category..."
            className="w-full pl-12 pr-12 py-4 bg-[#FAF9F6] border border-[#D8D2C8] text-sm text-[#242321] placeholder-[#77746E] focus:outline-none focus:border-[#242321] shadow-2xs"
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
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-[#77746E] uppercase tracking-wider flex items-center gap-1">
            <Tag className="w-3 h-3" /> Popular:
          </span>
          {suggestedKeywords.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleSuggestionClick(tag)}
              className="px-2.5 py-1 bg-[#EAE5DC]/60 hover:bg-[#EAE5DC] text-[#242321] transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="pt-8 border-t border-[#D8D2C8]">
        {urlQuery ? (
          <div>
            <div className="flex items-center justify-between pb-6">
              <p className="text-xs uppercase tracking-wider text-[#77746E]">
                Showing {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{urlQuery}"
              </p>
            </div>

            {searchResults.length > 0 ? (
              <ProductGrid products={searchResults} columns={4} />
            ) : (
              <EmptyState
                icon={SearchIcon}
                title="No pieces found"
                description={`We couldn't find any results matching "${urlQuery}". Try searching for categories like "knitwear", "jackets", or "linen".`}
                actionLabel="Explore All Clothing"
                actionTo="/shop"
              />
            )}
          </div>
        ) : (
          <div className="py-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#242321] mb-6 text-center">
              Featured Wardrobe Foundations
            </h2>
            <ProductGrid products={productsData.slice(0, 4)} columns={4} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
