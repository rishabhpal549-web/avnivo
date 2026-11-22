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
  Flame,
  LayoutDashboard,
  UtensilsCrossed,
  Home,
  Smartphone,
  Watch,
  Dumbbell,
  BookOpen,
  Baby,
  Compass,
  Layers,
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
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setSuggestions({ products: [], categories: [], brands: [] });
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Click outside to close autocomplete & user dropdown
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

  // 11 Core Shopping Categories for secondary navigation
  const primaryNavCategories = [
    { name: "Kitchen Accessories", slug: "kitchen-accessories", icon: UtensilsCrossed },
    { name: "Home & Living", slug: "home-living", icon: Home },
    { name: "Mobile Accessories", slug: "mobile-accessories", icon: Smartphone },
    { name: "Fashion Accessories", slug: "fashion-accessories", icon: Watch },
    { name: "Beauty & Care", slug: "beauty-personal-care", icon: Sparkles },
    { name: "Fitness Gear", slug: "fitness-accessories", icon: Dumbbell },
    { name: "Books & Study", slug: "books-stationery", icon: BookOpen },
    { name: "Toys & Baby", slug: "toys-baby-products", icon: Baby },
    { name: "Travel Gear", slug: "travel-accessories", icon: Compass },
    { name: "Daily Essentials", slug: "daily-use-products", icon: ShoppingBag },
    { name: "Deals Under ₹299", slug: "deals", isDeal: true, icon: Flame },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      {/* 1. Top Announcement Bar */}
      <div className="bg-primary text-white text-[11px] sm:text-xs py-1.5 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-secondary text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase shrink-0">
              Affiliate Discovery
            </span>
            <span className="truncate">
              ⚡ Genuine deals across Amazon India, Flipkart & Meesho • No inventory markups
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

      {/* 2. Main Navigation Bar (Amazon-Style Compact Header) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-charcoal hover:text-secondary rounded-lg hover:bg-surface"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <AvnivoLogo size="md" />
          </div>

          {/* Amazon-Inspired Search Bar (Desktop & Tablet) */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-2xl relative">
            <form
              onSubmit={handleSearchSubmit}
              className="w-full flex items-center rounded-xl border-2 border-secondary/80 hover:border-secondary focus-within:border-secondary shadow-sm overflow-hidden bg-white"
            >
              {/* Category Dropdown Attached to Search */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-surface hover:bg-gray-100 text-charcoal text-xs font-semibold px-3 py-2.5 border-r border-gray-200 outline-none max-w-[140px] truncate cursor-pointer shrink-0"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Main Search Input */}
              <div className="flex-1 relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchQuery.trim().length >= 2) setShowSuggestions(true);
                  }}
                  placeholder="Search small, useful essentials, kitchen hacks, mobile accessories..."
                  className="w-full px-3.5 py-2 text-xs text-charcoal placeholder-gray-400 outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setShowSuggestions(false);
                    }}
                    className="p-1 text-gray-400 hover:text-charcoal mr-2"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Search Submit Button */}
              <button
                type="submit"
                className="bg-secondary hover:bg-secondary-dark text-white px-5 py-2.5 transition-colors flex items-center justify-center shrink-0"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </form>

            {/* Autocomplete Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                {suggestions.products.length > 0 && (
                  <div className="p-2 border-b border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase px-3 py-1 block">
                      Products
                    </span>
                    {suggestions.products.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}`}
                        onClick={() => setShowSuggestions(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface text-xs text-charcoal"
                      >
                        <span className="font-medium truncate max-w-sm">{p.name}</span>
                        <span className="font-bold text-secondary text-xs">₹{p.indicativePrice}</span>
                      </Link>
                    ))}
                  </div>
                )}

                {suggestions.categories.length > 0 && (
                  <div className="p-2 border-b border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase px-3 py-1 block">
                      Categories
                    </span>
                    {suggestions.categories.map((c) => (
                      <Link
                        key={c.id}
                        href={`/category/${c.slug}`}
                        onClick={() => setShowSuggestions(false)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-surface text-xs text-secondary font-medium"
                      >
                        <Search className="w-3 h-3 text-gray-400" />
                        <span>{c.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons: Account, Wishlist, Compare, Cart */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Account / Sign In Pill */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1 rounded-xl hover:bg-surface text-left transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden lg:block leading-tight">
                    <span className="text-[10px] text-gray-400 block">Hello,</span>
                    <span className="text-xs font-bold text-primary truncate max-w-[100px] block">
                      {user.name.split(" ")[0]}
                    </span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-gray-400 hidden lg:block" />
                </button>
              ) : (
                <button
                  onClick={() => openAuthModal("login")}
                  className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1 rounded-xl hover:bg-surface text-left transition-colors"
                >
                  <UserIcon className="w-5 h-5 text-gray-600" />
                  <div className="hidden lg:block leading-tight">
                    <span className="text-[10px] text-gray-400 block">Hello, Sign In</span>
                    <span className="text-xs font-bold text-primary block">Account & Lists</span>
                  </div>
                </button>
              )}

              {/* User Dropdown Menu */}
              {userDropdownOpen && user && (
                <div
                  onMouseLeave={() => setUserDropdownOpen(false)}
                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 text-xs"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-bold text-primary truncate">{user.name}</p>
                    <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                  </div>

                  <Link
                    href="/account"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-surface text-charcoal font-medium"
                  >
                    My Account Profile
                  </Link>

                  <Link
                    href="/account/wishlist"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-surface text-charcoal font-medium"
                  >
                    Saved Wishlist ({wishlistCount})
                  </Link>

                  <Link
                    href="/compare"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-surface text-charcoal font-medium"
                  >
                    Compare Drawer ({compareItems.length})
                  </Link>

                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-secondary font-bold hover:bg-blue-100"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      <span>Admin Control Panel</span>
                    </Link>
                  )}

                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-1.5 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link
              href="/account/wishlist"
              className="relative p-2 text-gray-600 hover:text-red-500 rounded-xl hover:bg-surface transition-colors"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart / Saved Items Modal Button */}
            <button
              onClick={() => setIsCartModalOpen(true)}
              className="relative p-2 text-gray-600 hover:text-secondary rounded-xl hover:bg-surface transition-colors flex items-center gap-1.5"
              title="Affiliate Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-bold text-primary">Cart</span>
              {wishlistCount > 0 && (
                <span className="bg-secondary text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row */}
        <div className="mt-2.5 md:hidden">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center rounded-xl border border-secondary shadow-sm overflow-hidden bg-white"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search kitchen, mobile & daily essentials..."
              className="flex-1 px-3 py-2 text-xs text-charcoal placeholder-gray-400 outline-none"
            />
            <button
              type="submit"
              className="bg-secondary text-white px-3.5 py-2 transition-colors flex items-center justify-center"
            >
              <Search className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>
      </div>

      {/* 3. Amazon-Style Category Navigation Sub-Bar (Second Row) */}
      <div className="bg-primary-900 border-t border-primary-800 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto py-1.5 scrollbar-none">
          {/* All Categories Button */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 font-bold shrink-0 transition-colors"
          >
            <Menu className="w-3.5 h-3.5 text-accent" />
            <span>All Products</span>
          </Link>

          {/* Quick Category Links */}
          {primaryNavCategories.map((item) => {
            const Icon = item.icon;
            const isDeal = item.isDeal;
            return (
              <Link
                key={item.slug}
                href={isDeal ? "/deals" : `/shop?category=${item.slug}`}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap shrink-0 transition-colors ${
                  isDeal
                    ? "text-accent font-bold hover:bg-accent/20"
                    : "text-gray-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isDeal ? "text-amber-400" : "text-gray-300"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-4 shadow-xl">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
              All 11 Product Categories
            </span>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/shop?category=${c.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-xs font-semibold text-primary hover:text-secondary border-b border-gray-50"
              >
                {c.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link
              href="/deals"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-xs font-bold text-red-600 flex items-center gap-2"
            >
              <Flame className="w-4 h-4" />
              <span>Deals Under ₹299</span>
            </Link>

            {user?.role === "ADMIN" && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-xs font-bold text-secondary flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Future Cart / Affiliate Shopping Bag Modal */}
      <FutureCartModal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} />
    </header>
  );
}
