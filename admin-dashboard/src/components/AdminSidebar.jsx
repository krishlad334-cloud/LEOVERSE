import { useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Image as ImageIcon,
  Settings,
  Database,
  ExternalLink,
  Sparkles,
  Layers,
  X,
  Plus,
  LogOut,
  Eye,
} from 'lucide-react';

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  productCount = 0,
  publishedCount = 0,
  isOpen = false,
  onClose,
  onOpenAddProduct,
}) {
  const { currentUser, logout } = useAdminAuth();

  // Lock background scroll on mobile devices when sidebar drawer is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products & Inventory', icon: Package, badge: productCount },
    { id: 'orders', label: 'Customer Orders', icon: ShoppingBag },
    { id: 'media', label: 'Storage & Media', icon: ImageIcon },
    { id: 'categories', label: 'Departments & Tags', icon: Layers },
    { id: 'settings', label: 'Firebase & Database', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 sm:top-16 bottom-0 left-0 z-50 w-72 sm:w-64 max-w-[85vw] bg-white border-r border-[#E5E7EB] shadow-2xl lg:shadow-none transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between`}
      >
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Mobile close bar */}
          <div className="flex items-center justify-between lg:hidden pb-2.5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#2C4152] flex items-center justify-center text-[#D5A249] font-serif font-black text-xs">
                L
              </div>
              <span className="text-xs font-bold uppercase text-[#2C4152] tracking-wider">
                Studio Menu
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Admin Profile Banner (Visible on mobile screens) */}
          <div className="lg:hidden p-3 rounded-xl bg-[#1D2A35] text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D5A249] to-[#F1C876] text-[#1D2A35] font-serif font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                LV
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white truncate max-w-[130px] leading-tight">
                  Studio Admin
                </span>
                <span className="text-[10px] text-white/50 truncate max-w-[130px]">
                  {currentUser?.email || 'admin@leoverse.com'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                if (onClose) onClose();
              }}
              className="p-1.5 rounded-lg text-white/70 hover:text-rose-400 hover:bg-rose-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Primary Action Button: + Add New Product */}
          <button
            onClick={() => {
              if (typeof onOpenAddProduct === 'function') onOpenAddProduct();
              if (onClose) onClose();
            }}
            className="lg:hidden w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#D5A249] hover:bg-[#E5B55E] active:scale-[0.98] text-[#1D2A35] font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add New Product</span>
          </button>

          {/* Catalog Quick Pulse */}
          <div className="p-3 rounded-lg bg-[#2C4152]/5 border border-[#2C4152]/10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#2C4152] uppercase tracking-wider">
                Catalog Pulse
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#2C4152]/10">
              <div>
                <p className="text-[10px] text-gray-500">Total Items</p>
                <p className="text-base font-bold text-[#2C4152]">{productCount}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500">Published</p>
                <p className="text-base font-bold text-[#D5A249]">{publishedCount}</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (onClose) onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#2C4152] text-white shadow-sm'
                      : 'text-[#2C4152]/80 hover:bg-[#2C4152]/10 hover:text-[#2C4152] hover:scale-[1.01] active:scale-[0.99]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#D5A249]' : 'text-gray-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-[#D5A249] text-[#2C4152]'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Link to Storefront & Mobile Logout */}
        <div className="p-4 border-t border-gray-100 bg-[#F5F5F5]/60 space-y-2">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-[#2C4152] hover:border-[#D5A249] transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D5A249]" />
              <span>Customer Storefront</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </a>

          {/* Mobile Sign Out Button */}
          <button
            onClick={() => {
              logout();
              if (onClose) onClose();
            }}
            className="lg:hidden w-full flex items-center justify-center gap-2 p-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out of Studio</span>
          </button>
        </div>
      </aside>
    </>
  );
}
