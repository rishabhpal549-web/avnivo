import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const offerId = searchParams.get("offerId");
    const productId = searchParams.get("productId");
    const directTo = searchParams.get("to");

    let targetUrl: string | null = null;
    let targetOffer: any = null;

    // Check if direct destination URL was passed in query
    if (directTo) {
      try {
        const decoded = decodeURIComponent(directTo);
        if (decoded.startsWith("http://") || decoded.startsWith("https://")) {
          targetUrl = decoded;
        }
      } catch {}
    }

    // 1. Lookup offer from Supabase REST API
    if (offerId) {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/MerchantOffer?id=eq.${encodeURIComponent(offerId)}&select=id,productId,merchantId,affiliateUrl,isActive,product:Product(id,name,slug),merchant:Merchant(id,name,slug)`,
          {
            headers: getHeaders(),
            cache: "no-store",
          }
        );

        if (res.ok) {
          const list = await res.json();
          if (Array.isArray(list) && list.length > 0) {
            targetOffer = list[0];
            if (!targetUrl && targetOffer.affiliateUrl && targetOffer.affiliateUrl.startsWith("http")) {
              targetUrl = targetOffer.affiliateUrl;
            }
          }
        }
      } catch (e) {
        console.warn("Offer lookup notice:", e);
      }
    } else if (productId) {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/MerchantOffer?productId=eq.${encodeURIComponent(productId)}&isActive=eq.true&select=id,productId,merchantId,affiliateUrl,isActive,product:Product(id,name,slug),merchant:Merchant(id,name,slug)&order=indicativePrice.asc&limit=1`,
          {
            headers: getHeaders(),
            cache: "no-store",
          }
        );

        if (res.ok) {
          const list = await res.json();
          if (Array.isArray(list) && list.length > 0) {
            targetOffer = list[0];
            if (!targetUrl && targetOffer.affiliateUrl && targetOffer.affiliateUrl.startsWith("http")) {
              targetUrl = targetOffer.affiliateUrl;
            }
          }
        }
      } catch (e) {
        console.warn("Product offer lookup notice:", e);
      }
    }

    // 2. If no valid external URL found, redirect gracefully to product page
    if (!targetUrl || !targetUrl.startsWith("http") || targetUrl === "#") {
      const fallbackPath = targetOffer?.product?.slug
        ? `/product/${targetOffer.product.slug}?notice=merchant_link_pending`
        : "/shop?notice=merchant_link_pending";
      return NextResponse.redirect(new URL(fallbackPath, req.url), 302);
    }

    // 3. Log outbound click asynchronously via Supabase REST (non-blocking)
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex").substring(0, 16);
    const userAgent = (req.headers.get("user-agent") || "").slice(0, 255);
    const referrer = (req.headers.get("referer") || "").slice(0, 255);

    const logPayload = {
      productId: targetOffer?.productId || null,
      merchantOfferId: targetOffer?.id || (offerId || null),
      merchantId: targetOffer?.merchantId || null,
      ipHash,
      userAgent,
      referrer,
      utmSource: searchParams.get("utm_source") || "avnivo",
      utmMedium: searchParams.get("utm_medium") || "affiliate",
      utmCampaign: searchParams.get("utm_campaign") || "discovery",
      createdAt: new Date().toISOString(),
    };

    fetch(`${SUPABASE_URL}/rest/v1/AffiliateClickLog`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(logPayload),
    }).catch(() => {});

    // 4. Redirect directly to the merchant (Amazon, Flipkart, etc.) with HTTP 302
    return NextResponse.redirect(targetUrl, 302);
  } catch (err: any) {
    console.error("Affiliate redirect handler error:", err);
    // If 'to' param was present, always honor it even in fatal catch
    const fallbackTo = req.nextUrl?.searchParams?.get("to");
    if (fallbackTo) {
      try {
        const decoded = decodeURIComponent(fallbackTo);
        if (decoded.startsWith("http://") || decoded.startsWith("https://")) {
          return NextResponse.redirect(decoded, 302);
        }
      } catch {}
    }
    return NextResponse.redirect(new URL("/shop", req.url), 302);
  }
}
