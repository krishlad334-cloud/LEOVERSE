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

      <div className="py-6 border-b border-[#D8D2C8] dark:border-[#27272A] mb-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68962] dark:text-[#C5A880]">
          LEOVERSE Gentlemen's Club
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#242321] dark:text-white mt-1">
          My Account
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Tabs */}
        <aside className="lg:col-span-4 bg-[#FAF9F6] dark:bg-[#18181C] border border-[#D8D2C8] dark:border-[#27272A] p-5 space-y-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 p-3 text-xs uppercase font-bold tracking-wider text-left transition-colors cursor-pointer rounded-xl ${
              activeTab === 'profile'
                ? 'bg-[#252522] dark:bg-[#C5A880] text-[#FAF9F6] dark:text-black'
                : 'text-[#77746E] dark:text-gray-300 hover:text-[#242321] dark:hover:text-white hover:bg-[#EAE5DC]/50 dark:hover:bg-[#202026]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Details</span>
          </button>

          <Link
            to="/account/orders"
            className="w-full flex items-center justify-between p-3 text-xs uppercase font-bold tracking-wider text-left text-[#77746E] dark:text-gray-300 hover:text-[#242321] dark:hover:text-white hover:bg-[#EAE5DC]/50 dark:hover:bg-[#202026] transition-colors rounded-xl"
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4" />
              <span>Orders & Tracking</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to="/account/addresses"
            className="w-full flex items-center justify-between p-3 text-xs uppercase font-bold tracking-wider text-left text-[#77746E] dark:text-gray-300 hover:text-[#242321] dark:hover:text-white hover:bg-[#EAE5DC]/50 dark:hover:bg-[#202026] transition-colors rounded-xl"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to="/wishlist"
            className="w-full flex items-center justify-between p-3 text-xs uppercase font-bold tracking-wider text-left text-[#77746E] dark:text-gray-300 hover:text-[#242321] dark:hover:text-white hover:bg-[#EAE5DC]/50 dark:hover:bg-[#202026] transition-colors rounded-xl"
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
            className={`w-full flex items-center gap-3 p-3 text-xs uppercase font-bold tracking-wider text-left transition-colors cursor-pointer rounded-xl ${
              activeTab === 'security'
                ? 'bg-[#252522] dark:bg-[#C5A880] text-[#FAF9F6] dark:text-black'
                : 'text-[#77746E] dark:text-gray-300 hover:text-[#242321] dark:hover:text-white hover:bg-[#EAE5DC]/50 dark:hover:bg-[#202026]'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Security & Passwords</span>
          </button>

          <div className="pt-4 border-t border-[#D8D2C8]/70 dark:border-[#27272A] mt-4">
            <Link
              to="/login"
              className="w-full flex items-center gap-3 p-3 text-xs uppercase font-semibold tracking-wider text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Link>
          </div>
        </aside>

        {/* Tab Content */}
        <div className="lg:col-span-8 bg-white dark:bg-[#18181C] border border-[#D8D2C8] dark:border-[#27272A] rounded-2xl p-6 sm:p-8 shadow-xs">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#EAE5DC] dark:border-[#27272A]">
                <h2 className="text-lg font-bold text-[#242321] dark:text-white uppercase tracking-wider">
                  Personal Profile
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Manage your personal identity, contact details, and sizing profile.
                </p>
              </div>

              {saved && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-xl text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-xl text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-xl text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-xl text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#242321] dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider rounded-xl transition hover:opacity-90 cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#EAE5DC] dark:border-[#27272A]">
                <h2 className="text-lg font-bold text-[#242321] dark:text-white uppercase tracking-wider">
                  Security & Authentication
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Update your wardrobe account password and active login sessions.
                </p>
              </div>

              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-xl text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Minimum 6 characters"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-xl text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => alert('Password updated.')}
                  className="px-6 py-2.5 bg-[#242321] dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider rounded-xl transition hover:opacity-90 cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
