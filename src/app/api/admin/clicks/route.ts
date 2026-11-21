import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  const clicks = await prisma.affiliateClickLog.findMany({
    take: 100,
    orderBy: { createdAt: "desc" },
    include: {
      product: { select: { id: true, name: true, slug: true } },
      merchant: { select: { id: true, name: true } },
      user: { select: { id: true, name: true, email: true } },
    },
  });

  return NextResponse.json({ clicks });
}
