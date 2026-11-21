import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage?: string | null;
  category: string;
  authorName: string;
  readTimeMinutes: number;
}

interface BlogPreviewSectionProps {
  posts: BlogPostItem[];
}

export function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-14">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs uppercase font-extrabold text-secondary tracking-widest">
            Expert Buying Advice
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary font-display mt-1">
            Latest Buying Guides & Articles
          </h2>
        </div>

        <Link
          href="/blog"
          className="text-xs sm:text-sm font-semibold text-secondary hover:text-secondary-dark flex items-center gap-1 group"
        >
          <span>All Guides</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all overflow-hidden flex flex-col group"
          >
            {post.coverImage && (
              <div className="h-48 overflow-hidden bg-surface relative">
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

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
                  <span>{post.authorName}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTimeMinutes} min read</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1 text-xs font-bold text-secondary group-hover:translate-x-1 transition-transform">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
