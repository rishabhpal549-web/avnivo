"use client";

import React from "react";
import { X, ShoppingBag, Store, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

interface FutureCartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FutureCartModal({ isOpen, onClose }: FutureCartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-secondary mb-4">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-primary font-display">
            AVNIVO Direct Shopping Cart
          </h2>
          <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full mt-2 border border-amber-200">
            Roadmap Phase 2 – Marketplace Activation
          </span>
        </div>

        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            AVNIVO currently operates as an <strong>affiliate shopping & product discovery platform</strong>. When you click <em>Buy Now</em> or <em>View Deal</em>, you are redirected directly to our verified partner merchants (such as Amazon India, Flipkart, and Meesho) to complete your purchase securely. All payments, deliveries, shipping, and customer support are handled by the partner merchant.
          </p>

          <div className="bg-surface p-4 rounded-xl border border-gray-200/80 space-y-2">
            <h4 className="font-semibold text-primary text-xs uppercase tracking-wider">
              Upcoming Capabilities:
            </h4>
            <ul className="text-xs space-y-1.5 text-gray-600">
              <li className="flex items-center gap-2">
                <Store className="w-4 h-4 text-secondary shrink-0" />
                <span>Unified multi-merchant checkout with 1-click UPI payments</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
                <span>AVNIVO-fulfilled authentic merchandise & express shipping</span>
              </li>
              <li className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-secondary shrink-0" />
                <span>Verified multi-vendor marketplace expansion</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition-colors"
          >
            Got it, continue browsing
          </button>
          <Link
            href="/deals"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-secondary hover:bg-secondary-dark text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            <span>Explore Best Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
