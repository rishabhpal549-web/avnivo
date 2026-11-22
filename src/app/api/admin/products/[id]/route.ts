import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        brand: true,
        merchantOffers: {
          include: { merchant: true },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch product", details: err.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
      categoryId,
      brandId,
      indicativePrice,
      originalPrice,
      images,
      availability,
      isFeatured,
      isTrending,
      isBestDeal,
      isTopPick,
      offers,
    } = body;

    const indPrice = indicativePrice ? parseFloat(indicativePrice) : undefined;
    const origPrice = originalPrice ? parseFloat(originalPrice) : indPrice;
    const discountPercent =
      origPrice && indPrice && origPrice > indPrice
        ? Math.round(((origPrice - indPrice) / origPrice) * 100)
        : 0;

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (shortDescription !== undefined) updateData.shortDescription = shortDescription;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (brandId !== undefined) updateData.brandId = brandId || null;
    if (indPrice !== undefined) updateData.indicativePrice = indPrice;
    if (origPrice !== undefined) {
      updateData.originalPrice = origPrice;
      updateData.discountPercent = discountPercent;
    }
    if (images !== undefined) {
      updateData.images = JSON.stringify(Array.isArray(images) ? images : [images]);
    }
    if (availability !== undefined) updateData.availability = availability;
    if (isFeatured !== undefined) updateData.isFeatured = Boolean(isFeatured);
    if (isTrending !== undefined) updateData.isTrending = Boolean(isTrending);
    if (isBestDeal !== undefined) updateData.isBestDeal = Boolean(isBestDeal);
    if (isTopPick !== undefined) updateData.isTopPick = Boolean(isTopPick);

    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: updateData,
    });

    // Update or add merchant offers if provided
    if (Array.isArray(offers)) {
      // Remove old offers for this product if replacing
      await prisma.merchantOffer.deleteMany({
        where: { productId: params.id },
      });

      for (const off of offers) {
        if (off.merchantId && off.affiliateUrl && off.indicativePrice) {
          await prisma.merchantOffer.create({
            data: {
              productId: params.id,
              merchantId: off.merchantId,
              affiliateUrl: off.affiliateUrl,
              indicativePrice: parseFloat(off.indicativePrice),
              originalPrice: off.originalPrice ? parseFloat(off.originalPrice) : null,
              discountPercent: off.discountPercent ? parseFloat(off.discountPercent) : null,
              deliveryInfo: off.deliveryInfo || "Free Delivery",
              availability: off.availability || "IN_STOCK",
              isActive: true,
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (err: any) {
    console.error("Update product error:", err);
    return NextResponse.json({ error: "Failed to update product", details: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    await prisma.product.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (err: any) {
    console.error("Delete product error:", err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
