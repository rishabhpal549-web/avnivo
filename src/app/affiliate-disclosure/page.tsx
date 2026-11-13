import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle, 
  ExternalLink, 
  AlertCircle,
  Percent,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SITE_CONFIG } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure – Amazon Associates & Transparency Statement | AVNIVO',
  description: 'AVNIVO Affiliate Disclosure: Complete transparency regarding our affiliate partnerships, Amazon Associates participation, commission model, and zero extra costs to readers.',
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ label: 'Affiliate Disclosure' }]} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-bold uppercase tracking-wider">
          <ShieldCheck size={14} />
          <span>Full Legal & FTC / ASCI Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Affiliate Disclosure Statement
        </h1>
        <p className="text-xs text-gray-500">
          Last Updated: November 13, 2026 • In Compliance with Amazon Associates Operating Agreement & ASCI Guidelines
        </p>
      </div>

      {/* Top Highlight Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-navy via-brand-navyLight to-brand-navyDark text-white space-y-3 shadow-md">
        <div className="flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-wider">
          <Sparkles size={16} />
          <span>Core Transparency Summary</span>
        </div>
        <p className="text-sm sm:text-base font-semibold leading-relaxed">
          AVNIVO is a participant in affiliate marketing programs, notably the Amazon Associates Program. When you click a product link on AVNIVO and make a purchase on an external merchant platform, we may earn an affiliate commission at <strong>no extra cost to you</strong>.
        </p>
      </div>

      {/* Structured Sections */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-8 text-xs sm:text-sm text-gray-700 leading-relaxed">
        {/* 1. What is Affiliate Marketing? */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-brand-navy">
            1. What is Affiliate Marketing and Why Does AVNIVO Use It?
          </h2>
          <p>
            Publishing comprehensive, non-sponsored buying guides, purchasing and comparing physical cookware, and conducting deep research into product technical specifications requires substantial time, effort, and testing resources.
          </p>
          <p>
            Rather than cluttering our pages with intrusive pop-up banners or accepting paid sponsored reviews from manufacturers that would compromise our objectivity, AVNIVO is supported by affiliate marketing. When our recommendations help you discover a genuinely useful product that you decide to buy, the merchant pays us a modest referral percentage from their advertising budget.
          </p>
        </section>

        {/* 2. Amazon Associates Operating Agreement Statement */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <h2 className="text-base font-bold text-brand-navy">
            2. Official Amazon Associates Statement
          </h2>
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 font-medium text-xs leading-relaxed space-y-2">
            <p>
              &quot;<strong>AVNIVO</strong> participates in the <strong>Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for websites to earn advertising fees by advertising and linking to <strong>Amazon.in</strong> and affiliated sites.&quot;
            </p>
            <p className="text-[11px] text-gray-600">
              Amazon, the Amazon logo, AmazonSupply, and the AmazonSupply logo are trademarks of Amazon.com, Inc. or its affiliates.
            </p>
          </div>
        </section>

        {/* 3. Does This Cost You Extra Money? */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <h2 className="text-base font-bold text-brand-navy">
            3. Zero Extra Cost to the Customer
          </h2>
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-gray-800">
              <h4 className="font-bold text-emerald-950 text-sm">You Pay the Standard Merchant Price</h4>
              <p className="leading-relaxed">
                Clicking an affiliate link on AVNIVO <strong>does not add a single rupee to the purchase price</strong>. You enjoy the exact same discounts, promotional bank coupon codes, lightning deals, Prime shipping perks, and reward coins that any direct shopper would receive.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Independence of Editorial Opinions */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <h2 className="text-base font-bold text-brand-navy">
            4. Unbiased Editorial Integrity
          </h2>
          <p>
            Our product selections and ratings are driven purely by specification evaluation, material durability analysis, and real feedback from verified Indian consumers. We do not select or rank products based on which merchant offers the highest commission rate.
          </p>
          <p>
            If a popular, heavily marketed product suffers from frequent design failures, motor burnout, or customer dissatisfaction, we highlight those drawbacks prominently in our &quot;Cons&quot; and &quot;Verdict&quot; sections.
          </p>
        </section>

        {/* 5. External Merchant Fulfillment & Customer Support */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <h2 className="text-base font-bold text-brand-navy">
            5. Merchant Sales, Shipping & Pricing Disclaimer
          </h2>
          <p>
            AVNIVO is an editorial discovery platform, <strong>not an ecommerce merchant</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
            <li>We do not store stock, take payments, or pack and ship products.</li>
            <li>All transactions occur securely on external merchant websites (like Amazon India).</li>
            <li>Prices, delivery dates, and return policies are managed exclusively by the external merchant.</li>
            <li>If an item arrives damaged, late, or in need of warranty claim, you must contact the selling merchant or manufacturer directly.</li>
          </ul>
        </section>

        {/* 6. Sponsored Link Attributes (rel="sponsored") */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <h2 className="text-base font-bold text-brand-navy">
            6. Technical Compliance: Sponsored Link Attributes
          </h2>
          <p>
            In accordance with Google Search Webmaster Guidelines and advertising transparency standards, all outbound affiliate hyperlinks across AVNIVO are formatted with appropriate sponsored attributes:
          </p>
          <div className="p-3 bg-gray-50 rounded-xl font-mono text-xs text-brand-navy border border-gray-200">
            rel=&quot;sponsored noopener noreferrer&quot;
          </div>
          <p className="text-xs text-gray-500">
            This clearly signals to search engines and visitors that the destination link is an affiliate recommendation.
          </p>
        </section>

        {/* 7. Questions */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <h2 className="text-base font-bold text-brand-navy">
            7. Questions Regarding Our Disclosure?
          </h2>
          <p>
            If you have any questions, concerns, or feedback about our affiliate relationships or editorial policies, please contact our Editorial Team at{' '}
            <a href={`mailto:${SITE_CONFIG.contact.pressEmail}`} className="text-brand-orange underline font-bold">
              {SITE_CONFIG.contact.pressEmail}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

