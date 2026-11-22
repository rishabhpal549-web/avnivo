import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// In-memory fallback if database migration is pending
const partnersStore = new Map<string, any>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, mobile, upiId, promotionChannel } = body;

    if (!name || !mobile) {
      return NextResponse.json(
        { error: "Name and Mobile number are required" },
        { status: 400 }
      );
    }

    // Generate unique affiliate code: avn_<namePrefix><randomDigits>
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 6) || "user";
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const affiliateCode = `avn_${cleanName}${randomSuffix}`;

    const partnerData = {
      id: "part_" + Date.now(),
      name,
      email: email || `${cleanName}${randomSuffix}@partner.avnivo.in`,
      mobile,
      upiId: upiId || "",
      promotionChannel: promotionChannel || "WhatsApp",
      affiliateCode,
      commissionRate: 8.0, // default 8%
      totalClicks: 0,
      totalOrders: 0,
      totalEarnings: 0,
      pendingPayout: 0,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };

    // Save in memory fallback
    partnersStore.set(affiliateCode, partnerData);

    // Try persisting to Prisma User/click logs if available
    try {
      const existingUser = await prisma.user.findFirst({
        where: { OR: [{ email: partnerData.email }, { mobile: partnerData.mobile }] },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            name: partnerData.name,
            email: partnerData.email,
            mobile: partnerData.mobile,
            passwordHash: "AFFILIATE_PARTNER",
            role: "AFFILIATE_PARTNER",
          },
        });
      }
    } catch (dbErr: any) {
      console.warn("Prisma affiliate partner sync:", dbErr.message);
    }

    return NextResponse.json({
      success: true,
      partner: partnerData,
      message: "Affiliate Partner account activated successfully!",
    });
  } catch (error: any) {
    console.error("Affiliate registration error:", error);
    return NextResponse.json(
      { error: "Failed to register affiliate partner" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Code required" }, { status: 400 });
  }

  const partner = partnersStore.get(code);
  if (!partner) {
    return NextResponse.json({
      found: false,
      message: "Partner code not found in current session",
    });
  }

  return NextResponse.json({ found: true, partner });
}
