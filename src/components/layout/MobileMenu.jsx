import React from 'react';
import { Link } from 'react-router-dom';
import { X, Search, Heart, ShoppingBag, User, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import categories from '../../data/categories';

export const MobileMenu = ({ isOpen, onClose }) => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#252522]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out drawer */}
      <div className="relative w-4/5 max-w-sm bg-[#F7F5F0] h-full shadow-2xl flex flex-col z-10 border-r border-[#D8D2C8] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#D8D2C8]">
          <Link
            to="/"
            onClick={onClose}
            className="text-lg font-bold tracking-[0.2em] text-[#242321] uppercase"
          >
            LEOVERSE
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 text-[#242321] hover:text-[#77746E] transition-colors cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search quick button */}
        <div className="p-4 border-b border-[#D8D2C8] bg-[#EAE5DC]/40">
          <Link
            to="/search"
            onClick={onClose}
            className="flex items-center gap-3 w-full px-4 py-2.5 bg-[#FAF9F6] border border-[#D8D2C8] text-xs text-[#77746E] tracking-wider uppercase font-medium"
          >
            <Search className="w-4 h-4 text-[#77746E]" />
            <span>Search men's clothing...</span>
          </Link>
        </div>

        {/* Quick Main Links */}
        <div className="px-6 pt-4 pb-2 space-y-2 text-xs uppercase tracking-wider font-semibold border-b border-[#D8D2C8]/60">
          <Link
            to="/shop"
            onClick={onClose}
            className="block p-2.5 text-center bg-[#FAF9F6] border border-[#D8D2C8] text-[#242321] hover:bg-[#252522] hover:text-[#FAF9F6] transition-colors"
          >
            Explore All Menswear
          </Link>
          <div className="grid grid-cols-2 gap-2">
          <Link
            to="/new-arrivals"
            onClick={onClose}
            className="p-2.5 text-center bg-[#FAF9F6] border border-[#D8D2C8] text-[#242321] hover:bg-[#252522] hover:text-[#FAF9F6] transition-colors"
          >
            New Arrivals
          </Link>
          <Link
            to="/sale"
            onClick={onClose}
            className="p-2.5 text-center bg-[#252522] text-[#FAF9F6] hover:bg-black transition-colors"
          >
            Sale & Offers
          </Link>
          </div>
        </div>

        {/* Navigation links & 11 Categories */}
        <nav className="flex-1 px-6 py-4 space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D8D2C8]/50">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#77746E]">
                Men's Clothing Categories
              </span>
              <Link
                to="/shop"
                onClick={onClose}
                className="text-[10px] uppercase font-bold text-[#242321]"
              >
                View All
              </Link>
            </div>

            <div className="space-y-1">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between py-2 text-xs tracking-wide font-medium text-[#242321] hover:text-[#77746E] border-b border-[#D8D2C8]/30"
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-[#77746E] font-normal">({cat.itemCount})</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2 space-y-2 border-t border-[#D8D2C8]/60">
            <Link
              to="/collections"
              onClick={onClose}
              className="flex items-center justify-between py-1.5 text-xs tracking-wider font-semibold text-[#242321] uppercase hover:text-[#77746E]"
            >
              <span>Collections</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            </Link>
            <Link
              to="/bestsellers"
              onClick={onClose}
              className="block py-1.5 text-xs tracking-wider font-medium text-[#242321] uppercase hover:text-[#77746E]"
            >
              Bestsellers
            </Link>
            <Link
              to="/about"
              onClick={onClose}
              className="block py-1.5 text-xs tracking-wider font-medium text-[#242321] uppercase hover:text-[#77746E]"
            >
              About LEOVERSE
            </Link>
            <Link
              to="/contact"
              onClick={onClose}
              className="block py-1.5 text-xs tracking-wider font-medium text-[#242321] uppercase hover:text-[#77746E]"
            >
              Client Care & Contact
            </Link>
            <Link
              to="/faq"
              onClick={onClose}
              className="block py-1.5 text-xs tracking-wider font-medium text-[#242321] uppercase hover:text-[#77746E]"
            >
              Frequently Asked Questions
            </Link>
          </div>
        </nav>

        {/* Footer actions */}
        <div className="p-6 border-t border-[#D8D2C8] bg-[#EAE5DC]/50 space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <Link
              to="/wishlist"
              onClick={onClose}
              className="flex flex-col items-center justify-center p-2.5 bg-[#FAF9F6] border border-[#D8D2C8] hover:border-[#242321] transition-colors relative"
            >
              <Heart className="w-4 h-4 text-[#242321] mb-1" />
              <span className="text-[10px] tracking-wider uppercase font-medium">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#242321] text-[#FAF9F6] text-[9px] flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              onClick={onClose}
              className="flex flex-col items-center justify-center p-2.5 bg-[#FAF9F6] border border-[#D8D2C8] hover:border-[#242321] transition-colors relative"
            >
              <ShoppingBag className="w-4 h-4 text-[#242321] mb-1" />
              <span className="text-[10px] tracking-wider uppercase font-medium">Bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#252522] text-[#FAF9F6] text-[9px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/account"
              onClick={onClose}
              className="flex flex-col items-center justify-center p-2.5 bg-[#FAF9F6] border border-[#D8D2C8] hover:border-[#242321] transition-colors"
            >
              <User className="w-4 h-4 text-[#242321] mb-1" />
              <span className="text-[10px] tracking-wider uppercase font-medium">Account</span>
            </Link>
          </div>

          <div className="text-center pt-2">
            <p className="text-[11px] text-[#77746E]">
              Everyday Essentials. Elevated. • Men's Clothing Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
