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

// GET all merchant offers
export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const endpoint = `${SUPABASE_URL}/rest/v1/MerchantOffer?select=id,productId,merchantId,affiliateUrl,indicativePrice,originalPrice,discountPercent,availability,deliveryInfo,lastVerifiedAt,createdAt,updatedAt,product:Product(id,name,slug,images,indicativePrice,originalPrice,availability),merchant:Merchant(id,name,slug,logoUrl)&order=updatedAt.desc`;

    const res = await fetch(endpoint, {
      headers: getHeaders(),
      cache: "no-store",
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Supabase REST offers fetch failed:", res.status, errText);
      return NextResponse.json({ error: "Failed to fetch offers" }, { status: res.status });
    }

    const offers = await res.json();
    return NextResponse.json({ offers });
  } catch (err: any) {
    console.error("GET /api/admin/offers exception:", err);
    return NextResponse.json({ error: err.message || "Failed to load offers" }, { status: 500 });
  }
}

// PUT / UPDATE an existing offer
export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, affiliateUrl, indicativePrice, originalPrice, deliveryInfo } = body;

    if (!id) {
      return NextResponse.json({ error: "Offer ID is required" }, { status: 400 });
    }

    const updatePayload: any = {
      updatedAt: new Date().toISOString(),
      lastVerifiedAt: new Date().toISOString(),
    };

    if (affiliateUrl !== undefined) updatePayload.affiliateUrl = affiliateUrl.trim();
    if (indicativePrice !== undefined) updatePayload.indicativePrice = Number(indicativePrice) || 0;
    if (originalPrice !== undefined) updatePayload.originalPrice = Number(originalPrice) || 0;
    if (deliveryInfo !== undefined) updatePayload.deliveryInfo = deliveryInfo;

    const res = await fetch(`${SUPABASE_URL}/rest/v1/MerchantOffer?id=eq.${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(updatePayload),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: errText || "Failed to update offer" }, { status: res.status });
    }

    const updated = await res.json();
    return NextResponse.json({ success: true, offer: updated[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update offer" }, { status: 500 });
  }
}
