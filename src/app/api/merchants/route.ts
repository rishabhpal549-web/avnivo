import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const merchants = await prisma.merchant.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        logoUrl: true,
        websiteUrl: true,
      },
    });
    return NextResponse.json({ merchants });
  } catch (err: any) {
    // Fallback static list of approved Indian merchants
    return NextResponse.json({
      merchants: [
        { id: "cmwo8zrh50002banpurmp9ji8", name: "Amazon India", slug: "amazon-india", websiteUrl: "https://www.amazon.in" },
        { id: "cmwo8zrhc0003banplxvmvqhp", name: "Flipkart", slug: "flipkart", websiteUrl: "https://www.flipkart.com" },
        { id: "m-meesho-01", name: "Meesho", slug: "meesho", websiteUrl: "https://www.meesho.com" },
        { id: "cmwo8zrho0004banpspk21ru2", name: "Croma", slug: "croma", websiteUrl: "https://www.croma.com" },
      ],
    });
  }
}
