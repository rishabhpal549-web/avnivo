import React from "react";
import Link from "next/link";
import { ArrowRight, ShoppingCart, ShieldCheck } from "lucide-react";

const partners = [
  { name: "Amazon India", slug: "amazon-india", tag: "Amazon Associates Partner", isMerchant: true, badge: "Authorized" },
  { name: "Flipkart", slug: "flipkart", tag: "Flipkart Affiliate Network", isMerchant: true, badge: "Verified" },
  { name: "Meesho", slug: "meesho", tag: "Affordable Daily Deals", isMerchant: true, badge: "Low Price" },
  { name: "Croma", slug: "croma", tag: "Retail Tech & Appliances", isMerchant: true, badge: "Genuine" },
  { name: "boAt", slug: "boat", tag: "Cables & Mobile Audio", isMerchant: false, badge: "Popular" },
  { name: "Noise", slug: "noise", tag: "Smart Daily Wearables", isMerchant: false, badge: "Trending" },
  { name: "Philips", slug: "philips", tag: "Kitchen & Grooming Hacks", isMerchant: false, badge: "Reliable" },
  { name: "Mamaearth", slug: "mamaearth", tag: "Natural Daily Care", isMerchant: false, badge: "Toxin-Free" },
  { name: "Prestige", slug: "prestige", tag: "Kitchenware & Cookers", isMerchant: false, badge: "Household" },
  { name: "Milton", slug: "milton", tag: "Bottles & Daily Storage", isMerchant: false, badge: "Daily Life" },
];

export function BrandShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 my-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="text-[10px] uppercase font-extrabold text-secondary tracking-widest">
            Verified Indian Marketplaces & Brands
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-primary font-display mt-0.5">
            Partner Stores & Trusted Brands
          </h2>
        </div>

        <Link
          href="/shop"
          className="text-xs sm:text-sm font-semibold text-secondary hover:text-secondary-dark flex items-center gap-1 group"
        >
          <span>Explore All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3.5">
        {partners.map((p) => (
          <Link
            key={p.slug}
            href={p.isMerchant ? `/shop?merchant=${p.slug}` : `/shop?brand=${p.slug}`}
            className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-100 hover:border-secondary/40 hover:shadow-md transition-all text-center group flex flex-col items-center justify-center h-24"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm sm:text-base font-black text-primary group-hover:text-secondary transition-colors font-display">
                {p.name}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 truncate max-w-[150px]">{p.tag}</span>
            <span className="mt-1 text-[9px] font-bold text-secondary bg-blue-50 px-1.5 py-0.2 rounded">
              {p.badge}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
