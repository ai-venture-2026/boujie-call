import { startCheckout } from "./checkout";

const node = (color: string, size: string, availableForSale = true) => ({
  id: `gid://shopify/ProductVariant/${color}-${size}`,
  availableForSale,
  quantityAvailable: availableForSale ? 3 : 0,
  price: { amount: "48.0" },
  selectedOptions: [
    { name: "Color", value: color },
    { name: "Size", value: size },
  ],
});

const catalog = { ok: true, status: 200, json: async () => ({ data: { products: { nodes: [{ handle: "the-romper", variants: { nodes: [node("Rose", "S"), node("Rose", "M", false)] } }] } } }) };
const cart = (body: object) => ({ ok: true, status: 200, json: async () => ({ data: { cartCreate: body } }) });
const created = cart({ cart: { checkoutUrl: "https://shop.example/checkouts/abc" }, userErrors: [] });

const shopify = (cartAnswer: unknown = created) => vi.fn(async (_url: string, init: { body: string }) => (init.body.includes("cartCreate") ? cartAnswer : catalog));
const cartCalls = (fetch: ReturnType<typeof shopify>) => fetch.mock.calls.filter(([, init]) => init.body.includes("cartCreate"));

const rose = { slug: "the-romper", colorway: "Rose", size: "S", qty: 2 };

describe("startCheckout", () => {
  beforeEach(() => {
    vi.stubEnv("SHOPIFY_STORE_DOMAIN", "example.myshopify.com");
    vi.stubEnv("SHOPIFY_STOREFRONT_PUBLIC_TOKEN", "test-token");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });
  const on = (fetch: unknown) => {
    vi.stubEnv("SHOPIFY_CHECKOUT_ENABLED", "true");
    vi.stubGlobal("fetch", fetch);
  };

  it("says checkout opens soon while the switch is off", async () => {
    const fetch = shopify();
    vi.stubGlobal("fetch", fetch);
    expect(await startCheckout([rose])).toEqual({ ok: false, message: "Checkout opens soon. Your bag is saved for launch." });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns the Shopify checkout address", async () => {
    on(shopify());
    expect(await startCheckout([rose])).toEqual({ ok: true, url: "https://shop.example/checkouts/abc" });
  });

  it("sends each variant id with its quantity", async () => {
    const fetch = shopify();
    on(fetch);
    await startCheckout([rose]);
    expect(JSON.parse(cartCalls(fetch)[0][1].body).variables.lines).toEqual([{ merchandiseId: "gid://shopify/ProductVariant/Rose-S", quantity: 2 }]);
  });

  it.each([
    ["an unknown piece", { ...rose, slug: "the-robe" }],
    ["an unknown colorway", { ...rose, colorway: "Lilac" }],
    ["an unknown size", { ...rose, size: "XXL" }],
    ["a quantity of 0", { ...rose, qty: 0 }],
    ["a fractional quantity", { ...rose, qty: 1.5 }],
    ["a quantity above the maximum", { ...rose, qty: 11 }],
  ])("refuses %s without asking Shopify", async (_, line) => {
    const fetch = shopify();
    on(fetch);
    expect((await startCheckout([line])).ok).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("names a sold out size", async () => {
    on(shopify());
    expect(await startCheckout([{ ...rose, size: "M" }])).toEqual({ ok: false, message: "The Romper in Rose, M is sold out" });
  });

  it("skips the Shopify basket for a sold out size", async () => {
    const fetch = shopify();
    on(fetch);
    await startCheckout([{ ...rose, size: "M" }]);
    expect(cartCalls(fetch)).toEqual([]);
  });

  it("asks to try again when Shopify reports a problem", async () => {
    on(shopify(cart({ cart: null, userErrors: [{ message: "Merchandise does not exist" }] })));
    expect(await startCheckout([rose])).toEqual({ ok: false, message: "We couldn't open checkout. Please try again." });
  });

  it("asks to try again when Shopify is unreachable", async () => {
    on(vi.fn().mockRejectedValue(new Error("offline")));
    expect(await startCheckout([rose])).toEqual({ ok: false, message: "We couldn't open checkout. Please try again." });
  });
});
