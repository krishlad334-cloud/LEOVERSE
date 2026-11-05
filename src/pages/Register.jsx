import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, ArrowLeft, ArrowRight, User, Lock, Mail, ShieldCheck, Check } from 'lucide-react';

export const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const isNameValid = formData.fullName.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const isPasswordValid = formData.password.length >= 6;
  const isConfirmValid = formData.confirmPassword.length >= 6 && formData.confirmPassword === formData.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    else if (!isNameValid) errs.fullName = 'Name must be at least 2 characters';

    if (!formData.email.trim()) errs.email = 'Email address is required';
    else if (!isEmailValid) errs.email = 'Please enter a valid email address';

    if (!formData.password) errs.password = 'Password is required';
    else if (!isPasswordValid) errs.password = 'Password must be at least 6 characters';

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
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#121A21] text-[#2C4152] dark:text-[#F5F5F5] flex flex-col justify-between items-center select-none font-sans transition-colors p-2 sm:p-0">
      {/* Full-width Luxury Top Header */}
      <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-[#121A21]/95 backdrop-blur-md py-2.5 sm:py-3.5 px-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2C4152] dark:text-gray-300 hover:text-[#D5A249] transition-all cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Return to Store</span>
            <span className="xs:hidden">Store</span>
          </Link>

          <Link to="/" className="font-serif text-xl sm:text-2xl font-extrabold tracking-[0.2em] text-[#2C4152] dark:text-white uppercase hover:text-[#D5A249] transition cursor-pointer leading-none">
            LEOVERSE
          </Link>

          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D5A249]" />
            <span className="hidden sm:inline font-semibold">256-Bit SSL Encrypted</span>
          </div>
        </div>
      </header>

      {/* Main Auth Card (compact & responsive for mobile) */}
      <div className="w-full max-w-[420px] bg-white dark:bg-[#1A232C] border border-[#E5E0D6] dark:border-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 my-2 sm:my-6 space-y-3.5 sm:space-y-4">
        {/* Brand Header */}
        <div className="text-center space-y-1 sm:space-y-1.5">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-bold text-[#D5A249]">
            Client Privilege Registration
          </span>
          <h1 className="text-lg sm:text-xl font-serif font-bold text-[#2C4152] dark:text-white leading-tight">
            Create LEOVERSE Account
          </h1>
          <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
            Join our menswear circle for private drops and tailored sizing.
          </p>
        </div>

        {registered ? (
          <div className="bg-[#FAF9F6] border border-[#E5E0D6] rounded-xl p-5 text-center space-y-3.5 animate-in fade-in duration-200">
            <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1E1E1E]">
                Account Created for {formData.fullName}!
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Your membership privileges and welcome code (<strong className="font-mono text-[#A68962]">LUXE15</strong>) are now active.
              </p>
            </div>
            <div className="pt-1 space-y-2">
              <Link
                to="/shop"
                className="w-full py-2.5 bg-[#2C4152] hover:bg-[#1D2A35] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5 text-xs">
            {/* Full Name */}
            <div>
              <label className="block text-[#1E1E1E] dark:text-gray-200 font-bold mb-1 uppercase tracking-wider text-[10px] sm:text-[11px]">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: null }));
                  }}
                  placeholder="e.g. Kabir Mehra"
                  className={`w-full pl-9 pr-9 py-2 sm:py-2.5 bg-[#FAF9F6] dark:bg-[#121A21] rounded-xl text-xs sm:text-sm text-[#1E1E1E] dark:text-white outline-none transition-all ${
                    isNameValid
                      ? 'border border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-50/10'
                      : errors.fullName
                      ? 'border border-rose-400 ring-1 ring-rose-400/20'
                      : 'border border-[#DCD5C9] dark:border-gray-700 focus:border-[#D5A249] focus:ring-1 focus:ring-[#D5A249]/20'
                  }`}
                  required
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                {isNameValid && (
                  <Check className="w-4 h-4 text-emerald-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none animate-in fade-in duration-150" />
                )}
              </div>
              {errors.fullName && <p className="text-rose-600 text-[10px] sm:text-[11px] mt-1">{errors.fullName}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[#1E1E1E] dark:text-gray-200 font-bold mb-1 uppercase tracking-wider text-[10px] sm:text-[11px]">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                  }}
                  placeholder="you@example.com"
                  className={`w-full pl-9 pr-9 py-2 sm:py-2.5 bg-[#FAF9F6] dark:bg-[#121A21] rounded-xl text-xs sm:text-sm text-[#1E1E1E] dark:text-white outline-none transition-all ${
                    isEmailValid
                      ? 'border border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-50/10'
                      : errors.email
                      ? 'border border-rose-400 ring-1 ring-rose-400/20'
                      : 'border border-[#DCD5C9] dark:border-gray-700 focus:border-[#D5A249] focus:ring-1 focus:ring-[#D5A249]/20'
                  }`}
                  required
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                {isEmailValid && (
                  <Check className="w-4 h-4 text-emerald-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none animate-in fade-in duration-150" />
                )}
              </div>
              {errors.email && <p className="text-rose-600 text-[10px] sm:text-[11px] mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#1E1E1E] dark:text-gray-200 font-bold mb-1 uppercase tracking-wider text-[10px] sm:text-[11px]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                  }}
                  placeholder="At least 6 characters"
                  className={`w-full pl-9 pr-16 py-2 sm:py-2.5 bg-[#FAF9F6] dark:bg-[#121A21] rounded-xl text-xs sm:text-sm text-[#1E1E1E] dark:text-white outline-none transition-all ${
                    isPasswordValid
                      ? 'border border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-50/10'
                      : errors.password
                      ? 'border border-rose-400 ring-1 ring-rose-400/20'
                      : 'border border-[#DCD5C9] dark:border-gray-700 focus:border-[#D5A249] focus:ring-1 focus:ring-[#D5A249]/20'
                  }`}
                  required
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {isPasswordValid && (
                    <Check className="w-3.5 h-3.5 text-emerald-500 animate-in fade-in duration-150" />
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 rounded-md text-gray-400 hover:text-[#2C4152] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-[#D5A249]" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {errors.password && <p className="text-rose-600 text-[10px] sm:text-[11px] mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[#1E1E1E] dark:text-gray-200 font-bold mb-1 uppercase tracking-wider text-[10px] sm:text-[11px]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value });
                    if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: null }));
                  }}
                  placeholder="Repeat your password"
                  className={`w-full pl-9 pr-16 py-2 sm:py-2.5 bg-[#FAF9F6] dark:bg-[#121A21] rounded-xl text-xs sm:text-sm text-[#1E1E1E] dark:text-white outline-none transition-all ${
                    isConfirmValid
                      ? 'border border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-50/10'
                      : errors.confirmPassword
                      ? 'border border-rose-400 ring-1 ring-rose-400/20'
                      : 'border border-[#DCD5C9] dark:border-gray-700 focus:border-[#D5A249] focus:ring-1 focus:ring-[#D5A249]/20'
                  }`}
                  required
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {isConfirmValid && (
                    <Check className="w-3.5 h-3.5 text-emerald-500 animate-in fade-in duration-150" />
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="p-1 rounded-md text-gray-400 hover:text-[#2C4152] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4 text-[#D5A249]" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && <p className="text-rose-600 text-[10px] sm:text-[11px] mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 sm:py-3 bg-[#2C4152] hover:bg-[#1D2A35] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
              >
                <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Switch to Login */}
        <div className="text-center pt-2.5 border-t border-[#E5E0D6] dark:border-gray-800 text-xs text-gray-600 dark:text-gray-400">
          <span>Already have a LEOVERSE account? </span>
          <Link to="/login" className="text-[#2C4152] dark:text-[#D5A249] font-bold hover:text-[#D5A249] dark:hover:text-[#F1C876] underline underline-offset-4 cursor-pointer transition-colors">
            Sign In
          </Link>
        </div>
      </div>

      {/* Clean Minimalist Copyright Footer */}
      <div className="py-2.5 sm:py-4 text-center text-[10px] sm:text-[11px] text-gray-500 space-y-0.5">
        <div>© 2026 LEOVERSE MENSWEAR ATELIER. All rights reserved.</div>
        <div className="text-[10px] text-gray-400">Developed & Designed by <span className="text-[#D5A249] font-medium">Krish Lad</span></div>
      </div>
    </div>
  );
};

export default Register;
