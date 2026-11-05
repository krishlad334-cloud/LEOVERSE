import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Home as HomeIcon, Building } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import { getSavedAddresses, saveAddress, deleteAddress } from '../services/productService';

export const AccountAddresses = () => {
  const [addresses, setAddresses] = useState(getSavedAddresses());
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    tag: 'Home',
    isDefault: false
  });
  const [message, setMessage] = useState('');

  const indianStates = [
    'Andhra Pradesh', 'Delhi', 'Goa', 'Gujarat', 'Karnataka',
    'Kerala', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu',
    'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.addressLine1 || !formData.city || !formData.pincode) {
      setMessage('Please fill in all required address fields.');
      return;
    }

    const updated = saveAddress(formData);
    setAddresses(updated);
    setShowAddForm(false);
    setFormData({
      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: 'Maharashtra',
      pincode: '',
      tag: 'Home',
      isDefault: false
    });
    setMessage('Address saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = (id) => {
    const updated = deleteAddress(id);
    setAddresses(updated);
  };

  const handleSetDefault = (id) => {
    const target = addresses.find((a) => a.id === id);
    if (target) {
      const updated = saveAddress({ ...target, isDefault: true });
      setAddresses(updated);
    }
  };

  const breadcrumbs = [
    { label: 'My Account', to: '/account' },
    { label: 'Saved Addresses' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="py-6 border-b border-[#D8D2C8] dark:border-[#27272A] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68962] dark:text-[#C5A880]">
            Delivery Preferences
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#242321] dark:text-white mt-1">
            Saved Addresses
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#242321] dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider rounded-xl transition hover:opacity-90 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Cancel' : 'Add New Address'}</span>
        </button>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-semibold animate-in fade-in">
          {message}
        </div>
      )}

      {/* Add Address Form Modal / Accordion */}
      {showAddForm && (
        <div className="mb-10 bg-white dark:bg-[#18181C] border border-[#D8D2C8] dark:border-[#27272A] rounded-2xl p-6 sm:p-8 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <h2 className="text-base font-bold text-[#242321] dark:text-white uppercase tracking-wider mb-4 pb-2 border-b border-[#EAE5DC] dark:border-[#27272A]">
            Add Shipping Address
          </h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-lg text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                placeholder="Receiver name"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-lg text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                Flat, House no., Building, Company, Apartment *
              </label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-lg text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                placeholder="Address line 1"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                Area, Street, Sector, Village
              </label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-lg text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                placeholder="Address line 2 (optional)"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                City / Town *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-lg text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                placeholder="Mumbai"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                State *
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-lg text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
              >
                {indianStates.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                PIN Code *
              </label>
              <input
                type="text"
                name="pincode"
                maxLength={6}
                value={formData.pincode}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 text-xs bg-[#FAF9F6] dark:bg-[#202026] border border-[#D8D2C8] dark:border-[#383842] rounded-lg text-[#242321] dark:text-white focus:outline-none focus:border-[#A68962]"
                placeholder="6-digit PIN code"
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  className="rounded text-[#A68962]"
                />
                <span>Set as default address</span>
              </label>
            </div>

            <div className="sm:col-span-2 pt-4 flex gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#A68962] hover:bg-[#8D7350] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
              >
                Save Address
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Address Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-6 rounded-2xl border transition-all relative flex flex-col justify-between ${
              addr.isDefault
                ? 'bg-white dark:bg-[#18181C] border-[#A68962] dark:border-[#C5A880] shadow-md ring-1 ring-[#A68962]'
                : 'bg-[#FAF9F6] dark:bg-[#1A1A1E] border-[#D8D2C8] dark:border-[#27272A]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE5DC] dark:border-[#27272A] mb-3">
                <div className="flex items-center gap-2">
                  {addr.tag === 'Office' ? (
                    <Building className="w-4 h-4 text-[#A68962]" />
                  ) : (
                    <HomeIcon className="w-4 h-4 text-[#A68962]" />
                  )}
                  <span className="text-xs font-bold uppercase tracking-wider text-[#242321] dark:text-white">
                    {addr.tag || 'Home'}
                  </span>
                </div>
                {addr.isDefault && (
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#A68962]/15 text-[#A68962] dark:text-[#C5A880]">
                    Default
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-[#242321] dark:text-white">
                {addr.name}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                {addr.addressLine1}
                {addr.addressLine2 && <><br />{addr.addressLine2}</>}
                <br />
                {addr.city}, {addr.state} - <strong className="font-mono text-[#242321] dark:text-white">{addr.pincode}</strong>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-mono">
                Phone: {addr.phone}
              </p>
            </div>

            <div className="pt-4 border-t border-[#EAE5DC] dark:border-[#27272A] mt-4 flex items-center justify-between">
              {!addr.isDefault ? (
                <button
                  type="button"
                  onClick={() => handleSetDefault(addr.id)}
                  className="text-xs font-bold uppercase tracking-wider text-[#A68962] hover:underline cursor-pointer"
                >
                  Set as Default
                </button>
              ) : (
                <span className="text-xs text-emerald-600 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Primary Address</span>
                </span>
              )}

              <button
                type="button"
                onClick={() => handleDelete(addr.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                aria-label="Delete address"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountAddresses;
