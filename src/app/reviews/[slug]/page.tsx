import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Check, 
  X, 
  ShieldCheck, 
  Award, 
  ExternalLink, 
  UserCheck, 
  Layers, 
  ArrowRight,
  Info,
  Calendar,
  Sparkles
} from 'lucide-react';
import { PRODUCTS, getProductBySlug, getProductsByCategory } from '@/data/products';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StarRating } from '@/components/StarRating';
import { AffiliateButton } from '@/components/AffiliateButton';
import { AffiliateDisclosureBanner } from '@/components/AffiliateDisclosureBanner';
import { ProductCard } from '@/components/ProductCard';
import { formatPrice } from '@/lib/utils';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product Review' };

  return {
    title: `${product.name} Review – Specs, Pros & Cons | AVNIVO`,
    description: `Detailed editorial review of ${product.name}. Check verified price on ${product.merchantName}, specifications, pros & cons, and AVNIVO verdict.`,
    openGraph: {
      title: `${product.name} – AVNIVO In-Depth Review`,
      description: product.shortDescription,
      images: product.images,
    },
  };
}

export default function ProductReviewDetailPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Related products in same category
  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  // Schema.org Structured Data
  const schemaProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.ratingCount,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: product.affiliateUrl,
      seller: {
        '@type': 'Organization',
        name: product.merchantName,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }}
      />

      <Breadcrumb
        items={[
          { label: 'Reviews', href: '/reviews' },
          { label: product.category, href: `/categories/${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      {/* 1. PRODUCT TOP HERO / BUY BOX */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Product Images */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 p-6">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
            {product.discountPercent >= 40 && (
              <span className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-black uppercase px-2.5 py-1 rounded-lg shadow-sm">
                Save {product.discountPercent}%
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className="w-20 h-20 rounded-xl overflow-hidden border-2 border-brand-orange/40 bg-gray-50 p-1 shrink-0"
                >
                  <img src={img} alt={`${product.name} alternate view`} className="w-full h-full object-cover rounded-lg" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Identity, Pricing & Affiliate Action Box */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-navy">
            <span>{product.brand}</span>
            <span>•</span>
            <Link href={`/categories/${product.categorySlug}`} className="text-brand-orange hover:underline">
              {product.category}
            </Link>
          </div>

          <h1 className="text-xl sm:text-3xl font-black text-gray-900 leading-snug">
            {product.name}
          </h1>

          {/* Verified Rating & ASIN */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <StarRating rating={product.rating} ratingCount={product.ratingCount} size="md" />
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold">
              ✓ Verified Merchant Rating
            </span>
            {product.asin && (
              <span className="text-[11px] text-gray-400">
                ASIN: {product.asin}
              </span>
            )}
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-1.5">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-brand-navy">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    MRP {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                    {product.discountPercent}% OFF
                  </span>
                </>
              )}
            </div>
            <div className="text-[11px] text-gray-500">
              Prices in INR. Verified on {product.merchantName}. Prices fluctuate based on seller promotions.
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Primary Affiliate Action */}
          <div className="pt-2 space-y-2">
            <AffiliateButton product={product} size="lg" variant="primary" showSubtext />
            <div className="text-[11px] text-gray-400 text-center">
              Sold and fulfilled by {product.merchantName}. Free delivery available on eligible orders.
            </div>
          </div>
        </div>
      </div>

      {/* Affiliate Transparency Notice */}
      <AffiliateDisclosureBanner />

      {/* 2. PROS AND CONS SECTION */}
      <section className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight flex items-center gap-2">
          <span>Pros & Cons: What You Need to Know</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pros */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm uppercase tracking-wider">
              <Check size={18} className="text-emerald-600" />
              <span>Why It&apos;s Worth Buying (Pros)</span>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-800">
              {product.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-3">
            <div className="flex items-center gap-2 text-amber-950 font-extrabold text-sm uppercase tracking-wider">
              <X size={18} className="text-amber-600" />
              <span>Things to Keep in Mind (Cons)</span>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-800">
              {product.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold shrink-0">•</span>
                  <span className="leading-relaxed">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. SPECIFICATIONS TABLE */}
      <section className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight">
          Technical Specifications
        </h2>

        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <table className="w-full text-xs text-left border-collapse">
            <tbody className="divide-y divide-gray-200">
              {Object.entries(product.specifications).map(([key, val], idx) => (
                <tr key={key} className={idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                  <td className="p-3.5 sm:p-4 font-bold text-gray-700 w-1/3 sm:w-1/4 border-r border-gray-200">
                    {key}
                  </td>
                  <td className="p-3.5 sm:p-4 text-gray-800 font-medium">
                    {val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. WHO SHOULD BUY & AVNIVO VERDICT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Who Should Buy */}
        <section className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-brand-orange font-bold text-xs uppercase tracking-wider">
            <UserCheck size={18} />
            <span>Target Buyer Profile</span>
          </div>
          <h3 className="text-lg font-black text-gray-900">Who Should Buy This Product?</h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            {product.bestFor}
          </p>
        </section>

        {/* Editorial Verdict */}
        <section className="bg-gradient-to-br from-brand-navy to-brand-navyDark text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-brand-orange font-bold text-xs uppercase tracking-wider">
            <Award size={18} />
            <span>AVNIVO Editorial Verdict</span>
          </div>
          <h3 className="text-lg font-black text-white">Our Recommendation</h3>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            {product.verdict}
          </p>
        </section>
      </div>

      {/* 5. BOTTOM AFFILIATE CALL-TO-ACTION */}
      <div className="p-8 rounded-3xl bg-amber-50/70 border border-amber-200 text-center space-y-4">
        <h3 className="text-xl font-black text-gray-900">
          Ready to Check Availability on {product.merchantName}?
        </h3>
        <p className="text-xs text-gray-600 max-w-xl mx-auto">
          Stock levels and promotional discounts are subject to change by external merchants. Click below to view live pricing.
        </p>
        <div className="max-w-xs mx-auto">
          <AffiliateButton product={product} size="lg" variant="primary" showSubtext />
        </div>
      </div>

      {/* 6. RELATED PRODUCTS SECTION */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Related {product.category} Products
            </h2>
            <Link
              href={`/categories/${product.categorySlug}`}
              className="text-xs font-bold text-brand-navy hover:text-brand-orange transition-colors flex items-center gap-1"
            >
              <span>View Category</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

