import { addToBag, BAG_KEY, bagCount, CHECKOUT_KEY, picked, readBag, rememberCheckout, setSkip, settleCheckout, subtotalCents } from "./bag";

const dress = { slug: "the-slip-dress", colorway: "After Dark", size: "M" };

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

describe("subtotalCents", () => {
  const line = { slug: "the-romper", colorway: "Rose", size: "S", qty: 2 };

  it("prices lines from the Shopify prices it is given", () => {
    expect(subtotalCents([line], { "the-romper": 5000 })).toBe(10000);
  });

  it("falls back to the local price for a piece Shopify did not price", () => {
    expect(subtotalCents([line], {})).toBe(9600);
  });
});

describe("picking pieces for checkout", () => {
  const rose = { slug: "the-romper", colorway: "Rose", size: "S" };
  const mocha = { slug: "the-romper", colorway: "Mocha", size: "M" };
  beforeEach(() => localStorage.clear());

  it("keeps an unticked piece in the bag", () => {
    addToBag(rose);
    setSkip(rose, true);
    expect(readBag()).toEqual([{ ...rose, qty: 1, skip: true }]);
  });

  it("leaves an unticked piece out of the picked pieces", () => {
    addToBag(rose);
    addToBag(mocha);
    setSkip(rose, true);
    expect(picked(readBag())).toEqual([{ ...mocha, qty: 1 }]);
  });

  it("reads a skip that is not exactly true as ticked", () => {
    localStorage.setItem(BAG_KEY, JSON.stringify([{ ...rose, qty: 1, skip: "yes" }]));
    expect(readBag()).toEqual([{ ...rose, qty: 1 }]);
  });

  it("ticks a piece again when it is added again", () => {
    addToBag(rose);
    setSkip(rose, true);
    addToBag(rose);
    expect(readBag()).toEqual([{ ...rose, qty: 2 }]);
  });
});

describe("return from checkout", () => {
  const cart = "gid://shopify/Cart/c1?key=k1";
  const rose = { slug: "the-romper", colorway: "Rose", size: "S" };
  const mocha = { slug: "the-romper", colorway: "Mocha", size: "S", qty: 1, skip: true as const };
  const pending = () => localStorage.getItem(CHECKOUT_KEY);
  beforeEach(() => {
    localStorage.setItem(BAG_KEY, JSON.stringify([{ ...rose, qty: 3 }, mocha]));
    rememberCheckout(cart, [{ ...rose, qty: 2 }]);
  });

  it("takes the sent pieces out of the bag after an order", async () => {
    await settleCheckout(async () => true);
    expect(readBag()).toEqual([{ ...rose, qty: 1 }, mocha]);
  });

  it("forgets the checkout once its order is settled", async () => {
    await settleCheckout(async () => true);
    expect(pending()).toBeNull();
  });

  it("keeps the bag while the Shopify cart is still open", async () => {
    await settleCheckout(async () => false);
    expect(readBag()).toEqual([{ ...rose, qty: 3 }, mocha]);
    expect(pending()).not.toBeNull();
  });

  it("asks Shopify about the saved cart", async () => {
    const placed = vi.fn(async () => false);
    await settleCheckout(placed);
    expect(placed).toHaveBeenCalledWith(cart);
  });

  it("drops a week old checkout without touching the bag", async () => {
    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 8 * 24 * 60 * 60 * 1000);
    const placed = vi.fn(async () => true);
    await settleCheckout(placed);
    vi.restoreAllMocks();
    expect(placed).not.toHaveBeenCalled();
    expect(readBag()).toEqual([{ ...rose, qty: 3 }, mocha]);
    expect(pending()).toBeNull();
  });
});
