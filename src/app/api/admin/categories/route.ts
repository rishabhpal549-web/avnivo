import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ibrzfiwskfhlkfdjbyfv.supabase.co";
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicnpmaXdza2ZobGtmZGpieWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUyNjY1NjcsImV4cCI6MjExMDg0MjU2N30.XQALfrWAZbazKNZJpbxXAYr9DBr7IUURKE45jjsfF3o";

function getHeaders() {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/Category?select=id,name,nameHindi,slug,description,imageUrl,icon,featured,createdAt,products:Product(count)&order=name.asc`, {
      headers: getHeaders(),
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch categories" }, { status: res.status });
    }

    const categories = await res.json();
    return NextResponse.json({ categories });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to load categories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const { name, nameHindi, description, imageUrl, icon, featured } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const slug = slugify(name);
    const categoryData = {
      name,
      nameHindi: nameHindi || null,
      slug,
      description: description || null,
      imageUrl: imageUrl || null,
      icon: icon || null,
      featured: Boolean(featured),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/Category`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(categoryData),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err || "Failed to create category" }, { status: res.status });
    }

    const created = await res.json();
    return NextResponse.json({ success: true, category: created[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create category" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const { id, name, nameHindi, description, imageUrl, icon, featured } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    const updatePayload: any = {
      updatedAt: new Date().toISOString(),
    };
    if (name) updatePayload.name = name;
    if (nameHindi !== undefined) updatePayload.nameHindi = nameHindi;
    if (description !== undefined) updatePayload.description = description;
    if (imageUrl !== undefined) updatePayload.imageUrl = imageUrl;
    if (icon !== undefined) updatePayload.icon = icon;
    if (featured !== undefined) updatePayload.featured = Boolean(featured);

    const res = await fetch(`${SUPABASE_URL}/rest/v1/Category?id=eq.${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(updatePayload),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err || "Failed to update category" }, { status: res.status });
    }

    const updated = await res.json();
    return NextResponse.json({ success: true, category: updated[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update category" }, { status: 500 });
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

    const res = await fetch(`${SUPABASE_URL}/rest/v1/Category?id=eq.${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to delete category" }, { status: res.status });
    }

    return NextResponse.json({ success: true, message: "Category deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete category" }, { status: 500 });
  }
}
