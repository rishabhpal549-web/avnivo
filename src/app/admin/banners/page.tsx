"use client";

import React, { useEffect, useState } from "react";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Check,
  Save,
  Link2,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/banners")
      .then((res) => res.json())
      .then((data) => {
        if (data.banners) setBanners(data.banners);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleAddBanner = () => {
    const newBanner = {
      id: `banner-${Date.now()}`,
      tag: "FEATURED DEAL",
      badge: "Special Offer",
      title: "New Promotional Banner Title",
      subtitle: "Discover high-value daily items verified across top Indian marketplaces.",
      ctaText: "Shop Now",
      ctaLink: "/shop",
      secondaryText: "View Deals",
      secondaryLink: "/deals",
      image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80",
      active: true,
    };
    setBanners([...banners, newBanner]);
  };

  const handleRemoveBanner = (idx: number) => {
    if (!confirm("Remove this promotional banner?")) return;
    const copy = [...banners];
    copy.splice(idx, 1);
    setBanners(copy);
  };

  const handleUpdateField = (idx: number, field: string, value: any) => {
    const copy = [...banners];
    copy[idx] = { ...copy[idx], [field]: value };
    setBanners(copy);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ banners }),
      });
      if (res.ok) {
        setMessage("Promotional banners saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        alert("Failed to save banners.");
      }
    } catch {
      alert("Error saving banners.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary font-display">
            Homepage Hero Banners & Slider Manager
          </h2>
          <p className="text-xs text-gray-500">
            Control the promotional slider shown to customers at the top of the AVNIVO homepage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddBanner}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 text-charcoal border border-gray-200 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 text-secondary" />
            <span>Add Slide</span>
          </button>

          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="inline-flex items-center gap-1.5 bg-secondary hover:bg-secondary-dark text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-bold rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-xs text-gray-400">Loading banners...</div>
      ) : (
        <div className="space-y-4">
          {banners.map((b, idx) => (
            <div
              key={b.id || idx}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-secondary/10 text-secondary font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-primary text-xs uppercase tracking-wider">
                    {b.tag || `Slide ${idx + 1}`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateField(idx, "active", !b.active)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                      b.active !== false
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {b.active !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{b.active !== false ? "Active" : "Disabled"}</span>
                  </button>

                  <button
                    onClick={() => handleRemoveBanner(idx)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left: Text & Links */}
                <div className="lg:col-span-8 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                        Top Tag / Category Badge
                      </label>
                      <input
                        type="text"
                        value={b.tag || ""}
                        onChange={(e) => handleUpdateField(idx, "tag", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs outline-none focus:border-secondary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                        Price Tag Pill (e.g. Under ₹299)
                      </label>
                      <input
                        type="text"
                        value={b.badge || ""}
                        onChange={(e) => handleUpdateField(idx, "badge", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs outline-none focus:border-secondary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                      Main Banner Headline
                    </label>
                    <input
                      type="text"
                      value={b.title || ""}
                      onChange={(e) => handleUpdateField(idx, "title", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold outline-none focus:border-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                      Sub-headline / Description
                    </label>
                    <input
                      type="text"
                      value={b.subtitle || ""}
                      onChange={(e) => handleUpdateField(idx, "subtitle", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs outline-none focus:border-secondary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                        Primary Button Text & Link
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={b.ctaText || ""}
                          onChange={(e) => handleUpdateField(idx, "ctaText", e.target.value)}
                          placeholder="Button Text"
                          className="w-1/2 px-3 py-2 rounded-xl border border-gray-200 text-xs outline-none focus:border-secondary"
                        />
                        <input
                          type="text"
                          value={b.ctaLink || ""}
                          onChange={(e) => handleUpdateField(idx, "ctaLink", e.target.value)}
                          placeholder="/shop?category=..."
                          className="w-1/2 px-3 py-2 rounded-xl border border-gray-200 text-xs outline-none focus:border-secondary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                        Secondary Button Text & Link
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={b.secondaryText || ""}
                          onChange={(e) => handleUpdateField(idx, "secondaryText", e.target.value)}
                          placeholder="Button Text"
                          className="w-1/2 px-3 py-2 rounded-xl border border-gray-200 text-xs outline-none focus:border-secondary"
                        />
                        <input
                          type="text"
                          value={b.secondaryLink || ""}
                          onChange={(e) => handleUpdateField(idx, "secondaryLink", e.target.value)}
                          placeholder="/deals"
                          className="w-1/2 px-3 py-2 rounded-xl border border-gray-200 text-xs outline-none focus:border-secondary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Image Preview & URL */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                      Banner Image URL
                    </label>
                    <input
                      type="url"
                      value={b.image || ""}
                      onChange={(e) => handleUpdateField(idx, "image", e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs outline-none focus:border-secondary"
                    />
                  </div>

                  {b.image && (
                    <div className="h-32 rounded-2xl overflow-hidden bg-surface border border-gray-200 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
