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
    const res = await fetch(`${SUPABASE_URL}/rest/v1/BlogPost?select=*&order=createdAt.desc`, {
      headers: getHeaders(),
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to load blog posts" }, { status: res.status });
    }

    const posts = await res.json();
    return NextResponse.json({ posts });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to load posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { title, category, summary, content, tags, imageUrl, readTime, published } = body;

    if (!title) {
      return NextResponse.json({ error: "Article title is required" }, { status: 400 });
    }

    const slug = `${slugify(title)}-${Date.now().toString().slice(-4)}`;
    const postData = {
      title,
      slug,
      category: category || "Buying Guides",
      summary: summary || "",
      content: content || "",
      tags: tags || "",
      imageUrl: imageUrl || null,
      readTime: readTime ? Number(readTime) : 4,
      published: Boolean(published),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/BlogPost`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(postData),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err || "Failed to create post" }, { status: res.status });
    }

    const created = await res.json();
    return NextResponse.json({ success: true, post: created[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create article" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, title, category, summary, content, tags, imageUrl, readTime, published } = body;

    if (!id) {
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 });
    }

    const updatePayload: any = {
      updatedAt: new Date().toISOString(),
    };
    if (title !== undefined) updatePayload.title = title;
    if (category !== undefined) updatePayload.category = category;
    if (summary !== undefined) updatePayload.summary = summary;
    if (content !== undefined) updatePayload.content = content;
    if (tags !== undefined) updatePayload.tags = tags;
    if (imageUrl !== undefined) updatePayload.imageUrl = imageUrl;
    if (readTime !== undefined) updatePayload.readTime = Number(readTime);
    if (published !== undefined) updatePayload.published = Boolean(published);

    const res = await fetch(`${SUPABASE_URL}/rest/v1/BlogPost?id=eq.${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(updatePayload),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err || "Failed to update article" }, { status: res.status });
    }

    const updated = await res.json();
    return NextResponse.json({ success: true, post: updated[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update article" }, { status: 500 });
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
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 });
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/BlogPost?id=eq.${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to delete article" }, { status: res.status });
    }

    return NextResponse.json({ success: true, message: "Article deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete article" }, { status: 500 });
  }
}
