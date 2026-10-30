import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, MapPin, Heart, Shield, LogOut, Check, ArrowRight } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import { useWishlist } from '../context/WishlistContext';

export const Account = () => {
  const { wishlistCount } = useWishlist();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    firstName: 'Dev',
    lastName: 'Sharma',
    email: 'dev.sharma@example.com',
    phone: '+91 98765 43210',
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const breadcrumbs = [{ label: 'My Account' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 select-none">
      <Breadcrumb items={breadcrumbs} />

      <div className="py-6 border-b border-[#D8D2C8] mb-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#77746E]">
          LEOVERSE Gentlemen's Club
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#242321] mt-1">
          My Account
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Tabs */}
        <aside className="lg:col-span-4 bg-[#FAF9F6] border border-[#D8D2C8] p-5 space-y-1">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 p-3 text-xs uppercase font-bold tracking-wider text-left transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#252522] text-[#FAF9F6]'
                : 'text-[#77746E] hover:text-[#242321] hover:bg-[#EAE5DC]/50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Details</span>
          </button>

          <Link
            to="/order-history"
            className="w-full flex items-center justify-between p-3 text-xs uppercase font-bold tracking-wider text-left text-[#77746E] hover:text-[#242321] hover:bg-[#EAE5DC]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4" />
              <span>Order History & Tracking</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to="/wishlist"
            className="w-full flex items-center justify-between p-3 text-xs uppercase font-bold tracking-wider text-left text-[#77746E] hover:text-[#242321] hover:bg-[#EAE5DC]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4" />
              <span>Wishlist ({wishlistCount})</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 p-3 text-xs uppercase font-bold tracking-wider text-left transition-colors cursor-pointer ${
              activeTab === 'security'
                ? 'bg-[#252522] text-[#FAF9F6]'
                : 'text-[#77746E] hover:text-[#242321] hover:bg-[#EAE5DC]/50'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Security & Passwords</span>
          </button>

          <div className="pt-4 border-t border-[#D8D2C8]/70 mt-4">
            <Link
              to="/login"
              className="w-full flex items-center gap-3 p-3 text-xs uppercase font-semibold tracking-wider text-red-700 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Link>
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-8 bg-[#FAF9F6] border border-[#D8D2C8] p-6 sm:p-8">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#242321]">Personal Profile</h2>
              <p className="text-xs text-[#77746E]">
                Update your contact details and default delivery information.
              </p>

              {saved && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  <Check className="w-4 h-4" />
                  <span>Changes saved successfully.</span>
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#242321] block mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#D8D2C8] text-xs text-[#242321] focus:outline-none focus:border-[#242321]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#242321] block mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#D8D2C8] text-xs text-[#242321] focus:outline-none focus:border-[#242321]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#242321] block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#D8D2C8] text-xs text-[#242321] focus:outline-none focus:border-[#242321]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#242321] block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#D8D2C8] text-xs text-[#242321] focus:outline-none focus:border-[#242321]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#252522] hover:bg-black text-[#FAF9F6] text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#242321]">Account Security</h2>
              <p className="text-xs text-[#77746E]">
                Update your account password and security preferences.
              </p>
              <form onSubmit={handleSave} className="space-y-4 max-w-md">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#242321] block mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full p-2.5 bg-[#FAF9F6] border border-[#D8D2C8] text-xs text-[#242321] focus:outline-none focus:border-[#242321]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#242321] block mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full p-2.5 bg-[#FAF9F6] border border-[#D8D2C8] text-xs text-[#242321] focus:outline-none focus:border-[#242321]"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#252522] hover:bg-black text-[#FAF9F6] text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Account;
