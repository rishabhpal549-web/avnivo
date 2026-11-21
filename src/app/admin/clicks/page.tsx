"use client";

import React, { useEffect, useState } from "react";
import { formatTimeAgo } from "@/lib/utils";
import { MousePointerClick, Filter } from "lucide-react";

export default function AdminClicksPage() {
  const [clicks, setClicks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/clicks")
      .then((res) => res.json())
      .then((data) => {
        if (data.clicks) setClicks(data.clicks);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary font-display">
          Affiliate Outbound Click Audit
        </h2>
        <p className="text-xs text-gray-500">
          Full tracking stream with UTM campaigns and anonymized privacy hashes
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-surface border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Merchant</th>
                <th className="py-3 px-4">UTM Campaign</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Privacy Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clicks.map((c) => (
                <tr key={c.id} className="hover:bg-surface/50">
                  <td className="py-3 px-4 text-gray-500">{formatTimeAgo(c.createdAt)}</td>
                  <td className="py-3 px-4 font-semibold text-primary max-w-xs truncate">
                    {c.product?.name || "Product"}
                  </td>
                  <td className="py-3 px-4 font-bold text-secondary">{c.merchant?.name || "Direct"}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {c.utmCampaign ? `${c.utmSource}/${c.utmCampaign}` : "avnivo/affiliate"}
                  </td>
                  <td className="py-3 px-4 text-gray-500">{c.user?.email || "Guest Shopper"}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-gray-400">{c.ipHash || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
