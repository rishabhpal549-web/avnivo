# AVNIVO – Smart Living, Better Home.
### Premium Indian Home & Kitchen Affiliate Shopping Discovery Platform

AVNIVO is a modern, production-ready Home & Kitchen affiliate shopping discovery platform engineered specifically for Indian households. Built on Next.js 14 (App Router), TypeScript, Tailwind CSS, and Lucide Icons, AVNIVO combines the product discovery convenience of Amazon with an original visual brand identity.

---

## 🎨 Brand Identity

- **Brand Name**: AVNIVO
- **Tagline**: *Smart Living, Better Home.*
- **Business Category**: Home & Kitchen
- **Target Market**: India (Currency in INR `₹`)
- **Primary Navy Blue**: `#102F59`
- **Secondary Orange**: `#FF7900`
- **White**: `#FFFFFF`
- **Logo**: Circular AVNIVO monogram with hearth/home emblem and brand ring accents (`public/images/logo.svg`).

---

## 🚀 Key Features & Architecture

### 1. Amazon-Inspired Shopping Discovery
- **Top Utility Bar**: Region indicator (Delivering to India), direct Affiliate Disclosure link, customer help.
- **Header**: Circular AVNIVO logo, large central search bar with category selector dropdown, live autocomplete suggestions, and side-by-side comparison counter badge.
- **Category Navigation Strip**: Quick access to all 8 core Home & Kitchen categories + "Deals & Offers" flame badge.
- **Product Cards**: Discount badges, verified star ratings, MRP vs. deal price, side-by-side compare toggle, and direct affiliate Buy Now buttons.

### 2. Complete 10 Pages Built
1. **Home (`/`)**: Hero banner, Shop by Category, Featured Products, Trending in India, Verified Deals & Offers (40%+ OFF), Comparison Highlights, Buying Guides, Brand Trust Pillars, Newsletter signup.
2. **About Us (`/about`)**: Brand story, mission, vision, values, and our unbiased editorial testing methodology.
3. **Categories (`/categories` and `/categories/[slug]`)**: All 8 categories with product listings, description, verified product count, multi-brand filter, price slider, minimum star rating, and sorting.
   - *Kitchen Gadgets*, *Cookware*, *Kitchen Storage & Organization*, *Home Decor*, *Home Appliances*, *Home Improvement*, *Cleaning Products*, *Home Essentials*.
4. **Product Reviews (`/reviews` and `/reviews/[slug]`)**: Comprehensive review pages with image gallery, specs table, verified ratings, pros & cons, "Who Should Buy", AVNIVO Verdict, and affiliate Buy Now button.
5. **Product Comparison (`/compare`)**: Side-by-side comparison engine for up to 4 products with responsive mobile table, specification matrix, verified prices, and "Best Value Recommendation" badge.
6. **Buying Guides (`/buying-guides` and `/buying-guides/[slug]`)**: 6 in-depth SEO guides with table of contents, technical buying criteria, expert tips, FAQs, and recommended products.
7. **Contact Us (`/contact`)**: Contact form with client-side validation, anti-spam honeypot, direct editorial emails, and response timeframes.
8. **Privacy Policy (`/privacy-policy`)**: DPDP Act compliant privacy policy covering data collection, cookies, affiliate referral cookies, analytics, and user rights.
9. **Terms & Conditions (`/terms`)**: Permitted usage, intellectual property, external links disclaimer, and limitation of liability.
10. **Affiliate Disclosure (`/affiliate-disclosure`)**: Amazon Associates Operating Agreement statement, ASCI compliance, zero extra cost to readers explanation, and `rel="sponsored"` notice.

### 3. Product Discovery & Search (`/search`)
- Live keyword search across product name, brand, category, and description.
- Multi-filter toolbar (category, brand, 40%+ discount toggle, price sorting).
- Contextual empty states with suggested keywords and categories.

### 4. Admin Management Portal (`/admin`)
- Secure passcode protection (Demo PIN: `avnivo2026` or configurable via `NEXT_PUBLIC_ADMIN_PASSCODE`).
- Catalog metrics (total active products, category breakdown, verified ratings).
- Real-time product editing: update affiliate links, prices, and original MRP.
- Add new products modal with complete schema fields.
- Export Catalog JSON button for easy git commits.

### 5. Technical SEO
- Dynamic XML Sitemap (`/sitemap.xml`) generated via Next.js `sitemap.ts`.
- `robots.txt` generated via Next.js `robots.ts`.
- Schema.org JSON-LD Structured Data: `Organization`, `WebSite` with SearchAction, `Product`, `AggregateRating`, and `Article`.
- Unique meta titles, Open Graph tags, canonical URLs, and mobile viewport configuration.

---

## 📁 Project Structure

