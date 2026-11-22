import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
  light?: boolean;
  showText?: boolean;
}

export function AvnivoLogo({
  className = "",
  size = "md",
  withTagline = true,
  light = false,
  showText = true,
}: LogoProps) {
  const dimensions = {
    sm: { size: 36, container: "w-9 h-9", text: "text-lg" },
    md: { size: 48, container: "w-11 h-11 sm:w-12 sm:h-12", text: "text-xl sm:text-2xl" },
    lg: { size: 68, container: "w-16 h-16 sm:w-20 sm:h-20", text: "text-3xl" },
  };

  const current = dimensions[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Official AVNIVO Emblem Logo Badge */}
      <div
        className={`${current.container} relative rounded-full overflow-hidden shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300 bg-white ring-2 ${
          light ? "ring-white/30" : "ring-orange-500/20"
        }`}
      >
        <Image
          src="/logo.png"
          alt="AVNIVO Logo - Smart Living, Better Home"
          width={current.size}
          height={current.size}
          className="w-full h-full object-contain p-0.5"
          priority
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`${current.text} font-black tracking-wider font-display uppercase ${
              light ? "text-white" : "text-primary"
            }`}
          >
            AVN<span className="text-[#E65100]">IVO</span>
          </span>
          {withTagline && (
            <span
              className={`text-[9.5px] font-bold tracking-tight mt-0.5 ${
                light ? "text-orange-200" : "text-gray-600"
              }`}
            >
              Smart Living, Better Home.
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
