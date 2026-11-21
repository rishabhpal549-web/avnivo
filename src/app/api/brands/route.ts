import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json({ brands });
  } catch (err: any) {
    console.error("Brands API error:", err);
    return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 });
  }
}
