import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  BarChart3,
  Layers,
  ShoppingBag,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  User,
  ShieldCheck,
  Settings,
  Sun,
  Moon,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const AdminLayout = ({ activeTab, onSelectTab, onLogout, user, children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const { theme, toggleTheme, isDark } = useTheme();

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

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'products', label: "Men's Catalog", icon: Package },
    { id: 'media', label: 'Media Library', icon: ImageIcon, badge: 'Live Views' },
    { id: 'analytics', label: 'Product Analytics', icon: BarChart3, highlight: true },
    { id: 'categories', label: 'Menswear Categories', icon: Layers },
    { id: 'orders', label: 'Orders & Sales', icon: ShoppingBag }
  ];

  const handleSelectTab = (id) => {
    onSelectTab(id);
    setMobileSidebarOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] dark:bg-[#121214] text-[#242321] dark:text-[#F3EFE6] flex flex-col lg:flex-row font-sans transition-colors duration-200">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-white dark:bg-[#18181C] border-b border-[#E5E0D6] dark:border-[#27272A] px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-1.5 text-[#242321] dark:text-[#F3EFE6] hover:text-[#A68962] focus:outline-none cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-extrabold tracking-widest text-sm uppercase text-[#1E1E1E] dark:text-white">LEOVERSE STUDIO</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 text-[#242321] dark:text-gray-200 hover:text-[#A68962] bg-[#F8F6F2] dark:bg-[#202026] border border-[#E5E0D6] dark:border-[#2E2E36] rounded-lg"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#C5A880]" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link
            to="/"
            className="text-xs bg-[#F8F6F2] dark:bg-[#202026] border border-[#E5E0D6] dark:border-[#2E2E36] text-[#242321] dark:text-white hover:bg-[#EAE5DC] px-2.5 py-1.5 rounded-lg flex items-center space-x-1"
          >
            <span>Store</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#18181C] border-r border-[#E5E0D6] dark:border-[#27272A] flex flex-col transition-transform duration-200 lg:static lg:translate-x-0 shadow-sm ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Banner */}
        <div className="p-6 border-b border-[#E5E0D6] dark:border-[#27272A] flex items-center justify-between bg-[#FBF9F5] dark:bg-[#151518]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-extrabold tracking-[0.22em] text-[#1E1E1E] dark:text-white uppercase">
                LEOVERSE
              </span>
              <span className="text-[9px] bg-[#C5A880] text-black font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                MENSWEAR
              </span>
            </div>
            <p className="text-[11px] text-[#77746E] dark:text-gray-400 tracking-wider uppercase mt-1 font-semibold">
              Atelier Management Desk
            </p>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-black dark:hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#1E1E1E] text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-[#F8F6F2] dark:hover:bg-[#202026] hover:text-black dark:hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C5A880]' : item.highlight ? 'text-[#A68962]' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-[#C5A880] text-black' : 'bg-[#EAE5DC] dark:bg-[#26262E] text-[#242321] dark:text-gray-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {item.highlight && !isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#A68962]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Storefront preview box */}
        <div className="p-4 mx-3 mb-4 bg-[#F8F6F2] dark:bg-[#1E1E24] border border-[#E5E0D6] dark:border-[#2A2A34] rounded-xl">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#1E1E1E] dark:text-white">
            <Sparkles className="w-4 h-4 text-[#A68962]" />
            <span>Customer Storefront</span>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 mb-2.5">
            Test 100% menswear buyer view & live video plays.
          </p>
          <Link
            to="/"
            target="_blank"
            className="w-full inline-flex items-center justify-center space-x-2 py-2 bg-white dark:bg-[#151518] hover:bg-gray-50 dark:hover:bg-[#202026] border border-[#DCD5C9] dark:border-[#33333E] text-xs font-bold text-[#1E1E1E] dark:text-white rounded-lg transition shadow-xs"
          >
            <span>Open Menswear Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#A68962]" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header with Breadcrumbs & Profile Hover/Click Menu (NO FOOTER ON ADMIN SIDE!) */}
        <header className="bg-white/90 dark:bg-[#18181C]/90 backdrop-blur-md border-b border-[#E5E0D6] dark:border-[#27272A] h-16 sm:h-18 px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center space-x-3">
            <span className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold">Admin Workspace</span>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#A68962]">
              {navItems.find((n) => n.id === activeTab)?.label || 'Overview'}
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#F8F6F2] dark:bg-[#202026] hover:bg-[#EAE5DC] dark:hover:bg-[#2A2A34] border border-[#E5E0D6] dark:border-[#2E2E36] text-xs font-bold uppercase tracking-wider text-[#1E1E1E] dark:text-white rounded-lg transition"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#A68962]" />
            </Link>

            {/* Profile Hover & Click Popover Menu with Matching Customer Card Style */}
            <div
              ref={profileRef}
              className="relative"
              onMouseEnter={() => setProfileDropdownOpen(true)}
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2.5 p-1.5 pl-2.5 pr-3 bg-[#F8F6F2] dark:bg-[#202026] hover:bg-[#EAE5DC] dark:hover:bg-[#2A2A34] border border-[#E5E0D6] dark:border-[#2E2E36] rounded-full transition cursor-pointer shadow-xs"
              >
                <div className="w-7 h-7 rounded-full bg-[#1E1E1E] text-[#C5A880] flex items-center justify-center font-extrabold text-xs shadow">
                  LE
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-[#1E1E1E] dark:text-white leading-none">{user?.name || 'Leo Admin'}</p>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Executive</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${
                  profileDropdownOpen ? 'rotate-180 text-[#A68962]' : ''
                }`} />
              </button>

              {/* Rounded Profile Popover Dropdown (Matches Screenshot media_1793787445575_90d0bc3b.png) */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#2A2A34] rounded-2xl shadow-2xl p-4 text-[#242321] dark:text-[#F3EFE6] space-y-3">
                    {/* Member/Admin Header */}
                    <div className="flex items-center space-x-3 pb-3 border-b border-[#E5E0D6] dark:border-[#27272A]">
                      <div className="w-10 h-10 rounded-full bg-[#1E1E1E] text-[#C5A880] flex items-center justify-center font-bold text-sm shadow-sm">
                        LE
                      </div>
                      <div className="flex-1 truncate">
                        <p className="font-bold text-sm text-[#1E1E1E] dark:text-white truncate">
                          {user?.name || 'Studio Administrator'}
                        </p>
                        <span className="text-[10px] text-[#A68962] font-semibold uppercase tracking-wider block">
                          Head of Atelier Privilege
                        </span>
                      </div>
                    </div>

                    {/* Highlighted Storefront Card (Exact Match to Customer Hover Card Style) */}
                    <Link
                      to="/"
                      target="_blank"
                      className="flex items-center justify-between p-3 bg-[#1E1E1E] hover:bg-black text-white rounded-xl transition shadow-md group cursor-pointer"
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className="p-1.5 rounded-lg bg-[#C5A880]/20 text-[#C5A880]">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-xs uppercase tracking-wider text-white">Customer Storefront</p>
                          <p className="text-[10px] text-gray-300">View Live Menswear Store</p>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] transform group-hover:translate-x-1 transition" />
                    </Link>

                    {/* Quick Admin Tab Shortcuts */}
                    <div className="space-y-0.5 pt-1 text-xs">
                      <button
                        onClick={() => handleSelectTab('overview')}
                        className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl font-medium transition text-left cursor-pointer ${
                          activeTab === 'overview'
                            ? 'bg-[#F8F6F2] dark:bg-[#202026] text-[#A68962] font-bold'
                            : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-[#FAF9F6] dark:hover:bg-[#202026]'
                        }`}
                      >
                        <LayoutDashboard className="w-4 h-4 text-gray-400" />
                        <span>Dashboard Overview</span>
                      </button>

                      <button
                        onClick={() => handleSelectTab('products')}
                        className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl font-medium transition text-left cursor-pointer ${
                          activeTab === 'products'
                            ? 'bg-[#F8F6F2] dark:bg-[#202026] text-[#A68962] font-bold'
                            : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-[#FAF9F6] dark:hover:bg-[#202026]'
                        }`}
                      >
                        <Package className="w-4 h-4 text-gray-400" />
                        <span>Men's Catalog & Inventory</span>
                      </button>

                      <button
                        onClick={() => handleSelectTab('analytics')}
                        className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl font-medium transition text-left cursor-pointer ${
                          activeTab === 'analytics'
                            ? 'bg-[#F8F6F2] dark:bg-[#202026] text-[#A68962] font-bold'
                            : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-[#FAF9F6] dark:hover:bg-[#202026]'
                        }`}
                      >
                        <BarChart3 className="w-4 h-4 text-gray-400" />
                        <span>Product Analytics Desk</span>
                      </button>

                      <button
                        onClick={() => handleSelectTab('orders')}
                        className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl font-medium transition text-left cursor-pointer ${
                          activeTab === 'orders'
                            ? 'bg-[#F8F6F2] dark:bg-[#202026] text-[#A68962] font-bold'
                            : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-[#FAF9F6] dark:hover:bg-[#202026]'
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4 text-gray-400" />
                        <span>Orders & Customer Sales</span>
                      </button>

                      {/* Theme Toggle in Admin Profile Popover */}
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

                    {/* Footer Row: Sign Out */}
                    <div className="pt-2 border-t border-[#E5E0D6] dark:border-[#27272A] flex items-center justify-between text-xs">
                      <span className="text-[10px] text-gray-400 font-mono">admin@leoverse.com</span>
                      <button
                        type="button"
                        onClick={onLogout}
                        className="flex items-center space-x-1.5 text-red-600 hover:text-red-700 font-bold hover:underline cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
