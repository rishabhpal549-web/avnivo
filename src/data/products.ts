import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  // 1. Kitchen Gadgets
  {
    id: 'prod-kg-01',
    name: 'Pigeon Polypropylene Handheld Chopper with 3 Stainless Steel Blades (400 ml)',
    slug: 'pigeon-polypropylene-handheld-chopper-400ml',
    brand: 'Pigeon',
    category: 'Kitchen Gadgets',
    categorySlug: 'kitchen-gadgets',
    description: 'The Pigeon manual pull chopper is an indispensable staple for Indian kitchens. Designed with 3 razor-sharp food-grade stainless steel blades and a sturdy pulley pull-string mechanism, it dices onions, tomatoes, ginger, and herbs in seconds without electricity.',
    shortDescription: 'High-speed manual vegetable chopper with 3 sharp stainless steel blades for effortless chopping.',
    images: [
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    ],
    price: 199,
    originalPrice: 495,
    discountPercent: 60,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B07R9N53W4?tag=avnivo-demo-21',
    rating: 4.3,
    ratingCount: 154200,
    featured: true,
    trending: true,
    bestSeller: true,
    specifications: {
      'Capacity': '400 ml',
      'Blade Material': 'Food-Grade Stainless Steel (3 Blades)',
      'Body Material': 'BPA-Free Polypropylene',
      'Power Source': 'Manual Cord Pull Mechanism',
      'Dishwasher Safe': 'Bowl and blade only (hand-wash lid)',
      'Dimensions': '13 x 13 x 10 cm'
    },
    pros: [
      'No electricity needed, ideal for fast everyday meal prep',
      'Tear-free onion chopping in under 10 pulls',
      'Compact footprint fits any small drawer or countertop',
      'Extremely affordable with easily replaceable blades'
    ],
    cons: [
      'Pull cord lid must not be soaked underwater to preserve spring longevity',
      '400 ml capacity requires chopping in 2 batches for large families'
    ],
    bestFor: 'Daily chopping of onions, chilies, garlic, and nuts for curries, salads, and chutneys.',
    verdict: 'An absolute must-have budget gadget for every Indian kitchen. At this price point, it saves hours of daily prep time and pays for itself within weeks.',
    inStock: true,
    badge: 'Amazon Best Seller',
    asin: 'B07R9N53W4'
  },
  {
    id: 'prod-kg-02',
    name: 'HealthSense Chef-Mate Digital Kitchen Food Weighing Scale (KS 33)',
    slug: 'healthsense-chef-mate-digital-kitchen-scale',
    brand: 'HealthSense',
    category: 'Kitchen Gadgets',
    categorySlug: 'kitchen-gadgets',
    description: 'Precision digital kitchen scale offering high-accuracy strain gauge sensors from 1g to 5kg. Features a blue backlit LCD screen, tare function, and dual unit toggle (grams, milliliters, ounces, pounds).',
    shortDescription: 'Precision digital kitchen scale (1g to 5kg) with tare function for baking and diet tracking.',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    price: 899,
    originalPrice: 1699,
    discountPercent: 47,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B07ZGBPXVT?tag=avnivo-demo-21',
    rating: 4.4,
    ratingCount: 18900,
    featured: false,
    trending: true,
    specifications: {
      'Measurement Range': '1g to 5000g',
      'Display': 'Backlit Blue LCD',
      'Units': 'g, ml, fl:oz, lb:oz',
      'Battery': '2x AAA (Included)',
      'Tare Function': 'One-touch Zero reset'
    },
    pros: [
      'High-precision 1-gram increments for accurate baking and macro tracking',
      'Tare button effortlessly discounts bowl weight',
      'Non-slip rubber feet prevent sliding on granite counters'
    ],
    cons: [
      'Surface is plastic; hot cookware should not be placed directly on it'
    ],
    bestFor: 'Home bakers, fitness enthusiasts tracking portion sizes, and gourmet cooking.',
    verdict: 'Reliable, compact, and accurate. Essential for consistent baking and calorie monitoring.',
    inStock: true,
    asin: 'B07ZGBPXVT'
  },
  {
    id: 'prod-kg-03',
    name: 'Ganesh 14-in-1 Multipurpose Vegetable & Fruit Slicer with Stainless Steel Blades',
    slug: 'ganesh-14-in-1-multipurpose-vegetable-slicer',
    brand: 'Ganesh',
    category: 'Kitchen Gadgets',
    categorySlug: 'kitchen-gadgets',
    description: 'All-inclusive multipurpose mandoline food dicer with 14 interchangeable attachments, including thick and thin julienne, waffle cutting, grating, and egg separator with a container base.',
    shortDescription: '14-in-1 heavy duty vegetable cutter and grater with catch container and safety pusher.',
    images: [
      'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=800&q=80'
    ],
    price: 549,
    originalPrice: 1199,
    discountPercent: 54,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B07B9QWZ43?tag=avnivo-demo-21',
    rating: 4.1,
    ratingCount: 8400,
    featured: false,
    trending: false,
    specifications: {
      'Attachment Count': '14 Interchangeable inserts',
      'Material': 'BPA-Free Food Grade Plastic & 420 Stainless Steel',
      'Catch Container Capacity': '1.2 Liters',
      'Cleaning Tool': 'Included scraper brush'
    },
    pros: [
      'Cuts French fries, shreds cabbage, and cubes potatoes uniformly',
      'Catch tray keeps the kitchen counter completely spotless',
      'Includes safety hand guard to protect fingers'
    ],
    cons: [
      'Must wash immediately after turmeric or beetroot use to avoid staining'
    ],
    bestFor: 'Large families and meal prep cooks who slice large quantities of vegetables.',
    verdict: 'A versatile kitchen workhorse that eliminates the need for multiple single-purpose graters.',
    inStock: true,
    asin: 'B07B9QWZ43'
  },
  {
    id: 'prod-kg-04',
    name: 'Cello Silicone Heat-Resistant Spatula & Basting Brush Set of 4',
    slug: 'cello-silicone-heat-resistant-spatula-brush-set',
    brand: 'Cello',
    category: 'Kitchen Gadgets',
    categorySlug: 'kitchen-gadgets',
    description: 'Food grade silicone kitchen tool set featuring seamless one-piece design resistant to heat up to 230°C. Protects non-stick and tri-ply cookware from surface scratches.',
    shortDescription: 'Heat resistant 100% silicone scraper spatulas and oil basting brush set.',
    images: [
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80'
    ],
    price: 349,
    originalPrice: 699,
    discountPercent: 50,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B08CXK9L8Z?tag=avnivo-demo-21',
    rating: 4.5,
    ratingCount: 11200,
    featured: false,
    trending: false,
    specifications: {
      'Heat Resistance': 'Up to 230°C (446°F)',
      'Material': 'BPA-Free LFGB Certified Silicone',
      'Core': 'Internal Stainless Steel Reinforcement',
      'Pieces': '4 (Jar spatula, spoon spatula, slotted turner, basting brush)'
    },
    pros: [
      'Zero scratches on expensive non-stick coatings and seasoned cast iron',
      'Seamless hygienic design prevents oil or food buildup inside handles',
      'Dishwasher safe and odor-resistant'
    ],
    cons: [
      'Flexible edge is not suitable for chopping frozen foods inside the pan'
    ],
    bestFor: 'Everyday curries, egg flipping, cake batter folding, and dosa oil basting.',
    verdict: 'Superior to wooden or plastic spoons. Safe, durable, and highly recommended.',
    inStock: true,
    asin: 'B08CXK9L8Z'
  },

  // 2. Cookware
  {
    id: 'prod-cw-01',
    name: 'Prestige Platina Tri-Ply Stainless Steel Deep Kadhai with Lid (2.5 Liters, 24 cm)',
    slug: 'prestige-platina-tri-ply-stainless-steel-kadhai-2.5l',
    brand: 'Prestige',
    category: 'Cookware',
    categorySlug: 'cookware',
    description: 'The Prestige Platina Tri-Ply Kadhai is crafted with 3-layer bonded engineering: inner 304 food-grade surgical steel, middle encapsulated aluminum core for uniform heat distribution without hot spots, and outer induction-friendly 430 stainless steel. Eliminates burning and requires minimal oil.',
    shortDescription: 'Heavy-gauge tri-ply stainless steel deep kadhai with snug lid, compatible with gas and induction.',
    images: [
      'https://images.unsplash.com/photo-1584990347449-399d863e4aa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    price: 2199,
    originalPrice: 3495,
    discountPercent: 37,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B07L2P8Z5Y?tag=avnivo-demo-21',
    rating: 4.4,
    ratingCount: 14200,
    featured: true,
    trending: true,
    dealOfTheDay: true,
    specifications: {
      'Capacity': '2.5 Liters (24 cm Diameter)',
      'Construction': '3-Layer Tri-Ply (SS 304 + Aluminium + SS 430)',
      'Cooktop Compatibility': 'Gas Stove, Induction, Ceramic, Halogen',
      'Handles': 'Cast Stainless Steel Stay-Cool Riveted Handles',
      'Warranty': '5 Years Manufacturer Warranty'
    },
    pros: [
      '100% toxin-free cooking with zero chemical coating peeling',
      'Even heat distribution prevents milk scorch and dal sticking',
      'Heavy-gauge 2.6mm thickness prevents denting and warping',
      'Sturdy stay-cool cast handles give secure grip when lifting'
    ],
    cons: [
      'Heavier than single-ply aluminium cookware (approx 1.4 kg)',
      'Requires preheating and temperature management for delicate egg frying'
    ],
    bestFor: 'Deep frying samosas, simmering Indian curries, sautéing sabzis, and making kheer.',
    verdict: 'The gold standard in healthy Indian cookware. A generational kitchen asset that will last a lifetime without degrading.',
    inStock: true,
    badge: 'AVNIVO Top Pick',
    asin: 'B07L2P8Z5Y'
  },
  {
    id: 'prod-cw-02',
    name: 'The Indus Valley Pre-Seasoned Cast Iron Skillet / Fry Pan (10 Inch)',
    slug: 'indus-valley-pre-seasoned-cast-iron-skillet-10inch',
    brand: 'The Indus Valley',
    category: 'Cookware',
    categorySlug: 'cookware',
    description: '100% natural, chemical-free pre-seasoned cast iron skillet infused with organic vegetable oils. Naturally fortifies your everyday meals with dietary iron while delivering unmatched heat retention and sear crust.',
    shortDescription: 'Naturally non-stick pre-seasoned cast iron skillet for dosas, rotis, and pan frying.',
    images: [
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80'
    ],
    price: 1399,
    originalPrice: 2490,
    discountPercent: 44,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B07T7H7W1X?tag=avnivo-demo-21',
    rating: 4.3,
    ratingCount: 9600,
    featured: false,
    trending: true,
    specifications: {
      'Diameter': '25.4 cm (10 Inch)',
      'Weight': '2.1 kg',
      'Coating': '100% Natural Vegetable Oil Seasoning (Zero PTFE/PFOA)',
      'Compatibility': 'Gas, Induction, Campfire, Oven Safe up to 260°C'
    },
    pros: [
      'Naturally fortifies daily food with iron',
      'Yields restaurant-grade crispy crusts on paneer tikka and parathas',
      'Virtually indestructible construction'
    ],
    cons: [
      'Heavy weight requires two hands when full',
      'Must be towel dried immediately after wash and wiped with drop of oil'
    ],
    bestFor: 'Crisp parathas, dosas, pan-fried fish, and seared vegetables.',
    verdict: 'The healthiest alternative to PTFE non-stick pans. Gets smoother and more non-stick with every cook.',
    inStock: true,
    asin: 'B07T7H7W1X'
  },
  {
    id: 'prod-cw-03',
    name: 'Hawkins Futura Hard Anodised Deep Kadai with Glass Lid (3.75 Litre)',
    slug: 'hawkins-futura-hard-anodised-deep-kadai-3.75l',
    brand: 'Hawkins',
    category: 'Cookware',
    categorySlug: 'cookware',
    description: 'Engineered with 4.06 mm thick extra-hard anodised aluminium that is non-reactive to sour ingredients like tamarind and tomatoes. Provides quick and even heating while maintaining thermal mass.',
    shortDescription: 'Heavy-duty 4.06mm hard-anodised non-stick non-reactive kadhai with toughened glass lid.',
    images: [
      'https://images.unsplash.com/photo-1584990347449-399d863e4aa9?auto=format&fit=crop&w=800&q=80'
    ],
    price: 1850,
    originalPrice: 2275,
    discountPercent: 19,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B002NGN954?tag=avnivo-demo-21',
    rating: 4.5,
    ratingCount: 16700,
    featured: false,
    trending: false,
    specifications: {
      'Capacity': '3.75 Liters',
      'Thickness': '4.06 mm Hard Anodised Base',
      'Lid': '4 mm Heat-Resistant Toughened Glass Lid',
      'Stay-Cool Handles': 'Comfortable rosewood-style heat-shield handles'
    },
    pros: [
      'Does not pit, tarnish, or corrode from acidic gravies',
      'Conducts heat faster than stainless steel',
      'Generous 3.75L volume handles cooking for 4-6 people'
    ],
    cons: [
      'Not dishwasher safe; requires mild liquid soap hand washing',
      'Standard model is gas-stove only'
    ],
    bestFor: 'Family-size biryanis, sambar, chicken curries, and festival cooking.',
    verdict: 'A trusted legacy classic refined with modern ergonomics. Delivers outstanding thermal consistency.',
    inStock: true,
    asin: 'B002NGN954'
  },
  {
    id: 'prod-cw-04',
    name: 'Prestige Deluxe Alpha Stainless Steel Pressure Cooker (3 Liters, Outer Lid)',
    slug: 'prestige-deluxe-alpha-stainless-steel-pressure-cooker-3l',
    brand: 'Prestige',
    category: 'Cookware',
    categorySlug: 'cookware',
    description: 'High-grade stainless steel pressure cooker engineered with an Alpha base (heavy-duty bottom for induction & gas). Features a pressure indicator, controlled gasket release system, and double screw handles.',
    shortDescription: 'Safe, durable 3L stainless steel pressure cooker with Alpha induction base.',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    price: 2450,
    originalPrice: 3250,
    discountPercent: 25,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B00EICJ4C8?tag=avnivo-demo-21',
    rating: 4.4,
    ratingCount: 22100,
    featured: false,
    trending: true,
    specifications: {
      'Capacity': '3.0 Liters',
      'Base': 'Alpha Induction Encapsulated Bottom',
      'Safety Devices': 'Pressure indicator, Gasket Release System, Metallic Safety Plug',
      'Warranty': '5 Years Warranty'
    },
    pros: [
      'High-grade stainless steel does not leach aluminium into pulses or rice',
      'Alpha bottom eliminates scorched dal spots',
      'Quick cooking saves up to 50% LPG consumption'
    ],
    cons: [
      'Outer lid design takes a few tries to align if accustomed to inner lid models'
    ],
    bestFor: 'Daily cooking of dals, basmati rice, khichdi, and boiled chickpeas.',
    verdict: 'Unmatched durability and safety. The most reliable pressure cooker choice for health-conscious families.',
    inStock: true,
    asin: 'B00EICJ4C8'
  },

  // 3. Kitchen Storage & Organization
  {
    id: 'prod-so-01',
    name: 'Amazon Brand - Solimo Modular Airtight Container Set (Set of 6 - 1500 ml each)',
    slug: 'solimo-modular-airtight-container-set-6pc',
    brand: 'Solimo',
    category: 'Kitchen Storage & Organization',
    categorySlug: 'kitchen-storage-organization',
    description: 'Space-saving stackable pantry organizer set built from 100% BPA-free food-grade plastic. The silicone seal ring and 4-way snap-lock lids keep spices, dals, grains, and dry fruits protected from humidity and pests.',
    shortDescription: 'BPA-free transparent airtight pantry storage containers with 4-side locking clips.',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80'
    ],
    price: 799,
    originalPrice: 1499,
    discountPercent: 47,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B07P8N9B3W?tag=avnivo-demo-21',
    rating: 4.3,
    ratingCount: 31200,
    featured: true,
    trending: true,
    specifications: {
      'Count': '6 Containers (1500 ml each)',
      'Material': 'BPA-Free Polypropylene (PP 5)',
      'Lid System': '4-Side Snap Lock with Silicone Gasket',
      'Freezer Safe': 'Yes (Down to -20°C)',
      'Dishwasher Safe': 'Top-rack safe'
    },
    pros: [
      '100% leak-proof and airtight seal prevents pantry moths and moisture',
      'Crystal-clear walls allow quick content identification without opening',
      'Modular square shape stacks flush against shelf corners'
    ],
    cons: [
      'Lid snap tabs should not be bent backwards forcefully'
    ],
    bestFor: 'Storing dals, rice, flour, poha, biscuits, and dry snacks.',
    verdict: 'Instantly declutters messy kitchen cabinets and keeps staple dry goods fresh for months.',
    inStock: true,
    asin: 'B07P8N9B3W'
  },
  {
    id: 'prod-so-02',
    name: 'Plantex 2-Tier Stainless Steel Kitchen Countertop Spice Rack & Organizer',
    slug: 'plantex-2-tier-stainless-steel-spice-rack',
    brand: 'Plantex',
    category: 'Kitchen Storage & Organization',
    categorySlug: 'kitchen-storage-organization',
    description: 'Heavy-gauge stainless steel 2-tier organizer shelf designed to maximize vertical counter space. Corrosion-resistant chrome plating prevents rust in humid Indian kitchens while keeping jars within arm’s reach.',
    shortDescription: 'Sturdy 2-tier stainless steel countertop shelf for spice jars, sauce bottles, and tins.',
    images: [
      'https://images.unsplash.com/photo-1584990347449-399d863e4aa9?auto=format&fit=crop&w=800&q=80'
    ],
    price: 949,
    originalPrice: 1899,
    discountPercent: 50,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B08V8R3R3P?tag=avnivo-demo-21',
    rating: 4.4,
    ratingCount: 7800,
    featured: false,
    trending: false,
    specifications: {
      'Material': 'High-Grade Stainless Steel Wire',
      'Dimensions': '38 cm (L) x 16 cm (W) x 36 cm (H)',
      'Load Capacity': 'Up to 15 kg per tier',
      'Feet': 'Non-scratch rubber anti-slip pads'
    },
    pros: [
      'Freestanding design requires zero wall drilling or screws',
      'Holds up to 16 standard masala jars neatly',
      'Rust-resistant finish holds up in humid kitchen settings'
    ],
    cons: [
      'Grid spacing requires using flat-bottom jars to avoid slight tilting'
    ],
    bestFor: 'Condiment storage, oil dispenser bottles, and daily spice jars near the cooktop.',
    verdict: 'Doubles usable cooking counter area while keeping daily essentials organized.',
    inStock: true,
    asin: 'B08V8R3R3P'
  },
  {
    id: 'prod-so-03',
    name: 'Cello Checkers PET Plastic Storage Jar Set of 18 (300ml, 650ml, 1200ml)',
    slug: 'cello-checkers-pet-storage-jar-set-18pc',
    brand: 'Cello',
    category: 'Kitchen Storage & Organization',
    categorySlug: 'kitchen-storage-organization',
    description: 'Bestselling budget kitchen jar set offering 18 assorted modular jars in three practical sizes. Features ribbed checker texture for slip-free grip and airtight silver threaded screw lids.',
    shortDescription: '18-piece multipurpose checkered airtight jar set in 3 assorted sizes.',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80'
    ],
    price: 599,
    originalPrice: 1099,
    discountPercent: 45,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B01N2H8Q0G?tag=avnivo-demo-21',
    rating: 4.2,
    ratingCount: 48900,
    featured: false,
    trending: true,
    specifications: {
      'Quantity': '18 Jars (6 x 300ml, 6 x 650ml, 6 x 1200ml)',
      'Material': '100% Food-Grade Virgin PET (BPA Free)',
      'Closure': 'Airtight Ribbed Screw Caps',
      'Transparency': 'High-clarity clear polymer'
    },
    pros: [
      'Extremely economical complete pantry overhaul in one box',
      'Three graduated sizes match standard grocery packet sizes',
      'Lightweight and shatterproof'
    ],
    cons: [
      'Not suitable for boiling hot liquids or microwave heating'
    ],
    bestFor: 'Organizing whole and powdered spices, tea, sugar, and daily pulses.',
    verdict: 'The best high-value pantry organizer bundle for budget-minded homes.',
    inStock: true,
    asin: 'B01N2H8Q0G'
  },
  {
    id: 'prod-so-04',
    name: 'Milton Thermosteel Flip Lid Insulated Stainless Steel Flask (1000 ml)',
    slug: 'milton-thermosteel-flip-lid-flask-1000ml',
    brand: 'Milton',
    category: 'Kitchen Storage & Organization',
    categorySlug: 'kitchen-storage-organization',
    description: 'Double-walled vacuum insulated flask fabricated with 304 grade stainless steel. Copper coating between walls keeps water, tea, or coffee boiling hot for 24 hours or chilled cold for 24 hours.',
    shortDescription: 'Double-walled vacuum insulated flask keeping beverages hot/cold for 24 hours.',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    price: 999,
    originalPrice: 1290,
    discountPercent: 23,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B007628T2M?tag=avnivo-demo-21',
    rating: 4.4,
    ratingCount: 62400,
    featured: false,
    trending: false,
    specifications: {
      'Volume': '1000 ml (1 Liter)',
      'Thermal Performance': '24 Hours Hot / 24 Hours Cold',
      'Material': 'Rust-proof 304 Grade Stainless Steel Interior & Exterior',
      'Cap': 'Thermal flip lid with built-in drinking cup and thermal jacket'
    },
    pros: [
      'Unrivaled temperature retention even in harsh Indian winters and summers',
      'Condensation-free exterior will not wet work desks or backpack linings',
      'Includes padded fabric carry pouch with sling strap'
    ],
    cons: [
      'Avoid carbonated beverages to prevent pressure buildup'
    ],
    bestFor: 'Office hydration, road trips, bedside warm water, and baby formula milk prep.',
    verdict: 'The indisputable king of thermal flasks in India. Rugged, leak-proof, and timeless.',
    inStock: true,
    asin: 'B007628T2M'
  },

  // 4. Home Decor
  {
    id: 'prod-hd-01',
    name: 'CraftVatika Ceramic Donut Vase Set of 2 (Nordic Minimalist Aesthetic)',
    slug: 'craftvatika-ceramic-donut-vase-set-of-2',
    brand: 'CraftVatika',
    category: 'Home Decor',
    categorySlug: 'home-decor',
    description: 'Handcrafted ceramic hollow donut vases featuring a tactile frosted matte finish. Designed to elevate modern console tables, TV units, and dining centerpieces with pampas grass, dried eucalyptus, or fresh blooms.',
    shortDescription: 'Handcrafted Nordic matte ceramic hollow donut vases for modern bohemian decor.',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
    ],
    price: 799,
    originalPrice: 1599,
    discountPercent: 50,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B09V7N4W8Q?tag=avnivo-demo-21',
    rating: 4.4,
    ratingCount: 3800,
    featured: true,
    trending: true,
    specifications: {
      'Quantity': 'Set of 2 Vases (Large & Medium)',
      'Finish': 'Matte Frosted Unpolished Ceramic',
      'Height': 'Large: 20 cm, Medium: 16 cm',
      'Care': 'Wipe clean with a dry microfiber cloth'
    },
    pros: [
      'Instant architectural elegance for coffee tables and bookshelf styling',
      'Neutral off-white hue complements any Indian interior palette',
      'Solid weighted base prevents tipping over'
    ],
    cons: [
      'Fragile ceramic must be handled carefully around young children and pets'
    ],
    bestFor: 'Living room coffee tables, foyer credenzas, and bedroom side tables.',
    verdict: 'A viral home decor trend executed with premium craftsmanship. Elevates any room effortlessly.',
    inStock: true,
    asin: 'B09V7N4W8Q'
  },
  {
    id: 'prod-hd-02',
    name: 'Allin Exporters Ultrasonic Aromatherapy Essential Oil Diffuser (500 ml)',
    slug: 'allin-exporters-ultrasonic-aromatherapy-diffuser-500ml',
    brand: 'Allin Exporters',
    category: 'Home Decor',
    categorySlug: 'home-decor',
    description: 'Multifunctional 500ml ultrasonic cool mist humidifier and fragrance diffuser. Features 7-color soothing LED ambient night lights, 4 timer settings, and auto-shutoff when water level runs dry.',
    shortDescription: '500ml ultrasonic cool mist aroma diffuser with 7 ambient LED lights and auto-shutoff.',
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'
    ],
    price: 1299,
    originalPrice: 2490,
    discountPercent: 48,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B01LW8V8W3?tag=avnivo-demo-21',
    rating: 4.3,
    ratingCount: 12100,
    featured: false,
    trending: true,
    specifications: {
      'Water Tank Capacity': '500 ml',
      'Coverage Area': 'Up to 300 sq. ft.',
      'Mist Output': 'Continuous & Intermittent modes (up to 12 hours run time)',
      'Lighting': '7 Mood-Enhancing LED Colors with Dim / Bright controls'
    },
    pros: [
      'Whisper-quiet ultrasonic operation below 25 dB',
      'Humidifies dry air-conditioned rooms while filling the space with fragrance',
      'Automatic safety shutoff when empty'
    ],
    cons: [
      'Requires weekly tank rinsing to prevent essential oil residue buildup'
    ],
    bestFor: 'Bedrooms, meditation corners, home offices, and living rooms.',
    verdict: 'Creates a spa-like calm at home. Excellent reliability and pleasant ambient lighting.',
    inStock: true,
    asin: 'B01LW8V8W3'
  },
  {
    id: 'prod-hd-03',
    name: 'Decorfur Luxury Velvet Cushion Covers Set of 5 (16 x 16 Inches)',
    slug: 'decorfur-luxury-velvet-cushion-covers-set-5',
    brand: 'Decorfur',
    category: 'Home Decor',
    categorySlug: 'home-decor',
    description: 'Plush velvet accent pillow covers with subtle gold geometric foil printing and concealed invisible zippers. Tailored for standard 16x16 inch sofa cushions to infuse rich luxury into any living space.',
    shortDescription: 'Ultra-soft velvet cushion covers with gold geometric accents and hidden zippers.',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    price: 649,
    originalPrice: 1399,
    discountPercent: 54,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B08X7V5M7Q?tag=avnivo-demo-21',
    rating: 4.3,
    ratingCount: 5200,
    featured: false,
    trending: false,
    specifications: {
      'Size': '16 x 16 inches (40 x 40 cm)',
      'Fabric': 'High GSM Crushed Micro Velvet',
      'Closure': 'Concealed Color-Matched Zipper',
      'Care': 'Gentle machine wash inside out'
    },
    pros: [
      'Rich tactile texture that does not shed lint or fade',
      'Hidden zipper allows smooth insertion of fluffy cushion inserts',
      'Gold motif adds festival sparkle without being gaudy'
    ],
    cons: [
      'Cushion inserts not included (covers only)'
    ],
    bestFor: 'Sofa sets, accent armchairs, and master bedroom bed dressing.',
    verdict: 'High-end aesthetic at a fraction of boutique retail prices.',
    inStock: true,
    asin: 'B08X7V5M7Q'
  },

  // 5. Home Appliances
  {
    id: 'prod-ha-01',
    name: 'Philips Digital Air Fryer HD9252/90 with Rapid Air Technology (4.1 Liters)',
    slug: 'philips-digital-air-fryer-hd9252-90-4.1l',
    brand: 'Philips',
    category: 'Home Appliances',
    categorySlug: 'home-appliances',
    description: 'The market leader in healthy frying. Patented starfish bottom and Rapid Air Technology circulate superheated air with 360-degree vortex velocity, frying foods with up to 90% less oil while locking in natural juiciness.',
    shortDescription: 'Touchscreen digital air fryer with 7 presets and 90% less oil consumption.',
    images: [
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    ],
    price: 6999,
    originalPrice: 11995,
    discountPercent: 42,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B097RFBL2Y?tag=avnivo-demo-21',
    rating: 4.5,
    ratingCount: 28400,
    featured: true,
    trending: true,
    bestSeller: true,
    dealOfTheDay: true,
    specifications: {
      'Capacity': '4.1 Liters (Basket capacity: 0.8 kg)',
      'Wattage': '1400 Watts',
      'Control Panel': 'Digital Touchscreen with 7 One-Touch Cooking Presets',
      'Temperature Range': '60°C to 200°C',
      'Safety': 'Auto-off, Cool-touch exterior, Dishwasher-safe basket',
      'Warranty': '2 Years Global Warranty'
    },
    pros: [
      'Crispy samosas, chicken tikkas, and french fries with mere teaspoons of oil',
      'Rapid air circulation cooks 1.5x faster than conventional ovens',
      'Dishwasher safe QuickClean basket with non-stick coating',
      'Keep warm function holds food ready for up to 30 minutes'
    ],
    cons: [
      '4.1L capacity is optimal for 2-4 members; large families may need the 6.2L XXL model'
    ],
    bestFor: 'Guilt-free snacking, roasting tikkas, baking cakes, and reheating leftover samosas crisp.',
    verdict: 'The indisputable gold standard among air fryers in India. Consistently delivers the crispiest results with proven longevity.',
    inStock: true,
    badge: 'AVNIVO Best Overall',
    asin: 'B097RFBL2Y'
  },
  {
    id: 'prod-ha-02',
    name: 'Preethi Zodiac MG 218 Mixer Grinder 750W with 5 Jars including Master Chef Food Processor',
    slug: 'preethi-zodiac-mg218-mixer-grinder-750w-5jars',
    brand: 'Preethi',
    category: 'Home Appliances',
    categorySlug: 'home-appliances',
    description: 'India’s pioneer mixer grinder with a dedicated Master Chef Food Processor jar. Powered by the Vega W5 750-watt heavy-duty motor that grinds tough turmeric in 2 minutes and kneads atta in 1 minute.',
    shortDescription: 'Heavy-duty 750W mixer grinder with 5 jars including food processor jar for atta kneading.',
    images: [
      'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=800&q=80'
    ],
    price: 8499,
    originalPrice: 12220,
    discountPercent: 30,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B0169CQE16?tag=avnivo-demo-21',
    rating: 4.4,
    ratingCount: 34100,
    featured: true,
    trending: false,
    specifications: {
      'Motor': '750 Watts Vega W5 High-Torque Motor',
      'Jars': '5 Jars (1.5L Wet, 1.0L Dry, 0.5L Chutney, 2.1L Master Chef Jar, 3-in-1 Insta Fresh Juicer)',
      'Speed': '3 Speed Settings + Pulse',
      'Warranty': '2 Years on Product, 5 Years on Motor'
    },
    pros: [
      'Master Chef jar kneads soft chapati dough in under 60 seconds',
      'Chops vegetables, slices cucumbers, and extracts citrus juices effortlessly',
      'Safety indicator lamp turns from blue to red in case of overload'
    ],
    cons: [
      'Motor noise is substantial around 80 dB under heavy load'
    ],
    bestFor: 'Families needing an all-in-one kitchen workhorse for daily cooking and baking prep.',
    verdict: 'Replaces multiple standalone appliances (chopper, kneader, juicer, grinder) in one durable base.',
    inStock: true,
    asin: 'B0169CQE16'
  },
  {
    id: 'prod-ha-03',
    name: 'Morphy Richards 300W Hand Blender with Stainless Steel Stem (HBCD)',
    slug: 'morphy-richards-300w-hand-blender-hbcd',
    brand: 'Morphy Richards',
    category: 'Home Appliances',
    categorySlug: 'home-appliances',
    description: 'Ergonomic handheld immersion blender with a detachable stainless steel shaft. Perfect for blending soups directly in the pot, whipping cream, pureeing baby food, and churning fresh curd lassi.',
    shortDescription: 'Ergonomic immersion hand blender with stainless steel shaft and variable speed.',
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    ],
    price: 1399,
    originalPrice: 2095,
    discountPercent: 33,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B009P2KLIO?tag=avnivo-demo-21',
    rating: 4.3,
    ratingCount: 15800,
    featured: false,
    trending: false,
    specifications: {
      'Power': '300 Watts DC Motor',
      'Stem': 'Food-grade Detachable Stainless Steel',
      'Blade': 'Multi-utility Stainless Steel Blade',
      'Mount': 'Wall-mountable bracket included'
    },
    pros: [
      'Detachable stem allows rapid rinsing under the tap',
      'Quiet operation compared to bulky table mixers',
      'Can blend hot dal and soup directly on the stove'
    ],
    cons: [
      'Not designed for dry masala powdering or hard nuts'
    ],
    bestFor: 'Dal tadka mashing, tomato puree, buttermilk, smoothies, and pancake batter.',
    verdict: 'Compact and convenient. A must-have for everyday Indian gravies and breakfasts.',
    inStock: true,
    asin: 'B009P2KLIO'
  },
  {
    id: 'prod-ha-04',
    name: 'Elica 60 cm 1200 m3/hr Filterless Auto Clean Kitchen Chimney (FL 600 HAC MS NERO)',
    slug: 'elica-60cm-1200-filterless-auto-clean-chimney',
    brand: 'Elica',
    category: 'Home Appliances',
    categorySlug: 'home-appliances',
    description: 'High-suction filterless kitchen chimney with motion sensor touch control and heating auto-clean technology. Eliminates oily smoke and pungent spices from heavy Indian deep frying.',
    shortDescription: '1200 m³/hr filterless auto-clean chimney with motion gesture control.',
    images: [
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80'
    ],
    price: 11990,
    originalPrice: 23990,
    discountPercent: 50,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B07N1NZ295?tag=avnivo-demo-21',
    rating: 4.4,
    ratingCount: 19600,
    featured: false,
    trending: true,
    specifications: {
      'Suction Capacity': '1200 m³/hr',
      'Size': '60 cm (Ideal for 2 to 4 burner stoves)',
      'Cleaning Tech': 'Heat Auto-Clean with Oil Collector Cup',
      'Control': 'Motion Sensor Touch & Wave Gesture'
    },
    pros: [
      'Filterless design means zero scrubbing of greasy mesh filters',
      'Wave your hand to turn ON/OFF without staining controls with turmeric hands',
      'Oil collector cup slides out for effortless 1-minute cleaning'
    ],
    cons: [
      'Professional installation required with 6-inch exterior exhaust ducting'
    ],
    bestFor: 'Kitchens with frequent tadkas, deep frying, and fish/meat preparations.',
    verdict: 'The top-rated filterless chimney in India. Saves enormous maintenance effort.',
    inStock: true,
    asin: 'B07N1NZ295'
  },

  // 6. Home Improvement
  {
    id: 'prod-hi-01',
    name: 'Bosch GSB 500W 10 RE Professional Tool Kit with Impact Drill and 100 Accessories',
    slug: 'bosch-gsb-500w-professional-tool-kit-100pcs',
    brand: 'Bosch',
    category: 'Home Improvement',
    categorySlug: 'home-improvement',
    description: 'The ultimate DIY home maintenance kit. Features a powerful 500-watt impact drill capable of drilling into concrete, brick, wood, and steel, paired with 100 essential accessories in a rugged carrying case.',
    shortDescription: '500W reversible impact drill kit with 100 drill bits, screws, and hand tools.',
    images: [
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80'
    ],
    price: 3699,
    originalPrice: 5999,
    discountPercent: 38,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B00ISU8T74?tag=avnivo-demo-21',
    rating: 4.3,
    ratingCount: 24700,
    featured: true,
    trending: false,
    specifications: {
      'Power Input': '500 Watts',
      'Impact Rate': '0 - 41,600 bpm',
      'Drilling Capacity': 'Concrete 10mm, Steel 8mm, Wood 20mm',
      'Contents': 'Drill, hammer, plier, wrench, spirit level, screwdrivers, 100 accessories'
    },
    pros: [
      'Eliminates the wait and cost of calling local handymen for wall hangings',
      'Forward/reverse toggle makes screw driving and removal effortless',
      'Sturdy organized hard case keeps every bit secure'
    ],
    cons: [
      'Corded power requires a nearby wall outlet or extension cord'
    ],
    bestFor: 'Mounting paintings, curtain rods, TV wall brackets, and assembling flat-pack furniture.',
    verdict: 'An investment that pays for itself after just three DIY repair jobs at home.',
    inStock: true,
    asin: 'B00ISU8T74'
  },
  {
    id: 'prod-hi-02',
    name: 'Wipro 16A Smart Wi-Fi Plug with Energy Monitoring (Compatible with Alexa & Google Home)',
    slug: 'wipro-16a-smart-wifi-plug-energy-monitoring',
    brand: 'Wipro',
    category: 'Home Improvement',
    categorySlug: 'home-improvement',
    description: 'Transform high-power appliances (geysers, air conditioners, room heaters, water pumps) into smart devices. Control them via the Wipro Smart app or voice commands, set schedules, and monitor live electricity consumption.',
    shortDescription: '16A heavy-duty Wi-Fi smart socket with real-time electricity usage tracker.',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'
    ],
    price: 999,
    originalPrice: 2290,
    discountPercent: 56,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B07ZZS4W3B?tag=avnivo-demo-21',
    rating: 4.2,
    ratingCount: 17800,
    featured: false,
    trending: true,
    specifications: {
      'Rated Current': '16 Amps (Up to 3600W load)',
      'Connectivity': '2.4 GHz Wi-Fi (No separate hub required)',
      'Features': 'Energy meter, Timer, Automation, Voice Control'
    },
    pros: [
      'Schedule geyser to turn ON at 6 AM and auto-off after 25 minutes',
      'Real-time kilowatt hour monitoring exposes power-hungry appliances',
      'Works with standard 16A Indian round 3-pin wall sockets'
    ],
    cons: [
      'Requires 2.4 GHz Wi-Fi band (does not connect directly to 5 GHz-only routers)'
    ],
    bestFor: 'Water heaters (geysers), window/split ACs, and automated morning coffee makers.',
    verdict: 'Smart living at its most practical. Prevents accidental geyser burnouts and saves electricity.',
    inStock: true,
    asin: 'B07ZZS4W3B'
  },
  {
    id: 'prod-hi-03',
    name: 'Classic Mosquito Net for Double Bed (King Size, Strong 30GSM Polyester Mesh)',
    slug: 'classic-mosquito-net-for-double-bed-king',
    brand: 'Classic Mosquito Net',
    category: 'Home Improvement',
    categorySlug: 'home-improvement',
    description: 'Self-supporting pop-up mosquito net with high-tensile steel spring frame. Pops open in 10 seconds without any wall nails or hanging ropes, providing 360-degree chemical-free protection from dengue and malaria mosquitoes.',
    shortDescription: 'Pop-up foldable mosquito net for King size bed with zippered doors.',
    images: [
      'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=800&q=80'
    ],
    price: 1149,
    originalPrice: 2100,
    discountPercent: 45,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B01MTG278Q?tag=avnivo-demo-21',
    rating: 4.3,
    ratingCount: 31200,
    featured: false,
    trending: false,
    specifications: {
      'Bed Size': 'King Size (200 cm x 200 cm x 145 cm)',
      'Material': '30GSM Tear-Resistant Breathable Polyester',
      'Frame': 'Corrosion-Resistant Spring Steel Wire',
      'Zippers': 'Dual two-way zippers on both sides'
    },
    pros: [
      '100% chemical-free protection without smelly coils or electric vaporizers',
      'Pops open in seconds and folds flat into a compact ring bag',
      'Extra netting skirt tucks under mattress to prevent crawling insects'
    ],
    cons: [
      'Folding back into the round bag takes 2-3 practice attempts'
    ],
    bestFor: 'Families with infants, pregnant mothers, and peaceful bite-free sleep.',
    verdict: 'The cleanest and healthiest mosquito solution for Indian bedrooms.',
    inStock: true,
    asin: 'B01MTG278Q'
  },

  // 7. Cleaning Products
  {
    id: 'prod-cp-01',
    name: 'Spotzero by Milton Prime Spin Mop with Bigger Wheels and Stainless Steel Wringer',
    slug: 'spotzero-by-milton-prime-spin-mop-stainless-steel',
    brand: 'Spotzero',
    category: 'Cleaning Products',
    categorySlug: 'cleaning-products',
    description: 'Heavy-duty 360-degree spin mop equipped with oversized wheels and an ergonomic pull-handle for effortless transport. Features a rugged stainless steel wringer bucket, liquid soap dispenser, and microfiber heads that lift stubborn floor grime.',
    shortDescription: 'Ergonomic 360° spin mop with stainless steel wringer basket and big wheels.',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'
    ],
    price: 1499,
    originalPrice: 2599,
    discountPercent: 42,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B07N376Y89?tag=avnivo-demo-21',
    rating: 4.2,
    ratingCount: 42300,
    featured: true,
    trending: true,
    specifications: {
      'Wringer Material': '100% Stainless Steel Spinner',
      'Mobility': '2 Extra-Large Rugged Wheels + Retractable Pull Handle',
      'Handle': 'Extendable Stainless Steel Handle (up to 125 cm)',
      'Refills': '2 Microfiber Mop Heads Included',
      'Drainage': 'Bottom rubber drainage plug'
    },
    pros: [
      'Stainless steel wringer will not crack like cheap plastic spinners',
      'Big wheels and luggage-style pull handle protect your lower back from lifting water',
      'Bottom drain plug empties dirty water without tipping the bucket'
    ],
    cons: [
      'Microfiber heads should be machine washed monthly to prevent lint collection'
    ],
    bestFor: 'Daily sweeping and wet mopping of vitrified tiles, marble, and wooden floors.',
    verdict: 'The best-engineered spin mop for Indian households. Extremely durable and back-friendly.',
    inStock: true,
    badge: 'India #1 Spin Mop',
    asin: 'B07N376Y89'
  },
  {
    id: 'prod-cp-02',
    name: 'Scotch-Brite Microfiber Bathroom & Floor Wiper (Extra Wide 40 cm Blade)',
    slug: 'scotch-brite-bathroom-floor-wiper-40cm',
    brand: 'Scotch-Brite',
    category: 'Cleaning Products',
    categorySlug: 'cleaning-products',
    description: 'High-density EVA rubber foam squeegee wiper from 3M Scotch-Brite. Designed with a wide 40 cm blade and lightweight aluminum pipe that dries wet bathroom tiles in a single stroke.',
    shortDescription: 'Extra-wide bathroom floor squeegee wiper for rapid dry floors.',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'
    ],
    price: 349,
    originalPrice: 599,
    discountPercent: 42,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B00T65M7I8?tag=avnivo-demo-21',
    rating: 4.4,
    ratingCount: 29800,
    featured: false,
    trending: false,
    specifications: {
      'Blade Width': '40 cm Wide Blade',
      'Blade Material': 'High-Density Closed Cell EVA Foam',
      'Rod': 'Rust-proof Powder-Coated Metal Handle',
      'Weight': 'Approx 420 grams'
    },
    pros: [
      'Clears water in one sweep without leaving water streaks',
      'Closed cell rubber does not absorb water or smell moldy',
      'Ergonomic angle reaches around toilet seats and washbasin pedestals'
    ],
    cons: [
      'Avoid scraping over sharp metal drain grates to prevent blade gouging'
    ],
    bestFor: 'Wet bathroom floors, balcony washdowns, and post-shower water clearing.',
    verdict: 'Simple, unpretentious, and highly effective. An essential fixture for every bathroom.',
    inStock: true,
    asin: 'B00T65M7I8'
  },
  {
    id: 'prod-cp-03',
    name: 'Gala NoDust Broom (Synthetic Washable Grass Broom)',
    slug: 'gala-nodust-washable-synthetic-grass-broom',
    brand: 'Gala',
    category: 'Cleaning Products',
    categorySlug: 'cleaning-products',
    description: 'Revolutionary synthetic grass broom crafted from micro-bristle polymer fiber. Eliminates the messy "bhusa" (dust shed) of traditional Meghalaya natural grass brooms while lasting 3 times longer.',
    shortDescription: 'Washable synthetic microfiber floor broom with zero dust shedding.',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'
    ],
    price: 249,
    originalPrice: 399,
    discountPercent: 38,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B00V49Y2MQ?tag=avnivo-demo-21',
    rating: 4.3,
    ratingCount: 54100,
    featured: false,
    trending: true,
    specifications: {
      'Bristle Material': 'Engineered Micro-Split Polymer Fibers',
      'Handle': 'Ergonomic Virgin Plastic Handle',
      'Washable': '100% Washable with tap water',
      'Length': '90 cm'
    },
    pros: [
      'Zero new-broom dust fallout from day one',
      'Can be washed with soap and water to keep hygienic',
      'Sweeps fine flour, pet hairs, and tiny dust particles cleanly'
    ],
    cons: [
      'Should not be stored bent against heavy corners'
    ],
    bestFor: 'Daily indoor sweeping of tiled and marble floors.',
    verdict: 'The modern upgrade to traditional jhadu that solves the shedding problem completely.',
    inStock: true,
    asin: 'B00V49Y2MQ'
  },

  // 8. Home Essentials
  {
    id: 'prod-he-01',
    name: 'The Sleep Company SmartGRID Orthopedic Cervical Pillow with Patented Hyper-Elastic Polymer',
    slug: 'sleep-company-smartgrid-orthopedic-cervical-pillow',
    brand: 'The Sleep Company',
    category: 'Home Essentials',
    categorySlug: 'home-essentials',
    description: 'Developed in partnership with orthopedic spine specialists, this pillow utilizes patented Japanese SmartGRID technology. Features 2500+ air channels for cooling airflow and dynamic ergonomic support that cradles your neck.',
    shortDescription: 'Patented SmartGRID ergonomic contour neck and spine support cooling pillow.',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=800&q=80'
    ],
    price: 2199,
    originalPrice: 4499,
    discountPercent: 51,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B099K1HZZ6?tag=avnivo-demo-21',
    rating: 4.4,
    ratingCount: 8900,
    featured: true,
    trending: true,
    dealOfTheDay: true,
    specifications: {
      'Core Technology': 'Patented Hyper-Elastic SmartGRID Matrix',
      'Cover': '100% Organic Bamboo Breathable Zippered Cover',
      'Dimensions': '60 cm x 38 cm x 12 cm',
      'Firmness': 'Medium Soft adaptive bounce'
    },
    pros: [
      'Relieves morning neck stiffness and cervical spine tension',
      'SmartGRID air-channels prevent heat trapping experienced with cheap memory foam',
      'Does not collapse or form permanent body indentations'
    ],
    cons: [
      'Heavier than hollow-fiber polyester pillows (approx 1.8 kg)'
    ],
    bestFor: 'Back sleepers, side sleepers, IT professionals, and individuals with neck ache.',
    verdict: 'A transformative leap in sleep quality. Superior comfort and spinal alignment.',
    inStock: true,
    badge: 'Editor Choice',
    asin: 'B099K1HZZ6'
  },
  {
    id: 'prod-he-02',
    name: 'Amazon Basics Foldable Stainless Steel Clothes Drying Rack (Wing Style)',
    slug: 'amazon-basics-foldable-stainless-steel-clothes-drying-rack',
    brand: 'Amazon Basics',
    category: 'Home Essentials',
    categorySlug: 'home-essentials',
    description: 'Spacious accordion-style foldable clothes drying stand fabricated from corrosion-resistant coated stainless steel. Provides 40 feet of linear drying space with dedicated flat sweater drying rack and shoe hangers.',
    shortDescription: 'Heavy-duty foldable wing clothes drying stand with 40 ft hanging space.',
    images: [
      'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=800&q=80'
    ],
    price: 1699,
    originalPrice: 3299,
    discountPercent: 48,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B00H7P1G7C?tag=avnivo-demo-21',
    rating: 4.4,
    ratingCount: 36500,
    featured: false,
    trending: true,
    specifications: {
      'Drying Space': '40 Linear Feet',
      'Weight Capacity': 'Up to 15 kg evenly distributed',
      'Frame': 'Rust-Resistant Coated Stainless Steel Tubes',
      'Folded Dimensions': '100 cm x 60 cm x 8 cm (Stores behind any door)'
    },
    pros: [
      'Folds flat in 5 seconds to tuck between the wardrobe and wall',
      'Adjustable wings accommodate long dupattas and bedsheets without dragging',
      'Does not rust or stain damp white clothes'
    ],
    cons: [
      'In high balcony winds, weights or clips on base are advised'
    ],
    bestFor: 'Apartment balconies, monsoon indoor drying, and family laundry.',
    verdict: 'Sturdy, practical, and space-saving. A balcony lifesaver during monsoons.',
    inStock: true,
    asin: 'B00H7P1G7C'
  },
  {
    id: 'prod-he-03',
    name: 'Spaces 100% Pure Cotton 210 TC King Size Bedsheet with 2 Pillow Covers',
    slug: 'spaces-100-cotton-210tc-king-bedsheet-set',
    brand: 'Spaces',
    category: 'Home Essentials',
    categorySlug: 'home-essentials',
    description: 'Crisp and breathable 210 thread count 100% pure long-staple cotton bedsheet set by Spaces (Welspun). Treated with anti-microbial finish to stay fresh in Indian tropical weather.',
    shortDescription: 'Breathable 210 TC pure cotton King size bedsheet with color-lock technology.',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    price: 1299,
    originalPrice: 2499,
    discountPercent: 48,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/B08Y5M1P8Z?tag=avnivo-demo-21',
    rating: 4.3,
    ratingCount: 14200,
    featured: false,
    trending: false,
    specifications: {
      'Dimensions': 'Bedsheet: 274 x 274 cm (108 x 108 inches), Pillow Covers: 46 x 68 cm',
      'Thread Count': '210 TC Sateen Weave',
      'Material': '100% Combed Cotton',
      'Color Fastness': 'Guaranteed azo-free reactive dyes'
    },
    pros: [
      'Naturally cool and breathable for Indian summers',
      'Generous tuck-in margin prevents corners from slipping off 8-inch mattresses',
      'Becomes noticeably softer with each subsequent wash'
    ],
    cons: [
      'Pure cotton exhibits natural subtle wrinkles unless steam ironed'
    ],
    bestFor: 'Everyday restful sleep on double and King-sized mattresses.',
    verdict: 'Authentic 100% cotton at fair pricing. Reliable weave that holds up wash after wash.',
    inStock: true,
    asin: 'B08Y5M1P8Z'
  }
];

// Helper functions for easy querying
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter(p => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.featured);
}

export function getTrendingProducts(): Product[] {
  return PRODUCTS.filter(p => p.trending);
}

export function getDealProducts(): Product[] {
  return PRODUCTS.filter(p => (p.dealOfTheDay || p.discountPercent >= 40));
}

