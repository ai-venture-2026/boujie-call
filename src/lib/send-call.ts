"use server";

import { getCallStore } from "./call-store";
import { tiers } from "./content";
import { getProduct } from "./products";
import { getCatalog } from "./shopify";
import { clean, hasControl } from "./text-input";

export type StartResult = { ok: true } | { ok: false; message: string };

const fail = (message: string): StartResult => ({ ok: false, message });
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Off until SEND_A_CALL_ENABLED is "true". Saves the gift as pending with no link: the claim token is
// minted when payment confirms, because only its hash is ever stored and could not be emailed later.
export async function startCall(input: Record<string, unknown>): Promise<StartResult> {
  if (process.env.SEND_A_CALL_ENABLED !== "true") return fail("Send a Call opens soon.");
  const store = getCallStore();
  if (!store) return fail("Send a Call opens soon.");
  const raw = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;

  const tier = tiers.find((t) => t.name === raw.tier);
  if (!tier) return fail("Choose a Call.");
  const product = typeof raw.slug === "string" ? getProduct(raw.slug) : undefined;
  if (!product) return fail("Choose a piece.");
  const colorway = product.colorways.find((c) => c.name === raw.colorway && !c.comingSoon);
  if (!colorway) return fail("Choose a colour.");

  const one = (value: unknown, max: number) => (hasControl(value) ? null : clean(value, max));
  const senderName = one(raw.senderName, 40);
  if (!senderName) return fail("Enter your name.");
  const senderEmail = one(raw.senderEmail, 254);
  if (!senderEmail || !EMAIL.test(senderEmail)) return fail("Enter your email address.");
  const recipientName = one(raw.recipientName, 40);
  if (!recipientName) return fail("Enter their first name.");
  const recipientEmail = one(raw.recipientEmail, 254);
  if (!recipientEmail || !EMAIL.test(recipientEmail)) return fail("Enter their email address.");
  const note = clean(raw.note, 300);
  if (note === null) return fail(typeof raw.note === "string" ? "Keep the note under 300 characters." : "Write them a note.");
  if (!note) return fail("Write them a note.");

  if (!(await getCatalog())?.[product.slug]) return fail(`${product.name} isn't available to send yet.`);

  await store.save({
    id: crypto.randomUUID(),
    tier: tier.name,
    slug: product.slug,
    colorway: colorway.name,
    senderName,
    senderEmail,
    recipientName,
    recipientEmail,
    note,
    tokenHash: "",
    status: "pending",
    createdAt: new Date().toISOString(),
    expiresAt: "",
  });
  return { ok: true };
}
