import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const { name, nameHindi, description, imageUrl, icon, parentId, featured } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    let slug = slugify(name);
    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const category = await prisma.category.create({
      data: {
        name,
        nameHindi: nameHindi || null,
        slug,
        description,
        imageUrl,
        icon,
        parentId: parentId || null,
        featured: Boolean(featured),
      },
    });

    return NextResponse.json({ success: true, category });
  } catch (err: any) {
    console.error("Create category error:", err);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Category deleted" });
  } catch (err: any) {
    console.error("Delete category error:", err);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
