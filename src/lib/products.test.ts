import { getProduct, products } from "./products";

describe("products", () => {
  it("gives every piece a unique slug", () => {
    const slugs = products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("offers the Romper in four colorways", () => {
    expect(getProduct("the-romper")?.colorways).toHaveLength(4);
  });

  it("offers every piece in XS to XL", () => {
    expect(products.every((p) => p.sizes.join() === "XS,S,M,L,XL")).toBe(true);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProduct("nope")).toBeUndefined();
  });
});
