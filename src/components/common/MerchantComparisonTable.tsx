"use client";

import React, { useState } from "react";
import { formatINR, formatTimeAgo } from "@/lib/utils";
import { ExternalLink, ShieldCheck, ArrowUpDown, Clock } from "lucide-react";

interface Offer {
  id: string;
  merchantId: string;
  merchantName: string;
  merchantSlug: string;
  merchantLogo?: string;
  affiliateUrl: string;
  indicativePrice: number;
  originalPrice?: number;
  discountPercent?: number;
  availability: string;
  deliveryInfo?: string;
  lastVerifiedAt: string;
}

interface MerchantComparisonTableProps {
  offers: Offer[];
  productName: string;
}

export function MerchantComparisonTable({
  offers,
  productName,
}: MerchantComparisonTableProps) {
  const [sortBy, setSortBy] = useState<"price" | "discount">("price");

  if (!offers || offers.length === 0) {
    return (
      <div className="bg-surface rounded-2xl p-6 text-center text-sm text-gray-500 border border-gray-200">
        No merchant offers currently available for this item. Check back soon.
      </div>
    );
  }

  const sortedOffers = [...offers].sort((a, b) => {
    if (sortBy === "price") return a.indicativePrice - b.indicativePrice;
    return (b.discountPercent || 0) - (a.discountPercent || 0);
  });

  const lowestPrice = Math.min(...offers.map((o) => o.indicativePrice));

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
      {/* Header Controls */}
      <div className="p-4 sm:p-5 bg-surface border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-primary font-display flex items-center gap-2">
            <span>Verified Merchant Offers ({offers.length})</span>
            <span className="text-xs font-normal text-gray-500">
              – Indicative prices updated today
            </span>
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Compare prices across verified retail partners before you purchase.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500 font-medium flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
          </span>
          <button
            onClick={() => setSortBy("price")}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              sortBy === "price"
                ? "bg-secondary text-white"
                : "bg-white text-charcoal border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Lowest Price
          </button>
          <button
            onClick={() => setSortBy("discount")}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              sortBy === "discount"
                ? "bg-secondary text-white"
                : "bg-white text-charcoal border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Highest Discount
          </button>
        </div>
      </div>

      {/* Comparison Rows */}
      <div className="divide-y divide-gray-100">
        {sortedOffers.map((offer, idx) => {
          const isLowest = offer.indicativePrice === lowestPrice;

          return (
            <div
              key={offer.id}
              className={`p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors ${
                isLowest ? "bg-green-50/40" : "hover:bg-surface/50"
              }`}
            >
              {/* Store Identity */}
              <div className="flex items-center gap-3 w-full md:w-1/4">
                <div className="w-12 h-12 rounded-xl bg-surface border border-gray-200 flex items-center justify-center p-1.5 shrink-0">
                  {offer.merchantLogo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={offer.merchantLogo}
                      alt={offer.merchantName}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="font-bold text-xs text-primary">
                      {offer.merchantName.slice(0, 2)}
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-primary">
                      {offer.merchantName}
                    </span>
                    <span title="Verified Store">
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                    </span>
                  </div>
                  {isLowest && (
                    <span className="inline-block mt-0.5 px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded-full border border-green-200">
                      Lowest Online Price
                    </span>
                  )}
                </div>
              </div>

              {/* Delivery & Availability */}
              <div className="text-xs text-gray-600 w-full md:w-1/3">
                <div className="flex items-center gap-1.5 font-medium text-charcoal">
                  <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  <span>{offer.availability === "IN_STOCK" ? "In Stock" : "Limited Availability"}</span>
                </div>
                {offer.deliveryInfo && (
                  <p className="text-gray-500 text-[11px] mt-0.5">{offer.deliveryInfo}</p>
                )}
                <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                  <Clock className="w-3 h-3" />
                  <span>Verified {formatTimeAgo(offer.lastVerifiedAt)}</span>
                </div>
              </div>

              {/* Price */}
              <div className="w-full md:w-1/4">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-black text-primary font-display">
                    {formatINR(offer.indicativePrice)}
                  </span>
                  {offer.originalPrice && offer.originalPrice > offer.indicativePrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatINR(offer.originalPrice)}
                    </span>
                  )}
                </div>
                {offer.discountPercent && offer.discountPercent > 0 && (
                  <span className="text-xs font-bold text-green-700">
                    Save {offer.discountPercent}%
                  </span>
                )}
              </div>

              {/* Buy Outbound Button */}
              <div className="w-full md:w-auto shrink-0">
                <a
                  href={offer.affiliateUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className={`w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all group ${
                    isLowest
                      ? "bg-secondary hover:bg-secondary-dark text-white"
                      : "bg-primary hover:bg-primary-900 text-white"
                  }`}
                >
                  <span>Buy on {offer.merchantName}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Outdated price disclaimer note */}
      <div className="p-3 bg-surface border-t border-gray-200/60 text-[11px] text-gray-500 text-center">
        Prices, discounts, and availability are set directly by {sortedOffers.map((o) => o.merchantName).join(", ")}. Prices were last checked recently and may change on the merchant&apos;s site.
      </div>
    </div>
  );
}
