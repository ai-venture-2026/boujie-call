import { useEffect, useState, useSyncExternalStore } from "react";
import { orderPlaced } from "./checkout";
import { forSale, getOffer, getProduct, MAX_QTY } from "./products";

// skip marks a piece the shopper unticked: it stays in the bag but is left out of checkout and totals.
export type BagLine = { slug: string; colorway: string; size: string; qty: number; skip?: true };

export const BAG_KEY = "bc-bag";
export { MAX_QTY } from "./products";
export const BAG_OPENED = "bc-bag-opened";
export const CHECKOUT_KEY = "bc-checkout";
const CHECKOUT_DAYS = 7;

const listeners = new Set<() => void>();
const empty: BagLine[] = [];
let cache: { raw: string | null; lines: BagLine[] } = { raw: null, lines: empty };

function isValid(line: unknown): line is BagLine {
  if (typeof line !== "object" || line === null) return false;
  const { slug, colorway, size, qty } = line as Record<string, unknown>;
  const product = typeof slug === "string" ? getProduct(slug) : undefined;
  return (
    !!product &&
    forSale(product, colorway) &&
    product.sizes.includes(size as string) &&
    Number.isInteger(qty) &&
    (qty as number) >= 1 &&
    (qty as number) <= MAX_QTY
  );
}

// localStorage is visitor editable, so every read is validated against the product data.
export function readBag(): BagLine[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(BAG_KEY);
  } catch {
    return empty;
  }
  if (raw === cache.raw) return cache.lines;
  let lines: BagLine[] = [];
  try {
    const parsed: unknown = JSON.parse(raw ?? "[]");
    if (Array.isArray(parsed)) lines = parsed.filter(isValid).map(({ slug, colorway, size, qty, skip }) => ({ slug, colorway, size, qty, ...(skip === true && { skip }) }));
  } catch {}
  cache = { raw, lines };
  return lines;
}

export function writeBag(lines: BagLine[]) {
  try {
    localStorage.setItem(BAG_KEY, JSON.stringify(lines));
  } catch {}
  listeners.forEach((l) => l());
}

export function addToBag(pick: Omit<BagLine, "qty">) {
  const lines = readBag();
  const same = (l: BagLine) => l.slug === pick.slug && l.colorway === pick.colorway && l.size === pick.size;
  const existing = lines.find(same);
  writeBag(
    existing ? lines.map((l) => (same(l) ? { slug: l.slug, colorway: l.colorway, size: l.size, qty: Math.min(l.qty + 1, MAX_QTY) } : l)) : [...lines, { ...pick, qty: 1 }],
  );
}

export const bagCount = (lines: BagLine[]) => lines.reduce((n, l) => n + l.qty, 0);

const sameLine = (a: Omit<BagLine, "qty">) => (b: BagLine) => a.slug === b.slug && a.colorway === b.colorway && a.size === b.size;

export const picked = (lines: BagLine[]) => lines.filter((l) => !l.skip);

export function setSkip(pick: Omit<BagLine, "qty">, skip: boolean) {
  writeBag(readBag().map((l) => (sameLine(pick)(l) ? { slug: l.slug, colorway: l.colorway, size: l.size, qty: l.qty, ...(skip && { skip: true as const }) } : l)));
}

export function setQty(pick: Omit<BagLine, "qty">, qty: number) {
  const next = Math.min(Math.max(Math.round(qty), 1), MAX_QTY);
  writeBag(readBag().map((l) => (sameLine(pick)(l) ? { ...l, qty: next } : l)));
}

export function removeFromBag(pick: Omit<BagLine, "qty">) {
  writeBag(readBag().filter((l) => !sameLine(pick)(l)));
}

export function rememberCheckout(cart: string | undefined, lines: BagLine[]) {
  if (!cart) return;
  try {
    localStorage.setItem(CHECKOUT_KEY, JSON.stringify({ cart, lines, at: Date.now() }));
  } catch {}
}

let settling: Promise<void> | null = null;
let checked = false;

// Overlapping returns share one check, so a piece is never subtracted twice.
export function settleCheckout(placed: (cart: string) => Promise<boolean>) {
  settling ??= settle(placed).finally(() => (settling = null));
  return settling;
}

// An expired cart also reads as gone, so a checkout older than a week is forgotten instead of cleared.
async function settle(placed: (cart: string) => Promise<boolean>) {
  const read = () => {
    try {
      return localStorage.getItem(CHECKOUT_KEY);
    } catch {
      return null;
    }
  };
  const forget = () => {
    try {
      localStorage.removeItem(CHECKOUT_KEY);
    } catch {}
  };
  const raw = read();
  let saved: { cart?: unknown; lines?: unknown; at?: unknown } | null = null;
  try {
    saved = JSON.parse(raw ?? "null");
  } catch {}
  if (!saved) return;
  const { cart, lines, at } = saved;
  if (typeof cart !== "string" || !Array.isArray(lines) || typeof at !== "number" || Date.now() - at > CHECKOUT_DAYS * 864e5) return forget();
  try {
    if (!(await placed(cart))) return;
  } catch {
    return;
  }
  if (read() !== raw) return;
  forget();
  const sent = lines.filter(isValid);
  writeBag(
    readBag()
      .map((l) => (l.skip ? l : { ...l, qty: l.qty - (sent.find(sameLine(l))?.qty ?? 0) }))
      .filter((l) => l.qty > 0),
  );
}

export function useCheckoutReturn() {
  useEffect(() => {
    if (!checked) void settleCheckout(orderPlaced);
    checked = true;
    const restored = (e: PageTransitionEvent) => e.persisted && void settleCheckout(orderPlaced);
    window.addEventListener("pageshow", restored);
    return () => window.removeEventListener("pageshow", restored);
  }, []);
}

export type Prices = Record<string, number>;

// Shopify sets the official price; products.ts covers a piece Shopify did not price.
export const priceOf = (slug: string, prices: Prices) => prices[slug] ?? getProduct(slug)?.priceCents ?? 0;

export const subtotalCents = (lines: BagLine[], prices: Prices = {}) => lines.reduce((sum, l) => sum + priceOf(l.slug, prices) * l.qty, 0);

export function useLivePrices(): Prices {
  const [prices, setPrices] = useState<Prices>({});
  useEffect(() => {
    fetch("/api/prices")
      .then((res) => (res.ok ? res.json() : {}))
      .then(setPrices)
      .catch(() => {});
  }, []);
  return prices;
}

export const offerNote = (count: number) => (!getOffer() || count === 0 ? null : count === 1 ? "Add one more piece for free shipping" : "You've unlocked free shipping");

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function useBag(): BagLine[] {
  return useSyncExternalStore(subscribe, readBag, () => empty);
}
