import { makeVar, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";

export type CartItem = {
  uid: string;
  sku: string;
  name: string;
  price: number;
  currency: string;
  qty: number;
};

const STORAGE_KEY = "cart";

export const cartVar = makeVar<CartItem[]>([]);

function persistcart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to persist cart", error);
  }
}

function setCart(items: CartItem[]) {
  cartVar(items);
  persistcart(items);
}

export function addToCart(item: Omit<CartItem, "qty">, qty: number) {
  const items = cartVar();
  const existing = items.find((i) => i.uid === item.uid);
  if (existing) {
    setCart(
      items.map((i) => (i.uid === item.uid ? { ...i, qty: i.qty + qty } : i)),
    );
  } else {
    setCart([...items, { ...item, qty }]);
  }
}

export function removeFromCart(uid: string) {
  setCart(cartVar().filter((i) => i.uid !== uid));
}

export function setQty(uid: string, qty: number) {
  if (qty <= 1) {
    removeFromCart(uid);
    return;
  }
  setCart(cartVar().map((i) => (i.uid === uid ? { ...i, qty } : i)));
}

export function useCartCount() {
  const items = useReactiveVar(cartVar);
  return items.reduce((sum, i) => sum + i.qty, 0);
}

export function useCart() {
  const items = useReactiveVar(cartVar);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const currency = items[0]?.currency ?? "USD";
  return { items, count, subtotal, currency };
}

export function useCartHydration() {
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) cartVar(JSON.parse(stored)) as CartItem[];
    } catch (error) {
      console.error("Failed to load cart from storage", error);
    }
  }, []);
}
