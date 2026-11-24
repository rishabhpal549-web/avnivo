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
  ExternalLink,
  Plus,
  RefreshCw,
  FileSpreadsheet,
  AlertCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Tag,
  Share2,
} from "lucide-react";

export default function AdminOverviewPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = () => {
    setRefreshing(true);
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch(() => {})
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 space-y-4">
        <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-semibold">Loading real-time platform statistics...</p>
      </div>
    );
  }

  const stats = data?.stats || {};
  const merchantClicks = data?.merchantClicks || [];
  const topClickedProducts = data?.topClickedProducts || [];
  const recentClicks = data?.recentClicks || [];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-secondary text-[11px] font-bold border border-blue-100 uppercase">
              Affiliate Operations
            </span>
            <span className="text-slate-400 text-xs">Live System</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-display">
            AVNIVO Platform Control Hub
          </h1>
          <p className="text-xs text-slate-500">
            Real-time catalog analytics, outbound merchant referrals, and automated campaign tracking.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <button
            onClick={fetchStats}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-colors"
            title="Refresh statistics"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-secondary ${refreshing ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* Primary 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-200 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Total Products
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-secondary flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            {stats.totalProducts || 0}
          </div>
          <div className="flex items-center gap-2 mt-2 text-[11px]">
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
              {stats.publishedProducts || 0} Live
            </span>
            <span className="text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded-md">
              {stats.draftProducts || 0} Drafts
            </span>
          </div>
        </div>

        {/* Clicks Today */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-green-200 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Clicks Today
            </span>
            <div className="w-8 h-8 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            {stats.clicksToday || 0}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            This Week: <strong className="text-slate-700">{stats.clicksThisWeek || 0}</strong> • This Month: <strong className="text-slate-700">{stats.clicksThisMonth || 0}</strong>
          </p>
        </div>

        {/* Total Outbound Clicks */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-indigo-200 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Total Outbound Clicks
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            {stats.totalClicks || 0}
          </div>
          <div className="flex items-center justify-between mt-2 text-[11px]">
            <span className="text-slate-500 font-medium">All-time referrals</span>
            <Link href="/admin/clicks" className="text-secondary font-bold hover:underline flex items-center gap-0.5">
              <span>View Logs</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Categories & Customer Inquiries */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-amber-200 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Categories & Support
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            {stats.totalCategories || 0}
          </div>
          <div className="flex items-center gap-2 mt-2 text-[11px]">
            <span className="text-slate-500">Active categories</span>
            {stats.pendingInquiries > 0 ? (
              <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                {stats.pendingInquiries} Inquiries
              </span>
            ) : (
              <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
                All Clear
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick Navigation Hub */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">
          Quick Operations & Direct Shortcuts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/admin/products"
            className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-2xl flex flex-col items-center text-center transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-white text-secondary flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
              <Package className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800">Products</span>
            <span className="text-[10px] text-slate-400">Manage Catalog</span>
          </Link>

          <Link
            href="/admin/offers"
            className="p-3 bg-slate-50 hover:bg-amber-50 border border-slate-100 hover:border-amber-200 rounded-2xl flex flex-col items-center text-center transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-white text-amber-600 flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
              <Tag className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800">Affiliate Links</span>
            <span className="text-[10px] text-slate-400">Verify URLs</span>
          </Link>

          <Link
            href="/admin/categories"
            className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 rounded-2xl flex flex-col items-center text-center transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-white text-emerald-600 flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800">Categories</span>
            <span className="text-[10px] text-slate-400">22 Categories</span>
          </Link>

          <Link
            href="/admin/banners"
            className="p-3 bg-slate-50 hover:bg-purple-50 border border-slate-100 hover:border-purple-200 rounded-2xl flex flex-col items-center text-center transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-white text-purple-600 flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800">Banners</span>
            <span className="text-[10px] text-slate-400">Hero Carousel</span>
          </Link>

          <Link
            href="/admin/clicks"
            className="p-3 bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 rounded-2xl flex flex-col items-center text-center transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-white text-indigo-600 flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800">Export CSV</span>
            <span className="text-[10px] text-slate-400">Click Reports</span>
          </Link>

          <Link
            href="/admin/settings"
            className="p-3 bg-slate-50 hover:bg-rose-50 border border-slate-100 hover:border-rose-200 rounded-2xl flex flex-col items-center text-center transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-white text-rose-600 flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800">Settings</span>
            <span className="text-[10px] text-slate-400">Platform Config</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Merchant Click Breakdown & Top Performing Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Merchant Share */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900 font-display">
                Merchant Referral Distribution
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">Amazon, Flipkart, Meesho, Croma</span>
            </div>

            <div className="space-y-4">
              {merchantClicks.map((m: any) => {
                const total = stats.totalClicks || 1;
                const pct = Math.round((m.clicks / total) * 100) || 0;
                return (
                  <div key={m.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-800">{m.name}</span>
                      <span className="font-bold text-secondary">{m.clicks} clicks ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-secondary h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}

              {merchantClicks.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-6">
                  No merchant referral events recorded yet.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-600 leading-relaxed">
                <strong>Affiliate Transparency Note:</strong> Outbound clicks track shopper interest. Final sales orders, conversion rates, and commissions are reported directly inside your partner portals (Amazon Associates, Flipkart Affiliate, Meesho).
              </p>
            </div>
          </div>
        </div>

        {/* Top Clicked Products */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-slate-900 font-display">
              Top Discovered Products
            </h3>
            <Link
              href="/admin/products"
              className="text-xs text-secondary font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {topClickedProducts.map((p: any) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-800 truncate max-w-sm">
                      {p.name}
                    </p>
                    {p.availability === "UNPUBLISHED" && (
                      <span className="px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded text-[9px] font-bold">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                    <span>Indicative Price: <strong className="text-slate-700">₹{p.indicativePrice}</strong></span>
                    <span>•</span>
                    <span>{p.category?.name || "General"}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-secondary block">
                    {p.clicksCount || 0} Clicks
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {p.viewsCount || 0} Views
                  </span>
                </div>
              </div>
            ))}

            {topClickedProducts.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-8">
                No products found in catalog.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Real-time Outbound Click Stream */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 font-display">
              Recent Outbound Referral Stream
            </h3>
            <p className="text-xs text-slate-400">
              Live shopper referrals redirected to Amazon, Flipkart, Meesho, and partner stores.
            </p>
          </div>
          <Link
            href="/admin/clicks"
            className="text-xs text-secondary font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>Full Click Audit & CSV</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">When</th>
                <th className="py-2.5 px-3">Product Name</th>
                <th className="py-2.5 px-3">Target Merchant</th>
                <th className="py-2.5 px-3">Campaign Channel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentClicks.map((c: any) => (
                <tr key={c.id} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                    {formatTimeAgo(c.createdAt)}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800 max-w-xs truncate">
                    {c.product?.name || "Curated Item"}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-secondary font-bold text-[11px] border border-blue-100">
                      {c.merchant?.name || "Partner Store"}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">
                    {c.utmSource || "avnivo"} / {c.utmCampaign || "discovery"}
                  </td>
                </tr>
              ))}

              {recentClicks.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-xs text-slate-400">
                    No recent click referral logs. Clicks are logged in real-time when shoppers click Buy Now.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
