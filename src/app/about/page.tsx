import React from "react";
import { AvnivoLogo } from "@/components/common/AvnivoLogo";
import { ShieldCheck, Compass, Scale, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About AVNIVO – Discover. Compare. Shop. | Our Story & Mission",
  description: "Learn why AVNIVO was created to bring radical price transparency and consumer-first shopping discovery to India.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="flex justify-center">
          <AvnivoLogo size="lg" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-primary font-display mt-4 leading-tight">
          Empowering Indian Shoppers with Radical Price Transparency
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          AVNIVO was founded with a singular conviction: Indian consumers shouldn&apos;t have to open six different tabs just to find out who genuinely has the lowest price on an authentic product.
        </p>
      </div>

      {/* Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-secondary flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-primary font-display">1. Discover</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Curated, high-quality merchandise across electronics, apparel, kitchen essentials, and fitness gear without counterfeit clutter.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-primary font-display">2. Compare</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Real-time indicative pricing across Amazon India, Flipkart, and Croma so you never pay more than necessary.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-primary font-display">3. Shop Smart</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Direct, secure checkout on authorized merchant networks with standard warranties and zero checkout markups.
          </p>
        </div>
      </div>

      {/* Future Roadmap Section */}
      <div className="bg-primary text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden mb-16">
        <span className="text-xs font-bold text-accent uppercase tracking-widest">
          Long-Term Vision
        </span>
        <h2 className="text-2xl sm:text-3xl font-black font-display mt-2 mb-4">
          From Affiliate Discovery to India&apos;s Unified Shopping Marketplace
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl mb-6">
          While our initial launch focuses strictly on unbiased affiliate price comparisons, our roadmap includes launching direct native checkout, verified vendor onboarding, and dedicated mobile apps for iOS and Android.
        </p>

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold px-6 py-3 rounded-2xl text-xs shadow-md transition-all"
        >
          <span>Explore Product Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
