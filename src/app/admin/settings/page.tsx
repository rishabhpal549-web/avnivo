"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  RefreshCw,
  Globe,
  Mail,
  Shield,
  Share2,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Settings Fields
  const [siteName, setSiteName] = useState("AVNIVO");
  const [tagline, setTagline] = useState("Smart Living, Better Home.");
  const [contactEmail, setContactEmail] = useState("support@avnivo.com");
  const [grievanceEmail, setGrievanceEmail] = useState("grievance@avnivo.com");
  const [defaultLanguage, setDefaultLanguage] = useState<"EN" | "HI">("EN");
  const [affiliateDisclosure, setAffiliateDisclosure] = useState(
    "AVNIVO participates in the Amazon Services LLC Associates Program, Flipkart Affiliate Program, and other merchant affiliate programs. We earn referral commissions on qualifying purchases made through external merchant links at no additional cost to you. Product prices, availability, and promotional offers are subject to change by external merchants."
  );

  // Social Links
  const [youtubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/@AVNIVOOfficialindia");
  const [linkedinUrl, setLinkedinUrl] = useState("https://www.linkedin.com/in/avnivo-india-3177a3451");
  const [pinterestUrl, setPinterestUrl] = useState("https://www.pinterest.com/avnivoofficialindia");
  const [instagramUrl, setInstagramUrl] = useState("https://instagram.com/avnivo");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          if (data.settings.siteName) setSiteName(data.settings.siteName);
          if (data.settings.tagline) setTagline(data.settings.tagline);
          if (data.settings.contactEmail) setContactEmail(data.settings.contactEmail);
          if (data.settings.grievanceEmail) setGrievanceEmail(data.settings.grievanceEmail);
          if (data.settings.defaultLanguage) setDefaultLanguage(data.settings.defaultLanguage);
          if (data.settings.affiliateDisclosure) setAffiliateDisclosure(data.settings.affiliateDisclosure);
          if (data.settings.youtubeUrl) setYoutubeUrl(data.settings.youtubeUrl);
          if (data.settings.linkedinUrl) setLinkedinUrl(data.settings.linkedinUrl);
          if (data.settings.pinterestUrl) setPinterestUrl(data.settings.pinterestUrl);
          if (data.settings.instagramUrl) setInstagramUrl(data.settings.instagramUrl);
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
          siteName,
          tagline,
          contactEmail,
          grievanceEmail,
          defaultLanguage,
          affiliateDisclosure,
          youtubeUrl,
          linkedinUrl,
          pinterestUrl,
          instagramUrl,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to save settings.");
      }
    } catch {
      alert("Network error saving settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
            <Settings className="w-6 h-6 text-secondary" />
            <span>Website &amp; Platform Settings</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure platform branding, official disclosures, legal contacts, and language preferences.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm max-w-3xl">
        {loading ? (
          <div className="py-12 text-center">
            <RefreshCw className="w-6 h-6 animate-spin text-secondary mx-auto mb-2" />
            <p className="text-xs text-slate-500 font-semibold">Loading platform settings...</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6 text-xs">
            {success && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Website settings saved successfully!</span>
              </div>
            )}

            {/* Platform Branding */}
            <div>
              <h2 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-secondary" />
                <span>Platform Identity</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Brand Tagline</label>
                  <input
                    type="text"
                    required
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <h2 className="text-sm font-black text-slate-900 mb-2">Default Storefront Language</h2>
              <p className="text-slate-500 mb-3">
                Sets the initial language for first-time visitors before browser preference.
              </p>
              <div className="flex items-center gap-3">
                <label
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer font-bold transition-all ${
                    defaultLanguage === "EN"
                      ? "bg-secondary text-white border-secondary shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="language"
                    value="EN"
                    checked={defaultLanguage === "EN"}
                    onChange={() => setDefaultLanguage("EN")}
                    className="sr-only"
                  />
                  <span>English (Default)</span>
                </label>

                <label
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer font-bold transition-all ${
                    defaultLanguage === "HI"
                      ? "bg-secondary text-white border-secondary shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="language"
                    value="HI"
                    checked={defaultLanguage === "HI"}
                    onChange={() => setDefaultLanguage("HI")}
                    className="sr-only"
                  />
                  <span>हिंदी (Hindi)</span>
                </label>
              </div>
            </div>

            {/* Official Support & Grievance Contact */}
            <div>
              <h2 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary" />
                <span>Official Contact &amp; Grievance Officers</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Customer Support Email</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Grievance Redressal Officer Email</label>
                  <input
                    type="email"
                    required
                    value={grievanceEmail}
                    onChange={(e) => setGrievanceEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>
            </div>

            {/* Affiliate Disclosure */}
            <div>
              <h2 className="text-sm font-black text-slate-900 mb-1 flex items-center gap-2">
                <Shield className="w-4 h-4 text-secondary" />
                <span>Affiliate Disclosure &amp; Transparency Statement</span>
              </h2>
              <p className="text-slate-500 mb-2">
                Displayed in the website footer and on all product detail pages for full regulatory compliance.
              </p>
              <textarea
                rows={4}
                required
                value={affiliateDisclosure}
                onChange={(e) => setAffiliateDisclosure(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-secondary"
              />
            </div>

            {/* Official Social Media Profiles */}
            <div>
              <h2 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-secondary" />
                <span>Verified Social Media URLs</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">YouTube Channel URL</label>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pinterest Profile URL</label>
                  <input
                    type="url"
                    value={pinterestUrl}
                    onChange={(e) => setPinterestUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Instagram URL</label>
                  <input
                    type="url"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl shadow-md transition-all text-xs"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Saving..." : "Save Platform Settings"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
