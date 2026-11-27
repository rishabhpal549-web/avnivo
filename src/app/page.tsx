import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { HeroSlider } from "@/components/home/HeroSlider";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { TrustSection } from "@/components/home/TrustSection";
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection";
import { ProductCard } from "@/components/common/ProductCard";
import { AffiliateDisclosureBanner } from "@/components/common/AffiliateDisclosureBanner";
import {
  Sparkles,
  TrendingUp,
  Flame,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  UtensilsCrossed,
  Smartphone,
  Home as HomeIcon,
  ShoppingBag,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
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
        where: {
          isTrending: true,
          indicativePrice: { lte: 1500 },
          availability: { not: "UNPUBLISHED" },
        },
        take: 6,
        orderBy: { viewsCount: "desc" },
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
        where: {
          isBestDeal: true,
          indicativePrice: { lte: 1500 },
          availability: { not: "UNPUBLISHED" },
        },
        take: 6,
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
        where: {
          isTopPick: true,
          indicativePrice: { lte: 1500 },
          availability: { not: "UNPUBLISHED" },
        },
        take: 6,
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
        where: {
          isFeatured: true,
          indicativePrice: { lte: 1500 },
          availability: { not: "UNPUBLISHED" },
        },
        take: 6,
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
  } catch (err: any) {
    console.warn("HomePage Prisma fetch error, using Supabase REST fallback:", err.message);
  }

  // Supabase REST fallback
  if (trendingProductsRaw.length === 0 && bestDealsRaw.length === 0) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ibrzfiwskfhlkfdjbyfv.supabase.co";
      const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicnpmaXdza2ZobGtmZGpieWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUyNjY1NjcsImV4cCI6MjExMDg0MjU2N30.XQALfrWAZbazKNZJpbxXAYr9DBr7IUURKE45jjsfF3o";

      const res = await fetch(
        `${supabaseUrl}/rest/v1/Product?select=id,name,slug,indicativePrice,originalPrice,discountPercent,rating,reviewCount,images,isFeatured,isTrending,isBestDeal,isTopPick,availability,brand:Brand(name),merchantOffers:MerchantOffer(id,indicativePrice,originalPrice,discountPercent,merchant:Merchant(name))&availability=neq.UNPUBLISHED&indicativePrice=lte.1500&order=indicativePrice.asc`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          cache: "no-store",
        }
      );

      if (res.ok) {
        const all = await res.json();
        bestDealsRaw = all.filter((p: any) => p.isBestDeal).slice(0, 6);
        trendingProductsRaw = all.filter((p: any) => p.isTrending).slice(0, 6);
        topPicksRaw = all.filter((p: any) => p.isTopPick).slice(0, 6);
        featuredProductsRaw = all.filter((p: any) => p.isFeatured).slice(0, 6);

        // If categories are empty, fallback to slicing from all
        if (bestDealsRaw.length === 0) bestDealsRaw = all.slice(0, 6);
        if (trendingProductsRaw.length === 0) trendingProductsRaw = all.slice(6, 12);
        if (topPicksRaw.length === 0) topPicksRaw = all.slice(2, 8);
        if (featuredProductsRaw.length === 0) featuredProductsRaw = all.slice(4, 10);
      }
    } catch (e) {
      console.error("HomePage REST fallback error:", e);
    }
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
      rating: p.rating || 4.4,
      reviewCount: p.reviewCount || 120,
      offers: (p.merchantOffers || []).map((o: any) => ({
        merchantName: o.merchant?.name || "Amazon",
        indicativePrice: o.indicativePrice,
        affiliateUrl: o.affiliateUrl?.startsWith("http")
          ? `/api/affiliate/redirect?offerId=${o.id}&to=${encodeURIComponent(o.affiliateUrl)}`
          : `/api/affiliate/redirect?offerId=${o.id}`,
      })),
    };
  };

  const trendingProducts = trendingProductsRaw.map(formatProduct);
  const bestDeals = bestDealsRaw.map(formatProduct);
  const topPicks = topPicksRaw.map(formatProduct);
  const featuredProducts = featuredProductsRaw.map(formatProduct);

  return (
    <div className="pb-16 bg-[#f7f8fa]">
      {/* 1. Hero Promotional Slider */}
      <HeroSlider />

      {/* 2. Amazon-Style 4-Card Hero Feature Grid */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 -mt-2 sm:-mt-4 relative z-20 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Kitchen Accessories */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm sm:text-base text-primary font-display flex items-center gap-1.5">
                  <UtensilsCrossed className="w-4 h-4 text-secondary" />
                  <span>Kitchen Hacks</span>
                </h3>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                  Under ₹299
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-surface rounded-xl p-2 text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=300&auto=format&fit=crop&q=80"
                    alt="Vegetable Slicer"
                    className="w-full h-16 object-contain mx-auto mb-1 rounded"
                  />
                  <p className="text-[10px] font-bold text-charcoal truncate">Dual Slicers</p>
                  <p className="text-[10px] font-extrabold text-secondary">₹199</p>
                </div>
                <div className="bg-surface rounded-xl p-2 text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=300&auto=format&fit=crop&q=80"
                    alt="Silicone Lids"
                    className="w-full h-16 object-contain mx-auto mb-1 rounded"
                  />
                  <p className="text-[10px] font-bold text-charcoal truncate">Silicone Lids</p>
                  <p className="text-[10px] font-extrabold text-secondary">₹249</p>
                </div>
              </div>
            </div>
            <Link
              href="/shop?category=kitchen-accessories"
              className="text-xs font-bold text-secondary hover:text-secondary-dark flex items-center gap-1 pt-2 border-t border-gray-100"
            >
              <span>See all kitchen accessories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Mobile Accessories */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm sm:text-base text-primary font-display flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-secondary" />
                  <span>Desk & Mobile</span>
                </h3>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                  Under ₹249
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-surface rounded-xl p-2 text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1586105251261-72a756497a11?w=300&auto=format&fit=crop&q=80"
                    alt="Phone Stand"
                    className="w-full h-16 object-contain mx-auto mb-1 rounded"
                  />
                  <p className="text-[10px] font-bold text-charcoal truncate">Aluminum Stand</p>
                  <p className="text-[10px] font-extrabold text-secondary">₹199</p>
                </div>
                <div className="bg-surface rounded-xl p-2 text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&auto=format&fit=crop&q=80"
                    alt="Fast Cable"
                    className="w-full h-16 object-contain mx-auto mb-1 rounded"
                  />
                  <p className="text-[10px] font-bold text-charcoal truncate">65W Cable</p>
                  <p className="text-[10px] font-extrabold text-secondary">₹249</p>
                </div>
              </div>
            </div>
            <Link
              href="/shop?category=mobile-accessories"
              className="text-xs font-bold text-secondary hover:text-secondary-dark flex items-center gap-1 pt-2 border-t border-gray-100"
            >
              <span>Explore mobile gear</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Home & Living Organizers */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm sm:text-base text-primary font-display flex items-center gap-1.5">
                  <HomeIcon className="w-4 h-4 text-secondary" />
                  <span>Home Living</span>
                </h3>
                <span className="text-[10px] bg-green-100 text-green-800 font-bold px-1.5 py-0.5 rounded">
                  Under ₹499
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-surface rounded-xl p-2 text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&auto=format&fit=crop&q=80"
                    alt="Sensor Light"
                    className="w-full h-16 object-contain mx-auto mb-1 rounded"
                  />
                  <p className="text-[10px] font-bold text-charcoal truncate">Sensor Lights</p>
                  <p className="text-[10px] font-extrabold text-secondary">₹299</p>
                </div>
                <div className="bg-surface rounded-xl p-2 text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop&q=80"
                    alt="Cable Clips"
                    className="w-full h-16 object-contain mx-auto mb-1 rounded"
                  />
                  <p className="text-[10px] font-bold text-charcoal truncate">Cable Clips</p>
                  <p className="text-[10px] font-extrabold text-secondary">₹149</p>
                </div>
              </div>
            </div>
            <Link
              href="/shop?category=home-living"
              className="text-xs font-bold text-secondary hover:text-secondary-dark flex items-center gap-1 pt-2 border-t border-gray-100"
            >
              <span>Explore home living</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Daily-Use Hacks & Multi-Tools */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm sm:text-base text-primary font-display flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-secondary" />
                  <span>Daily-Use Hacks</span>
                </h3>
                <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded">
                  Up to 60% Off
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-surface rounded-xl p-2 text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=300&auto=format&fit=crop&q=80"
                    alt="Resistance Bands"
                    className="w-full h-16 object-contain mx-auto mb-1 rounded"
                  />
                  <p className="text-[10px] font-bold text-charcoal truncate">Loop Bands</p>
                  <p className="text-[10px] font-extrabold text-secondary">₹299</p>
                </div>
                <div className="bg-surface rounded-xl p-2 text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&auto=format&fit=crop&q=80"
                    alt="Card Wallet"
                    className="w-full h-16 object-contain mx-auto mb-1 rounded"
                  />
                  <p className="text-[10px] font-bold text-charcoal truncate">RFID Wallet</p>
                  <p className="text-[10px] font-extrabold text-secondary">₹299</p>
                </div>
              </div>
            </div>
            <Link
              href="/deals"
              className="text-xs font-bold text-secondary hover:text-secondary-dark flex items-center gap-1 pt-2 border-t border-gray-100"
            >
              <span>See verified deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category (All 11 Master Categories) */}
      <CategoryGrid />

      {/* 4. Best Deals & Flash Savings Under ₹499 (Compact 6-Column Grid) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 my-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-100 text-red-700 text-[11px] font-bold rounded-full mb-1">
              <Flame className="w-3 h-3" />
              <span>Deep Discounts Under ₹499</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary font-display">
              Best Deals & Price Drops
            </h2>
          </div>

          <Link
            href="/deals"
            className="text-xs sm:text-sm font-semibold text-secondary hover:text-secondary-dark flex items-center gap-1 group"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6-Column Compact Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3.5">
          {bestDeals.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 5. Trending Products in India (Compact 6-Column Grid) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 my-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-100 text-secondary text-[11px] font-bold rounded-full mb-1">
              <TrendingUp className="w-3 h-3" />
              <span>Consumer Demand</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary font-display">
              Trending Small Essentials This Week
            </h2>
          </div>

          <Link
            href="/shop?sort=popular"
            className="text-xs sm:text-sm font-semibold text-secondary hover:text-secondary-dark flex items-center gap-1 group"
          >
            <span>Browse All Trending</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3.5">
          {trendingProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 6. Top Curated Affiliate Picks */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 my-10">
        <div className="bg-gradient-to-r from-primary to-primary-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-[10px] uppercase font-extrabold text-accent tracking-widest">
                AVNIVO Editorial Selection
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display mt-0.5">
                Top Curated Affiliate Picks
              </h2>
              <p className="text-xs text-gray-300">
                Small, durable, high-utility products verified across Amazon, Flipkart & Meesho.
              </p>
            </div>

            <Link
              href="/shop?topPick=true"
              className="text-xs font-bold text-white bg-secondary hover:bg-secondary-dark px-4 py-2 rounded-xl transition-all shadow-md shrink-0"
            >
              Explore All Picks
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3.5 text-charcoal">
            {topPicks.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Featured Useful Products */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 my-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[11px] font-bold rounded-full mb-1">
              <Sparkles className="w-3 h-3" />
              <span>Handpicked</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary font-display">
              Featured Budget Accessories
            </h2>
          </div>

          <Link
            href="/shop"
            className="text-xs sm:text-sm font-semibold text-secondary hover:text-secondary-dark flex items-center gap-1 group"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3.5">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 9. Editorial Buying Guides & Articles */}
      <BlogPreviewSection posts={latestPosts} />

      {/* 10. Trust & Transparency Pillars */}
      <TrustSection />

      {/* 11. Affiliate Disclosure Callout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <AffiliateDisclosureBanner />
      </div>
    </div>
  );
}
