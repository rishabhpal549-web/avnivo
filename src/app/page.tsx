import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Flame, 
  ShieldCheck, 
  Star, 
  Award, 
  Sparkles, 
  CheckCircle, 
  Layers, 
  BookOpen, 
  TrendingUp,
  Percent,
  RefreshCw,
  Search
} from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS, getFeaturedProducts, getTrendingProducts, getDealProducts } from '@/data/products';
import { BUYING_GUIDES } from '@/data/guides';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { AffiliateDisclosureBanner } from '@/components/AffiliateDisclosureBanner';
import { SearchBar } from '@/components/SearchBar';
import { StarRating } from '@/components/StarRating';
import { formatPrice } from '@/lib/utils';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 4);
  const trendingProducts = getTrendingProducts().slice(0, 4);
  const dealProducts = getDealProducts().slice(0, 4);
  const latestGuides = BUYING_GUIDES.slice(0, 3);

  return (
    <div className="flex flex-col gap-10 sm:gap-14 pb-16">
      {/* 1. HERO BANNER SECTION (Amazon-Inspired Premium Banner) */}
      <section className="relative w-full bg-gradient-to-b from-brand-navyDark via-brand-navy to-[#18427B] text-white pt-8 pb-20 sm:pb-28 px-4 overflow-hidden">
        {/* Background decorative subtle circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center space-y-6">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-brand-orange tracking-wide">
            <Sparkles size={14} />
            <span>India’s Dedicated Home & Kitchen Discovery Platform</span>
          </div>

          {/* Main Headline & Tagline */}
          <div className="space-y-3 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Smart Living, <span className="text-brand-orange">Better Home.</span>
            </h1>
            <p className="text-sm sm:text-lg text-gray-200 font-normal max-w-2xl mx-auto leading-relaxed">
              Discover verified reviews, unbiased side-by-side product comparisons, and curated buying guides for modern Indian kitchens and homes.
            </p>
          </div>

          {/* Large Hero Search Bar */}
          <div className="w-full max-w-2xl pt-2">
            <SearchBar />
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-gray-300">
              <span className="text-gray-400 font-medium">Popular Searches:</span>
              <Link href="/search?q=Tri-Ply" className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors">
                Tri-Ply Kadhai
              </Link>
              <Link href="/search?q=Air+Fryer" className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors">
                Digital Air Fryer
              </Link>
              <Link href="/search?q=Chopper" className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors">
                Vegetable Chopper
              </Link>
              <Link href="/search?q=Spin+Mop" className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors">
                Microfiber Spin Mop
              </Link>
            </div>
          </div>

          {/* Quick Trust Highlights Strip */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-brand-orange/20 text-brand-orange shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">100% Unbiased</div>
                <div className="text-gray-400 text-[11px]">Independent evaluations</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-amber-400/20 text-amber-400 shrink-0">
                <Star size={18} />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">Verified Ratings</div>
                <div className="text-gray-400 text-[11px]">Aggregated authentic data</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-emerald-400/20 text-emerald-400 shrink-0">
                <Percent size={18} />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">Direct Merchant Price</div>
                <div className="text-gray-400 text-[11px]">Zero markups or extra cost</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-blue-400/20 text-blue-400 shrink-0">
                <Layers size={18} />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">Side-by-Side</div>
                <div className="text-gray-400 text-[11px]">Instant specs comparison</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Overlap Banner: Affiliate Disclosure Notice */}
      <div className="max-w-7xl mx-auto px-4 -mt-14 sm:-mt-20 relative z-20 w-full">
        <AffiliateDisclosureBanner />
      </div>

      {/* 2. SHOP BY CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">
              Curated Collections
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Engineered for Indian homes. Select a category to explore tested products, verified specs, and buying recommendations.
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-orange transition-colors"
          >
            <span>View All 8 Categories</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">
              Hand-Picked Recommendations
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Featured Products for Indian Kitchens
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Top-performing products rigorously reviewed for durability, thermal distribution, and everyday ease.
            </p>
          </div>
          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-orange transition-colors"
          >
            <span>Browse All Product Reviews</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. VERIFIED DEALS & OFFERS SECTION (Flame/Deal Theme) */}
      <section id="deals" className="w-full bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-y border-amber-200/60 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">
                <Flame size={16} className="text-brand-orange fill-brand-orange animate-bounce" />
                <span>Verified Price Drops & Top Deals</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Today&apos;s Verified Home & Kitchen Deals
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                High discounts on verified quality products with 4.0+ verified buyer ratings.
              </p>
            </div>
            <Link
              href="/search?deals=true"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orangeHover transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-amber-200"
            >
              <span>See All Discounts (40%+ OFF)</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE PRODUCT COMPARISON HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl bg-brand-navy text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange text-white text-xs font-bold uppercase tracking-wider">
              <Layers size={14} />
              <span>Side-by-Side Comparison Engine</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Torn Between Two Appliances or Cookware Brands?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Don’t guess. Put products side-by-side to compare capacity, wattage, base materials, warranty, verified prices, and pros & cons. Discover which model offers the true Best Value for your Indian household.
            </p>
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white text-sm font-bold shadow-lg shadow-brand-orange/30 transition-all hover:scale-105"
              >
                <span>Open Product Comparison Table</span>
                <ArrowRight size={16} />
              </Link>
              <span className="text-xs text-gray-400">
                Compare up to 4 products simultaneously with responsive mobile tables.
              </span>
            </div>
          </div>

          {/* Decorative Background Icon */}
          <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none text-white">
            <Layers size={360} />
          </div>
        </div>
      </section>

      {/* 6. TRENDING PRODUCTS IN INDIA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">
              <TrendingUp size={14} />
              <span>Popular Demand</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Trending Home & Kitchen Essentials
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Top trending items loved by urban households in Bangalore, Mumbai, Delhi, Hyderabad, and across India.
            </p>
          </div>
          <Link
            href="/categories/kitchen-storage-organization"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-orange transition-colors"
          >
            <span>Explore Kitchen Storage</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. EXPERT BUYING GUIDES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">
              <BookOpen size={14} />
              <span>Independent Editorial Research</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Comprehensive Buying Guides
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Detailed step-by-step guides breaking down technical jargon, materials, and buying criteria before you spend a single rupee.
            </p>
          </div>
          <Link
            href="/buying-guides"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-orange transition-colors"
          >
            <span>All 6 Buying Guides</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestGuides.map((guide) => (
            <Link
              key={guide.id}
              href={`/buying-guides/${guide.slug}`}
              className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-navy/30 transition-all duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={guide.coverImage}
                  alt={guide.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-brand-navy/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                  {guide.category}
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-semibold">
                  {guide.readTime}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-gray-900 group-hover:text-brand-navy transition-colors line-clamp-2 mb-2 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                  <span>Read Full Guide</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. WHY CHOOSE AVNIVO? (Brand Trust Pillars) */}
      <section className="w-full bg-white border-y border-gray-200 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              The AVNIVO Promise
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Why Indian Shoppers Trust AVNIVO
            </h2>
            <p className="text-sm text-gray-500">
              We eliminate online shopping regret with transparent editorial standards, verified prices, and zero sponsored fluff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            {/* Pillar 1 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 rounded-2xl bg-gray-50/70 border border-gray-200/80">
              <div className="p-3.5 rounded-2xl bg-brand-navy text-white shrink-0">
                <ShieldCheck size={26} className="text-brand-orange" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-base text-gray-900">
                  100% Unbiased Editorial Reviews
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We never accept paid placements or sponsored product boosts. If a pressure cooker has a finicky lid or an air fryer lacks capacity, we tell you frankly.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 rounded-2xl bg-gray-50/70 border border-gray-200/80">
              <div className="p-3.5 rounded-2xl bg-brand-navy text-white shrink-0">
                <Star size={26} className="text-amber-400" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-base text-gray-900">
                  Tested for Indian Cooking Conditions
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Western recommendations rarely work for high-flame tadkas, turmeric staining, or hard water. We evaluate every item specifically for Indian household demands.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 rounded-2xl bg-gray-50/70 border border-gray-200/80">
              <div className="p-3.5 rounded-2xl bg-brand-navy text-white shrink-0">
                <Percent size={26} className="text-emerald-400" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-base text-gray-900">
                  Zero Extra Cost to You
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Our external merchant affiliate partnerships earn us a modest commission from the seller when you buy, without charging you a single extra paisa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

