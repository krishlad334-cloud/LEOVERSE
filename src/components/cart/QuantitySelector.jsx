import React from 'react';
import { Minus, Plus } from 'lucide-react';

export const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 10,
  size = 'md', // sm | md
}) => {
  const sizeStyles = {
    sm: 'h-8 text-xs',
    md: 'h-11 text-xs sm:text-sm',
  }[size] || 'h-11 text-sm';

  const buttonPadding = size === 'sm' ? 'px-2' : 'px-3';

  return (
    <div className={`inline-flex items-center border border-[#D8D2C8] bg-transparent ${sizeStyles}`}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className={`${buttonPadding} h-full text-[#242321] hover:text-[#77746E] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer`}
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className="w-10 sm:w-12 text-center font-medium text-[#242321] select-none">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`${buttonPadding} h-full text-[#242321] hover:text-[#77746E] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer`}
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default QuantitySelector;
