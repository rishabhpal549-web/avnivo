import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      mobile: true,
      role: true,
      isActive: true,
      createdAt: true,
      _count: {
        select: {
          wishlist: true,
          clickLogs: true,
        },
      },
    },
  });

  return NextResponse.json({ users });
}

export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const { id, role, isActive } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: {
        role: role !== undefined ? role : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (err: any) {
    console.error("Update user error:", err);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
