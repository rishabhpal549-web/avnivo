const http = require("http");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

async function runTests() {
  console.log("==================================================");
  console.log("🚀 AVNIVO PLATFORM COMPREHENSIVE VERIFICATION SUITE");
  console.log("==================================================");

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Database Schema & Data Integrity Tests
    console.log("\n[1/4] Testing Database & Entity Relational Integrity...");
    const userCount = await prisma.user.count();
    assert(userCount >= 2, `Users count is ${userCount} (Admin + Demo User)`);

    const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    assert(admin !== null && admin.email === "admin@avnivo.com", "Admin account verified with ADMIN role");

    const categoryCount = await prisma.category.count();
    assert(categoryCount >= 8, `Categories count is ${categoryCount} (8 Master Categories + Subcategories)`);

    const merchantCount = await prisma.merchant.count();
    assert(merchantCount >= 4, `Merchants count is ${merchantCount} (Amazon, Flipkart, Croma, etc.)`);

    const productCount = await prisma.product.count();
    assert(productCount >= 10, `Products count is ${productCount} multi-category items`);

    const offersCount = await prisma.merchantOffer.count();
    assert(offersCount >= 20, `Merchant Offers count is ${offersCount} across authorized retailers`);

    const blogCount = await prisma.blogPost.count();
    assert(blogCount >= 3, `Editorial Blog Posts count is ${blogCount}`);

    // 2. Authentication & Cryptography Tests
    console.log("\n[2/4] Testing Cryptography & Session Tokens...");
    const isPasswordValid = await bcrypt.compare("Admin@Avnivo2025!", admin.passwordHash);
    assert(isPasswordValid, "Bcrypt password hash matches Admin@Avnivo2025!");

    const token = jwt.sign(
      { userId: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || "avnivo-default-jwt-secret-key-2025",
      { expiresIn: "1h" }
    );
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "avnivo-default-jwt-secret-key-2025");
    assert(decoded.userId === admin.id && decoded.role === "ADMIN", "JWT Session signing and verification succeeded");

    // 3. Multi-Merchant Price Comparison Integrity
    console.log("\n[3/4] Testing Multi-Merchant Price Comparison Logic...");
    const iphone = await prisma.product.findUnique({
      where: { slug: "apple-iphone-15-128gb-blue" },
      include: {
        merchantOffers: {
          include: { merchant: true },
          orderBy: { indicativePrice: "asc" },
        },
      },
    });

    assert(iphone !== null, "Apple iPhone 15 exists in catalog");
    assert(iphone.merchantOffers.length >= 2, `iPhone 15 has ${iphone.merchantOffers.length} competing merchant offers`);
    const lowestOffer = iphone.merchantOffers[0];
    assert(lowestOffer.indicativePrice <= iphone.originalPrice, `Lowest offer ₹${lowestOffer.indicativePrice} is below MRP ₹${iphone.originalPrice}`);

    // 4. Affiliate Click Tracking Engine Test
    console.log("\n[4/4] Testing Affiliate Click Tracking & Outbound Engine...");
    const initialClicks = lowestOffer.clickCount;
    await prisma.merchantOffer.update({
      where: { id: lowestOffer.id },
      data: { clickCount: { increment: 1 } },
    });
    const updatedOffer = await prisma.merchantOffer.findUnique({ where: { id: lowestOffer.id } });
    assert(updatedOffer.clickCount === initialClicks + 1, "Merchant offer clickCount successfully incremented");

    const testLog = await prisma.affiliateClickLog.create({
      data: {
        productId: iphone.id,
        merchantOfferId: lowestOffer.id,
        merchantId: lowestOffer.merchantId,
        ipHash: "a1b2c3d4e5f6g7h8",
        userAgent: "Verification-Test-Agent",
        referrer: "https://avnivo.com/product/" + iphone.slug,
        utmSource: "avnivo",
        utmMedium: "test_verification",
        utmCampaign: "unit_test",
      },
    });
    assert(testLog.id !== null, `Click log generated with ID: ${testLog.id}`);

    // Final Report
    console.log("\n==================================================");
    console.log(`TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
    console.log("==================================================");

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error("Test execution failed:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTests();
