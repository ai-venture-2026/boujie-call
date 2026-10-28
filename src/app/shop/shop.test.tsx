import { fireEvent, render, screen } from "@testing-library/react";
import Shop from "./page";
import ProductPage from "./[slug]/page";
import { products } from "@/lib/products";

const renderProduct = async (slug: string) => render(await ProductPage({ params: Promise.resolve({ slug }) }));

describe("Shop", () => {
  it("links each piece to its page", () => {
    render(<Shop />);
    const hrefs = products.map((p) => screen.getByRole("link", { name: new RegExp(p.name) }).getAttribute("href"));
    expect(hrefs).toEqual(products.map((p) => `/shop/${p.slug}`));
  });

  it("marks every placeholder price", () => {
    render(<Shop />);
    expect(screen.getAllByText("Placeholder price")).toHaveLength(products.length);
  });

  it("avoids the words the owner ruled out", () => {
    const { container } = render(<Shop />);
    expect(container.textContent).not.toMatch(/purchase|\bitems?\b/i);
  });

  it("uses no exclamation points", () => {
    const { container } = render(<Shop />);
    expect(container.textContent).not.toContain("!");
  });
});

describe("Product page", () => {
  it("checks the colorway the visitor chooses", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "After dark" }));
    expect(screen.getByRole("radio", { name: "After dark" })).toBeChecked();
  });

  it("relabels the gallery to the chosen colorway", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "After dark" }));
    expect(screen.getByRole("img", { name: "The Slip Dress in After dark, front" })).toBeInTheDocument();
  });

  it("starts with no colorway chosen", async () => {
    await renderProduct("the-romper");
    expect(screen.queryByRole("radio", { checked: true })).toBeNull();
  });

  it("sends an unknown slug to the 404 page", async () => {
    await expect(renderProduct("nope")).rejects.toThrow(/NEXT_HTTP_ERROR_FALLBACK;404|NEXT_NOT_FOUND/);
  });
});
