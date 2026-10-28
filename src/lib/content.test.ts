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
