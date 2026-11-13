'use client';

import React, { useState } from 'react';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { OutboundRedirectModal } from './OutboundRedirectModal';

interface AffiliateButtonProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'compact';
  className?: string;
  showSubtext?: boolean;
}

export function AffiliateButton({
  product,
  size = 'md',
  variant = 'primary',
  className = '',
  showSubtext = false,
}: AffiliateButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const sizeClasses = {
    sm: 'text-xs py-2 px-3 gap-1.5',
    md: 'text-sm py-2.5 px-4 gap-2',
    lg: 'text-base py-3 px-6 gap-2.5 font-bold',
  }[size];

  const variantClasses = {
    primary: 'bg-brand-orange hover:bg-brand-orangeHover text-white shadow-sm hover:shadow shadow-brand-orange/20',
    secondary: 'bg-brand-navy hover:bg-brand-navyDark text-white shadow-sm hover:shadow',
    compact: 'bg-amber-100 hover:bg-amber-200 text-amber-950 font-semibold',
  }[variant];

  return (
    <>
      <div className={`flex flex-col ${className}`}>
        <button
          onClick={() => setModalOpen(true)}
          className={`inline-flex items-center justify-center font-bold rounded-xl transition-all duration-150 hover:scale-[1.01] active:scale-[0.98] ${sizeClasses} ${variantClasses}`}
          title={`Buy ${product.name} on ${product.merchantName}`}
        >
          <ShoppingBag size={size === 'lg' ? 18 : 15} />
          <span>Check Price on {product.merchantName}</span>
          <ExternalLink size={size === 'lg' ? 16 : 14} className="opacity-80 ml-0.5" />
        </button>

        {showSubtext && (
          <span className="text-[10px] text-gray-500 text-center mt-1.5 flex items-center justify-center gap-1">
            <span>Affiliate Link</span>
            <span>•</span>
            <span>Standard {product.merchantName} Price</span>
          </span>
        )}
      </div>

      <OutboundRedirectModal
        product={product}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

