'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowUp, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  Heart,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react';
import { Logo } from './Logo';
import { SITE_CONFIG } from '@/data/siteConfig';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-brand-navyDark text-gray-300 border-t border-brand-navy">
      {/* 1. BACK TO TOP BUTTON (Amazon Style) */}
      <button
        onClick={scrollToTop}
        className="w-full py-3.5 bg-brand-navy hover:bg-brand-navyLight text-center text-xs font-semibold text-gray-200 hover:text-white transition-colors flex items-center justify-center gap-1.5 border-b border-brand-navyLight/50"
      >
        <span>Back to top</span>
        <ArrowUp size={14} />
      </button>

      {/* 2. NEWSLETTER STRIP */}
      <div className="border-b border-white/10 py-8 px-4 bg-brand-navy/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Mail size={18} className="text-brand-orange" />
              <span>Get Curated Home & Kitchen Deals in India</span>
            </h4>
            <p className="text-xs text-gray-400">
              Zero spam. Only genuine price drops, vetted buying guides, and kitchen wisdom delivered weekly.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md flex items-center gap-2">
            {subscribed ? (
              <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-900/60 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 size={16} />
                <span>Thank you! You are subscribed to AVNIVO Home Curations.</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 h-10 px-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
                <button
                  type="submit"
                  className="h-10 px-5 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-xl transition-colors shrink-0 shadow-md shadow-brand-orange/20"
                >
                  Subscribe
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* 3. FOUR COLUMN NAVIGATION */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-xs">
          {/* Col 1: Brand & Positioning */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Logo size="md" />
            <p className="text-gray-400 leading-relaxed text-xs">
              AVNIVO is an independent product discovery platform for Indian Home & Kitchen shoppers. We evaluate cookware, appliances, kitchen gadgets, and storage to help you make smarter, confident buying decisions.
            </p>
            <div className="flex items-center gap-3 pt-2 text-gray-400">
              <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-brand-orange hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-brand-orange hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href={SITE_CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-brand-orange hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={16} />
              </a>
              <a href={SITE_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-brand-orange hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Shopping Discovery */}
          <div>
            <h5 className="font-bold text-white text-sm tracking-wider uppercase mb-4 border-b border-brand-orange/40 pb-1.5 inline-block">
              Shopping Discovery
            </h5>
            <ul className="space-y-2.5">
              {SITE_CONFIG.footerLinks.shopping.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-orange transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h5 className="font-bold text-white text-sm tracking-wider uppercase mb-4 border-b border-brand-orange/40 pb-1.5 inline-block">
              Categories
            </h5>
            <ul className="space-y-2.5">
              {SITE_CONFIG.footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-orange transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Trust, Policy & All Pages */}
          <div>
            <h5 className="font-bold text-white text-sm tracking-wider uppercase mb-4 border-b border-brand-orange/40 pb-1.5 inline-block">
              Trust & Legal
            </h5>
            <ul className="space-y-2.5">
              {SITE_CONFIG.footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-orange transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4. COMPREHENSIVE AFFILIATE DISCLOSURE ACCORDION STRIP */}
        <div className="mt-12 pt-8 border-t border-white/10 space-y-3">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400 space-y-2 leading-relaxed">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
              <ShieldCheck size={16} className="text-brand-orange" />
              <span>Amazon Associates & Merchant Affiliate Disclosure</span>
            </div>
            <p>
              <strong>AVNIVO.in</strong> participates in various affiliate marketing programs, including the <strong>Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for websites to earn advertising fees by linking to Amazon.in and affiliated sites.
            </p>
            <p>
              When you purchase a product through external merchant links on AVNIVO, we may receive a referral commission from the seller. <strong>This does not increase the price you pay in any way.</strong> Products, order fulfilment, warranties, pricing changes, and customer support are handled directly by the respective merchants (such as Amazon India).
            </p>
            <p className="text-[11px] text-gray-400">
              Product prices and availability are accurate as of the date/time indicated and are subject to change. Any price and availability information displayed on merchant websites at the time of purchase will apply to the purchase of this product.
            </p>
          </div>
        </div>

        {/* 5. BOTTOM BAR & COPYRIGHT */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/affiliate-disclosure" className="hover:text-white transition-colors">
              Affiliate Disclosure
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          <div className="text-center sm:text-right">
            <p>© {new Date().getFullYear()} AVNIVO. All rights reserved.</p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Brand: AVNIVO • Tagline: Smart Living, Better Home. • India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

