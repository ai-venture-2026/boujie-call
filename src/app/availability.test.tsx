import { fireEvent, render, screen, within } from "@testing-library/react";
import { ShopGrid } from "@/components/shop-grid";
import { ProductView } from "@/components/product-view";
import Home from "./page";
import { availability, products, stockKey, type Product } from "@/lib/products";
import * as shopifyModule from "@/lib/shopify";

const romper = products.find((p) => p.slug === "the-romper")!;
const set = products.find((p) => p.slug === "the-boujie-set")!;
const stockFor = (p: Product, colour: string, count: number | null) => Object.fromEntries(p.sizes.map((s) => [stockKey(colour, s), count]));
const mochaGone: Product = { ...romper, stock: { ...stockFor(romper, "Mocha", 0), ...stockFor(romper, "Rose", 3) } };
const draftSet: Product = { ...set, comingSoon: true };
const card = (slug: string, colour: string) =>
  within(screen.getByRole("region", { name: "Collection" }))
    .getAllByRole("listitem")
    .find((li) => li.querySelector("a")?.getAttribute("href") === `/shop/${slug}?colorway=${colour}`)!;

describe("Availability", () => {
  it("calls a draft piece coming soon", () => {
    expect(availability(draftSet, "Rose")).toBe("Coming soon");
  });

  it("calls a colour sold out once every size is at 0", () => {
    expect(availability(mochaGone, "Mocha")).toBe("Sold out");
  });

  it("leaves a colour with some sizes left alone", () => {
    const someLeft: Product = { ...romper, stock: { ...stockFor(romper, "Mocha", 0), [stockKey("Mocha", "M")]: 2 } };
    expect(availability(someLeft, "Mocha")).toBeNull();
  });

  it("never calls a piece without sizes sold out", () => {
    expect(availability({ ...romper, sizes: [], stock: {} }, "Mocha")).toBeNull();
  });

  it("leaves a colour alone when Shopify sends no stock at all", () => {
    expect(availability({ ...romper, stock: undefined }, "Mocha")).toBeNull();
  });

  it("treats a size missing from the stock as in stock", () => {
    const withoutXl = Object.fromEntries(Object.entries(stockFor(romper, "Mocha", 0)).filter(([key]) => key !== stockKey("Mocha", "XL")));
    expect(availability({ ...romper, stock: withoutXl }, "Mocha")).toBeNull();
  });

  it("treats unknown counts as in stock", () => {
    expect(availability({ ...romper, stock: stockFor(romper, "Mocha", null) }, "Mocha")).toBeNull();
  });
});

describe("Shop card availability pill", () => {
  it("shows Coming soon on a draft piece's card photo", () => {
    render(<ShopGrid products={[draftSet]} />);
    expect(within(card("the-boujie-set", "rose")).getByText("Coming soon", { selector: "[data-pill]" })).toBeInTheDocument();
  });

  it("shows Sold out on a colour with every size gone", () => {
    render(<ShopGrid products={[mochaGone]} />);
    expect(within(card("the-romper", "mocha")).getByText("Sold out", { selector: "[data-pill]" })).toBeInTheDocument();
  });

  it("tells screen readers a card is sold out", () => {
    render(<ShopGrid products={[mochaGone]} />);
    expect(within(card("the-romper", "mocha")).getByRole("link")).toHaveAccessibleName(/sold out/i);
  });

  it("shows no pill on a colour still in stock", () => {
    render(<ShopGrid products={[mochaGone]} />);
    expect(card("the-romper", "rose").querySelector("[data-pill]")).toBeNull();
  });

  it("keeps a card with a pill linked to its product page", () => {
    render(<ShopGrid products={[mochaGone]} />);
    expect(within(card("the-romper", "mocha")).getByRole("link")).toHaveAttribute("href", "/shop/the-romper?colorway=mocha");
  });
});

describe("Product photo availability pill", () => {
  it("shows Coming soon on a draft piece's photo", () => {
    render(<ProductView product={draftSet} intro={null} details={null} />);
    expect(document.querySelector("[data-pill]")).toHaveTextContent("Coming soon");
  });

  it("shows Sold out on every photo of a sold-out colour", () => {
    render(<ProductView product={mochaGone} intro={null} details={null} />);
    fireEvent.click(screen.getByRole("radio", { name: "Mocha" }));
    const pills = [...document.querySelectorAll("[data-pill]")].map((p) => p.textContent);
    expect(pills.length).toBeGreaterThan(1);
    expect(pills.every((t) => t === "Sold out")).toBe(true);
  });
});

describe("Home piece cards follow Shopify", () => {
  afterEach(() => vi.restoreAllMocks());

  const live = (stock: Record<string, number | null> = {}) => ({ priceCents: 4800, stock });
  const allRomper = (count: number) => Object.fromEntries(romper.colorways.flatMap((c) => Object.entries(stockFor(romper, c.name, count))));
  const homeCard = (name: string) => within(screen.getByRole("list", { name: "Pieces" })).getByRole("heading", { name }).closest("a")!;
  const showHome = async (catalog: shopifyModule.Catalog) => {
    vi.spyOn(shopifyModule, "getCatalog").mockResolvedValue(catalog);
    render(await Home());
  };

  it("shows a piece Shopify does not sell as coming soon without a price", async () => {
    await showHome({ "the-slip-dress": live(), "the-romper": live() });
    const setCard = homeCard("The Boujie Set");
    expect(setCard.querySelector("[data-pill]")).toHaveTextContent("Coming soon");
    expect(setCard).toHaveTextContent("Coming soon3 colorways");
    expect(setCard).not.toHaveTextContent("$48.00");
  });

  it("marks a piece sold out once every colour is gone", async () => {
    await showHome({ "the-slip-dress": live(), "the-romper": live(allRomper(0)), "the-boujie-set": live() });
    const romperCard = homeCard("The Romper");
    expect(romperCard.querySelector("[data-pill]")).toHaveTextContent("Sold out");
    expect(romperCard).toHaveTextContent("$48.00, sold out");
  });

  it("leaves a piece alone while some colour is still in stock", async () => {
    await showHome({ "the-slip-dress": live(), "the-romper": live({ ...allRomper(0), ...stockFor(romper, "Rose", 3) }), "the-boujie-set": live() });
    expect(homeCard("The Romper").querySelector("[data-pill]")).toBeNull();
    expect(homeCard("The Romper")).not.toHaveTextContent("sold out");
  });

  it("shows the price Shopify gives a piece", async () => {
    vi.spyOn(shopifyModule, "getCatalog").mockResolvedValue({ "the-slip-dress": { priceCents: 4800, stock: {} }, "the-romper": { priceCents: 5200, stock: {} }, "the-boujie-set": { priceCents: 4800, stock: {} } });
    render(await Home());
    const romperCard = within(screen.getByRole("list", { name: "Pieces" })).getByRole("heading", { name: "The Romper" }).closest("a")!;
    expect(romperCard).toHaveTextContent("$52.00");
  });
});
