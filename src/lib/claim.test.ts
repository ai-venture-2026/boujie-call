import { memoryStore, newClaim, type Call, type CallStore } from "./calls";
import { claimCall } from "./claim";
import * as storeModule from "./call-store";
import * as mailModule from "./mail";
import * as shopifyModule from "./shopify";

const { token, tokenHash } = newClaim();
const call: Call = {
  id: "c1",
  tier: "The Signature Call",
  slug: "the-romper",
  colorway: "Rose",
  senderName: "Mia",
  senderEmail: "mia@example.com",
  recipientName: "Ana",
  recipientEmail: "ana@example.com",
  note: "Love you",
  tokenHash,
  status: "sent",
  createdAt: "2026-11-13T00:00:00.000Z",
  expiresAt: "2099-01-01T00:00:00.000Z",
};
const address = { name: "Ana Cruz", line1: "12 Main St", line2: "", city: "Atlanta", state: "GA", zip: "30303" };
const input = { size: "M", address };

let store: CallStore;
let mail: ReturnType<typeof vi.fn<typeof mailModule.sendEmail>>;

beforeEach(async () => {
  store = memoryStore();
  await store.save(call);
  vi.spyOn(storeModule, "getCallStore").mockReturnValue(store);
  mail = vi.fn<typeof mailModule.sendEmail>().mockResolvedValue({ ok: true });
  vi.spyOn(mailModule, "sendEmail").mockImplementation(mail);
  vi.spyOn(shopifyModule, "getCatalog").mockResolvedValue({ "the-romper": { priceCents: 4800, stock: { "Rose/M": 2, "Rose/S": 0 } } });
  vi.stubEnv("OWNER_EMAIL", "owner@boujiecall.com");
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("claimCall", () => {
  it("saves her claim", async () => {
    expect(await claimCall(token, input)).toEqual({ ok: true });
    expect(await store.byTokenHash(tokenHash)).toMatchObject({ status: "claimed", claim: { size: "M", address } });
  });

  it("emails the owner what to ship", async () => {
    await claimCall(token, input);
    expect(mail).toHaveBeenCalledTimes(1);
    const sent = mail.mock.calls[0][0];
    expect(sent.to).toBe("owner@boujiecall.com");
    expect(sent.text).toMatch(/Ana[\s\S]*The Romper[\s\S]*Rose[\s\S]*M[\s\S]*12 Main St[\s\S]*Atlanta, GA 30303/);
  });

  it("refuses a second claim of the same link", async () => {
    await claimCall(token, input);
    expect(await claimCall(token, { ...input, size: "L" })).toEqual({ ok: false, message: "This gift has already been claimed." });
    expect(await store.byTokenHash(tokenHash)).toMatchObject({ claim: { size: "M" } });
  });

  it("gives one message for a link that matches no gift", async () => {
    expect(await claimCall(newClaim().token, input)).toEqual({ ok: false, message: "This link doesn't match a gift." });
  });

  it("refuses a malformed link without looking it up", async () => {
    const lookup = vi.spyOn(store, "byTokenHash");
    expect(await claimCall("../../etc", input)).toEqual({ ok: false, message: "This link doesn't match a gift." });
    expect(lookup).not.toHaveBeenCalled();
  });

  it("refuses an expired gift", async () => {
    await store.save({ ...call, expiresAt: "2020-01-01T00:00:00.000Z" });
    expect(await claimCall(token, input)).toEqual({ ok: false, message: "This gift link has expired." });
  });

  it("refuses a size the piece does not come in", async () => {
    expect(await claimCall(token, { ...input, size: "XXL" })).toEqual({ ok: false, message: "Choose your size." });
  });

  it("refuses a sold out size", async () => {
    expect(await claimCall(token, { ...input, size: "S" })).toEqual({ ok: false, message: "S is sold out in Rose. Choose another size." });
  });

  it.each([
    ["street", { line1: " " }, "Enter your street address."],
    ["state", { state: "ON" }, "Choose your state."],
    ["ZIP", { zip: "3030" }, "Enter a 5 digit ZIP code."],
  ])("names a missing or wrong %s", async (_, change, message) => {
    expect(await claimCall(token, { ...input, address: { ...address, ...change } })).toEqual({ ok: false, message });
  });

  it("keeps line breaks out of the saved address", async () => {
    await claimCall(token, { ...input, address: { ...address, line1: "12 Main St\nBcc: x@y.z" } });
    expect((await store.byTokenHash(tokenHash))?.claim?.address.line1).toBe("12 Main St Bcc: x@y.z");
  });

  it("says claiming opens soon without a connected store", async () => {
    vi.spyOn(storeModule, "getCallStore").mockReturnValue(null);
    expect(await claimCall(token, input)).toEqual({ ok: false, message: "Claiming opens soon." });
  });

  it("keeps the claim when the owner email fails", async () => {
    mail.mockResolvedValue({ ok: false, reason: "failed" });
    expect(await claimCall(token, input)).toEqual({ ok: true });
  });

  it("lets only one of two claims at the same moment win", async () => {
    const results = await Promise.all([claimCall(token, input), claimCall(token, { ...input, size: "L" })]);
    expect(results.filter((r) => r.ok)).toHaveLength(1);
    expect(mail).toHaveBeenCalledTimes(1);
  });

  it("marks the claim as told to the owner", async () => {
    await claimCall(token, input);
    expect((await store.byTokenHash(tokenHash))?.claim?.notified).toBe(true);
  });

  it("leaves a claim marked untold when the owner email fails", async () => {
    mail.mockResolvedValue({ ok: false, reason: "failed" });
    await claimCall(token, input);
    expect((await store.byTokenHash(tokenHash))?.claim?.notified).toBe(false);
  });

  it("keeps claiming closed without an owner email address", async () => {
    vi.stubEnv("OWNER_EMAIL", "");
    expect(await claimCall(token, input)).toEqual({ ok: false, message: "Claiming opens soon." });
  });

  it("refuses when Shopify cannot confirm the size", async () => {
    vi.spyOn(shopifyModule, "getCatalog").mockResolvedValue(null);
    expect(await claimCall(token, input)).toEqual({ ok: false, message: "We couldn't check your size. Please try again." });
  });

  it("refuses an address line over its limit", async () => {
    expect(await claimCall(token, { ...input, address: { ...address, line1: "1".repeat(101) } })).toEqual({ ok: false, message: "Enter your street address." });
  });

  it("treats an unreadable expiry date as expired", async () => {
    await store.save({ ...call, expiresAt: "not a date" });
    expect(await claimCall(token, input)).toEqual({ ok: false, message: "This gift link has expired." });
  });

  it.each([null, "x", [], { size: {}, address: [] }])("refuses a hostile form %j", async (bad) => {
    expect((await claimCall(token, bad as never)).ok).toBe(false);
  });

  it("shows HTML in a name as text in the owner email", async () => {
    await claimCall(token, { ...input, address: { ...address, name: "<b>Ana</b>\u202e" } });
    const sent = mail.mock.calls[0][0];
    expect(sent.html).not.toContain("<b>");
    expect(sent.text).not.toContain("\u202e");
  });
});
