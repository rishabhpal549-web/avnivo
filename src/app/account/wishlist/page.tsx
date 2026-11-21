"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import { Heart, Trash2, ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";
import { useWishlist } from "@/components/common/WishlistContext";
import { useAuth } from "@/components/common/AuthContext";

export default function WishlistPage() {
  const { user, openAuthModal } = useAuth();
  const { wishlistIds, toggleWishlist } = useWishlist();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/wishlist")
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          setItems(data.items);
        } else {
          // If guest, fetch by product IDs
          fetch(`/api/products?limit=50`)
            .then((r) => r.json())
            .then((pData) => {
              const matched = pData.products
                ?.filter((p: any) => wishlistIds.includes(p.id))
                .map((p: any) => ({
                  id: p.id,
                  productId: p.id,
                  name: p.name,
                  slug: p.slug,
                  brandName: p.brandName,
                  image: p.images[0],
                  indicativePrice: p.indicativePrice,
                  originalPrice: p.originalPrice,
                  discountPercent: p.discountPercent,
                  lowestMerchant: p.offers?.[0]?.merchantName || "Online Store",
                  lowestOfferId: p.offers?.[0]?.id || null,
                }));
              setItems(matched || []);
            });
        }
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [wishlistIds.join(",")]);

  const handleRemove = (productId: string) => {
    toggleWishlist(productId);
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-primary font-display">
            My Saved Wishlist ({items.length})
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Products you are tracking. Check verified merchant offers before buying.
          </p>
        </div>

        {!user && (
          <button
            onClick={() => openAuthModal("login")}
            className="text-xs font-semibold text-secondary hover:underline"
          >
            Sign in to sync across devices
          </button>
        )}
      </div>

      {loading ? (
        <div className="p-12 text-center text-sm text-gray-400">Loading wishlist...</div>
      ) : items.length === 0 ? (
        <div className="bg-surface rounded-3xl p-12 text-center border border-gray-200 max-w-md mx-auto">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-primary mb-1">Your wishlist is empty</h3>
          <p className="text-xs text-gray-500 mb-6">
            Click the heart icon on any product card to save it for quick price comparison.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 bg-secondary hover:bg-secondary-dark text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div>
                <div className="w-full h-44 bg-surface rounded-xl p-3 flex items-center justify-center mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <span className="text-[10px] font-bold text-secondary uppercase">
                  {item.brandName || "AVNIVO Verified"}
                </span>

                <Link href={`/product/${item.slug}`}>
                  <h3 className="text-sm font-bold text-primary hover:text-secondary line-clamp-2 mt-0.5">
                    {item.name}
                  </h3>
                </Link>

                <p className="text-[11px] text-gray-500 mt-1">
                  Lowest on: <strong className="text-primary">{item.lowestMerchant}</strong>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                <div>
                  <div className="text-lg font-black text-primary font-display">
                    {formatINR(item.indicativePrice)}
                  </div>
                  {item.originalPrice > item.indicativePrice && (
                    <div className="text-[11px] text-gray-400 line-through">
                      {formatINR(item.originalPrice)}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <Link
                    href={`/product/${item.slug}`}
                    className="inline-flex items-center gap-1 bg-secondary hover:bg-secondary-dark text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all shadow-sm"
                  >
                    <span>View Offers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
