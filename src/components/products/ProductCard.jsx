import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Eye, ShoppingBag, Check } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import QuickViewModal from './QuickViewModal';

export const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const isSaved = isInWishlist(product.id);

  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = product.images?.[1] || primaryImage;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes?.[0] || 'M';
    const defaultColor = product.colors?.[0]?.name || '';
    addToCart(product, defaultSize, defaultColor, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <div className="group flex flex-col h-full select-none bg-[#FAF9F6] border border-transparent hover:border-[#D8D2C8] transition-all p-2 sm:p-2.5">
        {/* Image container */}
        <div className="relative aspect-[4/5] bg-[#EAE5DC]/60 overflow-hidden mb-3">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img
              src={currentImageIndex === 1 ? secondaryImage : primaryImage}
              alt={product.name}
              loading="lazy"
              onMouseEnter={() => product.images?.[1] && setCurrentImageIndex(1)}
              onMouseLeave={() => setCurrentImageIndex(0)}
              className="w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-104"
            />
          </Link>

          {/* Top Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 pointer-events-none z-10">
            {product.badge && (
              <span className="bg-[#242321] text-[#FAF9F6] text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-0.5 shadow-xs">
                {product.badge}
              </span>
            )}
            {product.salePrice && (
              <span className="bg-[#FAF9F6] text-[#242321] text-[9px] font-bold tracking-[0.14em] uppercase px-1.5 py-0.5 border border-[#D8D2C8]">
                SALE
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            className="absolute top-2 right-2 p-2 rounded-full bg-[#FAF9F6]/90 backdrop-blur-xs text-[#242321] hover:bg-[#FAF9F6] transition-colors shadow-xs cursor-pointer z-10"
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                isSaved ? 'fill-[#242321] text-[#242321]' : 'stroke-[1.5]'
              }`}
            />
          </button>

          {/* Quick Actions Overlay on desktop hover */}
          <div className="absolute bottom-2 inset-x-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              type="button"
              onClick={() => setQuickViewOpen(true)}
              className="flex-1 py-2 px-2 bg-[#FAF9F6]/95 hover:bg-[#FAF9F6] text-[#242321] text-center text-[11px] tracking-wider uppercase font-semibold transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>

            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={added}
              className={`p-2 transition-all shadow-md flex items-center justify-center cursor-pointer ${
                added
                  ? 'bg-emerald-800 text-[#FAF9F6]'
                  : 'bg-[#252522] hover:bg-black text-[#FAF9F6]'
              }`}
              title="Add size M to Cart"
            >
              {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col flex-1 justify-between">
          <div>
            {/* Category tag & Rating */}
            <div className="flex items-center justify-between text-[10px] text-[#77746E] uppercase tracking-wider mb-1">
              <span>{product.category}</span>
              <div className="flex items-center gap-1 text-amber-700">
                <Star className="w-3 h-3 fill-current" />
                <span className="font-semibold text-[#242321]">{product.rating}</span>
                <span className="text-[#77746E]">({product.reviewCount})</span>
              </div>
            </div>

            {/* Product Name */}
            <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-[#242321] hover:text-[#77746E] transition-colors line-clamp-1 mb-1">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-xs sm:text-sm font-bold text-[#242321]">
                {formatPrice(product.salePrice || product.price)}
              </span>
              {product.salePrice && (
                <span className="text-[11px] text-[#77746E] line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Sizes badges */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="flex items-center gap-1 mb-2">
                <span className="text-[10px] text-[#77746E] uppercase mr-0.5">Sizes:</span>
                <div className="flex flex-wrap gap-1">
                  {product.sizes.slice(0, 5).map((s) => (
                    <span
                      key={s}
                      className="text-[9px] px-1 py-0.2 bg-[#EAE5DC]/60 text-[#242321] font-mono border border-[#D8D2C8]/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Color preview dots & Quick Add on mobile */}
          <div className="flex items-center justify-between pt-1 border-t border-[#D8D2C8]/50 mt-1">
            {product.colors && product.colors.length > 0 ? (
              <div className="flex items-center gap-1">
                {product.colors.map((color, idx) => (
                  <span
                    key={idx}
                    title={color.name}
                    className="w-2.5 h-2.5 rounded-full border border-black/15"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            ) : <div />}

            {/* Mobile Quick View Pill */}
            <button
              type="button"
              onClick={() => setQuickViewOpen(true)}
              className="text-[10px] uppercase font-bold tracking-wider text-[#242321] hover:underline sm:hidden cursor-pointer"
            >
              Quick View
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
};

export default ProductCard;
