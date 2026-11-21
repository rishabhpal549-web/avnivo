import React, { Suspense } from "react";
import { ProductCatalogView } from "@/components/shop/ProductCatalogView";

export const metadata = {
  title: "Shop & Compare All Products | AVNIVO India",
  description: "Browse thousands of authentic products across electronics, fashion, kitchenware, and lifestyle. Compare live indicative prices from Amazon, Flipkart & Croma.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-gray-400">Loading catalog...</div>}>
      <ProductCatalogView
        pageTitle="Explore All Products"
        pageDescription="Discover genuine products with real-time indicative merchant price comparisons across India's premier online stores."
      />
    </Suspense>
  );
}
