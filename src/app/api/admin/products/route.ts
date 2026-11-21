import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      brand: true,
      category: true,
      merchantOffers: {
        include: { merchant: true },
      },
    },
  });

  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
      name,
      description,
      shortDescription,
      brandId,
      categoryId,
      images,
      indicativePrice,
      originalPrice,
      specifications,
      keyFeatures,
      isFeatured,
      isTrending,
      isBestDeal,
      isTopPick,
      offers,
    } = body;

    if (!name || !categoryId || !indicativePrice) {
      return NextResponse.json(
        { error: "Name, category, and price are required." },
        { status: 400 }
      );
    }

    let slug = slugify(name);
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const discountPercent =
      originalPrice && originalPrice > indicativePrice
        ? Math.round(((originalPrice - indicativePrice) / originalPrice) * 100)
        : 0;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || name,
        shortDescription,
        brandId: brandId || null,
        categoryId,
        images: JSON.stringify(Array.isArray(images) ? images : [images || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"]),
        indicativePrice: parseFloat(indicativePrice),
        originalPrice: originalPrice ? parseFloat(originalPrice) : parseFloat(indicativePrice),
        discountPercent,
        specifications: JSON.stringify(specifications || {}),
        keyFeatures: JSON.stringify(keyFeatures || []),
        isFeatured: Boolean(isFeatured),
        isTrending: Boolean(isTrending),
        isBestDeal: Boolean(isBestDeal),
        isTopPick: Boolean(isTopPick),
      },
    });

    if (Array.isArray(offers) && offers.length > 0) {
      for (const off of offers) {
        if (off.merchantId && off.affiliateUrl && off.indicativePrice) {
          await prisma.merchantOffer.create({
            data: {
              productId: product.id,
              merchantId: off.merchantId,
              affiliateUrl: off.affiliateUrl,
              indicativePrice: parseFloat(off.indicativePrice),
              originalPrice: off.originalPrice ? parseFloat(off.originalPrice) : null,
              discountPercent: off.discountPercent ? parseFloat(off.discountPercent) : null,
              deliveryInfo: off.deliveryInfo || "Free delivery",
              availability: off.availability || "IN_STOCK",
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    console.error("Create product error:", err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
