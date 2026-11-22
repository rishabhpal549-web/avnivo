"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/common/ProductCard";
import { AffiliateDisclosureBanner } from "@/components/common/AffiliateDisclosureBanner";
import {
  SlidersHorizontal,
  Grid,
  List,
  X,
  Search,
  Star,
  RotateCcw,
  ChevronDown,
} from "lucide-react";

interface ProductCatalogViewProps {
  initialCategorySlug?: string;
  pageTitle?: string;
  pageDescription?: string;
}

export function ProductCatalogView({
  initialCategorySlug = "",
  pageTitle = "All Products",
  pageDescription = "Discover and compare prices across verified Indian merchants.",
}: ProductCatalogViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);

  // Filter States
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(initialCategorySlug || searchParams.get("category") || "");
  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [minDiscount, setMinDiscount] = useState(searchParams.get("minDiscount") || "");
  const [minRating, setMinRating] = useState(searchParams.get("minRating") || "");
  const [merchant, setMerchant] = useState(searchParams.get("merchant") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "popular");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync state when URL search parameters change (e.g. from Header search or back/forward)
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const cat = initialCategorySlug || searchParams.get("category") || "";
    const br = searchParams.get("brand") || "";
    const minP = searchParams.get("minPrice") || "";
    const maxP = searchParams.get("maxPrice") || "";
    const minD = searchParams.get("minDiscount") || "";
    const minR = searchParams.get("minRating") || "";
    const merch = searchParams.get("merchant") || "";
    const s = searchParams.get("sort") || "popular";

    setSearchQuery(q);
    setCategory(cat);
    setBrand(br);
    setMinPrice(minP);
    setMaxPrice(maxP);
    setMinDiscount(minD);
    setMinRating(minR);
    setMerchant(merch);
    setSort(s);
  }, [searchParams, initialCategorySlug]);

  // Fetch categories and brands on load
  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((res) => res.json()),
      fetch("/api/brands").then((res) => res.json()),
    ])
      .then(([catData, brandData]) => {
        if (catData.categories) setCategories(catData.categories);
        if (brandData.brands) setBrands(brandData.brands);
      })
      .catch(() => {});
  }, []);

  // Fetch filtered products
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (category) params.set("category", category);
    if (brand) params.set("brand", brand);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (minDiscount) params.set("minDiscount", minDiscount);
    if (minRating) params.set("minRating", minRating);
    if (merchant) params.set("merchant", merchant);
    if (sort) params.set("sort", sort);

    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [searchQuery, category, brand, minPrice, maxPrice, minDiscount, minRating, merchant, sort]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setCategory(initialCategorySlug || "");
    setBrand("");
    setMinPrice("");
    setMaxPrice("");
    setMinDiscount("");
    setMinRating("");
    setMerchant("");
    setSort("popular");
    router.replace(initialCategorySlug ? `/category/${initialCategorySlug}` : "/shop");
  };

  const handleQuickSearch = (keyword: string) => {
    setSearchQuery(keyword);
    router.replace(`/shop?q=${encodeURIComponent(keyword)}`);
  };

  const hasActiveFilters = Boolean(
    searchQuery ||
    (category && category !== initialCategorySlug) ||
    brand ||
    minPrice ||
    maxPrice ||
    minDiscount ||
    minRating ||
    merchant
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Title & Stats */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-primary font-display">
            {pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
            {pageDescription}
          </p>
        </div>

        {/* Layout & Sort toolbar */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-surface border border-gray-200 rounded-xl text-xs font-bold text-charcoal"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400 font-semibold hidden sm:inline">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-surface border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-charcoal outline-none focus:border-secondary cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Grid/List switch */}
          <div className="hidden sm:flex items-center bg-surface border border-gray-200 rounded-xl p-1 gap-1">
            <button
              onClick={() => setLayout("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                layout === "grid" ? "bg-white text-secondary shadow-sm" : "text-gray-400 hover:text-charcoal"
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout("list")}
              className={`p-1.5 rounded-lg transition-colors ${
                layout === "list" ? "bg-white text-secondary shadow-sm" : "text-gray-400 hover:text-charcoal"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden md:block space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-bold text-sm text-primary flex items-center gap-1.5 font-display">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-secondary hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Category
            </h4>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs border border-gray-200 rounded-xl p-2.5 bg-white outline-none focus:border-secondary"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Brand
            </h4>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full text-xs border border-gray-200 rounded-xl p-2.5 bg-white outline-none focus:border-secondary"
            >
              <option value="">All Brands</option>
              {brands.map((b) => (
                <option key={b.id} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Merchant Platform Filter */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Available Store
            </h4>
            <div className="space-y-1.5 text-xs text-gray-700">
              {[
                { name: "All Merchants", slug: "" },
                { name: "Amazon India", slug: "amazon-india" },
                { name: "Flipkart", slug: "flipkart" },
                { name: "Croma", slug: "croma" },
                { name: "Tata CLiQ", slug: "tata-cliq" },
                { name: "Reliance Digital", slug: "reliance-digital" },
              ].map((m) => (
                <label key={m.slug} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="merchant"
                    checked={merchant === m.slug}
                    onChange={() => setMerchant(m.slug)}
                    className="text-secondary focus:ring-secondary"
                  />
                  <span>{m.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Price Range (₹)
            </h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-xl p-2 outline-none"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-xl p-2 outline-none"
              />
            </div>
          </div>

          {/* Min Discount */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Discount
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {["10", "20", "30", "50"].map((disc) => (
                <button
                  key={disc}
                  onClick={() => setMinDiscount(minDiscount === disc ? "" : disc)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold border transition-colors ${
                    minDiscount === disc
                      ? "bg-secondary text-white border-secondary"
                      : "bg-surface text-charcoal border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {disc}%+ OFF
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Rating
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {["4", "4.5"].map((rat) => (
                <button
                  key={rat}
                  onClick={() => setMinRating(minRating === rat ? "" : rat)}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-semibold border transition-colors ${
                    minRating === rat
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-surface text-charcoal border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <Star className="w-3 h-3 fill-current" />
                  <span>{rat}★ & above</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid & Results */}
        <div className="md:col-span-3">
          {/* In-Catalog Search & Filter Pills Bar */}
          <div className="mb-4 space-y-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const params = new URLSearchParams(searchParams.toString());
                if (searchQuery.trim()) {
                  params.set("q", searchQuery.trim());
                } else {
                  params.delete("q");
                }
                router.replace(`/shop?${params.toString()}`);
              }}
              className="flex items-center gap-2 bg-surface border border-gray-200 rounded-xl px-3 py-1.5 focus-within:border-secondary transition-colors"
            >
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by title, brand, or keywords in this catalog..."
                className="w-full bg-transparent text-xs text-charcoal outline-none placeholder-gray-400 py-1"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete("q");
                    router.replace(`/shop?${params.toString()}`);
                  }}
                  className="p-1 text-gray-400 hover:text-charcoal rounded-full"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="bg-primary hover:bg-primary-900 text-white text-xs font-semibold px-3 py-1 rounded-lg shrink-0 transition-colors"
              >
                Search
              </button>
            </form>

            {/* Active filter pills */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-gray-400 font-semibold">Active:</span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-secondary text-xs px-2.5 py-1 rounded-lg font-medium border border-blue-100">
                    &quot;{searchQuery}&quot;
                    <button onClick={() => {
                      setSearchQuery("");
                      const params = new URLSearchParams(searchParams.toString());
                      params.delete("q");
                      router.replace(`/shop?${params.toString()}`);
                    }}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {category && category !== initialCategorySlug && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-secondary text-xs px-2.5 py-1 rounded-lg font-medium border border-blue-100">
                    Category: {category}
                    <button onClick={() => setCategory("")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {brand && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-secondary text-xs px-2.5 py-1 rounded-lg font-medium border border-blue-100">
                    Brand: {brand}
                    <button onClick={() => setBrand("")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {merchant && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-secondary text-xs px-2.5 py-1 rounded-lg font-medium border border-blue-100">
                    Store: {merchant}
                    <button onClick={() => setMerchant("")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {minDiscount && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-secondary text-xs px-2.5 py-1 rounded-lg font-medium border border-blue-100">
                    {minDiscount}%+ Discount
                    <button onClick={() => setMinDiscount("")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {minRating && (
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-xs px-2.5 py-1 rounded-lg font-medium border border-amber-200">
                    {minRating}★ & above
                    <button onClick={() => setMinRating("")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-gray-500 hover:text-red-600 underline font-medium ml-1"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Loading Skeleton */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-gray-100 rounded-2xl h-80" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-surface rounded-3xl p-10 text-center border border-gray-200 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-secondary flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-primary mb-1">
                {searchQuery
                  ? `No products found matching "${searchQuery}"`
                  : "No products match your selected filters"}
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto mb-5 leading-relaxed">
                {searchQuery
                  ? "We couldn't find exact matches. Try checking your spelling, using broader terms, or exploring our popular categories below."
                  : "Try resetting your price or discount filters to view available verified merchant products."}
              </p>

              {/* Quick Search Chips */}
              <div className="mb-6">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Popular Searches
                </p>
                <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                  {[
                    "Vegetable Slicer",
                    "Silicone Lids",
                    "Motion Sensor Light",
                    "Phone Stand",
                    "Type-C Cable",
                    "Resistance Bands",
                    "RFID Card Wallet",
                    "Sunglasses",
                    "Jade Roller",
                    "LCD Tablet",
                    "Travel Neck Pillow",
                    "Multi-Tool",
                    "COB Keychain Light",
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleQuickSearch(chip)}
                      className="px-3 py-1 bg-white hover:bg-blue-50 hover:text-secondary border border-gray-200 rounded-full text-xs font-semibold text-charcoal transition-colors shadow-2xs"
                    >
                      🔍 {chip}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={clearAllFilters}
                className="bg-primary hover:bg-primary-900 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md transition-all inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters & View All Products</span>
              </button>
            </div>
          ) : (
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3.5"
                  : "space-y-3"
              }
            >
              {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} layout={layout} />
              ))}
            </div>
          )}

          {/* Affiliate transparency badge */}
          <div className="mt-12">
            <AffiliateDisclosureBanner compact />
          </div>
        </div>
      </div>
    </div>
  );
}
