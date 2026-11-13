import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, Database, Globe, UserCheck, Mail } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SITE_CONFIG } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Privacy Policy – Data Protection & Cookies | AVNIVO',
  description: 'AVNIVO Privacy Policy: Learn how we collect, handle, and protect your personal information, cookie usage, analytics, and affiliate tracking.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-bold uppercase tracking-wider">
          <ShieldCheck size={14} />
          <span>Legal & Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-500">
          Last Updated: November 13, 2026 • Effective Date: January 1, 2026
        </p>
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-8 text-xs sm:text-sm text-gray-700 leading-relaxed">
        {/* Intro */}
        <section className="space-y-3">
          <p>
            Welcome to <strong>AVNIVO</strong> (accessible at <span className="text-brand-navy font-semibold">https://avnivo.in</span>). We respect your privacy and are committed to protecting personal data collected through our website. This Privacy Policy details our policies regarding the collection, use, and disclosure of information when you access our shopping discovery platform.
          </p>
          <p>
            By using AVNIVO, you agree to the collection and use of information in accordance with this policy and applicable Indian data protection laws, including the Digital Personal Data Protection Act (DPDP Act).
          </p>
        </section>

        {/* 1. Data Collection */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-2 text-brand-navy font-bold text-base">
            <Database size={18} className="text-brand-orange" />
            <h2>1. Information We Collect</h2>
          </div>
          <p>
            We collect information only to the extent necessary to provide and improve your experience on our website:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>
              <strong>Voluntarily Provided Data:</strong> When you subscribe to our newsletter or send us a message via our Contact form, we collect your name, email address, inquiry topic, and message content.
            </li>
            <li>
              <strong>Automatic Log Data:</strong> When accessing the site, standard server logs automatically record your Internet Protocol (IP) address, browser type, operating system, referring URLs, pages visited, and time stamps.
            </li>
            <li>
              <strong>Search & Interaction Data:</strong> Search queries submitted via our product search bar and product comparison selections stored locally in your browser storage.
            </li>
          </ul>
        </section>

        {/* 2. Cookies & Tracking Technologies */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-2 text-brand-navy font-bold text-base">
            <Lock size={18} className="text-brand-orange" />
            <h2>2. Cookies & Browser Storage</h2>
          </div>
          <p>
            Cookies are small data files placed on your device to enhance navigation, analyze site performance, and remember preferences.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>
              <strong>Essential Storage:</strong> Used to maintain client-side product comparison trays without requiring account registration.
            </li>
            <li>
              <strong>Affiliate Referral Cookies:</strong> When you click an affiliate link redirecting to Amazon.in or partner merchant platforms, external affiliate cookies are set by the destination merchant to attribute qualifying referral purchases. These cookies do not store personally identifiable financial details.
            </li>
          </ul>
        </section>

        {/* 3. Website Analytics & Metrics */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-2 text-brand-navy font-bold text-base">
            <Eye size={18} className="text-brand-orange" />
            <h2>3. Website Analytics</h2>
          </div>
          <p>
            We may use privacy-preserving web analytics services to understand general audience trends (such as top visited categories and reading durations). This data is aggregated and anonymized, containing no personal identities or credit card data.
          </p>
        </section>

        {/* 4. Third-Party Services & Affiliate Networks */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-2 text-brand-navy font-bold text-base">
            <Globe size={18} className="text-brand-orange" />
            <h2>4. Third-Party Services & Merchant Links</h2>
          </div>
          <p>
            AVNIVO contains outbound links to third-party merchant platforms including <strong>Amazon.in</strong>. Once you navigate away from AVNIVO via an external merchant link, you are governed by that third party&apos;s privacy policy and terms. We encourage you to review their respective policies:
          </p>
          <p className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
            Amazon.in Privacy Notice: <a href="https://www.amazon.in/gp/help/customer/display.html?nodeId=200534380" target="_blank" rel="noopener noreferrer" className="text-brand-navy underline font-semibold">https://www.amazon.in/privacy</a>
          </p>
        </section>

        {/* 5. Data Protection & Security */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-2 text-brand-navy font-bold text-base">
            <ShieldCheck size={18} className="text-brand-orange" />
            <h2>5. Data Security & Storage</h2>
          </div>
          <p>
            We implement industry-standard encryption protocols (HTTPS/TLS) across our entire platform. We do not process, store, or transmit payment details, credit/debit card numbers, or bank account credentials.
          </p>
        </section>

        {/* 6. User Rights */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-2 text-brand-navy font-bold text-base">
            <UserCheck size={18} className="text-brand-orange" />
            <h2>6. Your Data Rights</h2>
          </div>
          <p>
            Under applicable privacy laws, you possess the following rights regarding personal information you have shared with us:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
            <li>The right to request access to the personal data we hold about you.</li>
            <li>The right to request rectification of inaccurate contact details.</li>
            <li>The right to withdraw newsletter consent at any time via the unsubscribe link.</li>
            <li>The right to request erasure of your contact submission records.</li>
          </ul>
        </section>

        {/* 7. Contact Information */}
        <section className="space-y-3 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-2 text-brand-navy font-bold text-base">
            <Mail size={18} className="text-brand-orange" />
            <h2>7. Privacy Contact & Grievance Redressal</h2>
          </div>
          <p>
            If you have questions, concerns, or requests regarding this Privacy Policy or your data, please email our Data Privacy Officer:
          </p>
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-1 font-medium">
            <p><strong>AVNIVO Privacy & Editorial Desk</strong></p>
            <p>Email: <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-brand-navy underline font-bold">{SITE_CONFIG.contact.email}</a></p>
            <p>Subject Line: &quot;Data Privacy Inquiry&quot;</p>
          </div>
        </section>
      </div>
    </div>
  );
}

