import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Globe, ExternalLink } from 'lucide-react';
import { footerLinks } from '../../data/navigation';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#252522] dark:bg-[#0E0E10] text-[#F7F5F0] pt-16 md:pt-24 pb-12 border-t border-[#383733] dark:border-[#222226] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Newsletter & Brand intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#383733] dark:border-[#222226]">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#FAF9F6]">
              Good things. <br className="hidden sm:inline" />
              In your inbox.
            </h2>
            <p className="text-sm text-[#DCD5CA]/80 max-w-md leading-relaxed">
              Receive early access to limited seasonal capsule drops, private tailoring salon invitations, and considered editorial reflections on everyday dressing.
            </p>
            <form onSubmit={handleSubscribe} className="pt-2 max-w-md">
              {subscribed ? (
                <div className="flex items-center gap-2 text-sm text-[#EAE5DC] bg-[#383733]/50 py-3 px-4 border border-[#4a4944]">
                  <Check className="w-4 h-4 text-[#DCD5CA]" />
                  <span>Thank you for subscribing to LEOVERSE Notes.</span>
                </div>
              ) : (
                <div className="relative flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-transparent border-b border-[#77746E] py-3 pr-10 text-sm text-[#FAF9F6] placeholder-[#77746E] focus:outline-none focus:border-[#FAF9F6] transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 p-2 text-[#FAF9F6] hover:text-[#DCD5CA] transition-colors cursor-pointer"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#DCD5CA] mb-4">
                Shop
              </h4>
              <ul className="space-y-2.5 text-xs tracking-wider">
                {footerLinks.shop.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-[#DCD5CA]/70 hover:text-[#FAF9F6] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#DCD5CA] mb-4">
                Explore
              </h4>
              <ul className="space-y-2.5 text-xs tracking-wider">
                {footerLinks.explore.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-[#DCD5CA]/70 hover:text-[#FAF9F6] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#DCD5CA] mb-4">
                Client Care
              </h4>
              <ul className="space-y-2.5 text-xs tracking-wider">
                {footerLinks.services.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-[#DCD5CA]/70 hover:text-[#FAF9F6] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {footerLinks.legal.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-[#DCD5CA]/70 hover:text-[#FAF9F6] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Massive LEOVERSE Wordmark Banner */}
        <div className="pt-12 pb-8 flex flex-col md:flex-row items-baseline justify-between gap-4 border-b border-[#383733] dark:border-[#222226]">
          <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.18em] text-[#FAF9F6] select-none uppercase">
            LEOVERSE
          </span>
          <span className="font-serif italic text-lg sm:text-xl text-[#DCD5CA]/70 tracking-wide md:pb-3">
            The everyday, elevated.
          </span>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#77746E] gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-6">
            <span>&copy; 2026 LEOVERSE Apparel. All rights reserved.</span>
            <span className="hidden sm:inline text-[#555]">•</span>
            <span className="text-[#DCD5CA]/80">
              Developed & Designed by <span className="text-[#D5A249] font-semibold tracking-wide">Krish Lad</span>
            </span>
            <div className="hidden lg:flex items-center gap-1.5 text-[#DCD5CA]/70">
              <Globe className="w-3.5 h-3.5" />
              <span>India (INR ₹)</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="http://localhost:5174"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D5A249] hover:text-[#E4BA68] font-bold transition-colors flex items-center gap-1"
            >
              <span>Admin Studio Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <Link to="/privacy-policy" className="hover:text-[#DCD5CA] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#DCD5CA] transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/shipping-policy" className="hover:text-[#DCD5CA] transition-colors">
              Shipping & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
