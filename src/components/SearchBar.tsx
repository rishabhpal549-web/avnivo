'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ChevronDown, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

interface SearchBarProps {
  className?: string;
  isCompact?: boolean;
}

export function SearchBar({ className = '', isCompact = false }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const q = query.toLowerCase();
    const matches = PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.categorySlug === selectedCategory;
      const matchesText =
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);
      return matchesCategory && matchesText;
    }).slice(0, 5);

    setSuggestions(matches);
  }, [query, selectedCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    const categoryParam = selectedCategory !== 'all' ? `&category=${selectedCategory}` : '';
    router.push(`/search?q=${encodeURIComponent(query.trim())}${categoryParam}`);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full rounded-xl overflow-hidden bg-white shadow-inner focus-within:ring-2 focus-within:ring-brand-orange border border-gray-300 transition-all"
      >
        {/* Category Dropdown (Amazon style) */}
        <div className="relative hidden md:flex items-center border-r border-gray-200 bg-gray-100 hover:bg-gray-200 text-xs text-gray-700 cursor-pointer h-10 px-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-transparent pr-4 font-medium text-xs focus:outline-none cursor-pointer appearance-none text-gray-800"
            aria-label="Filter search by category"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-2 text-gray-500" />
        </div>

        {/* Input Field */}
        <div className="relative flex-1 flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search cookware, air fryers, kitchen gadgets, storage..."
            className="w-full h-10 px-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none bg-white"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
              }}
              className="p-1 mr-1 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Search Submit Button (Amazon Orange) */}
        <button
          type="submit"
          className="h-10 px-4 sm:px-5 bg-brand-orange hover:bg-brand-orangeHover text-white flex items-center justify-center transition-colors shrink-0"
          title="Search AVNIVO"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3.5 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
            <span className="flex items-center gap-1">
              <Sparkles size={12} className="text-brand-orange" />
              <span>Matching Home & Kitchen Products</span>
            </span>
            <span>{suggestions.length} results</span>
          </div>

          {suggestions.length > 0 ? (
            <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
              {suggestions.map((item) => (
                <Link
                  key={item.id}
                  href={`/reviews/${item.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-blue-50/50 transition-colors group"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg border border-gray-200 bg-white shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 group-hover:text-brand-navy line-clamp-1">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-bold text-brand-orange">
                        {formatPrice(item.price)}
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase font-semibold">
                        {item.brand}
                      </span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded font-bold">
                        {item.discountPercent}% OFF
                      </span>
                    </div>
                  </div>
                </Link>
              ))}

              <div className="p-2.5 bg-gray-50 text-center border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-xs font-bold text-brand-navy hover:text-brand-orange transition-colors"
                >
                  View all results for &quot;{query}&quot; →
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-gray-500 space-y-2">
              <p>No products matching &quot;{query}&quot; found in this category.</p>
              <p className="text-[11px] text-gray-400">
                Try searching for generic terms like &quot;kadhai&quot;, &quot;air fryer&quot;, or &quot;chopper&quot;.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

