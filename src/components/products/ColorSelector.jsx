import React from 'react';

export const ColorSelector = ({ colors = [], selectedColor, onSelectColor }) => {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#242321]">
          Color: <span className="font-normal text-[#77746E] normal-case tracking-normal">{selectedColor}</span>
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
                  ? 'border-[#242321] ring-1 ring-[#242321]'
                  : 'border-transparent hover:border-[#D8D2C8]'
              }`}
            >
              <span
                className="w-6 h-6 rounded-full border border-black/15 shadow-2xs block"
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
