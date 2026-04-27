import { useState, useEffect, useCallback } from "react";
import type { Product } from "@/types";

const WISHLIST_KEY = "tyfenix_wishlist";

function loadWishlist(): Product[] {
  try {
    const data = localStorage.getItem(WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveWishlist(items: Product[]) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("tyfenix_wishlist_change"));
}

export function useWishlist() {
  const [items, setItems] = useState<Product[]>(loadWishlist);

  useEffect(() => {
    const handler = () => setItems(loadWishlist());
    window.addEventListener("tyfenix_wishlist_change", handler);
    return () => window.removeEventListener("tyfenix_wishlist_change", handler);
  }, []);

  const toggle = useCallback((product: Product) => {
    const current = loadWishlist();
    const idx = current.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      current.splice(idx, 1);
    } else {
      current.push(product);
    }
    saveWishlist(current);
    setItems([...current]);
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => items.some((p) => p.id === productId),
    [items]
  );

  const remove = useCallback((productId: string) => {
    const current = loadWishlist().filter((p) => p.id !== productId);
    saveWishlist(current);
    setItems(current);
  }, []);

  return { items, toggle, isInWishlist, remove };
}
