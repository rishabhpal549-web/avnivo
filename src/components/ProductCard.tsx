'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, Check } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { StarRating } from './StarRating';
import { AffiliateButton } from './AffiliateButton';
import { addToComparison, removeFromComparison, getComparisonList } from '@/lib/storage';

interface ProductCardProps {
  product: Product;
  className?: string;
  isCompact?: boolean;
}

export function ProductCard({ product, className = '', isCompact = false }: ProductCardProps) {
  const [isInCompare, setIsInCompare] = useState(false);

  useEffect(() => {
    const list = getComparisonList();
    setIsInCompare(list.includes(product.id));

    const handleUpdate = () => {
      const updated = getComparisonList();
      setIsInCompare(updated.includes(product.id));
    };

    window.addEventListener('avnivo_compare_updated', handleUpdate);
    return () => window.removeEventListener('avnivo_compare_updated', handleUpdate);
  }, [product.id]);

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCompare) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product.id);
    }
  };

  return (
    <div
      className={`group relative flex flex-col bg-white rounded-2xl border border-gray-200/80 hover:border-brand-navy/30 hover:shadow-xl transition-all duration-200 overflow-hidden ${className}`}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {product.badge ? (
          <span className="bg-brand-navy text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
            {product.badge}
          </span>
        ) : product.discountPercent >= 45 ? (
          <span className="bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
            Deal: {product.discountPercent}% Off
          </span>
        ) : (
          <span />
        )}

        {/* Compare Toggle Button */}
        <button
          onClick={toggleCompare}
          type="button"
          className={`pointer-events-auto p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm ${
            isInCompare
              ? 'bg-brand-navy text-white border-brand-navy'
              : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:text-brand-navy border-gray-200 hover:bg-white'
          }`}
          title={isInCompare ? 'Remove from Comparison' : 'Add to Side-by-Side Compare'}
        >
          {isInCompare ? (
            <>
              <Check size={13} className="text-brand-orange" />
              <span className="text-[10px] hidden sm:inline">Compared</span>
            </>
          ) : (
            <>
              <Layers size={13} />
              <span className="text-[10px] hidden sm:inline">Compare</span>
            </>
          )}
        </button>
      </div>

      {/* Product Image */}
      <Link href={`/reviews/${product.slug}`} className="relative block aspect-square overflow-hidden bg-gray-50 p-4">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5">
          <span className="font-bold uppercase tracking-wider text-brand-navy">
            {product.brand}
          </span>
          <span className="text-gray-400">
            {product.category}
          </span>
        </div>

        {/* Title */}
        <Link href={`/reviews/${product.slug}`}>
          <h3 className="font-bold text-sm text-gray-900 group-hover:text-brand-navy transition-colors line-clamp-2 leading-snug mb-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Verified Star Rating */}
        <div className="mb-3">
          <StarRating rating={product.rating} ratingCount={product.ratingCount} size="sm" />
        </div>

        {/* Short Description */}
        {!isCompact && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-3.5 leading-relaxed">
            {product.shortDescription}
          </p>
        )}

        {/* Price & Savings */}
        <div className="mt-auto pt-2 border-t border-gray-100 mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              {product.discountPercent}% OFF
            </span>
          </div>
          <div className="text-[10px] text-gray-400 mt-0.5">
            Verified price on {product.merchantName}
          </div>
        </div>

        {/* Actions: Review Details & Buy Now */}
        <div className="space-y-2">
          <AffiliateButton product={product} size="sm" variant="primary" className="w-full" />
          
          <Link
            href={`/reviews/${product.slug}`}
            className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-brand-navy hover:text-brand-orange transition-colors"
          >
            <span>Read In-Depth Review</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

