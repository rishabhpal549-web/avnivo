"use client";

import React, { useEffect, useState } from "react";
import { formatTimeAgo } from "@/lib/utils";
import {
  MousePointerClick,
  Download,
  Filter,
  Search,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Calendar,
  AlertTriangle,
} from "lucide-react";

interface ClickLog {
  id: string;
  createdAt: string;
  productId: string;
  merchantId: string;
  utmSource?: string;
  utmCampaign?: string;
  ipHash?: string;
  product?: {
    id: string;
    name: string;
    slug: string;
    indicativePrice?: number;
  };
  merchant?: {
    id: string;
    name: string;
    slug: string;
  };
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export default function AdminClicksPage() {
  const [clicks, setClicks] = useState<ClickLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMerchant, setSelectedMerchant] = useState("ALL");
  const [timeRange, setTimeRange] = useState<"ALL" | "TODAY" | "WEEK" | "MONTH">("ALL");

  const fetchClicks = () => {
    setLoading(true);
    fetch("/api/admin/clicks")
      .then((res) => res.json())
      .then((data) => {
        if (data.clicks) setClicks(data.clicks);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchClicks();
  }, []);

  // CSV Export Function
  const exportToCsv = () => {
    if (clicks.length === 0) {
      alert("No click records available to export.");
      return;
    }

    const headers = [
      "Click ID",
      "Timestamp",
      "Product Name",
      "Product Slug",
      "Merchant",
      "Indicative Price (INR)",
      "UTM Source",
      "UTM Campaign",
      "User Type",
      "Privacy Hash",
    ];

    const rows = filteredClicks.map((c) => [
      c.id,
      new Date(c.createdAt).toLocaleString("en-IN"),
      `"${(c.product?.name || "Product").replace(/"/g, '""')}"`,
      c.product?.slug || "—",
      c.merchant?.name || "Direct Merchant",
      c.product?.indicativePrice || "—",
      c.utmSource || "avnivo",
      c.utmCampaign || "direct",
      c.user?.email ? `User (${c.user.email})` : "Guest Shopper",
      c.ipHash || "—",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const dateStr = new Date().toISOString().split("T")[0];
    link.setAttribute("download", `avnivo-affiliate-clicks-report-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const clicksToday = clicks.filter((c) => new Date(c.createdAt) >= startOfToday).length;
  const clicksThisWeek = clicks.filter((c) => new Date(c.createdAt) >= startOfWeek).length;
  const clicksThisMonth = clicks.filter((c) => new Date(c.createdAt) >= startOfMonth).length;

  const filteredClicks = clicks.filter((c) => {
    const matchesSearch =
      c.product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.merchant?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.utmCampaign && c.utmCampaign.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMerchant =
      selectedMerchant === "ALL" ||
      c.merchant?.name?.toLowerCase().includes(selectedMerchant.toLowerCase());

    const clickDate = new Date(c.createdAt);
    let matchesTime = true;
    if (timeRange === "TODAY") matchesTime = clickDate >= startOfToday;
    if (timeRange === "WEEK") matchesTime = clickDate >= startOfWeek;
    if (timeRange === "MONTH") matchesTime = clickDate >= startOfMonth;

    return matchesSearch && matchesMerchant && matchesTime;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
            <MousePointerClick className="w-6 h-6 text-secondary" />
            <span>Affiliate Outbound Click Analytics</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time audit stream of shopper redirects to Amazon India, Flipkart, and Meesho with privacy compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchClicks}
            disabled={loading}
            className="p-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 shadow-sm transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={exportToCsv}
            disabled={filteredClicks.length === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Clicks</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{clicks.length}</p>
          <span className="text-[10px] text-slate-500 font-semibold">Total logged referrals</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[11px] font-bold text-secondary uppercase tracking-wider">Clicks Today</p>
          <p className="text-2xl font-black text-secondary mt-1">{clicksToday}</p>
          <span className="text-[10px] text-slate-500 font-semibold">Since 00:00 IST</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">This Week</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{clicksThisWeek}</p>
          <span className="text-[10px] text-blue-600 font-semibold">Last 7 days</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">This Month</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{clicksThisMonth}</p>
          <span className="text-[10px] text-purple-600 font-semibold">Current billing cycle</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clicks by product, merchant, or UTM campaign..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-secondary transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
            {["ALL", "Amazon", "Flipkart", "Meesho"].map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMerchant(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedMerchant === m
                    ? "bg-secondary text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-secondary"
          >
            <option value="ALL">All Time</option>
            <option value="TODAY">Today Only</option>
            <option value="WEEK">Last 7 Days</option>
            <option value="MONTH">This Month</option>
          </select>
        </div>
      </div>

      {/* Clicks Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-500 font-semibold">Loading verified click audit logs...</p>
          </div>
        ) : filteredClicks.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            <AlertTriangle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-bold">No click events found matching your filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-black uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Product Discovered</th>
                  <th className="py-3 px-4">Merchant Target</th>
                  <th className="py-3 px-4">Campaign / Channel</th>
                  <th className="py-3 px-4">Visitor</th>
                  <th className="py-3 px-4">Privacy Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredClicks.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                      {formatTimeAgo(c.createdAt)}
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-bold text-slate-900 truncate">
                        {c.product?.name || "Product Item"}
                      </p>
                      {c.product?.indicativePrice && (
                        <span className="text-[10px] text-slate-400">
                          ₹{c.product.indicativePrice}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-black uppercase ${
                          c.merchant?.name?.toLowerCase().includes("amazon")
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : c.merchant?.name?.toLowerCase().includes("flipkart")
                            ? "bg-blue-50 text-blue-800 border border-blue-200"
                            : c.merchant?.name?.toLowerCase().includes("meesho")
                            ? "bg-pink-50 text-pink-800 border border-pink-200"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {c.merchant?.name || "Direct Merchant"}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                      {c.utmCampaign ? `${c.utmSource || "web"}/${c.utmCampaign}` : "direct/affiliate"}
                    </td>

                    <td className="py-3 px-4 text-slate-500">
                      {c.user?.email || "Guest Shopper"}
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                      {c.ipHash ? c.ipHash.slice(0, 12) + "..." : "sha256-hash"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
