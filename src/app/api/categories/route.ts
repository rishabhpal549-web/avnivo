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
    console.error("Prisma categories error, using Supabase REST fallback:", err.message);
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ibrzfiwskfhlkfdjbyfv.supabase.co";
      const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicnpmaXdza2ZobGtmZGpieWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUyNjY1NjcsImV4cCI6MjExMDg0MjU2N30.XQALfrWAZbazKNZJpbxXAYr9DBr7IUURKE45jjsfF3o";

      const res = await fetch(
        `${supabaseUrl}/rest/v1/Category?select=id,name,nameHindi,slug,order,parentId&order=order.asc`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          cache: "no-store",
        }
      );
      if (res.ok) {
        const allCats = await res.json();
        const parents = allCats.filter((c: any) => !c.parentId);
        const categories = parents.map((p: any) => ({
          ...p,
          children: allCats.filter((c: any) => c.parentId === p.id),
        }));
        return NextResponse.json({ categories });
      }
    } catch (fallbackErr: any) {
      console.error("Fallback error:", fallbackErr);
    }
    return NextResponse.json({ error: "Failed to fetch categories", details: err.message }, { status: 500 });
  }
}
