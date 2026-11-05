import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, ArrowLeft, ArrowRight, User, Lock, Mail, ShieldCheck } from 'lucide-react';

export const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim()) errs.email = 'Email address is required';
    else if (!formData.email.includes('@')) errs.email = 'Please enter a valid email';
    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setRegistered(true);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#121A21] text-[#2C4152] dark:text-[#F5F5F5] flex flex-col justify-between items-center select-none font-sans transition-colors">
      {/* Full-width Luxury Top Header */}
      <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-[#121A21]/95 backdrop-blur-md py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C4152] dark:text-gray-300 hover:text-[#D5A249] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Store</span>
          </Link>

          <Link to="/" className="font-serif text-2xl font-extrabold tracking-[0.2em] text-[#2C4152] dark:text-white uppercase hover:text-[#D5A249] transition leading-none">
            LEOVERSE
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <ShieldCheck className="w-4 h-4 text-[#D5A249]" />
            <span className="hidden sm:inline font-semibold">256-Bit SSL Encrypted</span>
          </div>
        </div>
      </header>

      {/* Main Auth Card */}
      <div className="w-full max-w-md bg-white dark:bg-[#1A232C] border border-[#E5E0D6] dark:border-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 my-8 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D5A249]">
            Client Privilege Registration
          </span>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#2C4152] dark:text-white">
            Create LEOVERSE Account
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Join our menswear circle for private drops and tailored sizing privileges.
          </p>
        </div>

        {registered ? (
          <div className="bg-[#FAF9F6] border border-[#E5E0D6] rounded-xl p-6 text-center space-y-4 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1E1E1E]">
                Account Created for {formData.fullName}!
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Your membership privileges and welcome code (<strong className="font-mono text-[#A68962]">LUXE15</strong>) are now active.
              </p>
            </div>
            <div className="pt-2 space-y-2">
              <Link
                to="/shop"
                className="w-full py-3 bg-[#1E1E1E] hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-2"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Full Name */}
            <div>
              <label className="block text-[#1E1E1E] font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Kabir Mehra"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl text-sm text-[#1E1E1E] focus:outline-none focus:border-[#A68962] transition"
                  required
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              </div>
              {errors.fullName && <p className="text-red-600 text-[11px] mt-1">{errors.fullName}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[#1E1E1E] font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl text-sm text-[#1E1E1E] focus:outline-none focus:border-[#A68962] transition"
                  required
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              </div>
              {errors.email && <p className="text-red-600 text-[11px] mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#1E1E1E] font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl text-sm text-[#1E1E1E] focus:outline-none focus:border-[#A68962] transition"
                  required
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-black cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-[11px] mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[#1E1E1E] font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl text-sm text-[#1E1E1E] focus:outline-none focus:border-[#A68962] transition"
                  required
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              </div>
              {errors.confirmPassword && <p className="text-red-600 text-[11px] mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#1E1E1E] hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-2 shadow-md cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Switch to Login */}
        <div className="text-center pt-3 border-t border-[#E5E0D6] text-xs text-gray-600">
          <span>Already have a LEOVERSE account? </span>
          <Link to="/login" className="text-[#1E1E1E] font-bold hover:text-[#A68962] underline underline-offset-4">
            Sign In
          </Link>
        </div>
      </div>

      {/* Clean Minimalist Copyright Footer */}
      <div className="py-4 text-center text-[11px] text-gray-500">
        © 2026 LEOVERSE MENSWEAR ATELIER. All rights reserved.
      </div>
    </div>
  );
};

export default Register;
