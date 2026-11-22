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
    icon: "/logo.png",
    apple: "/logo.png",
  },
  verification: {
    google: "google0b1c602e12dd4b99",
  },
  other: {
    "google-site-verification": "google0b1c602e12dd4b99",
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
  return (
    <html lang="en">
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
