import { orderPlaced, startCheckout } from "./checkout";

const jar = new Map<string, { value: string; options?: Record<string, unknown> }>();
vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name)!.value } : undefined),
    set: (name: string, value: string, options?: Record<string, unknown>) => void jar.set(name, { value, options }),
    delete: (name: string) => void jar.delete(name),
  }),
}));

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
const CART_ID = "gid://shopify/Cart/c1-abc?key=k1";
const created = cart({ cart: { id: CART_ID, checkoutUrl: "https://shop.example/checkouts/abc" }, userErrors: [] });

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
    expect(await startCheckout([rose])).toEqual({ ok: true, url: "https://shop.example/checkouts/abc", cart: CART_ID });
  });

  it("hands this browser a private pass for the cart it started", async () => {
    jar.clear();
    on(shopify());
    await startCheckout([rose]);
    expect(jar.get("bc_cart")).toEqual({ value: CART_ID, options: expect.objectContaining({ httpOnly: true, secure: true, sameSite: "lax", path: "/" }) });
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

describe("orderPlaced", () => {
  beforeEach(() => {
    vi.stubEnv("SHOPIFY_STORE_DOMAIN", "example.myshopify.com");
    vi.stubEnv("SHOPIFY_STOREFRONT_PUBLIC_TOKEN", "test-token");
    vi.stubEnv("SHOPIFY_CHECKOUT_ENABLED", "true");
    jar.clear();
    jar.set("bc_cart", { value: CART_ID });
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });
  const answer = (data: object) => vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => data });

  it("reports an order once Shopify has removed the cart", async () => {
    vi.stubGlobal("fetch", answer({ data: { cart: null } }));
    expect(await orderPlaced(CART_ID)).toBe(true);
  });

  it("reports no order while the cart still exists", async () => {
    vi.stubGlobal("fetch", answer({ data: { cart: { id: CART_ID } } }));
    expect(await orderPlaced(CART_ID)).toBe(false);
  });

  it("reports no order when Shopify answers with errors", async () => {
    vi.stubGlobal("fetch", answer({ data: { cart: null }, errors: [{ message: "Throttled" }] }));
    expect(await orderPlaced(CART_ID)).toBe(false);
  });

  it("reports no order when Shopify is unreachable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    expect(await orderPlaced(CART_ID)).toBe(false);
  });

  it("lets go of the pass once the order is placed", async () => {
    vi.stubGlobal("fetch", answer({ data: { cart: null } }));
    await orderPlaced(CART_ID);
    expect(jar.has("bc_cart")).toBe(false);
  });

  it("keeps the pass while the order is not placed yet", async () => {
    vi.stubGlobal("fetch", answer({ data: { cart: { id: CART_ID } } }));
    await orderPlaced(CART_ID);
    expect(jar.get("bc_cart")?.value).toBe(CART_ID);
  });

  it("refuses a browser without the pass without asking Shopify", async () => {
    const fetch = answer({ data: { cart: null } });
    vi.stubGlobal("fetch", fetch);
    jar.clear();
    expect(await orderPlaced(CART_ID)).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("refuses a cart the browser did not start without asking Shopify", async () => {
    const fetch = answer({ data: { cart: null } });
    vi.stubGlobal("fetch", fetch);
    jar.set("bc_cart", { value: "gid://shopify/Cart/someone-else?key=k2" });
    expect(await orderPlaced(CART_ID)).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("stays off without asking Shopify while checkout is switched off", async () => {
    const fetch = answer({ data: { cart: null } });
    vi.stubGlobal("fetch", fetch);
    vi.stubEnv("SHOPIFY_CHECKOUT_ENABLED", "false");
    expect(await orderPlaced(CART_ID)).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("refuses an id that is not a Shopify cart without asking Shopify", async () => {
    const fetch = answer({ data: { cart: null } });
    vi.stubGlobal("fetch", fetch);
    expect(await orderPlaced("gid://shopify/Order/1")).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });
});
