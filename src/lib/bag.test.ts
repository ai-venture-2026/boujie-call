import { addToBag, BAG_KEY, bagCount, readBag } from "./bag";

const dress = { slug: "the-slip-dress", colorway: "After dark", size: "M" };

beforeEach(() => localStorage.clear());

describe("bag", () => {
  it("merges a repeat pick into one line", () => {
    addToBag(dress);
    addToBag(dress);
    expect(readBag()).toEqual([{ ...dress, qty: 2 }]);
  });

  it("keeps a different size as its own line", () => {
    addToBag(dress);
    addToBag({ ...dress, size: "S" });
    expect(readBag()).toHaveLength(2);
  });

  it("caps a line at 10", () => {
    for (let i = 0; i < 12; i++) addToBag(dress);
    expect(readBag()[0].qty).toBe(10);
  });

  it("reads a saved bag back after a reload", () => {
    localStorage.setItem(BAG_KEY, JSON.stringify([{ ...dress, qty: 1 }]));
    expect(readBag()).toEqual([{ ...dress, qty: 1 }]);
  });

  it("drops saved lines that name an unknown piece", () => {
    localStorage.setItem(BAG_KEY, JSON.stringify([{ ...dress, slug: "nope", qty: 1 }]));
    expect(readBag()).toEqual([]);
  });

  it("drops saved lines with an out of range quantity", () => {
    localStorage.setItem(BAG_KEY, JSON.stringify([{ ...dress, qty: 99 }]));
    expect(readBag()).toEqual([]);
  });

  it("drops saved lines with a colorway the piece does not offer", () => {
    localStorage.setItem(BAG_KEY, JSON.stringify([{ ...dress, colorway: "Black ribbon", qty: 1 }]));
    expect(readBag()).toEqual([]);
  });

  it("reads unreadable saved data as an empty bag", () => {
    localStorage.setItem(BAG_KEY, "{not json");
    expect(readBag()).toEqual([]);
  });

  it("counts pieces across lines", () => {
    expect(bagCount([{ ...dress, qty: 2 }, { ...dress, size: "S", qty: 1 }])).toBe(3);
  });
});
