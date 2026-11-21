import React from "react";

export const metadata = {
  title: "Terms and Conditions of Use | AVNIVO",
  description: "Terms and conditions governing the use of AVNIVO shopping discovery and price comparison services.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-primary font-display">
          Terms & Conditions of Service
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Effective Date: November 2025 • Governed under the laws of the Republic of India
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the AVNIVO website (www.avnivo.com) and associated APIs, you agree to be legally bound by these Terms and Conditions and our Privacy Policy. If you do not agree, you must refrain from using the platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">2. Service Scope</h2>
          <p>
            AVNIVO provides an electronic product discovery, comparison, and referral directory. In the current launch stage, AVNIVO acts solely as an intermediary and does not sell, ship, or process payments for goods indexed from third-party merchants (Amazon, Flipkart, Croma, etc.).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">3. User Conduct</h2>
          <p>
            Users agree not to scrape, reverse-engineer, inject automated bots, or engage in abusive traffic generation that impairs our price comparison algorithms or network servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">4. Intellectual Property</h2>
          <p>
            The AVNIVO trademark, logo, design system, and proprietary comparison algorithms are the intellectual property of AVNIVO. All other brand logos, merchant marks, and product photographs remain the copyrighted property of their respective trademark holders.
          </p>
        </section>
      </div>
    </div>
  );
}
