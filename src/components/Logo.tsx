'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showTagline = true, className = '' }: LogoProps) {
  const dimensions = {
    sm: { icon: 34, text: 'text-lg', tagline: 'text-[9px]' },
    md: { icon: 44, text: 'text-xl', tagline: 'text-[10px]' },
    lg: { icon: 56, text: 'text-2xl', tagline: 'text-xs' },
  }[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Circular AVNIVO Emblem */}
      <div 
        className="relative flex items-center justify-center rounded-full bg-brand-navy shadow-md ring-2 ring-brand-orange/90 transition-transform duration-200 group-hover:scale-105"
        style={{ width: dimensions.icon, height: dimensions.icon }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full p-1" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer ring accent */}
          <circle cx="50" cy="50" r="44" stroke="#FF7900" strokeWidth="3" strokeDasharray="6 3" opacity="0.85" />
          
          {/* Inner circle */}
          <circle cx="50" cy="50" r="38" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
          
          {/* Stylized Roof & Hearth / Monogram A */}
          <path d="M30 52 L50 32 L70 52" stroke="#FF7900" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 38 L63 60 L37 60 Z" stroke="#FFFFFF" strokeWidth="2.5" strokeLinejoin="round" />
          
          {/* Chimney / Hearth flame */}
          <rect x="58" y="34" width="4" height="8" rx="1" fill="#FF7900" />
          
          {/* Central Leaf/Living Dot */}
          <circle cx="50" cy="52" r="3" fill="#FF7900" />
          
          {/* Small star dots */}
          <circle cx="22" cy="50" r="1.5" fill="#FFFFFF" />
          <circle cx="78" cy="50" r="1.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Wordmark & Tagline */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className={`font-black tracking-wider text-white ${dimensions.text} transition-colors group-hover:text-brand-orange`}>
            AVNIVO
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/15 px-1.5 py-0.5 rounded border border-brand-orange/30">
            India
          </span>
        </div>
        {showTagline && (
          <span className={`font-medium tracking-wide text-gray-300 ${dimensions.tagline}`}>
            Smart Living, Better Home.
          </span>
        )}
      </div>
    </Link>
  );
}

