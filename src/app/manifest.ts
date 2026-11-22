import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AVNIVO – Discover. Compare. Shop.",
    short_name: "AVNIVO",
    description: "India's Next-Gen Product Discovery & Affiliate Price Comparison Platform",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#101B35",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logo.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["shopping", "lifestyle"],
    shortcuts: [
      {
        name: "Shop & Categories",
        url: "/shop",
        description: "Browse 8 shopping categories",
      },
      {
        name: "Best Deals",
        url: "/deals",
        description: "Verified discounts up to 70%",
      },
      {
        name: "Price Comparison",
        url: "/compare",
        description: "Compare prices across Amazon, Flipkart, and Croma",
      },
    ],
  };
}
