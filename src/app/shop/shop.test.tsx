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
    expect(within(screen.getByRole("main")).getByText("Free shipping on 2 or more. Any 2 for $85.")).toBeInTheDocument();
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
    expect(within(screen.getByRole("main")).getByText("Free shipping on 2 or more. Any 2 for $85.")).toBeInTheDocument();
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

  it("fills add to your bag in pink", async () => {
    await renderProduct("the-romper");
    expect(screen.getByRole("button", { name: "Add to your bag" })).toHaveClass("cta-primary");
  });

  it("fills the chosen size pill in blush with a pink border", async () => {
    await renderProduct("the-romper");
    expect(screen.getByRole("radio", { name: "M" }).parentElement).toHaveClass("has-checked:bg-blush", "has-checked:border-pink");
  });

  it("rings the chosen swatch in pink", async () => {
    await renderProduct("the-romper");
    expect(screen.getByRole("radio", { name: "Mocha" }).parentElement).toHaveClass("has-checked:ring-pink");
  });

  it("keeps the words the owner ruled out off the product page", async () => {
    const { container } = await renderProduct("the-romper");
    expect(container.textContent).not.toMatch(/purchase|\bitems?\b|\bcart\b|\border\b|!/i);
  });
});

describe("Shop collection", () => {
  const cards = () => within(screen.getByRole("list", { name: "Collection" })).queryAllByRole("listitem");
  const press = (name: string) => fireEvent.click(screen.getAllByRole("button", { name })[0]);

  it("drops the every piece line from the header", () => {
    render(<Shop />);
    expect(screen.queryByText(/Every piece is a moment/)).toBeNull();
  });

  it("keeps the gift link out of the header", () => {
    render(<Shop />);
    const header = screen.getByRole("heading", { level: 1 }).closest("section") as HTMLElement;
    expect(within(header).queryByRole("link", { name: /Place a Call/ })).toBeNull();
  });

  it("offers the gift link below the grid", () => {
    render(<Shop />);
    expect(screen.getByRole("link", { name: "Sending it as a gift? Place a Call" })).toHaveAttribute("href", "/send-a-call");
  });

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

  it("spells color the US way", () => {
    render(<Shop />);
    expect(screen.getByRole("button", { name: "All colors" })).toBeInTheDocument();
  });

  it("names All pieces once in the filters", () => {
    render(<Shop />);
    expect(within(screen.getByRole("main")).getAllByText("All pieces")).toHaveLength(1);
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
  it("rounds the size choices into pills", async () => {
    await renderProduct("the-slip-dress");
    expect(screen.getByRole("radio", { name: "M" }).parentElement).toHaveClass("rounded-full");
  });

  it("sets the product photo on stone", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "Rose" }));
    expect(screen.getByRole("img", { name: "The Slip Dress in Rose, front" }).parentElement).toHaveClass("bg-stone");
  });
});

describe("Product gallery thumbnails", () => {
  const slide = (name: string) => screen.getByRole("img", { name }).parentElement;

  it("shows three thumbnails when a colorway has one photo", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "Rose" }));
    expect(screen.getAllByRole("button", { name: /^Show / })).toHaveLength(3);
  });

  it("marks a view without a photo as image to come", async () => {
    await renderProduct("the-slip-dress");
    expect(within(screen.getByRole("button", { name: "Show back" })).getByText("Image to come")).toBeInTheDocument();
  });

  it("shows the chosen thumbnail as the main slide", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("button", { name: "Show back" }));
    expect(slide("The Slip Dress in Rose, back")).not.toHaveClass("md:hidden");
  });

  it("hides the other slides on desktop", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("button", { name: "Show back" }));
    expect(slide("The Slip Dress in Rose, front")).toHaveClass("md:hidden");
  });

  it("shows the chosen colorway's photo as the main image", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "After Dark" }));
    expect(screen.getByRole("img", { name: "The Slip Dress in After Dark, front" }).getAttribute("src")).toContain("the-slip-dress-after-dark");
  });

  it("returns to the front view when the colorway changes", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("button", { name: "Show back" }));
    fireEvent.click(screen.getByRole("radio", { name: "After Dark" }));
    expect(slide("The Slip Dress in After Dark, front")).not.toHaveClass("md:hidden");
  });

  it("lets phones swipe between views", async () => {
    await renderProduct("the-slip-dress");
    expect(slide("The Slip Dress in Rose, front")?.parentElement).toHaveClass("snap-x");
  });

  it("shows one dot per view on phones", async () => {
    const { container } = await renderProduct("the-slip-dress");
    expect(container.querySelectorAll("[data-dot]")).toHaveLength(3);
  });

  it("lets keyboard users pick a photo from the dots", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("button", { name: "Photo 2 of 3" }));
    expect(slide("The Slip Dress in Rose, back")).not.toHaveClass("md:hidden");
  });

  it("marks the visible photo on the dots", async () => {
    await renderProduct("the-slip-dress");
    expect(screen.getByRole("button", { name: "Photo 1 of 3" })).toHaveAttribute("aria-current", "true");
  });
});

