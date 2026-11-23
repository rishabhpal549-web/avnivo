"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Edit3,
  Clock,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Send,
  Eye,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

interface ApprovalItem {
  id: string;
  type: string;
  title: string;
  summary: string;
  targetPlatform?: string;
  contentPayload: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "EDITED";
  ownerNotes?: string;
  decidedAt?: string;
  createdAt: string;
}

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("PENDING");
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState<ApprovalItem | null>(null);
  const [editingNotes, setEditingNotes] = useState("");
  const [editingPayload, setEditingPayload] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchApprovals = async () => {
    try {
      const res = await fetch("/api/admin/ai/approvals");
      const data = await res.json();
      if (data.approvals) {
        setApprovals(data.approvals);
      }
    } catch (e) {
      console.error("Failed to load approvals", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  const handleDecision = async (
    approvalId: string,
    action: "APPROVE" | "REJECT" | "EDIT"
  ) => {
    setProcessingId(approvalId);
    try {
      const body: any = {
        approvalId,
        action,
        ownerNotes: editingNotes,
      };

      if (action === "EDIT" && editingPayload) {
        body.editedPayload = editingPayload;
      }

      const res = await fetch("/api/admin/ai/approvals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        setActiveItem(null);
        setIsEditing(false);
        setEditingNotes("");
        fetchApprovals();
      } else {
        alert(data.error || "Action failed");
      }
    } catch (e) {
      alert("Network error processing decision");
    } finally {
      setProcessingId(null);
    }
  };

  const filteredList = approvals.filter((a) => {
    if (filter === "ALL") return true;
    return a.status === filter;
  });

  const parsePayload = (raw: string) => {
    try {
      return JSON.parse(raw);
    } catch {
      return { rawText: raw };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#101B35] to-[#1E293B] text-white p-6 rounded-3xl shadow-xl border border-blue-900">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-accent mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Human-in-the-Loop Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2.5">
              <span>AVNIVO Owner Approval Center</span>
            </h1>
            <p className="text-xs text-gray-300 mt-1 max-w-xl">
              No AI post, ad campaign, or business action executes without your explicit authorization. You have 100% final editorial authority.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setLoading(true);
                fetchApprovals();
              }}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <Link
              href="/admin/ai-command-center"
              className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Command Center</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(["PENDING", "APPROVED", "REJECTED", "ALL"] as const).map((status) => {
          const count = approvals.filter((a) => (status === "ALL" ? true : a.status === status)).length;
          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filter === status
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-charcoal border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span>{status === "PENDING" ? "⏳ Pending Review" : status === "APPROVED" ? "✅ Approved" : status === "REJECTED" ? "❌ Rejected" : "📋 All"}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                status === "PENDING" && count > 0 ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-700"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Approvals Table / Grid */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-gray-100">
          <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-gray-500 font-bold">Loading tasks awaiting approval...</p>
        </div>
      ) : filteredList.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-gray-100 space-y-2">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="font-bold text-sm text-primary">No items under &quot;{filter}&quot;</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            All AI employee workflows have been reviewed or no pending tasks currently require authorization.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredList.map((item) => {
            const payload = parsePayload(item.contentPayload);
            const isPending = item.status === "PENDING";

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-5 border shadow-sm transition-all space-y-4 ${
                  isPending
                    ? "border-amber-200 hover:border-amber-300 ring-1 ring-amber-400/20"
                    : "border-gray-100"
                }`}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        item.status === "PENDING"
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : item.status === "APPROVED"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : item.status === "REJECTED"
                          ? "bg-red-100 text-red-800 border border-red-300"
                          : "bg-blue-100 text-blue-800 border border-blue-300"
                      }`}>
                        {item.status}
                      </span>

                      {item.targetPlatform && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-50 text-purple-700 border border-purple-200 uppercase">
                          📱 {item.targetPlatform}
                        </span>
                      )}

                      <span className="text-[11px] text-gray-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />
                        {new Date(item.createdAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-primary font-display">{item.title}</h3>
                    <p className="text-xs text-gray-600">{item.summary}</p>
                  </div>

                  {/* Actions for Pending Items */}
                  {isPending && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveItem(item);
                          setIsEditing(false);
                          setEditingNotes("");
                        }}
                        className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-charcoal font-bold text-xs rounded-xl transition-all flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveItem(item);
                          setIsEditing(true);
                          setEditingPayload(JSON.stringify(payload, null, 2));
                          setEditingNotes("");
                        }}
                        className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-secondary font-bold text-xs rounded-xl transition-all flex items-center gap-1 border border-blue-200"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDecision(item.id, "REJECT")}
                        disabled={processingId === item.id}
                        className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1 border border-red-200"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>

                      <button
                        onClick={() => handleDecision(item.id, "APPROVE")}
                        disabled={processingId === item.id}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Inline Payload Preview */}
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 text-xs text-gray-700 font-mono overflow-x-auto max-h-44">
                  {payload.copy?.instagramCaption && (
                    <div className="space-y-1">
                      <span className="font-sans font-bold text-[11px] text-purple-700 block">
                        Instagram Caption Preview:
                      </span>
                      <p className="font-sans whitespace-pre-line text-xs text-gray-800">
                        {payload.copy.instagramCaption}
                      </p>
                    </div>
                  )}

                  {payload.caption && (
                    <div className="space-y-1">
                      <span className="font-sans font-bold text-[11px] text-primary block">
                        Post Caption Preview:
                      </span>
                      <p className="font-sans whitespace-pre-line text-xs text-gray-800">
                        {payload.caption}
                      </p>
                    </div>
                  )}

                  {!payload.caption && !payload.copy?.instagramCaption && (
                    <pre className="text-[11px] text-gray-700 whitespace-pre-wrap">
                      {JSON.stringify(payload, null, 2)}
                    </pre>
                  )}
                </div>

                {item.ownerNotes && (
                  <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900">
                    <strong>Owner Notes:</strong> {item.ownerNotes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Review & Edit Modal */}
      {activeItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-primary font-display">
                  {isEditing ? "Edit AI Task Before Approving" : "Review AI Task Details"}
                </h3>
                <span className="text-xs text-gray-400">{activeItem.title}</span>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <label className="text-xs font-bold text-charcoal block">
                  Editable JSON Payload / Copy:
                </label>
                <textarea
                  rows={10}
                  value={editingPayload}
                  onChange={(e) => setEditingPayload(e.target.value)}
                  className="w-full p-3 font-mono text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
                />

                <label className="text-xs font-bold text-charcoal block">
                  Add Owner Note / Reason for Edit:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Adjusted price from ₹399 to ₹349 for weekend flash deal"
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
                />

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-charcoal text-xs font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDecision(activeItem.id, "EDIT")}
                    disabled={!!processingId}
                    className="px-5 py-2 bg-secondary hover:bg-secondary-dark text-white text-xs font-bold rounded-xl shadow"
                  >
                    Save &amp; Approve Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <pre className="font-mono text-xs text-gray-800 whitespace-pre-wrap max-h-72 overflow-y-auto">
                    {JSON.stringify(parsePayload(activeItem.contentPayload), null, 2)}
                  </pre>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-charcoal block">
                    Optional Review Note (Feedback to AI):
                  </label>
                  <input
                    type="text"
                    placeholder="Enter instructions or feedback if rejecting or modifying..."
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t">
                  <button
                    onClick={() => setActiveItem(null)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-charcoal text-xs font-bold rounded-xl"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleDecision(activeItem.id, "REJECT")}
                    disabled={!!processingId}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow"
                  >
                    Reject Task
                  </button>
                  <button
                    onClick={() => handleDecision(activeItem.id, "APPROVE")}
                    disabled={!!processingId}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow"
                  >
                    Authorize &amp; Approve
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
