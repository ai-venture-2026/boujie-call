import { getProduct, products } from "./products";

const colorways = (slug: string) => getProduct(slug)?.colorways.map((c) => c.name);

describe("products", () => {
  it("gives every piece a unique slug", () => {
    const slugs = products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("lists the colorways of The Slip Dress", () => {
    expect(colorways("the-slip-dress")).toEqual(["Rose", "After Dark", "Bloom"]);
  });

  it("lists the colorways of The Boujie Set", () => {
    expect(colorways("the-boujie-set")).toEqual(["After Dark", "Powder Blue", "Rose"]);
  });

  it("lists the colorways of The Romper", () => {
    expect(colorways("the-romper")).toEqual(["Powder Blue", "Mocha", "After Dark", "Rose"]);
  });

  it("offers every piece in S to XL", () => {
    expect(products.every((p) => p.sizes.join() === "S,M,L,XL")).toBe(true);
  });

  it("prices every piece at a confirmed $48", () => {
    expect(products.every((p) => p.priceCents === 4800 && !p.placeholderPrice)).toBe(true);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProduct("nope")).toBeUndefined();
  });
});
