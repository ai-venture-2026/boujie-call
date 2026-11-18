import { render, screen, within } from "@testing-library/react";
import Home from "./page";
import BagPage from "./bag/page";
import { BAG_KEY } from "@/lib/bag";
import { heroSlides } from "@/lib/content";
import { productHref, products } from "@/lib/products";
import { ProductView } from "@/components/product-view";

beforeEach(() => localStorage.clear());

describe("Product links open on the colour they show", () => {
  it("builds a product link with its colour", () => {
    expect(productHref("the-romper", "Powder Blue")).toBe("/shop/the-romper?colorway=powder-blue");
  });

  it("opens Discover the piece on the Mocha romper", async () => {
    render(await Home());
    expect(screen.getByRole("link", { name: "Discover the piece" })).toHaveAttribute("href", "/shop/the-romper?colorway=mocha");
  });

  it("opens a hero slide's piece name on that slide's colour", async () => {
    render(await Home());
    const first = heroSlides[0];
    expect(first.colorway).toBe("After Dark");
    expect(screen.getByRole("link", { name: `${first.piece} · ${first.colorway}` })).toHaveAttribute("href", "/shop/the-slip-dress?colorway=after-dark");
  });

  it("opens Home's piece cards on the colour of their photo", async () => {
    render(await Home());
    const hrefs = within(screen.getByRole("list", { name: "Pieces" })).getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["the-slip-dress", "the-romper", "the-boujie-set"].map((slug) => productHref(slug, products.find((p) => p.slug === slug)!.colorways[0].name)));
  });

  it("opens a bag piece's name on its colour", () => {
    localStorage.setItem(BAG_KEY, JSON.stringify([{ slug: "the-romper", colorway: "Mocha", size: "S", qty: 1 }]));
    render(<BagPage />);
    expect(within(screen.getByRole("list", { name: "Pieces in your bag" })).getByRole("link", { name: "The Romper" })).toHaveAttribute("href", "/shop/the-romper?colorway=mocha");
  });

  it("selects the colour named in the link on the product page", () => {
    window.history.replaceState(null, "", "/shop/the-romper?colorway=powder-blue");
    render(<ProductView product={products.find((p) => p.slug === "the-romper")!} intro={null} details={null} />);
    expect(screen.getByRole("radio", { name: "Powder Blue" })).toBeChecked();
  });
});
