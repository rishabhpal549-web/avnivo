import React from "react";
import { ShieldCheck, Info, FileText } from "lucide-react";

export const metadata = {
  title: "Affiliate Marketing Disclosure | AVNIVO",
  description: "Transparent legal statement regarding AVNIVO's affiliate partnerships, advertising relationships, and referral commission model.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-secondary text-xs font-bold rounded-full mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>Statutory Consumer Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-primary font-display">
          Affiliate Marketing Disclosure
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Last Updated: November 2025 • Effective across all AVNIVO platforms
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-blue-950 font-medium text-xs leading-relaxed">
          <strong>Key Summary:</strong> AVNIVO is free for consumers. We may earn an advertising or referral commission when you purchase through links on our site. This never increases the price you pay. We do not accept payment to artificially manipulate product rankings or recommend inferior products.
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">
            1. Our Business Model & How We Sustain Free Discovery
          </h2>
          <p>
            AVNIVO is an independent, consumer-first e-commerce discovery and price comparison engine based in India. Our core service is 100% free for all shoppers. To cover operational infrastructure, real-time price monitoring servers, and editorial research staff, we partner with reputable retail networks through affiliate marketing agreements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">
            2. Participation in Affiliate Programs
          </h2>
          <p>
            AVNIVO is an authorized participant in several major affiliate programs, including but not limited to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
            <li>
              <strong>Amazon Associates India:</strong> As an Amazon Associate, AVNIVO earns from qualifying purchases made after clicking our authorized product links.
            </li>
            <li>
              <strong>Flipkart Affiliate Network:</strong> We track eligible purchases referred to Flipkart Internet Private Limited under official partner guidelines.
            </li>
            <li>
              <strong>Authorized Retail Partners:</strong> Selected brand and merchant partner networks (e.g., Croma, Tata CLiQ, Reliance Digital) where authorized feeds or affiliate integrations exist.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">
            3. Zero Surcharge to Shoppers
          </h2>
          <p>
            Clicking an affiliate link on AVNIVO does <strong>not</strong> increase the purchase price. The commission is paid entirely by the merchant out of their customer acquisition budget. In many cases, AVNIVO shoppers receive exclusive coupon codes, bank cashbacks, or lower indicative rates that reduce the final checkout expense.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">
            4. Editorial Independence & Rating Integrity
          </h2>
          <p>
            Our editorial guides, specifications matrices, and automated price comparison algorithms function independently of commercial relationships. We never:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>Fabricate ratings, review counts, or consumer testimonials.</li>
            <li>List an inferior retailer simply because they offer higher commission percentages.</li>
            <li>Falsify discounts, original list prices, or stock availability.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">
            5. Limitation of Merchant Liability
          </h2>
          <p>
            AVNIVO does not operate merchant checkout, billing, inventory warehousing, packaging, or courier shipping for affiliate referrals. All warranties, return timelines, shipping SLAs, and customer service inquiries remain strictly between you and the merchant retailer where you completed payment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">
            6. Regulatory Contact
          </h2>
          <p className="text-xs text-gray-500">
            Questions regarding our affiliate relationships or compliance with the Consumer Protection (E-Commerce) Rules, 2020 should be directed to our compliance desk at{" "}
            <a href="mailto:compliance@avnivo.com" className="text-secondary underline font-semibold">
              compliance@avnivo.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
