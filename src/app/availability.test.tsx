import { render, screen, within } from "@testing-library/react";
import { ShopGrid } from "@/components/shop-grid";
import { ProductView } from "@/components/product-view";
import { availability, products, stockKey, type Product } from "@/lib/products";

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
});
