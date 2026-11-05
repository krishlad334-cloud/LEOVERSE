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
} from 'lucide-react';

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  productCount = 0,
  publishedCount = 0,
  isOpen = false,
  onClose,
}) {
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
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-[#E5E7EB] transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between`}
      >
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Mobile close bar */}
          <div className="flex items-center justify-between lg:hidden pb-2 border-b border-gray-100">
            <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
              Navigation
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

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

        {/* Sidebar Footer Link to Storefront */}
        <div className="p-4 border-t border-gray-100 bg-[#F5F5F5]/60">
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
          <p className="text-[10px] text-gray-400 text-center mt-2">
            LEOVERSE Studio v1.0 • React + Vite + Firebase
          </p>
        </div>
      </aside>
    </>
  );
}
