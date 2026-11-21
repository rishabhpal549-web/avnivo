import React from "react";
import { Package, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Return & Refund Policy (Roadmap) | AVNIVO",
  description: "Return and refund guidelines for future direct purchases on the AVNIVO marketplace.",
};

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full mb-3">
          <Package className="w-4 h-4" />
          <span>Marketplace Roadmap Specification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-primary font-display">
          Return, Replacement & Refund Policy
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Applicability during Current Launch vs. Future Direct Marketplace
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs leading-relaxed">
          <strong>Important Clarification for Current Shoppers:</strong> During our current discovery phase, purchases are completed directly on authorized merchant websites (such as Amazon India, Flipkart, or Croma). Returns, cancellations, replacements, and refunds are handled exclusively under the respective merchant&apos;s return policy.
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">
            1. Current Affiliate Referral Purchases
          </h2>
          <p>
            If you ordered a product by following an AVNIVO link to Amazon, Flipkart, or Croma:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
            <li>Open your account directly on the merchant&apos;s app or website.</li>
            <li>Locate the item in your <em>Orders</em> section.</li>
            <li>Follow the merchant&apos;s return or warranty claim procedure within their stated return window (e.g., 7 or 10 days for electronics).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">
            2. Future AVNIVO Direct Store Activation
          </h2>
          <p>
            When AVNIVO activates its direct marketplace in Phase 2, direct purchases will feature:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>7-Day Hassle-Free Replacement for defective electronics and hardware.</li>
            <li>Instant UPI/Bank refunds upon pickup verification.</li>
            <li>Dedicated AVNIVO customer service resolution within 24 hours.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
