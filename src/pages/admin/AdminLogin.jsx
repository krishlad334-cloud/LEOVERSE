import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Sparkles, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { adminLogin } from '../../services/api';

export const AdminLogin = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col justify-between items-center p-4 sm:p-6 select-none font-sans">
      {/* Top Bar with Return to Store */}
      <div className="w-full max-w-md flex items-center justify-between pt-4 pb-2">
        <Link
          to="/"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-500 hover:text-black transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store</span>
        </Link>

        <span className="text-[10px] uppercase font-bold tracking-widest text-[#A68962] bg-[#FAF9F6] border border-[#E5E0D6] px-2.5 py-1 rounded-full">
          Admin Gateway
        </span>
      </div>

      <div className="w-full max-w-md bg-white border border-[#E5E0D6] rounded-2xl shadow-xl p-8 my-auto text-[#242321]">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F8F6F2] border border-[#E5E0D6] text-[#A68962] mb-4 shadow-sm">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-serif font-bold tracking-[0.2em] uppercase text-[#1E1E1E]">
            LEOVERSE LUXE
          </h1>
          <p className="text-xs uppercase tracking-widest text-gray-500 mt-1 font-semibold">
            Menswear Atelier Executive Desk
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Studio Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl text-[#1E1E1E] placeholder-gray-400 focus:outline-none focus:border-[#A68962] text-sm transition"
              required
            />
            <p className="text-[11px] text-gray-500 mt-1.5 font-medium">
              Default password: <code className="text-[#A68962] bg-[#F8F6F2] px-1.5 py-0.5 rounded border border-[#E5E0D6] font-mono">admin123</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#1E1E1E] hover:bg-black text-white font-bold text-xs tracking-widest uppercase rounded-xl transition flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 shadow-md"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E0D6]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-gray-400 font-semibold tracking-wider">Or Instant Access</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full py-3.5 bg-[#F8F6F2] hover:bg-[#EAE5DC] border border-[#E5E0D6] text-[#1E1E1E] font-bold text-xs tracking-wider uppercase rounded-xl transition flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-[#A68962]" />
          <span>One-Click Demo Admin Login</span>
        </button>

        <div className="mt-8 pt-6 border-t border-[#E5E0D6] flex items-center justify-center space-x-2 text-[11px] text-gray-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-[#A68962]" />
          <span>LEOVERSE Secure Atelier Management Access</span>
        </div>
      </div>

      {/* Clean Minimalist Copyright Footer */}
      <div className="py-4 text-center text-[11px] text-gray-500">
        © {new Date().getFullYear()} LEOVERSE MENSWEAR ATELIER. Studio Executive Portal.
      </div>
    </div>
  );
};

export default AdminLogin;
