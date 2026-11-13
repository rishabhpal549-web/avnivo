'use client';

import React from 'react';
import { ExternalLink, ShieldCheck, X } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface OutboundRedirectModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OutboundRedirectModal({ product, isOpen, onClose }: OutboundRedirectModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg overflow-hidden bg-white rounded-2xl shadow-2xl border border-gray-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-brand-navy text-white">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-brand-orange/20 text-brand-orange">
              <ExternalLink size={18} />
            </span>
            <h3 className="font-bold text-base">Proceeding to {product.merchantName}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-gray-300 hover:text-white rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="flex gap-4 items-center p-3 bg-gray-50 rounded-xl border border-gray-200">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-16 h-16 object-cover rounded-lg border border-gray-200 bg-white"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">{product.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-base font-extrabold text-brand-navy">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {product.discountPercent}% OFF
                </span>
              </div>
            </div>
          </div>

          {/* Affiliate Disclosure Notice */}
          <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-blue-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-blue-950">
              <ShieldCheck size={16} className="text-brand-orange" />
              <span>AVNIVO Verified Merchant Redirect</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              You are continuing to <strong>{product.merchantName}</strong> to view live stock and complete your purchase securely. 
              As an affiliate partner, AVNIVO may earn a qualifying commission at <strong>no extra cost to you</strong>.
            </p>
          </div>

          <div className="text-[11px] text-gray-500 text-center">
            Prices, discounts, and delivery availability are managed directly by {product.merchantName}.
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onClose}
              className="w-1/3 py-2.5 px-4 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Stay on AVNIVO
            </button>
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-bold text-white bg-brand-orange hover:bg-brand-orangeHover rounded-xl shadow-md shadow-brand-orange/20 transition-all hover:scale-[1.02]"
            >
              <span>Continue to {product.merchantName}</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

