import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { HeroSlider } from "@/components/home/HeroSlider";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { PriceComparePreview } from "@/components/home/PriceComparePreview";
import { BrandShowcase } from "@/components/home/BrandShowcase";
import { TrustSection } from "@/components/home/TrustSection";
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection";
import { ProductCard } from "@/components/common/ProductCard";
import { AffiliateDisclosureBanner } from "@/components/common/AffiliateDisclosureBanner";
import { Sparkles, TrendingUp, Flame, ArrowRight, ShieldCheck, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch products for all home sections with graceful fallback
  let trendingProductsRaw: any[] = [];
  let bestDealsRaw: any[] = [];
  let topPicksRaw: any[] = [];
  let featuredProductsRaw: any[] = [];
  let latestPosts: any[] = [];

  try {
    [
      trendingProductsRaw,
      bestDealsRaw,
      topPicksRaw,
      featuredProductsRaw,
      latestPosts,
    ] = await Promise.all([
      prisma.product.findMany({
        where: { isTrending: true },
        take: 4,
        include: {
          brand: true,
          merchantOffers: {
            where: { isActive: true },
            orderBy: { indicativePrice: "asc" },
            include: { merchant: true },
          },
        },
      }),
      prisma.product.findMany({
        where: { isBestDeal: true },
        take: 4,
        orderBy: { discountPercent: "desc" },
        include: {
          brand: true,
          merchantOffers: {
            where: { isActive: true },
            orderBy: { indicativePrice: "asc" },
            include: { merchant: true },
          },
        },
      }),
      prisma.product.findMany({
        where: { isTopPick: true },
        take: 4,
        include: {
          brand: true,
          merchantOffers: {
            where: { isActive: true },
            orderBy: { indicativePrice: "asc" },
            include: { merchant: true },
          },
        },
      }),
      prisma.product.findMany({
        where: { isFeatured: true },
        take: 4,
        include: {
          brand: true,
          merchantOffers: {
            where: { isActive: true },
            orderBy: { indicativePrice: "asc" },
            include: { merchant: true },
          },
        },
      }),
      prisma.blogPost.findMany({
        where: { published: true },
        take: 3,
        orderBy: { createdAt: "desc" },
      }),
    ]);
  } catch (err) {
    console.error("HomePage data fetch error:", err);
  }

  const formatProduct = (p: any) => {
    let images = [];
    try {
      images = JSON.parse(p.images);
    } catch {
      images = [p.images];
    }
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      brandName: p.brand?.name || null,
      images,
      indicativePrice: p.indicativePrice,
      originalPrice: p.originalPrice,
      discountPercent: p.discountPercent,
      rating: p.rating,
      reviewCount: p.reviewCount,
      offers: p.merchantOffers.map((o: any) => ({
        merchantName: o.merchant.name,
        indicativePrice: o.indicativePrice,
        affiliateUrl: `/api/affiliate/redirect?offerId=${o.id}`,
      })),
    };
  };

  const trendingProducts = trendingProductsRaw.map(formatProduct);
  const bestDeals = bestDealsRaw.map(formatProduct);
  const topPicks = topPicksRaw.map(formatProduct);
  const featuredProducts = featuredProductsRaw.map(formatProduct);

  return (
    <div className="pb-16">
      {/* 1. Hero Promotional Slider */}
      <HeroSlider />

      {/* 2. Shop by Category (8 Master Categories) */}
      <CategoryGrid />

      {/* 3. Best Deals & Flash Savings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 my-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Deep Discounts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary font-display">
              Best Deals & Price Drops
            </h2>
          </div>

          <Link
            href="/deals"
            className="text-xs sm:text-sm font-semibold text-secondary hover:text-secondary-dark flex items-center gap-1 group"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestDeals.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 4. Interactive Price Comparison Engine Preview */}
      <PriceComparePreview />

      {/* 5. Trending Products in India */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 my-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-secondary text-xs font-bold rounded-full mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Consumer Demand</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary font-display">
              Trending Products This Week
            </h2>
          </div>

          <Link
            href="/shop?sort=popular"
            className="text-xs sm:text-sm font-semibold text-secondary hover:text-secondary-dark flex items-center gap-1 group"
          >
            <span>Browse Trending</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 6. Top Affiliate Picks (Curated Editorials) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 my-14">
        <div className="bg-gradient-to-r from-primary to-primary-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase font-extrabold text-accent tracking-widest">
                AVNIVO Editorial Selection
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display mt-1">
                Top Curated Affiliate Picks
              </h2>
              <p className="text-xs text-gray-300 mt-1">
                Hand-tested and recommended for durability, value, and customer satisfaction.
              </p>
            </div>

            <Link
              href="/shop?topPick=true"
              className="text-xs sm:text-sm font-bold text-white bg-secondary hover:bg-secondary-dark px-4 py-2.5 rounded-xl transition-all shadow-md shrink-0"
            >
              Explore All Top Picks
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-charcoal">
            {topPicks.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 my-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary font-display">
              Featured Products
            </h2>
          </div>

          <Link
            href="/shop"
            className="text-xs sm:text-sm font-semibold text-secondary hover:text-secondary-dark flex items-center gap-1 group"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 8. Authorized Brand Showcase */}
      <BrandShowcase />

      {/* 9. Editorial Buying Guides & Articles */}
      <BlogPreviewSection posts={latestPosts} />

      {/* 10. Trust & Transparency Pillars */}
      <TrustSection />

      {/* 11. Affiliate Disclosure Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AffiliateDisclosureBanner />
      </div>
    </div>
  );
}
