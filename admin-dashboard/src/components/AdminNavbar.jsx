import { useState } from 'react';
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

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setNavSearch(val);
    if (typeof onSearchCatalog === 'function') {
      onSearchCatalog(val);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1D2A35]/95 backdrop-blur-md text-white border-b border-[#2C4152]/70 shadow-sm select-none">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-3 shrink-0 lg:w-60">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <a href="/" className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D5A249] to-[#BF8D35] flex items-center justify-center text-[#1D2A35] font-serif font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
                L
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-[0.25em] text-sm font-bold text-white group-hover:text-[#D5A249] transition-colors leading-tight">
                  LEOVERSE
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#D5A249] font-bold">
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

          {/* Right: Actions, Storefront Link, Add Product, Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* View Live Storefront */}
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/15 text-white/90 hover:text-white border border-white/15 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xs cursor-pointer"
              title="Open Live Shopping Storefront in new tab"
            >
              <Eye className="w-3.5 h-3.5 text-[#D5A249]" />
              <span className="hidden sm:inline">Storefront</span>
              <ExternalLink className="w-3 h-3 text-white/40 -ml-0.5" />
            </a>

            {/* Add Product Button */}
            <button
              onClick={onOpenAddProduct}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg bg-[#D5A249] hover:bg-[#E5B55E] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] text-[#1D2A35] transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Product</span>
            </button>

            {/* Admin Profile & Logout */}
            <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-white/15">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D5A249] to-[#F1C876] text-[#1D2A35] font-bold text-xs flex items-center justify-center shadow-xs shrink-0 cursor-default">
                {(currentUser?.displayName || 'AD').substring(0, 2).toUpperCase()}
              </div>

              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-white truncate max-w-[110px] leading-tight">
                  {currentUser?.displayName || 'Curator'}
                </span>
                <span className="text-[10px] font-semibold text-[#D5A249]">
                  Studio Admin
                </span>
              </div>

              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-white/60 hover:text-rose-400 hover:bg-rose-500/15 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="Sign out of Admin Dashboard"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
