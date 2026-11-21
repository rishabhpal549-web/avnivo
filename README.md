# AVNIVO – Next-Generation E-commerce & Affiliate Shopping Platform

> **Tagline:** Discover. Compare. Shop.  
> **Primary Market:** India | **Primary Currency:** INR (₹) | **Platform:** Next.js (App Router), React, TypeScript, Tailwind CSS, Prisma ORM  

---

## 🌟 Executive Summary

**AVNIVO** is a production-ready, high-performance shopping discovery and price comparison platform built specifically for the Indian consumer market. 

While architected to expand into a full-scale direct multi-vendor marketplace (comparable to Amazon and Flipkart), the current initial launch phase prioritizes **unbiased product discovery, multi-merchant price comparison, and transparent affiliate marketing**.

---

## 🎨 Brand Identity & Design System

- **Brand Name:** AVNIVO
- **Tagline:** Discover. Compare. Shop.
- **Custom Brandmark:** Geometric Hexagonal Shield with Precision Compass Pivot (Original SVG asset, no imitation of third-party marks)
- **Color Palette:**
  - **Deep Navy Blue (`#101B35`):** Primary brand authority, headers, footers, typography
  - **Royal Blue (`#2563EB`):** Primary action buttons, active states, key interactive highlights
  - **Electric Blue (`#3B82F6`):** Accents, badges, category callouts
  - **Pure White (`#FFFFFF`):** Base canvas and card background
  - **Surface Grey (`#F5F7FA`):** Secondary backgrounds and specification grids
  - **Dark Charcoal (`#202938`):** Readable, high-contrast typography
  - **Forest Green (`#16A34A`):** Verified savings, discounts, in-stock badges
- **Typography:** Modern clean sans-serif typography with responsive scaling and accessible contrast.
- **Localization:** Bilingual architecture with instant English and Hindi (हिंदी) UI toggling.

---

## 🚀 Key Modules & Architecture

### 1. Multi-Category Product Catalog
Covers 8 core categories with dynamic subcategories:
1. **Electronics & Gadgets** (Smartphones, Laptops, Audio Gear, Smartwatches, Tablets)
2. **Fashion & Clothing** (Men's Fashion, Women's Wear, Kids, Footwear, Bags)
3. **Home & Kitchen** (Kitchen Appliances, Cookware, Home Decor, Cleaning)
4. **Beauty & Personal Care** (Skincare, Haircare, Grooming, Makeup)
5. **Sports & Fitness** (Gym Equipment, Running Footwear, Yoga Accessories)
6. **Books & Stationery** (Bestsellers, Exam Prep, Office Supplies)
7. **Toys & Baby Products** (Learning Toys, Infant Care, Strollers)
8. **Travel & Lifestyle** (Hard-sided Luggage, Backpacks, Travel Accessories)

### 2. Multi-Merchant Price Comparison Engine
- Compares verified offers across authorized Indian retailers: **Amazon India, Flipkart, Croma, Tata CLiQ, and Reliance Digital**.
- Transparently highlights the lowest indicative price.
- Live delivery information (e.g., "Free Prime Next-Day Delivery").
- Verification timestamps showing when the price was last checked.
- No fabricated discounts or artificial original prices.

