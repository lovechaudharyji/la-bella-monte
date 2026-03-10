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
  } else {
    items.push(item);
  }
  setCart(items);
}

export function removeFromCart(product_id: string) {
  const items = getCart().filter((it) => it.product_id !== product_id);
  setCart(items);
}

export function setQuantity(product_id: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(product_id);
    return;
  }
  const items = getCart().map((it) =>
    it.product_id === product_id ? { ...it, quantity } : it
  );
  setCart(items);
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
