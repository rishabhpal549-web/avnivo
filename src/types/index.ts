export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  categorySlug: string;
  description: string;
  shortDescription: string;
  images: string[];
  price: number; // in INR
  originalPrice: number; // in INR
  discountPercent: number;
  merchantName: string;
  affiliateUrl: string;
  rating: number; // 1.0 - 5.0
  ratingCount: number;
  featured: boolean;
  trending: boolean;
  bestSeller?: boolean;
  dealOfTheDay?: boolean;
  specifications: Record<string, string>;
  pros: string[];
  cons: string[];
  bestFor: string;
  verdict: string;
  inStock: boolean;
  badge?: string;
  asin?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  productCount: number;
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface BuyingGuide {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  coverImage: string;
  readTime: string;
  publishedAt: string;
  author: string;
  tableOfContents: { id: string; title: string }[];
  contentSections: {
    id: string;
    title: string;
    body: string;
    tips?: string[];
  }[];
  recommendedProductIds: string[];
  faqs?: { question: string; answer: string }[];
}

export interface FilterState {
  category: string;
  brand: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  onlyDeals: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

