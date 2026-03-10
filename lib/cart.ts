export type CartItem = {
  product_id: string;
  slug?: string | null;
  name: string;
  price_minor: number;
  currency?: string | null;
  image_url?: string | null;
  quantity: number;
};

const KEY = "lbm_cart_v1";

function emitToast(detail: { type?: "success" | "info" | "error"; title?: string; message: string }) {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("lbm_toast", { detail }));
  } catch {
  }
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((it) => it && it.product_id && it.name)
      .map((it) => ({
        ...it,
        quantity: Math.max(1, Number(it.quantity || 1)),
        price_minor: Number(it.price_minor || 0),
      }));
  } catch {
    return [];
  }
}

export function setCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("lbm_cart_updated"));
  } catch {
  }
}

export function clearCart() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new Event("lbm_cart_updated"));
  } catch {
  }
}

export function addToCart(item: CartItem) {
  const items = getCart();
  const idx = items.findIndex((it) => it.product_id === item.product_id);
  if (idx >= 0) {
    items[idx] = { ...items[idx], quantity: items[idx].quantity + item.quantity };
    emitToast({ type: "success", title: "Bag Updated", message: `${items[idx].name} × ${items[idx].quantity}` });
  } else {
    items.push(item);
    emitToast({ type: "success", title: "Added to Bag", message: item.name });
  }
  setCart(items);
}

export function removeFromCart(product_id: string) {
  const prev = getCart();
  const removed = prev.find((it) => it.product_id === product_id);
  const items = prev.filter((it) => it.product_id !== product_id);
  setCart(items);
  if (removed) {
    emitToast({ type: "info", title: "Removed", message: removed.name });
  }
}

export function setQuantity(product_id: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(product_id);
    return;
  }
  const items = getCart().map((it) => (it.product_id === product_id ? { ...it, quantity } : it));
  setCart(items);
  const updated = items.find((it) => it.product_id === product_id);
  if (updated) {
    emitToast({ type: "success", title: "Quantity Updated", message: `${updated.name} × ${updated.quantity}` });
  }
}

export function computeSubtotal(items: CartItem[]) {
  return items.reduce((sum, it) => sum + it.price_minor * it.quantity, 0);
}

export function computeTotals(items: CartItem[]) {
  const subtotal = computeSubtotal(items);
  const tax = Math.round(subtotal * 0.18);
  const shipping = 0;
  const total = subtotal + tax + shipping;
  return { subtotal, tax, shipping, total };
}
