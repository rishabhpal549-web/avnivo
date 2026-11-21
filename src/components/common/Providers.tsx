"use client";

import React from "react";
import { AuthProvider } from "./AuthContext";
import { LanguageProvider } from "./LanguageContext";
import { WishlistProvider } from "./WishlistContext";
import { CompareProvider } from "./CompareContext";
import { AuthModal } from "./AuthModal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <WishlistProvider>
          <CompareProvider>
            {children}
            <AuthModal />
          </CompareProvider>
        </WishlistProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
