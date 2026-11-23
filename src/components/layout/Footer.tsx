"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AvnivoLogo } from "../common/AvnivoLogo";
import { ShieldCheck, Mail, ArrowRight, ExternalLink, Heart, Youtube, Linkedin } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-primary text-gray-300 text-xs border-t border-blue-950">
      {/* Newsletter Section */}
      <div className="border-b border-white/10 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white font-display">
              Get Price Drop Alerts & Exclusive Deals
            </h3>
            <p className="text-gray-400 mt-1 max-w-lg">
              Never miss a genuine price crash on Amazon, Flipkart, or Croma. Handpicked deals for smart Indian shoppers. Zero spam.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="p-3 bg-green-900/40 border border-green-500/40 rounded-xl text-green-300 text-center font-medium">
                ✓ Thank you for subscribing! We&apos;ll keep you updated with top deals.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-md w-full gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-xl px-4 py-2.5 text-xs flex-1 focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="bg-secondary hover:bg-secondary-dark text-white font-semibold px-5 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-1.5 shadow-md"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Col 1: About AVNIVO */}
        <div className="lg:col-span-2 space-y-4">
          <AvnivoLogo light size="md" />
          <p className="text-gray-400 leading-relaxed text-xs max-w-sm">
            AVNIVO is India&apos;s next-generation e-commerce discovery and price comparison engine. We empower consumers to discover, compare, and shop authentic products at the lowest verified prices across authorized retailers.
          </p>
          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <a
              href="https://www.youtube.com/@AVNIVOOfficialindia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold transition-all"
            >
              <Youtube className="w-4 h-4 text-red-500" />
              <span>@AVNIVOOfficialindia</span>
            </a>
            <a
              href="https://www.linkedin.com/in/avnivo-india-3177a3451"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded-xl text-xs font-bold transition-all"
            >
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span>AVNIVO India</span>
            </a>
            <a
              href="https://www.pinterest.com/avnivoofficialindia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold transition-all"
            >
              <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-black">P</span>
              <span>Pinterest</span>
            </a>
          </div>
        </div>

        {/* Col 2: Top Categories */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm tracking-wide uppercase font-display">
            Categories
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/category/electronics-gadgets" className="hover:text-white transition-colors">
                Electronics & Gadgets
              </Link>
            </li>
            <li>
              <Link href="/category/fashion-clothing" className="hover:text-white transition-colors">
                Fashion & Clothing
              </Link>
            </li>
            <li>
              <Link href="/category/home-kitchen" className="hover:text-white transition-colors">
                Home & Kitchen
              </Link>
            </li>
            <li>
              <Link href="/category/beauty-personal-care" className="hover:text-white transition-colors">
                Beauty & Personal Care
              </Link>
            </li>
            <li>
              <Link href="/category/sports-fitness" className="hover:text-white transition-colors">
                Sports & Fitness
              </Link>
            </li>
            <li>
              <Link href="/category/books-stationery" className="hover:text-white transition-colors">
                Books & Stationery
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Discovery & Compare */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm tracking-wide uppercase font-display">
            Quick Tools
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/affiliate-program" className="hover:text-accent transition-colors text-amber-300 font-bold flex items-center gap-1">
                <span>🎁 Earn with AVNIVO (Partner Program)</span>
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-white transition-colors">
                Browse All Products
              </Link>
            </li>
            <li>
              <Link href="/deals" className="hover:text-white transition-colors">
                Best Deals & Discounts
              </Link>
            </li>
            <li>
              <Link href="/compare" className="hover:text-white transition-colors">
                Side-by-Side Comparison
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Buying Guides & Reviews
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Our Platform
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Help Center & FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Trust, Grievance & Legal */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm tracking-wide uppercase font-display">
            Legal & Compliance
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/affiliate-disclosure" className="hover:text-white transition-colors text-blue-300 font-semibold">
                Affiliate Disclosure
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy (DPDP 2023)
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-white transition-colors">
                Pricing Disclaimer
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="/grievance-redressal" className="hover:text-white transition-colors">
                Grievance Redressal (India)
              </Link>
            </li>
            <li>
              <Link href="/return-policy" className="hover:text-white transition-colors text-gray-400">
                Return Policy (Future Store)
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mandatory Statutory Affiliate Disclosure Card */}
      <div className="bg-primary-900 border-t border-white/5 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-3">
          <p className="text-[11px] text-gray-400 leading-relaxed">
            <strong className="text-white">Affiliate Marketing Disclosure:</strong> AVNIVO participates in various affiliate marketing programs, including the Amazon Associates India Programme and eligible merchant partner networks. We may earn an advertising referral commission when you make qualifying purchases through links on this website, at no additional charge to you. All trademarks, logos, brand names, and product images are the property of their respective owners. Product prices, discounts, and availability are subject to change and are set exclusively by the respective retail merchants.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-[11px] text-gray-400">
            <div>
              © {new Date().getFullYear()} AVNIVO (India). All rights reserved. Built with pride for Indian consumers.
            </div>

            <div className="flex items-center gap-4">
              <span>Primary Currency: INR (₹)</span>
              <span>•</span>
              <span>Primary Market: India</span>
              <span>•</span>
              <Link href="/grievance-redressal" className="hover:text-white underline">
                Nodal Grievance Officer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
