"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Share2,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Plus,
  Send,
  Sliders,
  AlertCircle,
  HelpCircle,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Linkedin,
  MessageCircle,
  Globe,
  Radio,
} from "lucide-react";

interface SocialChannel {
  id: string;
  platform: string;
  accountName?: string;
  accountHandle?: string;
  profileUrl?: string;
  isConnected: boolean;
  authStatus: string;
}

const PLATFORM_CONFIG: Record<string, {
  displayName: string;
  tagline: string;
  themeColor: string;
  badgeColor: string;
  registrationUrl: string;
  suggestedHandle: string;
  suggestedName: string;
  iconText: string;
  bestFormat: string;
}> = {
  INSTAGRAM: {
    displayName: "Instagram Business",
    tagline: "Reels & Product Photos",
    themeColor: "from-pink-600 to-purple-600",
    badgeColor: "bg-pink-100 text-pink-800 border-pink-300",
    registrationUrl: "https://www.instagram.com/accounts/emailsignup/",
    suggestedHandle: "@avnivo",
    suggestedName: "AVNIVO Official",
    iconText: "📸",
    bestFormat: "9:16 Vertical Reels & Square 1:1 Product Posts",
  },
  FACEBOOK: {
    displayName: "Facebook Page",
    tagline: "प्रचार और विज्ञापन (Promotions & Ads)",
    themeColor: "from-blue-600 to-blue-800",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    registrationUrl: "https://www.facebook.com/pages/create/",
    suggestedHandle: "AVNIVO",
    suggestedName: "AVNIVO Smart Shopping",
    iconText: "👥",
    bestFormat: "16:9 Landscape & Feed Carousel Posts",
  },
  YOUTUBE: {
    displayName: "YouTube Channel",
    tagline: "Product Videos & Reviews",
    themeColor: "from-red-600 to-red-700",
    badgeColor: "bg-red-100 text-red-800 border-red-300",
    registrationUrl: "https://www.youtube.com/create_channel",
    suggestedHandle: "@avnivo",
    suggestedName: "AVNIVO India",
    iconText: "▶️",
    bestFormat: "YouTube Shorts (<60s) & Long-form Gadget Reviews",
  },
  WHATSAPP: {
    displayName: "WhatsApp Business",
    tagline: "Customer Enquiries & Direct Deals",
    themeColor: "from-emerald-600 to-teal-700",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    registrationUrl: "https://www.whatsapp.com/business/",
    suggestedHandle: "+91 9876543210",
    suggestedName: "AVNIVO Customer Desk",
    iconText: "💬",
    bestFormat: "Direct 1-on-1 Support & Broadcast Catalogs",
  },
  PINTEREST: {
    displayName: "Pinterest Business",
    tagline: "Home & Kitchen Ideas",
    themeColor: "from-red-500 to-rose-600",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    registrationUrl: "https://www.pinterest.com/business/create/",
    suggestedHandle: "avnivo",
    suggestedName: "AVNIVO Home & Kitchen Ideas",
    iconText: "📌",
    bestFormat: "2:3 Vertical Pins & Visual Idea Boards",
  },
  X: {
    displayName: "X (Twitter)",
    tagline: "Brand Updates & Flash Alerts",
    themeColor: "from-gray-900 to-black",
    badgeColor: "bg-gray-100 text-gray-800 border-gray-300",
    registrationUrl: "https://x.com/i/flow/signup",
    suggestedHandle: "@avnivo",
    suggestedName: "AVNIVO",
    iconText: "𝕏",
    bestFormat: "Threads & Short Updates with Product Links",
  },
  LINKEDIN: {
    displayName: "LinkedIn Company Page",
    tagline: "Company Identity & Hiring",
    themeColor: "from-blue-700 to-cyan-800",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-300",
    registrationUrl: "https://www.linkedin.com/company/setup/new/",
    suggestedHandle: "avnivo",
    suggestedName: "AVNIVO Technologies India",
    iconText: "💼",
    bestFormat: "B2B Announcements & Retail Tech Innovations",
  },
  TELEGRAM: {
    displayName: "Telegram Channel",
    tagline: "Offers & Loot Deals Broadcast",
    themeColor: "from-sky-500 to-blue-600",
    badgeColor: "bg-sky-100 text-sky-800 border-sky-300",
    registrationUrl: "https://telegram.org/",
    suggestedHandle: "@avnivo",
    suggestedName: "AVNIVO Deals & Offers",
    iconText: "✈️",
    bestFormat: "Instant Loot Deals Push with Direct Affiliate Links",
  },
  THREADS: {
    displayName: "Threads",
    tagline: "Brand Awareness & Daily Conversations",
    themeColor: "from-stone-900 to-black",
    badgeColor: "bg-stone-100 text-stone-800 border-stone-300",
    registrationUrl: "https://www.threads.net/",
    suggestedHandle: "@avnivo",
    suggestedName: "AVNIVO Official",
    iconText: "🧵",
    bestFormat: "Bite-sized shopping tips & interactive questions",
  },
  GOOGLE_BUSINESS: {
    displayName: "Google Business Profile",
    tagline: "Local Search & Verified Business",
    themeColor: "from-amber-600 to-blue-600",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    registrationUrl: "https://business.google.com/",
    suggestedHandle: "AVNIVO Profile",
    suggestedName: "AVNIVO Technologies India",
    iconText: "🏪",
    bestFormat: "Local store info, verified website link & Google reviews",
  },
};

