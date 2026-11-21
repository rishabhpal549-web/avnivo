import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
  light?: boolean;
}

export function AvnivoLogo({
  className = "",
  size = "md",
  withTagline = true,
  light = false,
}: LogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Original AVNIVO Icon: Hexagonal Compass Shield */}
      <div className={`${iconSizes[size]} relative flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="avnivoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#101B35" />
            </linearGradient>
            <linearGradient id="avnivoAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>

          {/* Modern Shield Outer Base */}
          <path
            d="M50 5 L88 24 C88 56 72 82 50 95 C28 82 12 56 12 24 Z"
            fill="url(#avnivoGrad)"
          />

          {/* Inner Geometric Chevron 'A' & Compass Node */}
          <path
            d="M50 22 L72 64 L50 54 L28 64 Z"
            fill="url(#avnivoAccent)"
          />

          {/* Central Precision Pivot */}
          <circle cx="50" cy="46" r="5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col leading-none">
        <span
          className={`${textSizes[size]} font-black tracking-wider font-display uppercase ${
            light ? "text-white" : "text-primary"
          }`}
        >
          AVN<span className="text-secondary">IVO</span>
        </span>
        {withTagline && (
          <span
            className={`text-[9px] font-bold tracking-[0.2em] uppercase mt-0.5 ${
              light ? "text-blue-200" : "text-gray-500"
            }`}
          >
            Discover • Compare • Shop
          </span>
        )}
      </div>
    </Link>
  );
}
