import { useState, useCallback } from "react";
import type { Order, CartItem, Address } from "@/types";
import { getCurrentUser } from "@/lib/auth";

const ORDERS_KEY = "tyfenix_orders";

export function getAllOrders(): Order[] {
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveAllOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(() => {
    const user = getCurrentUser();
    if (!user) return [];
    const all = getAllOrders();
    return all.filter((o) => o.userId === user.id);
  });

  const createOrder = useCallback(
    (
      items: CartItem[],
      address: Address,
      paymentMethod: string,
      couponDiscount = 0,
      couponCode?: string
    ): Order => {
      const user = getCurrentUser();
      const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
      const shipping = subtotal >= 499 ? 0 : 49;
      const tax = Math.round(subtotal * 0.18);
      const total = subtotal + shipping + tax - couponDiscount;

      const order: Order = {
        id: `TYF${Date.now()}`,
        userId: user?.id || "guest",
        items,
        status: "confirmed",
        total,
        subtotal,
        tax,
        shipping,
        discount: couponDiscount,
        couponCode,
        address,
        paymentMethod,
        paymentStatus: "paid",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        trackingId: `TRK${Math.floor(Math.random() * 900000) + 100000}`,
      };

      const all = getAllOrders();
      all.unshift(order);
      saveAllOrders(all);
      setOrders((prev) => [order, ...prev]);
      return order;
    },
    []
  );

  const updateOrderStatus = useCallback((orderId: string, status: Order["status"]) => {
    const all = getAllOrders();
    const idx = all.findIndex((o) => o.id === orderId);
    if (idx >= 0) {
      all[idx].status = status;
      all[idx].updatedAt = new Date().toISOString();
      saveAllOrders(all);
    }
  }, []);

  const refreshOrders = useCallback(() => {
    const user = getCurrentUser();
    if (!user) { setOrders([]); return; }
    const all = getAllOrders();
    if (user.isAdmin) {
      setOrders(all);
    } else {
      setOrders(all.filter((o) => o.userId === user.id));
    }
  }, []);

  return { orders, createOrder, updateOrderStatus, refreshOrders };
}