export default function SocialMediaHubPage() {
  const [channels, setChannels] = useState<SocialChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [draftingPlatform, setDraftingPlatform] = useState<string | null>(null);
  const [draftResult, setDraftResult] = useState<string | null>(null);
  const [editingChannel, setEditingChannel] = useState<SocialChannel | null>(null);
  const [editForm, setEditForm] = useState({
    accountHandle: "",
    accountName: "",
    profileUrl: "",
    isConnected: false,
  });

  const fetchChannels = async () => {
    try {
      const res = await fetch("/api/admin/ai/social");
      const data = await res.json();
      if (data.channels) {
        setChannels(data.channels);
      }
    } catch (e) {
      console.error("Failed to load social channels", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  const handleDraftPostForPlatform = async (platform: string) => {
    setDraftingPlatform(platform);
    setDraftResult(null);

    try {
      const res = await fetch("/api/admin/ai/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          actionType: "GENERATE_SOCIAL_POST",
          platform,
          productSlug: "360-rotating-kitchen-faucet-extender",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setDraftResult(`AI Social Media Manager has created a targeted post for ${platform}! View it in the Approval Center.`);
      } else {
        alert(data.error || "Failed to generate post");
      }
    } catch (e) {
      alert("Error contacting AI Manager");
    } finally {
      setDraftingPlatform(null);
    }
  };

  const handleSaveChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChannel) return;

    try {
      const res = await fetch("/api/admin/ai/social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_CHANNEL",
          platform: editingChannel.platform,
          ...editForm,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setEditingChannel(null);
        fetchChannels();
      } else {
        alert(data.error || "Update failed");
      }
    } catch (e) {
      alert("Error saving channel details");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#101B35] to-[#1E293B] text-white p-6 rounded-3xl shadow-xl border border-blue-900">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-accent mb-2">
              <Share2 className="w-3.5 h-3.5" />
              <span>Omni-Channel Brand Presence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2.5">
              <span>AVNIVO 10 Social &amp; Business Channels</span>
            </h1>
            <p className="text-xs text-gray-300 mt-1 max-w-xl">
              Coordinated management across all 10 official platforms. AI formats tailored copy, media tags, and deals alert scripts for every network.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setLoading(true);
                fetchChannels();
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

        {draftResult && (
          <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-xs text-emerald-200 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{draftResult}</span>
            </span>
            <Link
              href="/admin/ai-command-center/approvals"
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px]"
            >
              Review in Approvals →
            </Link>
          </div>
        )}
      </div>

      {/* Recommended 10 Accounts Identity Blueprint */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-5 rounded-3xl space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-bold text-xs text-primary font-display flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span>Recommended Universal Account Setup (सभी 10 खातों के लिए एक समान पहचान)</span>
          </h3>
          <span className="text-[10px] font-black uppercase tracking-wider text-secondary bg-white px-2.5 py-1 rounded-full border border-blue-200">
            Official Brand Kit
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-3 rounded-2xl border border-blue-100 space-y-1">
            <span className="text-[10px] text-gray-500 uppercase font-bold block">1. Dedicated Business Email</span>
            <p className="font-mono font-bold text-primary text-xs">avnivo.official@gmail.com</p>
            <span className="text-[10px] text-gray-400 block">(Or domain: contact@avnivo.com)</span>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-blue-100 space-y-1">
            <span className="text-[10px] text-gray-500 uppercase font-bold block">2. Universal Username / Handle</span>
            <p className="font-mono font-bold text-secondary text-xs">@avnivo (or @avnivo_official)</p>
            <span className="text-[10px] text-gray-400 block">Same handle on all 10 networks</span>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-blue-100 space-y-1">
            <span className="text-[10px] text-gray-500 uppercase font-bold block">3. Official Brand Logo</span>
            <p className="font-bold text-gray-800 text-xs">AVNIVO Blue &amp; Gold Emblem</p>
            <a href="/logo.png" target="_blank" className="text-[10px] text-secondary hover:underline block font-semibold">
              Preview / Download Logo.png →
            </a>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-blue-100 space-y-1">
            <span className="text-[10px] text-gray-500 uppercase font-bold block">4. Official Website URL</span>
            <p className="font-mono font-bold text-primary text-xs">https://avnivo.vercel.app</p>
            <span className="text-[10px] text-emerald-600 font-bold block">Add to bio on all platforms</span>
          </div>
        </div>
      </div>

      {/* 10 Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {channels.map((chan) => {
          const cfg = PLATFORM_CONFIG[chan.platform] || {
            displayName: chan.platform,
            tagline: "Channel Presence",
            themeColor: "from-gray-700 to-gray-900",
            badgeColor: "bg-gray-100 text-gray-800 border-gray-300",
            registrationUrl: "#",
            suggestedHandle: "@avnivo",
            suggestedName: "AVNIVO",
            iconText: "🌐",
            bestFormat: "Standard Feed Post",
          };

          const isDrafting = draftingPlatform === chan.platform;

          return (
            <div
              key={chan.id}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2.5">
                {/* Platform Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-lg shadow-sm">
                      {cfg.iconText}
                    </span>
                    <div>
                      <h4 className="font-bold text-xs text-primary leading-tight">
                        {cfg.displayName}
                      </h4>
                      <span className="text-[10px] text-gray-400 block">{cfg.tagline}</span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${cfg.badgeColor}`}>
                    {chan.isConnected ? "CONNECTED" : "SETUP"}
                  </span>
                </div>

                {/* Handle / Account Status */}
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-medium">Handle:</span>
                    <strong className="text-primary font-mono text-[11px]">
                      {chan.accountHandle || cfg.suggestedHandle}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-medium">Format:</span>
                    <span className="text-[10px] text-gray-600 font-semibold truncate max-w-[120px]">
                      {cfg.bestFormat}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="space-y-1.5 pt-2 border-t border-gray-100">
                <button
                  onClick={() => handleDraftPostForPlatform(chan.platform)}
                  disabled={isDrafting}
                  className="w-full py-2 bg-primary hover:bg-primary-dark text-white text-[11px] font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  {isDrafting ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                  )}
                  <span>Draft AI Post</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setEditingChannel(chan);
                      setEditForm({
                        accountHandle: chan.accountHandle || cfg.suggestedHandle,
                        accountName: chan.accountName || cfg.suggestedName,
                        profileUrl: chan.profileUrl || "",
                        isConnected: chan.isConnected,
                      });
                    }}
                    className="flex-1 py-1.5 bg-gray-100 hover:bg-gray-200 text-charcoal text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Sliders className="w-3 h-3 text-gray-500" />
                    <span>Config</span>
                  </button>

                  <a
                    href={cfg.registrationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-secondary text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1 border border-blue-200"
                    title="Open Platform Direct Registration / Login"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Open</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Channel Configuration Modal */}
      {editingChannel && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-primary font-display">
                  Configure {editingChannel.platform}
                </h3>
                <span className="text-xs text-gray-400">Manage handle, credentials &amp; status</span>
              </div>
              <button
                onClick={() => setEditingChannel(null)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveChannel} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-charcoal block mb-1">Account Display Name:</label>
                <input
                  type="text"
                  value={editForm.accountName}
                  onChange={(e) => setEditForm({ ...editForm, accountName: e.target.value })}
                  placeholder="e.g. AVNIVO Official"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="font-bold text-charcoal block mb-1">Username / Handle:</label>
                <input
                  type="text"
                  value={editForm.accountHandle}
                  onChange={(e) => setEditForm({ ...editForm, accountHandle: e.target.value })}
                  placeholder="e.g. @avnivo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="font-bold text-charcoal block mb-1">Public Profile Link:</label>
                <input
                  type="text"
                  value={editForm.profileUrl}
                  onChange={(e) => setEditForm({ ...editForm, profileUrl: e.target.value })}
                  placeholder="https://instagram.com/avnivo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="connToggle"
                  checked={editForm.isConnected}
                  onChange={(e) => setEditForm({ ...editForm, isConnected: e.target.checked })}
                  className="w-4 h-4 text-secondary rounded"
                />
                <label htmlFor="connToggle" className="font-bold text-charcoal cursor-pointer">
                  Mark Channel as Live &amp; Connected
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setEditingChannel(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-charcoal font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl shadow"
                >
                  Save Channel Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
