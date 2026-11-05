import { useState, useRef, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { isFirebaseConfigured } from '../services/firebase';
import {
  ExternalLink,
  Plus,
  LogOut,
  Menu,
  Search,
  Eye,
} from 'lucide-react';

export default function AdminNavbar({ onOpenAddProduct, onToggleSidebar, onSearchCatalog }) {
  const { currentUser, logout } = useAdminAuth();
  const [navSearch, setNavSearch] = useState('');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setNavSearch(val);
    if (typeof onSearchCatalog === 'function') {
      onSearchCatalog(val);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1D2A35]/95 backdrop-blur-md text-white border-b border-[#2C4152]/70 shadow-sm select-none">
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-6">
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 lg:w-60">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <a href="/" className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#D5A249] to-[#BF8D35] flex items-center justify-center text-[#1D2A35] font-serif font-black text-base sm:text-lg shadow-sm group-hover:scale-105 transition-transform shrink-0">
                L
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-[0.2em] sm:tracking-[0.25em] text-xs sm:text-sm font-bold text-white group-hover:text-[#D5A249] transition-colors leading-tight">
                  LEOVERSE
                </span>
                <span className="hidden xs:inline text-[8px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[#D5A249] font-bold">
                  STUDIO PORTAL
                </span>
              </div>
            </a>
          </div>

          {/* Center: Quick Search Input with Pixel-Perfect Centered Icon */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-auto">
            <div className="relative w-full flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D5A249]">
                <Search className="w-4 h-4 shrink-0" strokeWidth={2.25} />
              </div>
              <input
                type="text"
                value={navSearch}
                onChange={handleSearchChange}
                placeholder="Search catalog, styles, SKU or brand..."
                className="w-full h-9 pl-9 pr-3 text-xs bg-[#121A21] border border-white/20 hover:border-white/30 rounded-lg text-white placeholder-white/50 outline-none focus:border-[#D5A249] focus:ring-1 focus:ring-[#D5A249] transition-all"
              />
            </div>
          </div>

          {/* Desktop Right: Actions, Storefront Link, Add Product, Profile Dropdown */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* View Live Storefront */}
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/15 text-white/90 hover:text-white border border-white/15 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xs cursor-pointer"
              title="Open Live Shopping Storefront in new tab"
            >
              <Eye className="w-3.5 h-3.5 text-[#D5A249]" />
              <span>Storefront</span>
              <ExternalLink className="w-3 h-3 text-white/40 -ml-0.5" />
            </a>

            {/* Add Product Button */}
            <button
              onClick={onOpenAddProduct}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg bg-[#D5A249] hover:bg-[#E5B55E] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] text-[#1D2A35] transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Product</span>
            </button>

            {/* Desktop Admin Profile: Only 'LV' Logo Button (Hover/Click reveals full details & logout) */}
            <div
              ref={profileRef}
              className="relative pl-3 border-l border-white/15"
              onMouseEnter={() => setProfileMenuOpen(true)}
              onMouseLeave={() => setProfileMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="relative rounded-full p-0.5 transition-all duration-200 cursor-pointer group focus:outline-none"
                aria-expanded={profileMenuOpen}
                title="Admin Profile & Options"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D5A249] to-[#F1C876] text-[#1D2A35] font-serif font-black text-xs flex items-center justify-center shadow-sm ring-2 ring-white/15 group-hover:ring-[#D5A249] group-hover:scale-105 active:scale-95 transition-all">
                  LV
                </div>
              </button>

              {/* Hover & Click Profile Dropdown Menu with All Details & Logout */}
              {profileMenuOpen && (
                <div className="absolute right-0 top-full pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-[#1D2A35] rounded-2xl border border-white/15 shadow-2xl p-4 text-white backdrop-blur-xl space-y-3">
                    {/* Profile Header */}
                    <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#D5A249] to-[#F1C876] text-[#1D2A35] font-serif font-black text-sm flex items-center justify-center shadow-md shrink-0">
                        LV
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white truncate leading-snug">
                          Studio Admin
                        </h4>
                        <span className="text-[10px] text-white/50 truncate block mt-0.5">
                          {currentUser?.email || 'admin@leoverse.com'}
                        </span>
                      </div>
                    </div>

                    {/* Active Status Badge */}
                    <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-[10px]">
                      <span className="text-white/60">Session Status</span>
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live & Authenticated</span>
                      </span>
                    </div>

                    {/* Quick Storefront Link */}
                    <div>
                      <a
                        href="http://localhost:5173"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-xs group/link"
                      >
                        <span className="flex items-center gap-2">
                          <Eye className="w-3.5 h-3.5 text-[#D5A249]" />
                          <span>Customer Storefront</span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover/link:text-white transition-colors" />
                      </a>
                    </div>

                    {/* LOGOUT SECTION: Relocated here inside the profile hover menu */}
                    <div className="pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-600 transition-all cursor-pointer font-semibold text-xs group/logout shadow-2xs"
                      >
                        <span className="flex items-center gap-2">
                          <LogOut className="w-4 h-4 text-rose-400 group-hover/logout:text-white group-hover/logout:-translate-x-0.5 transition-all" />
                          <span>Sign Out of Studio</span>
                        </span>
                        <span className="text-[10px] text-rose-300/60 group-hover/logout:text-white/80 font-normal">
                          Logout
                        </span>
                      </button>
                    </div>

                    {/* Developer & Designer Signature */}
                    <div className="pt-2 border-t border-white/10 text-center">
                      <span className="text-[9px] text-white/40 block">Developed & Designed by</span>
                      <span className="text-[11px] font-bold text-[#D5A249] tracking-wide">Krish Lad</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Right: Clean Avatar Button (Tap to open sidebar with all actions) */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onToggleSidebar}
              className="flex items-center gap-2 p-1 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
              title="Open Menu & Admin Options"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D5A249] to-[#F1C876] text-[#1D2A35] font-serif font-black text-xs flex items-center justify-center shadow-xs">
                LV
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
