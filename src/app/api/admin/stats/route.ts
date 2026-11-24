import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ibrzfiwskfhlkfdjbyfv.supabase.co";
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicnpmaXdza2ZobGtmZGpieWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUyNjY1NjcsImV4cCI6MjExMDg0MjU2N30.XQALfrWAZbazKNZJpbxXAYr9DBr7IUURKE45jjsfF3o";

async function getCount(table: string, filter = ""): Promise<number> {
  try {
    const query = filter ? `?${filter}&select=id` : "?select=id";
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "count=exact",
        Range: "0-0",
      },
      cache: "no-store",
    });
    const contentRange = res.headers.get("content-range");
    if (contentRange) {
      const parts = contentRange.split("/");
      if (parts[1]) return parseInt(parts[1], 10);
    }
    return 0;
  } catch {
    return 0;
  }
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const now = new Date();
    // Today start (midnight IST)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayIso = today.toISOString();

    // 7 days ago
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekIso = weekAgo.toISOString();

    // Month start (1st of current month)
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthIso = monthStart.toISOString();

    const [
      totalProducts,
      publishedProducts,
      draftProducts,
      totalCategories,
      totalMerchants,
      totalUsers,
      totalClicks,
      clicksToday,
      clicksThisWeek,
      clicksThisMonth,
      pendingInquiries,
    ] = await Promise.all([
      getCount("Product"),
      getCount("Product", "availability=neq.UNPUBLISHED"),
      getCount("Product", "availability=eq.UNPUBLISHED"),
      getCount("Category"),
      getCount("Merchant"),
      getCount("User"),
      getCount("AffiliateClickLog"),
      getCount("AffiliateClickLog", `createdAt=gte.${todayIso}`),
      getCount("AffiliateClickLog", `createdAt=gte.${weekIso}`),
      getCount("AffiliateClickLog", `createdAt=gte.${monthIso}`),
      getCount("SupportInquiry", "status=eq.PENDING"),
    ]);

    // Fetch top clicked products
    let topClickedProducts: any[] = [];
    try {
      const topRes = await fetch(
        `${SUPABASE_URL}/rest/v1/Product?select=id,name,slug,clicksCount,viewsCount,indicativePrice,availability,category:Category(name)&order=clicksCount.desc&limit=6`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          cache: "no-store",
        }
      );
      if (topRes.ok) {
        topClickedProducts = await topRes.json();
      }
    } catch (e) {
      console.warn("Top products fetch error:", e);
    }

    // Fetch merchants and calculate outbound click distribution
    let merchantClicks: any[] = [];
    try {
      const [merchRes, clicksRes] = await Promise.all([
        fetch(`${SUPABASE_URL}/rest/v1/Merchant?select=id,name,slug`, {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
          cache: "no-store",
        }),
        fetch(`${SUPABASE_URL}/rest/v1/AffiliateClickLog?select=merchantId`, {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
          cache: "no-store",
        }),
      ]);

      if (merchRes.ok) {
        const merchants = await merchRes.json();
        const logs = clicksRes.ok ? await clicksRes.json() : [];

        merchantClicks = merchants.map((m: any) => {
          const count = logs.filter((l: any) => l.merchantId === m.id).length;
          return {
            id: m.id,
            name: m.name,
            slug: m.slug,
            clicks: count,
          };
        });
      }
    } catch (e) {
      console.warn("Merchants fetch error:", e);
    }

    // Fetch recent 10 click activity logs
    let recentClicks: any[] = [];
    try {
      const recentRes = await fetch(
        `${SUPABASE_URL}/rest/v1/AffiliateClickLog?select=id,createdAt,utmSource,utmCampaign,product:Product(name,slug),merchant:Merchant(name)&order=createdAt.desc&limit=10`,
        {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
          cache: "no-store",
        }
      );
      if (recentRes.ok) {
        recentClicks = await recentRes.json();
      }
    } catch (e) {
      console.warn("Recent clicks fetch error:", e);
    }

    return NextResponse.json({
      stats: {
        totalProducts,
        publishedProducts,
        draftProducts,
        totalCategories,
        totalMerchants,
        totalUsers,
        totalClicks,
        clicksToday,
        clicksThisWeek,
        clicksThisMonth,
        pendingInquiries,
      },
      merchantClicks,
      topClickedProducts,
      recentClicks,
    });
  } catch (err: any) {
    console.error("Admin stats error:", err);
    return NextResponse.json({ error: "Failed to fetch admin stats" }, { status: 500 });
  }
}
