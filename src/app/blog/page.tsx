import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Clock, BookOpen, User, ArrowRight, Tag } from "lucide-react";

export const metadata = {
  title: "Buying Guides, Tech Reviews & Smart Shopping Tips | AVNIVO",
  description: "Expert shopping guides, hardware tear-downs, and deal strategies to help you get the best value on electronics, fashion, and home appliances in India.",
};

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  let posts: any[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("BlogIndexPage fetch error:", err);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-secondary text-xs font-bold rounded-full mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>AVNIVO Editorial Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-primary font-display">
          Buying Guides & Expert Reviews
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Unbiased product advice written by tech analysts and category specialists to help you spend smarter.
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all overflow-hidden flex flex-col group"
          >
            {post.coverImage && (
              <div className="h-52 overflow-hidden bg-surface relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-primary/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
            )}

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    <span>{post.authorName}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTimeMinutes} min read</span>
                  </div>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2 mb-2 leading-snug">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-secondary group-hover:translate-x-1 transition-transform flex items-center gap-1"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
