"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatINR } from "@/lib/utils";
import {
  Scale,
  X,
  Plus,
  Star,
  ExternalLink,
  ShieldCheck,
  Search,
  CheckCircle,
} from "lucide-react";
import { useCompare } from "@/components/common/CompareContext";

export function CompareClient() {
  const searchParams = useSearchParams();
  const { compareItems, removeFromCompare, addToCompare, clearCompare } = useCompare();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Get IDs from query or from context
  const idsFromParam = searchParams.get("ids")?.split(",").filter(Boolean) || [];
  const currentIds = idsFromParam.length > 0 ? idsFromParam : compareItems.map((i) => i.id);

  useEffect(() => {
    if (currentIds.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Fetch products
    Promise.all(
      currentIds.slice(0, 4).map((id) =>
        fetch(`/api/products?limit=50`)
          .then((res) => res.json())
          .then((data) => data.products?.find((p: any) => p.id === id))
          .catch(() => null)
      )
    )
      .then((res) => {
        setProducts(res.filter(Boolean));
      })
      .finally(() => setLoading(false));
  }, [currentIds.join(",")]);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.trim().length >= 2) {
      fetch(`/api/search/suggestions?q=${encodeURIComponent(q)}`)
        .then((res) => res.json())
        .then((data) => setSearchResults(data.products || []))
        .catch(() => setSearchResults([]));
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectToAdd = (item: any) => {
    addToCompare({
      id: item.id,
      name: item.name,
      slug: item.slug,
      image: item.image,
      indicativePrice: item.indicativePrice,
      categorySlug: "all",
    });
    setShowSearchModal(false);
  };

  // Extract all unique spec keys across compared products
  const allSpecKeys = Array.from(
    new Set(
      products.flatMap((p) =>
        p.specifications ? Object.keys(p.specifications) : []
      )
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-secondary text-xs font-bold rounded-full mb-1">
            <Scale className="w-3.5 h-3.5" />
            <span>Side-by-Side Comparison</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-primary font-display">
            Compare Product Specifications & Prices
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Detailed specifications, merchant offer comparisons, and verified discounts.
          </p>
        </div>

        {products.length > 0 && (
          <button
            onClick={clearCompare}
            className="text-xs font-semibold text-red-600 hover:text-red-700 underline self-start sm:self-auto"
          >
            Clear comparison list
          </button>
        )}
      </div>

      {loading ? (
        <div className="p-12 text-center text-sm text-gray-400">Loading comparison matrix...</div>
      ) : products.length === 0 ? (
        <div className="bg-surface rounded-3xl p-12 text-center border border-gray-200 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-secondary flex items-center justify-center mx-auto mb-4">
            <Scale className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-primary mb-1">No products selected for comparison</h3>
          <p className="text-xs text-gray-500 mb-6">
            Browse our catalog and click the scale icon on any product card, or search and add products below.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setShowSearchModal(true)}
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add a Product</span>
            </button>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 text-charcoal hover:bg-gray-50 text-xs font-semibold px-5 py-3 rounded-xl"
            >
              <span>Browse Catalog</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Products Summary Cards Row */}
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[700px] grid grid-cols-4 gap-4">
              {products.map((p) => {
                const lowestOffer = p.offers?.[0] || null;
                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative flex flex-col justify-between"
                  >
                    <button
                      onClick={() => removeFromCompare(p.id)}
                      className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div>
                      <div className="w-full h-36 bg-surface rounded-xl p-2 flex items-center justify-center mb-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.images?.[0] || ""}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-secondary uppercase">
                        {p.brandName || "Brand"}
                      </span>
                      <Link href={`/product/${p.slug}`} className="block">
                        <h3 className="text-xs font-bold text-primary hover:text-secondary line-clamp-2 h-8">
                          {p.name}
                        </h3>
                      </Link>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="text-lg font-black text-primary font-display">
                        {formatINR(p.indicativePrice)}
                      </div>
                      {p.originalPrice > p.indicativePrice && (
                        <div className="text-[11px] text-gray-400 line-through">
                          {formatINR(p.originalPrice)}
                        </div>
                      )}

                      {lowestOffer && (
                        <a
                          href={lowestOffer.affiliateUrl}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          className="mt-3 w-full inline-flex items-center justify-center gap-1.5 bg-secondary hover:bg-secondary-dark text-white text-xs font-semibold py-2 rounded-xl transition-all shadow-sm"
                        >
                          <span>Buy on {lowestOffer.merchantName}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Add Product Slot if under 4 items */}
              {products.length < 4 && (
                <button
                  onClick={() => setShowSearchModal(true)}
                  className="bg-surface hover:bg-blue-50/50 border-2 border-dashed border-gray-200 hover:border-secondary rounded-2xl p-6 flex flex-col items-center justify-center gap-2 text-center transition-colors text-gray-500 hover:text-secondary h-full min-h-[250px]"
                >
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                    <Plus className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-xs font-bold">Add Another Product</span>
                  <span className="text-[10px] text-gray-400">Up to 4 items</span>
                </button>
              )}
            </div>
          </div>

          {/* Specifications Matrix */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm overflow-x-auto">
            <h3 className="text-lg font-bold text-primary font-display mb-6">
              Detailed Feature Matrix
            </h3>

            <div className="min-w-[700px] divide-y divide-gray-100 text-xs">
              {/* Rating Row */}
              <div className="py-3.5 grid grid-cols-5 gap-4 items-center bg-surface/50 px-3 rounded-xl font-medium">
                <span className="font-bold text-gray-600">Customer Rating</span>
                {products.map((p) => (
                  <div key={p.id} className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold">{p.rating > 0 ? p.rating.toFixed(1) : "4.5"}</span>
                    <span className="text-gray-400 text-[10px]">({p.reviewCount})</span>
                  </div>
                ))}
              </div>

              {/* Category */}
              <div className="py-3 grid grid-cols-5 gap-4 items-center px-3">
                <span className="font-bold text-gray-600">Category</span>
                {products.map((p) => (
                  <span key={p.id} className="text-gray-700">{p.categoryName}</span>
                ))}
              </div>

              {/* Dynamic Specs */}
              {allSpecKeys.map((key) => (
                <div key={key} className="py-3 grid grid-cols-5 gap-4 items-center px-3 hover:bg-surface/30 transition-colors">
                  <span className="font-bold text-gray-600">{key}</span>
                  {products.map((p) => (
                    <span key={p.id} className="text-gray-800 font-medium">
                      {p.specifications?.[key] || "—"}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Product Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative border border-gray-100">
            <button
              onClick={() => setShowSearchModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-primary font-display mb-1">
              Search Product to Compare
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Type the product name to add it to your comparison matrix.
            </p>

            <div className="relative mb-4">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="e.g. iPhone 15, Galaxy S24, Sony WH-1000XM5..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-secondary"
                autoFocus
              />
            </div>

            <div className="max-h-60 overflow-y-auto divide-y divide-gray-100">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectToAdd(item)}
                    className="p-2.5 flex items-center justify-between gap-3 hover:bg-surface cursor-pointer rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {item.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt=""
                          className="w-10 h-10 object-contain rounded bg-white p-1 border"
                        />
                      )}
                      <div>
                        <p className="text-xs font-semibold text-primary line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-[11px] font-bold text-secondary">
                          {formatINR(item.indicativePrice)}
                        </p>
                      </div>
                    </div>
                    <button className="bg-secondary text-white text-[11px] font-bold px-3 py-1 rounded-lg">
                      Add
                    </button>
                  </div>
                ))
              ) : searchQuery.length >= 2 ? (
                <p className="text-xs text-gray-400 text-center py-4">No matching products found.</p>
              ) : (
                <p className="text-xs text-gray-400 text-center py-4">Type at least 2 characters.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
