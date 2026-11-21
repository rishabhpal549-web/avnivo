"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import { Scale, ExternalLink, ArrowRight, CheckCircle2 } from "lucide-react";

interface ComparisonItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  offers: {
    merchant: string;
    price: number;
    badge?: string;
  }[];
}

const comparisonDemoList: ComparisonItem[] = [
  {
    id: "1",
    name: "Apple iPhone 15 (128GB)",
    slug: "apple-iphone-15-128gb-blue",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
    offers: [
      { merchant: "Amazon India", price: 69999, badge: "Lowest Price" },
      { merchant: "Flipkart", price: 70499 },
      { merchant: "Croma", price: 71900 },
    ],
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 5G (256GB)",
    slug: "samsung-galaxy-s24-5g-256gb",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80",
    offers: [
      { merchant: "Amazon India", price: 64999, badge: "Lowest Price" },
      { merchant: "Flipkart", price: 65999 },
      { merchant: "Reliance Digital", price: 66499 },
    ],
  },
  {
    id: "3",
    name: "Sony WH-1000XM5 ANC Headphones",
    slug: "sony-wh-1000xm5-wireless-headphones-black",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80",
    offers: [
      { merchant: "Amazon India", price: 26990, badge: "Lowest Price" },
      { merchant: "Flipkart", price: 27990 },
      { merchant: "Croma", price: 28490 },
    ],
  },
  {
    id: "4",
    name: "Philips HD9252 Digital Air Fryer",
    slug: "philips-digital-air-fryer-hd9252",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80",
    offers: [
      { merchant: "Amazon India", price: 7999, badge: "Lowest Price" },
      { merchant: "Flipkart", price: 8299 },
      { merchant: "Croma", price: 8490 },
    ],
  },
];

export function PriceComparePreview() {
  const [selectedProduct, setSelectedProduct] = useState(comparisonDemoList[0]);

  return (
    <section className="bg-surface py-16 border-y border-gray-200/80 my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-secondary text-xs font-bold rounded-full mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>Interactive Price Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-primary font-display">
            Compare Indicative Prices Before You Pay
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Different platforms charge different prices for the exact same authentic item. Select a product below to see how AVNIVO uncovers real savings.
          </p>
        </div>

        {/* Product selector buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {comparisonDemoList.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedProduct(item)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedProduct.id === item.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-secondary"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Live Comparison Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Image & Product Info */}
          <div className="md:col-span-5 flex flex-col items-center text-center">
            <div className="w-48 h-48 bg-surface rounded-2xl p-4 flex items-center justify-center mb-4 border border-gray-200/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="text-base font-bold text-primary">{selectedProduct.name}</h3>
            <p className="text-xs text-gray-400 mt-1">Verified identical model specification</p>
            <Link
              href={`/product/${selectedProduct.slug}`}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:underline"
            >
              <span>View Full Specs & Offers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Merchant Comparison Table */}
          <div className="md:col-span-7 space-y-3">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Live Indicative Merchant Offers
            </div>

            {selectedProduct.offers.map((offer, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                  offer.badge
                    ? "bg-green-50/60 border-green-200 shadow-sm"
                    : "bg-surface/50 border-gray-200 hover:bg-surface"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-primary">{offer.merchant}</span>
                    {offer.badge && (
                      <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {offer.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    <span>In Stock • Verified Retailer</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-black text-primary font-display">
                    {formatINR(offer.price)}
                  </div>
                  <Link
                    href={`/product/${selectedProduct.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline"
                  >
                    <span>View Deal</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}

            <p className="text-[10px] text-gray-400 pt-2 text-center">
              * Prices are fetched directly from merchant listings. The final price is confirmed at merchant checkout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
