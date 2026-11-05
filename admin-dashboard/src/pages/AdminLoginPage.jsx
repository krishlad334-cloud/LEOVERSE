import { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, ExternalLink, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const { login, loginDemo, error } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [localErr, setLocalErr] = useState('');

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
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#2C4152] p-8 text-center text-white relative">
          <div className="w-14 h-14 mx-auto rounded-xl bg-[#D5A249] flex items-center justify-center text-[#2C4152] font-serif font-bold text-3xl shadow-md mb-3">
            L
          </div>
          <h1 className="text-2xl font-serif font-bold tracking-widest text-white">
            LEOVERSE
          </h1>
          <p className="text-xs tracking-widest uppercase text-[#D5A249] font-semibold mt-1">
            Studio Admin Portal
          </p>
          <span className="text-[11px] text-white/70 block mt-2">
            Fashion Catalog & Inventory Command System
          </span>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          {(error || localErr) && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error || localErr}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C4152] uppercase tracking-wider block">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@leoverse.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D5A249] outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C4152] uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D5A249] outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-[#2C4152] text-white text-xs font-bold hover:bg-[#1E2D3A] transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating via Firebase...' : 'Sign In to Studio'}</span>
              <ArrowRight className="w-4 h-4 text-[#D5A249]" />
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="pt-4 border-t border-gray-100 text-center space-y-3">
            <p className="text-[11px] text-gray-500 font-medium">
              Evaluating or testing the application?
            </p>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2.5 px-4 rounded-lg bg-[#D5A249]/15 border border-[#D5A249]/40 text-[#2C4152] text-xs font-bold hover:bg-[#D5A249]/25 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D5A249]" />
              <span>One-Click Quick Admin Sign-In</span>
            </button>
          </div>
        </div>

        {/* Footer Link to Storefront */}
        <div className="p-4 bg-[#F5F5F5] border-t border-gray-200 text-center">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2C4152] hover:text-[#D5A249] transition-colors"
          >
            <span>Back to Customer Shopping Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
