"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Tag,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Edit2,
  X,
  Copy,
  Check,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

interface OfferItem {
  id: string;
  productId: string;
  merchantId: string;
  affiliateUrl: string;
  indicativePrice: number;
  originalPrice: number;
  discountPercent?: number;
  availability?: string;
  deliveryInfo?: string;
  lastVerifiedAt?: string;
  updatedAt?: string;
  product?: {
    id: string;
    name: string;
    slug: string;
    images?: string[];
    indicativePrice?: number;
    originalPrice?: number;
    availability?: string;
  };
  merchant?: {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string;
  };
}

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMerchant, setSelectedMerchant] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState<"ALL" | "VALID" | "MISSING">("ALL");

  // Edit Offer Modal state
  const [editingOffer, setEditingOffer] = useState<OfferItem | null>(null);
  const [modalAffiliateUrl, setModalAffiliateUrl] = useState("");
  const [modalPrice, setModalPrice] = useState("");
  const [modalOriginalPrice, setModalOriginalPrice] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/offers");
      const data = await res.json();
      if (data.offers) {
        setOffers(data.offers);
      }
    } catch (e) {
      console.error("Failed to load affiliate offers:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleOpenEdit = (offer: OfferItem) => {
    setEditingOffer(offer);
    setModalAffiliateUrl(offer.affiliateUrl || "");
    setModalPrice(String(offer.indicativePrice || ""));
    setModalOriginalPrice(String(offer.originalPrice || ""));
    setSaveSuccess(false);
  };

  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOffer) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/offers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingOffer.id,
          affiliateUrl: modalAffiliateUrl,
          indicativePrice: modalPrice,
          originalPrice: modalOriginalPrice,
        }),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => {
          setEditingOffer(null);
          fetchOffers();
        }, 1200);
      } else {
        alert("Failed to update offer details.");
      }
    } catch {
      alert("Network error updating offer.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyLink = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Metrics
  const totalOffers = offers.length;
  const amazonOffers = offers.filter((o) => o.merchant?.name?.toLowerCase().includes("amazon")).length;
  const flipkartOffers = offers.filter((o) => o.merchant?.name?.toLowerCase().includes("flipkart")).length;
  const meeshoOffers = offers.filter((o) => o.merchant?.name?.toLowerCase().includes("meesho")).length;
  const missingUrls = offers.filter((o) => !o.affiliateUrl || o.affiliateUrl.trim() === "" || o.affiliateUrl === "#").length;

  const filteredOffers = offers.filter((offer) => {
    // Search filter
    const matchesSearch =
      offer.product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.merchant?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    // Merchant filter
    const matchesMerchant =
      selectedMerchant === "ALL" ||
      offer.merchant?.name?.toLowerCase().includes(selectedMerchant.toLowerCase());

    // Status filter
    const isMissing = !offer.affiliateUrl || offer.affiliateUrl.trim() === "" || offer.affiliateUrl === "#";
    const matchesStatus =
      selectedStatus === "ALL" ||
      (selectedStatus === "VALID" && !isMissing) ||
      (selectedStatus === "MISSING" && isMissing);

    return matchesSearch && matchesMerchant && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
            <Tag className="w-6 h-6 text-secondary" />
            <span>Multi-Merchant Affiliate Manager</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage external affiliate URLs across Amazon India, Flipkart, Meesho, and Croma. Outbound links preserve merchant tracking tags.
          </p>
        </div>
        <button
          onClick={fetchOffers}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Links</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Offers</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{totalOffers}</p>
          <span className="text-[10px] text-slate-500 font-semibold">Across all merchants</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Amazon India</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{amazonOffers}</p>
          <span className="text-[10px] text-amber-600 font-semibold">Tag avnivo-21</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Flipkart</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{flipkartOffers}</p>
          <span className="text-[10px] text-blue-600 font-semibold">Verified links</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[11px] font-bold text-pink-600 uppercase tracking-wider">Meesho</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{meeshoOffers}</p>
          <span className="text-[10px] text-pink-600 font-semibold">Direct catalog</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm col-span-2 sm:col-span-1">
          <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider">Missing Links</p>
          <p className="text-2xl font-black text-red-600 mt-1">{missingUrls}</p>
          <span className="text-[10px] text-red-500 font-semibold">Needs destination URL</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product title or merchant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-secondary transition-all"
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
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-secondary"
          >
            <option value="ALL">All Status</option>
            <option value="VALID">Valid Links Only</option>
            <option value="MISSING">Missing Links Only</option>
          </select>
        </div>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-500 font-semibold">Loading verified affiliate offers...</p>
          </div>
        ) : filteredOffers.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            <AlertTriangle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-bold">No affiliate offers found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-black uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Merchant</th>
                  <th className="py-3 px-4">Indicative Price</th>
                  <th className="py-3 px-4">Affiliate URL</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredOffers.map((offer) => {
                  const isMissing = !offer.affiliateUrl || offer.affiliateUrl.trim() === "" || offer.affiliateUrl === "#";
                  const pImage = offer.product?.images?.[0] || "/placeholder.png";

                  return (
                    <tr key={offer.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3 max-w-xs">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 relative overflow-hidden shrink-0">
                            <Image
                              src={pImage}
                              alt={offer.product?.name || "Product"}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate">{offer.product?.name || "Untitled"}</p>
                            <Link
                              href={`/product/${offer.product?.slug}`}
                              target="_blank"
                              className="text-[10px] text-secondary hover:underline flex items-center gap-0.5"
                            >
                              <span>View store page</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </Link>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-black uppercase ${
                            offer.merchant?.name?.toLowerCase().includes("amazon")
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
                              : offer.merchant?.name?.toLowerCase().includes("flipkart")
                              ? "bg-blue-50 text-blue-800 border border-blue-200"
                              : offer.merchant?.name?.toLowerCase().includes("meesho")
                              ? "bg-pink-50 text-pink-800 border border-pink-200"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {offer.merchant?.name || "Direct"}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-black text-slate-900">₹{offer.indicativePrice || "—"}</span>
                        {offer.originalPrice && offer.originalPrice > offer.indicativePrice && (
                          <span className="block text-[10px] text-slate-400 line-through">
                            ₹{offer.originalPrice}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        {isMissing ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Missing URL</span>
                          </span>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] text-slate-500 font-mono truncate max-w-[180px]">
                              {offer.affiliateUrl}
                            </span>
                            <button
                              onClick={() => handleCopyLink(offer.affiliateUrl, offer.id)}
                              className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                              title="Copy URL"
                            >
                              {copiedId === offer.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <a
                              href={offer.affiliateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 text-secondary hover:text-secondary-dark rounded transition-colors"
                              title="Test link externally"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {isMissing ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600">
                            <span>Requires Configuration</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Active Affiliate</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleOpenEdit(offer)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit Offer</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Offer Modal */}
      {editingOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">Edit Affiliate Offer</h3>
                <p className="text-xs text-slate-500">{editingOffer.product?.name}</p>
              </div>
              <button
                onClick={() => setEditingOffer(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOffer} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Merchant Partner</label>
                <input
                  type="text"
                  disabled
                  value={editingOffer.merchant?.name || ""}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Destination Affiliate URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://www.amazon.in/dp/...?tag=avnivo-21"
                  value={modalAffiliateUrl}
                  onChange={(e) => setModalAffiliateUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-secondary transition-colors"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Ensure standard merchant tracking parameters are included (e.g. Amazon associate tag or Flipkart affiliate link).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Indicative Price (₹)</label>
                  <input
                    type="number"
                    value={modalPrice}
                    onChange={(e) => setModalPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Original MRP (₹)</label>
                  <input
                    type="number"
                    value={modalOriginalPrice}
                    onChange={(e) => setModalOriginalPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              {saveSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Offer details saved successfully!</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingOffer(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  {isSaving ? "Saving..." : "Save Offer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
