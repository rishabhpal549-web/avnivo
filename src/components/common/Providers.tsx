"use client";

import React, { Suspense } from "react";
import { AuthProvider } from "./AuthContext";
import { LanguageProvider } from "./LanguageContext";
import { WishlistProvider } from "./WishlistContext";
import { CompareProvider } from "./CompareContext";
import { AuthModal } from "./AuthModal";
import { ReferralTracker } from "./ReferralTracker";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <WishlistProvider>
          <CompareProvider>
            <Suspense fallback={null}>
              <ReferralTracker />
            </Suspense>
            {children}
            <AuthModal />
          </CompareProvider>
        </WishlistProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

