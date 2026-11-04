import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Eye, ShoppingBag, Check, Play, Video } from 'lucide-react';
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

  const isSaved = isInWishlist(product.id);

  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = product.images?.[1] || primaryImage;
  const hasVideo = product.videos && product.videos.length > 0;

  const sellingPrice = product.sellingPrice ?? product.salePrice ?? product.price ?? 1999;
  const mrp = product.mrp ?? product.price ?? sellingPrice;
  const discountPercent = mrp > sellingPrice
    ? Math.round(((mrp - sellingPrice) / mrp) * 100)
    : (product.discountPercent || 0);

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
    const defaultColor = Array.isArray(product.colors)
      ? (typeof product.colors[0] === 'object' ? product.colors[0]?.name : product.colors[0])
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
      <div className="group flex flex-col h-full select-none bg-white dark:bg-[#18181C] border border-[#EBE6DD] dark:border-[#27272A] hover:border-[#C5A880] dark:hover:border-[#C5A880] rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 p-2 sm:p-2.5">
        {/* Image container */}
        <div className="relative aspect-[4/5] bg-[#EAE5DC]/60 dark:bg-[#202026] overflow-hidden rounded-lg mb-2.5">
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
            {discountPercent > 0 && (
              <span className="bg-rose-600 text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-xs">
                {discountPercent}% OFF
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
            className="absolute top-2 right-2 p-2 rounded-full bg-white/90 dark:bg-[#18181C]/90 backdrop-blur-xs text-[#242321] dark:text-white hover:bg-white dark:hover:bg-[#25252E] transition-colors shadow-xs cursor-pointer z-10"
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                isSaved ? 'fill-rose-600 text-rose-600' : 'stroke-[1.75]'
              }`}
            />
          </button>

          {/* Quick Actions Overlay on desktop hover */}
          <div className="absolute bottom-2 inset-x-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              type="button"
              onClick={() => setQuickViewOpen(true)}
              className="flex-1 py-2 px-2 bg-white/95 dark:bg-[#202026] hover:bg-white dark:hover:bg-[#2A2A34] text-[#242321] dark:text-white text-center text-[10px] tracking-wider uppercase font-bold rounded-lg transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>

            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={added}
              className={`p-2 rounded-lg transition-all shadow-md flex items-center justify-center cursor-pointer ${
                added
                  ? 'bg-emerald-800 text-white'
                  : 'bg-[#1E1E1E] dark:bg-[#2A2A34] hover:bg-black dark:hover:bg-[#353542] text-white'
              }`}
              title="Add to Cart"
            >
              {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col flex-1 justify-between px-1">
          <div>
            {/* Department / Category tag & Rating */}
            <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              <span className="font-semibold text-[#A68962] dark:text-[#C5A880]">{product.department || product.category}</span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-3 h-3 fill-current" />
                <span className="font-bold text-[#1E1E1E] dark:text-gray-200">{product.rating || 4.8}</span>
              </div>
            </div>

            {/* Product Name */}
            <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-[#1E1E1E] dark:text-gray-100 hover:text-[#A68962] dark:hover:text-[#C5A880] transition-colors line-clamp-1 mb-1.5">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xs sm:text-sm font-bold text-[#1E1E1E] dark:text-white">
                {formatPrice(sellingPrice)}
              </span>
              {mrp > sellingPrice && (
                <span className="text-[11px] text-gray-400 dark:text-gray-500 line-through">
                  {formatPrice(mrp)}
                </span>
              )}
            </div>
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
