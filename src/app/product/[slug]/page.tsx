import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "./ProductDetailClient";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { brand: true, category: true },
  });

  if (!product) return { title: "Product Not Found | AVNIVO" };

  return {
    title: `${product.name} – Best Price, Specs & Offers | AVNIVO India`,
    description: `Compare prices for ${product.name} across Amazon, Flipkart, and Croma. Indicative price starting at ₹${product.indicativePrice.toLocaleString("en-IN")}.`,
    openGraph: {
      title: `${product.name} | AVNIVO Price Comparison`,
      description: product.shortDescription || product.description.slice(0, 160),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
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

  if (!product) {
    notFound();
  }

  // Increment view count
  await prisma.product.update({
    where: { id: product.id },
    data: { viewsCount: { increment: 1 } },
  });

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 4,
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
    categoryName: product.category.name,
    categorySlug: product.category.slug,
    parentCategoryName: product.category.parent?.name || null,
    parentCategorySlug: product.category.parent?.slug || null,
    images,
    indicativePrice: product.indicativePrice,
    originalPrice: product.originalPrice,
    discountPercent: product.discountPercent,
    rating: product.rating,
    reviewCount: product.reviewCount,
    specifications,
    keyFeatures,
    availability: product.availability,
    priceLastUpdated: product.priceLastUpdated.toISOString(),
    offers: product.merchantOffers.map((o) => ({
      id: o.id,
      merchantId: o.merchantId,
      merchantName: o.merchant.name,
      merchantSlug: o.merchant.slug,
      merchantLogo: o.merchant.logoUrl,
      affiliateUrl: `/api/affiliate/redirect?offerId=${o.id}`,
      indicativePrice: o.indicativePrice,
      originalPrice: o.originalPrice,
      discountPercent: o.discountPercent,
      availability: o.availability,
      deliveryInfo: o.deliveryInfo,
      lastVerifiedAt: o.lastVerifiedAt.toISOString(),
    })),
    relatedProducts: relatedProducts.map((rp) => {
      let rpImages = [];
      try {
        rpImages = JSON.parse(rp.images);
      } catch {
        rpImages = [rp.images];
      }
      return {
        id: rp.id,
        name: rp.name,
        slug: rp.slug,
        brandName: rp.brand?.name || null,
        image: rpImages[0] || null,
        indicativePrice: rp.indicativePrice,
        originalPrice: rp.originalPrice,
        discountPercent: rp.discountPercent,
        rating: rp.rating,
        reviewCount: rp.reviewCount,
        lowestMerchant: rp.merchantOffers[0]?.merchant.name || "Online Store",
      };
    }),
  };

  // Structured Data (JSON-LD)
  const schemaOrgProduct = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: images,
    description: product.shortDescription || product.description,
    brand: {
      "@type": "Brand",
      name: product.brand?.name || "AVNIVO",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: product.indicativePrice,
      highPrice: product.originalPrice || product.indicativePrice,
      offerCount: product.merchantOffers.length,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgProduct) }}
      />
      <ProductDetailClient product={formattedProduct} />
    </>
  );
}
