import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, CheckCircle, Clock } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Breadcrumb from '../components/common/Breadcrumb';
import { getWhatsAppUrl, OFFICIAL_WHATSAPP_PHONE } from '../utils/whatsapp';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Order & Sizing Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  const breadcrumbs = [{ label: 'Contact Us' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="pb-8 mb-12 border-b border-[#D8D2C8] max-w-2xl">
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#77746E] block mb-1">
          Client Care & Appointments
        </span>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#242321]">
          We are here to assist.
        </h1>
        <p className="text-xs sm:text-sm text-[#77746E] mt-2">
          Whether you need personalized sizing guidance, styling consultation, or exchange assistance, our concierge team responds within 24 business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="bg-[#FAF9F6] border border-[#D8D2C8] p-8 text-center space-y-4">
              <CheckCircle className="w-10 h-10 text-[#242321] mx-auto" />
              <h2 className="text-xl font-medium text-[#242321]">Message Received</h2>
              <p className="text-xs text-[#77746E] max-w-md mx-auto">
                Thank you, {formData.name}. Our client relations atelier has received your message and will reply to {formData.email} promptly.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="secondary" size="sm">
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-[#FAF9F6] border border-[#D8D2C8] p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikram Malhotra"
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="vikram@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.08em] font-medium text-[#242321] mb-2">
                  Topic of Inquiry
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-[#D8D2C8] text-sm text-[#242321] focus:outline-none focus:border-[#242321]"
                >
                  <option value="Order & Sizing Inquiry">Sizing & Fit Advice</option>
                  <option value="Exchange or Return">Exchange or Return Assistance</option>
                  <option value="Private Salon Booking">Private Atelier Fitting Appointment</option>
                  <option value="Press & Collaborations">Press & Wholesale Partnerships</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.08em] font-medium text-[#242321] mb-2">
                  Your Message <span className="text-[#9B7D72]">*</span>
                </label>
                <textarea
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist your wardrobe today?"
                  required
                  className="w-full px-4 py-3 bg-transparent border border-[#D8D2C8] text-sm text-[#242321] placeholder-[#77746E] focus:outline-none focus:border-[#242321]"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="md" fullWidth>
                  Submit Inquiry
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Atelier Locations & Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h2 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#242321]">
              Direct Channels
            </h2>
            <div className="space-y-3 text-xs text-[#77746E]">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#242321] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#242321] font-medium">Email Client Care</span>
                  <span>concierge@leoverse.com</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#242321] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#242321] font-medium">Phone Support</span>
                  <span>+91 (022) 4890-3300 (Mon–Sat, 10am–7pm IST)</span>
                </div>
              </div>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group text-inherit hover:text-[#242321] transition-colors"
                aria-label={`Direct WhatsApp Concierge: +91 ${OFFICIAL_WHATSAPP_PHONE}`}
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#242321] font-medium group-hover:underline underline-offset-2">
                    WhatsApp Concierge
                  </span>
                  <span>+91 9408982003 (Direct Chat)</span>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#242321] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#242321] font-medium">Digital Concierge Response</span>
                  <span>Typically under 3 hours during business days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#D8D2C8]">
            <h2 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#242321]">
              Ateliers & Showrooms
            </h2>
            <div className="space-y-4 text-xs text-[#77746E]">
              <div>
                <p className="font-semibold text-[#242321]">Mumbai Flagship & Salon</p>
                <p>14 Kala Ghoda, Fort, Mumbai 400001</p>
              </div>
              <div>
                <p className="font-semibold text-[#242321]">Bengaluru Fitting Room</p>
                <p>100 Feet Road, Indiranagar, Bengaluru 560038</p>
              </div>
              <div>
                <p className="font-semibold text-[#242321]">New Delhi Design Studio</p>
                <p>Mehrauli Heritage Quarter, New Delhi 110030</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
