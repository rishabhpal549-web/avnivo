import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, AlertTriangle, Scale, ExternalLink, ShieldCheck, RefreshCw } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SITE_CONFIG } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Terms & Conditions – Website Usage & Disclaimers | AVNIVO',
  description: 'Terms and Conditions governing the use of AVNIVO shopping discovery platform, affiliate disclaimer, intellectual property, and limitation of liability.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ label: 'Terms & Conditions' }]} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-bold uppercase tracking-wider">
          <Scale size={14} />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs text-gray-500">
          Last Updated: November 13, 2026 • Effective Date: January 1, 2026
        </p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-8 text-xs sm:text-sm text-gray-700 leading-relaxed">
        {/* Intro */}
        <section className="space-y-3">
          <p>
            Please read these Terms & Conditions carefully before using the <strong>AVNIVO</strong> website (<span className="text-brand-navy font-semibold">https://avnivo.in</span>). Your access to and use of this service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the website.
          </p>
        </section>

        {/* 1. Website Usage */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <h2 className="text-base font-bold text-brand-navy">1. Permitted Website Usage</h2>
          <p>
            AVNIVO is an informational shopping discovery and consumer research website designed to help Indian consumers research, compare, and discover Home & Kitchen products. You agree to use the site only for lawful, personal, and non-commercial informational purposes.
          </p>
          <p>
            You agree not to engage in automated scraping, data extraction, denial-of-service activities, or any behavior that impairs the proper functioning of the site or infringes upon others’ rights.
          </p>
        </section>

        {/* 2. Intellectual Property */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <h2 className="text-base font-bold text-brand-navy">2. Intellectual Property Rights</h2>
          <p>
            All original editorial content, written buying guides, comparison algorithms, site layouts, typography arrangements, and the AVNIVO circular brand emblem and wordmark are the intellectual property of AVNIVO and protected under applicable copyright and trademark laws.
          </p>
          <p>
            Product brand names, logos, and trademarks (such as Philips, Prestige, Hawkins, Pigeon, Milton, Bosch, Elica, Amazon) displayed on this website belong to their respective trademark owners and are referenced solely for descriptive, comparative, and identification purposes.
          </p>
        </section>

        {/* 3. Product Information Accuracy */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <h2 className="text-base font-bold text-brand-navy">3. Accuracy of Product Information & Pricing</h2>
          <p>
            While AVNIVO strives to maintain accurate and up-to-date specifications, dimensions, wattage figures, and prices, <strong>product prices, discounts, stock availability, and merchant terms change frequently on third-party merchant platforms without prior notice.</strong>
          </p>
          <p>
            The price and availability information displayed on the external merchant&apos;s site (e.g. Amazon.in) at the time of purchase will govern the transaction. AVNIVO does not guarantee that listed prices remain static.
          </p>
        </section>

        {/* 4. External Links & Merchant Fulfillment */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <h2 className="text-base font-bold text-brand-navy">4. External Merchant Links & Purchases</h2>
          <p>
            AVNIVO is an affiliate discovery portal and <strong>is not a direct seller, retailer, or manufacturer</strong>. We do not operate checkout carts, take payment credentials, process bank transactions, or dispatch physical parcels.
          </p>
          <p>
            All purchases initiated via links on AVNIVO are concluded directly on external merchant platforms (such as Amazon India). Consequently, all warranties, returns, refunds, replacement guarantees, shipping timelines, and customer grievances must be directed to the respective merchant.
          </p>
        </section>

        {/* 5. Affiliate Relationships */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <h2 className="text-base font-bold text-brand-navy">5. Affiliate Disclosures & Sponsored Links</h2>
          <p>
            In compliance with consumer disclosure guidelines, AVNIVO discloses that external purchase buttons contain sponsored affiliate links. Clicking these links may result in AVNIVO receiving a referral commission from the merchant if you make a qualifying purchase. This commission does not alter the retail price you pay.
          </p>
          <p>
            For exhaustive details, please refer to our full{' '}
            <Link href="/affiliate-disclosure" className="text-brand-orange underline font-semibold">
              Affiliate Disclosure Policy
            </Link>
            .
          </p>
        </section>

        {/* 6. Limitation of Liability */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <h2 className="text-base font-bold text-brand-navy">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by Indian law, AVNIVO, its editorial staff, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of the website, including but not limited to merchant order delays, damaged goods upon delivery, or product defects handled under manufacturer warranties.
          </p>
          <p>
            All evaluations, verdicts, and buying guides represent editorial opinions based on public specifications, aggregated buyer data, and independent analysis. Users are advised to exercise independent judgment before making substantial kitchen appliance or home investments.
          </p>
        </section>

        {/* 7. Updates to Terms */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <h2 className="text-base font-bold text-brand-navy">7. Modifications to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. Changes become effective immediately upon posting to this page. Continued use of AVNIVO after modifications indicates acceptance of the updated terms.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <h2 className="text-base font-bold text-brand-navy">8. Contact Information</h2>
          <p>
            For questions regarding these Terms & Conditions, please reach out via email to{' '}
            <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-brand-navy underline font-bold">
              {SITE_CONFIG.contact.email}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

