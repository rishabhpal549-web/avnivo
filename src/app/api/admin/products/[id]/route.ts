import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

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
    Prefer: "return=representation",
  };
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const endpoint = `${SUPABASE_URL}/rest/v1/Product?id=eq.${encodeURIComponent(params.id)}&select=id,name,slug,description,shortDescription,indicativePrice,originalPrice,discountPercent,rating,reviewCount,isVerifiedRating,images,keyFeatures,specifications,isFeatured,isTrending,isBestDeal,isTopPick,availability,priceLastUpdated,createdAt,updatedAt,categoryId,brandId,category:Category(id,name,nameHindi,slug),brand:Brand(id,name,slug),merchantOffers:MerchantOffer(id,merchantId,indicativePrice,originalPrice,discountPercent,availability,deliveryInfo,lastVerifiedAt,affiliateUrl,merchant:Merchant(id,name,slug,logoUrl))`;

    const res = await fetch(endpoint, {
      headers: getHeaders(),
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const data = await res.json();
    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product: data[0] });
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

    const indPrice = indicativePrice !== undefined && indicativePrice !== "" ? parseFloat(indicativePrice) : undefined;
    const origPrice = originalPrice !== undefined && originalPrice !== "" ? parseFloat(originalPrice) : indPrice;
    const discountPercent =
      origPrice && indPrice && origPrice > indPrice
        ? Math.round(((origPrice - indPrice) / origPrice) * 100)
        : 0;

    const updateData: any = {
      updatedAt: new Date().toISOString(),
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

    // 1. Update Product
    const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/Product?id=eq.${encodeURIComponent(params.id)}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(updateData),
    });

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      console.error("Product update error:", updateRes.status, errText);
      return NextResponse.json({ error: "Failed to update product in database" }, { status: 500 });
    }

    const updatedRows = await updateRes.json();
    const updatedProduct = updatedRows[0];

    // 2. Update merchant offers if provided
    if (Array.isArray(offers)) {
      // Delete old offers
      await fetch(`${SUPABASE_URL}/rest/v1/MerchantOffer?productId=eq.${encodeURIComponent(params.id)}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      // Insert new valid offers
      const validOffers = offers.filter(
        (o) => o.merchantId && o.affiliateUrl && o.affiliateUrl.trim().length > 0
      );

      for (const off of validOffers) {
        const offPrice = off.indicativePrice ? parseFloat(off.indicativePrice) : (indPrice || 0);
        const offOrig = off.originalPrice ? parseFloat(off.originalPrice) : null;
        const offDisc =
          offOrig && offOrig > offPrice ? Math.round(((offOrig - offPrice) / offOrig) * 100) : null;

        const offerPayload = {
          id: `off_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          productId: params.id,
          merchantId: off.merchantId,
          affiliateUrl: off.affiliateUrl.trim(),
          indicativePrice: offPrice,
          originalPrice: offOrig,
          discountPercent: offDisc,
          deliveryInfo: off.deliveryInfo || "Free Delivery",
          availability: off.availability || "IN_STOCK",
          updatedAt: new Date().toISOString(),
        };

        try {
          await fetch(`${SUPABASE_URL}/rest/v1/MerchantOffer`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(offerPayload),
          });
        } catch (offerErr) {
          console.error("Error updating merchant offer:", offerErr);
        }
      }
    }

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (err: any) {
    console.error("PUT product exception:", err);
    return NextResponse.json({ error: err.message || "Failed to update product" }, { status: 500 });
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
    // 1. Delete associated offers
    await fetch(`${SUPABASE_URL}/rest/v1/MerchantOffer?productId=eq.${encodeURIComponent(params.id)}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    // 2. Delete associated click logs if any
    await fetch(`${SUPABASE_URL}/rest/v1/AffiliateClickLog?productId=eq.${encodeURIComponent(params.id)}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    // 3. Delete product
    const delRes = await fetch(`${SUPABASE_URL}/rest/v1/Product?id=eq.${encodeURIComponent(params.id)}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!delRes.ok) {
      const errText = await delRes.text();
      console.error("Delete product error:", delRes.status, errText);
      return NextResponse.json({ error: "Failed to delete product from database" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (err: any) {
    console.error("DELETE product exception:", err);
    return NextResponse.json({ error: err.message || "Failed to delete product" }, { status: 500 });
  }
}
