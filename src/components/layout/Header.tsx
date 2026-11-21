"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Heart,
  Scale,
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  LogOut,
  SlidersHorizontal,
} from "lucide-react";
import { AvnivoLogo } from "../common/AvnivoLogo";
import { useAuth } from "../common/AuthContext";
import { useWishlist } from "../common/WishlistContext";
import { useCompare } from "../common/CompareContext";
import { useLanguage } from "../common/LanguageContext";
import { FutureCartModal } from "../common/FutureCartModal";

export function Header() {
  const router = useRouter();
  const { user, openAuthModal, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const { compareItems } = useCompare();
  const { lang, setLang, t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<{
    products: any[];
    categories: any[];
    brands: any[];
  }>({ products: [], categories: [], brands: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch categories on mount
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
      })
      .catch(() => {});
  }, []);

  // Autocomplete suggestions
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const timer = setTimeout(() => {
        fetch(`/api/search/suggestions?q=${encodeURIComponent(searchQuery)}`)
          .then((res) => res.json())
          .then((data) => {
            setSuggestions(data);
            setShowSuggestions(true);
          })
          .catch(() => {});
      }, 250);
      return () => clearTimeout(timer);
    } else {
      setSuggestions({ products: [], categories: [], brands: [] });
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Click outside to close autocomplete
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() && !selectedCategory) return;
    setShowSuggestions(false);
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedCategory) params.set("category", selectedCategory);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      {/* 1. Announcement Bar */}
      <div className="bg-primary text-white text-[11px] sm:text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-secondary text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase shrink-0">
              India&apos;s #1 Hub
            </span>
            <span className="truncate">
              ⚡ Compare prices across Amazon, Flipkart, Croma & save up to 70%! Indicative live offers.
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-gray-300">
            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 border border-white/20 rounded-md px-2 py-0.5 text-[11px]">
              <span className="text-gray-400">Language:</span>
              <button
                onClick={() => setLang("en")}
                className={`font-semibold hover:text-white ${lang === "en" ? "text-accent underline" : ""}`}
              >
                EN
              </button>
              <span>|</span>
              <button
                onClick={() => setLang("hi")}
                className={`font-semibold hover:text-white ${lang === "hi" ? "text-accent underline" : ""}`}
              >
                हिंदी
              </button>
            </div>

            <Link href="/affiliate-disclosure" className="hidden md:inline hover:text-white transition-colors">
              Affiliate Transparency
            </Link>
            <Link href="/contact" className="hidden sm:inline hover:text-white transition-colors">
              Help Center
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <AvnivoLogo size="md" />

          {/* Search Bar (Desktop & Tablet) */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-2xl relative">
            <form
              onSubmit={handleSearchSubmit}
              className="flex w-full border-2 border-primary/20 hover:border-primary/40 focus-within:border-secondary rounded-xl overflow-hidden transition-all shadow-sm"
            >
              {/* Category dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-surface text-xs font-semibold text-charcoal border-r border-gray-200 px-3 py-2.5 outline-none cursor-pointer max-w-[150px] truncate"
              >
                <option value="">{t.allCategories}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {lang === "hi" && cat.nameHindi ? cat.nameHindi : cat.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                placeholder={t.searchPlaceholder}
                className="flex-1 px-4 py-2 text-sm text-charcoal placeholder-gray-400 focus:outline-none"
              />

              <button
                type="submit"
                className="bg-secondary hover:bg-secondary-dark text-white px-5 flex items-center justify-center transition-colors"
                title={t.searchButton}
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Autocomplete Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in divide-y divide-gray-100">
                {/* Product Suggestions */}
                {suggestions.products.length > 0 && (
                  <div className="p-2">
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1">
                      Matching Products
                    </div>
                    {suggestions.products.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}`}
                        onClick={() => setShowSuggestions(false)}
                        className="flex items-center justify-between p-2 hover:bg-surface rounded-lg transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          {p.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-10 h-10 object-contain rounded bg-white p-1 border border-gray-100 shrink-0"
                            />
                          )}
                          <div>
                            <p className="text-xs font-semibold text-charcoal group-hover:text-secondary line-clamp-1">
                              {p.name}
                            </p>
                            <span className="text-[11px] text-primary font-bold">
                              ₹{p.indicativePrice.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                        {p.discountPercent > 0 && (
                          <span className="text-[10px] font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-200">
                            {p.discountPercent}% OFF
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Categories & Brands */}
                {(suggestions.categories.length > 0 || suggestions.brands.length > 0) && (
                  <div className="p-3 bg-surface/50 grid grid-cols-2 gap-2 text-xs">
                    {suggestions.categories.length > 0 && (
                      <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">
                          Categories
                        </div>
                        {suggestions.categories.map((c) => (
                          <Link
                            key={c.id}
                            href={`/shop?category=${c.slug}`}
                            onClick={() => setShowSuggestions(false)}
                            className="block py-1 text-charcoal hover:text-secondary truncate"
                          >
                            📁 {c.name}
                          </Link>
                        ))}
                      </div>
                    )}
                    {suggestions.brands.length > 0 && (
                      <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">
                          Brands
                        </div>
                        {suggestions.brands.map((b) => (
                          <Link
                            key={b.id}
                            href={`/shop?brand=${b.slug}`}
                            onClick={() => setShowSuggestions(false)}
                            className="block py-1 text-charcoal hover:text-secondary truncate"
                          >
                            🏷️ {b.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Fallback empty or See All footer */}
                {suggestions.products.length === 0 && suggestions.categories.length === 0 && suggestions.brands.length === 0 ? (
                  <div className="p-3 text-center text-xs text-gray-500">
                    Press <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[11px] font-semibold text-charcoal">Enter</kbd> to search catalog for &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="w-full text-left px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-xs text-secondary font-bold flex items-center justify-between border-t border-gray-100 transition-colors"
                  >
                    <span>View all matching results for &quot;{searchQuery}&quot;</span>
                    <Search className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Action Icons & User Menu */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Compare Tray Button */}
            <Link
              href="/compare"
              className="relative p-2 text-charcoal hover:text-secondary hover:bg-surface rounded-xl transition-colors hidden sm:flex items-center gap-1.5"
              title="Compare Products"
            >
              <Scale className="w-5 h-5" />
              <span className="text-xs font-semibold hidden lg:inline">{t.compareBadge}</span>
              {compareItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {compareItems.length}
                </span>
              )}
            </Link>

            {/* Wishlist Button */}
            <Link
              href="/account/wishlist"
              className="relative p-2 text-charcoal hover:text-secondary hover:bg-surface rounded-xl transition-colors flex items-center gap-1.5"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5" />
              <span className="text-xs font-semibold hidden lg:inline">{t.wishlist}</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon (Explains Future Direct Purchasing) */}
            <button
              onClick={() => setIsCartModalOpen(true)}
              className="relative p-2 text-charcoal hover:text-secondary hover:bg-surface rounded-xl transition-colors flex items-center gap-1.5"
              title="AVNIVO Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs font-semibold hidden lg:inline">Cart</span>
              <span className="absolute -top-1 -right-1 bg-gray-200 text-gray-700 text-[10px] font-bold px-1 rounded-full">
                0
              </span>
            </button>

            {/* User Account / Auth Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 border border-gray-200 rounded-xl hover:border-secondary transition-colors bg-white"
                >
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold text-charcoal hidden sm:inline max-w-[100px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in text-xs">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-bold text-primary truncate">{user.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                      {user.role === "ADMIN" && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-purple-50 text-purple-700 font-bold text-[10px] rounded border border-purple-200">
                          Super Administrator
                        </span>
                      )}
                    </div>

                    {user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 font-bold text-purple-700 hover:bg-purple-50 transition-colors"
                      >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <Link
                      href="/account"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-charcoal hover:bg-surface font-medium"
                    >
                      {t.myAccount} Overview
                    </Link>
                    <Link
                      href="/account/wishlist"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-charcoal hover:bg-surface font-medium"
                    >
                      Saved Wishlist ({wishlistCount})
                    </Link>
                    <Link
                      href="/compare"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-charcoal hover:bg-surface font-medium"
                    >
                      Product Comparisons ({compareItems.length})
                    </Link>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal("login")}
                className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-900 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm"
              >
                <UserIcon className="w-4 h-4" />
                <span>{t.login}</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal md:hidden hover:bg-surface rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-full border border-gray-200 rounded-xl overflow-hidden focus-within:border-secondary"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search smartphones, laptops, deals..."
              className="flex-1 px-3 py-2 text-xs text-charcoal outline-none"
            />
            <button type="submit" className="bg-primary text-white px-4">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* 3. Secondary Category & Quick Links Bar (Desktop) */}
      <div className="hidden md:block bg-surface border-t border-gray-100 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-6 overflow-x-auto py-2.5">
            <Link
              href="/shop"
              className="font-bold text-primary hover:text-secondary flex items-center gap-1"
            >
              <span>All Products</span>
            </Link>

            <Link
              href="/category/electronics-gadgets"
              className="text-gray-600 hover:text-primary font-medium"
            >
              Electronics & Gadgets
            </Link>
            <Link
              href="/category/fashion-clothing"
              className="text-gray-600 hover:text-primary font-medium"
            >
              Fashion & Clothing
            </Link>
            <Link
              href="/category/home-kitchen"
              className="text-gray-600 hover:text-primary font-medium"
            >
              Home & Kitchen
            </Link>
            <Link
              href="/category/beauty-personal-care"
              className="text-gray-600 hover:text-primary font-medium"
            >
              Beauty & Care
            </Link>
            <Link
              href="/category/sports-fitness"
              className="text-gray-600 hover:text-primary font-medium"
            >
              Sports & Fitness
            </Link>
          </div>

          <div className="flex items-center gap-4 py-2.5 shrink-0">
            <Link
              href="/deals"
              className="font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.bestDeals}</span>
            </Link>
            <Link
              href="/compare"
              className="text-gray-600 hover:text-primary font-medium"
            >
              {t.priceComparison}
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-primary font-medium"
            >
              {t.blog}
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-primary font-medium"
            >
              About
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4 animate-fade-in text-sm shadow-xl">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-primary"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700"
            >
              Shop All Products
            </Link>
            <Link
              href="/deals"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-red-600 font-bold"
            >
              🔥 Best Deals & Offers
            </Link>
            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700"
            >
              Price Comparison ({compareItems.length})
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700"
            >
              Buying Guides & Articles
            </Link>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Categories</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-gray-600 hover:text-primary"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-gray-600"
            >
              About AVNIVO
            </Link>
            <Link
              href="/affiliate-disclosure"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-gray-600"
            >
              Affiliate Disclosure
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-gray-600"
            >
              Customer Support & Grievance
            </Link>
          </div>
        </div>
      )}

      {/* Cart info modal */}
      <FutureCartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </header>
  );
}
