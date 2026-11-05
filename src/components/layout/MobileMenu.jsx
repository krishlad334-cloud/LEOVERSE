import React, { useState } from 'react';
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
  Package
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { MEGA_MENU_CONFIG } from '../../services/productService';

export const MobileMenu = ({ isOpen, onClose }) => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [activeTab, setActiveTab] = useState('men');
  const [expandedSection, setExpandedSection] = useState(null);

  if (!isOpen) return null;

  const currentConfig = MEGA_MENU_CONFIG[activeTab] || MEGA_MENU_CONFIG.men;

  const toggleSection = (idx) => {
    setExpandedSection(expandedSection === idx ? null : idx);
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
      <div className="relative w-5/6 max-w-sm bg-white dark:bg-[#151518] text-[#242321] dark:text-[#F3EFE6] h-full shadow-2xl flex flex-col z-10 border-r border-[#EAE5DC] dark:border-[#27272A] overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <span className="font-serif text-xl font-extrabold tracking-[0.16em] text-[#2C4152] dark:text-white uppercase">
              LEOVERSE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D5A249]" />
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-black dark:hover:text-white rounded-lg cursor-pointer"
            aria-label="Close navigation drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Department Switcher Tabs (AJIO style) */}
        <div className="grid grid-cols-4 bg-[#F5F5F5] dark:bg-[#1A232C] border-b border-gray-200 dark:border-gray-800">
          {['men', 'women', 'kids', 'accessories'].map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => {
                setActiveTab(dept);
                setExpandedSection(null);
              }}
              className={`py-3 text-[11px] font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                activeTab === dept
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
            className="text-xs font-bold uppercase tracking-wider text-[#2C4152] dark:text-[#D5A249] hover:underline flex items-center gap-1"
          >
            <span>Explore All {currentConfig.title}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-[10px] font-mono text-gray-400">SS26 EDIT</span>
        </div>

        {/* Subcategories Accordions */}
        <div className="flex-1 overflow-y-auto px-4 py-3 divide-y divide-[#F0ECE1] dark:divide-[#27272A]">
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
                          className="text-xs text-gray-600 dark:text-gray-300 hover:text-[#2C4152] dark:hover:text-white flex items-center gap-2 py-0.5"
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
              className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 text-xs font-bold uppercase tracking-wider text-[#2C4152] dark:text-white hover:border-[#D5A249]"
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
              className="flex items-center justify-between p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300"
            >
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-rose-600" />
                <span>Sale & Special Offers</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[9px] font-bold">15% OFF</span>
            </Link>
          </div>
        </div>

        {/* Footer Account / Bag / Wishlist Links */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-[#F5F5F5] dark:bg-[#1A232C] space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <Link
              to="/wishlist"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-white dark:bg-[#121A21] border border-gray-200 dark:border-gray-700 rounded-xl text-[#2C4152] dark:text-white"
            >
              <Heart className="w-3.5 h-3.5 text-rose-600" />
              <span>Wishlist ({wishlistCount})</span>
            </Link>

            <Link
              to="/cart"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-[#2C4152] text-white rounded-xl"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bag ({cartCount})</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <Link
              to="/account/orders"
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 py-1.5 text-gray-600 dark:text-gray-300 hover:text-black"
            >
              <Package className="w-3.5 h-3.5 text-[#D5A249]" />
              <span>Track Orders</span>
            </Link>

            <Link
              to="/account"
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 py-1.5 text-gray-600 dark:text-gray-300 hover:text-black"
            >
              <User className="w-3.5 h-3.5 text-[#D5A249]" />
              <span>My Account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
