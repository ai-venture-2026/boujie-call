import { useSyncExternalStore } from "react";

export type Tone = "ink" | "cream";

let tone: Tone = "ink";
const listeners = new Set<() => void>();

export function setHeroTone(next: Tone) {
  tone = next;
  listeners.forEach((l) => l());
}

export function useHeroTone(): Tone {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => tone,
    () => "ink",
  );
}

export function useScrolled(): boolean {
  return useSyncExternalStore(
    (l) => {
      window.addEventListener("scroll", l, { passive: true });
      return () => window.removeEventListener("scroll", l);
    },
    () => window.scrollY > 8,
    () => false,
  );
}
