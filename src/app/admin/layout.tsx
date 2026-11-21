"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/common/AuthContext";
import {
  LayoutDashboard,
  Package,
  Layers,
  MousePointerClick,
  MessageSquare,
  Users,
  Settings,
  ShieldAlert,
  ArrowLeft,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-12 text-center text-sm text-gray-400">Verifying administrative credentials...</div>;
  }

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-red-200 shadow-xl text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-primary mb-2">Restricted Administrator Area</h2>
        <p className="text-xs text-gray-500 mb-6">
          You must be logged in as an authorized administrator to access the AVNIVO management dashboard.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary text-white text-xs font-semibold px-6 py-3 rounded-xl shadow-md"
        >
          Return to Public Homepage
        </Link>
      </div>
    );
  }

  const navLinks = [
    { name: "Overview & Analytics", href: "/admin", icon: LayoutDashboard },
    { name: "Products & Offers", href: "/admin/products", icon: Package },
    { name: "Affiliate Click Logs", href: "/admin/clicks", icon: MousePointerClick },
    { name: "Support Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Admin Top Header */}
      <div className="bg-primary text-white py-3 px-4 sm:px-6 border-b border-blue-900 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-black text-lg tracking-wider font-display text-white">
              AVN<span className="text-secondary">IVO</span>
            </span>
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 font-bold text-[10px] rounded border border-blue-400/30 uppercase">
              Control Panel
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-gray-300">
              Admin: <strong className="text-white">{user.name}</strong>
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-blue-300 hover:text-white underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Admin Sub-nav & Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-gray-200">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  active
                    ? "bg-secondary text-white shadow-md"
                    : "bg-white text-charcoal border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {children}
      </div>
    </div>
  );
}
