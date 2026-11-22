"use client";

import React from "react";
import Link from "next/link";
import { Heart, Scale, ExternalLink, Star, ArrowRight, ShoppingBag, Share2 } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { shareWithFriends } from "@/lib/shareHelper";
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

  const mainImage = product.images?.[0] || "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80";
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
      <div className="bg-white rounded-2xl border border-gray-100 hover:border-secondary/40 hover:shadow-md transition-all p-3 sm:p-4 flex flex-col sm:flex-row gap-4 group relative">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-36 h-36 bg-surface rounded-xl p-2 shrink-0 flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {product.discountPercent > 0 && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                {product.brandName || "Affiliate Deal"}
              </span>
              <div className="flex items-center gap-1 text-[11px]">
                <div className="flex items-center gap-0.5 bg-amber-50 text-amber-700 px-1 py-0.2 rounded font-bold border border-amber-200">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{product.rating > 0 ? product.rating.toFixed(1) : "4.4"}</span>
                </div>
                {product.reviewCount > 0 && (
                  <span className="text-[10px] text-gray-400">
                    ({product.reviewCount.toLocaleString()})
                  </span>
                )}
              </div>
            </div>

            <Link href={`/product/${product.slug}`} className="block">
              <h3 className="text-sm font-bold text-primary hover:text-secondary transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>

            {lowestOffer && (
              <div className="mt-1 text-[11px] text-gray-500 flex items-center gap-1.5">
                <span>Verified lowest on:</span>
                <span className="font-bold text-primary bg-surface px-1.5 py-0.5 rounded border border-gray-200">
                  {lowestOffer.merchantName || "Amazon"}
                </span>
              </div>
            )}
          </div>

          <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-black text-primary font-display">
                  {formatINR(product.indicativePrice)}
                </span>
                {product.originalPrice > product.indicativePrice && (
                  <span className="text-[11px] text-gray-400 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-[9px] text-gray-400 block">Indicative partner price</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleWishlistClick}
                className={`p-2 rounded-lg border transition-colors ${
                  inWish
                    ? "bg-red-50 text-red-600 border-red-200"
                    : "border-gray-200 text-gray-400 hover:text-red-500 hover:bg-surface"
                }`}
                title={inWish ? "Remove from wishlist" : "Save to wishlist"}
              >
                <Heart className={`w-3.5 h-3.5 ${inWish ? "fill-red-500" : ""}`} />
              </button>

              <Link
                href={`/product/${product.slug}`}
                className="inline-flex items-center gap-1 bg-secondary hover:bg-secondary-dark text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-sm"
              >
                <span>View Deal</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Compact Amazon-Style Grid Card (Tight, organized, 5-6 products per row friendly)
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 hover:border-secondary/40 hover:shadow-lg transition-all p-2.5 sm:p-3 flex flex-col justify-between group relative">
      {/* Top badges & Wishlist/Compare Quick Buttons */}
      <div className="relative">
        <div className="absolute top-1.5 left-1.5 z-10 flex flex-col gap-1">
          {product.discountPercent > 0 && (
            <span className="bg-red-600 text-white text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        <div className="absolute top-1.5 right-1.5 z-10 flex flex-col gap-1">
          <button
            onClick={handleWishlistClick}
            className={`p-1.5 rounded-lg backdrop-blur-md shadow-sm border transition-colors ${
              inWish
                ? "bg-white text-red-600 border-red-200"
                : "bg-white/90 border-gray-200/80 text-gray-400 hover:text-red-500 hover:bg-white"
            }`}
            title={inWish ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-3.5 h-3.5 ${inWish ? "fill-red-500" : ""}`} />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              shareWithFriends({
                title: product.name,
                indicativePrice: product.indicativePrice,
                discountPercent: product.discountPercent,
                slug: product.slug,
              });
            }}
            className="p-1.5 rounded-lg bg-white/90 backdrop-blur-md shadow-sm border border-gray-200/80 text-gray-400 hover:text-secondary hover:bg-white transition-colors"
            title="Share with Friends"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Image */}
        <Link href={`/product/${product.slug}`} className="block">
          <div className="w-full h-32 sm:h-36 bg-surface rounded-lg p-2.5 flex items-center justify-center overflow-hidden mb-2">
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
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Lowest Merchant Pill */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-0.5 bg-amber-50 text-amber-700 px-1 py-0.2 rounded font-bold text-[10px] border border-amber-200">
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              <span>{product.rating > 0 ? product.rating.toFixed(1) : "4.4"}</span>
            </div>

            {lowestOffer ? (
              <span className="text-[10px] text-gray-500 truncate font-semibold">
                on <strong className="text-primary">{lowestOffer.merchantName}</strong>
              </span>
            ) : (
              <span className="text-[9px] text-green-700 font-bold uppercase tracking-wide">
                Verified
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-xs sm:text-[13px] font-semibold text-primary hover:text-secondary transition-colors line-clamp-2 leading-snug min-h-[32px] sm:min-h-[36px] mb-1.5">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Buy Now / View Deal */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-1.5">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm sm:text-base font-black text-primary font-display">
                {formatINR(product.indicativePrice)}
              </span>
              {product.originalPrice > product.indicativePrice && (
                <span className="text-[10px] text-gray-400 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[8px] text-gray-400 block -mt-0.5">Indicative price</span>
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="inline-flex items-center gap-0.5 bg-secondary hover:bg-secondary-dark text-white text-[11px] font-bold px-2 sm:px-2.5 py-1 rounded-lg transition-all shadow-sm shrink-0"
          >
            <span>Buy Now</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
