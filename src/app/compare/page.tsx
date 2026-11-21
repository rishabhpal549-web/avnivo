import React, { Suspense } from "react";
import { CompareClient } from "./CompareClient";

export const metadata = {
  title: "Side-by-Side Product Price & Specification Comparison | AVNIVO",
  description: "Compare multiple products side-by-side with verified specs, prices, and merchant offers across Amazon, Flipkart, and Croma.",
};

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-gray-400">Loading comparison...</div>}>
      <CompareClient />
    </Suspense>
  );
}
