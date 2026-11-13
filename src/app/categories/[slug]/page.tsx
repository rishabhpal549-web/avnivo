'use client';

import React, { useState, useMemo } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Filter, 
  ArrowUpDown, 
  SlidersHorizontal, 
  X, 
  RotateCcw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS, getProductsByCategory } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { AffiliateDisclosureBanner } from '@/components/AffiliateDisclosureBanner';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function CategoryDetailPage({ params }: PageProps) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  // Base products in this category
  const baseProducts = useMemo(() => {
    return getProductsByCategory(params.slug);
  }, [params.slug]);

  // Extract all unique brands in this category
  const availableBrands = useMemo(() => {
    return Array.from(new Set(baseProducts.map((p) => p.brand)));
  }, [baseProducts]);

  // Filter & Sort State
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyDeals, setOnlyDeals] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number>(15000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Toggle brand selection
  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedBrands([]);
    setMinRating(0);
    setOnlyDeals(false);
    setPriceRange(15000);
    setSortBy('featured');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return baseProducts
      .filter((p) => {
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
        if (p.rating < minRating) return false;
        if (onlyDeals && p.discountPercent < 40) return false;
        if (p.price > priceRange) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // default 'featured'
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [baseProducts, selectedBrands, minRating, onlyDeals, priceRange, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Categories', href: '/categories' },
          { label: category.name },
        ]}
      />

      {/* Category Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-navy via-brand-navyLight to-brand-navyDark text-white p-6 sm:p-10 shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange text-white text-xs font-bold uppercase tracking-wider">
            <span>Verified Category Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-2xl">
            {category.longDescription}
          </p>
          <div className="text-xs text-brand-orange font-semibold flex items-center gap-2 pt-1">
            <CheckCircle2 size={15} />
            <span>{baseProducts.length} Evaluated Products with Verified Ratings</span>
          </div>
        </div>

        {/* Decorative background image overlay */}
        <div 
          className="absolute inset-0 opacity-15 mix-blend-overlay bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${category.image})` }}
        />
      </div>

      {/* Affiliate Transparency Strip */}
      <AffiliateDisclosureBanner compact />

      {/* Main Content Area: Sidebar Filters + Product Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* DESKTOP FILTERS SIDEBAR */}
        <aside className="hidden lg:block w-64 shrink-0 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
              <Filter size={16} className="text-brand-orange" />
              <span>Filter Products</span>
            </div>
            {(selectedBrands.length > 0 || minRating > 0 || onlyDeals || priceRange < 15000) && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-semibold text-brand-orange hover:underline flex items-center gap-1"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Filter 1: Brand */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">Brand</h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {availableBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-brand-navy"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="rounded text-brand-orange focus:ring-brand-orange border-gray-300 h-3.5 w-3.5"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter 2: Maximum Price Slider */}
          <div className="space-y-2.5 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">Max Price</h4>
              <span className="text-xs font-bold text-brand-navy">₹{priceRange.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="200"
              max="15000"
              step="200"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-brand-orange h-1.5 bg-gray-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Filter 3: Minimum Verified Rating */}
          <div className="space-y-2.5 pt-3 border-t border-gray-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">Min Rating</h4>
            <div className="space-y-1 text-xs">
              {[4.4, 4.2, 4.0, 0].map((ratingVal) => (
                <button
                  key={ratingVal}
                  type="button"
                  onClick={() => setMinRating(ratingVal)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    minRating === ratingVal
                      ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{ratingVal === 0 ? 'All Ratings' : `${ratingVal}★ & above`}</span>
                  {minRating === ratingVal && <CheckCircle2 size={13} className="text-brand-orange" />}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 4: Deals & Offers Only */}
          <div className="pt-3 border-t border-gray-100">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyDeals}
                onChange={(e) => setOnlyDeals(e.target.checked)}
                className="rounded text-brand-orange focus:ring-brand-orange border-gray-300 h-4 w-4"
              />
              <span>High Deals Only (40%+ OFF)</span>
            </label>
          </div>
        </aside>

        {/* PRODUCT LISTING & CONTROLS */}
        <div className="flex-1 w-full space-y-6">
          {/* Top Sort & Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 text-xs font-bold text-gray-700"
              >
                <SlidersHorizontal size={14} />
                <span>Filters</span>
              </button>
              <span className="text-xs font-bold text-gray-900">
                Showing {filteredProducts.length} of {baseProducts.length} products
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-medium">Sort by:</span>
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
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 space-y-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
                <Filter size={20} />
              </div>
              <h3 className="font-bold text-base text-gray-900">No products match the selected filters</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try widening your price range or unchecking brand filters to see more recommendations.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-xl transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-4/5 max-w-sm h-full bg-white shadow-2xl flex flex-col p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-bold text-base text-gray-900">Filter Products</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 text-xs">
              {/* Brands */}
              <div>
                <h4 className="font-bold text-gray-700 uppercase mb-2">Brand</h4>
                <div className="space-y-1.5">
                  {availableBrands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="rounded text-brand-orange"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="font-bold text-gray-700 uppercase mb-2">Max Price: ₹{priceRange}</h4>
                <input
                  type="range"
                  min="200"
                  max="15000"
                  step="200"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-brand-orange"
                />
              </div>

              {/* Apply button */}
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 rounded-xl bg-brand-orange text-white font-bold text-xs"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileFilterOpen(false)} />
        </div>
      )}
    </div>
  );
}

