"use client";

import { useEffect, useState } from "react";
import { Download, X, Smartphone } from "lucide-react";

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Check if user dismissed recently
      const dismissed = localStorage.getItem("avnivo_pwa_dismissed");
      if (!dismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("avnivo_pwa_dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="App installation banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 bg-primary/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-blue-500/30 flex items-center justify-between gap-3 animate-fade-in"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 shadow-inner">
          <Smartphone className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-white truncate">Install AVNIVO App</p>
          <p className="text-[11px] text-gray-300 truncate">
            Fast deals, instant comparison &amp; zero lag
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleInstall}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-blue-400 text-primary font-bold text-xs rounded-xl shadow transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install</span>
        </button>
        <button
          onClick={handleDismiss}
          className="p-1.5 text-gray-400 hover:text-white rounded-lg transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
