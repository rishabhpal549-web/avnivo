import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  HeartHandshake, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  Award
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { AffiliateDisclosureBanner } from '@/components/AffiliateDisclosureBanner';

export const metadata: Metadata = {
  title: 'About Us – Our Mission, Values & Editorial Standards',
  description: 'Learn about AVNIVO, our brand story, mission, and how we help Indian shoppers make smarter, confident Home & Kitchen buying decisions.',
  openGraph: {
    title: 'About AVNIVO – Smart Living, Better Home',
    description: 'Learn about AVNIVO: independent product discovery, honest comparisons, and verified Home & Kitchen recommendations for India.',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'About Us' }]} />

      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-bold uppercase tracking-wider">
          <Sparkles size={14} />
          <span>About AVNIVO</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          Smart Living, <span className="text-brand-orange">Better Home.</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          AVNIVO is an independent product discovery and affiliate recommendation platform built to help Indian homeowners, cooks, and families navigate the overwhelming world of online Home & Kitchen shopping.
        </p>
      </div>

      {/* Brand Story */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight">
            Our Brand Story
          </h2>
          <div className="w-12 h-1 bg-brand-orange rounded-full" />
        </div>

        <div className="prose prose-sm text-gray-600 leading-relaxed space-y-4">
          <p>
            Online ecommerce marketplaces in India offer tens of thousands of products under every kitchen category. Yet, finding genuinely durable, high-performing home goods has become harder than ever. Bombarded by conflicting 5-star reviews, undisclosed sponsorships, and misleading technical claims, shoppers frequently end up with cookware that burns their gravies, gadgets that break after three uses, or organizers that don&apos;t fit Indian kitchen cabinets.
          </p>
          <p>
            We created <strong>AVNIVO</strong> with a simple, uncompromising objective: <strong>to cut through the marketing noise and deliver honest, practical, and verified product recommendations specifically tailored for Indian living conditions.</strong>
          </p>
          <p>
            From the thermal behavior of tri-ply stainless steel kadhais on high-power LPG flames to the real wattage demands of grinding hard dry turmeric, our research directly addresses the real-world friction of Indian households.
          </p>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mission */}
        <div className="bg-gradient-to-br from-brand-navy to-brand-navyDark text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
          <div className="p-3 w-fit rounded-2xl bg-brand-orange text-white">
            <Target size={24} />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white">Our Mission</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            To empower Indian consumers with transparent, meticulously researched product guides, specifications, and side-by-side comparisons that make every rupee spent a lasting investment in a better home.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-gradient-to-br from-brand-orange to-brand-orangeHover text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
          <div className="p-3 w-fit rounded-2xl bg-white text-brand-navy">
            <Compass size={24} />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white">Our Vision</h3>
          <p className="text-xs sm:text-sm text-orange-50 leading-relaxed">
            To become India’s most trustworthy Home & Kitchen destination—a platform where quality always trumps hype, and where every household can find smart living essentials with complete confidence.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Our Core Values</h2>
          <p className="text-xs text-gray-500">The foundational principles that guide every review, comparison, and guide we publish.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-blue-50 text-brand-navy font-bold">
              <ShieldCheck size={22} className="text-brand-orange" />
            </div>
            <h4 className="font-extrabold text-base text-gray-900">Uncompromising Integrity</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              We never accept money to alter product scores or praise sub-par items. If a product has design flaws or durability problems, we document them candidly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-blue-50 text-brand-navy font-bold">
              <HeartHandshake size={22} className="text-brand-orange" />
            </div>
            <h4 className="font-extrabold text-base text-gray-900">Reader-First Focus</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Our business model depends on long-term reader trust. We recommend products based solely on whether we would spend our own hard-earned money on them.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-blue-50 text-brand-navy font-bold">
              <Award size={22} className="text-brand-orange" />
            </div>
            <h4 className="font-extrabold text-base text-gray-900">Contextual Relevance</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              We analyze products through the lens of Indian culinary customs, monsoon humidity, compact kitchens, and regional lifestyle requirements.
            </p>
          </div>
        </div>
      </section>

      {/* How We Help Customers Make Better Buying Decisions */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight">
          How We Help You Make Smarter Purchases
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-700">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <CheckCircle2 size={18} className="text-brand-orange shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-bold text-gray-900 text-sm">Aggregated Verified Ratings</h5>
              <p className="text-gray-600 leading-relaxed">
                We aggregate tens of thousands of verified customer reviews, cross-referencing return complaints and long-term durability reports to filter out fake positive ratings.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <CheckCircle2 size={18} className="text-brand-orange shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-bold text-gray-900 text-sm">Specification Breakdown</h5>
              <p className="text-gray-600 leading-relaxed">
                We translate manufacturer marketing buzzwords into clear, actionable specs: stainless steel grade (304 vs 430), motor wattages, and true usable cooking volume.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <CheckCircle2 size={18} className="text-brand-orange shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-bold text-gray-900 text-sm">Side-by-Side Comparison Engine</h5>
              <p className="text-gray-600 leading-relaxed">
                Compare up to four competing products simultaneously on price, warranty, capacity, and real-world strengths to identify the true &quot;Best Value Pick.&quot;
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <CheckCircle2 size={18} className="text-brand-orange shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-bold text-gray-900 text-sm">Direct Merchant Redirection</h5>
              <p className="text-gray-600 leading-relaxed">
                We connect you directly to authorized merchant stores (like Amazon India) so you receive official brand warranties, easy returns, and secure payment processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate Transparency Notice */}
      <AffiliateDisclosureBanner />

      {/* Call to Action */}
      <div className="p-8 rounded-3xl bg-brand-navy text-white text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-black">Ready to Upgrade Your Home?</h3>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
          Explore our complete category catalog or read our latest expert buying guides.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/categories"
            className="px-6 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold transition-colors"
          >
            Explore Categories
          </Link>
          <Link
            href="/buying-guides"
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
          >
            Read Buying Guides
          </Link>
        </div>
      </div>
    </div>
  );
}

