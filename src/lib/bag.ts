import { useEffect, useState, useSyncExternalStore } from "react";
import { getProduct, MAX_QTY } from "./products";

export type BagLine = { slug: string; colorway: string; size: string; qty: number };

export const BAG_KEY = "bc-bag";
export { MAX_QTY } from "./products";
export const BAG_OPENED = "bc-bag-opened";

const listeners = new Set<() => void>();
const empty: BagLine[] = [];
let cache: { raw: string | null; lines: BagLine[] } = { raw: null, lines: empty };

function isValid(line: unknown): line is BagLine {
  if (typeof line !== "object" || line === null) return false;
  const { slug, colorway, size, qty } = line as Record<string, unknown>;
  const product = typeof slug === "string" ? getProduct(slug) : undefined;
  return (
    !!product &&
    product.colorways.some((c) => c.name === colorway) &&
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
    if (Array.isArray(parsed)) lines = parsed.filter(isValid).map(({ slug, colorway, size, qty }) => ({ slug, colorway, size, qty }));
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
    existing ? lines.map((l) => (same(l) ? { ...l, qty: Math.min(l.qty + 1, MAX_QTY) } : l)) : [...lines, { ...pick, qty: 1 }],
  );
}

export const bagCount = (lines: BagLine[]) => lines.reduce((n, l) => n + l.qty, 0);

const sameLine = (a: Omit<BagLine, "qty">) => (b: BagLine) => a.slug === b.slug && a.colorway === b.colorway && a.size === b.size;

export function setQty(pick: Omit<BagLine, "qty">, qty: number) {
  const next = Math.min(Math.max(Math.round(qty), 1), MAX_QTY);
  writeBag(readBag().map((l) => (sameLine(pick)(l) ? { ...l, qty: next } : l)));
}

export function removeFromBag(pick: Omit<BagLine, "qty">) {
  writeBag(readBag().filter((l) => !sameLine(pick)(l)));
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

export const offerNote = (count: number) => (count === 0 ? null : count === 1 ? "Add one more piece for free shipping" : "You've unlocked free shipping");

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
