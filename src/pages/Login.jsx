import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, ArrowLeft, ArrowRight, Sparkles, User, Lock, Mail } from 'lucide-react';

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
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col justify-between items-center p-4 sm:p-6 select-none font-sans">
      {/* Top Bar with Brand & Back to Storefront Link */}
      <div className="w-full max-w-md flex items-center justify-between pt-4 pb-2">
        <Link
          to="/"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-500 hover:text-black transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store</span>
        </Link>

        <span className="text-[10px] uppercase font-bold tracking-widest text-[#A68962] bg-[#FAF9F6] border border-[#E5E0D6] px-2.5 py-1 rounded-full">
          Customer Portal
        </span>
      </div>

      {/* Main Auth Card (Standalone: NO Header, NO Navbar, NO Footer) */}
      <div className="w-full max-w-md bg-white border border-[#E5E0D6] rounded-2xl shadow-xl p-6 sm:p-8 my-auto space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block group">
            <span className="text-2xl font-serif font-extrabold tracking-[0.24em] text-[#1E1E1E] uppercase group-hover:opacity-90 transition">
              LEOVERSE
            </span>
            <span className="text-[9px] uppercase tracking-[0.38em] text-[#A68962] font-semibold block -mt-1">
              Menswear Atelier
            </span>
          </Link>
          <h1 className="text-lg font-bold text-[#1E1E1E] pt-2">
            Sign In to Your Wardrobe
          </h1>
          <p className="text-xs text-gray-500">
            Access your saved menswear styles, orders, and bespoke privileges.
          </p>
        </div>

        {loggedInUser ? (
          <div className="bg-[#FAF9F6] border border-[#E5E0D6] rounded-xl p-6 text-center space-y-4 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1E1E1E]">Welcome, {loggedInUser.name}!</h2>
              <p className="text-xs text-gray-500 mt-1">
                You are securely signed in as <span className="font-mono text-gray-700">{loggedInUser.email}</span>
              </p>
            </div>
            <div className="pt-2 space-y-2">
              <Link
                to="/shop"
                className="w-full py-3 bg-[#1E1E1E] hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-2"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/"
                className="w-full py-2.5 bg-[#FAF9F6] hover:bg-[#EAE5DC] border border-[#E5E0D6] text-gray-700 font-semibold text-xs rounded-xl transition block"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Email Field */}
            <div>
              <label className="block text-[#1E1E1E] font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@leoverse.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl text-sm text-[#1E1E1E] focus:outline-none focus:border-[#A68962] transition"
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
        © {new Date().getFullYear()} LEOVERSE MENSWEAR ATELIER. All rights reserved.
      </div>
    </div>
  );
};

export default Login;
