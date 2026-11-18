import { createHash, randomBytes } from "node:crypto";
import { SITE_URL } from "./content";
import type { Email, Sent } from "./mail";

export type Address = { name: string; line1: string; line2: string; city: string; state: string; zip: string };
// notified stays false until the owner email goes out, so a failed email can be found and resent.
export type Claim = { size: string; address: Address; claimedAt: string; notified: boolean };

// See docs/decisions/0001: delivery goes through named channels, storage through CallStore.
export type Call = {
  id: string;
  tier: string;
  slug: string;
  colorway: string;
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientEmail: string;
  note: string;
  tokenHash: string;
  // pending: saved by the sender, waiting for payment; no link has been sent yet.
  status: "pending" | "sent" | "claimed" | "expired";
  createdAt: string;
  expiresAt: string;
  claim?: Claim;
};

export type CallStore = {
  save(call: Call): Promise<void>;
  byTokenHash(hash: string): Promise<Call | null>;
  // Must succeed only while the Call is still "sent", so two claims cannot both win.
  claim(hash: string, claim: Claim): Promise<boolean>;
  markNotified(hash: string): Promise<void>;
};

export function memoryStore(): CallStore {
  const calls = new Map<string, Call>();
  const find = (hash: string) => (hash ? [...calls.values()].find((c) => c.tokenHash === hash) : undefined);
  return {
    save: async (call) => void calls.set(call.id, call),
    byTokenHash: async (hash) => find(hash) ?? null,
    claim: async (hash, claim) => {
      const call = find(hash);
      if (call?.status !== "sent") return false;
      calls.set(call.id, { ...call, status: "claimed", claim });
      return true;
    },
    markNotified: async (hash) => {
      const call = find(hash);
      if (call?.claim) calls.set(call.id, { ...call, claim: { ...call.claim, notified: true } });
    },
  };
}

export const TOKEN_SHAPE = /^[A-Za-z0-9_-]{43}$/;
// An unreadable date counts as expired, so a bad row never stays open forever.
export const isExpired = (call: Call) => call.status === "expired" || !(Date.parse(call.expiresAt) > Date.now());

export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

// The link carries the token; only its hash is stored, so a leaked row cannot open a gift.
export function newClaim() {
  const token = randomBytes(32).toString("base64url");
  return { token, tokenHash: hashToken(token) };
}

export const claimUrl = (token: string) => `${SITE_URL}/call/${token}`;

const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => entities[c]);

export function callEmail(call: Call, url: string): Omit<Email, "to"> {
  const [sender, recipient, note] = [call.senderName, call.recipientName, call.note].map(escape);
  return {
    subject: `${call.senderName} sent you a Boujie Call`,
    html: `<div style="font-family:Georgia,serif;color:#141014;max-width:520px;margin:0 auto;padding:32px 24px;background:#fdf6f9">
<p style="font-size:14px;letter-spacing:.12em;text-transform:uppercase;color:#b8336a">Boujie Call</p>
<h1 style="font-size:28px;font-weight:normal">${recipient}, you have a Call from ${sender}.</h1>
<p style="font-size:18px;line-height:1.6;font-style:italic">“${note}”</p>
<p><a href="${url}" style="display:inline-block;padding:14px 28px;border-radius:999px;background:#f2a7c3;color:#141014;text-decoration:none;font-family:Arial,sans-serif">Claim your gift</a></p>
<p style="font-size:14px;color:#6d5f66;font-family:Arial,sans-serif">Choose your size and tell us where to send it. The link is yours alone.</p>
</div>`,
    text: `${call.recipientName}, you have a Call from ${call.senderName}.\n\n"${call.note}"\n\nClaim your gift: ${url}\n\nChoose your size and tell us where to send it. The link is yours alone.`,
  };
}

export type Channel = (email: Email) => Promise<Sent>;

export async function deliverCall(call: Call, url: string, channel: string, channels: Record<string, Channel>): Promise<Sent> {
  const send = channels[channel];
  if (!send) return { ok: false, reason: "no channel" };
  return send({ to: call.recipientEmail, ...callEmail(call, url) });
}
