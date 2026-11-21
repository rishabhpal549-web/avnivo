import React from "react";
import { Info, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface AffiliateDisclosureBannerProps {
  compact?: boolean;
}

export function AffiliateDisclosureBanner({
  compact = false,
}: AffiliateDisclosureBannerProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 p-2.5 bg-blue-50/60 border border-blue-100 rounded-xl text-[11px] text-blue-900">
        <Info className="w-4 h-4 text-secondary shrink-0" />
        <span>
          <strong>Affiliate Transparency:</strong> When you buy through links on AVNIVO, we may earn an affiliate commission at zero extra cost to you.{" "}
          <Link href="/affiliate-disclosure" className="underline font-semibold text-secondary">
            Learn more
          </Link>
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 border border-blue-200/80 rounded-2xl p-5 my-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-blue-100 text-secondary shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs text-blue-950">
          <h4 className="font-bold text-sm text-primary font-display">
            AVNIVO Shopping & Affiliate Relationship Disclosure
          </h4>
          <p className="leading-relaxed text-gray-600">
            AVNIVO is an independent product discovery and price comparison platform. When you click on product links and visit our partner stores (including Amazon Associates India, Flipkart, Croma, and other authorized networks), we may receive an affiliate advertising fee if you make an eligible purchase. This does not increase the price you pay at checkout.
          </p>
          <div className="pt-2 flex items-center gap-4 text-[11px] font-semibold text-secondary">
            <Link href="/affiliate-disclosure" className="hover:underline flex items-center gap-1">
              Read our complete Affiliate Policy →
            </Link>
            <Link href="/disclaimer" className="hover:underline text-gray-500">
              Pricing & Accuracy Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
