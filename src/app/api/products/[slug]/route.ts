import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ibrzfiwskfhlkfdjbyfv.supabase.co";
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicnpmaXdza2ZobGtmZGpieWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUyNjY1NjcsImV4cCI6MjExMDg0MjU2N30.XQALfrWAZbazKNZJpbxXAYr9DBr7IUURKE45jjsfF3o";

function getHeaders() {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
  };
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    let product: any = null;

    try {
      product = await prisma.product.findUnique({
        where: { slug },
        include: {
          brand: true,
          category: {
            include: { parent: true },
          },
          merchantOffers: {
            where: { isActive: true },
            orderBy: { indicativePrice: "asc" },
            include: { merchant: true },
          },
        },
      });
    } catch (e) {
      console.warn("API product Prisma error, trying REST fallback:", e);
    }

    // Supabase REST Fallback if Prisma is down
    if (!product) {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/Product?slug=eq.${encodeURIComponent(slug)}&select=id,name,slug,description,shortDescription,indicativePrice,originalPrice,discountPercent,rating,reviewCount,isVerifiedRating,images,videoUrl,keyFeatures,specifications,availability,priceLastUpdated,brand:Brand(name),category:Category(name,slug),merchantOffers:MerchantOffer(id,merchantId,affiliateUrl,indicativePrice,originalPrice,discountPercent,availability,deliveryInfo,lastVerifiedAt,merchant:Merchant(id,name,slug,logoUrl))`,
          {
            headers: getHeaders(),
            cache: "no-store",
          }
        );

        if (res.ok) {
          const list = await res.json();
          if (Array.isArray(list) && list.length > 0) {
            product = list[0];
          }
        }
      } catch (err) {
        console.error("API product REST fallback error:", err);
      }
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let images = [];
    try {
      images = JSON.parse(product.images);
    } catch {
      images = [product.images];
    }

    let specifications = {};
    try {
      specifications = JSON.parse(product.specifications);
    } catch {
      specifications = {};
    }

    let keyFeatures = [];
    try {
      keyFeatures = JSON.parse(product.keyFeatures);
    } catch {
      keyFeatures = [];
    }

    const formattedProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      brandName: product.brand?.name || null,
      categoryName: product.category?.name || "Accessories",
      categoryNameHindi: product.category?.nameHindi || null,
      categorySlug: product.category?.slug || "accessories",
      parentCategoryName: product.category?.parent?.name || null,
      parentCategorySlug: product.category?.parent?.slug || null,
      images,
      videoUrl: product.videoUrl || null,
      indicativePrice: product.indicativePrice,
      originalPrice: product.originalPrice,
      discountPercent: product.discountPercent,
      rating: product.rating || 4.4,
      reviewCount: product.reviewCount || 120,
      isVerifiedRating: product.isVerifiedRating ?? true,
      specifications,
      keyFeatures,
      isFeatured: product.isFeatured,
      isTrending: product.isTrending,
      isBestDeal: product.isBestDeal,
      isTopPick: product.isTopPick,
      availability: product.availability || "IN_STOCK",
      priceLastUpdated: product.priceLastUpdated,
      offers: (product.merchantOffers || []).map((o: any) => ({
        id: o.id,
        merchantId: o.merchantId || o.merchant?.id,
        merchantName: o.merchant?.name || "Merchant",
        merchantSlug: o.merchant?.slug || "store",
        merchantLogo: o.merchant?.logoUrl || "/merchants/amazon.svg",
        affiliateUrl: o.affiliateUrl && o.affiliateUrl.startsWith("http")
          ? `/api/affiliate/redirect?offerId=${o.id}&to=${encodeURIComponent(o.affiliateUrl)}`
          : `/api/affiliate/redirect?offerId=${o.id}`,
        indicativePrice: o.indicativePrice,
        originalPrice: o.originalPrice,
        discountPercent: o.discountPercent,
        availability: o.availability,
        deliveryInfo: o.deliveryInfo,
        lastVerifiedAt: o.lastVerifiedAt,
      })),
    };

    return NextResponse.json({ product: formattedProduct });
  } catch (err: any) {
    console.error("Single product API error:", err);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
