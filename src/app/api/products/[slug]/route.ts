import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        brand: true,
        category: {
          include: {
            parent: true,
          },
        },
        merchantOffers: {
          where: { isActive: true },
          orderBy: { indicativePrice: "asc" },
          include: {
            merchant: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Increment view count asynchronously
    await prisma.product.update({
      where: { id: product.id },
      data: { viewsCount: { increment: 1 } },
    });

    // Fetch related products in the same category
    const relatedProducts = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
      },
      take: 4,
      include: {
        brand: true,
        merchantOffers: {
          where: { isActive: true },
          orderBy: { indicativePrice: "asc" },
          take: 1,
          include: { merchant: true },
        },
      },
    });

    let images = [];
    try {
      images = JSON.parse(product.images);
    } catch {
      images = [product.images];
    }

    let keyFeatures = [];
    try {
      keyFeatures = JSON.parse(product.keyFeatures);
    } catch {
      keyFeatures = [];
    }

    let specifications = {};
    try {
      specifications = JSON.parse(product.specifications);
    } catch {
      specifications = {};
    }

    const formattedProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      brandName: product.brand?.name || null,
      categoryName: product.category.name,
      categoryNameHindi: product.category.nameHindi,
      categorySlug: product.category.slug,
      parentCategoryName: product.category.parent?.name || null,
      parentCategorySlug: product.category.parent?.slug || null,
      images,
      indicativePrice: product.indicativePrice,
      originalPrice: product.originalPrice,
      discountPercent: product.discountPercent,
      rating: product.rating,
      reviewCount: product.reviewCount,
      isVerifiedRating: product.isVerifiedRating,
      specifications,
      keyFeatures,
      isFeatured: product.isFeatured,
      isTrending: product.isTrending,
      isBestDeal: product.isBestDeal,
      isTopPick: product.isTopPick,
      availability: product.availability,
      priceLastUpdated: product.priceLastUpdated,
      offers: product.merchantOffers.map((o) => ({
        id: o.id,
        merchantId: o.merchantId,
        merchantName: o.merchant.name,
        merchantSlug: o.merchant.slug,
        merchantLogo: o.merchant.logoUrl,
        affiliateUrl: `/api/affiliate/redirect?offerId=${o.id}`,
        indicativePrice: o.indicativePrice,
        originalPrice: o.originalPrice,
        discountPercent: o.discountPercent,
        availability: o.availability,
        deliveryInfo: o.deliveryInfo,
        lastVerifiedAt: o.lastVerifiedAt,
      })),
      relatedProducts: relatedProducts.map((rp) => {
        let rpImages = [];
        try {
          rpImages = JSON.parse(rp.images);
        } catch {
          rpImages = [rp.images];
        }
        return {
          id: rp.id,
          name: rp.name,
          slug: rp.slug,
          brandName: rp.brand?.name || null,
          image: rpImages[0] || null,
          indicativePrice: rp.indicativePrice,
          originalPrice: rp.originalPrice,
          discountPercent: rp.discountPercent,
          rating: rp.rating,
          reviewCount: rp.reviewCount,
          lowestMerchant: rp.merchantOffers[0]?.merchant.name || "Online Store",
        };
      }),
    };

    return NextResponse.json({ product: formattedProduct });
  } catch (err: any) {
    console.error("Single product API error:", err);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
