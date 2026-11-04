import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ChevronDown,
  Truck,
  RotateCcw,
  Star,
  Check,
  MapPin,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  Zap,
  ArrowRight
} from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { trackCartAddition, trackWishlistAddition } from '../../utils/analytics';
import SizeSelector from './SizeSelector';
import ColorSelector from './ColorSelector';
import QuantitySelector from '../cart/QuantitySelector';

export const ProductInfo = ({ product, onOpenSizeGuide }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(
    typeof product.colors?.[0] === 'object' ? product.colors[0]?.name : (product.colors?.[0] || 'Standard')
  );
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('details');
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [addedToast, setAddedToast] = useState(false);

  const isSaved = isInWishlist(product.id);

  const sellingPrice = product.sellingPrice ?? product.salePrice ?? product.price;
  const mrp = product.mrp ?? product.price ?? sellingPrice;
  const discountPercent = mrp > sellingPrice
    ? Math.round(((mrp - sellingPrice) / mrp) * 100)
    : (product.discountPercent || 0);

  const isLowStock = product.stock !== undefined && product.stock <= 5 && product.stock > 0;
  const isOutOfStock = product.stock !== undefined && product.stock === 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    // Track database event
    if (product.id) {
      trackCartAddition(product.id);
    }
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleToggleWishlist = () => {
    const willBeSaved = !isSaved;
    toggleWishlist(product);
    if (willBeSaved && product.id) {
      trackWishlistAddition(product.id);
    }
  };

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setDeliveryStatus({
        valid: true,
        date: 'Guaranteed Express Delivery by ' + new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        express: 'Free shipping on orders above ₹2,499. Pay on delivery available.',
      });
    } else {
      setDeliveryStatus({
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code.',
      });
    }
  };

  return (
    <div className="space-y-6 lg:max-w-xl">
      {/* Brand & Badge */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#A68962] dark:text-[#C5A880]">
            {product.brand || 'ATELIER LEO'}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#EAE5DC] dark:bg-[#202026] text-[#242321] dark:text-gray-200 rounded">
            {product.department || 'Fashion'}
          </span>
          {discountPercent > 0 && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-rose-600 text-white rounded">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight text-[#1E1E1E] dark:text-white">
          {product.name}
        </h1>

        {/* Rating and review link */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex items-center text-amber-500">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${
                  star <= Math.round(product.rating || 4.8)
                    ? 'fill-amber-500 text-amber-500'
                    : 'text-[#D8D2C8] dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-[#1E1E1E] dark:text-white">
            {product.rating || 4.8}
          </span>
          <span className="text-xs text-gray-400">•</span>
          <a
            href="#reviews-section"
            className="text-xs text-gray-600 dark:text-gray-400 underline hover:text-[#1E1E1E] dark:hover:text-white"
          >
            {product.reviewCount || 42} verified customer reviews
          </a>
        </div>
      </div>

      {/* Price & Savings */}
      <div className="pb-4 border-b border-[#E5E0D6] dark:border-[#27272A] space-y-1">
        <div className="flex items-baseline gap-3">
          <span className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] dark:text-white">
            {formatPrice(sellingPrice)}
          </span>
          {mrp > sellingPrice && (
            <>
              <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                {formatPrice(mrp)}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
                Save {formatPrice(mrp - sellingPrice)}
              </span>
            </>
          )}
        </div>
        <p className="text-[11px] text-gray-500 dark:text-gray-400">Inclusive of all taxes & luxury presentation box</p>
      </div>

      {/* Stock Alert Badge */}
      {isLowStock && (
        <div className="p-2.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-lg flex items-center space-x-2 text-xs text-amber-900 dark:text-amber-200 font-semibold">
          <Zap className="w-4 h-4 text-amber-600 fill-amber-600 shrink-0" />
          <span>Only {product.stock} units left in stock — order soon!</span>
        </div>
      )}

      {isOutOfStock && (
        <div className="p-2.5 bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800 rounded-lg text-xs text-red-900 dark:text-red-200 font-semibold">
          Currently Out of Stock. Join waitlist below.
        </div>
      )}

      {/* Description */}
      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {product.description}
      </p>

      {/* Color selector */}
      {product.colors && product.colors.length > 0 && (
        <ColorSelector
          colors={product.colors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
      )}

      {/* Size selector */}
      {product.sizes && product.sizes.length > 0 && (
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          onOpenSizeGuide={onOpenSizeGuide}
        />
      )}

      {/* Quantity & CTA buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#1E1E1E] dark:text-white block">
              Quantity
            </span>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            />
          </div>

          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`self-end p-3 sm:p-3.5 border transition-all cursor-pointer flex items-center gap-2 text-xs uppercase tracking-wider rounded-xl ${
              isSaved
                ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-600 font-bold'
                : 'border-[#D8D2C8] dark:border-[#2E2E36] hover:border-black dark:hover:border-white text-[#1E1E1E] dark:text-white'
            }`}
            aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
            <span>{isSaved ? 'Saved to Wishlist' : 'Save to Wishlist'}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="w-full py-4 bg-[#1E1E1E] dark:bg-white hover:bg-[#333333] dark:hover:bg-gray-100 text-white dark:text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag • {formatPrice(sellingPrice * quantity)}</span>
          </button>

          <Link
            to="/cart"
            className="w-full py-3.5 bg-[#C5A880] hover:bg-[#B3956E] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition flex items-center justify-center space-x-2"
          >
            <span>Proceed to Instant Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Added to cart toast feedback */}
        {addedToast && (
          <div className="p-3 bg-emerald-900 text-emerald-100 rounded-xl text-xs flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Added to shopping bag successfully!</span>
            </div>
            <Link to="/cart" className="underline font-bold text-white">
              View Bag
            </Link>
          </div>
        )}
      </div>

      {/* Pincode & Delivery Checker */}
      <div className="p-4 bg-[#F8F6F2] dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-xl space-y-2 text-xs">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#1E1E1E] dark:text-white">
          <MapPin className="w-4 h-4 text-[#A68962] dark:text-[#C5A880]" />
          <span>Delivery Details & Pincode Checker</span>
        </div>
        <form onSubmit={handleCheckPincode} className="flex gap-2">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 6-digit PIN code"
            className="bg-white dark:bg-[#202026] border border-[#DCD5C9] dark:border-[#2E2E36] px-3.5 py-2.5 text-xs flex-1 rounded-lg focus:outline-none focus:border-[#A68962] text-black dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-[#1E1E1E] dark:bg-[#C5A880] text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-black transition cursor-pointer"
          >
            Check
          </button>
        </form>
        {deliveryStatus && (
          <div className="pt-1">
            {deliveryStatus.valid ? (
              <div className="space-y-1 text-emerald-800 dark:text-emerald-400">
                <p className="flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {deliveryStatus.date}
                </p>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">{deliveryStatus.express}</p>
              </div>
            ) : (
              <p className="text-red-700 dark:text-red-400 font-medium">{deliveryStatus.message}</p>
            )}
          </div>
        )}
      </div>

      {/* Value Badges */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E5E0D6] dark:border-[#27272A] text-center text-[10px] text-gray-600 dark:text-gray-300 uppercase tracking-wider font-semibold">
        <div className="p-2 bg-[#F8F6F2] dark:bg-[#18181C] rounded-lg">
          <Truck className="w-4 h-4 mx-auto mb-1 text-[#A68962] dark:text-[#C5A880]" />
          <span>Express Delivery</span>
        </div>
        <div className="p-2 bg-[#F8F6F2] dark:bg-[#18181C] rounded-lg">
          <RotateCcw className="w-4 h-4 mx-auto mb-1 text-[#A68962] dark:text-[#C5A880]" />
          <span>30-Day Returns</span>
        </div>
        <div className="p-2 bg-[#F8F6F2] dark:bg-[#18181C] rounded-lg">
          <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-[#A68962] dark:text-[#C5A880]" />
          <span>100% Genuine</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
