import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Domain synonyms for common Indian shopping queries
const SYNONYM_MAP: Record<string, string[]> = {
  phone: ["smartphone", "mobile", "galaxy", "iphone", "oneplus", "5g"],
  phones: ["smartphone", "mobile", "galaxy", "iphone", "oneplus", "5g"],
  smartphone: ["phone", "mobile", "galaxy", "iphone", "oneplus"],
  smartphones: ["phone", "mobile", "galaxy", "iphone", "oneplus"],
  mobile: ["phone", "smartphone", "galaxy", "iphone", "oneplus"],
  mobiles: ["phone", "smartphone", "galaxy", "iphone", "oneplus"],
  laptop: ["macbook", "computer", "notebook", "pc", "m3"],
  laptops: ["macbook", "computer", "notebook", "pc", "m3"],
  macbook: ["laptop", "apple", "m3", "notebook"],
  computer: ["laptop", "macbook", "pc"],
  earbud: ["earbuds", "headphone", "headphones", "audio", "tws", "nirvana"],
  earbuds: ["earbud", "headphone", "headphones", "audio", "tws", "nirvana"],
  headphone: ["headphones", "earbuds", "earbud", "audio", "sony", "wh-1000xm5"],
  headphones: ["headphone", "earbuds", "earbud", "audio", "sony", "wh-1000xm5"],
  audio: ["headphone", "headphones", "earbuds", "earbud", "sound", "speaker"],
  watch: ["smartwatch", "wearable", "colorfit", "noise"],
  watches: ["smartwatch", "wearable", "colorfit", "noise"],
  smartwatch: ["watch", "wearable", "colorfit", "noise"],
  smartwatches: ["watch", "wearable", "colorfit", "noise"],
  shoe: ["shoes", "running", "pegasus", "sneaker", "sneakers", "footwear"],
  shoes: ["shoe", "running", "pegasus", "sneaker", "sneakers", "footwear"],
  sneaker: ["shoes", "shoe", "footwear"],
  sneakers: ["shoes", "shoe", "footwear"],
  cooker: ["prestige", "pressure", "deluxe"],
  fryer: ["philips", "air fryer", "digital"],
  airfryer: ["philips", "air fryer", "digital", "hd9252"],
  luggage: ["american tourister", "trolley", "suitcase", "travel", "ivy"],
  suitcase: ["luggage", "american tourister", "trolley", "travel"],
  trolley: ["luggage", "american tourister", "suitcase", "travel"],
  bag: ["luggage", "backpack", "travel"],
  bags: ["luggage", "backpack", "travel"],
  serum: ["mamaearth", "vitamin c", "glow", "skincare"],
  skincare: ["serum", "mamaearth", "beauty"],
};

function buildDirectTokenFilter(
  term: string,
  brandIdMap: Record<string, string[]> = {},
  categoryIdMap: Record<string, string[]> = {}
) {
  const synonyms = SYNONYM_MAP[term] || [];
  const searchVariants = [term, ...synonyms];

  const orClauses: any[] = [];
  for (const variant of searchVariants) {
    orClauses.push(
      { name: { contains: variant } },
      { description: { contains: variant } },
      { shortDescription: { contains: variant } },
      { slug: { contains: variant } },
      { keyFeatures: { contains: variant } },
      { specifications: { contains: variant } }
    );

    const bIds = brandIdMap[variant];
    if (bIds && bIds.length > 0) {
      orClauses.push({ brandId: { in: bIds } });
    }

    const cIds = categoryIdMap[variant];
    if (cIds && cIds.length > 0) {
      orClauses.push({ categoryId: { in: cIds } });
    }
  }

  return { OR: orClauses };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawQuery = (searchParams.get("q") || "").trim();

    if (!rawQuery || rawQuery.length < 2) {
      return NextResponse.json({
        products: [],
        categories: [],
        brands: [],
      });
    }

    const clean = rawQuery.toLowerCase().replace(/[^\w\s-]/g, " ").trim();
    const tokens = clean.split(/\s+/).filter(Boolean);

    const allVariants = new Set<string>();
    for (const t of tokens) {
      allVariants.add(t);
      const syns = SYNONYM_MAP[t] || [];
      for (const s of syns) allVariants.add(s);
    }
    const variantArray = Array.from(allVariants);

    // Category and Brand search conditions
    const catOrClauses: any[] = [
      { name: { contains: clean } },
      { nameHindi: { contains: clean } },
      { slug: { contains: clean } },
    ];
    for (const t of tokens) {
      catOrClauses.push({ name: { contains: t } });
      catOrClauses.push({ slug: { contains: t } });
    }

    const brandOrClauses: any[] = [
      { name: { contains: clean } },
      { slug: { contains: clean } },
    ];
    for (const t of tokens) {
      brandOrClauses.push({ name: { contains: t } });
      brandOrClauses.push({ slug: { contains: t } });
    }

    // Pre-fetch matching brands and categories to get IDs directly (0 JOINs on Product table)
    const [categories, brands] = await Promise.all([
      prisma.category.findMany({
        where: { OR: catOrClauses },
        take: 4,
        select: {
          id: true,
          name: true,
          slug: true,
        },
      }),
      prisma.brand.findMany({
        where: { OR: brandOrClauses },
        take: 4,
        select: {
          id: true,
          name: true,
          slug: true,
        },
      }),
    ]);

    const brandIdMap: Record<string, string[]> = {};
    const categoryIdMap: Record<string, string[]> = {};
    for (const v of variantArray) {
      brandIdMap[v] = brands
        .filter((b) => b.name.toLowerCase().includes(v) || b.slug.toLowerCase().includes(v))
        .map((b) => b.id);
      categoryIdMap[v] = categories
        .filter((c) => c.name.toLowerCase().includes(v) || c.slug.toLowerCase().includes(v))
        .map((c) => c.id);
    }

    // Build conditions for product search
    let productWhere: any = {};
    if (tokens.length === 1) {
      productWhere = buildDirectTokenFilter(tokens[0], brandIdMap, categoryIdMap);
    } else if (tokens.length > 1) {
      productWhere = {
        AND: tokens.map((token) => buildDirectTokenFilter(token, brandIdMap, categoryIdMap)),
      };
    }

    let products = await prisma.product.findMany({
      where: productWhere,
      take: 6,
      select: {
        id: true,
        name: true,
        slug: true,
        indicativePrice: true,
        originalPrice: true,
        discountPercent: true,
        images: true,
        brand: {
          select: { name: true },
        },
      },
    });

    // Fallback: If strict AND product search yields 0, try OR across tokens
    if (products.length === 0 && tokens.length > 1) {
      products = await prisma.product.findMany({
        where: {
          OR: tokens.map((token) => buildDirectTokenFilter(token, brandIdMap, categoryIdMap)),
        },
        take: 6,
        select: {
          id: true,
          name: true,
          slug: true,
          indicativePrice: true,
          originalPrice: true,
          discountPercent: true,
          images: true,
          brand: {
            select: { name: true },
          },
        },
      });
    }

    const formattedProducts = products.map((p) => {
      let image = "";
      try {
        const imgs = JSON.parse(p.images);
        image = imgs[0] || "";
      } catch {
        image = p.images;
      }
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        brand: p.brand?.name || "",
        indicativePrice: p.indicativePrice,
        originalPrice: p.originalPrice,
        discountPercent: p.discountPercent,
        image,
      };
    });

    return NextResponse.json({
      products: formattedProducts,
      categories,
      brands,
    });
  } catch (err: any) {
    console.error("Search suggestions error:", err);
    return NextResponse.json({ products: [], categories: [], brands: [] });
  }
}