### 3. Ethical Affiliate Marketing & Outbound Tracking
- **Link Redirection Engine:** Routes through `/api/affiliate/redirect` or `/out/[id]`.
- **Privacy-First Audit Logging:** Records anonymized SHA-256 hashed IP identifiers (in compliance with India's DPDP Act 2023), User-Agent, Referrer, and UTM campaign parameters (`utm_source`, `utm_medium`, `utm_campaign`).
- **Merchant Tracking Tags:** Configured for Amazon Associates India (`tag=avnivo-21`) and Flipkart Affiliate Network (`affid=avnivo`).
- **Statutory Disclosures:** Clear callouts conforming to Indian Consumer Protection (E-Commerce) Rules 2020 on all product pages and dedicated disclosure page.

### 4. Advanced Search & Filter Engine
- **Live Autocomplete:** Suggests matching products, categories, and brands as you type.
- **Multi-Faceted Filters:** Filter simultaneously by Category, Brand, Price Range (Min/Max ₹), Minimum Discount (10% to 50%+), Verified Rating (4★ and above), and Merchant Store.
- **Sorting Modes:** Most Popular, Newest Arrivals, Price: Low to High, Price: High to Low, Highest Discount, Highest Rating.
- **Layouts:** Seamless toggling between Grid View and List View.

### 5. Side-by-Side Product Comparison
- Add up to 4 items simultaneously to a floating compare tray.
- Side-by-side feature matrix comparing display, processors, battery, cameras, warranty, and merchant offers.
- Add products via modal search directly within the comparison screen.

### 6. User Authentication & Personal Dashboard
- Email and password registration with server-side Zod validation.
- Secure **bcrypt** password hashing with 10 salt rounds.
- Encrypted **HTTP-only JWT session cookies** (`avnivo_auth_token`).
- Personal Dashboard: Saved Wishlist, Active Comparisons, Profile Settings, and Notification Preferences.
- Role-based Access Control (`USER`, `ADMIN`, `CONTENT_MANAGER`, `SUPPORT_STAFF`).

### 7. Administrative Control Panel (`/admin`)
- **Executive Analytics:** Total products, active categories, total affiliate clicks, user counts, and pending inquiries.
- **Merchant Distribution:** Visual progress bars displaying click volume per retailer.
- **Product Management:** Complete CRUD interface to create, edit, and delete products, manage prices, and configure merchant affiliate URLs.
- **Affiliate Click Audit:** Live stream of outbound clicks with privacy hashes, timestamps, and UTM attribution.
- **Support & Grievances:** Review customer inquiries and update resolution status.

### 8. Statutory & Legal Compliance (India)
- **Affiliate Disclosure (`/affiliate-disclosure`):** Comprehensive FTC & Indian E-commerce compliant statement.
- **Privacy Policy (`/privacy-policy`):** Compliant with India's Digital Personal Data Protection Act (DPDP Act 2023).
- **Consumer Grievance Redressal (`/grievance-redressal`):** Designated Nodal Grievance Officer details per Consumer Protection (E-Commerce) Rules 2020.
- **Pricing Disclaimer (`/disclaimer`):** Explicit notification of indicative price feeds and external merchant fulfillment.
- **Terms of Service (`/terms`) & Cookie Policy (`/cookie-policy`)**.

### 9. Future E-Commerce & Multi-Vendor Readiness
- Database schema fully models `Order`, `OrderItem`, `Address`, and `Seller` entities.
- Feature flags (`NEXT_PUBLIC_FEATURE_DIRECT_CHECKOUT="false"`, `NEXT_PUBLIC_FEATURE_MULTI_VENDOR="false"`) allow direct activation without schema rebuilds.
- Interactive cart modal explains the future direct purchase roadmap to consumers.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router, Server & Client Components) |
| **Language** | TypeScript (Strict mode enabled) |
| **Styling** | Tailwind CSS with custom AVNIVO design system |
| **Icons** | Lucide React |
| **Database** | SQLite (`dev.db`) for zero-friction local execution / PostgreSQL ready |
| **ORM** | Prisma ORM 5.22 |
| **Authentication** | Bcryptjs password hashing + JWT HTTP-only cookies |
| **SEO** | Dynamic XML Sitemap (`/sitemap.xml`), Robots.txt (`/robots.txt`), Schema.org JSON-LD |

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- Node.js v18.0.0 or higher
- npm or pnpm

### 2. Clone and Install Dependencies
```bash
cd AVNIVO
npm install
```

### 3. Setup Database & Seed Initial Products
```bash
# Push Prisma schema to create database
npx prisma db push

# Seed 12 realistic Indian market products, 5 verified merchants, and 8 categories
node prisma/seed.js
```

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🔑 Default Demonstration Accounts

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Super Admin** | `admin@avnivo.com` | `Admin@Avnivo2025!` | Full access to `/admin` dashboard, product CRUD, click logs |
| **Demo Customer** | `user@avnivo.com` | `User@Avnivo2025!` | Standard consumer dashboard, wishlist, compare tray |

---

## 🧪 Comprehensive Verification & Test Suite

The project includes automated verification test scripts:

```bash
# 1. Run database relational integrity and logic unit tests (14 checks)
node scripts/test-platform.js

# 2. Run Next.js production build check (compiles all 44 routes)
npm run build

# 3. Run end-to-end HTTP verification across key endpoints
node scripts/probe-server.js
```

### Verification Results
- Database Entity Relational Integrity: **14 PASSED / 0 FAILED**
- Production Build Compilation: **44/44 Static and Dynamic Routes Built Cleanly**
- End-to-End HTTP Probe: **11/11 Endpoints Returned HTTP 200 OK**

---

## 📱 Future Mobile App Integration (React Native / Expo)

AVNIVO is built with an **API-first architecture**. The web frontend and future iOS/Android mobile apps share the exact same backend endpoints:

- `GET /api/products`: Paginated product catalog with category, brand, and price filters.
- `GET /api/products/[slug]`: Product details, specification matrix, and merchant comparison offers.
- `GET /api/search/suggestions?q=...`: High-speed autocomplete suggestions.
- `GET /api/categories`: Category taxonomy with subcategories.
- `GET /api/wishlist`: User wishlist (supports Bearer JWT token in Authorization header).
- `GET /api/affiliate/redirect?offerId=...`: Outbound click logging with mobile deep-linking support (`intent://` or universal links).

---

## 📄 License & Attribution

© 2025-2026 AVNIVO Technologies. All rights reserved.  
All brand trademarks, retailer marks (Amazon, Flipkart, Croma, etc.), and product images are the property of their respective owners and used strictly for consumer identification and comparative discovery.
