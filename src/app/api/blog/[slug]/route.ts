import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
    });

    if (!post || !post.published) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        category: post.category,
        id: { not: post.id },
        published: true,
      },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        coverImage: true,
        summary: true,
        readTimeMinutes: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ post, relatedPosts });
  } catch (err: any) {
    console.error("Single blog error:", err);
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}
