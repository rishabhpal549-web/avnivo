import React from "react";

export const metadata = {
  title: "Pricing & Product Accuracy Disclaimer | AVNIVO",
  description: "Official disclaimer regarding indicative online prices, merchant updates, and third-party fulfillment.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-primary font-display">
          Pricing & Accuracy Disclaimer
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Notice regarding indicative prices and third-party listings
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">
            1. Indicative Nature of Product Prices
          </h2>
          <p>
            Product prices, discounts, coupons, and availability shown on AVNIVO are <strong>indicative</strong> and are fetched periodically from authorized merchant feeds. Because online retailers fluctuate prices in real-time based on flash sales, inventory levels, and bank offers, the price on the merchant&apos;s site at the moment of checkout supersedes any figure displayed on AVNIVO.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">
            2. No Guarantee of Price Match
          </h2>
          <p>
            AVNIVO is an independent discovery platform. We do not sell items directly during this initial phase, nor do we guarantee that any merchant will match a historical or indicative price displayed on our website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">
            3. Merchant Product Information
          </h2>
          <p>
            We take every measure to ensure specification tables and descriptions are accurate. However, manufacturers occasionally update hardware variants without notice. Please confirm critical dimensions and specifications on the merchant&apos;s listing page before finalizing your purchase.
          </p>
        </section>
      </div>
    </div>
  );
}
