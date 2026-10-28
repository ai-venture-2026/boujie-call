import { fireEvent, render, screen } from "@testing-library/react";
import Shop from "./page";
import ProductPage from "./[slug]/page";
import { products } from "@/lib/products";
import { readBag } from "@/lib/bag";

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

describe("Add to your bag", () => {
  beforeEach(() => localStorage.clear());
  const add = () => fireEvent.click(screen.getByRole("button", { name: "Add to your bag" }));

  it("asks for both choices when neither is made", async () => {
    await renderProduct("the-slip-dress");
    add();
    expect(screen.getByRole("alert")).toHaveTextContent("Choose a colorway and a size first.");
  });

  it("asks for a size when only a colorway is chosen", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "After dark" }));
    add();
    expect(screen.getByRole("alert")).toHaveTextContent("Choose a size first.");
  });

  it("leaves the bag empty when a choice is missing", async () => {
    await renderProduct("the-slip-dress");
    add();
    expect(readBag()).toEqual([]);
  });

  it("adds the chosen piece to the bag", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "After dark" }));
    fireEvent.click(screen.getByRole("radio", { name: "M" }));
    add();
    expect(readBag()).toEqual([{ slug: "the-slip-dress", colorway: "After dark", size: "M", qty: 1 }]);
  });

  it("confirms what was added", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "After dark" }));
    fireEvent.click(screen.getByRole("radio", { name: "M" }));
    add();
    expect(screen.getByRole("status")).toHaveTextContent("Added to your bag: The Slip Dress, After dark, M.");
  });
});
