import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const [
      totalProducts,
      totalCategories,
      totalMerchants,
      totalUsers,
      totalClicks,
      pendingInquiries,
      recentClicks,
      topClickedProducts,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.merchant.count(),
      prisma.user.count(),
      prisma.affiliateClickLog.count(),
      prisma.supportInquiry.count({ where: { status: "PENDING" } }),
      prisma.affiliateClickLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          product: { select: { name: true, slug: true } },
          merchant: { select: { name: true } },
          user: { select: { email: true } },
        },
      }),
      prisma.product.findMany({
        take: 5,
        orderBy: { clicksCount: "desc" },
        select: {
          id: true,
          name: true,
          slug: true,
          clicksCount: true,
          viewsCount: true,
          indicativePrice: true,
        },
      }),
    ]);

    // Merchant click distribution
    const merchantDistribution = await prisma.affiliateClickLog.groupBy({
      by: ["merchantId"],
      _count: {
        id: true,
      },
    });

    const merchants = await prisma.merchant.findMany();
    const merchantClicks = merchants.map((m) => {
      const found = merchantDistribution.find((d) => d.merchantId === m.id);
      return {
        id: m.id,
        name: m.name,
        clicks: found ? found._count.id : 0,
      };
    });

    return NextResponse.json({
      stats: {
        totalProducts,
        totalCategories,
        totalMerchants,
        totalUsers,
        totalClicks,
        pendingInquiries,
      },
      merchantClicks,
      topClickedProducts,
      recentClicks,
    });
  } catch (err: any) {
    console.error("Admin stats error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
