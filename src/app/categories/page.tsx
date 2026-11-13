import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CategoryCard } from '@/components/CategoryCard';
import { CATEGORIES } from '@/data/categories';
import { Sparkles, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Home & Kitchen Categories – Cookware, Appliances, Storage | AVNIVO',
  description: 'Browse all 8 Home & Kitchen product categories curated for Indian households: Kitchen Gadgets, Cookware, Storage, Decor, Appliances, and more.',
};

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'Categories' }]} />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-bold uppercase tracking-wider">
          <Layers size={14} />
          <span>Curated Indian Home Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Explore All Categories
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Every category contains rigorously evaluated products, in-depth specification breakdowns, and verified merchant pricing tailored to Indian cooking and living.
        </p>
      </div>

      {/* Categories Grid (All 8 Categories) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

