'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Layers, 
  Plus, 
  Trash2, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  X,
  Search
} from 'lucide-react';
import { PRODUCTS, getProductById } from '@/data/products';
import { Product } from '@/types';
import { ComparisonTable } from '@/components/ComparisonTable';
import { Breadcrumb } from '@/components/Breadcrumb';
import { AffiliateDisclosureBanner } from '@/components/AffiliateDisclosureBanner';
import { 
  getComparisonList, 
  addToComparison, 
  removeFromComparison, 
  clearComparison 
} from '@/lib/storage';

export default function ComparePage() {
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [selectorQuery, setSelectorQuery] = useState('');

  useEffect(() => {
    const list = getComparisonList();
    // If empty on first load, seed with 3 popular competing cookware products
    if (list.length === 0) {
      const defaultIds = ['prod-cw-01', 'prod-cw-02', 'prod-cw-03'];
      setComparedIds(defaultIds);
    } else {
      setComparedIds(list);
    }

    const handleUpdate = () => {
      setComparedIds(getComparisonList());
    };

    window.addEventListener('avnivo_compare_updated', handleUpdate);
    return () => window.removeEventListener('avnivo_compare_updated', handleUpdate);
  }, []);

  const comparedProducts = useMemo(() => {
    return comparedIds
      .map((id) => getProductById(id))
      .filter((p): p is Product => Boolean(p));
  }, [comparedIds]);

  const handleRemove = (id: string) => {
    removeFromComparison(id);
    setComparedIds((prev) => prev.filter((pId) => pId !== id));
  };

  const handleClear = () => {
    clearComparison();
    setComparedIds([]);
  };

  const handleAddProduct = (id: string) => {
    addToComparison(id);
    if (!comparedIds.includes(id)) {
      setComparedIds((prev) => [...prev, id].slice(-4));
    }
    setSelectorOpen(false);
  };

  // Filter available products for selector modal
  const availableToAdd = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const alreadyAdded = comparedIds.includes(p.id);
      const matches =
        p.name.toLowerCase().includes(selectorQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(selectorQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(selectorQuery.toLowerCase());
      return !alreadyAdded && matches;
    });
  }, [comparedIds, selectorQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ label: 'Product Comparison' }]} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-bold uppercase tracking-wider">
            <Layers size={14} />
            <span>Interactive Comparison Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Side-by-Side Product Comparison
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Compare verified specifications, warranty terms, verified prices, and pros & cons across up to 4 Home & Kitchen products.
          </p>
        </div>

        {/* Top Control Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {comparedProducts.length < 4 && (
            <button
              onClick={() => setSelectorOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold shadow-md shadow-brand-orange/20 transition-all hover:scale-105"
            >
              <Plus size={16} />
              <span>Add Product ({comparedProducts.length}/4)</span>
            </button>
          )}

          {comparedProducts.length > 0 && (
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors"
              title="Clear comparison list"
            >
              <Trash2 size={14} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      <AffiliateDisclosureBanner compact />

      {/* Comparison Table */}
      <ComparisonTable
        products={comparedProducts}
        onRemove={handleRemove}
        onOpenSelector={() => setSelectorOpen(true)}
      />

      {/* Popular Comparison Pairs Suggestions */}
      <section className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-4">
        <h3 className="font-black text-lg text-gray-900">
          Popular Indian Kitchen Comparison Topics
        </h3>
        <p className="text-xs text-gray-500">
          Quickly load tested product comparisons curated by our editorial team:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Preset 1 */}
          <button
            onClick={() => {
              setComparedIds(['prod-cw-01', 'prod-cw-02']);
            }}
            className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-left hover:border-brand-navy hover:bg-blue-50/40 transition-colors group"
          >
            <div className="text-[10px] font-bold uppercase text-brand-orange mb-1">Cookware Battle</div>
            <h4 className="text-xs font-bold text-gray-900 group-hover:text-brand-navy">
              Prestige Tri-Ply Kadhai vs Indus Valley Cast Iron
            </h4>
            <div className="text-[11px] text-gray-500 mt-1">Stainless Steel vs Pre-Seasoned Iron</div>
          </button>

          {/* Preset 2 */}
          <button
            onClick={() => {
              setComparedIds(['prod-ha-01', 'prod-ha-02']);
            }}
            className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-left hover:border-brand-navy hover:bg-blue-50/40 transition-colors group"
          >
            <div className="text-[10px] font-bold uppercase text-brand-orange mb-1">Appliances</div>
            <h4 className="text-xs font-bold text-gray-900 group-hover:text-brand-navy">
              Philips Air Fryer vs Preethi Zodiac Mixer
            </h4>
            <div className="text-[11px] text-gray-500 mt-1">Healthy Frying vs 750W Heavy Food Processor</div>
          </button>

          {/* Preset 3 */}
          <button
            onClick={() => {
              setComparedIds(['prod-so-01', 'prod-so-03']);
            }}
            className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-left hover:border-brand-navy hover:bg-blue-50/40 transition-colors group"
          >
            <div className="text-[10px] font-bold uppercase text-brand-orange mb-1">Kitchen Storage</div>
            <h4 className="text-xs font-bold text-gray-900 group-hover:text-brand-navy">
              Solimo Airtight Set vs Cello Checkers 18pc Set
            </h4>
            <div className="text-[11px] text-gray-500 mt-1">Snap-Lock Modular vs Screw-Cap Budget Jars</div>
          </button>
        </div>
      </section>

      {/* SELECTOR MODAL */}
      {selectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-5 bg-brand-navy text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus size={18} className="text-brand-orange" />
                <h3 className="font-bold text-base">Select Product to Compare</h3>
              </div>
              <button
                onClick={() => setSelectorOpen(false)}
                className="p-1 rounded-lg text-gray-300 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <div className="relative">
                <input
                  type="text"
                  value={selectorQuery}
                  onChange={(e) => setSelectorQuery(e.target.value)}
                  placeholder="Search products by name, brand, or category..."
                  className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
                <Search size={15} className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* List */}
            <div className="p-4 overflow-y-auto divide-y divide-gray-100 flex-1 space-y-2">
              {availableToAdd.length > 0 ? (
                availableToAdd.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-3 pt-2 pb-2 hover:bg-blue-50/50 p-2 rounded-xl transition-colors"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-200 bg-white shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold uppercase text-brand-navy">
                        {product.brand} • {product.category}
                      </div>
                      <h4 className="text-xs font-semibold text-gray-900 line-clamp-1">
                        {product.name}
                      </h4>
                      <div className="text-xs font-bold text-brand-orange">
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddProduct(product.id)}
                      className="px-3 py-1.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold shrink-0 transition-colors"
                    >
                      Add +
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-gray-500">
                  No products available matching your search.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

