import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Package,
  X,
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { getCategories, getProducts } from '../../services/api';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchInputRef = useRef(null);
  const profileRef = useRef(null);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll detection for sticky navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch categories from SQLite database
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  // Close all menus on route change
  useEffect(() => {
    setActiveDropdown(null);
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  // Live search typeahead
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(() => {
      getProducts({ search: searchQuery })
        .then((prods) => setSearchResults(prods.slice(0, 5)))
        .catch(() => {});
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  // Pure menswear primary navigation items - Single clean words to prevent awkward wrapping
  const navItems = [
    {
      id: "shirts",
      label: "Shirts",
      fullLabel: "Shirts & Polos",
      link: "/shop?department=Men's%20Apparel",
      lookbookTitle: "Riviera Linen & Resort Collars",
      lookbookImage: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
      columns: [
        {
          title: "Casual & Resort",
          items: ["French Flax Linen Shirts", "Camp Collar Resort Shirts", "Supima Cotton Polos", "Relaxed Cuban Overshirts"]
        },
        {
          title: "Formal & Evening",
          items: ["Pinpoint Oxford Formals", "Spread Collar Dress Shirts", "Liquid Rayon Party Shirts", "Mandarin Band-Collar Shirts"]
        }
      ]
    },
    {
      id: "suiting",
      label: "Suiting",
      fullLabel: "Suits & Tailoring",
      link: "/shop?department=Men's%20Tailoring",
      lookbookTitle: "Super 120s Virgin Wool Tailoring",
      lookbookImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
      columns: [
        {
          title: "Tailored Jackets",
          items: ["Virgin Wool Blazers", "Unstructured Summer Blazers", "Double-Breasted Jackets", "Satin Peak Lapel Tuxedos"]
        },
        {
          title: "Complete Sets",
          items: ["Two-Piece Boardroom Suits", "Three-Piece Wedding Suits", "Tailored Waistcoats", "Formal Tuxedo Sets"]
        }
      ]
    },
    {
      id: "trousers",
      label: "Trousers",
      fullLabel: "Trousers & Chinos",
      link: "/shop?category=trousers-chinos",
      lookbookTitle: "Forward-Pleats & Relaxed Chinos",
      lookbookImage: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=600&q=80",
      columns: [
        {
          title: "Tailored Trousers",
          items: ["Forward-Pleat Trousers", "Gurkha Military Trousers", "Extended Waistband Slacks", "Fine Wool Dress Trousers"]
        },
        {
          title: "Casual & Relaxed",
          items: ["Linen Drawstring Pants", "Relaxed Straight Chinos", "Vintage Washed Denim", "Tailored Linen Shorts"]
        }
      ]
    },
    {
      id: "ethnic",
      label: "Ethnic",
      fullLabel: "Traditional Ethnic Wear",
      link: "/shop?department=Men's%20Ethnic",
      lookbookTitle: "Royal Raw Silk & Festive Bundis",
      lookbookImage: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=600&q=80",
      columns: [
        {
          title: "Ceremonial & Festive",
          items: ["Handcrafted Raw Silk Kurtas", "Nehru Bundi Jackets", "Hand-Embroidered Kurta Sets", "Bespoke Festive Sherwanis"]
        },
        {
          title: "Casual Indian",
          items: ["Pure Linen Short Kurtas", "Churidar Pyjama Sets", "Pathani Suits", "Bandhgala Jackets"]
        }
      ]
    },
    {
      id: "streetwear",
      label: "Streetwear",
      fullLabel: "Streetwear & Hoodies",
      link: "/shop?department=Men's%20Casuals",
      lookbookTitle: "Heavyweight 280 GSM Boxy Cuts",
      lookbookImage: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80",
      columns: [
        {
          title: "Tops & Hoodies",
          items: ["280 GSM Oversized Boxy Tees", "480 GSM Loopback Hoodies", "Vintage Acid Wash Tees", "Heavyweight Sweatshirts"]
        },
        {
          title: "Bottoms",
          items: ["Baggy Skate Denim", "Retro Piping Track Pants", "Deep Pocket Cargoes", "Relaxed Terry Shorts"]
        }
      ]
    },
    {
      id: "accessories",
      label: "Accessories",
      fullLabel: "Footwear & Accessories",
      link: "/shop?department=Men's%20Accessories",
      lookbookTitle: "Swiss Movements & Blake Calfskin",
      lookbookImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
      columns: [
        {
          title: "Footwear & Leather",
          items: ["Blake-Stitched Penny Loafers", "Tuscan Leather Duffles", "Hand-Burnished Belts", "Bifold Card Holders"]
        },
        {
          title: "Accents & Timepieces",
          items: ["Swiss Chronograph Watches", "Handmade Silk Neckties", "Acetate Sunglasses", "Silk Pocket Squares"]
        }
      ]
    },
    {
      id: "new",
      label: "New Arrivals",
      fullLabel: "Seasonal Drops",
      link: "/new-arrivals",
      lookbookTitle: "Fresh SS26 Silhouette Releases",
      lookbookImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      columns: [
        {
          title: "Latest Drops",
          items: ["Spring/Summer 2026 Drop", "French Riviera Capsule", "Small-Batch Handcrafted", "Runway Editorial Pieces"]
        },
        {
          title: "Featured Fabrics",
          items: ["Normandy French Flax", "Super 120s Virgin Wool", "Mulberry Raw Silk", "480 GSM Loopback Fleece"]
        }
      ]
    },
    {
      id: "sale",
      label: "Sale",
      fullLabel: "Private Mid-Season Sale",
      link: "/sale",
      isSale: true
    }
  ];

  return (
    <>
      {/* 1. Top Minimal Luxury Announcement Bar */}
      <div className="bg-[#18181B] dark:bg-[#0D0D0F] text-[#D8D2C8] dark:text-[#A1A1AA] border-b border-[#27272A] text-[11px] py-2 px-4 select-none transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-[#C5A880] font-bold tracking-wider">LUXE PRIVILEGE</span>
            <span className="text-gray-500">•</span>
            <span>Complimentary express delivery on orders over ₹2,499 | Code: <strong className="text-white font-mono">LUXE15</strong> for 15% savings</span>
          </div>

          <div className="hidden md:flex items-center space-x-4 text-[10px] text-gray-400 font-semibold tracking-widest uppercase">
            <span>100% Pure Menswear Atelier</span>
            <span>•</span>
            <span>Handcrafted in India</span>
          </div>
        </div>
      </div>

      {/* 2. Main Luxury Header - Perfectly Aligned, No Wrapping */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 select-none ${
          isScrolled
            ? 'bg-[#FAF9F6]/95 dark:bg-[#151518]/95 backdrop-blur-md shadow-xs border-b border-[#DCD5C9] dark:border-[#27272A]'
            : 'bg-[#FAF9F6] dark:bg-[#151518] border-b border-[#E5E0D6] dark:border-[#27272A]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden justify-start">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-[#242321] dark:text-gray-200 hover:text-[#A68962] dark:hover:text-[#C5A880] transition cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Left Brand Logo (shrink-0 ensures it never squishes) */}
            <div className="flex items-center shrink-0">
              <Link to="/" className="flex flex-col items-start group">
                <span className="text-2xl font-serif font-extrabold tracking-[0.24em] text-[#1E1E1E] dark:text-white uppercase group-hover:opacity-90 transition leading-none">
                  LEOVERSE
                </span>
                <span className="text-[9px] uppercase tracking-[0.38em] text-[#A68962] dark:text-[#C5A880] font-semibold mt-1">
                  Menswear Atelier
                </span>
              </Link>
            </div>

            {/* Center Desktop Navigation Menu - Strictly Single-Line whitespace-nowrap */}
            <nav className="hidden lg:flex items-center justify-center space-x-5 xl:space-x-7 flex-1 px-4">
              {navItems.map((item) => {
                const isDropdownOpen = activeDropdown === item.id;
                const isSaleItem = item.isSale;

                return (
                  <div
                    key={item.id}
                    className="relative group py-7"
                    onMouseEnter={() => !isSaleItem && setActiveDropdown(item.id)}
                    onMouseLeave={() => !isSaleItem && setActiveDropdown(null)}
                  >
                    <Link
                      to={item.link}
                      className={`whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.14em] transition-colors py-2 flex items-center space-x-1 ${
                        isSaleItem
                          ? 'text-rose-600 hover:text-rose-700'
                          : isDropdownOpen
                          ? 'text-[#A68962] dark:text-[#C5A880]'
                          : 'text-[#242321] dark:text-gray-200 hover:text-[#A68962] dark:hover:text-[#C5A880]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {!isSaleItem && item.columns && (
                        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180 text-[#A68962] dark:text-[#C5A880]' : 'group-hover:text-[#A68962] dark:group-hover:text-[#C5A880]'
                        }`} />
                      )}
                    </Link>

                    {/* Mega Menu Dropdown */}
                    {!isSaleItem && item.columns && isDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[620px] pt-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#2A2A34] rounded-2xl shadow-2xl p-6 grid grid-cols-5 gap-6">
                          {/* 2 Subcategory Columns */}
                          <div className="col-span-3 grid grid-cols-2 gap-4">
                            {item.columns.map((col, idx) => (
                              <div key={idx} className="space-y-3">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68962] dark:text-[#C5A880] block pb-1 border-b border-[#F0ECE1] dark:border-[#27272A]">
                                  {col.title}
                                </span>
                                <ul className="space-y-2 text-xs">
                                  {col.items.map((subItem, sIdx) => (
                                    <li key={sIdx}>
                                      <Link
                                        to={`${item.link}&search=${encodeURIComponent(subItem)}`}
                                        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:translate-x-1 transition-all duration-150 flex items-center space-x-1.5 font-medium leading-tight"
                                      >
                                        <span className="w-1 h-1 rounded-full bg-[#C5A880] shrink-0" />
                                        <span className="truncate">{subItem}</span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}

                            <div className="col-span-2 pt-3 mt-2 border-t border-[#F0ECE1] dark:border-[#27272A]">
                              <Link
                                to={item.link}
                                className="text-xs font-bold text-[#A68962] dark:text-[#C5A880] hover:text-black dark:hover:text-white flex items-center space-x-1.5 uppercase tracking-wider"
                              >
                                <span>Explore All {item.fullLabel}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </div>

                          {/* Lookbook Campaign Card on Right */}
                          <div className="col-span-2 bg-[#FAF9F6] dark:bg-[#1E1E24] border border-[#E5E0D6] dark:border-[#2A2A34] rounded-xl overflow-hidden flex flex-col justify-between">
                            <div className="relative h-28 overflow-hidden bg-gray-200 dark:bg-gray-800">
                              <img
                                src={item.lookbookImage}
                                alt={item.lookbookTitle}
                                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                              />
                              <span className="absolute top-2 left-2 bg-[#1E1E1E] text-[#C5A880] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                SS26 EDIT
                              </span>
                            </div>

                            <div className="p-3.5 flex flex-col justify-between flex-1">
                              <div>
                                <h4 className="font-bold text-xs text-[#1E1E1E] dark:text-white leading-snug">
                                  {item.lookbookTitle}
                                </h4>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                  Handcrafted silhouettes cut from certified breathable fabrics.
                                </p>
                              </div>

                              <Link
                                to={item.link}
                                className="mt-3 text-[11px] font-bold text-[#A68962] dark:text-[#C5A880] hover:text-black dark:hover:text-white flex items-center space-x-1"
                              >
                                <span>Explore Edit</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Action Icons (shrink-0 ensures no wrapping) */}
            <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-[#242321] dark:text-gray-200 hover:text-[#A68962] dark:hover:text-[#C5A880] transition cursor-pointer rounded-lg hover:bg-[#F0ECE1]/50 dark:hover:bg-[#202026]"
                aria-label="Search menswear"
              >
                <Search className="w-5 h-5 stroke-[1.75]" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="p-2 text-[#242321] dark:text-gray-200 hover:text-rose-600 transition relative rounded-lg hover:bg-[#F0ECE1]/50 dark:hover:bg-[#202026]"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.75]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag / Cart */}
              <Link
                to="/cart"
                className="p-2 text-[#242321] dark:text-gray-200 hover:text-[#A68962] dark:hover:text-[#C5A880] transition relative rounded-lg hover:bg-[#F0ECE1]/50 dark:hover:bg-[#202026]"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#1E1E1E] text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile / Account Dropdown with Hover & Click Popover (ADMIN ROUTE INTEGRATED HERE) */}
              <div
                ref={profileRef}
                className="relative"
                onMouseEnter={() => setProfileDropdownOpen(true)}
                onMouseLeave={() => setProfileDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className={`p-2 rounded-xl transition flex items-center space-x-1 cursor-pointer ${
                    profileDropdownOpen
                      ? 'text-[#A68962] bg-[#F0ECE1] dark:bg-[#202026]'
                      : 'text-[#242321] dark:text-gray-200 hover:text-[#A68962] dark:hover:text-[#C5A880] hover:bg-[#F0ECE1]/50 dark:hover:bg-[#202026]'
                  }`}
                  aria-label="Account and Admin Studio"
                >
                  <User className="w-5 h-5 stroke-[1.75]" />
                  <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${
                    profileDropdownOpen ? 'rotate-180 text-[#A68962]' : ''
                  }`} />
                </button>

                {/* Profile Hover Popover */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#2A2A34] rounded-2xl shadow-2xl p-4 text-[#242321] dark:text-[#F3EFE6] space-y-3">
                      {/* Member Badge Header */}
                      <div className="flex items-center space-x-3 pb-3 border-b border-[#E5E0D6] dark:border-[#27272A]">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E1E] text-[#C5A880] flex items-center justify-center font-bold text-sm shadow-sm">
                          LE
                        </div>
                        <div className="flex-1 truncate">
                          <p className="font-bold text-sm text-[#1E1E1E] dark:text-white truncate">LEOVERSE Member</p>
                          <span className="text-[10px] text-[#A68962] font-semibold uppercase tracking-wider block">
                            Luxury Atelier Privilege
                          </span>
                        </div>
                      </div>

                      {/* Admin Studio Access - Positioned cleanly inside Profile Hover */}
                      <Link
                        to="/admin"
                        className="flex items-center justify-between p-3 bg-[#1E1E1E] hover:bg-black text-white rounded-xl transition shadow-md group cursor-pointer"
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className="p-1.5 rounded-lg bg-[#C5A880]/20 text-[#C5A880]">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-xs uppercase tracking-wider text-white">Admin Panel</p>
                            <p className="text-[10px] text-gray-300">Catalog, Orders & Analytics</p>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] transform group-hover:translate-x-1 transition" />
                      </Link>

                      {/* Customer Account Navigation Links */}
                      <div className="space-y-0.5 pt-1 text-xs">
                        <Link
                          to="/account"
                          className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-[#FAF9F6] dark:hover:bg-[#202026] font-medium transition"
                        >
                          <User className="w-4 h-4 text-gray-400" />
                          <span>My Account & Profile</span>
                        </Link>

                        <Link
                          to="/order-tracking"
                          className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-[#FAF9F6] dark:hover:bg-[#202026] font-medium transition"
                        >
                          <Package className="w-4 h-4 text-gray-400" />
                          <span>Track Orders & Shipments</span>
                        </Link>

                        <Link
                          to="/wishlist"
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-[#FAF9F6] dark:hover:bg-[#202026] font-medium transition"
                        >
                          <div className="flex items-center space-x-2.5">
                            <Heart className="w-4 h-4 text-gray-400" />
                            <span>Saved Wishlist</span>
                          </div>
                          {wishlistCount > 0 && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold">
                              {wishlistCount}
                            </span>
                          )}
                        </Link>

                        <Link
                          to="/cart"
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-[#FAF9F6] dark:hover:bg-[#202026] font-medium transition"
                        >
                          <div className="flex items-center space-x-2.5">
                            <ShoppingBag className="w-4 h-4 text-gray-400" />
                            <span>Shopping Bag</span>
                          </div>
                          {cartCount > 0 && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1E1E1E] text-white font-bold">
                              {cartCount}
                            </span>
                          )}
                        </Link>

                        {/* Theme Toggle row inside Customer Profile Popover */}
                        <button
                          type="button"
                          onClick={toggleTheme}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-[#FAF9F6] dark:hover:bg-[#202026] font-medium transition cursor-pointer"
                        >
                          <div className="flex items-center space-x-2.5">
                            {isDark ? <Sun className="w-4 h-4 text-[#C5A880]" /> : <Moon className="w-4 h-4 text-gray-400" />}
                            <span>Theme Appearance</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#FAF9F6] dark:bg-[#202026] border border-[#E5E0D6] dark:border-[#2E2E36] text-[#A68962]">
                            {isDark ? "DARK" : "LIGHT"}
                          </span>
                        </button>
                      </div>

                      {/* Footer Concierge & Switch Links */}
                      <div className="pt-2 border-t border-[#E5E0D6] dark:border-[#27272A] flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                        <Link to="/contact" className="hover:text-black dark:hover:text-white transition">Atelier Concierge</Link>
                        <Link to="/login" className="text-[#A68962] font-bold hover:underline">Sign In / Switch</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Live Search Drawer */}
        {searchOpen && (
          <div className="border-t border-[#E5E0D6] dark:border-[#27272A] bg-white dark:bg-[#18181C] shadow-xl px-4 py-4 sm:py-6 animate-in slide-in-from-top-2 duration-150">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for linen shirts, virgin wool blazers, pleated trousers, kurtas, loafers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-11 pr-10 py-3.5 bg-[#FAF9F6] dark:bg-[#202026] border border-[#DCD5C9] dark:border-[#2E2E36] rounded-xl text-sm text-[#1E1E1E] dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#A68962]"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-4" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-4 text-gray-400 hover:text-black dark:hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              {/* Live search results */}
              {searchResults.length > 0 && (
                <div className="mt-3 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#2A2A34] rounded-xl shadow-lg divide-y divide-gray-100 dark:divide-[#27272A] overflow-hidden">
                  {searchResults.map((prod) => (
                    <Link
                      key={prod.id}
                      to={`/product/${prod.id}`}
                      className="p-3 hover:bg-[#FAF9F6] dark:hover:bg-[#202026] flex items-center justify-between transition"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={prod.images?.[0] || 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=100&q=80'}
                          alt={prod.name}
                          className="w-10 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="text-xs font-semibold text-gray-900 dark:text-white">{prod.name}</p>
                          <span className="text-[10px] text-gray-500 dark:text-gray-400">{prod.department} • {prod.category}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#A68962]">₹{prod.sellingPrice?.toLocaleString()}</span>
                    </Link>
                  ))}
                  <div className="p-2 text-center bg-[#FAF9F6] dark:bg-[#1E1E24]">
                    <button
                      onClick={handleSearchSubmit}
                      className="text-xs font-bold text-[#A68962] hover:underline cursor-pointer"
                    >
                      View all results for "{searchQuery}" →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* 4. Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex">
          <div className="w-4/5 max-w-sm bg-[#FAF9F6] dark:bg-[#18181C] text-[#242321] dark:text-[#F3EFE6] h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D6] dark:border-[#27272A]">
                <div>
                  <span className="text-lg font-serif font-extrabold tracking-widest text-[#1E1E1E] dark:text-white">LEOVERSE</span>
                  <p className="text-[9px] uppercase tracking-wider text-[#A68962] font-semibold">Menswear Atelier</p>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1">
                  <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>

              <div className="py-4 space-y-4">
                {/* Admin button inside mobile drawer */}
                <Link
                  to="/admin"
                  className="w-full py-2.5 px-4 bg-[#1E1E1E] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>Admin Panel</span>
                </Link>

                {/* Theme toggle inside mobile drawer */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-full py-2.5 px-4 bg-white dark:bg-[#202026] border border-[#E5E0D6] dark:border-[#2A2A34] rounded-xl font-bold text-xs flex items-center justify-between text-gray-800 dark:text-gray-200"
                >
                  <div className="flex items-center space-x-2">
                    {isDark ? <Sun className="w-4 h-4 text-[#C5A880]" /> : <Moon className="w-4 h-4" />}
                    <span>Theme: {isDark ? "Dark Mode" : "Light Mode"}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#FAF9F6] dark:bg-[#18181C] text-[#A68962]">
                    SWITCH
                  </span>
                </button>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block px-3 pt-2">
                    Menswear Ateliers
                  </span>
                  {navItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.link}
                      className={`block px-3 py-2 text-sm font-semibold hover:text-[#A68962] ${
                        item.isSale ? 'text-rose-600' : 'text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {item.fullLabel || item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E0D6] dark:border-[#27272A] space-y-2 text-xs">
              <Link to="/account" className="block text-gray-600 dark:text-gray-400 py-1">Customer Account</Link>
              <Link to="/order-tracking" className="block text-gray-600 dark:text-gray-400 py-1">Order Tracking</Link>
              <Link to="/contact" className="block text-gray-600 dark:text-gray-400 py-1">Atelier Concierge</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
