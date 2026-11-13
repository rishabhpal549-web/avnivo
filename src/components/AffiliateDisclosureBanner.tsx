import React from 'react';
import Link from 'next/link';
import { Info } from 'lucide-react';

interface AffiliateDisclosureBannerProps {
  compact?: boolean;
  className?: string;
}

export function AffiliateDisclosureBanner({ compact = false, className = '' }: AffiliateDisclosureBannerProps) {
  if (compact) {
    return (
      <div className={`p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/70 text-[11px] text-amber-900 flex items-center justify-between gap-3 ${className}`}>
        <div className="flex items-center gap-2">
          <Info size={14} className="text-brand-orange shrink-0" />
          <span>
            <strong>Affiliate Disclosure:</strong> AVNIVO earns qualifying commissions from external merchant purchases at no additional cost to you.
          </span>
        </div>
        <Link href="/affiliate-disclosure" className="text-brand-navy hover:underline font-semibold shrink-0">
          Learn More
        </Link>
      </div>
    );
  }

  return (
    <div className={`rounded-xl p-4 bg-gradient-to-r from-blue-50/80 via-white to-amber-50/70 border border-blue-100 text-xs text-gray-700 shadow-sm ${className}`}>
      <div className="flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-brand-navy/10 text-brand-navy mt-0.5 shrink-0">
          <Info size={16} />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-brand-navy text-xs tracking-wide uppercase">
              Transparent Affiliate Transparency Notice
            </h4>
            <Link 
              href="/affiliate-disclosure" 
              className="text-brand-orange hover:text-brand-orangeHover font-semibold hover:underline text-[11px]"
            >
              Full Legal Disclosure →
            </Link>
          </div>
          <p className="leading-relaxed text-gray-600 text-xs">
            AVNIVO is an independent product discovery platform for Indian Home & Kitchen shoppers. We participate in the Amazon Associates Program and partner affiliate networks. When you click our links and purchase from external merchants, we may earn an affiliate commission. <strong>This does not affect the price you pay</strong>, and our editorial evaluations remain 100% objective and independent.
          </p>
        </div>
      </div>
    </div>
  );
}

