import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import categories from '../../data/categories';

export const ProductFilters = ({
  filters,
  onChange,
  onReset,
  availableColors = [],
  availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', '38'],
  availableFabrics = ['100% Cotton', 'Pure Linen', 'Super 120s Wool', 'Merino Wool', 'Loopback Fleece', 'Denim', 'Twill', 'Raw Silk', 'Tech Stretch'],
  availableFits = ['Relaxed Boxy', 'Tailored Regular', 'Oversized Drop-Shoulder', 'Wide Leg'],
  availableOccasions = ['Casual', 'Formal', 'Wedding', 'Party', 'Sports', 'Travel', 'Beach', 'Streetwear', 'Ethnic', 'Summer', 'Winter'],
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) => {
  const handleCategoryChange = (slug) => {
    onChange({ ...filters, category: slug });
  };

  const handleSizeChange = (size) => {
    const newSize = filters.size === size ? 'all' : size;
    onChange({ ...filters, size: newSize });
  };

  const handleColorChange = (colorName) => {
    const newColor = filters.color === colorName ? 'all' : colorName;
    onChange({ ...filters, color: newColor });
  };

  const handleFabricChange = (fabricName) => {
    const newFabric = filters.fabric === fabricName ? 'all' : fabricName;
    onChange({ ...filters, fabric: newFabric });
  };

  const handleFitChange = (fitName) => {
    const newFit = filters.fit === fitName ? 'all' : fitName;
    onChange({ ...filters, fit: newFit });
  };

  const handleOccasionChange = (occName) => {
    const newOcc = filters.occasion === occName ? 'all' : occName;
    onChange({ ...filters, occasion: newOcc });
  };

  const handlePriceChange = (e) => {
    onChange({ ...filters, maxPrice: Number(e.target.value) });
  };

  const content = (
    <div className="space-y-7">
      {/* 1. Category Filter */}
      <div>
        <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#242321] mb-3">
          Clothing Category
        </h3>
        <ul className="space-y-1.5 text-xs max-h-56 overflow-y-auto pr-1">
          <li>
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className={`w-full text-left py-1 tracking-wider transition-colors cursor-pointer flex items-center justify-between ${
                filters.category === 'all'
                  ? 'font-bold text-[#242321] underline underline-offset-4'
                  : 'text-[#77746E] hover:text-[#242321]'
              }`}
            >
              <span>All Men's Clothing</span>
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <button
                type="button"
                onClick={() => handleCategoryChange(cat.slug)}
                className={`w-full text-left py-1 tracking-wider transition-colors cursor-pointer flex items-center justify-between ${
                  filters.category === cat.slug
                    ? 'font-bold text-[#242321] underline underline-offset-4'
                    : 'text-[#77746E] hover:text-[#242321]'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] text-[#77746E]/70 font-normal">({cat.itemCount})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. Occasion Filter */}
      <div>
        <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#242321] mb-3">
          Occasion
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {availableOccasions.map((occ) => {
            const isSelected = filters.occasion === occ;
            return (
              <button
                key={occ}
                type="button"
                onClick={() => handleOccasionChange(occ)}
                className={`px-2.5 py-1 text-[11px] uppercase tracking-wider border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#252522] text-[#FAF9F6] border-[#252522] font-semibold'
                    : 'bg-transparent text-[#77746E] border-[#D8D2C8] hover:border-[#242321] hover:text-[#242321]'
                }`}
              >
                {occ}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Size Filter */}
      <div>
        <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#242321] mb-3">
          Size
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {availableSizes.map((sz) => {
            const isSelected = filters.size === sz;
            return (
              <button
                key={sz}
                type="button"
                onClick={() => handleSizeChange(sz)}
                className={`min-w-8 h-8 px-2 text-xs tracking-wider uppercase border transition-all cursor-pointer font-medium ${
                  isSelected
                    ? 'bg-[#252522] text-[#FAF9F6] border-[#252522]'
                    : 'bg-transparent text-[#242321] border-[#D8D2C8] hover:border-[#242321]'
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Fabric Filter */}
      <div>
        <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#242321] mb-3">
          Fabric & Material
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {availableFabrics.map((fab) => {
            const isSelected = filters.fabric === fab;
            return (
              <button
                key={fab}
                type="button"
                onClick={() => handleFabricChange(fab)}
                className={`px-2 py-1 text-[10px] uppercase tracking-wider border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#252522] text-[#FAF9F6] border-[#252522] font-semibold'
                    : 'bg-transparent text-[#77746E] border-[#D8D2C8] hover:border-[#242321] hover:text-[#242321]'
                }`}
              >
                {fab}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Fit Filter */}
      <div>
        <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#242321] mb-3">
          Silhouette & Fit
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {availableFits.map((f) => {
            const isSelected = filters.fit === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => handleFitChange(f)}
                className={`px-2.5 py-1 text-[11px] uppercase tracking-wider border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#252522] text-[#FAF9F6] border-[#252522] font-semibold'
                    : 'bg-transparent text-[#77746E] border-[#D8D2C8] hover:border-[#242321] hover:text-[#242321]'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Color Filter */}
      {availableColors.length > 0 && (
        <div>
          <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#242321] mb-3">
            Color
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableColors.map((c) => {
              const isSelected = filters.color?.toLowerCase() === c.name.toLowerCase();
              return (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  onClick={() => handleColorChange(c.name)}
                  className={`w-6 h-6 rounded-full border transition-all p-0.5 relative cursor-pointer ${
                    isSelected
                      ? 'border-[#242321] scale-115 ring-1 ring-[#242321]'
                      : 'border-transparent hover:scale-105'
                  }`}
                >
                  <span
                    className="block w-full h-full rounded-full border border-black/15"
                    style={{ backgroundColor: c.hex }}
                  />
                </button>
              );
            })}
          </div>
          {filters.color && filters.color !== 'all' && (
            <p className="mt-2 text-xs text-[#77746E]">
              Selected: <span className="text-[#242321] font-semibold">{filters.color}</span>
            </p>
          )}
        </div>
      )}

      {/* 7. Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#242321]">
            Max Price
          </h3>
          <span className="text-xs font-bold text-[#242321]">
            ₹{(filters.maxPrice || 15000).toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="15000"
          step="500"
          value={filters.maxPrice || 15000}
          onChange={handlePriceChange}
          className="w-full accent-[#252522] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-[#77746E] mt-1 font-mono">
          <span>₹1,000</span>
          <span>₹15,000</span>
        </div>
      </div>

      {/* 8. Clear Filters */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#77746E] hover:text-[#242321] transition-colors cursor-pointer font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset all filters</span>
        </button>
      </div>
    </div>
  );

  if (isMobileDrawer) {
    return (
      <div className="fixed inset-0 z-50 flex">
        <div
          className="fixed inset-0 bg-[#252522]/50 backdrop-blur-xs"
          onClick={onCloseMobileDrawer}
        />
        <div className="relative w-4/5 max-w-sm bg-[#F7F5F0] h-full shadow-2xl ml-auto flex flex-col z-10 p-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-[#D8D2C8] mb-6">
            <h2 className="text-sm font-bold tracking-[0.14em] uppercase text-[#242321]">
              Clothing Filters
            </h2>
            <button
              onClick={onCloseMobileDrawer}
              className="p-1 text-[#242321] hover:text-[#77746E]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1">{content}</div>
          <div className="pt-6 mt-6 border-t border-[#D8D2C8]">
            <button
              type="button"
              onClick={onCloseMobileDrawer}
              className="w-full py-3 bg-[#252522] text-[#FAF9F6] text-xs uppercase tracking-[0.14em] font-medium"
            >
              Show Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <aside className="w-64 shrink-0 hidden lg:block pr-8">{content}</aside>;
};

export default ProductFilters;
