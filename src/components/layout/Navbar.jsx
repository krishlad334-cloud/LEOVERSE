import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  Package,
  X,
  Sun,
  Moon,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { getProductCatalog } from '../../services/productService';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import { formatPrice } from '../../utils/formatPrice';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const searchContainerRef = useRef(null);
  const profileRef = useRef(null);
  const navLeaveTimeoutRef = useRef(null);
  const profileTimeoutRef = useRef(null);

  const { cartCount, notification: cartNotification } = useCart();
  const { wishlistCount, notification: wishlistNotification } = useWishlist();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Profile hover handlers
  const handleProfileMouseEnter = () => {
    if (profileTimeoutRef.current) {
      clearTimeout(profileTimeoutRef.current);
    }
    setProfileDropdownOpen(true);
  };

  const handleProfileMouseLeave = () => {
    profileTimeoutRef.current = setTimeout(() => {
      setProfileDropdownOpen(false);
    }, 220);
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMegaCategory(null);
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    setSearchFocused(false);
    setMobileSearchOpen(false);
  }, [location.pathname, location.search]);

  // Click outside detection for search & profile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live search debounce
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const timer = setTimeout(() => {
      const res = getProductCatalog({ search: searchQuery, limit: 5 });
      setSearchResults(res.products);
    }, 150);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Mega menu hover handlers with smooth delay
  const handleNavMouseEnter = (catKey) => {
    if (navLeaveTimeoutRef.current) {
      clearTimeout(navLeaveTimeoutRef.current);
    }
    setActiveMegaCategory(catKey);
  };

  const handleNavMouseLeave = () => {
    if (navLeaveTimeoutRef.current) {
      clearTimeout(navLeaveTimeoutRef.current);
    }
    navLeaveTimeoutRef.current = setTimeout(() => {
      setActiveMegaCategory(null);
    }, 280);
  };

  const handleMegaMouseEnter = () => {
    if (navLeaveTimeoutRef.current) {
      clearTimeout(navLeaveTimeoutRef.current);
    }
  };

  const handleMegaMouseLeave = () => {
    if (navLeaveTimeoutRef.current) {
      clearTimeout(navLeaveTimeoutRef.current);
    }
    navLeaveTimeoutRef.current = setTimeout(() => {
      setActiveMegaCategory(null);
    }, 200);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
      setMobileSearchOpen(false);
    }
  };

  // Clean, single-line AJIO navigation items without bulky chevrons or line-breaking badges
  const primaryNavItems = [
    { key: 'men', label: 'MEN', href: '/men', hasMega: true },
    { key: 'women', label: 'WOMEN', href: '/women', hasMega: true },
    { key: 'kids', label: 'KIDS', href: '/kids', hasMega: true },
    { key: 'accessories', label: 'ACCESSORIES', href: '/products?department=Accessories', hasMega: true },
    { key: 'sale', label: 'SALE', href: '/sale', hasMega: false, isSale: true }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/98 dark:bg-[#121A21]/98 backdrop-blur-md shadow-xs border-b border-gray-200 dark:border-gray-800'
            : 'bg-white dark:bg-[#121A21] border-b border-gray-200/90 dark:border-gray-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-4 lg:gap-8">
            
            {/* Left: Mobile Menu Trigger + Brand Logo */}
            <div className="flex items-center gap-3 lg:gap-6 shrink-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 -ml-1 text-[#2C4152] dark:text-white hover:text-[#D5A249] rounded-lg transition-colors cursor-pointer"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Brand Logo - Sleek & Modern AJIO-style presence */}
              <Link to="/" className="flex items-center gap-2 group select-none">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-[0.16em] text-[#2C4152] dark:text-white uppercase group-hover:text-[#D5A249] transition-colors leading-none">
                  LEOVERSE
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#D5A249]" />
              </Link>
            </div>

            {/* Center Desktop Navigation - Clean, Single-Line, AJIO-Style */}
            <nav
              className="hidden lg:flex items-center space-x-6 xl:space-x-8 h-full whitespace-nowrap flex-nowrap"
              onMouseLeave={handleNavMouseLeave}
            >
              {primaryNavItems.map((item) => {
                const isActive = activeMegaCategory === item.key;
                const isCurrentPath = location.pathname === item.href;

                return (
                  <div
                    key={item.key}
                    className="relative h-full flex items-center shrink-0"
                    onMouseEnter={() => item.hasMega && handleNavMouseEnter(item.key)}
                  >
                    <Link
                      to={item.href}
                      className={`h-full flex items-center px-1 text-[13px] font-bold tracking-[0.08em] transition-colors whitespace-nowrap ${
                        item.isSale
                          ? 'text-rose-600 hover:text-rose-700 dark:text-rose-400 font-extrabold'
                          : isActive || isCurrentPath
                          ? 'text-[#2C4152] dark:text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:text-[#2C4152] dark:hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                    </Link>

                    {/* AJIO-Style Bottom Underline Indicator */}
                    {(isActive || isCurrentPath) && (
                      <span className={`absolute bottom-0 inset-x-0 h-[2.5px] rounded-t-sm ${
                        item.isSale ? 'bg-rose-600' : 'bg-[#2C4152] dark:bg-[#D5A249]'
                      } animate-in fade-in duration-150`} />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right: Search Input + Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Desktop Live Search Pill */}
              <div ref={searchContainerRef} className="relative hidden md:block w-48 lg:w-64 xl:w-72">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSearchFocused(true);
                    }}
                    onFocus={() => setSearchFocused(true)}
                    placeholder="Search for brands, products, styles..."
                    className="w-full pl-9 pr-7 py-2 text-xs bg-[#F5F5F5] dark:bg-[#1A232C] border border-gray-200 dark:border-gray-700 rounded-full text-[#2C4152] dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#2C4152] dark:focus:border-[#D5A249] focus:bg-white dark:focus:bg-[#121A21] transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </form>

                {/* Live Suggestions Dropdown */}
                {searchFocused && searchQuery.trim() && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1A232C] border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 dark:border-gray-800 flex justify-between">
                      <span>Matching Styles</span>
                      <span>{searchResults.length} found</span>
                    </div>

                    {searchResults.length > 0 ? (
                      <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {searchResults.map((item) => (
                          <Link
                            key={item.id}
                            to={`/product/${item.id}`}
                            onClick={() => setSearchFocused(false)}
                            className="flex items-center gap-3 p-2 hover:bg-[#F5F5F5] dark:hover:bg-[#121A21] rounded-lg transition-colors group"
                          >
                            <img
                              src={item.images?.[0]}
                              alt={item.name}
                              className="w-10 h-12 object-cover rounded bg-gray-100"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] uppercase font-bold text-[#D5A249] block truncate">
                                {item.brand}
                              </span>
                              <h5 className="text-xs font-semibold text-[#2C4152] dark:text-gray-100 group-hover:text-[#D5A249] transition-colors truncate">
                                {item.name}
                              </h5>
                              <div className="flex items-center gap-1.5 text-xs mt-0.5">
                                <span className="font-bold text-[#2C4152] dark:text-white">
                                  {formatPrice(item.sellingPrice ?? item.salePrice ?? item.price)}
                                </span>
                                {item.discountPercent > 0 && (
                                  <span className="text-[10px] font-bold text-emerald-600">
                                    {item.discountPercent}% OFF
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                        <Link
                          to={`/products?search=${encodeURIComponent(searchQuery)}`}
                          onClick={() => setSearchFocused(false)}
                          className="block text-center py-2 text-xs font-bold uppercase tracking-wider text-[#2C4152] hover:text-[#D5A249] transition-colors"
                        >
                          View all results for "{searchQuery}"
                        </Link>
                      </div>
                    ) : (
                      <div className="p-4 text-center text-xs text-gray-500">
                        No garments matched "{searchQuery}". Try "linen", "shirt", or "jacket".
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Search Toggle Icon */}
              <button
                type="button"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="md:hidden p-2 text-[#2C4152] dark:text-white hover:text-[#D5A249] rounded-full transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account Dropdown (Opens on Hover or Click) */}
              <div
                ref={profileRef}
                className="relative"
                onMouseEnter={handleProfileMouseEnter}
                onMouseLeave={handleProfileMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  className="p-2 text-[#2C4152] dark:text-gray-200 hover:text-[#D5A249] rounded-full hover:bg-[#F5F5F5] dark:hover:bg-[#1A232C] transition-colors cursor-pointer flex items-center"
                  aria-label="Account options"
                >
                  <User className="w-5 h-5" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1A232C] border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D5A249]">
                        Welcome to LEOVERSE
                      </span>
                      <p className="text-xs font-semibold text-[#2C4152] dark:text-white">
                        Guest Shopper
                      </p>
                    </div>

                    {/* Dark / Light Mode Switch in Profile Menu */}
                    <div className="my-2 p-2.5 bg-[#F5F5F5] dark:bg-[#121A21] rounded-xl border border-gray-200 dark:border-gray-700/80 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-lg ${isDark ? 'bg-[#D5A249]/20 text-[#D5A249]' : 'bg-amber-100 text-amber-600'}`}>
                          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-[#2C4152] dark:text-white block leading-tight">
                            {isDark ? 'Dark Mode' : 'Light Mode'}
                          </span>
                          <span className="text-[9px] text-gray-500 dark:text-gray-400">
                            Tap switch to change theme
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTheme();
                        }}
                        className={`relative inline-flex h-6 w-11 shrink-0 p-0.5 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                          isDark ? 'bg-[#D5A249]' : 'bg-gray-300 dark:bg-gray-700'
                        }`}
                        aria-label="Toggle dark and light theme"
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

                    <div className="py-1 space-y-0.5">
                      <Link
                        to="/account"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#2C4152] dark:text-gray-200 hover:bg-[#F5F5F5] dark:hover:bg-[#121A21] rounded-lg transition-colors"
                      >
                        <User className="w-4 h-4 text-[#D5A249]" />
                        <span>My Account Profile</span>
                      </Link>

                      <Link
                        to="/account/orders"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#2C4152] dark:text-gray-200 hover:bg-[#F5F5F5] dark:hover:bg-[#121A21] rounded-lg transition-colors"
                      >
                        <Package className="w-4 h-4 text-[#D5A249]" />
                        <span>Orders & Tracking</span>
                      </Link>

                      <Link
                        to="/account/addresses"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#2C4152] dark:text-gray-200 hover:bg-[#F5F5F5] dark:hover:bg-[#121A21] rounded-lg transition-colors"
                      >
                        <MapPin className="w-4 h-4 text-[#D5A249]" />
                        <span>Saved Addresses</span>
                      </Link>

                      <Link
                        to="/wishlist"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#2C4152] dark:text-gray-200 hover:bg-[#F5F5F5] dark:hover:bg-[#121A21] rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Heart className="w-4 h-4 text-rose-600" />
                          <span>Wishlist</span>
                        </div>
                        {wishlistCount > 0 && (
                          <span className="px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                            {wishlistCount}
                          </span>
                        )}
                      </Link>

                      {/* Studio Admin Portal Entry */}
                      <a
                        href="http://localhost:5174"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[#2C4152] dark:text-white bg-[#D5A249]/15 hover:bg-[#D5A249]/25 rounded-lg transition-colors border border-[#D5A249]/30 mt-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#D5A249] animate-pulse" />
                          <span>Admin Studio Portal</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-[#D5A249]" />
                      </a>
                    </div>

                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-1 flex gap-2">
                      <Link
                        to="/login"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex-1 text-center py-2 bg-[#2C4152] dark:bg-white text-white dark:text-[#2C4152] font-bold text-xs uppercase tracking-wider rounded-lg transition hover:opacity-90"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex-1 text-center py-2 bg-[#F5F5F5] dark:bg-[#1A232C] text-[#2C4152] dark:text-white border border-gray-200 dark:border-gray-700 font-bold text-xs uppercase tracking-wider rounded-lg transition hover:border-[#D5A249]"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist Icon with live counter */}
              <Link
                to="/wishlist"
                className="relative p-2 text-[#2C4152] dark:text-gray-200 hover:text-[#D5A249] rounded-full hover:bg-[#F5F5F5] dark:hover:bg-[#1A232C] transition-colors"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 transition-transform ${wishlistNotification ? 'scale-125 text-rose-600' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-in zoom-in duration-200">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Icon with live counter */}
              <Link
                to="/cart"
                className="relative p-2 text-[#2C4152] dark:text-gray-200 hover:text-[#D5A249] rounded-full hover:bg-[#F5F5F5] dark:hover:bg-[#1A232C] transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className={`w-5 h-5 transition-transform ${cartNotification ? 'scale-125 text-[#D5A249]' : ''}`} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#2C4152] text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-in zoom-in duration-200">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search Input Drawer (slides down when toggled) */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 py-3 bg-[#F5F5F5] dark:bg-[#121A21] border-t border-gray-200 dark:border-gray-800 animate-in slide-in-from-top duration-200">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search garments, linen, formal suits..."
                className="w-full pl-10 pr-10 py-2 bg-white dark:bg-[#1A232C] border border-gray-300 dark:border-gray-700 rounded-full text-xs text-[#2C4152] dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#2C4152]"
                autoFocus
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>
        )}

        {/* Mega Menu Overlay with Synchronized Hover Handlers */}
        <MegaMenu
          activeCategory={activeMegaCategory}
          onClose={() => setActiveMegaCategory(null)}
          onMouseEnter={handleMegaMouseEnter}
          onMouseLeave={handleMegaMouseLeave}
        />
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
