import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const brands = [
  { name: "Apple", slug: "apple", tag: "iPhones & MacBooks" },
  { name: "Samsung", slug: "samsung", tag: "Galaxy & Displays" },
  { name: "Sony", slug: "sony", tag: "Audio & NC Headphones" },
  { name: "OnePlus", slug: "oneplus", tag: "Flagship Speed" },
  { name: "boAt", slug: "boat", tag: "Earbuds & Speakers" },
  { name: "Noise", slug: "noise", tag: "Smartwatches" },
  { name: "Nike", slug: "nike", tag: "Running & Footwear" },
  { name: "Philips", slug: "philips", tag: "Kitchen & Grooming" },
  { name: "Prestige", slug: "prestige", tag: "Stainless Cookware" },
  { name: "Mamaearth", slug: "mamaearth", tag: "Toxin-Free Beauty" },
];

export function BrandShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-14">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs uppercase font-extrabold text-secondary tracking-widest">
            Authorized Brands
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary font-display mt-1">
            Shop by Popular Brands
          </h2>
        </div>

        <Link
          href="/shop"
          className="text-xs sm:text-sm font-semibold text-secondary hover:text-secondary-dark flex items-center gap-1 group"
        >
          <span>View All Brands</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {brands.map((b) => (
          <Link
            key={b.slug}
            href={`/shop?brand=${b.slug}`}
            className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all text-center group flex flex-col items-center justify-center h-28"
          >
            <span className="text-lg font-black text-primary group-hover:text-secondary transition-colors font-display">
              {b.name}
            </span>
            <span className="text-[11px] text-gray-400 mt-1">{b.tag}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
