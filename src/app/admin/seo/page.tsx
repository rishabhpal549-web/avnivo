"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Search,
  Sparkles,
  RefreshCw,
  Save,
  AlertCircle,
} from "lucide-react";

export default function AdminSeoPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // SEO Form Fields
  const [siteTitle, setSiteTitle] = useState("AVNIVO – Discover. Compare. Shop. | Next-Gen E-commerce & Affiliate Platform");
  const [metaDescription, setMetaDescription] = useState(
    "Discover authentic products, compare live indicative prices across Amazon India, Flipkart, and Croma, and shop smart with verified discounts and buying guides."
  );
  const [googleVerification, setGoogleVerification] = useState("google0b1c602e12dd4b99");
  const [ga4Id, setGa4Id] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("https://avnivo.in");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          if (data.settings.siteTitle) setSiteTitle(data.settings.siteTitle);
          if (data.settings.metaDescription) setMetaDescription(data.settings.metaDescription);
          if (data.settings.googleVerification) setGoogleVerification(data.settings.googleVerification);
          if (data.settings.ga4Id) setGa4Id(data.settings.ga4Id);
          if (data.settings.canonicalUrl) setCanonicalUrl(data.settings.canonicalUrl);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteTitle,
          metaDescription,
          googleVerification,
          ga4Id,
          canonicalUrl,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to save SEO settings.");
      }
    } catch {
      alert("Network error saving SEO settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
            <Globe className="w-6 h-6 text-secondary" />
            <span>SEO &amp; Webmaster Manager</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage search engine indexing, Google Search Console, Schema.org structured data, and metadata.
          </p>
        </div>
      </div>

      {/* SEO Health Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dynamic Sitemap</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-sm font-black text-slate-900 mt-2">sitemap.xml</p>
          <a
            href="/sitemap.xml"
            target="_blank"
            className="text-[10px] text-secondary font-bold hover:underline flex items-center gap-1 mt-1"
          >
            <span>View XML feed</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Crawler Rules</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-sm font-black text-slate-900 mt-2">robots.txt</p>
          <a
            href="/robots.txt"
            target="_blank"
            className="text-[10px] text-secondary font-bold hover:underline flex items-center gap-1 mt-1"
          >
            <span>View robots rules</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Product Schema</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-sm font-black text-slate-900 mt-2">Schema.org JSON-LD</p>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
            Active on all product pages
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search Console</span>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-black text-[9px] rounded uppercase">
              Configured
            </span>
          </div>
          <p className="text-sm font-black text-slate-900 mt-2">Google Verified</p>
          <span className="text-[10px] text-slate-500 font-semibold block mt-1">
            Tag: {googleVerification.slice(0, 14)}...
          </span>
        </div>
      </div>

      {/* SEO Configuration Form */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-slate-900 mb-1">Search Engine Meta Configuration</h2>
        <p className="text-xs text-slate-500 mb-6">
          Changes will reflect in OpenGraph previews, Google search result snippets, and social cards.
        </p>

        {loading ? (
          <div className="py-12 text-center">
            <RefreshCw className="w-6 h-6 animate-spin text-secondary mx-auto mb-2" />
            <p className="text-xs text-slate-500 font-semibold">Loading SEO settings...</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4 text-xs max-w-2xl">
            {success && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-2 font-bold animate-fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>SEO and Webmaster configuration saved successfully!</span>
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Default Site Title (Title Tag)
              </label>
              <input
                type="text"
                required
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-secondary"
              />
              <p className="text-[10px] text-slate-400 mt-1">Recommended length: 50-60 characters.</p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Meta Description (Search Snippet)
              </label>
              <textarea
                rows={3}
                required
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-secondary"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Recommended length: 140-160 characters. Clearly describes AVNIVO product discovery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Google Search Console Verification Tag
                </label>
                <input
                  type="text"
                  value={googleVerification}
                  onChange={(e) => setGoogleVerification(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Google Analytics 4 Measurement ID
                </label>
                <input
                  type="text"
                  placeholder="G-XXXXXXXXXX"
                  value={ga4Id}
                  onChange={(e) => setGa4Id(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] focus:outline-none focus:border-secondary"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Canonical Base Domain</label>
              <input
                type="url"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-secondary"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Default domain used for generating sitemaps and canonical tags.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl shadow-md transition-all text-xs"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Saving..." : "Save SEO Settings"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
