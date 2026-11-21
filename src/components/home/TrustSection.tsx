import React from "react";
import { ShieldCheck, ArrowRightLeft, Lock, Award } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "100% Verified Merchants",
    description: "We strictly index authorized platforms including Amazon India, Flipkart, Croma, and Tata CLiQ. Zero grey-market or counterfeit listings.",
  },
  {
    icon: ArrowRightLeft,
    title: "Unbiased Price Discovery",
    description: "Our price engine transparently highlights which authorized retailer currently offers the lowest indicative price and fastest delivery.",
  },
  {
    icon: Lock,
    title: "Direct Merchant Checkout",
    description: "You complete your purchase directly on the merchant's secure encrypted checkout. AVNIVO never collects your credit card or payment data.",
  },
  {
    icon: Award,
    title: "Ethical Affiliate Model",
    description: "No artificial price inflations or fake discounts. We clearly disclose our affiliate partnerships, compliant with Indian e-commerce standards.",
  },
];

export function TrustSection() {
  return (
    <section className="bg-primary text-white py-16 px-4 sm:px-6 my-14 rounded-3xl max-w-7xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase font-extrabold text-accent tracking-widest">
          Transparency & Integrity
        </span>
        <h2 className="text-2xl sm:text-3xl font-black font-display mt-2">
          Why Millions Trust AVNIVO for Shopping
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 mt-2">
          We believe Indian consumers deserve absolute honesty in product pricing, ratings, and merchant recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/30 text-accent flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
              <p className="text-xs text-gray-300 leading-relaxed">{p.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
