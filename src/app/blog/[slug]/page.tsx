import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, User, ArrowLeft, Share2, ShieldCheck, Tag } from "lucide-react";
import { AffiliateDisclosureBanner } from "@/components/common/AffiliateDisclosureBanner";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post) return { title: "Article Not Found | AVNIVO" };

  return {
    title: `${post.title} | AVNIVO Buying Guides`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      category: post.category,
      id: { not: post.id },
      published: true,
    },
    take: 3,
  });

  const tags = post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Return link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to all guides</span>
      </Link>

      {/* Category & Title */}
      <div className="space-y-3 mb-8">
        <span className="inline-block px-3 py-1 bg-blue-50 text-secondary text-xs font-bold rounded-full border border-blue-200">
          {post.category}
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-primary font-display leading-tight">
          {post.title}
        </h1>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-2 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-1.5 font-medium text-charcoal">
            <User className="w-4 h-4 text-secondary" />
            <span>{post.authorName}</span>
            {post.authorRole && (
              <span className="text-gray-400">({post.authorRole})</span>
            )}
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTimeMinutes} min read</span>
          </div>
          <span>•</span>
          <span>Updated {new Date(post.updatedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
        </div>
      </div>

      {/* Featured Image */}
      {post.coverImage && (
        <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden bg-surface mb-8 border border-gray-100 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content Body */}
      <div className="prose prose-blue max-w-none text-charcoal leading-relaxed text-sm sm:text-base space-y-4">
        {post.content.split("\n\n").map((paragraph, idx) => {
          if (paragraph.startsWith("## ")) {
            return (
              <h2 key={idx} className="text-xl sm:text-2xl font-bold text-primary font-display pt-4">
                {paragraph.replace("## ", "")}
              </h2>
            );
          }
          if (paragraph.startsWith("### ")) {
            return (
              <h3 key={idx} className="text-lg font-bold text-primary font-display pt-2">
                {paragraph.replace("### ", "")}
              </h3>
            );
          }
          return (
            <p key={idx} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 flex-wrap">
          <Tag className="w-4 h-4 text-gray-400" />
          {tags.map((t, idx) => (
            <span
              key={idx}
              className="text-xs bg-surface text-gray-600 px-3 py-1 rounded-lg border border-gray-200"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* Affiliate Disclosure in Article */}
      <div className="my-10">
        <AffiliateDisclosureBanner />
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h3 className="text-xl font-bold text-primary font-display mb-6">
            Related Guides
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.id}
                href={`/blog/${rp.slug}`}
                className="bg-surface rounded-2xl p-4 border border-gray-200/60 hover:border-secondary transition-colors"
              >
                <h4 className="font-bold text-xs text-primary line-clamp-2 mb-1">
                  {rp.title}
                </h4>
                <p className="text-[11px] text-gray-500 line-clamp-2">
                  {rp.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
