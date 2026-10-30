import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Breadcrumb from '../components/common/Breadcrumb';

export const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!formData.email.includes('@')) errs.email = 'Enter a valid email address';
    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setRegistered(true);
    }
  };

  const breadcrumbs = [{ label: 'Create Account' }];

  return (
    <div className="max-w-md mx-auto px-4 py-12 md:py-20">
      <Breadcrumb items={breadcrumbs} />

      <div className="text-center mb-8">
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#77746E] block mb-1">
          Join the Circle
        </span>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#242321]">
          Create LEOVERSE Account
        </h1>
        <p className="text-xs text-[#77746E] mt-2">
          Gain private early access to small-batch drops and priority salon invitations.
        </p>
      </div>

      {registered ? (
        <div className="bg-[#FAF9F6] border border-[#D8D2C8] p-6 text-center space-y-4">
          <CheckCircle className="w-8 h-8 text-[#242321] mx-auto" />
          <h2 className="text-base font-medium text-[#242321]">
            Account Created for {formData.fullName}!
          </h2>
          <p className="text-xs text-[#77746E]">
            Your membership benefits and 10% welcome voucher code (<strong>LEO10</strong>) have been activated.
          </p>
          <Button to="/shop" variant="primary" fullWidth size="md">
            Start Exploring
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-[#FAF9F6] border border-[#D8D2C8] p-6 sm:p-8">
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Kabir Mehra"
            error={errors.fullName}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="kabir@example.com"
            error={errors.email}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="At least 6 characters"
            error={errors.password}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="Repeat password"
            error={errors.confirmPassword}
            required
          />

          <div className="pt-2">
            <Button type="submit" variant="primary" fullWidth size="md">
              Create Account
            </Button>
          </div>

          <div className="text-center pt-4 border-t border-[#D8D2C8] text-xs text-[#77746E]">
            <span>Already have an account? </span>
            <Link to="/login" className="text-[#242321] font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
