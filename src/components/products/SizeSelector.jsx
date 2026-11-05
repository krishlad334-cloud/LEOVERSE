import React from 'react';

export const SizeSelector = ({ sizes = [], selectedSize, onSelectSize, onOpenSizeGuide }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-[0.14em] uppercase text-[#2C4152] dark:text-white">
          Select Size {selectedSize && <span className="font-normal text-gray-500 dark:text-gray-400">({selectedSize})</span>}
        </span>
        {onOpenSizeGuide && (
          <button
            type="button"
            onClick={onOpenSizeGuide}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#D5A249] underline underline-offset-4 tracking-wider uppercase transition-colors cursor-pointer"
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
              className={`min-w-11 h-11 px-3 text-xs tracking-wider font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#2C4152] dark:bg-white text-white dark:text-[#2C4152] border-[#2C4152] dark:border-white shadow-xs'
                  : 'bg-white dark:bg-[#1A232C] text-[#2C4152] dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:border-[#D5A249] dark:hover:border-[#D5A249]'
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
