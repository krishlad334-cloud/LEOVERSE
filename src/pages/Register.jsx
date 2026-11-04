import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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
            Create LEOVERSE Account
          </h1>
          <p className="text-xs text-gray-500">
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
        © {new Date().getFullYear()} LEOVERSE MENSWEAR ATELIER. All rights reserved.
      </div>
    </div>
  );
};

export default Register;
