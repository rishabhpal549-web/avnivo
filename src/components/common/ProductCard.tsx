"use client";

import React from "react";
import Link from "next/link";
import { Heart, Scale, ExternalLink, Star, ShieldCheck, ArrowRight } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { useWishlist } from "./WishlistContext";
import { useCompare } from "./CompareContext";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    brandName?: string | null;
    categorySlug?: string;
    images: string[];
    indicativePrice: number;
    originalPrice: number;
    discountPercent: number;
    rating: number;
    reviewCount: number;
    isVerifiedRating?: boolean;
    availability?: string;
    offers?: any[];
  };
  layout?: "grid" | "list";
}

export function ProductCard({ product, layout = "grid" }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, addToCompare } = useCompare();

  const inWish = isInWishlist(product.id);
  const inComp = isInCompare(product.id);

  const mainImage = product.images?.[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e";
  const lowestOffer = product.offers?.[0] || null;

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCompare({
      id: product.id,
      name: product.name,
      slug: product.slug,
      image: mainImage,
      indicativePrice: product.indicativePrice,
      categorySlug: product.categorySlug || "all",
    });
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  if (layout === "list") {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all p-4 flex flex-col sm:flex-row gap-5 group relative">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-48 h-48 bg-surface rounded-xl p-3 shrink-0 flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {product.discountPercent > 0 && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                {product.brandName || "AVNIVO Verified"}
              </span>
              <div className="flex items-center gap-1 text-xs">
                <div className="flex items-center gap-0.5 bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-bold border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating > 0 ? product.rating.toFixed(1) : "New"}</span>
                </div>
                {product.reviewCount > 0 && (
                  <span className="text-[11px] text-gray-400">
                    ({product.reviewCount.toLocaleString()})
                  </span>
                )}
              </div>
            </div>

            <Link href={`/product/${product.slug}`} className="block">
              <h3 className="text-base font-bold text-primary hover:text-secondary transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>

            {lowestOffer && (
              <div className="mt-2 text-xs text-gray-600 flex items-center gap-1.5">
                <span className="text-gray-400">Lowest verified price on:</span>
                <span className="font-semibold text-primary bg-surface px-2 py-0.5 rounded border border-gray-200">
                  {lowestOffer.merchantName || "Partner Retailer"}
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-primary font-display">
                  {formatINR(product.indicativePrice)}
                </span>
                {product.originalPrice > product.indicativePrice && (
                  <span className="text-xs text-gray-400 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-gray-400 block">Indicative online price</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleWishlistClick}
                className={`p-2.5 rounded-xl border transition-colors ${
                  inWish
                    ? "bg-red-50 text-red-600 border-red-200"
                    : "border-gray-200 text-gray-400 hover:text-red-500 hover:bg-surface"
                }`}
                title={inWish ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-4 h-4 ${inWish ? "fill-red-500" : ""}`} />
              </button>

              <button
                onClick={handleCompareClick}
                className={`p-2.5 rounded-xl border transition-colors ${
                  inComp
                    ? "bg-blue-50 text-secondary border-blue-200"
                    : "border-gray-200 text-gray-400 hover:text-secondary hover:bg-surface"
                }`}
                title="Toggle compare"
              >
                <Scale className="w-4 h-4" />
              </button>

              <Link
                href={`/product/${product.slug}`}
                className="inline-flex items-center gap-1.5 bg-secondary hover:bg-secondary-dark text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm"
              >
                <span>Compare Offers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Layout
  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all p-3.5 flex flex-col justify-between group relative">
      {/* Top badges & Wishlist/Compare Quick Buttons */}
      <div className="relative">
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.discountPercent > 0 && (
            <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
          <button
            onClick={handleWishlistClick}
            className={`p-2 rounded-xl backdrop-blur-md shadow-sm border transition-colors ${
              inWish
                ? "bg-white text-red-600 border-red-200"
                : "bg-white/80 border-gray-200/60 text-gray-400 hover:text-red-500 hover:bg-white"
            }`}
            title={inWish ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${inWish ? "fill-red-500" : ""}`} />
          </button>

          <button
            onClick={handleCompareClick}
            className={`p-2 rounded-xl backdrop-blur-md shadow-sm border transition-colors ${
              inComp
                ? "bg-white text-secondary border-blue-200"
                : "bg-white/80 border-gray-200/60 text-gray-400 hover:text-secondary hover:bg-white"
            }`}
            title="Add to compare"
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        {/* Product Image */}
        <Link href={`/product/${product.slug}`} className="block">
          <div className="w-full h-48 bg-surface rounded-xl p-4 flex items-center justify-center overflow-hidden mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mainImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        </Link>
      </div>

      {/* Product Details */}
      <div>
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
            {product.brandName || "AVNIVO Verified"}
          </span>

          <div className="flex items-center gap-1 text-[11px]">
            <div className="flex items-center gap-0.5 bg-amber-50 text-amber-700 px-1 py-0.2 rounded font-bold border border-amber-200">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating > 0 ? product.rating.toFixed(1) : "4.5"}</span>
            </div>
            {product.reviewCount > 0 && (
              <span className="text-[10px] text-gray-400">
                ({product.reviewCount > 999 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount})
              </span>
            )}
          </div>
        </div>

        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="text-xs sm:text-sm font-semibold text-primary hover:text-secondary transition-colors line-clamp-2 h-9 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Lowest merchant pill */}
        {lowestOffer && (
          <div className="text-[10px] text-gray-500 mb-2 truncate">
            <span>Lowest on </span>
            <strong className="text-primary">{lowestOffer.merchantName}</strong>
          </div>
        )}

        {/* Price & CTA */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-primary font-display">
                {formatINR(product.indicativePrice)}
              </span>
              {product.originalPrice > product.indicativePrice && (
                <span className="text-[11px] text-gray-400 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[9px] text-gray-400 block">Indicative price</span>
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="inline-flex items-center gap-1 bg-secondary hover:bg-secondary-dark text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all shadow-sm shrink-0"
          >
            <span>Compare</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
