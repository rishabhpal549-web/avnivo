import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { slugify } from "@/lib/utils";

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

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const endpoint = `${SUPABASE_URL}/rest/v1/Product?select=id,name,slug,description,shortDescription,indicativePrice,originalPrice,discountPercent,rating,reviewCount,isVerifiedRating,images,keyFeatures,specifications,isFeatured,isTrending,isBestDeal,isTopPick,availability,priceLastUpdated,createdAt,updatedAt,categoryId,brandId,category:Category(id,name,nameHindi,slug),brand:Brand(id,name,slug),merchantOffers:MerchantOffer(id,merchantId,indicativePrice,originalPrice,discountPercent,availability,deliveryInfo,lastVerifiedAt,affiliateUrl,merchant:Merchant(id,name,slug,logoUrl))&order=createdAt.desc`;

    const res = await fetch(endpoint, {
      headers: getHeaders(),
      cache: "no-store",
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Supabase REST products fetch failed:", res.status, errText);
      return NextResponse.json({ error: "Failed to fetch products from storage" }, { status: res.status });
    }

    const products = await res.json();
    return NextResponse.json({ products });
  } catch (err: any) {
    console.error("GET /api/admin/products exception:", err);
    return NextResponse.json({ error: err.message || "Failed to load products" }, { status: 500 });
  }
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
      availability,
      isFeatured,
      isTrending,
      isBestDeal,
      isTopPick,
      offers,
    } = body;

    if (!name || !categoryId || indicativePrice === undefined || indicativePrice === "") {
      return NextResponse.json(
        { error: "Product name, category, and price are required." },
        { status: 400 }
      );
    }

    const numIndicative = parseFloat(indicativePrice);
    const numOriginal = originalPrice ? parseFloat(originalPrice) : numIndicative;
    const discountPercent =
      numOriginal > numIndicative
        ? Math.round(((numOriginal - numIndicative) / numOriginal) * 100)
        : 0;

    let baseSlug = slugify(name);
    let slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const productId = `p_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const nowIso = new Date().toISOString();

    const productPayload = {
      id: productId,
      name,
      slug,
      description: description || name,
      shortDescription: shortDescription || null,
      brandId: brandId || null,
      categoryId,
      images: JSON.stringify(Array.isArray(images) ? images : [images || "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1"]),
      indicativePrice: numIndicative,
      originalPrice: numOriginal,
      discountPercent,
      specifications: JSON.stringify(specifications || {}),
      keyFeatures: JSON.stringify(keyFeatures || []),
      availability: availability || "IN_STOCK",
      isFeatured: Boolean(isFeatured),
      isTrending: Boolean(isTrending),
      isBestDeal: Boolean(isBestDeal),
      isTopPick: Boolean(isTopPick),
      updatedAt: nowIso,
    };

    // 1. Insert Product
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/Product`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(productPayload),
    });

    if (!insertRes.ok) {
      const errText = await insertRes.text();
      console.error("Product insert error:", insertRes.status, errText);
      return NextResponse.json(
        { error: `Database insert failed: ${errText || insertRes.statusText}` },
        { status: 500 }
      );
    }

    const [createdProduct] = await insertRes.json();

    // 2. Insert Merchant Offers if provided
    if (Array.isArray(offers) && offers.length > 0) {
      const validOffers = offers.filter(
        (o) => o.merchantId && o.affiliateUrl && o.affiliateUrl.trim().length > 0
      );

      for (const off of validOffers) {
        const offPrice = off.indicativePrice ? parseFloat(off.indicativePrice) : numIndicative;
        const offOrig = off.originalPrice ? parseFloat(off.originalPrice) : null;
        const offDisc =
          offOrig && offOrig > offPrice ? Math.round(((offOrig - offPrice) / offOrig) * 100) : null;

        const offerPayload = {
          id: `off_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          productId: createdProduct.id,
          merchantId: off.merchantId,
          affiliateUrl: off.affiliateUrl.trim(),
          indicativePrice: offPrice,
          originalPrice: offOrig,
          discountPercent: offDisc,
          deliveryInfo: off.deliveryInfo || "Free Delivery",
          availability: off.availability || "IN_STOCK",
          updatedAt: nowIso,
        };

        try {
          await fetch(`${SUPABASE_URL}/rest/v1/MerchantOffer`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(offerPayload),
          });
        } catch (offerErr) {
          console.error("Error creating merchant offer:", offerErr);
        }
      }
    }

    return NextResponse.json({ success: true, product: createdProduct });
  } catch (err: any) {
    console.error("Create product exception:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred while creating product." },
      { status: 500 }
    );
  }
}
