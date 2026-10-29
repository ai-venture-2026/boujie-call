import { formatPrice } from "./content";

describe("formatPrice", () => {
  it("formats cents as US dollars", () => {
    expect(formatPrice(4000)).toBe("$40.00");
  });

  it("shows a placeholder while the price is unset", () => {
    expect(formatPrice(null)).toBe("Price to come");
  });

  it("rejects a negative amount", () => {
    expect(() => formatPrice(-1)).toThrow(RangeError);
  });
});

describe("siteUrl", () => {
  it("falls back to boujiecall.com with no deployment variables", async () => {
    const { siteUrl } = await import("./content");
    expect(siteUrl({})).toBe("https://boujiecall.com");
  });

  it("uses the Vercel production address when the domain is not pointed yet", async () => {
    const { siteUrl } = await import("./content");
    expect(siteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "boujie-call.vercel.app" })).toBe("https://boujie-call.vercel.app");
  });

  it("lets an explicit site address win over Vercel's", async () => {
    const { siteUrl } = await import("./content");
    expect(siteUrl({ NEXT_PUBLIC_SITE_URL: "https://boujiecall.com", VERCEL_PROJECT_PRODUCTION_URL: "boujie-call.vercel.app" })).toBe("https://boujiecall.com");
  });
});
