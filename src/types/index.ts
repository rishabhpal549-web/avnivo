export interface ProductSpecification {
  [key: string]: string;
}

export interface MerchantOfferItem {
  id: string;
  merchantId: string;
  merchantName: string;
  merchantLogo?: string;
  affiliateUrl: string;
  indicativePrice: number;
  originalPrice?: number;
  discountPercent?: number;
  availability: string;
  deliveryInfo?: string;
  lastVerifiedAt: string;
  clickCount: number;
}

export interface ProductItem {
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
  specifications: ProductSpecification;
  keyFeatures: string[];
  isFeatured: boolean;
  isTrending: boolean;
  isBestDeal: boolean;
  isTopPick: boolean;
  isNewArrival: boolean;
  availability: string;
  priceLastUpdated: string;
  offers: MerchantOfferItem[];
}

export interface CategoryItem {
  id: string;
  name: string;
  nameHindi?: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  icon?: string;
  featured: boolean;
  subcategories?: {
    id: string;
    name: string;
    slug: string;
  }[];
}
