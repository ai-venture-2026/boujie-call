import { memoryStore, type CallStore } from "./calls";
import { startCall } from "./send-call";
import * as storeModule from "./call-store";
import * as mailModule from "./mail";
import * as shopifyModule from "./shopify";

const gift = {
  tier: "The Signature Call",
  slug: "the-romper",
  colorway: "Rose",
  senderName: "Mia",
  senderEmail: "mia@example.com",
  recipientName: "Ana",
  recipientEmail: "ana@example.com",
  note: "Happy birthday, love you",
};

let store: CallStore;
let saved: ReturnType<typeof vi.spyOn>;
let mail: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  store = memoryStore();
  saved = vi.spyOn(store, "save");
  vi.spyOn(storeModule, "getCallStore").mockReturnValue(store);
  mail = vi.spyOn(mailModule, "sendEmail");
  vi.spyOn(shopifyModule, "getCatalog").mockResolvedValue({ "the-romper": { priceCents: 4800, stock: { "Rose/M": 2 } } });
  vi.stubEnv("SEND_A_CALL_ENABLED", "true");
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("startCall", () => {
  it("saves the gift as waiting for payment", async () => {
    expect(await startCall(gift)).toEqual({ ok: true });
    expect(saved.mock.calls[0][0]).toMatchObject({ ...gift, status: "pending", tokenHash: "" });
  });

  it("sends no email before payment", async () => {
    await startCall(gift);
    expect(mail).not.toHaveBeenCalled();
  });

  it("never hands the claim token to the sender", async () => {
    const answer = JSON.stringify(await startCall(gift));
    expect(answer).not.toMatch(/[A-Za-z0-9_-]{43}/);
  });

  it("stays closed while the switch is off", async () => {
    vi.stubEnv("SEND_A_CALL_ENABLED", "");
    expect(await startCall(gift)).toEqual({ ok: false, message: "Send a Call opens soon." });
    expect(saved).not.toHaveBeenCalled();
  });

  it.each([
    ["tier", { tier: "The Gold Call" }, "Choose a Call."],
    ["piece", { slug: "the-robe" }, "Choose a piece."],
    ["colour", { colorway: "Lilac" }, "Choose a colour."],
  ])("refuses an unknown %s", async (_, change, message) => {
    expect(await startCall({ ...gift, ...change })).toEqual({ ok: false, message });
  });

  it("refuses a piece Shopify does not sell yet", async () => {
    expect(await startCall({ ...gift, slug: "the-boujie-set", colorway: "Rose" })).toEqual({ ok: false, message: "The Boujie Set isn't available to send yet." });
  });

  it.each([
    ["a name with a line break", { senderName: "Mia\nBcc: x@y.z" }, "Enter your name."],
    ["a malformed email", { recipientEmail: "ana@" }, "Enter their email address."],
    ["an empty note", { note: "  " }, "Write them a note."],
    ["a note over 300 characters", { note: "x".repeat(301) }, "Keep the note under 300 characters."],
  ])("refuses %s", async (_, change, message) => {
    expect(await startCall({ ...gift, ...change })).toEqual({ ok: false, message });
  });

  it("refuses a hostile form", async () => {
    expect((await startCall(null as never)).ok).toBe(false);
  });
});
