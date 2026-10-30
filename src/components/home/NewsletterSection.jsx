import React, { useState } from 'react';
import { ArrowRight, Check, Mail, ShieldCheck } from 'lucide-react';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAF9F6] border-t border-b border-[#D8D2C8] select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAE5DC] text-[#242321] text-[10px] font-bold tracking-[0.24em] uppercase">
          <Mail className="w-3 h-3 text-[#77746E]" />
          LEOVERSE Gentlemen's Dispatch
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#242321] leading-tight">
          Privilege Access. First Look.
        </h2>

        <p className="font-serif italic text-base sm:text-lg text-[#77746E] max-w-xl mx-auto">
          Subscribe to receive private invitations to small-batch capsule drops, tailoring appointments, and 10% off your first purchase.
        </p>

        {/* Subscription Form */}
        <div className="max-w-md mx-auto pt-2">
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold tracking-wider uppercase">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>Welcome to LEOVERSE. Check your inbox for your code.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="flex-1 px-4 py-3 bg-[#FAF9F6] border border-[#D8D2C8] text-xs text-[#242321] placeholder-[#77746E] focus:outline-none focus:border-[#242321] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#252522] hover:bg-black text-[#FAF9F6] text-xs uppercase tracking-[0.14em] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-2 text-[11px] text-[#77746E] pt-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
            <span>Strict privacy. No spam. Unsubscribe at any time.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
