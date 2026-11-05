import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Sparkles, ShieldCheck, ArrowRight, ArrowLeft, Eye, EyeOff, Check } from 'lucide-react';
import { adminLogin } from '../../services/api';

export const AdminLogin = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isPasswordValid = password.length >= 6;

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await adminLogin(password);
      if (res.success) {
        sessionStorage.setItem('leoverse_admin_token', res.token);
        sessionStorage.setItem('leoverse_admin_user', JSON.stringify(res.user));
        onLoginSuccess(res.user);
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await adminLogin('', true);
      if (res.success) {
        sessionStorage.setItem('leoverse_admin_token', res.token);
        sessionStorage.setItem('leoverse_admin_user', JSON.stringify(res.user));
        onLoginSuccess(res.user);
      }
    } catch (err) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col justify-between items-center p-3 sm:p-6 select-none font-sans">
      {/* Top Bar with Return to Store */}
      <div className="w-full max-w-[400px] flex items-center justify-between pt-2 pb-2">
        <Link
          to="/"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-500 hover:text-[#2C4152] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store</span>
        </Link>

        <span className="text-[10px] uppercase font-bold tracking-widest text-[#A68962] bg-[#FAF9F6] border border-[#E5E0D6] px-2.5 py-1 rounded-full">
          Admin Gateway
        </span>
      </div>

      <div className="w-full max-w-[400px] bg-white border border-[#E5E0D6] rounded-2xl shadow-xl p-5 sm:p-7 my-2 sm:my-auto text-[#242321]">
        {/* Brand header */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#F8F6F2] border border-[#E5E0D6] text-[#A68962] mb-3 shadow-sm">
            <Lock className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-[0.2em] uppercase text-[#1E1E1E]">
            LEOVERSE LUXE
          </h1>
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 mt-1 font-semibold">
            Menswear Atelier Executive Desk
          </p>
        </div>

        {error && (
          <div className="mb-4 p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Studio Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter admin password"
                className={`w-full pl-4 pr-16 py-2.5 bg-[#FAF9F6] rounded-xl text-[#1E1E1E] placeholder-gray-400 text-xs sm:text-sm outline-none transition-all ${
                  isPasswordValid
                    ? 'border border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-50/10'
                    : 'border border-[#DCD5C9] focus:border-[#A68962]'
                }`}
                required
              />
              
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {isPasswordValid && (
                  <Check className="w-3.5 h-3.5 text-emerald-500 animate-in fade-in duration-150" />
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 rounded-md text-gray-400 hover:text-[#2C4152] hover:bg-gray-100 transition-all cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-[#A68962]" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1.5 font-medium">
              Default password: <code className="text-[#A68962] bg-[#F8F6F2] px-1.5 py-0.5 rounded border border-[#E5E0D6] font-mono">admin123</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 sm:py-3 bg-[#2C4152] hover:bg-[#1D2A35] text-white font-bold text-xs tracking-widest uppercase rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E0D6]" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-white px-3 text-gray-400 font-semibold tracking-wider">Or Instant Access</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full py-2.5 sm:py-3 bg-[#F8F6F2] hover:bg-amber-50/70 border border-[#E5E0D6] hover:border-[#D5A249] text-[#1E1E1E] font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs hover:shadow-sm hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
        >
          <Sparkles className="w-4 h-4 text-[#A68962]" />
          <span>One-Click Demo Admin Login</span>
        </button>

        <div className="mt-5 pt-4 border-t border-[#E5E0D6] flex items-center justify-center space-x-2 text-[10px] sm:text-[11px] text-gray-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-[#A68962]" />
          <span>LEOVERSE Secure Atelier Management Access</span>
        </div>
      </div>

      {/* Clean Minimalist Copyright Footer */}
      <div className="py-2.5 sm:py-4 text-center text-[10px] sm:text-[11px] text-gray-500 space-y-0.5">
        <div>© 2026 LEOVERSE MENSWEAR ATELIER. Studio Executive Portal.</div>
        <div className="text-[10px] text-gray-400">Developed & Designed by <span className="text-[#A68962] font-semibold">Krish Lad</span></div>
      </div>
    </div>
  );
};

export default AdminLogin;
