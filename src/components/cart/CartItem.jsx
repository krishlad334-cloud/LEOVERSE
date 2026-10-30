import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';
import QuantitySelector from './QuantitySelector';

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="py-6 border-b border-[#D8D2C8] flex gap-4 sm:gap-6">
      {/* Product Image */}
      <Link
        to={`/product/${item.productId}`}
        className="aspect-[4/5] w-20 sm:w-28 bg-[#EAE5DC] shrink-0 overflow-hidden"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center"
        />
      </Link>

      {/* Item info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link
                to={`/product/${item.productId}`}
                className="text-sm font-medium text-[#242321] hover:text-[#77746E] transition-colors"
              >
                {item.name}
              </Link>
              {item.subtitle && (
                <p className="text-xs text-[#77746E] mt-0.5">{item.subtitle}</p>
              )}
            </div>
            <span className="text-sm font-medium text-[#242321] shrink-0">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#77746E] mt-2">
            <span>Size: <strong className="text-[#242321] font-medium">{item.selectedSize}</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              Color:
              <span
                className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                style={{ backgroundColor: item.colorHex }}
              />
              <strong className="text-[#242321] font-medium">{item.selectedColor}</strong>
            </span>
          </div>
        </div>

        {/* Quantity and Remove */}
        <div className="flex items-center justify-between pt-4">
          <QuantitySelector
            size="sm"
            quantity={item.quantity}
            onIncrease={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
            onDecrease={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
          />

          <button
            type="button"
            onClick={() => onRemove(item.cartItemId)}
            className="text-xs text-[#77746E] hover:text-[#242321] flex items-center gap-1.5 transition-colors cursor-pointer"
            aria-label="Remove item"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
