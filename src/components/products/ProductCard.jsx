import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Eye, ShoppingBag, Check, Video } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { trackWishlistAddition, trackCartAddition } from '../../utils/analytics';
import QuickViewModal from './QuickViewModal';

export const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const isSaved = isInWishlist(product.id);

  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = product.images?.[1] || primaryImage;
  const hasVideo = product.videos && product.videos.length > 0;

  const sellingPrice = product.sellingPrice ?? product.salePrice ?? product.price ?? 1999;
  const mrp = product.mrp ?? product.price ?? sellingPrice;
  const discountPercent = mrp > sellingPrice
    ? Math.round(((mrp - sellingPrice) / mrp) * 100)
    : (product.discountPercent || 0);

  const colors = Array.isArray(product.colors) ? product.colors : [];

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const willBeSaved = !isSaved;
    toggleWishlist(product);
    if (willBeSaved && product.id) {
      trackWishlistAddition(product.id);
    }
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = Array.isArray(product.sizes) ? product.sizes[0] : 'M';
    const defaultColor = colors.length > 0
      ? (typeof colors[0] === 'object' ? colors[0]?.name : colors[0])
      : 'Standard';
    addToCart(product, defaultSize, defaultColor, 1);
    if (product.id) {
      trackCartAddition(product.id);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <div className="group flex flex-col h-full select-none bg-white dark:bg-[#18181C] border border-[#EBE6DD] dark:border-[#27272A] hover:border-[#A68962] dark:hover:border-[#C5A880] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 p-2 sm:p-2.5">
        {/* Image container */}
        <div className="relative aspect-[4/5] bg-[#EAE5DC]/60 dark:bg-[#202026] overflow-hidden rounded-xl mb-2.5">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img
              src={currentImageIndex === 1 ? secondaryImage : primaryImage}
              alt={product.name}
              loading="lazy"
              onMouseEnter={() => product.images?.[1] && setCurrentImageIndex(1)}
              onMouseLeave={() => setCurrentImageIndex(0)}
              className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
            />
          </Link>

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none z-10">
            {discountPercent > 0 && (
              <span className="bg-rose-600 text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-xs">
                {discountPercent}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="bg-[#242321] text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-xs">
                NEW DROP
              </span>
            )}
            {hasVideo && (
              <span className="bg-pink-600/90 text-white text-[8px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded shadow-xs flex items-center space-x-1">
                <Video className="w-2.5 h-2.5" />
                <span>VIDEO</span>
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 dark:bg-[#18181C]/90 backdrop-blur-xs text-[#242321] dark:text-white hover:bg-white dark:hover:bg-[#25252E] transition-all shadow-sm cursor-pointer z-10 active:scale-90"
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                isSaved ? 'fill-rose-600 text-rose-600' : 'stroke-[1.75]'
              }`}
            />
          </button>

          {/* Quick Actions Overlay on desktop hover */}
          <div className="absolute bottom-2.5 inset-x-2.5 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              type="button"
              onClick={() => setQuickViewOpen(true)}
              className="flex-1 py-2 px-2 bg-white/95 dark:bg-[#202026] hover:bg-white dark:hover:bg-[#2A2A34] text-[#242321] dark:text-white text-center text-[10px] tracking-wider uppercase font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>

            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={added}
              className={`p-2 rounded-xl transition-all shadow-md flex items-center justify-center cursor-pointer ${
                added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#1E1E1E] dark:bg-[#2A2A34] hover:bg-black dark:hover:bg-[#353542] text-white'
              }`}
              title="Add to Cart"
            >
              {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col flex-1 justify-between px-1.5 pb-1">
          <div>
            {/* Brand & Rating */}
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider mb-1">
              <span className="font-bold text-[#D5A249] truncate max-w-[130px]">
                {product.brand || 'ATELIER LEO'}
              </span>
              <div className="flex items-center gap-1 text-[#D5A249]">
                <Star className="w-3 h-3 fill-current" />
                <span className="font-bold text-[#2C4152] dark:text-gray-200">{product.rating || 4.8}</span>
              </div>
            </div>

            {/* Product Name */}
            <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-[#2C4152] dark:text-gray-100 hover:text-[#D5A249] transition-colors line-clamp-1 mb-1.5">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h3>

            {/* Price Row: AJIO Style */}
            <div className="flex items-baseline gap-2 mb-2 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-[#2C4152] dark:text-white">
                {formatPrice(sellingPrice)}
              </span>
              {mrp > sellingPrice && (
                <span className="text-[11px] text-gray-400 line-through">
                  {formatPrice(mrp)}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-1 py-0.2 rounded">
                  ({discountPercent}% OFF)
                </span>
              )}
            </div>

            {/* Color Swatch Dots */}
            {colors.length > 0 && (
              <div className="flex items-center gap-1 pt-0.5">
                {colors.slice(0, 4).map((c, cIdx) => {
                  const hex = typeof c === 'object' ? c.hex : '#242321';
                  const cName = typeof c === 'object' ? c.name : c;
                  return (
                    <span
                      key={cIdx}
                      title={cName}
                      className="w-2.5 h-2.5 rounded-full border border-black/20 dark:border-white/20 shadow-2xs"
                      style={{ backgroundColor: hex }}
                    />
                  );
                })}
                {colors.length > 4 && (
                  <span className="text-[9px] text-gray-400 font-mono pl-0.5">
                    +{colors.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  );
};

export default ProductCard;
