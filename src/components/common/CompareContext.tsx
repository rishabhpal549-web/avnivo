"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";

export interface CompareProductItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  indicativePrice: number;
  categorySlug: string;
}

interface CompareContextType {
  compareItems: CompareProductItem[];
  addToCompare: (product: CompareProductItem) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
}

const CompareContext = createContext<CompareContextType>({
  compareItems: [],
  addToCompare: () => false,
  removeFromCompare: () => {},
  clearCompare: () => {},
  isInCompare: () => false,
});

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareItems, setCompareItems] = useState<CompareProductItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("avnivo_compare_items");
      if (saved) {
        setCompareItems(JSON.parse(saved));
      }
    } catch {
      setCompareItems([]);
    }
  }, []);

  const save = (items: CompareProductItem[]) => {
    setCompareItems(items);
    try {
      localStorage.setItem("avnivo_compare_items", JSON.stringify(items));
    } catch {}
  };

  const addToCompare = (product: CompareProductItem): boolean => {
    if (compareItems.some((i) => i.id === product.id)) {
      removeFromCompare(product.id);
      return false;
    }
    if (compareItems.length >= 4) {
      alert("You can compare up to 4 products at a time.");
      return false;
    }
    save([...compareItems, product]);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    save(compareItems.filter((i) => i.id !== productId));
  };

  const clearCompare = () => {
    save([]);
  };

  const isInCompare = (productId: string) => compareItems.some((i) => i.id === productId);

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
      }}
    >
      {children}

      {/* Floating Compare Drawer Bar */}
      {compareItems.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 bg-primary/95 backdrop-blur-md text-white border-t border-blue-900 shadow-2xl z-40 py-3 px-4 transition-transform duration-300">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-blue-200">
                Compare Tray ({compareItems.length}/4):
              </span>
              <div className="flex items-center gap-2">
                {compareItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg text-xs font-medium"
                  >
                    <span className="truncate max-w-[120px]">{item.name}</span>
                    <button
                      onClick={() => removeFromCompare(item.id)}
                      className="text-gray-400 hover:text-white"
                      title="Remove"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={clearCompare}
                className="text-xs text-gray-300 hover:text-white underline"
              >
                Clear all
              </button>
              <Link
                href={`/compare?ids=${compareItems.map((i) => i.id).join(",")}`}
                className="inline-flex items-center gap-1.5 bg-secondary hover:bg-secondary-dark text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-md transition-colors"
              >
                <span>Compare Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);
