'use client';

import React from 'react';
import Link from 'next/link';
import { X, Check, Award, ExternalLink, Plus } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { StarRating } from './StarRating';
import { AffiliateButton } from './AffiliateButton';

interface ComparisonTableProps {
  products: Product[];
  onRemove: (productId: string) => void;
  onOpenSelector?: () => void;
}

export function ComparisonTable({ products, onRemove, onOpenSelector }: ComparisonTableProps) {
  if (!products || products.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-gray-200">
        <p className="text-gray-500 mb-4 text-sm">No products currently selected for side-by-side comparison.</p>
        {onOpenSelector && (
          <button
            onClick={onOpenSelector}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold transition-colors"
          >
            <Plus size={16} />
            <span>Select Products to Compare</span>
          </button>
        )}
      </div>
    );
  }

  // Find lowest price / best value product
  const bestValueProduct = products.reduce((prev, curr) => (curr.price < prev.price ? curr : prev), products[0]);

  // Aggregate all unique specification keys
  const specKeysSet = new Set<string>();
  products.forEach(p => {
    Object.keys(p.specifications || {}).forEach(k => specKeysSet.add(k));
  });
  const specKeys = Array.from(specKeysSet);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Responsive Horizontal Scroll Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          {/* Header Row: Product Images, Titles & Remove Buttons */}
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70">
              <th className="p-4 w-44 min-w-[170px] text-xs font-bold text-gray-500 uppercase tracking-wider align-top">
                <span>Features / Specs</span>
              </th>
              {products.map((p) => {
                const isBestValue = p.id === bestValueProduct.id && products.length > 1;
                return (
                  <th key={p.id} className="p-4 min-w-[220px] w-1/3 align-top border-l border-gray-200 relative">
                    {/* Remove Column Button */}
                    <button
                      onClick={() => onRemove(p.id)}
                      className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Remove product"
                    >
                      <X size={16} />
                    </button>

                    {/* Best Value Badge */}
                    {isBestValue && (
                      <div className="inline-flex items-center gap-1 mb-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        <Award size={12} className="text-emerald-600" />
                        <span>Best Value Pick</span>
                      </div>
                    )}

                    <div className="flex flex-col items-center text-center">
                      <Link href={`/reviews/${p.slug}`} className="block relative w-32 h-32 mb-3 bg-white p-2 rounded-xl border border-gray-200 overflow-hidden">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                      </Link>

                      <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1">
                        {p.brand}
                      </div>

                      <Link href={`/reviews/${p.slug}`}>
                        <h4 className="text-xs font-bold text-gray-900 hover:text-brand-navy line-clamp-2 mb-2">
                          {p.name}
                        </h4>
                      </Link>

                      <div className="mb-3">
                        <StarRating rating={p.rating} ratingCount={p.ratingCount} size="sm" />
                      </div>

                      <div className="mb-4">
                        <div className="text-lg font-black text-gray-900">
                          {formatPrice(p.price)}
                        </div>
                        {p.originalPrice > p.price && (
                          <div className="text-xs text-gray-400 line-through">
                            MRP {formatPrice(p.originalPrice)} ({p.discountPercent}% OFF)
                          </div>
                        )}
                      </div>

                      <AffiliateButton product={p} size="sm" variant="primary" className="w-full" />
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-xs">
            {/* Category Row */}
            <tr className="hover:bg-gray-50/50">
              <td className="p-4 font-bold text-gray-700 bg-gray-50/30">Category</td>
              {products.map(p => (
                <td key={p.id} className="p-4 border-l border-gray-200 font-medium text-gray-800">
                  {p.category}
                </td>
              ))}
            </tr>

            {/* Merchant Row */}
            <tr className="hover:bg-gray-50/50">
              <td className="p-4 font-bold text-gray-700 bg-gray-50/30">Merchant</td>
              {products.map(p => (
                <td key={p.id} className="p-4 border-l border-gray-200 text-gray-800 font-semibold">
                  {p.merchantName}
                </td>
              ))}
            </tr>

            {/* Best For Row */}
            <tr className="hover:bg-gray-50/50">
              <td className="p-4 font-bold text-gray-700 bg-gray-50/30">Ideal For</td>
              {products.map(p => (
                <td key={p.id} className="p-4 border-l border-gray-200 text-gray-600 leading-relaxed">
                  {p.bestFor}
                </td>
              ))}
            </tr>

            {/* Specifications Rows */}
            {specKeys.map(specKey => (
              <tr key={specKey} className="hover:bg-gray-50/50">
                <td className="p-4 font-bold text-gray-700 bg-gray-50/30">{specKey}</td>
                {products.map(p => (
                  <td key={p.id} className="p-4 border-l border-gray-200 text-gray-700">
                    {p.specifications[specKey] || '—'}
                  </td>
                ))}
              </tr>
            ))}

            {/* Pros Row */}
            <tr className="hover:bg-gray-50/50">
              <td className="p-4 font-bold text-gray-700 bg-gray-50/30">Key Strengths (Pros)</td>
              {products.map(p => (
                <td key={p.id} className="p-4 border-l border-gray-200 align-top">
                  <ul className="space-y-1.5 text-gray-700">
                    {p.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Cons Row */}
            <tr className="hover:bg-gray-50/50">
              <td className="p-4 font-bold text-gray-700 bg-gray-50/30">Considerations (Cons)</td>
              {products.map(p => (
                <td key={p.id} className="p-4 border-l border-gray-200 align-top">
                  <ul className="space-y-1.5 text-gray-600">
                    {p.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold shrink-0">•</span>
                        <span className="leading-tight">{con}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Verdict Row */}
            <tr className="hover:bg-gray-50/50 bg-blue-50/20">
              <td className="p-4 font-bold text-brand-navy bg-blue-50/40">AVNIVO Verdict</td>
              {products.map(p => (
                <td key={p.id} className="p-4 border-l border-gray-200 text-gray-800 leading-relaxed font-medium">
                  {p.verdict}
                </td>
              ))}
            </tr>

            {/* Bottom Buy Action Row */}
            <tr>
              <td className="p-4 bg-gray-50/50" />
              {products.map(p => (
                <td key={p.id} className="p-4 border-l border-gray-200">
                  <AffiliateButton product={p} size="md" variant="primary" className="w-full" showSubtext />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

