import { existsSync } from "node:fs";
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

describe("product photos", () => {
  it("points every photo path at a file in public", () => {
    const paths = products.flatMap((p) => p.colorways.flatMap((c) => c.images));
    expect(paths.filter((p) => !existsSync(`public${p}`))).toEqual([]);
  });

  it("gives The Slip Dress in Rose its photo", () => {
    expect(getProduct("the-slip-dress")?.colorways.find((c) => c.name === "Rose")?.images).toEqual(["/images/products/the-slip-dress-rose.webp"]);
  });

  it("leaves The Boujie Set without photos", () => {
    expect(getProduct("the-boujie-set")?.colorways.flatMap((c) => c.images)).toEqual([]);
  });
});