describe("Size guide", () => {
  const open = () => fireEvent.click(screen.getByRole("button", { name: "Size guide" }));

  it("opens the size guide", async () => {
    await renderProduct("the-romper");
    open();
    expect(screen.getByRole("dialog", { name: "Size guide" })).toBeInTheDocument();
  });

  it("marks the chart as a placeholder", async () => {
    await renderProduct("the-romper");
    open();
    expect(screen.getByText("Placeholder. Measurements to come from Boujie Call.")).toBeInTheDocument();
  });

  it("heads the chart with bust, waist, hip", async () => {
    await renderProduct("the-romper");
    open();
    expect(screen.getAllByRole("columnheader").map((h) => h.textContent)).toEqual(["Size", "Bust", "Waist", "Hip"]);
  });

  it("lists a row per size", async () => {
    await renderProduct("the-romper");
    open();
    expect(screen.getAllByRole("rowheader").map((h) => h.textContent)).toEqual(["S", "M", "L", "XL"]);
  });

  it("names the size table", async () => {
    await renderProduct("the-romper");
    open();
    expect(screen.getByRole("table", { name: "Measurements by size, placeholder" })).toBeInTheDocument();
  });

  it("closes from the close button", async () => {
    await renderProduct("the-romper");
    open();
    fireEvent.click(screen.getByRole("button", { name: "Close size guide" }));
    expect(screen.queryByRole("dialog", { name: "Size guide" })).toBeNull();
  });
});

describe("Shop on phones", () => {
  it("hides the featured model cards below the small breakpoint", () => {
    const { container } = render(<Shop />);
    expect(container.querySelector("[data-featured]")).toHaveClass("hidden");
  });

  it("scrolls the filter row sideways on phones", () => {
    render(<Shop />);
    expect(screen.getByRole("navigation", { name: "Pieces" }).parentElement).toHaveClass("max-md:overflow-x-auto");
  });

  it("leaves room for the focus ring inside the filter row", () => {
    render(<Shop />);
    expect(screen.getByRole("navigation", { name: "Pieces" }).parentElement).toHaveClass("max-md:py-1.5");
  });

  it("keeps the color filters in the piece filter row", () => {
    render(<Shop />);
    expect(screen.getByRole("group", { name: "Color" }).parentElement).toBe(screen.getByRole("navigation", { name: "Pieces" }).parentElement);
  });

  it("gives each card name its own line", () => {
    render(<Shop />);
    const price = within(screen.getByRole("list", { name: "Collection" })).getAllByText("$48.00")[0];
    expect(price.parentElement?.textContent).toBe("Rose$48.00");
  });
});

describe("Back to the shop", () => {
  it("shows a back arrow beside the link", async () => {
    await renderProduct("the-romper");
    expect(screen.getByRole("link", { name: "Back to the shop" }).querySelector("svg")).not.toBeNull();
  });

  it("draws the back link as an outlined pill", async () => {
    await renderProduct("the-romper");
    expect(screen.getByRole("link", { name: "Back to the shop" }).className.split(" ")).toEqual(expect.arrayContaining(["cta"]));
  });
});
