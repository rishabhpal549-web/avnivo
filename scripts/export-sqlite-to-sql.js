const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

function escapeSql(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return val;
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (val instanceof Date) return `'${val.toISOString()}'`;
  return `'${String(val).replace(/'/g, "''")}'`;
}

async function run() {
  const users = await prisma.user.findMany();
  const categories = await prisma.category.findMany();
  const brands = await prisma.brand.findMany();
  const merchants = await prisma.merchant.findMany();
  const products = await prisma.product.findMany();
  const offers = await prisma.merchantOffer.findMany();
  const blogPosts = await prisma.blogPost.findMany();

  let sqlStatements = [];

  // 1. Users
  for (const u of users) {
    sqlStatements.push(`INSERT INTO "User" ("id", "name", "email", "mobile", "passwordHash", "role", "emailVerified", "avatarUrl", "isActive", "createdAt", "updatedAt") VALUES (${escapeSql(u.id)}, ${escapeSql(u.name)}, ${escapeSql(u.email)}, ${escapeSql(u.mobile)}, ${escapeSql(u.passwordHash)}, ${escapeSql(u.role)}, ${escapeSql(u.emailVerified)}, ${escapeSql(u.avatarUrl)}, ${escapeSql(u.isActive)}, ${escapeSql(u.createdAt)}, ${escapeSql(u.updatedAt)}) ON CONFLICT ("id") DO NOTHING;`);
  }

  // 2. Categories (parents first, then children)
  const parents = categories.filter(c => !c.parentId);
  const children = categories.filter(c => c.parentId);

  for (const c of [...parents, ...children]) {
    sqlStatements.push(`INSERT INTO "Category" ("id", "name", "nameHindi", "slug", "description", "imageUrl", "icon", "parentId", "featured", "order", "createdAt", "updatedAt") VALUES (${escapeSql(c.id)}, ${escapeSql(c.name)}, ${escapeSql(c.nameHindi)}, ${escapeSql(c.slug)}, ${escapeSql(c.description)}, ${escapeSql(c.imageUrl)}, ${escapeSql(c.icon)}, ${escapeSql(c.parentId)}, ${escapeSql(c.featured)}, ${escapeSql(c.order)}, ${escapeSql(c.createdAt)}, ${escapeSql(c.updatedAt)}) ON CONFLICT ("id") DO NOTHING;`);
  }

  // 3. Brands
  for (const b of brands) {
    sqlStatements.push(`INSERT INTO "Brand" ("id", "name", "slug", "logoUrl", "featured", "createdAt", "updatedAt") VALUES (${escapeSql(b.id)}, ${escapeSql(b.name)}, ${escapeSql(b.slug)}, ${escapeSql(b.logoUrl)}, ${escapeSql(b.featured)}, ${escapeSql(b.createdAt)}, ${escapeSql(b.updatedAt)}) ON CONFLICT ("id") DO NOTHING;`);
  }

  // 4. Merchants
  for (const m of merchants) {
    sqlStatements.push(`INSERT INTO "Merchant" ("id", "name", "slug", "logoUrl", "websiteUrl", "affiliateProgramName", "isActive", "createdAt", "updatedAt") VALUES (${escapeSql(m.id)}, ${escapeSql(m.name)}, ${escapeSql(m.slug)}, ${escapeSql(m.logoUrl)}, ${escapeSql(m.websiteUrl)}, ${escapeSql(m.affiliateProgramName)}, ${escapeSql(m.isActive)}, ${escapeSql(m.createdAt)}, ${escapeSql(m.updatedAt)}) ON CONFLICT ("id") DO NOTHING;`);
  }

  // 5. Products
  for (const p of products) {
    sqlStatements.push(`INSERT INTO "Product" ("id", "name", "slug", "description", "shortDescription", "brandId", "categoryId", "images", "indicativePrice", "originalPrice", "discountPercent", "rating", "reviewCount", "isVerifiedRating", "specifications", "keyFeatures", "isFeatured", "isTrending", "isBestDeal", "isTopPick", "isNewArrival", "availability", "priceLastUpdated", "viewsCount", "clicksCount", "metaTitle", "metaDescription", "createdAt", "updatedAt") VALUES (${escapeSql(p.id)}, ${escapeSql(p.name)}, ${escapeSql(p.slug)}, ${escapeSql(p.description)}, ${escapeSql(p.shortDescription)}, ${escapeSql(p.brandId)}, ${escapeSql(p.categoryId)}, ${escapeSql(p.images)}, ${escapeSql(p.indicativePrice)}, ${escapeSql(p.originalPrice)}, ${escapeSql(p.discountPercent)}, ${escapeSql(p.rating)}, ${escapeSql(p.reviewCount)}, ${escapeSql(p.isVerifiedRating)}, ${escapeSql(p.specifications)}, ${escapeSql(p.keyFeatures)}, ${escapeSql(p.isFeatured)}, ${escapeSql(p.isTrending)}, ${escapeSql(p.isBestDeal)}, ${escapeSql(p.isTopPick)}, ${escapeSql(p.isNewArrival)}, ${escapeSql(p.availability)}, ${escapeSql(p.priceLastUpdated)}, ${escapeSql(p.viewsCount)}, ${escapeSql(p.clicksCount)}, ${escapeSql(p.metaTitle)}, ${escapeSql(p.metaDescription)}, ${escapeSql(p.createdAt)}, ${escapeSql(p.updatedAt)}) ON CONFLICT ("id") DO NOTHING;`);
  }

  // 6. MerchantOffers
  for (const o of offers) {
    sqlStatements.push(`INSERT INTO "MerchantOffer" ("id", "productId", "merchantId", "affiliateUrl", "indicativePrice", "originalPrice", "discountPercent", "availability", "deliveryInfo", "lastVerifiedAt", "isActive", "clickCount", "createdAt", "updatedAt") VALUES (${escapeSql(o.id)}, ${escapeSql(o.productId)}, ${escapeSql(o.merchantId)}, ${escapeSql(o.affiliateUrl)}, ${escapeSql(o.indicativePrice)}, ${escapeSql(o.originalPrice)}, ${escapeSql(o.discountPercent)}, ${escapeSql(o.availability)}, ${escapeSql(o.deliveryInfo)}, ${escapeSql(o.lastVerifiedAt)}, ${escapeSql(o.isActive)}, ${escapeSql(o.clickCount)}, ${escapeSql(o.createdAt)}, ${escapeSql(o.updatedAt)}) ON CONFLICT ("id") DO NOTHING;`);
  }

  // 7. BlogPosts
  for (const bp of blogPosts) {
    sqlStatements.push(`INSERT INTO "BlogPost" ("id", "title", "slug", "summary", "content", "coverImage", "category", "authorName", "authorRole", "readTimeMinutes", "tags", "published", "metaTitle", "metaDescription", "createdAt", "updatedAt") VALUES (${escapeSql(bp.id)}, ${escapeSql(bp.title)}, ${escapeSql(bp.slug)}, ${escapeSql(bp.summary)}, ${escapeSql(bp.content)}, ${escapeSql(bp.coverImage)}, ${escapeSql(bp.category)}, ${escapeSql(bp.authorName)}, ${escapeSql(bp.authorRole)}, ${escapeSql(bp.readTimeMinutes)}, ${escapeSql(bp.tags)}, ${escapeSql(bp.published)}, ${escapeSql(bp.metaTitle)}, ${escapeSql(bp.metaDescription)}, ${escapeSql(bp.createdAt)}, ${escapeSql(bp.updatedAt)}) ON CONFLICT ("id") DO NOTHING;`);
  }

  fs.writeFileSync('prisma/supabase_data.sql', sqlStatements.join('\n'));
  console.log(`Generated prisma/supabase_data.sql with ${sqlStatements.length} insert statements.`);
  await prisma.$disconnect();
}

run().catch(console.error);
