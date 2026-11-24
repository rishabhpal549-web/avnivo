import React, { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductCatalogView } from "@/components/shop/ProductCatalogView";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  let category: any = null;
  try {
    category = await prisma.category.findUnique({
      where: { slug: params.slug },
    });
  } catch {}

  if (!category) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ibrzfiwskfhlkfdjbyfv.supabase.co";
      const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicnpmaXdza2ZobGtmZGpieWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUyNjY1NjcsImV4cCI6MjExMDg0MjU2N30.XQALfrWAZbazKNZJpbxXAYr9DBr7IUURKE45jjsfF3o";

      const res = await fetch(
        `${supabaseUrl}/rest/v1/Category?slug=eq.${encodeURIComponent(params.slug)}&select=id,name,nameHindi,slug,description`,
        {
          headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
          cache: "no-store",
        }
      );
      if (res.ok) {
        const list = await res.json();
        if (list.length > 0) category = list[0];
      }
    } catch {}
  }

  if (!category) return { title: "Category Deals | AVNIVO India" };

  return {
    title: `${category.name} – Best Deals & Price Comparison | AVNIVO`,
    description: category.description || `Compare prices and discover top deals in ${category.name} on AVNIVO.`,
    openGraph: {
      title: `${category.name} | AVNIVO India Deals`,
      description: category.description || `Browse authentic deals in ${category.name} on AVNIVO.`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  let category: any = null;

  try {
    category = await prisma.category.findUnique({
      where: { slug: params.slug },
    });
  } catch (err: any) {
    console.warn("CategoryPage Prisma error, using fallback:", err.message);
  }

  // REST fallback
  if (!category) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ibrzfiwskfhlkfdjbyfv.supabase.co";
      const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicnpmaXdza2ZobGtmZGpieWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUyNjY1NjcsImV4cCI6MjExMDg0MjU2N30.XQALfrWAZbazKNZJpbxXAYr9DBr7IUURKE45jjsfF3o";

      const res = await fetch(
        `${supabaseUrl}/rest/v1/Category?slug=eq.${encodeURIComponent(params.slug)}&select=id,name,nameHindi,slug,description`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          cache: "no-store",
        }
      );
      if (res.ok) {
        const list = await res.json();
        if (list.length > 0) category = list[0];
      }
    } catch (e) {
      console.error("Category fallback error:", e);
    }
  }

  if (!category) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-gray-400">Loading category...</div>}>
      <ProductCatalogView
        initialCategorySlug={category.slug}
        pageTitle={category.name}
        pageDescription={category.description || `Browse and compare verified prices in ${category.name}.`}
      />
    </Suspense>
  );
}
