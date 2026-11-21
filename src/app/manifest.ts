import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AVNIVO – Discover. Compare. Shop.",
    short_name: "AVNIVO",
    description: "India's Next-Gen Product Discovery & Affiliate Price Comparison Platform",
    start_url: "/",
    display: "standalone",
    background_color: "#101B35",
    theme_color: "#101B35",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
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
