import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, Heart, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#252522]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF9F6] dark:bg-[#18181C] border border-[#D8D2C8] dark:border-[#27272A] text-[#242321] dark:text-[#F3EFE6] rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#77746E] dark:text-gray-400 hover:text-[#242321] dark:hover:text-white transition-colors cursor-pointer z-10"
          aria-label="Close Quick View"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Left: Images */}
          <div className="space-y-3">
            <div className="aspect-[4/5] bg-[#EAE5DC] dark:bg-[#202026] overflow-hidden border border-[#D8D2C8] dark:border-[#27272A] rounded-xl relative">
              <img
                src={product.images?.[activeImageIndex] || product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#242321] dark:bg-[#C5A880] text-[#FAF9F6] dark:text-black text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images?.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-16 bg-[#EAE5DC] dark:bg-[#202026] border rounded-lg transition-all overflow-hidden cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#242321] dark:border-[#C5A880] ring-1 ring-[#242321] dark:ring-[#C5A880]'
                        : 'border-[#D8D2C8] dark:border-[#27272A] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info and Options */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68962] dark:text-[#C5A880] block mb-1">
                {product.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#242321] dark:text-white leading-snug">
                {product.name}
              </h3>
              <p className="text-xs text-[#77746E] dark:text-gray-400 mt-0.5">{product.subtitle}</p>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-xs font-semibold text-[#242321] dark:text-white">{product.rating || '4.9'}</span>
                <span className="text-[11px] text-[#77746E] dark:text-gray-400">
                  ({product.reviewCount || 42} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-1 border-t border-b border-[#D8D2C8] dark:border-[#27272A] py-2.5">
              <span className="text-xl font-extrabold text-[#242321] dark:text-white">
                {formatPrice(product.salePrice || product.price)}
              </span>
              {product.salePrice && (
                <>
                  <span className="text-xs text-[#77746E] dark:text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                    Save {formatPrice(product.price - product.salePrice)}
                  </span>
                </>
              )}
            </div>

            {/* Color Swatches */}
            {product.colors?.length > 0 && (
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#242321] dark:text-white block mb-2">
                  Color: <span className="font-normal text-[#77746E] dark:text-gray-400">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      title={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border transition-all p-0.5 cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-[#242321] dark:border-[#C5A880] ring-2 ring-[#242321] dark:ring-[#C5A880]'
                          : 'border-transparent hover:scale-105'
                      }`}
                    >
                      <span
                        className="block w-full h-full rounded-full border border-black/15"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#242321] dark:text-white block mb-2">
                  Size: <span className="font-normal text-[#77746E] dark:text-gray-400">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-9 h-9 px-3 text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer rounded-lg ${
                        selectedSize === s
                          ? 'bg-[#252522] dark:bg-[#C5A880] text-[#FAF9F6] dark:text-black border-[#252522] dark:border-[#C5A880]'
                          : 'bg-[#FAF9F6] dark:bg-[#202026] text-[#242321] dark:text-gray-200 border-[#D8D2C8] dark:border-[#27272A] hover:border-[#242321] dark:hover:border-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 space-y-2.5">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md rounded-xl ${
                    added
                      ? 'bg-emerald-800 text-[#FAF9F6]'
                      : 'bg-[#252522] dark:bg-[#C5A880] hover:bg-black dark:hover:bg-[#d8c09a] text-[#FAF9F6] dark:text-black'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className="p-3 border border-[#D8D2C8] dark:border-[#27272A] hover:border-[#242321] dark:hover:border-white text-[#242321] dark:text-white bg-[#FAF9F6] dark:bg-[#202026] rounded-xl transition-colors cursor-pointer"
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>
              </div>

              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#77746E] dark:text-gray-400 hover:text-[#242321] dark:hover:text-[#C5A880] transition-colors block border border-transparent hover:border-[#D8D2C8] dark:hover:border-[#27272A] rounded-xl"
              >
                View Full Product Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
