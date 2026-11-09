import { getCatalog, withLive } from "./shopify";
import { products } from "./products";

const variant = (color: string, size: string, availableForSale: boolean, quantityAvailable: number | null, amount = "48.0") => ({
  availableForSale,
  quantityAvailable,
  price: { amount },
  selectedOptions: [
    { name: "Color", value: color },
    { name: "Size", value: size },
  ],
});

const answer = (nodes: unknown[]) => ({ ok: true, status: 200, json: async () => ({ data: { products: { nodes } } }) });

const romper = {
  handle: "the-romper",
  variants: { nodes: [variant("Rose", "S", true, 2), variant("Rose", "M", false, 0), variant("Rose", "L", true, null), variant("Rose", "XL", true, 0)] },
};

describe("getCatalog", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  const connect = (fetch: unknown) => {
    vi.stubEnv("SHOPIFY_STORE_DOMAIN", "example.myshopify.com");
    vi.stubEnv("SHOPIFY_STOREFRONT_PUBLIC_TOKEN", "test-token");
    vi.stubGlobal("fetch", fetch);
  };

  it("does not call Shopify without the env vars", async () => {
    vi.stubEnv("SHOPIFY_STORE_DOMAIN", "");
    vi.stubEnv("SHOPIFY_STOREFRONT_PUBLIC_TOKEN", "");
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    expect(await getCatalog()).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns null when the request fails", async () => {
    connect(vi.fn().mockRejectedValue(new Error("offline")));
    expect(await getCatalog()).toBeNull();
  });

  it("returns null on a non-200 answer", async () => {
    connect(vi.fn().mockResolvedValue({ ok: false, status: 401, json: async () => ({}) }));
    expect(await getCatalog()).toBeNull();
  });

  it("returns null when the answer has no data", async () => {
    connect(vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ errors: [{ message: "bad" }] }) }));
    expect(await getCatalog()).toBeNull();
  });

  it("returns null when Shopify lists no products", async () => {
    connect(vi.fn().mockResolvedValue(answer([])));
    expect(await getCatalog()).toBeNull();
  });

  it("returns null for a price that is not a finite number", async () => {
    connect(vi.fn().mockResolvedValue(answer([{ handle: "the-romper", variants: { nodes: [variant("Rose", "S", true, 1, "1e400")] } }])));
    expect((await getCatalog())?.["the-romper"].priceCents).toBeNull();
  });

  it("sends the token to the store's Storefront API", async () => {
    const fetch = vi.fn().mockResolvedValue(answer([]));
    connect(fetch);
    await getCatalog();
    const [url, init] = fetch.mock.calls[0];
    expect(url).toMatch(/^https:\/\/example\.myshopify\.com\/api\/[\d-]+\/graphql\.json$/);
    expect(init.headers["X-Shopify-Storefront-Access-Token"]).toBe("test-token");
  });

  it("maps each variant to its stock count", async () => {
    connect(vi.fn().mockResolvedValue(answer([romper])));
    const catalog = await getCatalog();
    expect(catalog?.["the-romper"].stock).toEqual({ "Rose/S": 2, "Rose/M": 0, "Rose/L": null, "Rose/XL": null });
  });

  it("reads the price in cents", async () => {
    connect(vi.fn().mockResolvedValue(answer([romper])));
    expect((await getCatalog())?.["the-romper"].priceCents).toBe(4800);
  });
});

describe("withLive", () => {
  const find = (list: typeof products, slug: string) => list.find((p) => p.slug === slug)!;

  it("leaves the products unchanged without a catalog", () => {
    expect(withLive(products, null)).toEqual(products);
  });

  it("marks a product Shopify does not sell as coming soon", () => {
    const live = withLive(products, { "the-romper": { priceCents: 4800, stock: {} } });
    expect(find(live, "the-boujie-set").comingSoon).toBe(true);
    expect(find(live, "the-romper").comingSoon).toBeFalsy();
  });

  it("takes the price from Shopify", () => {
    const live = withLive(products, { "the-romper": { priceCents: 5200, stock: {} } });
    expect(find(live, "the-romper").priceCents).toBe(5200);
  });

  it("keeps the local price when Shopify's does not parse", () => {
    const live = withLive(products, { "the-romper": { priceCents: null, stock: {} } });
    expect(find(live, "the-romper").priceCents).toBe(4800);
  });

  it("ignores variants that match no local colorway or size", () => {
    const live = withLive(products, { "the-romper": { priceCents: 4800, stock: { "Rose/S": 1, "Gold/S": 0, "Rose/XXL": 0 } } });
    expect(find(live, "the-romper").stock).toEqual({ "Rose/S": 1 });
  });
});
