import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { BUYING_GUIDES } from '@/data/guides';
import { Breadcrumb } from '@/components/Breadcrumb';
import { AffiliateDisclosureBanner } from '@/components/AffiliateDisclosureBanner';

export const metadata: Metadata = {
  title: 'Home & Kitchen Buying Guides (2026) – Expert Research | AVNIVO',
  description: 'In-depth, SEO-friendly buying guides for Indian homes: How to choose cookware, kitchen gadgets, air fryers, pantry organizers, and everyday essentials.',
};

export default function BuyingGuidesHubPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'Buying Guides' }]} />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-bold uppercase tracking-wider">
          <BookOpen size={14} />
          <span>Independent Research & Checklists</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Home & Kitchen Buying Guides
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Detailed, expert-written buying manuals designed to eliminate confusion. We dissect materials, motor specifications, safety standards, and practical maintenance before you buy.
        </p>
      </div>

      <AffiliateDisclosureBanner compact />

      {/* Buying Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BUYING_GUIDES.map((guide) => (
          <Link
            key={guide.id}
            href={`/buying-guides/${guide.slug}`}
            className="group flex flex-col bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-navy/30 transition-all duration-300"
          >
            {/* Guide Cover Image */}
            <div className="relative h-52 w-full overflow-hidden bg-gray-100">
              <img
                src={guide.coverImage}
                alt={guide.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-brand-navy/90 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                {guide.category}
              </div>
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/60 text-white text-[11px] font-semibold flex items-center gap-1">
                <Clock size={12} />
                <span>{guide.readTime}</span>
              </div>
            </div>

            {/* Guide Content */}
            <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5">
                  <Calendar size={12} />
                  <span>{guide.publishedAt}</span>
                  <span>•</span>
                  <span>{guide.author}</span>
                </div>

                <h3 className="font-black text-lg text-gray-900 group-hover:text-brand-navy transition-colors line-clamp-2 leading-snug">
                  {guide.title}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {guide.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                <span>Read Full Buying Guide</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

