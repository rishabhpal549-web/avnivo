import React from "react";

export const metadata = {
  title: "Cookie Policy | AVNIVO",
  description: "Explanation of cookies, local storage, and session identifiers used on AVNIVO.",
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-primary font-display">
          Cookie & Local Storage Policy
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          How we use essential cookies and browser storage
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">1. What We Store</h2>
          <p>
            AVNIVO uses essential cookies to preserve your login session (encrypted HTTP-only JWT cookie) and browser localStorage to retain your selected language preference (English/Hindi) and guest Wishlist items across browser reloads.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">2. No Third-Party Tracking Cookies</h2>
          <p>
            We do not sell personal browsing cookies to third-party ad brokers. Outbound affiliate links carry standard UTM tags (e.g. <code>?tag=avnivo-21</code>) to ensure our partner networks credit qualifying referral orders accurately.
          </p>
        </section>
      </div>
    </div>
  );
}
