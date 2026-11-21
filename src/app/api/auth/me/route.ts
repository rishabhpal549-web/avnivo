import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ user: null });
  }

  const user = await prisma.user.findUnique({
    where: { id: currentUser.userId },
    select: {
      id: true,
      name: true,
      email: true,
      mobile: true,
      role: true,
      avatarUrl: true,
      createdAt: true,
      _count: {
        select: {
          wishlist: true,
        },
      },
    },
  });

  return NextResponse.json({ user });
}
