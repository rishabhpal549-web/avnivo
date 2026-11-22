import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ref, path, productId, merchantOfferId } = body;

    if (!ref) {
      return NextResponse.json({ ok: true });
    }

    // Attempt to log referral click in Prisma
    try {
      if (productId) {
        await prisma.affiliateClickLog.create({
          data: {
            productId,
            merchantOfferId: merchantOfferId || null,
            utmSource: ref,
            utmMedium: "affiliate_partner",
            utmCampaign: "creator_referral",
          },
        });
      }
    } catch (e: any) {
      console.warn("Prisma track click fallback:", e.message);
    }

    return NextResponse.json({ ok: true, tracked: true, ref });
  } catch (error) {
    return NextResponse.json({ ok: false });
  }
}
