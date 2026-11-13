'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, RotateCcw, SlidersHorizontal, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { ProductCard } from '@/components/ProductCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { AffiliateDisclosureBanner } from '@/components/AffiliateDisclosureBanner';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialDeals = searchParams.get('deals') === 'true';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [onlyDeals, setOnlyDeals] = useState(initialDeals);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  useEffect(() => {
    setQuery(initialQuery);
    setCategory(initialCategory);
    setOnlyDeals(initialDeals);
  }, [initialQuery, initialCategory, initialDeals]);

  // Extract all brands
  const brands = useMemo(() => {
    return Array.from(new Set(PRODUCTS.map((p) => p.brand)));
  }, []);

  // Filter products
  const searchResults = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Query filter
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesCat && !matchesDesc) return false;
      }

      // Category filter
      if (category !== 'all' && p.categorySlug !== category) return false;

      // Brand filter
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;

      // Deals filter
      if (onlyDeals && p.discountPercent < 40) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [query, category, selectedBrand, onlyDeals, sortBy]);

  const resetFilters = () => {
    setQuery('');
    setCategory('all');
    setSelectedBrand('all');
    setOnlyDeals(false);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ label: 'Product Discovery & Search' }]} />

      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          {query ? (
            <>
              Search Results for <span className="text-brand-orange">&quot;{query}&quot;</span>
            </>
          ) : (
            'Home & Kitchen Product Discovery'
          )}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Showing {searchResults.length} verified products with real-time merchant pricing.
        </p>
      </div>

      <AffiliateDisclosureBanner compact />

      {/* Filter and Search Bar Controls */}
      <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product name, cookware type, brand, or feature..."
            className="w-full h-11 pl-10 pr-4 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
          <Search size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Dropdown */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Brand Dropdown */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            >
              <option value="all">All Brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            {/* Deals Only Toggle */}
            <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-gray-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
              <input
                type="checkbox"
                checked={onlyDeals}
                onChange={(e) => setOnlyDeals(e.target.checked)}
                className="rounded text-brand-orange focus:ring-brand-orange"
              />
              <span>High Deals (40%+ Off)</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Verified Rating</option>
            </select>

            {(query || category !== 'all' || selectedBrand !== 'all' || onlyDeals) && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs text-brand-orange hover:underline font-semibold"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search Results Grid */}
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center bg-white rounded-3xl border border-gray-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
            <Search size={28} />
          </div>
          <h3 className="font-black text-lg text-gray-900">
            No products matched your search
          </h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
            We couldn&apos;t find any items matching &quot;{query}&quot;. Try checking for spelling errors, using more general keywords like &quot;cookware&quot;, or browsing all categories.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-xl transition-colors"
            >
              Clear All Filters
            </button>
            <Link
              href="/categories"
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-colors"
            >
              Explore All Categories
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-gray-500">Loading search discovery...</div>}>
      <SearchContent />
    </Suspense>
  );
}

