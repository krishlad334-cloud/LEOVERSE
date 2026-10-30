import React from 'react';

export const SizeSelector = ({ sizes = [], selectedSize, onSelectSize, onOpenSizeGuide }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#242321]">
          Select Size {selectedSize && <span className="font-normal text-[#77746E]">({selectedSize})</span>}
        </span>
        {onOpenSizeGuide && (
          <button
            type="button"
            onClick={onOpenSizeGuide}
            className="text-xs text-[#77746E] hover:text-[#242321] underline underline-offset-4 tracking-wider uppercase transition-colors cursor-pointer"
          >
            Size Guide
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`min-w-11 h-11 px-3 text-xs tracking-wider font-medium uppercase border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#252522] text-[#FAF9F6] border-[#252522]'
                  : 'bg-transparent text-[#242321] border-[#D8D2C8] hover:border-[#242321]'
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
