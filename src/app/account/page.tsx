"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/common/AuthContext";
import { useWishlist } from "@/components/common/WishlistContext";
import { useCompare } from "@/components/common/CompareContext";
import {
  User,
  Heart,
  Scale,
  MapPin,
  ShieldAlert,
  LogOut,
  Bell,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function AccountOverviewPage() {
  const router = useRouter();
  const { user, loading, logout, openAuthModal } = useAuth();
  const { wishlistCount } = useWishlist();
  const { compareItems } = useCompare();

  if (loading) {
    return <div className="p-12 text-center text-sm text-gray-400">Loading profile...</div>;
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-gray-100 shadow-xl text-center">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-secondary flex items-center justify-center mx-auto mb-4">
          <User className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-primary mb-2">Sign in to AVNIVO</h2>
        <p className="text-xs text-gray-500 mb-6">
          Access your saved products, manage your notification preferences, and view price drop alerts.
        </p>
        <button
          onClick={() => openAuthModal("login")}
          className="w-full bg-primary hover:bg-primary-900 text-white font-semibold py-3 rounded-xl text-xs transition-all shadow-md"
        >
          Sign In / Create Account
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <span className="text-xs font-bold text-secondary uppercase tracking-wider">
            Consumer Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-primary font-display mt-0.5">
            Hello, {user.name}
          </h1>
          <p className="text-xs text-gray-400 mt-1">{user.email}</p>
        </div>

        <button
          onClick={logout}
          className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-semibold self-start sm:self-auto bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <Link
          href="/account/wishlist"
          className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Heart className="w-6 h-6 fill-red-100" />
            </div>
            <span className="text-2xl font-black text-primary font-display">
              {wishlistCount}
            </span>
          </div>
          <h3 className="font-bold text-sm text-primary group-hover:text-red-600 transition-colors">
            Saved Wishlist Items
          </h3>
          <p className="text-xs text-gray-400 mt-1">Track prices and receive alert notices</p>
        </Link>

        <Link
          href="/compare"
          className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-secondary flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-primary font-display">
              {compareItems.length}
            </span>
          </div>
          <h3 className="font-bold text-sm text-primary group-hover:text-secondary transition-colors">
            Product Comparisons
          </h3>
          <p className="text-xs text-gray-400 mt-1">Side-by-side matrices currently in tray</p>
        </Link>

        <Link
          href="/deals"
          className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
              Live
            </span>
          </div>
          <h3 className="font-bold text-sm text-primary group-hover:text-amber-600 transition-colors">
            Today&apos;s Verified Deals
          </h3>
          <p className="text-xs text-gray-400 mt-1">Explore discounts up to 75% OFF</p>
        </Link>
      </div>

      {/* Account Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/account/wishlist"
          className="p-5 bg-surface rounded-2xl border border-gray-200/80 hover:border-secondary transition-colors flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <Heart className="w-6 h-6 text-red-500" />
            <div>
              <h4 className="font-bold text-sm text-primary">My Saved Wishlist</h4>
              <p className="text-xs text-gray-500">View and manage saved products</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-secondary group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/contact"
          className="p-5 bg-surface rounded-2xl border border-gray-200/80 hover:border-secondary transition-colors flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <ShieldAlert className="w-6 h-6 text-primary" />
            <div>
              <h4 className="font-bold text-sm text-primary">Help & Grievance Support</h4>
              <p className="text-xs text-gray-500">Submit an inquiry or report an issue</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-secondary group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