```
avnivo/
├── public/
│   ├── images/
│   │   └── logo.svg            # Circular AVNIVO brand logo
│   ├── favicon.svg             # Favicon
│   └── logo.svg                # Root logo alias
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Header, Footer & Schema.org
│   │   ├── page.tsx            # Page 1: Home
│   │   ├── about/page.tsx      # Page 2: About Us
│   │   ├── categories/
│   │   │   ├── page.tsx        # Page 3: Categories Hub
│   │   │   └── [slug]/page.tsx # Category detail with filter & sort
│   │   ├── reviews/
│   │   │   ├── page.tsx        # Page 4: Reviews Hub
│   │   │   └── [slug]/page.tsx # Detailed Product Review
│   │   ├── compare/page.tsx    # Page 5: Product Comparison
│   │   ├── buying-guides/
│   │   │   ├── page.tsx        # Page 6: Buying Guides Hub
│   │   │   └── [slug]/page.tsx # Buying Guide article
│   │   ├── contact/page.tsx    # Page 7: Contact Us
│   │   ├── privacy-policy/page.tsx # Page 8: Privacy Policy
│   │   ├── terms/page.tsx      # Page 9: Terms & Conditions
│   │   ├── affiliate-disclosure/page.tsx # Page 10: Affiliate Disclosure
│   │   ├── search/page.tsx     # Dedicated Product Discovery
│   │   ├── admin/page.tsx      # Product Management Admin Portal
│   │   ├── sitemap.ts          # XML Sitemap generator
│   │   ├── robots.ts           # robots.txt generator
│   │   └── globals.css         # Tailwind & custom styles
│   ├── components/
│   │   ├── Header.tsx          # Amazon-inspired Header & Mobile Drawer
│   │   ├── Footer.tsx          # 4-Column Footer with Legal & Back to Top
│   │   ├── Logo.tsx            # Circular AVNIVO SVG Logo Component
│   │   ├── SearchBar.tsx       # Live search bar with autocomplete
│   │   ├── ProductCard.tsx     # Ecommerce Product Card
│   │   ├── AffiliateButton.tsx # Amazon Buy Now Button
│   │   ├── AffiliateDisclosureBanner.tsx # Transparency Notice
│   │   ├── Breadcrumb.tsx      # SEO Breadcrumb Navigation
│   │   ├── ComparisonTable.tsx # Side-by-side responsive comparison
│   │   ├── CategoryCard.tsx    # Category visual cards
│   │   ├── StarRating.tsx      # Verified Star Rating display
│   │   └── OutboundRedirectModal.tsx # Outbound affiliate redirect modal
│   ├── data/
│   │   ├── products.ts         # Verified product data & helper functions
│   │   ├── categories.ts       # 8 Home & Kitchen categories
│   │   ├── guides.ts           # 6 In-depth Buying Guides
│   │   └── siteConfig.ts       # Site metadata & navigation links
│   ├── lib/
│   │   ├── utils.ts            # Formatting & class merging utilities
│   │   └── storage.ts          # LocalStorage comparison & custom products
│   └── types/
│       └── index.ts            # TypeScript interfaces
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

## 🛠️ Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Start Production Server**:
   ```bash
   npm run start
   ```

---

## 🚢 Deployment Instructions

### Deploy to Vercel (Recommended)

1. Push your code to a **GitHub repository** (e.g. `your-username/avnivo`).
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `avnivo` repository.
4. Set the **Framework Preset** to **Next.js**.
5. *(Optional)* Add Environment Variables in Vercel project settings:
   - `NEXT_PUBLIC_ADMIN_PASSCODE`: Your private staff PIN for the `/admin` portal (Default fallback: `avnivo2026`).
   - `NEXT_PUBLIC_AMAZON_TAG`: Your Amazon Associates tracking ID (e.g. `avnivo-21`).
6. Click **Deploy**. Vercel will build and deploy the site in under 60 seconds with global CDN caching.

### Custom Domain Configuration (avnivo.in)

1. In Vercel Project Settings, navigate to **Domains**.
2. Enter `avnivo.in` and `www.avnivo.in`.
3. In your domain registrar (GoDaddy, Namecheap, Hostinger, etc.), add the DNS records provided by Vercel:
   - **A Record**: `@` points to `76.76.21.21`
   - **CNAME Record**: `www` points to `cname.vercel-dns.com`
4. SSL certificates are provisioned automatically.

---

## 📋 Affiliate Integration Checklist

- [ ] **Amazon Associates India Application**: Register at [affiliate-program.amazon.in](https://affiliate-program.amazon.in) using your live website URL `https://avnivo.in`.
- [ ] **Replace Demo Tracking Tags**: Replace placeholder tag `avnivo-demo-21` with your official Amazon Associate store ID in `src/data/siteConfig.ts` or directly through the `/admin` portal.
- [ ] **Maintain Verified Prices**: Ensure product prices reflect active merchant prices. The product manager allows editing current price and MRP in seconds.
- [ ] **ASCI Compliance**: Keep the affiliate disclosure banners visible near all buy buttons (already implemented on all pages and modals).

