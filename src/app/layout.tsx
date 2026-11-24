import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/common/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PwaInstallPrompt } from "@/components/common/PwaInstallPrompt";

const envUrl = process.env.NEXT_PUBLIC_APP_URL;
const appBaseUrl = envUrl && !envUrl.includes("localhost") ? envUrl : "https://avnivo.vercel.app";

export const metadata: Metadata = {
  title: "AVNIVO – Discover. Compare. Shop. | Next-Gen E-commerce & Affiliate Platform",
  description:
    "Discover authentic products, compare live indicative prices across Amazon India, Flipkart, and Croma, and shop smart with verified discounts and buying guides.",
  keywords: [
    "price comparison India",
    "best online deals",
    "compare smartphones",
    "affiliate shopping India",
    "Amazon Flipkart price tracker",
    "electronics buying guide",
    "AVNIVO",
  ],
  authors: [{ name: "AVNIVO Editorial Team" }],
  creator: "AVNIVO",
  metadataBase: new URL(appBaseUrl),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: appBaseUrl,
    title: "AVNIVO – Discover. Compare. Shop.",
    description:
      "India's next-generation e-commerce discovery & price comparison platform. Verified merchant offers from Amazon, Flipkart, Croma, and more.",
    siteName: "AVNIVO",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVNIVO – Discover. Compare. Shop.",
    description: "Compare prices and discover verified shopping deals in India.",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/logo.png", sizes: "1024x1024", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: "google0b1c602e12dd4b99",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AVNIVO",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgWebsiteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${appBaseUrl}/#organization`,
        name: "AVNIVO",
        url: appBaseUrl,
        logo: `${appBaseUrl}/logo.png`,
        description: "India's next-generation e-commerce discovery & price comparison platform.",
        sameAs: [
          "https://www.youtube.com/@AVNIVOOfficialindia",
          "https://www.linkedin.com/in/avnivo-india-3177a3451",
          "https://www.pinterest.com/avnivoofficialindia",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${appBaseUrl}/#website`,
        url: appBaseUrl,
        name: "AVNIVO",
        publisher: { "@id": `${appBaseUrl}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${appBaseUrl}/shop?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgWebsiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-white text-charcoal">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <PwaInstallPrompt />
        </Providers>
      </body>
    </html>
  );
}
