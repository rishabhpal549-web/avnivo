'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  Layers, 
  Flame, 
  BookOpen, 
  ShieldCheck, 
  MapPin, 
  ChevronRight, 
  Search,
  ExternalLink,
  Info
} from 'lucide-react';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { CATEGORIES } from '@/data/categories';
import { SITE_CONFIG } from '@/data/siteConfig';
import { getComparisonList } from '@/lib/storage';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [compareCount, setCompareCount] = useState(0);

  useEffect(() => {
    setCompareCount(getComparisonList().length);

    const handleUpdate = () => {
      setCompareCount(getComparisonList().length);
    };

    window.addEventListener('avnivo_compare_updated', handleUpdate);
    return () => window.removeEventListener('avnivo_compare_updated', handleUpdate);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full shadow-md">
      {/* 1. TOP UTILITY STRIP (Amazon Style Dark Navy) */}
      <div className="bg-brand-navyDark text-gray-300 text-[11px] py-1.5 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-white font-medium">
              <MapPin size={13} className="text-brand-orange" />
              <span>Delivering to <strong>India</strong> (Affiliate Partner Store)</span>
            </span>
            <span className="hidden md:inline text-gray-400">|</span>
            <span className="hidden md:inline text-gray-300">
              Smart Living, Better Home. Verified Home & Kitchen Products.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/affiliate-disclosure" 
              className="flex items-center gap-1 text-amber-300 hover:text-white transition-colors"
            >
              <Info size={12} />
              <span>Affiliate Disclosure</span>
            </Link>
            <span className="hidden sm:inline text-gray-400">|</span>
            <Link 
              href="/about" 
              className="hover:text-white transition-colors hidden sm:inline"
            >
              Why AVNIVO?
            </Link>
            <span className="hidden sm:inline text-gray-400">|</span>
            <Link 
              href="/admin" 
              className="hover:text-white transition-colors text-gray-400 hidden sm:inline"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Brand Navy #102F59) */}
      <div className="bg-brand-navy text-white px-4 py-2.5 sm:py-3 border-b border-brand-navyLight">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
          {/* Left: Mobile Menu Button + AVNIVO Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-white hover:bg-brand-navyLight focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Logo size="md" />
          </div>

          {/* Center: Large Desktop Search Bar (Amazon-Inspired) */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-auto">
            <SearchBar />
          </div>

          {/* Right: Quick Action Links */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Mobile Search Toggle */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="lg:hidden p-2 rounded-xl text-white hover:bg-brand-navyLight transition-colors"
              aria-label="Toggle mobile search"
            >
              <Search size={20} />
            </button>

            {/* Compare Drawer Link */}
            <Link
              href="/compare"
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-brand-navyLight border border-white/10 transition-colors group"
              title="Product Comparison"
            >
              <div className="relative">
                <Layers size={19} className="text-brand-orange group-hover:scale-110 transition-transform" />
                {compareCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-brand-orange text-white text-[10px] font-black flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </div>
              <div className="hidden xl:flex flex-col text-left leading-none">
                <span className="text-[10px] text-gray-300">Side-by-Side</span>
                <span className="text-xs font-bold text-white">Compare</span>
              </div>
            </Link>

            {/* Buying Guides Button */}
            <Link
              href="/buying-guides"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-brand-navyLight border border-white/10 transition-colors"
            >
              <BookOpen size={16} className="text-brand-orange" />
              <div className="flex flex-col text-left leading-none">
                <span className="text-[10px] text-gray-300">Expert</span>
                <span className="text-xs font-bold text-white">Buying Guides</span>
              </div>
            </Link>

            {/* Reviews Link */}
            <Link
              href="/reviews"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-navyLight/70 hover:bg-brand-navyLight border border-brand-orange/40 text-xs font-bold text-white transition-colors"
            >
              <ShieldCheck size={16} className="text-brand-orange" />
              <span>Reviews Hub</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Expandable Bar */}
        {mobileSearchOpen && (
          <div className="lg:hidden pt-3 pb-1 border-t border-brand-navyLight/50 mt-2">
            <SearchBar isCompact />
          </div>
        )}
      </div>

      {/* 3. CATEGORY NAVIGATION BAR (Amazon-Style Navigation Strip) */}
      <div className="bg-brand-navyLight text-white px-4 py-1.5 overflow-x-auto scrollbar-none border-b border-brand-navyDark">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs whitespace-nowrap">
          {/* Horizontal Category Pills */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/categories"
              className="flex items-center gap-1 px-3 py-1 rounded-md font-bold text-white hover:bg-white/10 transition-colors"
            >
              <Menu size={14} />
              <span>All Categories</span>
            </Link>

            <span className="text-white/20">|</span>

            {CATEGORIES.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="px-2.5 py-1 rounded-md text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                {cat.name}
              </Link>
            ))}

            <Link
              href="/categories"
              className="px-2.5 py-1 rounded-md text-gray-300 hover:text-brand-orange hover:bg-white/10 transition-colors font-medium"
            >
              More +
            </Link>
          </div>

          {/* Right Highlights: Deals & Verified Offers */}
          <div className="hidden lg:flex items-center gap-3 pl-4">
            <Link
              href="/#deals"
              className="flex items-center gap-1 px-2.5 py-1 rounded-md font-bold text-amber-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Flame size={14} className="text-brand-orange animate-pulse" />
              <span>Deals & Offers</span>
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors"
            >
              How We Review
            </Link>
          </div>
        </div>
      </div>

      {/* 4. MOBILE DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-4/5 max-w-sm h-full bg-white shadow-2xl flex flex-col overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 bg-brand-navy text-white flex items-center justify-between">
              <Logo size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-gray-300 hover:text-white"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Drawer Links */}
            <div className="p-4 space-y-6">
              {/* Quick Hubs */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 py-1">
                  Discover
                </div>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-blue-50 rounded-xl"
                >
                  <span>Home</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
                <Link
                  href="/categories"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-blue-50 rounded-xl"
                >
                  <span>Shop by Category</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
                <Link
                  href="/reviews"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-blue-50 rounded-xl"
                >
                  <span>Product Reviews</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
                <Link
                  href="/compare"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-blue-50 rounded-xl"
                >
                  <span className="flex items-center gap-2">
                    <span>Product Comparison</span>
                    {compareCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-brand-orange text-white font-bold">
                        {compareCount}
                      </span>
                    )}
                  </span>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
                <Link
                  href="/buying-guides"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-blue-50 rounded-xl"
                >
                  <span>Buying Guides</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
              </div>

              {/* Categories */}
              <div className="space-y-1 border-t border-gray-100 pt-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 py-1">
                  Home & Kitchen Categories
                </div>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-brand-navy rounded-xl"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-gray-400">{cat.productCount}</span>
                  </Link>
                ))}
              </div>

              {/* Information & Trust */}
              <div className="space-y-1 border-t border-gray-100 pt-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 py-1">
                  Company & Trust
                </div>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs text-gray-600 hover:text-brand-navy"
                >
                  About AVNIVO
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs text-gray-600 hover:text-brand-navy"
                >
                  Contact Support
                </Link>
                <Link
                  href="/affiliate-disclosure"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs text-amber-700 font-semibold hover:text-brand-orange"
                >
                  Affiliate Disclosure
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs text-gray-400 hover:text-gray-600"
                >
                  Product Admin Portal
                </Link>
              </div>
            </div>

            {/* Bottom Disclaimer */}
            <div className="mt-auto p-4 bg-gray-50 border-t border-gray-200 text-[10px] text-gray-500 text-center">
              AVNIVO India • Smart Living, Better Home.
            </div>
          </div>

          {/* Backdrop click to close */}
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}

