import { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, ExternalLink, AlertCircle, Eye, EyeOff, Check } from 'lucide-react';

export default function AdminLoginPage() {
  const { login, loginDemo, error } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localErr, setLocalErr] = useState('');

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordValid = password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLocalErr('');
    try {
      const res = await login(email, password);
      if (!res.success) {
        setLocalErr(res.error || 'Failed to authenticate admin credentials.');
      }
    } catch (err) {
      setLocalErr(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    loginDemo();
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col justify-center items-center p-3 sm:p-4">
      <div className="max-w-[420px] w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-[#2C4152] p-5 sm:p-7 text-center text-white relative">
          <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-xl bg-[#D5A249] flex items-center justify-center text-[#2C4152] font-serif font-bold text-2xl sm:text-3xl shadow-md mb-2.5">
            L
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-widest text-white">
            LEOVERSE
          </h1>
          <p className="text-[10px] sm:text-xs tracking-widest uppercase text-[#D5A249] font-semibold mt-1">
            Studio Admin Portal
          </p>
          <span className="text-[10px] sm:text-[11px] text-white/70 block mt-1.5">
            Fashion Catalog & Inventory Command System
          </span>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-7 space-y-4 sm:space-y-5">
          {(error || localErr) && (
            <div className="p-2.5 sm:p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error || localErr}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-[11px] sm:text-xs font-semibold text-[#2C4152] uppercase tracking-wider block">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (localErr) setLocalErr('');
                  }}
                  placeholder="admin@leoverse.com"
                  className={`w-full pl-9 pr-9 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg outline-none transition-all ${
                    isEmailValid
                      ? 'border border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-50/10'
                      : 'border border-gray-300 focus:ring-2 focus:ring-[#D5A249]'
                  }`}
                  required
                />
                {isEmailValid && (
                  <Check className="w-4 h-4 text-emerald-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none animate-in fade-in duration-150" />
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] sm:text-xs font-semibold text-[#2C4152] uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (localErr) setLocalErr('');
                  }}
                  placeholder="••••••••••••"
                  className={`w-full pl-9 pr-16 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg outline-none transition-all ${
                    isPasswordValid
                      ? 'border border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-50/10'
                      : 'border border-gray-300 focus:ring-2 focus:ring-[#D5A249]'
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
                    {showPassword ? <EyeOff className="w-4 h-4 text-[#D5A249]" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-[#2C4152] text-white text-xs font-bold hover:bg-[#1E2D3A] transition-all shadow-sm hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none mt-1"
            >
              <span>{loading ? 'Authenticating via Firebase...' : 'Sign In to Studio'}</span>
              <ArrowRight className="w-4 h-4 text-[#D5A249]" />
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="pt-3 border-t border-gray-100 text-center space-y-2.5">
            <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium">
              Evaluating or testing the application?
            </p>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2 sm:py-2.5 px-4 rounded-lg bg-[#D5A249]/15 border border-[#D5A249]/40 text-[#2C4152] text-xs font-bold hover:bg-[#D5A249]/25 hover:border-[#D5A249] hover:shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D5A249]" />
              <span>One-Click Quick Admin Sign-In</span>
            </button>
          </div>
        </div>

        {/* Footer Link to Storefront */}
        <div className="p-3.5 bg-[#F5F5F5] border-t border-gray-200 text-center">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2C4152] hover:text-[#D5A249] transition-all cursor-pointer hover:underline underline-offset-4"
          >
            <span>Back to Customer Shopping Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
