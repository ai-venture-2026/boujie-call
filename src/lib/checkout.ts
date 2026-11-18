import type { BagLine } from "./bag";

export type CheckoutResult = { ok: true; url: string } | { ok: false; message: string };

// Shopify is not connected yet. The Shopify handoff replaces this function and nothing else.
export async function startCheckout(lines: BagLine[]): Promise<CheckoutResult> {
  void lines;
  return { ok: false, message: "Checkout opens soon. Your bag is saved for launch." };
}
