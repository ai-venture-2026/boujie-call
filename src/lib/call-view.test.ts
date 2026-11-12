import { memoryStore, newClaim, type Call, type CallStore } from "./calls";
import { callView } from "./call-view";
import * as storeModule from "./call-store";
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

let store: CallStore;
beforeEach(async () => {
  store = memoryStore();
  await store.save(call);
  vi.spyOn(storeModule, "getCallStore").mockReturnValue(store);
  vi.spyOn(shopifyModule, "getCatalog").mockResolvedValue({ "the-romper": { priceCents: 4800, stock: { "Rose/S": 0, "Rose/M": 2 } } });
  vi.stubEnv("OWNER_EMAIL", "owner@boujiecall.com");
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("callView", () => {
  it("opens a sent gift", async () => {
    expect(await callView(token)).toMatchObject({ state: "open", senderName: "Mia", piece: "The Romper", colorway: "Rose", photo: "/images/products/studio/the-romper-rose-front.webp" });
  });

  it("lists sizes Shopify reports sold out", async () => {
    expect(await callView(token)).toMatchObject({ soldOut: ["S"] });
  });

  it("keeps the receiver's email and the tier out of the view", async () => {
    const view = JSON.stringify(await callView(token));
    expect(view).not.toContain("ana@example.com");
    expect(view).not.toContain("Signature");
  });

  it("marks a claimed gift", async () => {
    await store.save({ ...call, status: "claimed" });
    expect(await callView(token)).toEqual({ state: "claimed" });
  });

  it("marks an expired gift", async () => {
    await store.save({ ...call, expiresAt: "2020-01-01T00:00:00.000Z" });
    expect(await callView(token)).toEqual({ state: "expired" });
  });

  it("treats a malformed link as missing", async () => {
    expect(await callView("nope")).toEqual({ state: "missing" });
  });

  it("treats an unknown link as missing", async () => {
    expect(await callView(newClaim().token)).toEqual({ state: "missing" });
  });

  it("stays closed without a connected store", async () => {
    vi.spyOn(storeModule, "getCallStore").mockReturnValue(null);
    expect(await callView(token)).toEqual({ state: "closed" });
  });
});
