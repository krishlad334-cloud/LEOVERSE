import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, ArrowLeft, ArrowRight, Sparkles, User, Lock, Mail, ShieldCheck, Check } from 'lucide-react';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordValid = password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!email) errs.email = 'Email address is required';
    else if (!isEmailValid) errs.email = 'Please enter a valid email address';
    if (!password) errs.password = 'Password is required';
    else if (!isPasswordValid) errs.password = 'Password must be at least 6 characters';

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setLoggedInUser({ email, name: email.split('@')[0] });
      }, 500);
    }
  };

  const handleDemoCustomerLogin = () => {
    setEmail('client@leoverse.com');
    setPassword('atelier2026');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoggedInUser({ email: 'client@leoverse.com', name: 'Kabir Mehra' });
    }, 400);
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

          <Link to="/" className="font-serif text-xl sm:text-2xl font-extrabold tracking-[0.2em] text-[#2C4152] dark:text-white uppercase hover:text-[#D5A249] transition-colors leading-none cursor-pointer">
            LEOVERSE
          </Link>

          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D5A249]" />
            <span className="hidden sm:inline font-semibold">256-Bit SSL Encrypted</span>
          </div>
        </div>
      </header>

      {/* Main Auth Card (compact & perfectly fitted for mobile & desktop) */}
      <div className="w-full max-w-[400px] bg-white dark:bg-[#1A232C] border border-[#E5E0D6] dark:border-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 my-2 sm:my-6 space-y-4 sm:space-y-5">
        {/* Brand Header */}
        <div className="text-center space-y-1 sm:space-y-1.5">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-bold text-[#D5A249]">
            Client Privilege Access
          </span>
          <h1 className="text-lg sm:text-xl font-serif font-bold text-[#2C4152] dark:text-white leading-tight">
            Sign In to Your Wardrobe
          </h1>
          <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
            Access your saved styles, order tracking, and privileges.
          </p>
        </div>

        {loggedInUser ? (
          <div className="bg-[#FAF9F6] dark:bg-[#121A21] border border-[#E5E0D6] dark:border-gray-800 rounded-xl p-5 text-center space-y-3.5 animate-in fade-in duration-200">
            <div className="w-11 h-11 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#2C4152] dark:text-white">Welcome, {loggedInUser.name}!</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Signed in as <span className="font-mono text-gray-700 dark:text-gray-300">{loggedInUser.email}</span>
              </p>
            </div>
            <div className="pt-1 space-y-2">
              <Link
                to="/products"
                className="w-full py-2.5 bg-[#2C4152] hover:bg-[#1D2A35] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/"
                className="w-full py-2 bg-[#F5F5F5] dark:bg-[#1A232C] hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#2C4152] dark:text-white font-semibold text-xs rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] block cursor-pointer"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5 text-xs">
            {/* Email Field */}
            <div>
              <label className="block text-[#2C4152] dark:text-gray-200 font-bold mb-1 uppercase tracking-wider text-[10px] sm:text-[11px]">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                  }}
                  placeholder="client@leoverse.com"
                  className={`w-full pl-9 pr-9 py-2.5 bg-[#FAF9F6] dark:bg-[#121A21] rounded-xl text-xs sm:text-sm text-[#2C4152] dark:text-white outline-none transition-all ${
                    isEmailValid
                      ? 'border border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-50/10'
                      : errors.email
                      ? 'border border-rose-400 ring-1 ring-rose-400/20'
                      : 'border border-gray-200 dark:border-gray-700 focus:border-[#D5A249] focus:ring-1 focus:ring-[#D5A249]/20'
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

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[#2C4152] dark:text-gray-200 font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Demo password reset link has been dispatched to your email.')}
                  className="text-[10px] sm:text-[11px] text-[#D5A249] hover:underline font-semibold cursor-pointer hover:text-[#bf8d35] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                  }}
                  placeholder="••••••••"
                  className={`w-full pl-9 pr-16 py-2.5 bg-[#FAF9F6] dark:bg-[#121A21] rounded-xl text-xs sm:text-sm text-[#2C4152] dark:text-white outline-none transition-all ${
                    isPasswordValid
                      ? 'border border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-50/10'
                      : errors.password
                      ? 'border border-rose-400 ring-1 ring-rose-400/20'
                      : 'border border-gray-200 dark:border-gray-700 focus:border-[#D5A249] focus:ring-1 focus:ring-[#D5A249]/20'
                  }`}
                  required
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                
                {/* Status checkmark + Eye toggle */}
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
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-[#D5A249]" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              {errors.password && <p className="text-rose-600 text-[10px] sm:text-[11px] mt-1">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between py-0.5">
              <label className="flex items-center space-x-2 text-[11px] sm:text-xs text-gray-600 dark:text-gray-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded text-[#2C4152] focus:ring-0 accent-[#2C4152] cursor-pointer"
                />
                <span>Remember this device</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 sm:py-3 bg-[#2C4152] hover:bg-[#1D2A35] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Divider */}
            <div className="relative my-2 sm:my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white dark:bg-[#1A232C] px-2 text-gray-400 font-bold tracking-wider">Or Quick Access</span>
              </div>
            </div>

            {/* One-Click Demo Customer Login */}
            <button
              type="button"
              onClick={handleDemoCustomerLogin}
              disabled={loading}
              className="w-full py-2 sm:py-2.5 bg-[#FAF9F6] dark:bg-[#121A21] hover:bg-amber-50/60 dark:hover:bg-amber-950/20 border border-[#E5E0D6] dark:border-gray-700 hover:border-[#D5A249] text-[#2C4152] dark:text-white font-bold text-xs rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer shadow-2xs hover:shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D5A249]" />
              <span>One-Click Demo Customer Sign In</span>
            </button>
          </form>
        )}

        {/* Switch to Register */}
        <div className="text-center pt-2.5 border-t border-[#E5E0D6] dark:border-gray-800 text-xs text-gray-600 dark:text-gray-400">
          <span>New to LEOVERSE? </span>
          <Link to="/register" className="text-[#2C4152] dark:text-[#D5A249] font-bold hover:text-[#D5A249] underline underline-offset-4 cursor-pointer transition-colors">
            Create an account
          </Link>
        </div>
      </div>

      {/* Clean Minimalist Copyright Footer */}
      <div className="py-2.5 sm:py-4 text-center text-[10px] sm:text-[11px] text-gray-500">
        © 2026 LEOVERSE MENSWEAR ATELIER. All rights reserved.
      </div>
    </div>
  );
};

export default Login;
