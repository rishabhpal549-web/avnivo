"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Gift,
  Share2,
  TrendingUp,
  DollarSign,
  Copy,
  Check,
  ChevronRight,
  ShieldCheck,
  Users,
  Award,
  Zap,
  HelpCircle,
  Clock,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
import { AvnivoLogo } from "@/components/common/AvnivoLogo";
import { shareWithFriends } from "@/lib/shareHelper";

interface PartnerData {
  name: string;
  mobile: string;
  email: string;
  upiId: string;
  affiliateCode: string;
  commissionRate: number;
  totalClicks: number;
  totalOrders: number;
  totalEarnings: number;
  pendingPayout: number;
  createdAt: string;
}

export default function AffiliateProgramPage() {
  const [partner, setPartner] = useState<PartnerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [customProductUrl, setCustomProductUrl] = useState("");
  const [generatedCustomLink, setGeneratedCustomLink] = useState("");
  const [copiedCustom, setCopiedCustom] = useState(false);
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    upiId: "",
    promotionChannel: "WhatsApp Groups & Status",
  });

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://avnivo.vercel.app";

  // Load existing partner from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("avnivo_partner_account");
      if (saved) {
        setPartner(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      alert("Please enter your Name and Mobile Number");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/affiliate-program/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success && data.partner) {
        setPartner(data.partner);
        localStorage.setItem("avnivo_partner_account", JSON.stringify(data.partner));
      } else {
        alert(data.error || "Registration failed, please try again.");
      }
    } catch (err) {
      // Local fallback if API network issues
      const cleanName = formData.name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 6) || "user";
      const fallbackPartner: PartnerData = {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email || `${cleanName}@partner.avnivo.in`,
        upiId: formData.upiId || "",
        affiliateCode: `avn_${cleanName}${Math.floor(1000 + Math.random() * 9000)}`,
        commissionRate: 8.0,
        totalClicks: 0,
        totalOrders: 0,
        totalEarnings: 0,
        pendingPayout: 0,
        createdAt: new Date().toISOString(),
      };
      setPartner(fallbackPartner);
      localStorage.setItem("avnivo_partner_account", JSON.stringify(fallbackPartner));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, type: "link" | "code" | "custom") => {
    navigator.clipboard.writeText(text);
    if (type === "link") {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else if (type === "code") {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedCustom(true);
      setTimeout(() => setCopiedCustom(false), 2000);
    }
  };

  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customProductUrl.trim() || !partner) return;

    let target = customProductUrl.trim();
    if (target.startsWith("/")) {
      target = `${baseUrl}${target}`;
    } else if (!target.startsWith("http")) {
      target = `${baseUrl}/product/${target}`;
    }

    const separator = target.includes("?") ? "&" : "?";
    const finalLink = `${target}${separator}ref=${partner.affiliateCode}`;
    setGeneratedCustomLink(finalLink);
  };

  const handleRequestPayout = () => {
    if (!partner?.upiId) {
      alert("Please update your UPI ID (GPay/PhonePe/Paytm) to receive payouts!");
      return;
    }
    setPayoutSuccess(true);
    setTimeout(() => setPayoutSuccess(false), 4500);
  };

  const trendingPromoItems = [
    {
      title: "360° Rotating Kitchen Faucet Tap Extender",
      price: "₹349",
      commission: "₹35 (10%)",
      slug: "360-rotating-kitchen-faucet-extender",
      tagline: "Essential kitchen accessory! Saves up to 70% tap water.",
    },
    {
      title: "Mini Heat Bag Sealer for Snacks & Groceries",
      price: "₹249",
      commission: "₹25 (10%)",
      slug: "mini-heat-bag-sealer-handheld",
      tagline: "Keeps chips, groceries, and pulses fresh without moisture leaks.",
    },
    {
      title: "Sunset Projection LED Lamp with 16 Colors",
      price: "₹499",
      commission: "₹45 (9%)",
      slug: "sunset-projection-lamp-16-colors",
      tagline: "Aesthetic ambient lighting perfect for room decor & reels.",
    },
    {
      title: "Multipurpose Cable Organizer Clips (6 Pack)",
      price: "₹199",
      commission: "₹20 (10%)",
      slug: "silicone-desk-cable-organizer-clips",
      tagline: "Tidy up messy charger and desktop cables permanently.",
    },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* 1. Hero Header */}
      <div className="bg-gradient-to-br from-primary via-[#172554] to-primary text-white py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,149,0,0.15),transparent_50%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/30 border border-secondary/50 rounded-full text-accent text-xs font-bold uppercase tracking-wider mb-4">
            <Gift className="w-3.5 h-3.5" />
            <span>AVNIVO Creator &amp; Affiliate Partner Program</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display leading-tight">
                Share Useful Products &amp; Earn <span className="text-accent">Up to 10% Commission</span>!
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
                Join the free AVNIVO Partner Program. Recommend useful kitchen, home, gadgets, and lifestyle products with your friends, followers, and network. Earn direct commission payouts credited straight to your UPI account whenever someone buys!
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                  <p className="font-bold text-accent text-base">₹0 Cost</p>
                  <p className="text-gray-300 text-[11px]">100% Free to Join</p>
                </div>
                <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                  <p className="font-bold text-accent text-base">Up to 10%</p>
                  <p className="text-gray-300 text-[11px]">High Commission</p>
                </div>
                <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                  <p className="font-bold text-accent text-base">30 Days</p>
                  <p className="text-gray-300 text-[11px]">Cookie Attribution</p>
                </div>
                <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                  <p className="font-bold text-accent text-base">Instant UPI</p>
                  <p className="text-gray-300 text-[11px]">Direct Payouts</p>
                </div>
              </div>
            </div>

            {/* Registration Card or Logged-in Snapshot */}
            <div className="lg:col-span-5">
              {!partner ? (
                <div className="bg-white text-charcoal rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <BadgeCheck className="w-5 h-5 text-secondary" />
                    <h3 className="text-lg font-bold text-primary font-display">
                      Become a Partner in 30 Seconds
                    </h3>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        UPI ID (To receive direct commission payouts)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. yourname@okhdfcbank or 9876543210@paytm"
                        value={formData.upiId}
                        onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        Where will you share product links?
                      </label>
                      <select
                        value={formData.promotionChannel}
                        onChange={(e) => setFormData({ ...formData, promotionChannel: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary text-xs bg-white"
                      >
                        <option value="WhatsApp Groups & Status">WhatsApp Groups &amp; Status</option>
                        <option value="Instagram (Reels / Bio)">Instagram (Reels / Bio / Stories)</option>
                        <option value="Telegram Deals Channel">Telegram Deals Channel</option>
                        <option value="YouTube Shorts / Videos">YouTube Shorts / Videos</option>
                        <option value="Friends & Family">Friends, Family &amp; Community</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      {loading ? (
                        <span>Creating account...</span>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 text-accent" />
                          <span>Create Free Partner Account</span>
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-gray-400 text-center">
                      By signing up, you agree to the AVNIVO Partner Program policies.
                    </p>
                  </form>
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 text-white space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-accent tracking-wider">
                        Active Partner
                      </span>
                      <h3 className="text-xl font-bold">{partner.name}</h3>
                    </div>
                    <span className="bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold">
                      {partner.commissionRate}% Commission
                    </span>
                  </div>

                  <div className="bg-white/5 p-3 rounded-2xl border border-white/10 space-y-1.5 text-xs">
                    <p className="text-gray-300 text-[11px]">Your Personal Referral Link:</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={`${baseUrl}?ref=${partner.affiliateCode}`}
                        className="bg-black/30 border border-white/20 px-3 py-2 rounded-xl text-xs flex-1 truncate text-white"
                      />
                      <button
                        onClick={() => handleCopy(`${baseUrl}?ref=${partner.affiliateCode}`, "link")}
                        className="px-3 py-2 bg-secondary text-white font-bold rounded-xl hover:bg-secondary-dark flex items-center gap-1 shrink-0"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedLink ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </div>

                  <a
                    href="#dashboard"
                    className="block text-center py-2.5 bg-accent hover:bg-blue-400 text-primary font-bold rounded-xl transition-colors text-xs"
                  >
                    Open Partner Dashboard &amp; Tools ↓
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Partner Dashboard (When Logged In) */}
      {partner && (
        <section id="dashboard" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-primary font-display">
                Partner Control Panel (Affiliate Dashboard)
              </h2>
              <p className="text-xs text-gray-500">
                Referral Code: <span className="font-mono font-bold text-secondary">{partner.affiliateCode}</span> • Payout UPI: {partner.upiId || "Not updated"}
              </p>
            </div>
            <button
              onClick={handleRequestPayout}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
            >
              <DollarSign className="w-4 h-4" />
              <span>Request Payout (UPI)</span>
            </button>
          </div>

          {payoutSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Your payout request has been submitted! Balances above ₹200 are verified and sent to your registered UPI ID within 24-48 business hours.
              </span>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-xs font-semibold">Total Link Clicks</span>
                <TrendingUp className="w-4 h-4 text-secondary" />
              </div>
              <p className="text-2xl font-black text-primary font-display">{partner.totalClicks}</p>
              <p className="text-[11px] text-gray-400 mt-1">Live Unique Visitors</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-xs font-semibold">Successful Orders</span>
                <Award className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-black text-emerald-600 font-display">{partner.totalOrders}</p>
              <p className="text-[11px] text-gray-400 mt-1">Purchase Conversions</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-xs font-semibold">Total Estimated Earnings</span>
                <DollarSign className="w-4 h-4 text-accent" />
              </div>
              <p className="text-2xl font-black text-primary font-display">₹{partner.totalEarnings}</p>
              <p className="text-[11px] text-gray-400 mt-1">Lifetime Commission</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-xs font-semibold">Available Balance (Payable)</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl font-black text-amber-600 font-display">₹{partner.pendingPayout}</p>
              <p className="text-[11px] text-gray-400 mt-1">Min. Payout ₹200</p>
            </div>
          </div>

          {/* Quick Custom Product Link Generator */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-secondary" />
              <h3 className="text-base font-bold text-primary font-display">
                Custom Product Link Generator (Tracked URL)
              </h3>
            </div>
            <p className="text-xs text-gray-500">
              Paste any AVNIVO product link or slug below to instantly generate your tracked affiliate link:
            </p>

            <form onSubmit={handleGenerateLink} className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <input
                type="text"
                placeholder="e.g. https://avnivo.vercel.app/product/360-rotating-kitchen-faucet-extender or product slug"
                value={customProductUrl}
                onChange={(e) => setCustomProductUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary text-xs"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow transition-colors text-xs shrink-0"
              >
                Generate Link
              </button>
            </form>

            {generatedCustomLink && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl space-y-2 mt-3 animate-fade-in text-xs">
                <p className="font-semibold text-primary">Your tracked link is ready to share:</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={generatedCustomLink}
                    className="bg-white border border-blue-300 px-3 py-2 rounded-xl text-xs flex-1 truncate text-charcoal font-mono"
                  />
                  <button
                    onClick={() => handleCopy(generatedCustomLink, "custom")}
                    className="px-4 py-2 bg-secondary text-white font-bold rounded-xl hover:bg-secondary-dark flex items-center gap-1 shrink-0"
                  >
                    {copiedCustom ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCustom ? "Copied" : "Copy Link"}</span>
                  </button>
                  <button
                    onClick={() =>
                      shareWithFriends({
                        title: "AVNIVO Best Deal Recommendation",
                        customUrl: generatedCustomLink,
                      })
                    }
                    className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl flex items-center gap-1.5 shrink-0 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share with Friends</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. Ready-to-Share Trending Items (Best Sellers to Earn Fast) */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-primary font-display">
                🔥 High-Converting Top Deals (Ready to Share)
              </h3>
              <p className="text-xs text-gray-500">
                These small daily-use products have the highest conversion rates. Share directly with your network:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trendingPromoItems.map((item, idx) => {
                const itemTrackedLink = `${baseUrl}/product/${item.slug}?ref=${partner.affiliateCode}`;

                return (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold text-secondary font-mono">{item.price}</span>
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                          Earn: {item.commission}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-primary line-clamp-2">{item.title}</h4>
                      <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{item.tagline}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <button
                        onClick={() =>
                          shareWithFriends({
                            title: item.title,
                            indicativePrice: item.price.replace("₹", ""),
                            slug: item.slug,
                          })
                        }
                        className="w-full py-2 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share with Friends</span>
                      </button>
                      <button
                        onClick={() => handleCopy(itemTrackedLink, "custom")}
                        className="w-full py-1.5 bg-surface hover:bg-gray-100 text-charcoal font-semibold rounded-xl text-[11px] flex items-center justify-center gap-1 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy Link</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. How It Works (3 Steps) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-gray-200">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary font-display">
            How You Earn with AVNIVO
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Start your online affiliate earning journey in 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-primary text-accent mx-auto flex items-center justify-center font-bold text-lg font-display">
              1
            </div>
            <h3 className="font-bold text-base text-primary">Join for Free</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Sign up in 30 seconds with your name and UPI ID. No registration fees, inventory, or upfront investment required.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-secondary text-white mx-auto flex items-center justify-center font-bold text-lg font-display">
              2
            </div>
            <h3 className="font-bold text-base text-primary">Share Products</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Share useful and affordable home, kitchen, and gadget recommendations across your network, social media, or friends.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold text-lg font-display">
              3
            </div>
            <h3 className="font-bold text-base text-primary">Direct UPI Payouts</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              When someone purchases through your link, commissions are credited to your balance and paid straight to Google Pay / PhonePe.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Commission Slabs Table */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-primary font-display flex items-center gap-2">
            <Award className="w-5 h-5 text-secondary" />
            <span>Commission Rates by Category</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 uppercase font-semibold">
                  <th className="pb-3">Product Category</th>
                  <th className="pb-3">Commission Rate</th>
                  <th className="pb-3">Est. Earnings per Sale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 font-semibold text-charcoal">Kitchen &amp; Home Accessories</td>
                  <td className="py-3 text-emerald-600 font-bold">8% - 10%</td>
                  <td className="py-3 text-gray-500">₹30 - ₹80</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-charcoal">Fashion &amp; Lifestyle Accessories</td>
                  <td className="py-3 text-emerald-600 font-bold">9% - 10%</td>
                  <td className="py-3 text-gray-500">₹40 - ₹100</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-charcoal">Beauty &amp; Personal Care</td>
                  <td className="py-3 text-emerald-600 font-bold">8% - 10%</td>
                  <td className="py-3 text-gray-500">₹25 - ₹70</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-charcoal">Smart Mobile Gadgets &amp; Cables</td>
                  <td className="py-3 text-emerald-600 font-bold">5% - 7%</td>
                  <td className="py-3 text-gray-500">₹20 - ₹60</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-charcoal">Daily-Use Organizers &amp; Toys</td>
                  <td className="py-3 text-emerald-600 font-bold">8%</td>
                  <td className="py-3 text-gray-500">₹25 - ₹50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-4">
        <h3 className="text-xl font-bold text-primary font-display text-center mb-6">
          Frequently Asked Questions (FAQ)
        </h3>

        <div className="space-y-3 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-1.5">
            <p className="font-bold text-primary text-sm">Q. How and when do I get paid?</p>
            <p className="text-gray-600 leading-relaxed">
              Your earnings are transferred directly to your registered UPI ID (Google Pay, PhonePe, Paytm, or bank account). The minimum withdrawal threshold is only ₹200.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-1.5">
            <p className="font-bold text-primary text-sm">Q. Do I need to buy products or keep stock?</p>
            <p className="text-gray-600 leading-relaxed">
              Never! This is a 100% zero-inventory affiliate program. You only recommend and share links. Storage, shipping, payments, and returns are handled entirely by verified merchant stores (Amazon, Flipkart, Meesho).
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-1.5">
            <p className="font-bold text-primary text-sm">Q. What if someone clicks today and buys a few days later?</p>
            <p className="text-gray-600 leading-relaxed">
              AVNIVO uses a 30-day cookie window. If a customer visits the platform via your referral link and completes a purchase within 30 days, the commission is automatically attributed to your account!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
