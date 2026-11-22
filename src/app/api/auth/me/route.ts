import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ user: null });
  }

  try {
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

    if (user) {
      return NextResponse.json({ user });
    }
  } catch (err: any) {
    console.warn("User fetch error:", err.message);
  }

  // Graceful fallback from verified JWT payload
  return NextResponse.json({
    user: {
      id: currentUser.userId,
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
      mobile: null,
      avatarUrl: null,
      createdAt: new Date().toISOString(),
      _count: { wishlist: 0 },
    },
  });
}
