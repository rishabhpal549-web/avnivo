"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function ReferralTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const refCode = searchParams.get("ref");
      if (refCode && refCode.trim() !== "") {
        const cleanRef = refCode.trim().toLowerCase();
        
        // 1. Save in localStorage
        localStorage.setItem("avnivo_partner_ref", cleanRef);
        localStorage.setItem("avnivo_ref_time", Date.now().toString());

        // 2. Set 30-day attribution cookie
        document.cookie = `avnivo_ref=${cleanRef}; path=/; max-age=2592000; SameSite=Lax`;

        // 3. Send lightweight tracking beacon
        fetch("/api/affiliate-program/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ref: cleanRef,
            path: pathname,
          }),
        }).catch(() => {});
      }
    } catch (e) {
      // Ignore client side errors
    }
  }, [pathname, searchParams]);

  return null;
}
