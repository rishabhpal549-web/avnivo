import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  UserCheck, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  ExternalLink,
  Sparkles,
  Bookmark
} from 'lucide-react';
import { BUYING_GUIDES, getGuideBySlug } from '@/data/guides';
import { PRODUCTS, getProductById } from '@/data/products';
import { Breadcrumb } from '@/components/Breadcrumb';
import { AffiliateButton } from '@/components/AffiliateButton';
import { AffiliateDisclosureBanner } from '@/components/AffiliateDisclosureBanner';
import { ProductCard } from '@/components/ProductCard';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return { title: 'Buying Guide' };

  return {
    title: `${guide.title} | AVNIVO Buying Guide`,
    description: guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      images: [guide.coverImage],
    },
  };
}

export default function BuyingGuideDetailPage({ params }: PageProps) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  // Recommended products for this guide
  const recommendedProducts = guide.recommendedProductIds
    .map((id) => getProductById(id))
    .filter((p) => Boolean(p));

  // Related Guides
  const otherGuides = BUYING_GUIDES.filter((g) => g.id !== guide.id).slice(0, 2);

  // Schema.org Article markup
  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    image: [guide.coverImage],
    datePublished: '2026-10-24T00:00:00+05:30',
    dateModified: '2026-11-12T00:00:00+05:30',
    author: {
      '@type': 'Organization',
      name: guide.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AVNIVO',
      logo: {
        '@type': 'ImageObject',
        url: 'https://avnivo.in/images/logo.svg',
      },
    },
    description: guide.excerpt,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }}
      />

      <Breadcrumb
        items={[
          { label: 'Buying Guides', href: '/buying-guides' },
          { label: guide.category, href: `/categories/${guide.categorySlug}` },
          { label: guide.title },
        ]}
      />

      {/* Guide Header Banner */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
          <span>{guide.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-gray-500 font-medium lowercase">
            <Clock size={13} />
            <span>{guide.readTime}</span>
          </span>
          <span>•</span>
          <span className="text-gray-500 font-medium">Updated: {guide.publishedAt}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          {guide.title}
        </h1>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {guide.excerpt}
        </p>

        <div className="text-xs text-gray-500 flex items-center gap-2 pt-1">
          <span>By <strong>{guide.author}</strong></span>
          <span>•</span>
          <span>Fact-checked & reviewed for Indian homes</span>
        </div>
      </div>

      <AffiliateDisclosureBanner compact />

      {/* Cover Image */}
      <div className="relative w-full h-72 sm:h-96 lg:h-[420px] rounded-3xl overflow-hidden shadow-lg bg-gray-100">
        <img
          src={guide.coverImage}
          alt={guide.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content Layout: Table of Contents + Article Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Sticky Table of Contents Sidebar */}
        <aside className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-navy border-b border-gray-100 pb-3">
              <Bookmark size={16} className="text-brand-orange" />
              <span>Table of Contents</span>
            </div>

            <nav className="space-y-2 text-xs">
              {guide.tableOfContents.map((toc, idx) => (
                <a
                  key={toc.id}
                  href={`#${toc.id}`}
                  className="block py-1.5 px-2.5 rounded-lg text-gray-600 hover:text-brand-navy hover:bg-blue-50 font-medium transition-colors"
                >
                  <span className="text-brand-orange mr-1.5 font-bold">{idx + 1}.</span>
                  <span>{toc.title}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Quick Category Link */}
          <div className="p-5 rounded-2xl bg-brand-navy text-white text-xs space-y-2">
            <div className="font-bold text-brand-orange uppercase text-[10px] tracking-wider">
              Browse Related Category
            </div>
            <p className="text-gray-300">
              Explore tested {guide.category} items with verified ratings.
            </p>
            <Link
              href={`/categories/${guide.categorySlug}`}
              className="inline-flex items-center gap-1 font-bold text-white hover:text-brand-orange transition-colors pt-1"
            >
              <span>View {guide.category} Catalog →</span>
            </Link>
          </div>
        </aside>

        {/* Article Body */}
        <div className="lg:col-span-8 space-y-10">
          {/* Content Sections */}
          <div className="space-y-10">
            {guide.contentSections.map((sec, idx) => (
              <section key={sec.id} id={sec.id} className="scroll-mt-24 space-y-4">
                <h2 className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight flex items-baseline gap-2">
                  <span className="text-brand-orange text-lg">0{idx + 1}.</span>
                  <span>{sec.title}</span>
                </h2>

                <div className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line space-y-3">
                  <p>{sec.body}</p>
                </div>

                {sec.tips && sec.tips.length > 0 && (
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-xs">
                    <div className="font-bold text-amber-950 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-brand-orange" />
                      <span>AVNIVO Practical Tip</span>
                    </div>
                    <ul className="space-y-1 text-gray-700">
                      {sec.tips.map((tip, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-1.5">
                          <span className="text-brand-orange font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Recommended Products Showcase */}
          {recommendedProducts.length > 0 && (
            <section className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">
                  Editor Recommendations
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  Top Recommended Products for This Guide
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Hand-picked based on strict criteria: material safety, real wattage, and verified long-term durability.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {recommendedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}

          {/* FAQs Section */}
          {guide.faqs && guide.faqs.length > 0 && (
            <section className="bg-gray-50 rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 text-brand-navy">
                <HelpCircle size={22} className="text-brand-orange" />
                <h3 className="text-xl font-black tracking-tight">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-4">
                {guide.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1.5 text-xs">
                    <h4 className="font-bold text-gray-900 text-sm">{faq.question}</h4>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Related Guides */}
      {otherGuides.length > 0 && (
        <section className="border-t border-gray-200 pt-10 space-y-6">
          <h3 className="text-xl font-black text-gray-900">More Home & Kitchen Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherGuides.map((g) => (
              <Link
                key={g.id}
                href={`/buying-guides/${g.slug}`}
                className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-brand-navy transition-all group flex gap-4 items-center"
              >
                <img
                  src={g.coverImage}
                  alt={g.title}
                  className="w-20 h-20 object-cover rounded-xl shrink-0"
                />
                <div className="space-y-1 min-w-0">
                  <div className="text-[10px] font-bold text-brand-orange uppercase">{g.category}</div>
                  <h4 className="text-xs font-bold text-gray-900 group-hover:text-brand-navy line-clamp-2">
                    {g.title}
                  </h4>
                  <div className="text-[11px] text-gray-400">{g.readTime}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

