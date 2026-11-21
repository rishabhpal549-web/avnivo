import React, { Suspense } from "react";
import { ProductCatalogView } from "@/components/shop/ProductCatalogView";
import { Flame } from "lucide-react";

export const metadata = {
  title: "Best Online Deals & Flash Price Drops in India | AVNIVO",
  description: "Handpicked deals with steep discounts on smartphones, laptops, audio gear, and lifestyle essentials across Amazon and Flipkart.",
};

export default function DealsPage() {
  return (
    <div>
      {/* Deals Header Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4 text-yellow-300" />
            <span>Verified Price Drops & Exclusive Discounts</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display">
            Today&apos;s Best Deals & Price Drops
          </h1>
          <p className="text-xs sm:text-sm text-red-100 max-w-xl mx-auto">
            Our algorithms monitor merchant price fluctuations to spotlight authentic deals. No fabricated original prices.
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="p-12 text-center text-sm text-gray-400">Loading top deals...</div>}>
        <ProductCatalogView
          pageTitle="Flash Deals & High Discount Items"
          pageDescription="Save up to 75% across top electronics, fashion labels, and home essentials."
        />
      </Suspense>
    </div>
  );
}
