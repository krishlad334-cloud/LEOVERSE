import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ChevronDown, Truck, RotateCcw, Star, Check, MapPin, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import SizeSelector from './SizeSelector';
import ColorSelector from './ColorSelector';
import QuantitySelector from '../cart/QuantitySelector';
import Button from '../common/Button';

export const ProductInfo = ({ product, onOpenSizeGuide }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('details');
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setDeliveryStatus({
        valid: true,
        date: 'Standard Delivery by 3-4 days',
        express: 'Express Delivery in 24-48 hrs available for prepaid orders',
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
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#77746E]">
            LEOVERSE
          </span>
          {product.badge && (
            <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 bg-[#EAE5DC] text-[#242321]">
              {product.badge}
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#242321]">
          {product.name}
        </h1>

        {/* Rating and review link */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex items-center text-amber-600">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${
                  star <= Math.round(product.rating || 4.8)
                    ? 'fill-amber-500 text-amber-500'
                    : 'text-[#D8D2C8]'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-[#242321]">
            {product.rating || 4.8}
          </span>
          <span className="text-xs text-[#77746E]">•</span>
          <a
            href="#reviews-section"
            className="text-xs text-[#77746E] underline hover:text-[#242321]"
          >
            {product.reviewsCount || 42} reviews
          </a>
        </div>

        {product.subtitle && (
          <p className="text-sm text-[#77746E] pt-1">{product.subtitle}</p>
        )}
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3 pb-4 border-b border-[#D8D2C8]">
        {product.salePrice ? (
          <>
            <span className="text-xl sm:text-2xl font-medium text-[#242321]">
              {formatPrice(product.salePrice)}
            </span>
            <span className="text-base text-[#77746E] line-through">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs uppercase font-medium tracking-wider text-[#9B7D72] bg-[#EAE5DC] px-2 py-0.5">
              Special Offer
            </span>
          </>
        ) : (
          <span className="text-xl sm:text-2xl font-medium text-[#242321]">
            {formatPrice(product.price)}
          </span>
        )}
        <span className="text-xs text-[#77746E] ml-auto">Inclusive of all taxes</span>
      </div>

      {/* Key specifications pills */}
      <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wider">
        {product.fabric && (
          <span className="px-2.5 py-1 bg-[#EAE5DC]/60 border border-[#D8D2C8] text-[#242321]">
            <strong>Fabric:</strong> {product.fabric}
          </span>
        )}
        {product.fit && (
          <span className="px-2.5 py-1 bg-[#EAE5DC]/60 border border-[#D8D2C8] text-[#242321]">
            <strong>Fit:</strong> {product.fit}
          </span>
        )}
        {product.occasion && (
          <span className="px-2.5 py-1 bg-[#EAE5DC]/60 border border-[#D8D2C8] text-[#242321]">
            <strong>Occasion:</strong> {product.occasion}
          </span>
        )}
      </div>

      {/* Description excerpt */}
      <p className="text-sm text-[#77746E] leading-relaxed">
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
            <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#242321] block">
              Quantity
            </span>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((q) => Math.min(10, q + 1))}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            />
          </div>

          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            className="self-end p-3 sm:p-3.5 border border-[#D8D2C8] hover:border-[#242321] transition-colors cursor-pointer flex items-center gap-2 text-xs uppercase tracking-wider text-[#242321]"
            aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart
              className={`w-5 h-5 ${
                isSaved ? 'fill-[#242321] text-[#242321]' : 'text-[#242321]'
              }`}
            />
            <span className="sm:hidden font-medium">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>

        <div className="space-y-2.5 pt-1">
          <Button
            onClick={handleAddToCart}
            variant="primary"
            fullWidth
            size="md"
          >
            Add to Bag • {formatPrice((product.salePrice ?? product.price) * quantity)}
          </Button>

          <Button
            onClick={handleBuyNow}
            variant="secondary"
            fullWidth
            size="md"
          >
            Buy Now (Instant Checkout)
          </Button>
        </div>
      </div>

      {/* Pincode & Delivery Checker */}
      <div className="p-4 bg-[#EAE5DC]/30 border border-[#D8D2C8] space-y-2 text-xs">
        <div className="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-[#242321]">
          <MapPin className="w-4 h-4 text-[#77746E]" />
          <span>Estimate Delivery & Availability</span>
        </div>
        <form onSubmit={handleCheckPincode} className="flex gap-2">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 6-digit PIN code"
            className="bg-[#F7F5F0] border border-[#D8D2C8] px-3 py-2 text-xs flex-1 focus:outline-none focus:border-[#242321]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#242321] text-[#F7F5F0] text-xs font-semibold uppercase tracking-wider hover:bg-[#383733] transition-colors cursor-pointer"
          >
            Check
          </button>
        </form>
        {deliveryStatus && (
          <div className="pt-1">
            {deliveryStatus.valid ? (
              <div className="space-y-1 text-emerald-800">
                <p className="flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> {deliveryStatus.date}
                </p>
                <p className="text-[11px] text-[#77746E]">{deliveryStatus.express}</p>
              </div>
            ) : (
              <p className="text-red-700">{deliveryStatus.message}</p>
            )}
          </div>
        )}
      </div>

      {/* Value props bullets */}
      <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#D8D2C8] text-xs text-[#77746E]">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#242321] shrink-0" />
          <span>Complimentary shipping above ₹2,999</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-[#242321] shrink-0" />
          <span>30-Day effortless returns</span>
        </div>
      </div>

      {/* Accordions */}
      <div className="divide-y divide-[#D8D2C8] border-b border-[#D8D2C8]">
        {/* Accordion 1: Details */}
        <div>
          <button
            type="button"
            onClick={() => toggleAccordion('details')}
            className="w-full py-4 flex items-center justify-between text-left text-xs font-semibold tracking-[0.14em] uppercase text-[#242321] cursor-pointer"
          >
            <span>Product Details & Tailoring</span>
            <ChevronDown
              className={`w-4 h-4 text-[#77746E] transition-transform duration-200 ${
                openAccordion === 'details' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordion === 'details' && (
            <div className="pb-5 text-xs text-[#77746E] space-y-2 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1.5">
                {product.details?.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Accordion 2: Fabric & Care */}
        <div>
          <button
            type="button"
            onClick={() => toggleAccordion('fabric')}
            className="w-full py-4 flex items-center justify-between text-left text-xs font-semibold tracking-[0.14em] uppercase text-[#242321] cursor-pointer"
          >
            <span>Fabric & Care Instructions</span>
            <ChevronDown
              className={`w-4 h-4 text-[#77746E] transition-transform duration-200 ${
                openAccordion === 'fabric' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordion === 'fabric' && (
            <div className="pb-5 text-xs text-[#77746E] leading-relaxed">
              <p>{product.fabricCare}</p>
            </div>
          )}
        </div>

        {/* Accordion 3: Shipping */}
        <div>
          <button
            type="button"
            onClick={() => toggleAccordion('shipping')}
            className="w-full py-4 flex items-center justify-between text-left text-xs font-semibold tracking-[0.14em] uppercase text-[#242321] cursor-pointer"
          >
            <span>Shipping & Exchanges</span>
            <ChevronDown
              className={`w-4 h-4 text-[#77746E] transition-transform duration-200 ${
                openAccordion === 'shipping' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordion === 'shipping' && (
            <div className="pb-5 text-xs text-[#77746E] leading-relaxed space-y-2">
              <p>
                All orders are dispatched from our regional atelier within 24 to 48 hours. Orders above ₹2,999 receive complimentary expedited transit (2–4 business days).
              </p>
              <p>
                We offer a hassle-free 30-day exchange and return window on all unworn items in original packaging.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
