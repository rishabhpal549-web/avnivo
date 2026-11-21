import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { parentId: null },
      orderBy: { order: "asc" },
      include: {
        children: {
          orderBy: { order: "asc" },
          select: {
            id: true,
            name: true,
            nameHindi: true,
            slug: true,
          },
        },
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json({ categories });
  } catch (err: any) {
    console.error("Categories API error:", err);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
