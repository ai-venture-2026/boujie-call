import { createHash } from "node:crypto";
import { callEmail, claimUrl, deliverCall, memoryStore, newClaim, type Call } from "./calls";
import { SITE_URL } from "./content";

const call: Call = {
  id: "c1",
  tier: "The Signature Call",
  slug: "the-romper",
  colorway: "Rose",
  senderName: "Mia",
  senderEmail: "mia@example.com",
  recipientName: "Ana",
  recipientEmail: "ana@example.com",
  note: "Happy birthday, love you",
  tokenHash: "h",
  status: "sent",
  createdAt: "2026-11-13T00:00:00.000Z",
  expiresAt: "2026-12-13T00:00:00.000Z",
};

describe("claim links", () => {
  it("makes a 43 character url safe token", () => {
    expect(newClaim().token).toMatch(/^[A-Za-z0-9_-]{43}$/);
  });

  it("keeps only the token's SHA-256 hash", () => {
    const { token, tokenHash } = newClaim();
    expect(tokenHash).toBe(createHash("sha256").update(token).digest("hex"));
  });

  it("never repeats a token", () => {
    expect(new Set(Array.from({ length: 50 }, () => newClaim().token)).size).toBe(50);
  });

  it("points at the claim page", () => {
    expect(claimUrl("abc")).toBe(`${SITE_URL}/call/abc`);
  });
});

describe("gift email", () => {
  const url = `${SITE_URL}/call/abc`;

  it("names the sender in the subject", () => {
    expect(callEmail(call, url).subject).toBe("Mia sent you a Boujie Call");
  });

  it("puts the note above a claim button", () => {
    const { html, text } = callEmail(call, url);
    expect(html).toContain("Happy birthday, love you");
    expect(html).toContain(`href="${url}"`);
    expect(text).toContain(url);
  });

  it("shows HTML in a note as text", () => {
    const { html } = callEmail({ ...call, note: '<img src=x onerror="alert(1)">', senderName: "<b>Mia</b>" }, url);
    expect(html).not.toContain("<img");
    expect(html).not.toContain("<b>Mia</b>");
    expect(html).toContain("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
  });
});

describe("deliverCall", () => {
  const url = `${SITE_URL}/call/abc`;

  it("sends the gift email to the receiver", async () => {
    const email = vi.fn().mockResolvedValue({ ok: true });
    expect(await deliverCall(call, url, "email", { email })).toEqual({ ok: true });
    expect(email).toHaveBeenCalledWith(expect.objectContaining({ to: "ana@example.com", subject: "Mia sent you a Boujie Call" }));
  });

  it("refuses a channel that is not set up", async () => {
    const email = vi.fn();
    expect(await deliverCall(call, url, "sms", { email })).toEqual({ ok: false, reason: "no channel" });
    expect(email).not.toHaveBeenCalled();
  });
});

describe("memoryStore", () => {
  it("finds a saved Call by its token hash", async () => {
    const store = memoryStore();
    await store.save({ ...call, tokenHash: "abc123" });
    expect(await store.byTokenHash("abc123")).toMatchObject({ id: "c1" });
  });

  it("claims a Call only once", async () => {
    const store = memoryStore();
    await store.save(call);
    const claim = { size: "M", address: { name: "Ana", line1: "1 A St", line2: "", city: "Atlanta", state: "GA", zip: "30303" }, claimedAt: "2026-11-13T00:00:00.000Z", notified: false };
    expect([await store.claim("h", claim), await store.claim("h", claim)]).toEqual([true, false]);
  });

  it("finds nothing for an unknown hash", async () => {
    expect(await memoryStore().byTokenHash("nope")).toBeNull();
  });
});
