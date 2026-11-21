"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, ChevronLeft, ChevronRight, Zap } from "lucide-react";

const slides = [
  {
    tag: "FESTIVAL OF SAVINGS",
    title: "Find the Lowest Price Across Amazon, Flipkart & Croma",
    subtitle: "Compare live indicative prices, uncover unadvertised bank offers, and shop with complete confidence.",
    ctaText: "Compare Flagship Phones",
    ctaLink: "/shop?category=smartphones",
    secondaryText: "Today's Best Deals",
    secondaryLink: "/deals",
    badge: "Save up to 40% on Electronics",
    gradient: "from-primary via-primary-800 to-blue-950",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
  },
  {
    tag: "SMART TECH DEALS",
    title: "Laptops & Noise-Cancelling Audio at Unbeatable Rates",
    subtitle: "Apple M3 MacBooks, Sony WH-1000XM5, and Intel Core Ultra machines compared side-by-side.",
    ctaText: "Explore Laptop Offers",
    ctaLink: "/shop?category=laptops-computers",
    secondaryText: "Audio Gear",
    secondaryLink: "/shop?category=headphones-audio",
    badge: "Verified Merchant Discounts",
    gradient: "from-blue-950 via-primary to-slate-900",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
  },
  {
    tag: "LIFESTYLE & HOME",
    title: "Smart Kitchen Appliances & Premium Travel Gear",
    subtitle: "Healthy digital air fryers, induction cookware, and scratch-resistant luggage sets.",
    ctaText: "Discover Home & Kitchen",
    ctaLink: "/category/home-kitchen",
    secondaryText: "Travel Gear",
    secondaryLink: "/category/travel-lifestyle",
    badge: "Up to 60% Off Kitchen & Luggage",
    gradient: "from-slate-900 via-primary-900 to-primary",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative overflow-hidden bg-primary text-white rounded-3xl mx-4 sm:mx-6 lg:mx-auto max-w-7xl my-6 shadow-2xl border border-blue-900/50">
      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-secondary/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-12 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Headlines & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-accent border border-white/10">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{slide.tag}</span>
            <span className="text-gray-400">•</span>
            <span className="text-white">{slide.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display leading-[1.15] tracking-tight">
            {slide.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={slide.ctaLink}
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all group"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={slide.secondaryLink}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3.5 rounded-2xl border border-white/20 transition-colors backdrop-blur-sm"
            >
              <span>{slide.secondaryText}</span>
            </Link>
          </div>

          {/* Value Badges */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-[11px] sm:text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
              <span>100% Genuine Partner Stores</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400 shrink-0" />
              <span>No Inflated Price Markups</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Zero Cost to Shoppers</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Showcase */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-72 sm:w-80 h-80 rounded-3xl bg-gradient-to-tr from-white/10 to-white/5 backdrop-blur-md p-6 border border-white/20 shadow-2xl flex items-center justify-center group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.title}
              className="max-h-full max-w-full object-contain rounded-2xl drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
            />
            {/* Floating Price Pill */}
            <div className="absolute -bottom-4 bg-white text-primary rounded-2xl p-3 shadow-xl border border-gray-100 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Indicative Best Price</p>
                <p className="text-xs font-black text-secondary">Verified across 3+ Stores</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              current === i ? "w-8 bg-secondary" : "w-2 bg-white/40"
            }`}
            title={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
