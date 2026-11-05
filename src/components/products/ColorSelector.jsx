import React from 'react';

export const ColorSelector = ({ colors = [], selectedColor, onSelectColor }) => {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-[0.14em] uppercase text-[#2C4152] dark:text-white">
          Color: <span className="font-normal text-gray-500 dark:text-gray-400 normal-case tracking-normal">{selectedColor}</span>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {colors.map((color) => {
          const isSelected = selectedColor === color.name;
          return (
            <button
              key={color.name}
              type="button"
              onClick={() => onSelectColor(color.name)}
              title={color.name}
              className={`group flex items-center gap-2 p-1 border rounded-full transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#2C4152] dark:border-[#D5A249] ring-2 ring-[#2C4152]/30 dark:ring-[#D5A249]/40'
                  : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <span
                className="w-6 h-6 rounded-full border border-black/15 dark:border-white/20 shadow-2xs block"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
