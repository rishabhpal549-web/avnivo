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

/**
 * Direct column matching - avoids SQLite 64 table join limit
 */
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
    const categorySlug = searchParams.get("category");
    const brandSlug = searchParams.get("brand");
    const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;
    const minRating = searchParams.get("minRating") ? parseFloat(searchParams.get("minRating")!) : undefined;
    const minDiscount = searchParams.get("minDiscount") ? parseFloat(searchParams.get("minDiscount")!) : undefined;
    const merchantSlug = searchParams.get("merchant");
    const sort = searchParams.get("sort") || "popular"; // popular, newest, price_asc, price_desc, discount, rating
    const isFeatured = searchParams.get("featured") === "true";
    const isTrending = searchParams.get("trending") === "true";
    const isBestDeal = searchParams.get("bestDeal") === "true";
    const isTopPick = searchParams.get("topPick") === "true";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "12", 10)));
    const skip = (page - 1) * limit;

    // Independent conditions joined by AND
    const andConditions: any[] = [];
    let brandIdMap: Record<string, string[]> = {};
    let categoryIdMap: Record<string, string[]> = {};

    // 1. Search Query with Multi-word Tokenization and Zero-Join optimization
    if (rawQuery) {
      const clean = rawQuery.toLowerCase().replace(/[^\w\s-]/g, " ").trim();
      const tokens = clean.split(/\s+/).filter(Boolean);

      const allVariants = new Set<string>();
      for (const t of tokens) {
        allVariants.add(t);
        const syns = SYNONYM_MAP[t] || [];
        for (const s of syns) allVariants.add(s);
      }
      const variantArray = Array.from(allVariants);

      // Pre-fetch matching brands and categories to get IDs directly (0 JOINs on Product table)
      const [matchedBrands, matchedCategories] = await Promise.all([
        prisma.brand.findMany({
          where: {
            OR: variantArray.map((v) => ({ name: { contains: v } })),
          },
          select: { id: true, name: true, slug: true },
        }),
        prisma.category.findMany({
          where: {
            OR: variantArray.flatMap((v) => [
              { name: { contains: v } },
              { nameHindi: { contains: v } },
              { slug: { contains: v } },
            ]),
          },
          select: { id: true, name: true, slug: true },
        }),
      ]);

      for (const v of variantArray) {
        brandIdMap[v] = matchedBrands
          .filter((b) => b.name.toLowerCase().includes(v) || b.slug.toLowerCase().includes(v))
          .map((b) => b.id);
        categoryIdMap[v] = matchedCategories
          .filter((c) => c.name.toLowerCase().includes(v) || c.slug.toLowerCase().includes(v))
          .map((c) => c.id);
      }

      if (tokens.length === 1) {
        andConditions.push(buildDirectTokenFilter(tokens[0], brandIdMap, categoryIdMap));
      } else if (tokens.length > 1) {
        andConditions.push({
          AND: tokens.map((t) => buildDirectTokenFilter(t, brandIdMap, categoryIdMap)),
        });
      }
    }

    // 2. Category Filter (Does NOT overwrite search query)
    if (categorySlug) {
      const cat = await prisma.category.findUnique({
        where: { slug: categorySlug },
        include: { children: { select: { id: true } } },
      });
      if (cat) {
        const allowedCatIds = [cat.id, ...cat.children.map((c) => c.id)];
        andConditions.push({ categoryId: { in: allowedCatIds } });
      }
    }

    // 3. Brand Filter
    if (brandSlug) {
      const b = await prisma.brand.findUnique({ where: { slug: brandSlug }, select: { id: true } });
      if (b) {
        andConditions.push({ brandId: b.id });
      }
    }

    // 4. Price Min/Max
    if (minPrice !== undefined || maxPrice !== undefined) {
      const priceFilter: any = {};
      if (minPrice !== undefined) priceFilter.gte = minPrice;
      if (maxPrice !== undefined) priceFilter.lte = maxPrice;
      andConditions.push({ indicativePrice: priceFilter });
    }

    // 5. Min Rating
    if (minRating !== undefined) {
      andConditions.push({ rating: { gte: minRating } });
    }

    // 6. Min Discount
    if (minDiscount !== undefined) {
      andConditions.push({ discountPercent: { gte: minDiscount } });
    }

    // 7. Merchant Filter
    if (merchantSlug) {
      andConditions.push({
        merchantOffers: {
          some: {
            merchant: { slug: merchantSlug },
            isActive: true,
          },
        },
      });
    }

    // 8. Badges & Featured status
    if (isFeatured) andConditions.push({ isFeatured: true });
    if (isTrending) andConditions.push({ isTrending: true });
    if (isBestDeal) andConditions.push({ isBestDeal: true });
    if (isTopPick) andConditions.push({ isTopPick: true });

    const where: any = andConditions.length > 0 ? { AND: andConditions } : {};

    // Sorting
    let orderBy: any = { viewsCount: "desc" };
    if (sort === "newest") orderBy = { createdAt: "desc" };
    else if (sort === "price_asc") orderBy = { indicativePrice: "asc" };
    else if (sort === "price_desc") orderBy = { indicativePrice: "desc" };
    else if (sort === "discount") orderBy = { discountPercent: "desc" };
    else if (sort === "rating") orderBy = { rating: "desc" };

    let [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          brand: true,
          category: {
            select: { id: true, name: true, nameHindi: true, slug: true },
          },
          merchantOffers: {
            where: { isActive: true },
            orderBy: { indicativePrice: "asc" },
            include: {
              merchant: {
                select: { id: true, name: true, slug: true, logoUrl: true },
              },
            },
          },
        },
      }),
    ]);

    // Fallback: If a strict multi-word search returned 0 results, try broader OR matching
    if (total === 0 && rawQuery && rawQuery.includes(" ")) {
      const clean = rawQuery.toLowerCase().replace(/[^\w\s-]/g, " ").trim();
      const tokens = clean.split(/\s+/).filter(Boolean);
      if (tokens.length > 1) {
        const fallbackAndConditions = andConditions.filter((c) => !c.AND);
        fallbackAndConditions.push({
          OR: tokens.map((t) => buildDirectTokenFilter(t, brandIdMap, categoryIdMap)),
        });

        const fallbackWhere = { AND: fallbackAndConditions };
        const [fallbackTotal, fallbackProducts] = await Promise.all([
          prisma.product.count({ where: fallbackWhere }),
          prisma.product.findMany({
            where: fallbackWhere,
            orderBy,
            skip,
            take: limit,
            include: {
              brand: true,
              category: {
                select: { id: true, name: true, nameHindi: true, slug: true },
              },
              merchantOffers: {
                where: { isActive: true },
                orderBy: { indicativePrice: "asc" },
                include: {
                  merchant: {
                    select: { id: true, name: true, slug: true, logoUrl: true },
                  },
                },
              },
            },
          }),
        ]);

        if (fallbackTotal > 0) {
          total = fallbackTotal;
          products = fallbackProducts;
        }
      }
    }

    // Format products for frontend consumption
    const formattedProducts = products.map((p) => {
      let images = [];
      try {
        images = JSON.parse(p.images);
      } catch {
        images = [p.images];
      }

      let keyFeatures = [];
      try {
        keyFeatures = JSON.parse(p.keyFeatures);
      } catch {
        keyFeatures = [];
      }

      let specifications = {};
      try {
        specifications = JSON.parse(p.specifications);
      } catch {
        specifications = {};
      }

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        shortDescription: p.shortDescription,
        brandName: p.brand?.name || null,
        categoryName: p.category.name,
        categoryNameHindi: p.category.nameHindi,
        categorySlug: p.category.slug,
        images,
        indicativePrice: p.indicativePrice,
        originalPrice: p.originalPrice,
        discountPercent: p.discountPercent,
        rating: p.rating,
        reviewCount: p.reviewCount,
        isVerifiedRating: p.isVerifiedRating,
        specifications,
        keyFeatures,
        isFeatured: p.isFeatured,
        isTrending: p.isTrending,
        isBestDeal: p.isBestDeal,
        isTopPick: p.isTopPick,
        availability: p.availability,
        priceLastUpdated: p.priceLastUpdated,
        offers: p.merchantOffers.map((o) => ({
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
          lastVerifiedAt: o.lastVerifiedAt,
        })),
      };
    });

    return NextResponse.json({
      query: rawQuery,
      products: formattedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err: any) {
    console.error("Products API error:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
