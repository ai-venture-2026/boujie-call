import { useSyncExternalStore } from "react";
import { getProduct } from "./products";

export type BagLine = { slug: string; colorway: string; size: string; qty: number };

export const BAG_KEY = "bc-bag";
export const MAX_QTY = 10;

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
