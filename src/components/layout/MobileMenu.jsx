import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Heart,
  ShoppingBag,
  User,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Tag,
  Package,
  MapPin,
  Moon,
  Sun,
  ExternalLink,
  Trash2,
  Check,
  Truck,
  ArrowRight,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { MEGA_MENU_CONFIG } from '../../services/productService';
import { formatPrice } from '../../utils/formatPrice';

export const MobileMenu = ({ isOpen, onClose, initialTab = 'shop' }) => {
  const {
    cartItems,
    cartCount,
    subtotal,
    isFreeShipping,
    amountToFreeShipping,
    addToCart,
    removeFromCart
  } = useCart();
  const { wishlistProducts, wishlistCount, removeFromWishlist } = useWishlist();
  const { isDark, toggleTheme } = useTheme();

  // Active top-level mode: 'shop' | 'account' | 'wishlist' | 'bag'
  const [activeMainTab, setActiveMainTab] = useState(initialTab || 'shop');
  const [activeDept, setActiveDept] = useState('men');
  const [expandedSection, setExpandedSection] = useState(null);
  const [addedWishlistId, setAddedWishlistId] = useState(null);

  // Sync initialTab when drawer is opened during render to prevent cascading renders
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [prevInitialTab, setPrevInitialTab] = useState(initialTab);
  if (isOpen !== prevIsOpen || initialTab !== prevInitialTab) {
    setPrevIsOpen(isOpen);
    setPrevInitialTab(initialTab);
    if (isOpen) {
      setActiveMainTab(initialTab || 'shop');
      setExpandedSection(null);
    }
  }

  if (!isOpen) return null;

  const currentConfig = MEGA_MENU_CONFIG[activeDept] || MEGA_MENU_CONFIG.men;

  const toggleSection = (idx) => {
    setExpandedSection(expandedSection === idx ? null : idx);
  };

  const handleMoveWishlistToCart = (product) => {
    const size = product.sizes?.[0] || 'M';
    const color = typeof product.colors?.[0] === 'object'
      ? product.colors[0]?.name
      : (product.colors?.[0] || 'Standard');
    addToCart(product, size, color, 1);
    removeFromWishlist(product.id);
    setAddedWishlistId(product.id);
    setTimeout(() => setAddedWishlistId(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-[88vw] max-w-sm bg-white dark:bg-[#121A21] text-[#242321] dark:text-[#F3EFE6] h-full shadow-2xl flex flex-col z-10 border-r border-[#EAE5DC] dark:border-[#27272A] overflow-hidden">
        
        {/* Top Header: Brand Logo & Close Button */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121A21] shrink-0">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-2 group"
          >
            <span className="font-serif text-xl font-black tracking-[0.18em] text-[#2C4152] dark:text-white uppercase">
              LEOVERSE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D5A249]" />
          </Link>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-black dark:hover:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close navigation drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 3 TOP OPTIONS QUICK BAR (User, Wishlist, Bag)                 */}
        {/* Exact 3 options with live badges as requested                 */}
        {/* ------------------------------------------------------------- */}
        <div className="p-2.5 bg-[#F8F8F8] dark:bg-[#0E151B] border-b border-gray-200 dark:border-gray-800 shrink-0">
          <div className="grid grid-cols-3 gap-2">
            
            {/* 1. Account Option */}
            <button
              type="button"
              onClick={() => setActiveMainTab(activeMainTab === 'account' ? 'shop' : 'account')}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer border ${
                activeMainTab === 'account'
                  ? 'bg-[#2C4152] dark:bg-[#D5A249] text-white dark:text-[#121A21] border-transparent shadow-xs font-bold scale-[0.99]'
                  : 'bg-white dark:bg-[#1A232C] text-[#2C4152] dark:text-white border-gray-200 dark:border-gray-700/80 hover:border-[#D5A249]'
              }`}
            >
              <User className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] uppercase tracking-wider font-semibold">Account</span>
            </button>

            {/* 2. Wishlist Option */}
            <button
              type="button"
              onClick={() => setActiveMainTab(activeMainTab === 'wishlist' ? 'shop' : 'wishlist')}
              className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer border ${
                activeMainTab === 'wishlist'
                  ? 'bg-[#2C4152] dark:bg-[#D5A249] text-white dark:text-[#121A21] border-transparent shadow-xs font-bold scale-[0.99]'
                  : 'bg-white dark:bg-[#1A232C] text-[#2C4152] dark:text-white border-gray-200 dark:border-gray-700/80 hover:border-[#D5A249]'
              }`}
            >
              <div className="relative">
                <Heart className={`w-5 h-5 mb-0.5 ${wishlistCount > 0 && activeMainTab !== 'wishlist' ? 'text-rose-600' : ''}`} />
                {wishlistCount > 0 && (
                  <span className={`absolute -top-1 -right-3 px-1.5 py-0.2 text-[9px] font-black rounded-full ${
                    activeMainTab === 'wishlist'
                      ? 'bg-rose-500 text-white'
                      : 'bg-rose-600 text-white'
                  }`}>
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold">Wishlist</span>
            </button>

            {/* 3. Shopping Bag Option */}
            <button
              type="button"
              onClick={() => setActiveMainTab(activeMainTab === 'bag' ? 'shop' : 'bag')}
              className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer border ${
                activeMainTab === 'bag'
                  ? 'bg-[#2C4152] dark:bg-[#D5A249] text-white dark:text-[#121A21] border-transparent shadow-xs font-bold scale-[0.99]'
                  : 'bg-white dark:bg-[#1A232C] text-[#2C4152] dark:text-white border-gray-200 dark:border-gray-700/80 hover:border-[#D5A249]'
              }`}
            >
              <div className="relative">
                <ShoppingBag className={`w-5 h-5 mb-0.5 ${cartCount > 0 && activeMainTab !== 'bag' ? 'text-[#D5A249]' : ''}`} />
                {cartCount > 0 && (
                  <span className={`absolute -top-1 -right-3 px-1.5 py-0.2 text-[9px] font-black rounded-full ${
                    activeMainTab === 'bag'
                      ? 'bg-white text-[#2C4152]'
                      : 'bg-[#2C4152] dark:bg-[#D5A249] text-white dark:text-[#121A21]'
                  }`}>
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold">Bag</span>
            </button>
          </div>

          {/* Quick Return Bar when browsing a specific sub-option panel */}
          {activeMainTab !== 'shop' && (
            <button
              type="button"
              onClick={() => setActiveMainTab('shop')}
              className="mt-2 w-full py-1.5 px-3 bg-white dark:bg-[#1A232C] border border-gray-200 dark:border-gray-700/80 rounded-lg text-[11px] font-semibold text-[#2C4152] dark:text-[#D5A249] hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Package className="w-3.5 h-3.5 text-[#D5A249]" />
              <span>← Back to Wardrobe Collections</span>
            </button>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB CONTENT PANELS                                            */}
        {/* ------------------------------------------------------------- */}
        <div className="flex-1 overflow-y-auto">

          {/* ============================================================ */}
          {/* PANEL 1: ACCOUNT SUB-OPTIONS                                 */}
          {/* ============================================================ */}
          {activeMainTab === 'account' && (
            <div className="p-4 space-y-4 animate-in fade-in duration-150">
              {/* Member Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#2C4152] to-[#1E2B37] text-white shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#D5A249]/20 text-[#D5A249] border border-[#D5A249]/30">
                    Client Privilege Access
                  </span>
                  <span className="text-[10px] text-white/60 font-mono">ATELIER LEO</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    Welcome to LEOVERSE
                  </h3>
                  <p className="text-[11px] text-gray-300 mt-0.5">
                    Sign in to access your saved sizing, orders, and bespoke privileges.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Link
                    to="/login"
                    onClick={onClose}
                    className="flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider bg-[#D5A249] hover:bg-[#c39138] text-[#121A21] rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={onClose}
                    className="flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all cursor-pointer border border-white/20 active:scale-95"
                  >
                    Register
                  </Link>
                </div>
              </div>

              {/* Theme Toggle Sub-Option */}
              <div className="p-3 bg-gray-50 dark:bg-[#1A232C] rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${isDark ? 'bg-[#D5A249]/20 text-[#D5A249]' : 'bg-amber-100 text-amber-600'}`}>
                    {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#2C4152] dark:text-white block leading-tight">
                      {isDark ? 'Dark Mode' : 'Light Mode'}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">
                      Toggle aesthetic theme
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 shrink-0 p-0.5 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                    isDark ? 'bg-[#D5A249]' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                  aria-label="Toggle theme"
                >
                  <span
                    className={`inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                      isDark ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  >
                    {isDark ? (
                      <Moon className="w-3 h-3 text-[#2C4152]" strokeWidth={2.2} />
                    ) : (
                      <Sun className="w-3 h-3 text-amber-500" strokeWidth={2.2} />
                    )}
                  </span>
                </button>
              </div>

              {/* Account Sub-Options Navigation List */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-1 block mb-1">
                  Wardrobe & Concierge
                </span>

                <Link
                  to="/account"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 dark:bg-[#1A232C]/70 hover:bg-gray-100 dark:hover:bg-[#1A232C] transition-colors border border-gray-100 dark:border-gray-800 text-xs font-semibold text-[#2C4152] dark:text-gray-100 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-[#D5A249]" />
                    <div>
                      <span className="block">My Account Profile</span>
                      <span className="text-[10px] text-gray-400 font-normal">Personal sizing & preferences</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>

                <Link
                  to="/account/orders"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 dark:bg-[#1A232C]/70 hover:bg-gray-100 dark:hover:bg-[#1A232C] transition-colors border border-gray-100 dark:border-gray-800 text-xs font-semibold text-[#2C4152] dark:text-gray-100 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-[#D5A249]" />
                    <div>
                      <span className="block">Orders & Live Tracking</span>
                      <span className="text-[10px] text-gray-400 font-normal">Delivery status & invoices</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>

                <Link
                  to="/account/addresses"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 dark:bg-[#1A232C]/70 hover:bg-gray-100 dark:hover:bg-[#1A232C] transition-colors border border-gray-100 dark:border-gray-800 text-xs font-semibold text-[#2C4152] dark:text-gray-100 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#D5A249]" />
                    <div>
                      <span className="block">Saved Delivery Addresses</span>
                      <span className="text-[10px] text-gray-400 font-normal">Home, salon & office destinations</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>

                <Link
                  to="/contact"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 dark:bg-[#1A232C]/70 hover:bg-gray-100 dark:hover:bg-[#1A232C] transition-colors border border-gray-100 dark:border-gray-800 text-xs font-semibold text-[#2C4152] dark:text-gray-100 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-4 h-4 text-[#D5A249]" />
                    <div>
                      <span className="block">Digital Concierge & Appointments</span>
                      <span className="text-[10px] text-gray-400 font-normal">Direct WhatsApp & email care</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>

                {/* Studio Admin Link */}
                <a
                  href="http://localhost:5174"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#D5A249]/10 hover:bg-[#D5A249]/20 transition-colors border border-[#D5A249]/30 text-xs font-bold text-[#2C4152] dark:text-white cursor-pointer mt-2"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#D5A249]" />
                    <div>
                      <span className="block">Studio Admin Dashboard</span>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 font-normal">Catalog & inquiries manager</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D5A249]" />
                </a>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* PANEL 2: WISHLIST SUB-OPTIONS                                */}
          {/* ============================================================ */}
          {activeMainTab === 'wishlist' && (
            <div className="p-4 space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#D5A249]">
                    Private Curation
                  </span>
                  <h3 className="text-sm font-bold text-[#2C4152] dark:text-white">
                    Saved Pieces ({wishlistCount})
                  </h3>
                </div>
                <Link
                  to="/wishlist"
                  onClick={onClose}
                  className="text-[11px] font-bold text-[#2C4152] dark:text-[#D5A249] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Full View</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {wishlistProducts.length === 0 ? (
                <div className="text-center py-10 px-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-700 dark:text-gray-200">
                      Your Wishlist is Empty
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Save bespoke menswear garments you appreciate by tapping the heart icon on any product.
                    </p>
                  </div>
                  <Link
                    to="/new-arrivals"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2C4152] text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-xs hover:bg-[#1f2e3a] transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D5A249]" />
                    <span>Explore New Drops</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-2.5 max-h-[52vh] overflow-y-auto pr-1">
                    {wishlistProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="flex items-center gap-3 p-2.5 bg-gray-50 dark:bg-[#1A232C] rounded-xl border border-gray-200 dark:border-gray-800"
                      >
                        <img
                          src={prod.images?.[0] || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80'}
                          alt={prod.name}
                          className="w-14 h-16 object-cover rounded-lg bg-gray-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-[#D5A249] block truncate">
                            {prod.brand || 'ATELIER LEO'}
                          </span>
                          <h5 className="text-xs font-semibold text-[#2C4152] dark:text-gray-100 truncate">
                            {prod.name}
                          </h5>
                          <span className="text-xs font-bold text-[#2C4152] dark:text-white block mt-0.5">
                            {formatPrice(prod.sellingPrice ?? prod.salePrice ?? prod.price)}
                          </span>

                          <div className="flex items-center gap-2 mt-1.5">
                            <button
                              type="button"
                              onClick={() => handleMoveWishlistToCart(prod)}
                              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#2C4152] hover:bg-[#1f2e3a] text-white rounded-md cursor-pointer transition-colors flex items-center gap-1"
                            >
                              {addedWishlistId === prod.id ? (
                                <>
                                  <Check className="w-3 h-3 text-[#D5A249]" />
                                  <span>Added!</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingBag className="w-3 h-3" />
                                  <span>Move to Bag</span>
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeFromWishlist(prod.id)}
                              className="p-1 text-gray-400 hover:text-red-500 rounded cursor-pointer transition-colors"
                              title="Remove from wishlist"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/wishlist"
                    onClick={onClose}
                    className="block w-full text-center py-2.5 bg-[#2C4152] dark:bg-[#D5A249] text-white dark:text-[#121A21] font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-xs"
                  >
                    Open Full Wishlist ({wishlistCount})
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* PANEL 3: SHOPPING BAG SUB-OPTIONS                            */}
          {/* ============================================================ */}
          {activeMainTab === 'bag' && (
            <div className="p-4 space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#D5A249]">
                    Atelier Bag
                  </span>
                  <h3 className="text-sm font-bold text-[#2C4152] dark:text-white">
                    {cartCount} Garments ({formatPrice(subtotal)})
                  </h3>
                </div>
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="text-[11px] font-bold text-[#2C4152] dark:text-[#D5A249] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Edit Bag</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Complimentary Courier Progress */}
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#1A232C] border border-gray-200 dark:border-gray-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#D5A249]" />
                    {isFreeShipping
                      ? '✨ Free Express Delivery Unlocked'
                      : `Add ${formatPrice(amountToFreeShipping)} for Free Courier`}
                  </span>
                  <span className="font-bold text-[#D5A249]">
                    {isFreeShipping ? 'UNLOCKED' : `${Math.min(100, Math.round((subtotal / 2999) * 100))}%`}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D5A249] transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / 2999) * 100)}%` }}
                  />
                </div>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-10 px-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-700 dark:text-gray-200">
                      Your Bag is Empty
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Explore our tailored suits, linen shirts, and handcrafted sneakers.
                    </p>
                  </div>
                  <Link
                    to="/shop?department=Men"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2C4152] text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-xs hover:bg-[#1f2e3a] transition-all"
                  >
                    <span>Browse Collection</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-2.5 max-h-[46vh] overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div
                        key={`${item.id}-${item.size}-${item.color}`}
                        className="flex items-center gap-3 p-2.5 bg-gray-50 dark:bg-[#1A232C] rounded-xl border border-gray-200 dark:border-gray-800"
                      >
                        <img
                          src={item.image || item.images?.[0] || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80'}
                          alt={item.name}
                          className="w-14 h-16 object-cover rounded-lg bg-gray-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-semibold text-[#2C4152] dark:text-gray-100 truncate">
                            {item.name}
                          </h5>
                          <div className="text-[10px] text-gray-400 flex items-center gap-2 mt-0.5">
                            <span>Size: <strong>{item.size}</strong></span>
                            <span>Qty: <strong>{item.quantity}</strong></span>
                          </div>
                          <span className="text-xs font-bold text-[#2C4152] dark:text-white block mt-0.5">
                            {formatPrice((item.sellingPrice ?? item.price) * item.quantity)}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartItemId || item.id, item.size, item.color)}
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Checkout CTA Buttons */}
                  <div className="pt-2 space-y-2 border-t border-gray-200 dark:border-gray-800">
                    <Link
                      to="/checkout"
                      onClick={onClose}
                      className="block w-full text-center py-3 bg-[#2C4152] dark:bg-[#D5A249] text-white dark:text-[#121A21] font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md hover:opacity-95 transition-all"
                    >
                      Proceed to Checkout • {formatPrice(subtotal)}
                    </Link>
                    <Link
                      to="/cart"
                      onClick={onClose}
                      className="block w-full text-center py-2 bg-gray-100 dark:bg-gray-800 text-[#2C4152] dark:text-white font-semibold text-xs rounded-xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      View & Manage Bag
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* PANEL 4: DEFAULT WARDROBE CATALOG                            */}
          {/* ============================================================ */}
          {activeMainTab === 'shop' && (
            <div>
              {/* Department Switcher Tabs (AJIO style) */}
              <div className="grid grid-cols-4 bg-[#F5F5F5] dark:bg-[#1A232C] border-b border-gray-200 dark:border-gray-800">
                {['men', 'women', 'kids', 'accessories'].map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => {
                      setActiveDept(dept);
                      setExpandedSection(null);
                    }}
                    className={`py-3 text-[11px] font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                      activeDept === dept
                        ? 'border-[#2C4152] text-[#2C4152] dark:border-[#D5A249] dark:text-[#D5A249] bg-white dark:bg-[#121A21]'
                        : 'border-transparent text-gray-500 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              {/* Quick Department Banner */}
              <div className="p-3 bg-[#F5F5F5] dark:bg-[#1A232C] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <Link
                  to={currentConfig.href}
                  onClick={onClose}
                  className="text-xs font-bold uppercase tracking-wider text-[#2C4152] dark:text-[#D5A249] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore All {currentConfig.title}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[10px] font-mono text-gray-400">SS26 EDIT</span>
              </div>

              {/* Subcategories Accordions */}
              <div className="px-4 py-3 divide-y divide-[#F0ECE1] dark:divide-[#27272A]">
                {currentConfig.columns.map((col, idx) => {
                  const isExpanded = expandedSection === idx;
                  return (
                    <div key={idx} className="py-2.5">
                      <button
                        type="button"
                        onClick={() => toggleSection(idx)}
                        className="w-full flex items-center justify-between py-1.5 text-xs font-bold uppercase tracking-wider text-[#242321] dark:text-gray-100 hover:text-[#A68962] cursor-pointer"
                      >
                        <span>{col.title}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180 text-[#D5A249]' : ''}`}
                        />
                      </button>

                      {isExpanded && (
                        <ul className="pt-2 pb-1 pl-3 space-y-2 animate-in slide-in-from-top-1 duration-150">
                          {col.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link
                                to={item.href}
                                onClick={onClose}
                                className="text-xs text-gray-600 dark:text-gray-300 hover:text-[#2C4152] dark:hover:text-white flex items-center gap-2 py-0.5 cursor-pointer"
                              >
                                <span className="w-1 h-1 rounded-full bg-[#D5A249]" />
                                <span>{item.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}

                {/* Quick Links for New & Sale */}
                <div className="pt-4 pb-2 space-y-2">
                  <Link
                    to="/new-arrivals"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 text-xs font-bold uppercase tracking-wider text-[#2C4152] dark:text-white hover:border-[#D5A249] cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D5A249]" />
                      <span>New Arrivals</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </Link>

                  <Link
                    to="/sale"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-rose-600" />
                      <span>Sale & Special Offers</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[9px] font-bold">15% OFF</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* BOTTOM DOCK: QUICK SWITCHER FOR THE 3 OPTIONS                 */}
        {/* Always visible at the base of the sidebar                      */}
        {/* ------------------------------------------------------------- */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-[#F8F8F8] dark:bg-[#0E151B] shrink-0">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveMainTab('wishlist')}
              className={`flex items-center justify-center gap-2 py-2 px-3 border rounded-xl cursor-pointer transition-colors ${
                activeMainTab === 'wishlist'
                  ? 'bg-[#2C4152] text-white border-transparent'
                  : 'bg-white dark:bg-[#1A232C] border-gray-200 dark:border-gray-700 text-[#2C4152] dark:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${wishlistCount > 0 ? 'text-rose-600' : ''}`} />
              <span>Wishlist ({wishlistCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMainTab('bag')}
              className={`flex items-center justify-center gap-2 py-2 px-3 border rounded-xl cursor-pointer transition-colors ${
                activeMainTab === 'bag'
                  ? 'bg-[#D5A249] text-[#121A21] font-bold border-transparent'
                  : 'bg-[#2C4152] text-white border-transparent'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bag ({cartCount})</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] pt-2 px-1 text-gray-500 dark:text-gray-400">
            <button
              type="button"
              onClick={() => setActiveMainTab('account')}
              className="hover:text-[#2C4152] dark:hover:text-[#D5A249] font-medium flex items-center gap-1 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#D5A249]" />
              <span>My Account & Orders</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="hover:text-[#2C4152] dark:hover:text-[#D5A249] font-medium flex items-center gap-1 cursor-pointer"
            >
              {isDark ? <Moon className="w-3.5 h-3.5 text-[#D5A249]" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
              <span>{isDark ? 'Dark' : 'Light'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
