'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Search, Star, ArrowRight, Layers } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { ProductCard } from '@/components/ProductCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { AffiliateDisclosureBanner } from '@/components/AffiliateDisclosureBanner';

export default function ReviewsHubPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredReviews = PRODUCTS.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.categorySlug === selectedCategory;
    const matchesQuery =
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ label: 'Product Reviews' }]} />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-bold uppercase tracking-wider">
          <ShieldCheck size={14} />
          <span>Independent Evaluations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Product Reviews Hub
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Comprehensive, non-sponsored editorial reviews of India’s top Home & Kitchen products. Explore detailed specs, pros & cons, verified buyer feedback, and our definitive verdict.
        </p>
      </div>

      <AffiliateDisclosureBanner compact />

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-brand-navy text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Products ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.slug)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === c.slug
                  ? 'bg-brand-navy text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Text Filter */}
        <div className="relative w-full md:w-72 shrink-0">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter reviews by name or brand..."
            className="w-full h-9 pl-8 pr-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
          <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Reviews Grid */}
      {filteredReviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredReviews.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-gray-200">
          <p className="text-gray-500 text-sm">No reviews found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

