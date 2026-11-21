"use client";

import React, { useEffect, useState } from "react";
import { formatTimeAgo } from "@/lib/utils";
import { MessageSquare, CheckCircle, Clock } from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = () => {
    fetch("/api/admin/inquiries")
      .then((res) => res.json())
      .then((data) => {
        if (data.inquiries) setInquiries(data.inquiries);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      fetchInquiries();
    } catch {
      alert("Failed to update status.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary font-display">
          Support Inquiries & Grievances
        </h2>
        <p className="text-xs text-gray-500">
          Review customer inquiries, price correction requests, and regulatory grievances
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100 text-xs">
          {inquiries.map((inq) => (
            <div key={inq.id} className="p-5 flex flex-col md:flex-row items-start justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-primary">{inq.subject}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      inq.status === "RESOLVED"
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {inq.status}
                  </span>
                  <span className="text-gray-400 text-[11px]">• {formatTimeAgo(inq.createdAt)}</span>
                </div>

                <p className="text-gray-700 text-xs leading-relaxed">{inq.message}</p>

                <div className="text-[11px] text-gray-400 pt-1">
                  From: <strong>{inq.name}</strong> ({inq.email}) {inq.phone && `• ${inq.phone}`}
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                {inq.status === "PENDING" ? (
                  <button
                    onClick={() => handleUpdateStatus(inq.id, "RESOLVED")}
                    className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Mark Resolved</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateStatus(inq.id, "PENDING")}
                    className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-charcoal font-semibold px-3 py-1.5 rounded-lg text-xs"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Reopen</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
