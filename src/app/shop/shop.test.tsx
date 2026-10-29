import { fireEvent, render, screen, within } from "@testing-library/react";
import Shop from "./page";
import ProductPage from "./[slug]/page";
import { colorwaySlug, products } from "@/lib/products";
import { readBag } from "@/lib/bag";

const renderProduct = async (slug: string) => render(await ProductPage({ params: Promise.resolve({ slug }) }));

describe("Shop", () => {
  it("links every colorway card to its product page", () => {
    render(<Shop />);
    const hrefs = within(screen.getByRole("list", { name: "Collection" })).getAllByRole("link").map((l) => l.getAttribute("href"));
    expect(hrefs).toEqual(products.flatMap((p) => p.colorways.map((c) => `/shop/${p.slug}?colorway=${colorwaySlug(c.name)}`)));
  });

  it("shows the confirmed price without a placeholder note", () => {
    render(<Shop />);
    expect(screen.queryByText("Placeholder price")).toBeNull();
  });

  it("shows the offer line", () => {
    render(<Shop />);
    expect(screen.getByText("Free shipping on 2 or more. Any 2 for $85.")).toBeInTheDocument();
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
    fireEvent.click(screen.getByRole("radio", { name: "After Dark" }));
    expect(screen.getByRole("radio", { name: "After Dark" })).toBeChecked();
  });

  it("relabels the gallery to the chosen colorway", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "After Dark" }));
    expect(screen.getByRole("img", { name: "The Slip Dress in After Dark, front" })).toBeInTheDocument();
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
    fireEvent.click(screen.getByRole("radio", { name: "After Dark" }));
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
    fireEvent.click(screen.getByRole("radio", { name: "After Dark" }));
    fireEvent.click(screen.getByRole("radio", { name: "M" }));
    add();
    expect(readBag()).toEqual([{ slug: "the-slip-dress", colorway: "After Dark", size: "M", qty: 1 }]);
  });

  it("confirms what was added", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "After Dark" }));
    fireEvent.click(screen.getByRole("radio", { name: "M" }));
    add();
    expect(within(screen.getByRole("main")).getByRole("status")).toHaveTextContent("Added to your bag: The Slip Dress, After Dark, M.");
  });
});

describe("Product page offer", () => {
  it("shows the offer line", async () => {
    await renderProduct("the-romper");
    expect(screen.getByText("Free shipping on 2 or more. Any 2 for $85.")).toBeInTheDocument();
  });
});

describe("Product photos", () => {
  it("shows the photo of the chosen colorway", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "Rose" }));
    expect(screen.getByRole("img", { name: "The Slip Dress in Rose, front" }).tagName).toBe("IMG");
  });

  it("keeps placeholders for The Boujie Set", async () => {
    const { container } = await renderProduct("the-boujie-set");
    expect(container.querySelector("main img")).toBeNull();
  });
});

describe("Product button", () => {
  it("uses the cta button for add to your bag", async () => {
    await renderProduct("the-romper");
    expect(screen.getByRole("button", { name: "Add to your bag" })).toHaveClass("cta");
  });
});

describe("Shop collection", () => {
  const cards = () => within(screen.getByRole("list", { name: "Collection" })).queryAllByRole("listitem");
  const press = (name: string) => fireEvent.click(screen.getAllByRole("button", { name })[0]);

  it("titles the page The collection", () => {
    render(<Shop />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("The collection");
  });

  it("shows one card per colorway", () => {
    render(<Shop />);
    expect(cards()).toHaveLength(10);
  });

  it("narrows to one piece from the sidebar", () => {
    render(<Shop />);
    press("The Romper");
    expect(cards()).toHaveLength(4);
  });

  it("narrows to one colour", () => {
    render(<Shop />);
    press("After Dark");
    expect(cards().every((c) => c.textContent?.includes("After Dark"))).toBe(true);
  });

  it("offers a reset when nothing matches", () => {
    render(<Shop />);
    press("The Boujie Set");
    press("Bloom");
    expect(screen.getByRole("button", { name: "Show all pieces" })).toBeInTheDocument();
  });
});

describe("Colorway from the link", () => {
  afterEach(() => window.history.pushState({}, "", "/"));

  it("opens the product page with the linked colorway checked", async () => {
    window.history.pushState({}, "", "/shop/the-slip-dress?colorway=after-dark");
    await renderProduct("the-slip-dress");
    expect(screen.getByRole("radio", { name: "After Dark" })).toBeChecked();
  });
});

describe("Product page shapes", () => {
  it("keeps every shape on the product page square", async () => {
    const { container } = await renderProduct("the-slip-dress");
    expect(container.querySelector("main [class*='rounded']")).toBeNull();
  });

  it("sets the product photo on stone", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "Rose" }));
    expect(screen.getByRole("img", { name: "The Slip Dress in Rose, front" }).parentElement).toHaveClass("bg-stone");
  });
});

describe("Product gallery thumbnails", () => {
  it("hides the thumbnail row when a colorway has one photo", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "Rose" }));
    expect(screen.queryByRole("button", { name: /^Show / })).toBeNull();
  });
});

describe("Shop on phones", () => {
  it("hides the featured model cards below the small breakpoint", () => {
    const { container } = render(<Shop />);
    expect(container.querySelector("[data-featured]")).toHaveClass("hidden");
  });

  it("wraps the piece filters instead of scrolling them", () => {
    render(<Shop />);
    expect(screen.getByRole("navigation", { name: "Pieces" })).toHaveClass("flex-wrap");
  });
});
