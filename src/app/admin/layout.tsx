"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/common/AuthContext";
import {
  LayoutDashboard,
  Package,
  Tag,
  Layers,
  Image as ImageIcon,
  FileText,
  Share2,
  MousePointerClick,
  MessageSquare,
  Globe,
  Settings,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Lock,
  KeyRound,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  LogOut,
  ShieldCheck,
} from "lucide-react";

interface NavGroup {
  groupTitle: string;
  items: {
    name: string;
    href: string;
    icon: any;
    badge?: string;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    groupTitle: "Core Commerce",
    items: [
      { name: "Overview", href: "/admin", icon: LayoutDashboard },
      { name: "Products", href: "/admin/products", icon: Package },
      { name: "Affiliate Offers", href: "/admin/offers", icon: Tag },
      { name: "Categories", href: "/admin/categories", icon: Layers },
    ],
  },
  {
    groupTitle: "Marketing & Content",
    items: [
      { name: "Homepage Banners", href: "/admin/banners", icon: ImageIcon },
      { name: "CMS & Buying Guides", href: "/admin/cms", icon: FileText },
      { name: "Social Media Hub", href: "/admin/social", icon: Share2 },
    ],
  },
  {
    groupTitle: "Reports & Customer",
    items: [
      { name: "Click Analytics & CSV", href: "/admin/clicks", icon: MousePointerClick },
      { name: "Customer Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    ],
  },
  {
    groupTitle: "Platform & Security",
    items: [
      { name: "SEO Manager", href: "/admin/seo", icon: Globe },
      { name: "Website Settings", href: "/admin/settings", icon: Settings },
      { name: "Security & Roles", href: "/admin/security", icon: ShieldAlert },
      { name: "AI Command Center", href: "/admin/ai-command-center", icon: Sparkles, badge: "AI" },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading, refreshUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            Authorized management area for product catalog, affiliate merchants, and platform controls.
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-[#0F172A] text-white border-b border-slate-800 shadow-md">
        <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 lg:hidden transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="font-black text-xl tracking-wider font-display text-white">
                AVN<span className="text-secondary">IVO</span>
              </span>
              <span className="hidden sm:inline-flex px-2.5 py-0.5 bg-blue-500/20 text-blue-300 font-bold text-[10px] rounded-full border border-blue-400/30 uppercase tracking-wider">
                Affiliate Control Hub
              </span>
            </Link>
          </div>

          {/* Right: User Role & Actions */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium border border-slate-700 transition-colors"
            >
              <span>Visit Public Store</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-secondary text-white font-bold flex items-center justify-center text-xs shadow-inner">
                {user.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="hidden sm:block text-left">
                <p className="font-bold text-white text-[11px] leading-tight truncate max-w-[120px]">
                  {user.name}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] text-green-400 font-medium">
                  <ShieldCheck className="w-3 h-3" /> Super Admin
                </span>
              </div>
              <button
                onClick={logout}
                className="p-2 text-slate-400 hover:text-red-400 rounded-xl hover:bg-slate-800 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace with Sidebar */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r border-slate-200 shrink-0 p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="space-y-6">
            {NAV_GROUPS.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  {group.groupTitle}
                </p>
                <div className="space-y-0.5 pt-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? "bg-secondary text-white shadow-sm font-semibold"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${
                              isActive ? "bg-white text-secondary" : "bg-blue-50 text-secondary"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Mobile Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl p-4 overflow-y-auto z-50">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <span className="font-black text-lg tracking-wider font-display text-primary">
                  AVN<span className="text-secondary">IVO</span> Admin
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-6">
                {NAV_GROUPS.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-1">
                    <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      {group.groupTitle}
                    </p>
                    <div className="space-y-0.5 pt-1">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                              isActive
                                ? "bg-secondary text-white shadow-sm"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                              <span>{item.name}</span>
                            </div>
                            {item.badge && (
                              <span
                                className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${
                                  isActive ? "bg-white text-secondary" : "bg-blue-50 text-secondary"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-slate-500 hover:text-primary rounded-xl hover:bg-slate-50"
                >
                  <span>Visit Public Store</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
