"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, ChevronLeft, ChevronRight, Zap, Tag } from "lucide-react";

interface BannerSlide {
  id: string;
  tag: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryText: string;
  secondaryLink: string;
  image: string;
  active?: boolean;
}

const DEFAULT_SLIDES: BannerSlide[] = [
  {
    id: "banner-1",
    tag: "KITCHEN ESSENTIALS",
    badge: "Under ₹299",
    title: "Smart Kitchen Hacks & Accessories Under ₹299",
    subtitle: "Silicone stretch lids, dual julienne slicers, oil sprayers & budget kitchen helpers with verified offers.",
    ctaText: "Shop Kitchen Deals",
    ctaLink: "/shop?category=kitchen-accessories",
    secondaryText: "All Deals",
    secondaryLink: "/deals",
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "banner-2",
    tag: "DESK & LIVING",
    badge: "Under ₹499",
    title: "Daily Home & Desk Essentials Under ₹499",
    subtitle: "Motion sensor wireless LED lights, aluminum phone stands & self-adhesive cable tidy organizers.",
    ctaText: "Explore Desk Gear",
    ctaLink: "/shop?category=mobile-accessories",
    secondaryText: "Home & Living",
    secondaryLink: "/shop?category=home-living",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "banner-3",
    tag: "FITNESS & LIFESTYLE",
    badge: "Under ₹399",
    title: "Budget Fitness & Daily Life Hacks Under ₹399",
    subtitle: "Color-coded loop resistance bands, adjustable forearm hand grippers & compact 14-in-1 multi-tools.",
    ctaText: "Fitness Accessories",
    ctaLink: "/shop?category=fitness-accessories",
    secondaryText: "Daily Use",
    secondaryLink: "/shop?category=daily-use-products",
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "banner-4",
    tag: "BEST AFFILIATE DEALS",
    badge: "Under ₹199",
    title: "Pocket-Friendly Essentials on Amazon, Flipkart & Meesho",
    subtitle: "Verified discount prices, direct partner links, and honest product specifications without markups.",
    ctaText: "View Deals Under ₹199",
    ctaLink: "/shop?maxPrice=199",
    secondaryText: "All Categories",
    secondaryLink: "/shop",
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&auto=format&fit=crop&q=80",
  },
];

export function HeroSlider() {
  const [slides, setSlides] = useState<BannerSlide[]>(DEFAULT_SLIDES);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("/api/admin/banners")
      .then((res) => res.json())
      .then((data) => {
        if (data.banners && Array.isArray(data.banners)) {
          const active = data.banners.filter((b: BannerSlide) => b.active !== false);
          if (active.length > 0) setSlides(active);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current] || slides[0];

  return (
    <div className="relative overflow-hidden bg-primary text-white rounded-2xl sm:rounded-3xl mx-3 sm:mx-6 lg:mx-auto max-w-7xl my-4 sm:my-6 shadow-xl border border-blue-900/50">
      {/* Background Accent Glow */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-secondary/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-5 sm:px-10 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Column: Headlines & CTAs */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-accent border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{slide.tag}</span>
            <span className="text-gray-400">•</span>
            <span className="text-white font-extrabold">{slide.badge}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-display leading-[1.15] tracking-tight">
            {slide.title}
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href={slide.ctaLink}
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-xl sm:rounded-2xl shadow-lg transition-all group"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={slide.secondaryLink}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl sm:rounded-2xl border border-white/20 transition-colors backdrop-blur-sm"
            >
              <span>{slide.secondaryText}</span>
            </Link>
          </div>

          {/* Value Badges */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>Amazon • Flipkart • Meesho</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-green-400 shrink-0" />
              <span>No Merchant Markups</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Under ₹999 Essentials</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Showcase */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-64 sm:w-72 h-64 sm:h-72 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-white/15 to-white/5 backdrop-blur-md p-4 sm:p-5 border border-white/20 shadow-2xl flex items-center justify-center group overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover rounded-xl sm:rounded-2xl drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
            />
            {/* Floating Price Pill */}
            <div className="absolute bottom-3 bg-white/95 backdrop-blur-md text-primary rounded-xl px-3 py-1.5 shadow-xl border border-gray-100 flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <div>
                <p className="text-[9px] uppercase font-bold text-gray-500">Affiliate Discovery</p>
                <p className="text-[11px] font-black text-secondary">Lowest Indicative Deal</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      {slides.length > 1 && (
        <div className="absolute bottom-3 right-5 z-20 flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${
                current === i ? "w-6 bg-secondary" : "w-1.5 bg-white/40"
              }`}
              title={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
