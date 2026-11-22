import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const DEFAULT_BANNERS = [
  {
    id: "banner-1",
    tag: "KITCHEN ESSENTIALS",
    badge: "Under ₹299",
    title: "Smart Kitchen Hacks & Accessories Under ₹299",
    subtitle: "Silicone stretch lids, dual julienne slicers, oil sprayers & budget kitchen helpers with verified offers.",
    ctaText: "Shop Kitchen Deals",
    ctaLink: "/shop?category=kitchen-accessories",
    secondaryText: "All Deals",
    secondaryLink: "/deals",
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    id: "banner-2",
    tag: "DESK & LIVING",
    badge: "Under ₹499",
    title: "Daily Home & Desk Essentials Under ₹499",
    subtitle: "Motion sensor wireless LED lights, aluminum phone stands & self-adhesive cable tidy organizers.",
    ctaText: "Explore Desk Gear",
    ctaLink: "/shop?category=mobile-accessories",
    secondaryText: "Home & Living",
    secondaryLink: "/shop?category=home-living",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    id: "banner-3",
    tag: "FITNESS & LIFESTYLE",
    badge: "Under ₹399",
    title: "Budget Fitness & Daily Life Hacks Under ₹399",
    subtitle: "Color-coded loop resistance bands, adjustable forearm hand grippers & compact 14-in-1 multi-tools.",
    ctaText: "Fitness Accessories",
    ctaLink: "/shop?category=fitness-accessories",
    secondaryText: "Daily Use",
    secondaryLink: "/shop?category=daily-use-products",
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    id: "banner-4",
    tag: "BEST AFFILIATE DEALS",
    badge: "Under ₹199",
    title: "Pocket-Friendly Essentials on Amazon, Flipkart & Meesho",
    subtitle: "Verified discount prices, direct partner links, and honest product specifications without markups.",
    ctaText: "View Deals Under ₹199",
    ctaLink: "/shop?maxPrice=199",
    secondaryText: "Explore All Categories",
    secondaryLink: "/shop",
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&auto=format&fit=crop&q=80",
    active: true,
  },
];

export async function GET() {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "homepage_banners" },
    });

    if (setting) {
      const banners = JSON.parse(setting.value);
      return NextResponse.json({ banners });
    }
  } catch (err: any) {
    console.warn("Banners fetch error:", err.message);
  }

  return NextResponse.json({ banners: DEFAULT_BANNERS });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const { banners } = await req.json();
    if (!Array.isArray(banners)) {
      return NextResponse.json({ error: "Banners must be an array" }, { status: 400 });
    }

    await prisma.siteSetting.upsert({
      where: { key: "homepage_banners" },
      update: { value: JSON.stringify(banners) },
      create: { key: "homepage_banners", value: JSON.stringify(banners) },
    });

    return NextResponse.json({ success: true, banners });
  } catch (err: any) {
    console.error("Save banners error:", err);
    return NextResponse.json({ error: "Failed to save banners" }, { status: 500 });
  }
}
