import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ items: [] });
  }

  const items = await prisma.wishlistItem.findMany({
    where: { userId: user.userId },
    orderBy: { createdAt: "desc" },
    include: {
      product: {
        include: {
          brand: true,
          merchantOffers: {
            where: { isActive: true },
            orderBy: { indicativePrice: "asc" },
            take: 1,
            include: { merchant: true },
          },
        },
      },
    },
  });

  const formatted = items.map((item) => {
    let images = [];
    try {
      images = JSON.parse(item.product.images);
    } catch {
      images = [item.product.images];
    }
    return {
      id: item.id,
      productId: item.productId,
      name: item.product.name,
      slug: item.product.slug,
      brandName: item.product.brand?.name || null,
      image: images[0] || null,
      indicativePrice: item.product.indicativePrice,
      originalPrice: item.product.originalPrice,
      discountPercent: item.product.discountPercent,
      lowestMerchant: item.product.merchantOffers[0]?.merchant.name || "Online Store",
      lowestOfferId: item.product.merchantOffers[0]?.id || null,
      addedAt: item.createdAt,
    };
  });

  return NextResponse.json({ items: formatted });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const existing = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: user.userId,
          productId,
        },
      },
    });

    if (existing) {
      await prisma.wishlistItem.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ inWishlist: false, message: "Removed from wishlist" });
    } else {
      await prisma.wishlistItem.create({
        data: {
          userId: user.userId,
          productId,
        },
      });
      return NextResponse.json({ inWishlist: true, message: "Added to wishlist" });
    }
  } catch (err: any) {
    console.error("Wishlist toggle error:", err);
    return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 });
  }
}
