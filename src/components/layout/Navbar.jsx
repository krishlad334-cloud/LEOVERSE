import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, ChevronDown, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import MobileMenu from './MobileMenu';
import categories from '../../data/categories';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setCategoriesDropdownOpen(false);
  }, [location.pathname, location.search]);

  // Main requested navigation links
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop All', href: '/shop' },
    { label: 'Summer Wear', href: '/category/summer-wear' },
    { label: 'Winter Wear', href: '/category/winter-wear' },
    { label: 'Casual Wear', href: '/category/casual-wear' },
    { label: 'Formal Wear', href: '/category/formal-wear' },
    { label: 'New Arrivals', href: '/new-arrivals' },
    { label: 'Sale', href: '/sale', isBadge: true },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path.startsWith('/category/')) {
      const slug = path.replace('/category/', '');
      return (
        location.pathname === path ||
        (location.pathname === '/shop' && new URLSearchParams(location.search).get('category') === slug)
      );
    }
    if (path.includes('?category=')) {
      const searchCat = new URLSearchParams(location.search).get('category');
      const targetCat = path.split('category=')[1];
      return searchCat === targetCat;
    }
    return location.pathname === path;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#F7F5F0]/95 backdrop-blur-md shadow-xs border-b border-[#D8D2C8]/80'
            : 'bg-[#F7F5F0] border-b border-[#D8D2C8]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Top Header */}
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden flex-1 justify-start">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-[#242321] hover:text-[#77746E] focus:outline-none cursor-pointer"
                aria-label="Open mobile navigation"
              >
                <Menu className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Desktop Left Brand Tag */}
            <div className="hidden lg:flex items-center space-x-2 flex-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#77746E]">
              <span>Men's Apparel Only</span>
            </div>

            {/* Center: LEOVERSE Wordmark */}
            <div className="flex justify-center items-center">
              <Link
                to="/"
                className="text-xl sm:text-2xl md:text-[28px] font-bold tracking-[0.24em] text-[#242321] uppercase select-none transition-opacity hover:opacity-85"
              >
                LEOVERSE
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center justify-end space-x-3 sm:space-x-5 flex-1">
              <Link
                to="/search"
                className="p-2 text-[#242321] hover:text-[#77746E] transition-colors"
                aria-label="Search clothing"
              >
                <Search className="w-[19px] h-[19px] stroke-[1.5]" />
              </Link>

              <Link
                to="/account"
                className="p-2 text-[#242321] hover:text-[#77746E] transition-colors hidden sm:block"
                aria-label="Account"
              >
                <User className="w-[19px] h-[19px] stroke-[1.5]" />
              </Link>

              <Link
                to="/wishlist"
                className="p-2 text-[#242321] hover:text-[#77746E] transition-colors relative"
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart className="w-[19px] h-[19px] stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#242321] text-[#FAF9F6] text-[9px] flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="p-2 text-[#242321] hover:text-[#77746E] transition-colors relative"
                aria-label={`Cart (${cartCount} items)`}
              >
                <ShoppingBag className="w-[19px] h-[19px] stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#242321] text-[#FAF9F6] text-[9px] flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Desktop Sub-Nav: Links Bar */}
          <nav className="hidden lg:flex items-center justify-center space-x-7 py-2.5 border-t border-[#D8D2C8]/50 text-xs">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`uppercase tracking-[0.14em] font-medium py-1 transition-colors relative group ${
                  isActive(link.href)
                    ? 'text-[#242321] font-bold'
                    : 'text-[#77746E] hover:text-[#242321]'
                }`}
              >
                <span>{link.label}</span>
                {link.isBadge && (
                  <span className="ml-1 px-1.5 py-0.2 bg-[#252522] text-[#FAF9F6] text-[9px] font-bold tracking-wider">
                    SALE
                  </span>
                )}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#242321] transition-transform duration-200 origin-left ${
                    isActive(link.href)
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}

            {/* All Categories Dropdown Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className={`uppercase tracking-[0.14em] font-medium py-1 transition-colors flex items-center gap-1 cursor-pointer ${
                  categoriesDropdownOpen ? 'text-[#242321] font-bold' : 'text-[#77746E] hover:text-[#242321]'
                }`}
              >
                <span>More Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {categoriesDropdownOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-96 bg-[#FAF9F6] border border-[#D8D2C8] shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setCategoriesDropdownOpen(false)}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#D8D2C8] mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#77746E]">
                      All 11 Men's Categories
                    </span>
                    <Link
                      to="/shop"
                      onClick={() => setCategoriesDropdownOpen(false)}
                      className="text-[10px] uppercase font-bold text-[#242321] hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/category/${cat.slug}`}
                        onClick={() => setCategoriesDropdownOpen(false)}
                        className="py-1 text-[#77746E] hover:text-[#242321] hover:font-semibold transition-all flex items-center justify-between group"
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="text-[10px] text-[#77746E]/60 group-hover:text-[#242321]">
                          ({cat.itemCount})
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
