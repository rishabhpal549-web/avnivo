const API_BASE = "https://avnivo.vercel.app/api";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  brandName?: string;
  categoryName: string;
  categorySlug: string;
  images: string[];
  indicativePrice: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  isVerifiedRating: boolean;
  specifications: Record<string, string>;
  keyFeatures: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestDeal?: boolean;
  isTopPick?: boolean;
  availability: string;
  priceLastUpdated: string;
  offers: MerchantOffer[];
}

export interface MerchantOffer {
  id: string;
  merchantId: string;
  merchantName: string;
  merchantSlug: string;
  merchantLogo: string;
  affiliateUrl: string;
  indicativePrice: number;
  originalPrice: number;
  discountPercent: number;
  availability: string;
  deliveryInfo: string;
  lastVerifiedAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameHindi?: string;
  slug: string;
  order: number;
  children?: Category[];
}

export async function fetchProducts(params: {
  q?: string;
  category?: string;
  sort?: string;
  limit?: number;
  page?: number;
} = {}): Promise<{ products: Product[]; total: number }> {
  try {
    const query = new URLSearchParams();
    if (params.q) query.set("q", params.q);
    if (params.category) query.set("category", params.category);
    if (params.sort) query.set("sort", params.sort);
    if (params.limit) query.set("limit", String(params.limit));
    if (params.page) query.set("page", String(params.page));

    const res = await fetch(`${API_BASE}/products?${query.toString()}`);
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return {
      products: data.products || [],
      total: data.pagination?.total || 0,
    };
  } catch (err) {
    console.error("fetchProducts error:", err);
    return { products: [], total: 0 };
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error("Failed to load categories");
    const data = await res.json();
    return data.categories || [];
  } catch (err) {
    console.error("fetchCategories error:", err);
    return [];
  }
}

export async function fetchSearchSuggestions(q: string): Promise<any> {
  if (!q || q.trim().length < 2) return { products: [], categories: [] };
  try {
    const res = await fetch(`${API_BASE}/search/suggestions?q=${encodeURIComponent(q.trim())}`);
    if (!res.ok) return { products: [], categories: [] };
    return await res.json();
  } catch (err) {
    return { products: [], categories: [] };
  }
}
