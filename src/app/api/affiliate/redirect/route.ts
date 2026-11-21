import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const offerId = searchParams.get("offerId");
    const productId = searchParams.get("productId");

    if (!offerId && !productId) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    let targetOffer = null;
    if (offerId) {
      targetOffer = await prisma.merchantOffer.findUnique({
        where: { id: offerId },
        include: { product: true, merchant: true },
      });
    } else if (productId) {
      targetOffer = await prisma.merchantOffer.findFirst({
        where: { productId, isActive: true },
        orderBy: { indicativePrice: "asc" },
        include: { product: true, merchant: true },
      });
    }

    if (!targetOffer || !targetOffer.affiliateUrl) {
      return NextResponse.redirect(new URL("/shop", req.url));
    }

    // Hash client IP for privacy compliance (GDPR/DPDP Act 2023)
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex").substring(0, 16);
    const userAgent = req.headers.get("user-agent") || "";
    const referrer = req.headers.get("referer") || "";

    const user = await getCurrentUser();

    // Increment click counts asynchronously
    await Promise.allSettled([
      prisma.merchantOffer.update({
        where: { id: targetOffer.id },
        data: { clickCount: { increment: 1 } },
      }),
      prisma.product.update({
        where: { id: targetOffer.productId },
        data: { clicksCount: { increment: 1 } },
      }),
      prisma.affiliateClickLog.create({
        data: {
          productId: targetOffer.productId,
          merchantOfferId: targetOffer.id,
          merchantId: targetOffer.merchantId,
          userId: user ? user.userId : null,
          ipHash,
          userAgent: userAgent.slice(0, 255),
          referrer: referrer.slice(0, 255),
          utmSource: searchParams.get("utm_source") || "avnivo",
          utmMedium: searchParams.get("utm_medium") || "affiliate",
          utmCampaign: searchParams.get("utm_campaign") || "discovery",
        },
      }),
    ]);

    // Check if intermediate transparent disclosure page requested or direct 302 redirect
    const direct = searchParams.get("direct") !== "false";
    if (direct) {
      return NextResponse.redirect(targetOffer.affiliateUrl, 302);
    }

    // Intermediary page URL
    return NextResponse.redirect(new URL(`/out/${targetOffer.id}`, req.url));
  } catch (err: any) {
    console.error("Affiliate redirect error:", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
}
