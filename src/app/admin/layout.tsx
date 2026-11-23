"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/common/AuthContext";
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  MousePointerClick,
  MessageSquare,
  ShieldCheck,
  ShieldAlert,
  ArrowLeft,
  Lock,
  KeyRound,
  CheckCircle2,
  Share2,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, refreshUser } = useAuth();

  // In-page admin login state
  const [adminEmail, setAdminEmail] = useState("admin@avnivo.com");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        await refreshUser();
      } else {
        setLoginError(data.error || "Invalid administrator credentials.");
      }
    } catch {
      setLoginError("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickMasterLogin = async () => {
    setIsSubmitting(true);
    setLoginError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@avnivo.com", password: "Admin@Avnivo2025!" }),
      });
      if (res.ok) {
        await refreshUser();
      } else {
        setLoginError("Could not auto-sign in. Please enter password manually.");
      }
    } catch {
      setLoginError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl text-center max-w-sm w-full">
          <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-gray-500 font-semibold">Verifying administrative privileges...</p>
        </div>
      </div>
    );
  }

  // If not logged in as ADMIN, display dedicated in-page login form
  if (!user || user.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-blue-100 shadow-2xl p-6 sm:p-8">
          <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto mb-4 shadow-md">
            <Lock className="w-7 h-7 text-accent" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-primary font-display text-center mb-1">
            AVNIVO Admin Portal
          </h2>
          <p className="text-xs text-gray-500 text-center mb-6">
            Authorized management area for product catalog, affiliate merchants, and promotional banners.
          </p>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@avnivo.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                Password / Master Key
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-900 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-accent" />
              <span>{isSubmitting ? "Authenticating..." : "Sign In to Admin Dashboard"}</span>
            </button>
          </form>

          {/* Quick Authorized Admin Entry for Site Owner */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <button
              type="button"
              onClick={handleQuickMasterLogin}
              disabled={isSubmitting}
              className="w-full bg-blue-50 hover:bg-blue-100 text-secondary border border-blue-200 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>One-Click Owner Quick Access</span>
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Default credentials: <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-600">admin@avnivo.com</code> / <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-600">Admin@Avnivo2025!</code>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Store</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navLinks = [
    { name: "⚡ AI Command Center", href: "/admin/ai-command-center", icon: LayoutDashboard },
    { name: "🛡️ Approvals", href: "/admin/ai-command-center/approvals", icon: CheckCircle2 },
    { name: "📱 10 Social Channels", href: "/admin/ai-command-center/social", icon: Share2 },
    { name: "🔒 Security Panel", href: "/admin/ai-command-center/security", icon: ShieldAlert },
    { name: "Overview & Analytics", href: "/admin", icon: LayoutDashboard },
    { name: "Products & Offers", href: "/admin/products", icon: Package },
    { name: "Homepage Banners", href: "/admin/banners", icon: ImageIcon },
    { name: "Affiliate Click Logs", href: "/admin/clicks", icon: MousePointerClick },
    { name: "Support Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Admin Top Header */}
      <div className="bg-primary text-white py-3 px-4 sm:px-6 border-b border-blue-900 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-black text-lg tracking-wider font-display text-white">
              AVN<span className="text-secondary">IVO</span>
            </span>
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 font-bold text-[10px] rounded border border-blue-400/30 uppercase">
              Control Panel
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-gray-300">
              Admin: <strong className="text-white">{user.name}</strong>
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-blue-300 hover:text-white underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Admin Sub-nav & Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-gray-200">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  active
                    ? "bg-secondary text-white shadow-md"
                    : "bg-white text-charcoal border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {children}
      </div>
    </div>
  );
}
