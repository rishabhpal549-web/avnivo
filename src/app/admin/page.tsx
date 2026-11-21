"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatINR, formatTimeAgo } from "@/lib/utils";
import {
  Package,
  Layers,
  MousePointerClick,
  Users,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export default function AdminOverviewPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-12 text-center text-sm text-gray-400">Loading admin analytics...</div>;
  }

  const stats = data?.stats || {};
  const merchantClicks = data?.merchantClicks || [];
  const topClickedProducts = data?.topClickedProducts || [];
  const recentClicks = data?.recentClicks || [];

  return (
    <div className="space-y-8">
      {/* Key Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Products</span>
            <Package className="w-5 h-5 text-secondary" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-primary font-display">
            {stats.totalProducts || 0}
          </div>
          <span className="text-[11px] text-gray-400 mt-1 block">Indexed items</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Affiliate Clicks</span>
            <MousePointerClick className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-primary font-display">
            {stats.totalClicks || 0}
          </div>
          <span className="text-[11px] text-green-600 font-semibold mt-1 block">Live tracked</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Registered Users</span>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-primary font-display">
            {stats.totalUsers || 0}
          </div>
          <span className="text-[11px] text-gray-400 mt-1 block">Customer profiles</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Support</span>
            <MessageSquare className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-primary font-display">
            {stats.pendingInquiries || 0}
          </div>
          <span className="text-[11px] text-amber-600 font-semibold mt-1 block">Requires review</span>
        </div>
      </div>

      {/* Grid: Merchant Share & Top Clicked Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Merchant Share */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-base text-primary font-display mb-4">
            Affiliate Clicks by Merchant
          </h3>
          <div className="space-y-4">
            {merchantClicks.map((m: any) => {
              const total = stats.totalClicks || 1;
              const pct = Math.round((m.clicks / total) * 100) || 0;
              return (
                <div key={m.id}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-charcoal">{m.name}</span>
                    <span className="text-gray-500">
                      <strong>{m.clicks}</strong> clicks ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-secondary h-2 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Clicked Products */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-primary font-display">
              Highest Converting Products
            </h3>
            <Link href="/admin/products" className="text-xs text-secondary font-bold hover:underline">
              Manage Products →
            </Link>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            {topClickedProducts.map((p: any) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <Link
                    href={`/product/${p.slug}`}
                    target="_blank"
                    className="font-bold text-primary hover:text-secondary line-clamp-1"
                  >
                    {p.name}
                  </Link>
                  <span className="text-gray-400 text-[11px]">
                    Price: {formatINR(p.indicativePrice)} • Views: {p.viewsCount}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block px-2.5 py-1 bg-green-50 text-green-700 font-bold rounded-lg border border-green-200">
                    {p.clicksCount} Clicks
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Clicks Stream */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-base text-primary font-display">
              Recent Affiliate Outbound Redirects
            </h3>
            <p className="text-xs text-gray-500">Real-time privacy-compliant click audit stream</p>
          </div>
          <Link href="/admin/clicks" className="text-xs text-secondary font-bold hover:underline">
            View All Clicks →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase text-[10px]">
                <th className="py-2.5">Time</th>
                <th className="py-2.5">Target Product</th>
                <th className="py-2.5">Merchant</th>
                <th className="py-2.5">UTM Source</th>
                <th className="py-2.5">Privacy Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentClicks.map((c: any) => (
                <tr key={c.id} className="hover:bg-surface/50">
                  <td className="py-3 text-gray-500">{formatTimeAgo(c.createdAt)}</td>
                  <td className="py-3 font-semibold text-primary max-w-xs truncate">
                    {c.product?.name || "Product"}
                  </td>
                  <td className="py-3 font-bold text-secondary">{c.merchant?.name || "Direct"}</td>
                  <td className="py-3 text-gray-600">{c.utmSource || "avnivo"}</td>
                  <td className="py-3 font-mono text-[11px] text-gray-400">{c.ipHash || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
