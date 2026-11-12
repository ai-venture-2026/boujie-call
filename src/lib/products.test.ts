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

  const setViews = (name: string) => getProduct("the-boujie-set")?.colorways.find((c) => c.name === name)?.gallery?.map((g) => g.view);

  it.each([
    ["After Dark", ["front", "back", "on its own"]],
    ["Powder Blue", ["front", "side", "on its own"]],
    ["Rose", ["front", "back", "on its own"]],
  ])("orders The Boujie Set in %s by its photos", (name, views) => {
    expect(setViews(name)).toEqual(views);
  });

  it("keeps brown off The Boujie Set", () => {
    expect(getProduct("the-boujie-set")?.colorways.map((c) => c.name)).not.toContain("Brown");
  });

  it("orders the Rose slip dress gallery front, back, cutout", () => {
    const rose = getProduct("the-slip-dress")?.colorways.find((c) => c.name === "Rose");
    expect(rose?.gallery).toEqual([
      { src: "/images/products/studio/the-slip-dress-rose-front.webp", view: "front" },
      { src: "/images/products/studio/the-slip-dress-rose-back.webp", view: "back" },
      { src: "/images/products/the-slip-dress-rose.webp", view: "on its own" },
    ]);
  });

  it("points every gallery path at a file in public", () => {
    const paths = products.flatMap((p) => p.colorways.flatMap((c) => (c.gallery ?? []).map((g) => g.src)));
    expect(paths.length).toBe(31);
    expect(paths.filter((p) => !existsSync(`public${p}`))).toEqual([]);
  });
});
