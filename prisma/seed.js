const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting AVNIVO database seed...");

  // 1. Clean existing records
  await prisma.notification.deleteMany();
  await prisma.supportInquiry.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.affiliateClickLog.deleteMany();
  await prisma.merchantOffer.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.merchant.deleteMany();
  await prisma.user.deleteMany();
  await prisma.siteSetting.deleteMany();

  // 2. Users (Admin + Demo User)
  const adminPassword = await bcrypt.hash("Admin@Avnivo2025!", 10);
  const userPassword = await bcrypt.hash("User@Avnivo2025!", 10);

  const admin = await prisma.user.create({
    data: {
      name: "AVNIVO Super Administrator",
      email: "admin@avnivo.com",
      mobile: "+91 98765 43210",
      passwordHash: adminPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });

  const demoUser = await prisma.user.create({
    data: {
      name: "Rohan Sharma",
      email: "user@avnivo.com",
      mobile: "+91 98111 22233",
      passwordHash: userPassword,
      role: "USER",
      emailVerified: new Date(),
    },
  });

  console.log("✅ Created Admin & Demo users");

  // 3. Merchants (Approved Indian E-commerce & Affiliate Networks)
  const amazon = await prisma.merchant.create({
    data: {
      name: "Amazon India",
      slug: "amazon-india",
      logoUrl: "https://images.unsplash.com/photo-1523474255658-4af61b168344?w=120&auto=format&fit=crop&q=80",
      websiteUrl: "https://www.amazon.in",
      affiliateProgramName: "Amazon Associates India",
      isActive: true,
    },
  });

  const flipkart = await prisma.merchant.create({
    data: {
      name: "Flipkart",
      slug: "flipkart",
      logoUrl: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=120&auto=format&fit=crop&q=80",
      websiteUrl: "https://www.flipkart.com",
      affiliateProgramName: "Flipkart Affiliate Program",
      isActive: true,
    },
  });

  const croma = await prisma.merchant.create({
    data: {
      name: "Croma",
      slug: "croma",
      logoUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&auto=format&fit=crop&q=80",
      websiteUrl: "https://www.croma.com",
      affiliateProgramName: "Croma Retail Affiliate",
      isActive: true,
    },
  });

  const tatacliq = await prisma.merchant.create({
    data: {
      name: "Tata CLiQ",
      slug: "tata-cliq",
      logoUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=120&auto=format&fit=crop&q=80",
      websiteUrl: "https://www.tatacliq.com",
      affiliateProgramName: "Tata CLiQ Partners",
      isActive: true,
    },
  });

  const reliance = await prisma.merchant.create({
    data: {
      name: "Reliance Digital",
      slug: "reliance-digital",
      logoUrl: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=120&auto=format&fit=crop&q=80",
      websiteUrl: "https://www.reliancedigital.in",
      affiliateProgramName: "Reliance Retail Program",
      isActive: true,
    },
  });

  console.log("✅ Created 5 Verified Merchants");

  // 4. Brands
  const brandData = [
    { name: "Apple", slug: "apple", featured: true },
    { name: "Samsung", slug: "samsung", featured: true },
    { name: "OnePlus", slug: "oneplus", featured: true },
    { name: "Sony", slug: "sony", featured: true },
    { name: "boAt", slug: "boat", featured: true },
    { name: "Noise", slug: "noise", featured: true },
    { name: "ASUS", slug: "asus", featured: true },
    { name: "Nike", slug: "nike", featured: true },
    { name: "Puma", slug: "puma", featured: true },
    { name: "Philips", slug: "philips", featured: true },
    { name: "Prestige", slug: "prestige", featured: true },
    { name: "Mamaearth", slug: "mamaearth", featured: true },
  ];

  const brands = {};
  for (const b of brandData) {
    brands[b.slug] = await prisma.brand.create({ data: b });
  }

  // 5. 8 Main Categories + Subcategories
  const catElectronics = await prisma.category.create({
    data: {
      name: "Electronics & Gadgets",
      nameHindi: "इलेक्ट्रॉनिक्स और गैजेट्स",
      slug: "electronics-gadgets",
      description: "Discover smartphones, laptops, audio gear, and cutting-edge tech gadgets with verified price comparisons.",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      icon: "Smartphone",
      featured: true,
      order: 1,
    },
  });

  const subSmartphones = await prisma.category.create({
    data: {
      name: "Smartphones",
      nameHindi: "स्मार्टफोन",
      slug: "smartphones",
      parentId: catElectronics.id,
      order: 1,
    },
  });

  const subLaptops = await prisma.category.create({
    data: {
      name: "Laptops & Computers",
      nameHindi: "लैपटॉप और कंप्यूटर",
      slug: "laptops-computers",
      parentId: catElectronics.id,
      order: 2,
    },
  });

  const subAudio = await prisma.category.create({
    data: {
      name: "Headphones & Audio",
      nameHindi: "हेडफ़ोन और ऑडियो",
      slug: "headphones-audio",
      parentId: catElectronics.id,
      order: 3,
    },
  });

  const subWearables = await prisma.category.create({
    data: {
      name: "Smartwatches & Wearables",
      nameHindi: "स्मार्टवॉच",
      slug: "smartwatches",
      parentId: catElectronics.id,
      order: 4,
    },
  });

  const catFashion = await prisma.category.create({
    data: {
      name: "Fashion & Clothing",
      nameHindi: "फैशन और कपड़े",
      slug: "fashion-clothing",
      description: "Trendy men's and women's apparel, footwear, and accessories from leading global and Indian labels.",
      imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80",
      icon: "Shirt",
      featured: true,
      order: 2,
    },
  });

  const subMensFashion = await prisma.category.create({
    data: {
      name: "Men's Fashion & Shoes",
      slug: "mens-fashion",
      parentId: catFashion.id,
      order: 1,
    },
  });

  const catHome = await prisma.category.create({
    data: {
      name: "Home & Kitchen",
      nameHindi: "घर और रसोई",
      slug: "home-kitchen",
      description: "Upgrade your living space with smart kitchen appliances, premium cookware, and stylish decor.",
      imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80",
      icon: "Home",
      featured: true,
      order: 3,
    },
  });

  const subKitchenApp = await prisma.category.create({
    data: {
      name: "Kitchen Appliances",
      slug: "kitchen-appliances",
      parentId: catHome.id,
      order: 1,
    },
  });

  const catBeauty = await prisma.category.create({
    data: {
      name: "Beauty & Personal Care",
      nameHindi: "सौंदर्य और व्यक्तिगत देखभाल",
      slug: "beauty-personal-care",
      description: "Curated skincare, grooming, makeup, and organic personal essentials at the best online rates.",
      imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80",
      icon: "Sparkles",
      featured: true,
      order: 4,
    },
  });

  const catSports = await prisma.category.create({
    data: {
      name: "Sports & Fitness",
      nameHindi: "खेल और फिटनेस",
      slug: "sports-fitness",
      description: "Activewear, home workout gear, yoga essentials, and performance fitness accessories.",
      imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
      icon: "Dumbbell",
      featured: true,
      order: 5,
    },
  });

  const catBooks = await prisma.category.create({
    data: {
      name: "Books & Stationery",
      nameHindi: "किताबें और स्टेशनरी",
      slug: "books-stationery",
      description: "Bestselling novels, competitive exam prep, self-help classics, and premium desk supplies.",
      imageUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=80",
      icon: "BookOpen",
      featured: true,
      order: 6,
    },
  });

  const catToys = await prisma.category.create({
    data: {
      name: "Toys & Baby Products",
      nameHindi: "खिलौने और शिशु उत्पाद",
      slug: "toys-baby-products",
      description: "Safe educational toys, infant care gear, and baby essentials with parent reviews.",
      imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80",
      icon: "Baby",
      featured: true,
      order: 7,
    },
  });

  const catTravel = await prisma.category.create({
    data: {
      name: "Travel & Lifestyle",
      nameHindi: "यात्रा और लाइफस्टाइल",
      slug: "travel-lifestyle",
      description: "Durable trolleys, travel backpacks, organizers, and lifestyle accessories for modern explorers.",
      imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80",
      icon: "Compass",
      featured: true,
      order: 8,
    },
  });

  console.log("✅ Created 8 Master Categories & Subcategories");

  // 6. Products with realistic Indian pricing and multi-merchant offers
  const productsToCreate = [
    {
      name: "Apple iPhone 15 (128 GB) - Blue",
      slug: "apple-iphone-15-128gb-blue",
      brandId: brands["apple"].id,
      categoryId: subSmartphones.id,
      description: "iPhone 15 brings you Dynamic Island, a 48MP Main camera, and USB-C, all in a durable color-infused glass and aluminum design. Powered by the blazing-fast A16 Bionic chip.",
      shortDescription: "Dynamic Island, 48MP Camera, USB-C, A16 Bionic Chip",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80"
      ]),
      indicativePrice: 69999,
      originalPrice: 79900,
      discountPercent: 12,
      rating: 4.6,
      reviewCount: 3420,
      isVerifiedRating: true,
      specifications: JSON.stringify({
        "Display": "6.1-inch Super Retina XDR OLED",
        "Processor": "A16 Bionic chip with 5-core GPU",
        "Camera": "48MP Main + 12MP Ultra Wide with 2x Telephoto",
        "Front Camera": "12MP TrueDepth",
        "Connector": "USB-C",
        "Battery": "All-day battery life (Up to 20 hrs video)",
        "Water Resistance": "IP68 (6 meters up to 30 mins)"
      }),
      keyFeatures: JSON.stringify([
        "Dynamic Island bubbles up alerts and Live Activities",
        "Innovative 48MP Main camera with 2x optical-quality Telephoto",
        "Durable color-infused glass with textured matte finish",
        "Superfast A16 Bionic chip with next-gen computational photography",
        "Universal USB-C charging connector"
      ]),
      isFeatured: true,
      isTrending: true,
      isTopPick: true,
      offers: [
        {
          merchantId: amazon.id,
          affiliateUrl: "https://www.amazon.in/dp/B0CHX1W1XY?tag=avnivo-21&linkCode=ogi&th=1&psc=1",
          indicativePrice: 69999,
          originalPrice: 79900,
          discountPercent: 12,
          availability: "IN_STOCK",
          deliveryInfo: "Free Prime 1-day delivery",
        },
        {
          merchantId: flipkart.id,
          affiliateUrl: "https://www.flipkart.com/apple-iphone-15-blue-128-gb/p/itmbf5553733dec9?affid=avnivo",
          indicativePrice: 70499,
          originalPrice: 79900,
          discountPercent: 11,
          availability: "IN_STOCK",
          deliveryInfo: "Free 2-day delivery with Bank Offer",
        },
        {
          merchantId: croma.id,
          affiliateUrl: "https://www.croma.com/apple-iphone-15-128gb-blue/p/300652?utm_source=avnivo",
          indicativePrice: 71900,
          originalPrice: 79900,
          discountPercent: 10,
          availability: "IN_STOCK",
          deliveryInfo: "Store pickup or Express 3-hour delivery",
        }
      ]
    },
    {
      name: "Samsung Galaxy S24 5G (8GB RAM, 256GB Storage) - Cobalt Violet",
      slug: "samsung-galaxy-s24-5g-256gb",
      brandId: brands["samsung"].id,
      categoryId: subSmartphones.id,
      description: "Galaxy AI is here. Search like never before with Circle to Search, get real-time voice translation on a call, and format notes into a clear summary. Featuring Armor Aluminum 2.0 and 50MP AI Camera.",
      shortDescription: "Galaxy AI, 50MP Camera, Dynamic AMOLED 2X, Snapdragon 8 Gen 3",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80"
      ]),
      indicativePrice: 64999,
      originalPrice: 79999,
      discountPercent: 19,
      rating: 4.5,
      reviewCount: 1890,
      isVerifiedRating: true,
      specifications: JSON.stringify({
        "Display": "6.2-inch FHD+ Dynamic AMOLED 2X (120Hz)",
        "Processor": "Exynos 2400 / Snapdragon 8 Gen 3",
        "RAM & Storage": "8GB RAM, 256GB UFS 4.0",
        "Camera": "50MP Wide + 12MP Ultra-Wide + 10MP Telephoto (3x)",
        "Battery": "4000 mAh with 25W Fast Charging",
        "AI Features": "Circle to Search, Live Translate, Note Assist"
      }),
      keyFeatures: JSON.stringify([
        "Galaxy AI transforms mobile convenience",
        "Stunning 2600 nits peak outdoor brightness",
        "ProVisual Engine for ultra-clear night photography",
        "7 Generations of OS Upgrades & 7 Years of Security Updates"
      ]),
      isFeatured: true,
      isBestDeal: true,
      offers: [
        {
          merchantId: amazon.id,
          affiliateUrl: "https://www.amazon.in/dp/B0CS5X68S3?tag=avnivo-21",
          indicativePrice: 64999,
          originalPrice: 79999,
          discountPercent: 19,
          availability: "IN_STOCK",
          deliveryInfo: "Free Next-Day delivery with Prime",
        },
        {
          merchantId: flipkart.id,
          affiliateUrl: "https://www.flipkart.com/samsung-galaxy-s24-5g/p/itmd5?affid=avnivo",
          indicativePrice: 65999,
          originalPrice: 79999,
          discountPercent: 17,
          availability: "IN_STOCK",
          deliveryInfo: "Free 2-day delivery",
        },
        {
          merchantId: reliance.id,
          affiliateUrl: "https://www.reliancedigital.in/samsung-galaxy-s24-5g/p/494352?utm_source=avnivo",
          indicativePrice: 66499,
          originalPrice: 79999,
          discountPercent: 16,
          availability: "IN_STOCK",
          deliveryInfo: "Same day dispatch",
        }
      ]
    },
    {
      name: "OnePlus 12 (16GB RAM, 512GB Storage) - Silky Black",
      slug: "oneplus-12-5g-16gb-512gb",
      brandId: brands["oneplus"].id,
      categoryId: subSmartphones.id,
      description: "OnePlus 12 redefines the meaning of smooth. Powered by Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera System, and 100W SUPERVOOC charging with 5400 mAh battery.",
      shortDescription: "Snapdragon 8 Gen 3, Hasselblad Camera, 100W SuperVOOC, 2K 120Hz ProXDR",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80"
      ]),
      indicativePrice: 64999,
      originalPrice: 69999,
      discountPercent: 7,
      rating: 4.5,
      reviewCount: 2150,
      isVerifiedRating: true,
      specifications: JSON.stringify({
        "Display": "6.82-inch 2K 120 Hz ProXDR with LTPO 3.0",
        "Processor": "Snapdragon 8 Gen 3 Mobile Platform",
        "Battery": "5,400 mAh with 100W Wired & 50W AIRVOOC Wireless",
        "Camera": "Sony LYT-808 50MP + 64MP 3X Periscope + 48MP Ultra-wide"
      }),
      keyFeatures: JSON.stringify([
        "Dual Cryo-velocity VC cooling system",
        "Aqua Touch allows seamless operation even in heavy rain",
        "Industry-leading 4,500 nits peak brightness"
      ]),
      isTrending: true,
      isTopPick: true,
      offers: [
        {
          merchantId: amazon.id,
          affiliateUrl: "https://www.amazon.in/dp/B0CQPNWDK7?tag=avnivo-21",
          indicativePrice: 64999,
          originalPrice: 69999,
          discountPercent: 7,
          availability: "IN_STOCK",
          deliveryInfo: "Free 1-day delivery",
        },
        {
          merchantId: croma.id,
          affiliateUrl: "https://www.croma.com/oneplus-12-5g/p/304521?utm_source=avnivo",
          indicativePrice: 65499,
          originalPrice: 69999,
          discountPercent: 6,
          availability: "IN_STOCK",
          deliveryInfo: "Available in nearby store",
        }
      ]
    },
    {
      name: "Apple MacBook Air 15-inch M3 Chip (16GB RAM, 512GB SSD) - Midnight",
      slug: "apple-macbook-air-15-inch-m3-midnight",
      brandId: brands["apple"].id,
      categoryId: subLaptops.id,
      description: "Lean, mean, M3 machine. With up to 18 hours of battery life and an expansive 15.3-inch Liquid Retina display, the MacBook Air flies through demanding workflows silently with its fanless design.",
      shortDescription: "Apple M3 8-core CPU / 10-core GPU, 15.3-inch Liquid Retina, MagSafe 3",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80"
      ]),
      indicativePrice: 144900,
      originalPrice: 154900,
      discountPercent: 6,
      rating: 4.8,
      reviewCount: 950,
      isVerifiedRating: true,
      specifications: JSON.stringify({
        "Processor": "Apple M3 Chip (8-core CPU, 10-core GPU)",
        "Memory": "16GB Unified Memory",
        "Storage": "512GB ultrafast SSD",
        "Display": "15.3-inch LED-backlit Liquid Retina (2880 x 1864)",
        "Weight": "1.51 kg",
        "Battery": "Up to 18 hours wireless web"
      }),
      keyFeatures: JSON.stringify([
        "Astonishingly thin design at only 11.5 mm",
        "Supports up to two external displays with lid closed",
        "MagSafe 3 charging port with color-matched cable",
        "Six-speaker sound system with Spatial Audio"
      ]),
      isFeatured: true,
      isTopPick: true,
      offers: [
        {
          merchantId: amazon.id,
          affiliateUrl: "https://www.amazon.in/dp/B0CX21C26G?tag=avnivo-21",
          indicativePrice: 144900,
          originalPrice: 154900,
          discountPercent: 6,
          availability: "IN_STOCK",
          deliveryInfo: "Free 1-day Prime Delivery",
        },
        {
          merchantId: tatacliq.id,
          affiliateUrl: "https://www.tatacliq.com/apple-macbook-air-15-m3/p/mp00000001?utm_source=avnivo",
          indicativePrice: 146900,
          originalPrice: 154900,
          discountPercent: 5,
          availability: "IN_STOCK",
          deliveryInfo: "HDFC Card ₹10,000 instant cashback",
        }
      ]
    },
    {
      name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones - Black",
      slug: "sony-wh-1000xm5-wireless-headphones-black",
      brandId: brands["sony"].id,
      categoryId: subAudio.id,
      description: "Industry-leading noise cancellation optimized automatically according to wearing conditions and environment. Specially engineered 30mm driver unit with carbon fiber composite lightweight dome.",
      shortDescription: "Auto NC Optimizer, 30hr Battery, Crystal Clear Hands-free Calling, LDAC Hi-Res",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
      ]),
      indicativePrice: 26990,
      originalPrice: 34990,
      discountPercent: 23,
      rating: 4.6,
      reviewCount: 6810,
      isVerifiedRating: true,
      specifications: JSON.stringify({
        "Noise Cancellation": "Dual Processors (Integrated Processor V1 + HD QN1)",
        "Microphones": "8 Microphones for unmatched noise cancellation",
        "Battery Life": "Up to 30 Hours (3 min quick charge = 3 hrs)",
        "Bluetooth": "Version 5.2 (Multipoint pairing supported)",
        "Audio Codecs": "SBC, AAC, LDAC"
      }),
      keyFeatures: JSON.stringify([
        "Industry-leading noise cancellation with two processors and 8 mics",
        "Speak-to-Chat automatically pauses music when you talk",
        "Multipoint connection allows connecting to two devices simultaneously"
      ]),
      isFeatured: true,
      isBestDeal: true,
      isTrending: true,
      offers: [
        {
          merchantId: amazon.id,
          affiliateUrl: "https://www.amazon.in/dp/B09XS7JWHH?tag=avnivo-21",
          indicativePrice: 26990,
          originalPrice: 34990,
          discountPercent: 23,
          availability: "IN_STOCK",
          deliveryInfo: "Free Prime delivery by tomorrow",
        },
        {
          merchantId: croma.id,
          affiliateUrl: "https://www.croma.com/sony-wh-1000xm5-over-ear-headphones/p/257321?utm_source=avnivo",
          indicativePrice: 28490,
          originalPrice: 34990,
          discountPercent: 19,
          availability: "IN_STOCK",
          deliveryInfo: "Same-day store pickup",
        },
        {
          merchantId: flipkart.id,
          affiliateUrl: "https://www.flipkart.com/sony-wh-1000xm5/p/itm7a?affid=avnivo",
          indicativePrice: 27990,
          originalPrice: 34990,
          discountPercent: 20,
          availability: "IN_STOCK",
          deliveryInfo: "Free 2-day delivery",
        }
      ]
    },
    {
      name: "boAt Nirvana Ion ANC True Wireless Earbuds with 120H Playtime",
      slug: "boat-nirvana-ion-anc-earbuds",
      brandId: brands["boat"].id,
      categoryId: subAudio.id,
      description: "Experience silence with up to 32dB Active Noise Cancellation. Enjoy massive 120 Hours total playtime, Dual EQ Modes, and Crystal Bionic Sound powered by HiFi DSP.",
      shortDescription: "32dB ANC, 120 Hours Battery, Crystal Bionic Sound, In-Ear Detection",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80"
      ]),
      indicativePrice: 2499,
      originalPrice: 9990,
      discountPercent: 75,
      rating: 4.2,
      reviewCount: 14200,
      isVerifiedRating: true,
      specifications: JSON.stringify({
        "ANC": "Up to 32dB Active Noise Cancellation",
        "Battery": "120 Hours Total (24 Hours per earbud charge)",
        "Latency": "60ms BEAST Mode for gaming",
        "Water Resistance": "IPX4 splash and sweat resistance"
      }),
      keyFeatures: JSON.stringify([
        "Insane 120-hour total battery life with Type-C ASAP charge",
        "Quad Mics with ENx technology for pristine voice calling",
        "Dual EQ Modes (boAt Signature Sound / Balanced Mode)"
      ]),
      isBestDeal: true,
      isTrending: true,
      offers: [
        {
          merchantId: amazon.id,
          affiliateUrl: "https://www.amazon.in/dp/B0CP97W74F?tag=avnivo-21",
          indicativePrice: 2499,
          originalPrice: 9990,
          discountPercent: 75,
          availability: "IN_STOCK",
          deliveryInfo: "Free Prime delivery tomorrow",
        },
        {
          merchantId: flipkart.id,
          affiliateUrl: "https://www.flipkart.com/boat-nirvana-ion-anc/p/itm54?affid=avnivo",
          indicativePrice: 2599,
          originalPrice: 9990,
          discountPercent: 74,
          availability: "IN_STOCK",
          deliveryInfo: "Free delivery in 2 days",
        }
      ]
    },
    {
      name: "Noise ColorFit Pro 5 Max 1.96-inch AMOLED Smartwatch - Jet Black",
      slug: "noise-colorfit-pro-5-max-smartwatch",
      brandId: brands["noise"].id,
      categoryId: subWearables.id,
      description: "Maximize your lifestyle with a 1.96-inch AMOLED display, Tru Sync BT calling with rapid pairing, VO2 Max, and post-workout recovery metrics for fitness enthusiasts.",
      shortDescription: "1.96\" AMOLED Display, Tru Sync Calling, VO2 Max, Functional Crown",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
      ]),
      indicativePrice: 3999,
      originalPrice: 9999,
      discountPercent: 60,
      rating: 4.3,
      reviewCount: 5210,
      isVerifiedRating: true,
      specifications: JSON.stringify({
        "Screen": "1.96-inch Always-on AMOLED Display (410x502 resolution)",
        "Calling": "Bluetooth Calling with Noise Health Suite",
        "Battery": "Up to 7 days normal usage (2 days with heavy BT calling)",
        "Sensors": "Heart Rate, SpO2, Sleep Monitor, Stress Level"
      }),
      keyFeatures: JSON.stringify([
        "Ultra-smooth 60Hz refresh rate display",
        "SOS technology lets you call saved emergency contacts in one tap",
        "Over 100+ sports modes and cloud watch faces"
      ]),
      isBestDeal: true,
      offers: [
        {
          merchantId: amazon.id,
          affiliateUrl: "https://www.amazon.in/dp/B0CP97W74F?tag=avnivo-21",
          indicativePrice: 3999,
          originalPrice: 9999,
          discountPercent: 60,
          availability: "IN_STOCK",
          deliveryInfo: "Free delivery by Amazon",
        },
        {
          merchantId: flipkart.id,
          affiliateUrl: "https://www.flipkart.com/noise-colorfit-pro-5-max/p/itm09?affid=avnivo",
          indicativePrice: 4199,
          originalPrice: 9999,
          discountPercent: 58,
          availability: "IN_STOCK",
          deliveryInfo: "Delivery in 3 days",
        }
      ]
    },
    {
      name: "Nike Pegasus 40 Men's Road Running Shoes - Deep Royal Blue",
      slug: "nike-pegasus-40-mens-running-shoes-blue",
      brandId: brands["nike"].id,
      categoryId: subMensFashion.id,
      description: "A springy ride for any run, the Peg's familiar, just-for-you feel returns to help you accomplish your goals. This milestone edition has improved midfoot lockdown and plush collar cushioning.",
      shortDescription: "Nike React Foam, Dual Zoom Air Units, Engineered Mesh Upper",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80"
      ]),
      indicativePrice: 8495,
      originalPrice: 11895,
      discountPercent: 28,
      rating: 4.7,
      reviewCount: 3890,
      isVerifiedRating: true,
      specifications: JSON.stringify({
        "Activity": "Road Running, Walking, Everyday Athletic",
        "Cushioning": "Responsive Nike React technology with 2 Zoom Air units",
        "Upper": "Highly tuned single-layer mesh for inviting feel and fit",
        "Outsole": "Waffle-inspired rubber pattern for reliable road traction"
      }),
      keyFeatures: JSON.stringify([
        "Neutral support balances stability for heel-to-toe transition",
        "Redesigned midfoot band provides more forgiving fit for all arches",
        "Padded collar and tongue provide superior ankle comfort"
      ]),
      isFeatured: true,
      isTopPick: true,
      offers: [
        {
          merchantId: amazon.id,
          affiliateUrl: "https://www.amazon.in/dp/B0C3NW88V1?tag=avnivo-21",
          indicativePrice: 8495,
          originalPrice: 11895,
          discountPercent: 28,
          availability: "IN_STOCK",
          deliveryInfo: "Free delivery & 10-day return policy",
        },
        {
          merchantId: tatacliq.id,
          affiliateUrl: "https://www.tatacliq.com/nike-pegasus-40/p/mp0923?utm_source=avnivo",
          indicativePrice: 8995,
          originalPrice: 11895,
          discountPercent: 24,
          availability: "IN_STOCK",
          deliveryInfo: "Official Nike partner warranty",
        }
      ]
    },
    {
      name: "Philips Digital Air Fryer HD9252/90 with Rapid Air Technology",
      slug: "philips-digital-air-fryer-hd9252",
      brandId: brands["philips"].id,
      categoryId: subKitchenApp.id,
      description: "Healthy frying with Rapid Air technology. Delicious fries with up to 90% less fat. Touch screen with 7 presets including frozen snacks, fresh fries, meat, fish, chicken, cake and grilled veggies.",
      shortDescription: "4.1 Liter capacity, Rapid Air 90% Less Fat, 7 Touchscreen Presets, Keep Warm",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80"
      ]),
      indicativePrice: 7999,
      originalPrice: 12995,
      discountPercent: 38,
      rating: 4.5,
      reviewCount: 9400,
      isVerifiedRating: true,
      specifications: JSON.stringify({
        "Capacity": "4.1 Liters (Up to 4 portions)",
        "Power": "1400 Watts with auto-shut off",
        "Presets": "7 Preset Cooking Programs",
        "Cleaning": "Dishwasher safe non-stick QuickClean basket"
      }),
      keyFeatures: JSON.stringify([
        "Patented starfish bottom design swirls hot air for evenly cooked food",
        "NutriU app with 500+ Indian & international healthy recipes",
        "Keep Warm function keeps food at ideal temperature for 30 minutes"
      ]),
      isBestDeal: true,
      isTopPick: true,
      offers: [
        {
          merchantId: amazon.id,
          affiliateUrl: "https://www.amazon.in/dp/B08HWY5LMS?tag=avnivo-21",
          indicativePrice: 7999,
          originalPrice: 12995,
          discountPercent: 38,
          availability: "IN_STOCK",
          deliveryInfo: "Free Prime 1-day delivery",
        },
        {
          merchantId: flipkart.id,
          affiliateUrl: "https://www.flipkart.com/philips-hd9252-air-fryer/p/itm098?affid=avnivo",
          indicativePrice: 8299,
          originalPrice: 12995,
          discountPercent: 36,
          availability: "IN_STOCK",
          deliveryInfo: "Free delivery in 2 days",
        },
        {
          merchantId: croma.id,
          affiliateUrl: "https://www.croma.com/philips-digital-air-fryer/p/241512?utm_source=avnivo",
          indicativePrice: 8490,
          originalPrice: 12995,
          discountPercent: 35,
          availability: "IN_STOCK",
          deliveryInfo: "Store pickup available today",
        }
      ]
    },
    {
      name: "Prestige Deluxe Alpha Stainless Steel Pressure Cooker (3.0 Litre)",
      slug: "prestige-deluxe-alpha-pressure-cooker-3l",
      brandId: brands["prestige"].id,
      categoryId: subKitchenApp.id,
      description: "Crafted from finest quality high-grade surgical stainless steel with unique Alpha base for induction and gas compatibility. Features controlled gasket release system for maximum kitchen safety.",
      shortDescription: "Alpha Base Induction & Gas Compatible, Surgical Stainless Steel, 3L Capacity",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1584990347449-399a9a3b61cb?w=800&auto=format&fit=crop&q=80"
      ]),
      indicativePrice: 2249,
      originalPrice: 3200,
      discountPercent: 30,
      rating: 4.4,
      reviewCount: 11200,
      isVerifiedRating: true,
      specifications: JSON.stringify({
        "Material": "Heavy Gauge 304 Stainless Steel",
        "Capacity": "3.0 Litres",
        "Base": "Unique Alpha Base (Gas and Induction Compatible)",
        "Handles": "Durable heat-resistant double screw handles"
      }),
      keyFeatures: JSON.stringify([
        "Alpha base ensures even heat distribution without hot spots",
        "Precision weight valve releases pressure above 1 kg/cm2",
        "ISI certified with 5 years manufacturer warranty"
      ]),
      offers: [
        {
          merchantId: amazon.id,
          affiliateUrl: "https://www.amazon.in/dp/B002SZEUS6?tag=avnivo-21",
          indicativePrice: 2249,
          originalPrice: 3200,
          discountPercent: 30,
          availability: "IN_STOCK",
          deliveryInfo: "Free Delivery with Prime",
        },
        {
          merchantId: flipkart.id,
          affiliateUrl: "https://www.flipkart.com/prestige-deluxe-alpha-3l/p/itm0982?affid=avnivo",
          indicativePrice: 2399,
          originalPrice: 3200,
          discountPercent: 25,
          availability: "IN_STOCK",
          deliveryInfo: "Delivery in 2 days",
        }
      ]
    },
    {
      name: "Mamaearth Vitamin C Daily Glow Face Serum with 50X Vitamin C & Turmeric",
      slug: "mamaearth-vitamin-c-daily-glow-face-serum-30ml",
      brandId: brands["mamaearth"].id,
      categoryId: catBeauty.id,
      description: "Get glowing skin with the natural goodness of Vitamin C and Turmeric. This lightweight, non-greasy serum reduces pigmentation and dark spots while providing deep hydration.",
      shortDescription: "50X Vitamin C, Turmeric Extract, Paraben & Silicon Free, 30ml",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80"
      ]),
      indicativePrice: 349,
      originalPrice: 449,
      discountPercent: 22,
      rating: 4.2,
      reviewCount: 7850,
      isVerifiedRating: true,
      specifications: JSON.stringify({
        "Volume": "30 ml",
        "Key Ingredients": "50X Vitamin C, Turmeric, Gotu Kola",
        "Skin Type": "Suitable for all skin types, dermatologically tested",
        "Certifications": "Made Safe Certified, Cruelty Free, Toxin Free"
      }),
      keyFeatures: JSON.stringify([
        "Fades blemishes and restores radiant, glowing skin",
        "Fast-absorbing formula that penetrates deep without stickiness",
        "Free from mineral oil, silicones, and parabens"
      ]),
      offers: [
        {
          merchantId: amazon.id,
          affiliateUrl: "https://www.amazon.in/dp/B0B7JBLQ11?tag=avnivo-21",
          indicativePrice: 349,
          originalPrice: 449,
          discountPercent: 22,
          availability: "IN_STOCK",
          deliveryInfo: "Free delivery with Prime",
        },
        {
          merchantId: flipkart.id,
          affiliateUrl: "https://www.flipkart.com/mamaearth-vitamin-c-glow-serum/p/itm876?affid=avnivo",
          indicativePrice: 379,
          originalPrice: 449,
          discountPercent: 15,
          availability: "IN_STOCK",
          deliveryInfo: "Delivery in 3 days",
        }
      ]
    },
    {
      name: "American Tourister Ivy 3-Piece Polypropylene Hardsided Luggage Set",
      slug: "american-tourister-ivy-3-piece-luggage-set",
      categoryId: catTravel.id,
      description: "Travel with style and confidence. Made with tough scratch-resistant polypropylene, recessed 3-dial TSA lock, and dual 360-degree silent spinner wheels for effortless airport navigation.",
      shortDescription: "Cabin + Medium + Large (55cm, 68cm, 78cm), Scratch Resistant, TSA Lock",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?w=800&auto=format&fit=crop&q=80"
      ]),
      indicativePrice: 8999,
      originalPrice: 24000,
      discountPercent: 62,
      rating: 4.4,
      reviewCount: 3120,
      isVerifiedRating: true,
      specifications: JSON.stringify({
        "Set Includes": "Cabin (55 cm), Medium (68 cm), Large (78 cm)",
        "Material": "100% Polypropylene Lightweight Impact Shell",
        "Wheels": "8 Multidirectional Silent Spinner Wheels",
        "Security": "Recessed 3-Digit TSA Combination Lock"
      }),
      keyFeatures: JSON.stringify([
        "Super lightweight yet virtually indestructible outer casing",
        "Color-matched components and scratch-resistant matte texture",
        "3 Years international manufacturer warranty"
      ]),
      isBestDeal: true,
      isNewArrival: true,
      offers: [
        {
          merchantId: amazon.id,
          affiliateUrl: "https://www.amazon.in/dp/B08HWY5LMS?tag=avnivo-21",
          indicativePrice: 8999,
          originalPrice: 24000,
          discountPercent: 62,
          availability: "IN_STOCK",
          deliveryInfo: "Free delivery by Amazon",
        },
        {
          merchantId: flipkart.id,
          affiliateUrl: "https://www.flipkart.com/american-tourister-ivy/p/itm543?affid=avnivo",
          indicativePrice: 9499,
          originalPrice: 24000,
          discountPercent: 60,
          availability: "IN_STOCK",
          deliveryInfo: "Free delivery in 3 days",
        }
      ]
    }
  ];

  for (const prod of productsToCreate) {
    const { offers, ...productData } = prod;
    const createdProduct = await prisma.product.create({
      data: productData,
    });

    for (const offer of offers) {
      await prisma.merchantOffer.create({
        data: {
          productId: createdProduct.id,
          merchantId: offer.merchantId,
          affiliateUrl: offer.affiliateUrl,
          indicativePrice: offer.indicativePrice,
          originalPrice: offer.originalPrice,
          discountPercent: offer.discountPercent,
          availability: offer.availability,
          deliveryInfo: offer.deliveryInfo,
        },
      });
    }
  }

  console.log(`✅ Created ${productsToCreate.length} Products with multi-merchant comparison offers`);

  // 7. Seed Blog Posts / Buying Guides
  const blogPosts = [
    {
      title: "How to Choose the Best Laptop for College & Work in 2025: Complete Guide",
      slug: "how-to-choose-best-laptop-2025-guide",
      summary: "Don't overpay for specs you don't need. Here is our expert breakdown of processor tiers, RAM requirements, battery benchmarks, and display qualities for every budget.",
      content: `## Finding Your Ideal Laptop in 2025

Choosing a laptop today is much more than comparing raw gigahertz. Modern laptops are powered by AI NPUs, power-efficient ARM chips, and multi-core architectures that deliver all-day battery life.

### 1. Processors: Intel Core Ultra vs Apple M3 vs AMD Ryzen 8000
- **For Battery & Silence:** Apple's MacBook Air (M3) remains the undisputed king of battery endurance, regularly achieving 15 to 18 hours of real-world use without needing a cooling fan.
- **For Windows Productivity:** Intel Core Ultra (Series 1 & 2) and AMD Ryzen 8040 series offer dedicated Neural Processing Units (NPUs) that handle AI video blurring and background audio noise suppression efficiently.

### 2. RAM: Why 16GB is the New Minimum
In 2025, operating systems and modern web browsers consume significant memory. Always choose **16GB of unified memory or LPDDR5X RAM** as your baseline for future-proofing.

### 3. Price Comparison Tip on AVNIVO
Check multiple verified stores before buying. Retailers like Amazon, Croma, and Tata CLiQ often run competing bank cashback promotions that can save you an additional ₹5,000 to ₹10,000.`,
      coverImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1000&auto=format&fit=crop&q=80",
      category: "Buying Guides",
      authorName: "Amit Verma",
      authorRole: "Senior Hardware Reviewer",
      readTimeMinutes: 6,
      tags: "Laptops, Tech Guide, Apple M3, Windows Laptops, Student Deals",
      published: true,
    },
    {
      title: "Air Fryer vs Microwave Convection Oven: Which Kitchen Appliance Is Worth It?",
      slug: "air-fryer-vs-microwave-convection-oven",
      summary: "Wondering if you need an air fryer if you already own a microwave? Here is a practical Indian kitchen comparison of cooking speed, oil reduction, and energy efficiency.",
      content: `## The Indian Kitchen Dilemma: Air Fryer or OTG / Convection?

Air fryers have taken Indian households by storm, promising crispy samosas, pakoras, and roasted veggies with 90% less oil. But how does it hold up against a conventional microwave oven?

### The Big Differences:
1. **Cooking Mechanism:** An air fryer works like a miniature high-speed wind tunnel. It circulates ultra-hot air in a compact chamber, creating a crispier texture than any microwave convection setting.
2. **Pre-heating Time:** Air fryers reach 200°C in less than 3 minutes, whereas large convection ovens take 10 to 15 minutes.
3. **Space & Cleaning:** Non-stick air fryer baskets take only 2 minutes to wash in the sink compared to cleaning oven racks.

### The Verdict:
If your goal is healthy snacking, roasting paneer/chicken, and crisping snacks, a **4L to 5L digital air fryer** from brands like Philips or Prestige is an indispensable addition to your countertop.`,
      coverImage: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=1000&auto=format&fit=crop&q=80",
      category: "Home & Kitchen",
      authorName: "Pooja Hegde",
      authorRole: "Culinary & Lifestyle Editor",
      readTimeMinutes: 5,
      tags: "Kitchen, Air Fryers, Healthy Cooking, Home Appliances",
      published: true,
    },
    {
      title: "Best Smartphones Under ₹30,000 in India: 2025 Camera & Battery Shootout",
      slug: "best-smartphones-under-30000-india-2025",
      summary: "The mid-range smartphone segment in India is more competitive than ever. Here are the top 4 contenders delivering flagship-grade cameras, smooth 120Hz AMOLEDs, and fast charging.",
      content: `## The ₹30,000 Sweet Spot

You no longer need to spend ₹80,000 for a flagship experience. Modern mid-range smartphones feature Sony IMX sensors, OIS (Optical Image Stabilization), curved AMOLED displays, and 80W+ fast charging out of the box.

### Key Factors to Evaluate:
- **Display:** Look for 1.5K or FHD+ AMOLED with at least 1200 nits high-brightness mode for Indian sunlight legibility.
- **Software Cleanliness:** Clean UI with minimal bloatware and a commitment to at least 3 years of OS updates.
- **Price Tracking:** Mid-range phones frequently receive ₹2,000 to ₹3,000 instant bank discount coupons on Amazon and Flipkart during weekend sales. Use AVNIVO's price tracker to catch these drops.`,
      coverImage: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1000&auto=format&fit=crop&q=80",
      category: "Tech & Gadgets",
      authorName: "Vikram Rathore",
      authorRole: "Mobile Technology Analyst",
      readTimeMinutes: 7,
      tags: "Smartphones, Mid-range Phones, Android, Mobile Photography",
      published: true,
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }

  console.log(`✅ Created ${blogPosts.length} Editorial Blog Posts`);

  // 8. Site Settings
  await prisma.siteSetting.createMany({
    data: [
      {
        key: "announcement_bar",
        value: JSON.stringify({
          enabled: true,
          text: "🔥 Grand Tech & Lifestyle Deals: Compare offers across Amazon, Flipkart, Croma & save up to 70% today!",
          link: "/deals",
        }),
      },
      {
        key: "hero_banner",
        value: JSON.stringify({
          title: "Discover. Compare. Shop Smart.",
          subtitle: "India's next-generation product discovery & price comparison destination. Verified merchant offers from Amazon, Flipkart, Croma, and more.",
          ctaText: "Explore Top Deals",
          ctaLink: "/shop",
        }),
      },
      {
        key: "affiliate_disclosure_note",
        value: "AVNIVO is an independent shopping discovery platform. We may earn an affiliate commission when you click through certain merchant links on our website, at zero additional cost to you.",
      },
    ],
  });

  console.log("✅ Seeded Site Settings");
  console.log("🎉 AVNIVO Database Seeded Successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
