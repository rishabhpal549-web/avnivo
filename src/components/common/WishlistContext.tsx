"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

interface WishlistContextType {
  wishlistIds: string[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<boolean>;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistIds: [],
  isInWishlist: () => false,
  toggleWishlist: async () => false,
  wishlistCount: 0,
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      fetch("/api/wishlist")
        .then((res) => res.json())
        .then((data) => {
          if (data.items) {
            setWishlistIds(data.items.map((i: any) => i.productId));
          }
        })
        .catch(() => {});
    } else {
      try {
        const saved = localStorage.getItem("avnivo_guest_wishlist");
        if (saved) {
          setWishlistIds(JSON.parse(saved));
        }
      } catch {
        setWishlistIds([]);
      }
    }
  }, [user]);

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const toggleWishlist = async (productId: string): Promise<boolean> => {
    let newState = false;
    if (user) {
      try {
        const res = await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
        });
        const data = await res.json();
        newState = Boolean(data.inWishlist);
      } catch {
        newState = false;
      }
    } else {
      newState = !wishlistIds.includes(productId);
      const updated = newState
        ? [...wishlistIds, productId]
        : wishlistIds.filter((id) => id !== productId);
      try {
        localStorage.setItem("avnivo_guest_wishlist", JSON.stringify(updated));
      } catch {}
    }

    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );

    return newState;
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        isInWishlist,
        toggleWishlist,
        wishlistCount: wishlistIds.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
