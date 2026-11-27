import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "./ProductDetailClient";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps) {
  let product: any = null;
  try {
    product = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: { brand: true, category: true },
    });
  } catch {
    // metadata fallback
  }

  if (!product) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ibrzfiwskfhlkfdjbyfv.supabase.co";
      const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicnpmaXdza2ZobGtmZGpieWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUyNjY1NjcsImV4cCI6MjExMDg0MjU2N30.XQALfrWAZbazKNZJpbxXAYr9DBr7IUURKE45jjsfF3o";

      const res = await fetch(
        `${supabaseUrl}/rest/v1/Product?slug=eq.${encodeURIComponent(params.slug)}&select=name,description,shortDescription,indicativePrice,originalPrice,images`,
        {
          headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
          cache: "no-store",
        }
      );
      if (res.ok) {
        const list = await res.json();
        if (list.length > 0) product = list[0];
      }
    } catch {}
  }

  if (!product) {
    return { title: "Product Detail | AVNIVO India" };
  }

  let ogImage = "";
  try {
    const parsed = JSON.parse(product.images);
    ogImage = parsed[0] || "";
  } catch {
    ogImage = product.images || "";
  }

  return {
    title: `${product.name} – Indicative Price & Genuine Deals | AVNIVO India`,
    description: `Discover deals for ${product.name}. Indicative price starting at ₹${product.indicativePrice.toLocaleString("en-IN")} on Amazon, Flipkart & Meesho.`,
    openGraph: {
      title: `${product.name} | AVNIVO Deals`,
      description: product.shortDescription || product.description?.slice(0, 160),
      images: ogImage ? [{ url: ogImage, width: 800, height: 800, alt: product.name }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  let product: any = null;
  let relatedProductsRaw: any[] = [];

  try {
    product = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: {
        brand: true,
        category: {
          include: { parent: true },
        },
        merchantOffers: {
          where: { isActive: true },
          orderBy: { indicativePrice: "asc" },
          include: { merchant: true },
        },
      },
    });

    if (product) {
      await prisma.product.update({
        where: { id: product.id },
        data: { viewsCount: { increment: 1 } },
      }).catch(() => {});

      relatedProductsRaw = await prisma.product.findMany({
        where: {
          categoryId: product.categoryId,
          id: { not: product.id },
        },
        take: 6,
        include: {
          brand: true,
          merchantOffers: {
            where: { isActive: true },
            orderBy: { indicativePrice: "asc" },
            take: 1,
            include: { merchant: true },
          },
        },
      });
    }
  } catch (err: any) {
    console.warn("ProductPage Prisma error, trying REST fallback:", err.message);
  }

  // Supabase REST Fallback if Prisma was unavailable
  if (!product) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ibrzfiwskfhlkfdjbyfv.supabase.co";
      const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicnpmaXdza2ZobGtmZGpieWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUyNjY1NjcsImV4cCI6MjExMDg0MjU2N30.XQALfrWAZbazKNZJpbxXAYr9DBr7IUURKE45jjsfF3o";

      const res = await fetch(
        `${supabaseUrl}/rest/v1/Product?slug=eq.${encodeURIComponent(params.slug)}&select=id,name,slug,description,shortDescription,indicativePrice,originalPrice,discountPercent,rating,reviewCount,isVerifiedRating,images,keyFeatures,specifications,availability,priceLastUpdated,brand:Brand(name),category:Category(name,slug),merchantOffers:MerchantOffer(id,merchantId,affiliateUrl,indicativePrice,originalPrice,discountPercent,availability,deliveryInfo,lastVerifiedAt,merchant:Merchant(id,name,slug,logoUrl))`,
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
        if (list.length > 0) {
          product = list[0];
        }
      }
    } catch (e) {
      console.error("Product REST fallback error:", e);
    }
  }

  if (!product) {
    notFound();
  }

  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {
    images = [product.images];
  }

  let specifications = {};
  try {
    specifications = JSON.parse(product.specifications);
  } catch {
    specifications = {};
  }

  let keyFeatures = [];
  try {
    keyFeatures = JSON.parse(product.keyFeatures);
  } catch {
    keyFeatures = [];
  }

  const formattedProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    shortDescription: product.shortDescription,
    brandName: product.brand?.name || null,
    categoryName: product.category?.name || "Accessories",
    categorySlug: product.category?.slug || "accessories",
    parentCategoryName: product.category?.parent?.name || null,
    parentCategorySlug: product.category?.parent?.slug || null,
    images,
    indicativePrice: product.indicativePrice,
    originalPrice: product.originalPrice,
    discountPercent: product.discountPercent,
    rating: product.rating || 4.4,
    reviewCount: product.reviewCount || 120,
    isVerifiedRating: product.isVerifiedRating ?? true,
    specifications,
    keyFeatures,
    availability: product.availability || "IN_STOCK",
    priceLastUpdated: product.priceLastUpdated || new Date().toISOString(),
    offers: (product.merchantOffers || []).map((o: any) => ({
      id: o.id,
      merchantId: o.merchantId || o.merchant?.id,
      merchantName: o.merchant?.name || "Partner Store",
      merchantSlug: o.merchant?.slug || "store",
      merchantLogo: o.merchant?.logoUrl || "/merchants/amazon.svg",
      affiliateUrl: o.affiliateUrl?.startsWith("http")
        ? `/api/affiliate/redirect?offerId=${o.id}&to=${encodeURIComponent(o.affiliateUrl)}`
        : o.affiliateUrl || "#",
      indicativePrice: o.indicativePrice,
      originalPrice: o.originalPrice,
      discountPercent: o.discountPercent,
      availability: o.availability || "IN_STOCK",
      deliveryInfo: o.deliveryInfo || "Free Delivery",
      lastVerifiedAt: o.lastVerifiedAt || new Date().toISOString(),
    })),
  };

  const formattedRelated = relatedProductsRaw.map((p: any) => {
    let relImages = [];
    try {
      relImages = JSON.parse(p.images);
    } catch {
      relImages = [p.images];
    }
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      brandName: p.brand?.name || null,
      images: relImages,
      indicativePrice: p.indicativePrice,
      originalPrice: p.originalPrice,
      discountPercent: p.discountPercent,
      rating: p.rating,
      reviewCount: p.reviewCount,
      offers: (p.merchantOffers || []).map((o: any) => ({
        merchantName: o.merchant?.name || "Merchant",
        indicativePrice: o.indicativePrice,
        affiliateUrl: o.affiliateUrl?.startsWith("http")
          ? `/api/affiliate/redirect?offerId=${o.id}&to=${encodeURIComponent(o.affiliateUrl)}`
          : `/api/affiliate/redirect?offerId=${o.id}`,
      })),
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: formattedProduct.name,
    image: formattedProduct.images,
    description: formattedProduct.shortDescription || formattedProduct.description?.slice(0, 200),
    sku: formattedProduct.slug,
    brand: {
      "@type": "Brand",
      name: formattedProduct.brandName || "AVNIVO Curated",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: formattedProduct.indicativePrice,
      highPrice: formattedProduct.originalPrice || formattedProduct.indicativePrice,
      offerCount: formattedProduct.offers.length || 1,
      availability:
        formattedProduct.availability === "IN_STOCK"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: formattedProduct.rating,
      reviewCount: formattedProduct.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient
        product={formattedProduct}
        relatedProducts={formattedRelated}
      />
    </>
  );
}
