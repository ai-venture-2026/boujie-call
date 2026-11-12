"use server";

import { getCallStore } from "./call-store";
import { hashToken, isExpired, TOKEN_SHAPE, type Address, type Call } from "./calls";
import { sendEmail } from "./mail";
import { getProduct, stockKey } from "./products";
import { getCatalog } from "./shopify";
import { clean } from "./text-input";
import { US_STATES } from "./us-states";

export type ClaimResult = { ok: true } | { ok: false; message: string };

const NO_GIFT = "This link doesn't match a gift.";
const fail = (message: string): ClaimResult => ({ ok: false, message });

function readAddress(raw: unknown): Address | string {
  const a = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>;
  const address = { name: clean(a.name, 80), line1: clean(a.line1, 100), line2: clean(a.line2 ?? "", 100), city: clean(a.city, 60), state: clean(a.state, 2)?.toUpperCase(), zip: clean(a.zip, 10) };
  if (!address.name) return "Enter the name to ship to.";
  if (!address.line1) return "Enter your street address.";
  if (!address.city) return "Enter your city.";
  if (address.line2 === null) return "Shorten the second address line.";
  if (!address.state || !US_STATES.includes(address.state)) return "Choose your state.";
  if (!address.zip || !/^\d{5}(-\d{4})?$/.test(address.zip)) return "Enter a 5 digit ZIP code.";
  return address as Address;
}

const ownerEmail = (call: Call, size: string, a: Address) => {
  const piece = getProduct(call.slug)?.name ?? call.slug;
  const lines = [`${call.recipientName} claimed her Call from ${call.senderName}.`, "", `${piece}, ${call.colorway}, size ${size}`, `Tier: ${call.tier}`, "", "Ship to:", a.name, a.line1, ...(a.line2 ? [a.line2] : []), `${a.city}, ${a.state} ${a.zip}`];
  const text = lines.join("\n");
  const html = `<pre style="font-family:Arial,sans-serif;font-size:15px">${text.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] as string)}</pre>`;
  return { subject: `Ship a Call: ${piece} in ${call.colorway}, ${size}`, text, html };
};

export async function claimCall(token: string, input: { size?: unknown; address?: unknown }): Promise<ClaimResult> {
  const store = getCallStore();
  const owner = process.env.OWNER_EMAIL;
  if (!store || !owner) return fail("Claiming opens soon.");
  if (typeof token !== "string" || !TOKEN_SHAPE.test(token)) return fail(NO_GIFT);
  const hash = hashToken(token);
  const call = await store.byTokenHash(hash);
  if (!call || call.status === "pending") return fail(NO_GIFT);
  if (call.status === "claimed") return fail("This gift has already been claimed.");
  if (isExpired(call)) return fail("This gift link has expired.");

  const product = getProduct(call.slug);
  const size = clean(input?.size, 4);
  if (!size || !product?.sizes.includes(size)) return fail("Choose your size.");
  const address = readAddress(input?.address);
  if (typeof address === "string") return fail(address);
  const catalog = await getCatalog();
  const stock = catalog?.[call.slug]?.stock;
  const key = stockKey(call.colorway, size);
  if (!stock || !(key in stock)) return fail("We couldn't check your size. Please try again.");
  if (stock[key] === 0) return fail(`${size} is sold out in ${call.colorway}. Choose another size.`);

  if (!(await store.claim(hash, { size, address, claimedAt: new Date().toISOString(), notified: false }))) return fail("This gift has already been claimed.");
  const sent = await sendEmail({ to: owner, ...ownerEmail(call, size, address) });
  if (sent.ok) await store.markNotified(hash);
  else console.error("Claim saved but the owner email was not sent; it stays marked notified false", call.id);
  return { ok: true };
}
