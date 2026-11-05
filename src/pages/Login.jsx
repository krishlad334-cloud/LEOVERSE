import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, ArrowLeft, ArrowRight, Sparkles, User, Lock, Mail, ShieldCheck } from 'lucide-react';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!email) errs.email = 'Email address is required';
    else if (!email.includes('@')) errs.email = 'Please enter a valid email';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';

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
            Client Privilege Access
          </span>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#2C4152] dark:text-white">
            Sign In to Your Wardrobe
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Access your saved styles, order tracking, and bespoke privileges.
          </p>
        </div>

        {loggedInUser ? (
          <div className="bg-[#FAF9F6] dark:bg-[#121A21] border border-[#E5E0D6] dark:border-gray-800 rounded-xl p-6 text-center space-y-4 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#2C4152] dark:text-white">Welcome, {loggedInUser.name}!</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                You are securely signed in as <span className="font-mono text-gray-700 dark:text-gray-300">{loggedInUser.email}</span>
              </p>
            </div>
            <div className="pt-2 space-y-2">
              <Link
                to="/products"
                className="w-full py-3 bg-[#2C4152] dark:bg-[#D5A249] hover:bg-black dark:hover:bg-[#C49238] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-2"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/"
                className="w-full py-2.5 bg-[#F5F5F5] dark:bg-[#1A232C] hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#2C4152] dark:text-white font-semibold text-xs rounded-xl transition block"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Email Field */}
            <div>
              <label className="block text-[#2C4152] dark:text-gray-200 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@leoverse.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#F5F5F5] dark:bg-[#121A21] border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-[#2C4152] dark:text-white focus:outline-none focus:border-[#D5A249] transition"
                  required
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              </div>
              {errors.email && <p className="text-red-600 text-[11px] mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[#1E1E1E] font-bold uppercase tracking-wider text-[11px]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Demo password reset dispatched.')}
                  className="text-[11px] text-[#A68962] hover:underline font-semibold"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl text-sm text-[#1E1E1E] focus:outline-none focus:border-[#A68962] transition"
                  required
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-black cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-[11px] mt-1">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between py-1">
              <label className="flex items-center space-x-2 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1E1E1E] focus:ring-0 accent-[#1E1E1E] cursor-pointer"
                />
                <span>Remember this device</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#1E1E1E] hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E0D6]" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white px-2.5 text-gray-400 font-bold tracking-wider">Or Quick Access</span>
              </div>
            </div>

            {/* One-Click Demo Customer Login */}
            <button
              type="button"
              onClick={handleDemoCustomerLogin}
              disabled={loading}
              className="w-full py-3 bg-[#FAF9F6] hover:bg-[#EAE5DC] border border-[#E5E0D6] text-[#1E1E1E] font-bold text-xs rounded-xl transition flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A68962]" />
              <span>One-Click Demo Customer Sign In</span>
            </button>
          </form>
        )}

        {/* Switch to Register */}
        <div className="text-center pt-3 border-t border-[#E5E0D6] text-xs text-gray-600">
          <span>New to LEOVERSE? </span>
          <Link to="/register" className="text-[#1E1E1E] font-bold hover:text-[#A68962] underline underline-offset-4">
            Create an account
          </Link>
        </div>
      </div>

      {/* Clean Minimalist Copyright Footer (NO noisy full footer) */}
      <div className="py-4 text-center text-[11px] text-gray-500">
        © 2026 LEOVERSE MENSWEAR ATELIER. All rights reserved.
      </div>
    </div>
  );
};

export default Login;
