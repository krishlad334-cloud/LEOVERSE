import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Breadcrumb from '../components/common/Breadcrumb';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [demoLoggedIn, setDemoLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.email) errs.email = 'Email is required';
    else if (!formData.email.includes('@')) errs.email = 'Enter a valid email address';
    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setDemoLoggedIn(true);
    }
  };

  const breadcrumbs = [{ label: 'Account Login' }];

  return (
    <div className="max-w-md mx-auto px-4 py-12 md:py-20">
      <Breadcrumb items={breadcrumbs} />

      <div className="text-center mb-8">
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#77746E] block mb-1">
          Welcome Back
        </span>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#242321]">
          Sign in to LEOVERSE
        </h1>
        <p className="text-xs text-[#77746E] mt-2">
          Access your saved pieces, curated orders, and bespoke preferences.
        </p>
      </div>

      {demoLoggedIn ? (
        <div className="bg-[#FAF9F6] border border-[#D8D2C8] p-6 text-center space-y-4">
          <CheckCircle className="w-8 h-8 text-[#242321] mx-auto" />
          <h2 className="text-base font-medium text-[#242321]">Welcome back, {formData.email}!</h2>
          <p className="text-xs text-[#77746E]">
            You are signed into your demo member profile.
          </p>
          <Button to="/shop" variant="primary" fullWidth size="md">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-[#FAF9F6] border border-[#D8D2C8] p-6 sm:p-8">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@example.com"
            error={errors.email}
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              error={errors.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-[#77746E] hover:text-[#242321] p-1 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#77746E]">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="accent-[#252522]"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => alert('Password reset demonstration link dispatched to email.')}
              className="text-[#77746E] hover:text-[#242321] underline underline-offset-4"
            >
              Forgot password?
            </button>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" fullWidth size="md">
              Sign In
            </Button>
          </div>

          <div className="text-center pt-4 border-t border-[#D8D2C8] text-xs text-[#77746E]">
            <span>Don't have an account yet? </span>
            <Link to="/register" className="text-[#242321] font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
