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
    const [
      totalProducts,
      totalCategories,
      totalMerchants,
      totalUsers,
      totalClicks,
      pendingInquiries,
    ] = await Promise.all([
      getCount("Product"),
      getCount("Category"),
      getCount("Merchant"),
      getCount("User"),
      getCount("AffiliateClickLog"),
      getCount("SupportInquiry", "status=eq.PENDING"),
    ]);

    // Fetch top clicked products
    let topClickedProducts: any[] = [];
    try {
      const topRes = await fetch(
        `${SUPABASE_URL}/rest/v1/Product?select=id,name,slug,clicksCount,viewsCount,indicativePrice&order=clicksCount.desc&limit=5`,
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

    // Fetch merchants for clicks breakdown
    let merchantClicks: any[] = [];
    try {
      const merchRes = await fetch(`${SUPABASE_URL}/rest/v1/Merchant?select=id,name,slug`, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        cache: "no-store",
      });
      if (merchRes.ok) {
        const merchants = await merchRes.json();
        merchantClicks = merchants.map((m: any) => ({
          id: m.id,
          name: m.name,
          slug: m.slug,
          clicks: 0,
        }));
      }
    } catch (e) {
      console.warn("Merchants fetch error:", e);
    }

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
      recentClicks: [],
    });
  } catch (err: any) {
    console.error("Admin stats error:", err);
    return NextResponse.json({ error: "Failed to fetch admin stats" }, { status: 500 });
  }
}
