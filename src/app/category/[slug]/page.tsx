import React, { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductCatalogView } from "@/components/shop/ProductCatalogView";

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) return { title: "Category Not Found | AVNIVO" };

  return {
    title: `${category.name} – Best Deals & Price Comparison | AVNIVO`,
    description: category.description || `Compare prices and discover top deals in ${category.name} on AVNIVO.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

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
