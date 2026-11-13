'use client';

import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';

const COMPARISON_KEY = 'avnivo_compare_ids';
const CUSTOM_PRODUCTS_KEY = 'avnivo_custom_products';

export function getComparisonList(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(COMPARISON_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function addToComparison(productId: string): string[] {
  if (typeof window === 'undefined') return [];
  const list = getComparisonList();
  if (!list.includes(productId)) {
    if (list.length >= 4) {
      list.shift(); // keep maximum 4 products
    }
    list.push(productId);
    localStorage.setItem(COMPARISON_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event('avnivo_compare_updated'));
  }
  return list;
}

export function removeFromComparison(productId: string): string[] {
  if (typeof window === 'undefined') return [];
  const list = getComparisonList().filter(id => id !== productId);
  localStorage.setItem(COMPARISON_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event('avnivo_compare_updated'));
  return list;
}

export function clearComparison(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(COMPARISON_KEY);
  window.dispatchEvent(new Event('avnivo_compare_updated'));
}

// Custom Products LocalStorage for Admin Management
export function getCustomProducts(): Product[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveCustomProduct(product: Product): Product[] {
  if (typeof window === 'undefined') return [];
  const existing = getCustomProducts();
  const index = existing.findIndex(p => p.id === product.id);
  let updated: Product[];
  if (index >= 0) {
    updated = [...existing];
    updated[index] = product;
  } else {
    updated = [product, ...existing];
  }
  localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteCustomProduct(productId: string): Product[] {
  if (typeof window === 'undefined') return [];
  const updated = getCustomProducts().filter(p => p.id !== productId);
  localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(updated));
  return updated;
}

export function getAllMergedProducts(): Product[] {
  if (typeof window === 'undefined') return PRODUCTS;
  const custom = getCustomProducts();
  if (!custom || custom.length === 0) return PRODUCTS;
  
  // Custom items override or prepend
  const customIds = new Set(custom.map(c => c.id));
  const baseFiltered = PRODUCTS.filter(p => !customIds.has(p.id));
  return [...custom, ...baseFiltered];
}

