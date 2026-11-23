"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
  TrendingUp,
  FileText,
  HelpCircle,
  Bell,
  Lock,
  Layers,
  Send,
  Building2,
  ExternalLink,
} from "lucide-react";
import { AvnivoLogo } from "@/components/common/AvnivoLogo";

export default function AffiliatePartnerProgramPage() {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistName, setWaitlistName] = useState("");
  const [waitlistChannel, setWaitlistChannel] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail || !waitlistName) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: waitlistName,
          email: waitlistEmail,
          category: "Affiliate Partner Waitlist",
          message: `Interested in AVNIVO Affiliate Partner Program. Channel / Audience: ${waitlistChannel || "General Creator"}`,
        }),
      });
    } catch (e) {
      // Graceful fallback
    }

    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-charcoal pb-20">
      {/* 1. Header Hero with Coming Soon Status */}
      <section className="bg-gradient-to-b from-[#101B35] via-[#162447] to-[#101B35] text-white pt-12 pb-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-5">
          {/* Coming Soon Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-black uppercase tracking-widest shadow-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>Program In Preparation &bull; Coming Soon</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight">
            Become an AVNIVO Affiliate Partner
          </h1>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We are designing a dedicated, transparent creator and publisher partner program. In the future, creators, shopping communities, and publishers will be able to share curated AVNIVO price discoveries and earn performance-based commissions.
          </p>

          {/* Key Compliance Notice */}
          <div className="inline-block bg-white/5 border border-white/10 rounded-2xl p-4 max-w-xl mx-auto text-left text-xs text-gray-300 space-y-1.5">
            <div className="flex items-center gap-2 text-accent font-bold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Official Program Transparency Note</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Registrations, commission percentages, attribution cookie rules, and banking payout terms will be published upon formal regulatory and business launch. No instant earnings or unverified returns are promised.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Early Access Waitlist & Architecture Overview */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Waitlist Form */}
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-secondary block">
                Early Notification List
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-primary font-display">
                Get Notified When Applications Open
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Be the first to receive the official partner terms, eligibility guidelines, and early onboarding invitation.
              </p>
            </div>

            {submitted ? (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 space-y-2 animate-fade-in">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Thank you! You are on the Priority Waitlist.</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  We have noted your interest. When the AVNIVO Affiliate Partner terms and dashboard launch, an invitation will be sent to <strong>{waitlistEmail}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleJoinWaitlist} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-charcoal block mb-1">Full Name / Creator Name:</label>
                  <input
                    type="text"
                    required
                    value={waitlistName}
                    onChange={(e) => setWaitlistName(e.target.value)}
                    placeholder="e.g. Rahul Sharma / Tech Deals India"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-charcoal block mb-1">Email Address:</label>
                  <input
                    type="email"
                    required
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-charcoal block mb-1">Where do you share deals? (Optional):</label>
                  <input
                    type="text"
                    value={waitlistChannel}
                    onChange={(e) => setWaitlistChannel(e.target.value)}
                    placeholder="e.g. YouTube Channel, Telegram Group, Instagram Page"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Bell className="w-4 h-4" />
                  )}
                  <span>Notify Me on Official Launch</span>
                </button>

                <p className="text-[10px] text-gray-400 text-center">
                  Zero spam guarantee. Your details are strictly protected under DPDP Act 2023.
                </p>
              </form>
            )}
          </div>

          {/* Architecture / Future Blueprint Visual */}
          <div className="lg:col-span-6 bg-gradient-to-br from-blue-50/60 to-surface rounded-2xl p-6 border border-blue-100 space-y-4">
            <h3 className="text-sm font-bold text-primary font-display flex items-center gap-2">
              <Layers className="w-4 h-4 text-secondary" />
              <span>Future Program Architecture (Planned)</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-2xs">
                <span className="w-6 h-6 rounded-lg bg-blue-100 text-secondary font-black text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-primary">Identity Verification &amp; Approval</h4>
                  <p className="text-[11px] text-gray-500">
                    Publisher vetting to ensure genuine audience traffic and prevent spam or click manipulation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-2xs">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-primary">Smart Partner Attribution Links</h4>
                  <p className="text-[11px] text-gray-500">
                    Clean, trackable links that direct users to AVNIVO verified multi-merchant price comparison cards.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-2xs">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-primary">Real-Time Performance Dashboard</h4>
                  <p className="text-[11px] text-gray-500">
                    Audited click logs, conversion metrics, and verifiable transaction reporting.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-2xs">
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 font-black text-xs flex items-center justify-center shrink-0">
                  4
                </span>
                <div>
                  <h4 className="font-bold text-primary">Compliant Indian Bank Settlements</h4>
                  <p className="text-[11px] text-gray-500">
                    Scheduled monthly payouts with GST/TDS tax invoicing and direct bank NEFT/IMPS transfers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How the Program Will Work */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-14 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-primary font-display">
            How the Future Program Will Work
          </h2>
          <p className="text-xs text-gray-500 max-w-lg mx-auto">
            A sustainable, trust-first model built for Indian creators and deal curators:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-secondary flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-primary">1. Curate Genuine Value</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Help your friends or audience discover genuine price crashes and problem-solving kitchen, home, and tech gadgets verified on AVNIVO.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-primary">2. Transparent Redirection</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              When shoppers click your partner link, they see real-time price comparisons across Amazon, Flipkart, and authorized merchants with zero price markups.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-primary">3. Earn on Verified Sales</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Earn competitive commissions on qualifying purchases fulfilled by partner retail merchants, verified through official affiliate tracking.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-14 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-primary font-display flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-secondary" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-xs text-gray-500">
            Clear answers about the upcoming AVNIVO Partner ecosystem
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 divide-y divide-gray-100 text-xs">
          <div className="py-4 first:pt-0 space-y-1.5">
            <h4 className="font-bold text-primary text-sm">
              When will the AVNIVO Affiliate Partner Program launch?
            </h4>
            <p className="text-gray-600 leading-relaxed">
              The program is currently under active legal and architectural preparation. We will announce the official launch date, commission schedules, and onboarding window to all members on the priority waitlist.
            </p>
          </div>

          <div className="py-4 space-y-1.5">
            <h4 className="font-bold text-primary text-sm">
              Who will be eligible to apply?
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Anyone with an active audience in India who promotes products ethically—including YouTube creators, Instagram deal pages, Telegram channel admins, website bloggers, and tech reviewers.
            </p>
          </div>

          <div className="py-4 space-y-1.5">
            <h4 className="font-bold text-primary text-sm">
              How will payouts be processed?
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Payouts will be settled directly to verified Indian bank accounts via standard NEFT/IMPS transfers, accompanied by statutory TDS compliance certificates as per Indian Income Tax regulations.
            </p>
          </div>

          <div className="py-4 last:pb-0 space-y-1.5">
            <h4 className="font-bold text-primary text-sm">
              Does AVNIVO ship products directly?
            </h4>
            <p className="text-gray-600 leading-relaxed">
              No. AVNIVO is an affiliate discovery and price comparison platform. Product inventory, payment processing, shipping, customer service, and returns are managed entirely by authorized retail merchants (such as Amazon India and Flipkart).
            </p>
          </div>
        </div>
      </section>

      {/* 5. Back to Store Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-bold text-secondary hover:text-secondary-dark underline"
        >
          <span>Explore Current Products on AVNIVO</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>
    </div>
  );
}
