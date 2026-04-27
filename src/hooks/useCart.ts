import { useState, useEffect, useCallback } from "react";
import type { CartItem, Product } from "@/types";

const CART_KEY = "tyfenix_cart";

function loadCart(): CartItem[] {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("tyfenix_cart_change"));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setItems(loadCart());
    window.addEventListener("tyfenix_cart_change", handler);
    return () => window.removeEventListener("tyfenix_cart_change", handler);
  }, []);

  const addItem = useCallback((product: Product, quantity = 1) => {
    const current = loadCart();
    const idx = current.findIndex((i) => i.product.id === product.id);
    if (idx >= 0) {
      current[idx].quantity = Math.min(current[idx].quantity + quantity, product.stock);
    } else {
      current.push({ product, quantity });
    }
    saveCart(current);
    setItems([...current]);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    const current = loadCart().filter((i) => i.product.id !== productId);
    saveCart(current);
    setItems(current);
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const current = loadCart();
    const idx = current.findIndex((i) => i.product.id === productId);
    if (idx >= 0) {
      if (quantity <= 0) {
        current.splice(idx, 1);
      } else {
        current[idx].quantity = Math.min(quantity, current[idx].product.stock);
      }
    }
    saveCart(current);
    setItems([...current]);
  }, []);

  const clearCart = useCallback(() => {
    saveCart([]);
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const savings = items.reduce((sum, i) => sum + (i.product.originalPrice - i.product.price) * i.quantity, 0);

  return {
    items,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    savings,
  };
}
