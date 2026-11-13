'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  MessageSquare,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Clock
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SITE_CONFIG } from '@/data/siteConfig';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'General Inquiry',
    message: '',
    honeypot: '', // anti-spam bot trap
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Spam honeypot detection
    if (formData.honeypot) {
      // Bot detected, silently finish
      setSubmitted(true);
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please complete all required fields.');
      return;
    }

    setLoading(true);

    // Simulate reliable submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'Contact Us' }]} />

      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-bold uppercase tracking-wider">
          <MessageSquare size={14} />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Contact AVNIVO
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Have a product query, editorial correction, or partnership suggestion? Reach out to our research and customer support desk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-black text-gray-900">Message Received!</h3>
              <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                Thank you for contacting AVNIVO. Our team reviews all inquiries within 24–48 business hours. A confirmation has been logged for <strong>{formData.email}</strong>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', category: 'General Inquiry', message: '', honeypot: '' });
                }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-black text-lg text-gray-900 border-b border-gray-100 pb-3">
                Send Us a Message
              </h3>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {/* Honeypot field (hidden from human visitors) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  value={formData.honeypot}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full h-10 px-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. rahul@example.com"
                  className="w-full h-10 px-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
              </div>

              {/* Category & Subject Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Product Review Suggestion">Product Review Suggestion</option>
                    <option value="Editorial Correction">Editorial Correction</option>
                    <option value="Affiliate Disclosure Question">Affiliate Disclosure Question</option>
                    <option value="Business Partnership">Business Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Subject Line <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Short summary of inquiry"
                    className="w-full h-10 px-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Detailed Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you? Include product links or questions..."
                  className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold shadow-md shadow-brand-orange/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Sending inquiry...</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message to AVNIVO</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-gray-400 text-center pt-1">
                We protect your personal data in accordance with our{' '}
                <Link href="/privacy-policy" className="text-brand-navy underline">
                  Privacy Policy
                </Link>
                .
              </div>
            </form>
          )}
        </div>

        {/* Right: Direct Channels & Information */}
        <div className="lg:col-span-5 space-y-6">
          {/* Email Contacts */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4 shadow-sm">
            <h3 className="font-black text-base text-brand-navy">
              Direct Contact Channels
            </h3>

            <div className="space-y-3 text-xs text-gray-600">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <Mail size={18} className="text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-gray-900">General & Reader Support</div>
                  <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-brand-navy hover:underline font-semibold">
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <Mail size={18} className="text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-gray-900">Editorial & Review Requests</div>
                  <a href={`mailto:${SITE_CONFIG.contact.pressEmail}`} className="text-brand-navy hover:underline font-semibold">
                    {SITE_CONFIG.contact.pressEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
              <Clock size={15} className="text-brand-orange shrink-0" />
              <span>Response turnaround: Monday to Friday, 9:30 AM – 6:30 PM IST.</span>
            </div>
          </div>

          {/* Connect on Social */}
          <div className="bg-brand-navy text-white rounded-3xl p-6 space-y-3 shadow-md">
            <h4 className="font-black text-sm text-white">Join Our Home Community</h4>
            <p className="text-xs text-gray-300">
              Follow our daily home improvement ideas, cookware care guides, and price drop alerts across social networks:
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-brand-orange transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-brand-orange transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href={SITE_CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-brand-orange transition-colors" aria-label="Twitter">
                <Twitter size={16} />
              </a>
              <a href={SITE_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-brand-orange transition-colors" aria-label="YouTube">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Affiliate Note */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-brand-orange" />
              <span>Merchant Order Support Notice</span>
            </div>
            <p className="text-[11px] text-gray-700 leading-relaxed">
              For order returns, delivery tracking, or replacement queries for items bought on Amazon India or Flipkart, please contact the merchant directly through their customer portal. AVNIVO does not handle order shipments or payments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

