"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Scale,
  Share2,
  Check,
  Star,
  ShieldCheck,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info,
  ShoppingBag,
  Truck,
  RotateCcw,
  Gift,
} from "lucide-react";
import { formatINR, formatTimeAgo } from "@/lib/utils";
import { shareWithFriends } from "@/lib/shareHelper";
import { MerchantComparisonTable } from "@/components/common/MerchantComparisonTable";
import { AffiliateDisclosureBanner } from "@/components/common/AffiliateDisclosureBanner";
import { ProductCard } from "@/components/common/ProductCard";
import { useWishlist } from "@/components/common/WishlistContext";
import { useCompare } from "@/components/common/CompareContext";

interface ProductDetailClientProps {
  product: any;
  relatedProducts?: any[];
}

export function ProductDetailClient({ product, relatedProducts = [] }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || "");
  const [copied, setCopied] = useState(false);

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, addToCompare } = useCompare();

  const inWish = isInWishlist(product.id);
  const inComp = isInCompare(product.id);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      let shareUrl = window.location.href;
      try {
        const partner = localStorage.getItem("avnivo_partner_account");
        if (partner) {
          const parsed = JSON.parse(partner);
          if (parsed.affiliateCode) {
            const sep = shareUrl.includes("?") ? "&" : "?";
            shareUrl = `${shareUrl}${sep}ref=${parsed.affiliateCode}`;
          }
        }
      } catch (e) {}
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lowestOffer = product.offers?.[0] || null;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4 sm:mb-6 flex-wrap">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-primary">
          Shop
        </Link>
        {product.parentCategoryName && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/category/${product.parentCategorySlug}`} className="hover:text-primary">
              {product.parentCategoryName}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/category/${product.categorySlug}`} className="hover:text-primary">
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-charcoal font-semibold truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* 2. Top Section: Gallery + Key Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-gray-100 shadow-sm mb-10">
        {/* Left: Gallery */}
        <div className="lg:col-span-6 flex flex-col items-center">
          {/* Main Visual Display */}
          <div className="w-full h-72 sm:h-96 bg-surface rounded-2xl p-4 sm:p-6 flex items-center justify-center border border-gray-200/60 relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain transition-all duration-300"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-sm">
                SAVE {product.discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-2.5 mt-3 overflow-x-auto py-1">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-xl bg-surface p-1 border transition-all shrink-0 ${
                    selectedImage === img
                      ? "border-secondary ring-2 ring-secondary/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Key Details, Price, and Fast Action */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            {/* Category Tag & Rating */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                {product.categoryName || "Affiliate Deal"}
              </span>

              <div className="flex items-center gap-1.5 text-xs">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-lg border border-amber-200 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating > 0 ? product.rating.toFixed(1) : "4.4"}</span>
                </div>
                {product.reviewCount > 0 && (
                  <span className="text-gray-400 text-[11px]">
                    ({product.reviewCount.toLocaleString()} ratings)
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-primary font-display leading-snug mb-3">
              {product.name}
            </h1>

            {product.shortDescription && (
              <p className="text-xs sm:text-sm text-gray-500 mb-4 leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* Price Box */}
            <div className="bg-surface rounded-2xl p-4 border border-gray-200/80 mb-5">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-primary font-display">
                  {formatINR(product.indicativePrice)}
                </span>
                {product.originalPrice > product.indicativePrice && (
                  <span className="text-sm sm:text-base text-gray-400 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="text-xs sm:text-sm font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-md">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>Indicative merchant offer, verified recently</span>
              </div>
            </div>

            {/* Key Feature Bullets */}
            {product.keyFeatures && product.keyFeatures.length > 0 && (
              <div className="mb-5 space-y-2">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
                  Product Highlights
                </h4>
                <ul className="space-y-1 text-xs text-gray-600">
                  {product.keyFeatures.map((feat: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Row: Wishlist, Compare, Direct Buy Now */}
          <div className="pt-5 border-t border-gray-100 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              {lowestOffer && (
                <a
                  href={lowestOffer.affiliateUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all group text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy Now on {lowestOffer.merchantName} ({formatINR(lowestOffer.indicativePrice)})</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border transition-colors flex items-center justify-center ${
                  inWish
                    ? "bg-red-50 text-red-600 border-red-200"
                    : "border-gray-200 text-gray-600 hover:text-red-500 hover:bg-surface"
                }`}
                title={inWish ? "In Wishlist" : "Save to Wishlist"}
              >
                <Heart className={`w-5 h-5 ${inWish ? "fill-red-500" : ""}`} />
              </button>

              <button
                onClick={() =>
                  addToCompare({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    image: product.images[0] || "",
                    indicativePrice: product.indicativePrice,
                    categorySlug: product.categorySlug,
                  })
                }
                className={`p-3.5 rounded-xl border transition-colors flex items-center justify-center ${
                  inComp
                    ? "bg-blue-50 text-secondary border-blue-200"
                    : "border-gray-200 text-gray-600 hover:text-secondary hover:bg-surface"
                }`}
                title="Compare with another product"
              >
                <Scale className="w-5 h-5" />
              </button>

              <button
                onClick={() =>
                  shareWithFriends({
                    title: product.name,
                    indicativePrice: product.indicativePrice,
                    discountPercent: product.discountPercent,
                    slug: product.slug,
                  })
                }
                className="p-3.5 rounded-xl border border-gray-200 text-gray-600 hover:text-secondary hover:bg-surface hover:border-secondary/40 transition-colors flex items-center justify-center group"
                title="दोस्तों को शेयर करें (Share with Friends)"
              >
                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Share With Friends Full Action Button (Clean, no external logo) */}
            <button
              onClick={() =>
                shareWithFriends({
                  title: product.name,
                  indicativePrice: product.indicativePrice,
                  discountPercent: product.discountPercent,
                  slug: product.slug,
                })
              }
              className="w-full py-2.5 px-4 bg-surface hover:bg-blue-50/60 text-primary font-bold text-xs sm:text-sm rounded-xl border border-gray-200 hover:border-secondary/40 shadow-sm transition-all flex items-center justify-center gap-2 group"
            >
              <Share2 className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
              <span>दोस्तों को शेयर करें (Share with Friends)</span>
            </button>

            {/* Share & Earn Card */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200/80 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-secondary flex items-center justify-center shrink-0">
                  <Gift className="w-4 h-4 text-orange-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 truncate">Earn up to 10% Commission</p>
                  <p className="text-[11px] text-gray-500 truncate">Share this product &amp; get direct UPI payout</p>
                </div>
              </div>
              <Link
                href="/affiliate-program"
                className="px-3 py-1.5 bg-secondary hover:bg-secondary-dark text-white font-bold text-[11px] rounded-xl shrink-0 shadow-sm transition-colors flex items-center gap-1"
              >
                <span>Partner Hub</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Clear Affiliate Redirection Notice */}
            <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-3 flex items-start gap-2.5 text-[11px] text-blue-900 leading-relaxed">
              <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span>
                <strong>Affiliate Shopping Notice:</strong> Clicking <em>Buy Now</em> opens the merchant&apos;s genuine store page ({lowestOffer?.merchantName || "Amazon / Flipkart / Meesho"}). All transactions, payments, deliveries, and returns are handled directly by the merchant.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Multi-Merchant Comparison Table */}
      {product.offers && product.offers.length > 0 && (
        <div className="mb-12">
          <MerchantComparisonTable offers={product.offers} productName={product.name} />
        </div>
      )}

      {/* 4. Full Specifications & Description */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-primary font-display mb-3">
              Product Overview & Practical Uses
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-primary font-display mb-3">
                Technical Specifications
              </h4>
              <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100">
                {Object.entries(product.specifications).map(([key, val]: any, i) => (
                  <div key={i} className="grid grid-cols-3 p-3 text-xs">
                    <span className="font-semibold text-gray-500">{key}</span>
                    <span className="col-span-2 text-charcoal font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Info Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-primary font-display">
              AVNIVO Shopping Guarantee
            </h4>
            <div className="space-y-3 text-xs text-gray-600">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>
                  <strong>100% Genuine Retailers:</strong> All links lead to authorized stores (Amazon, Flipkart, Meesho) with standard merchant customer service.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <RotateCcw className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Merchant Return Policies:</strong> Purchases are covered by the merchant&apos;s standard return and replacement policies.
                </span>
              </div>
            </div>
          </div>

          <AffiliateDisclosureBanner compact />
        </div>
      </div>

      {/* 5. Similar & Related Products (Compact Grid) */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="my-10">
          <h2 className="text-xl sm:text-2xl font-bold text-primary font-display mb-5">
            Similar Affordable Products in {product.categoryName}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3.5">
            {relatedProducts.map((rp: any) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
