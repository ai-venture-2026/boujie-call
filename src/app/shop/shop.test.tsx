import { readFileSync } from "node:fs";
import { join } from "node:path";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import Shop from "./page";
import Home from "../page";
import SendACall from "../send-a-call/page";
import ProductPage from "./[slug]/page";
import * as productsModule from "@/lib/products";
import { colorwaySlug, products, type Product } from "@/lib/products";
import { ProductView } from "@/components/product-view";
import { ShopGrid } from "@/components/shop-grid";
import { readBag } from "@/lib/bag";

const renderProduct = async (slug: string) => render(await ProductPage({ params: Promise.resolve({ slug }) }));
const set = products.find((p) => p.slug === "the-boujie-set")!;
const sampleChart = { S: ["32", "26", "36"], M: ["34", "28", "38"], L: ["36", "30", "40"], XL: ["38", "32", "42"] } as Record<string, [string, string, string]>;
const confirmed = () => {
  vi.spyOn(productsModule, "getOffer").mockReturnValue("Free shipping on 2 or more. Any 2 for $85.");
  vi.spyOn(productsModule, "getSizeChart").mockReturnValue(sampleChart);
};
afterEach(() => vi.restoreAllMocks());
const unphotographed: Product = { ...set, colorways: set.colorways.map((c) => ({ ...c, images: [], gallery: undefined })) };

describe("Shop", () => {
  it("links every colorway card to its product page", async () => {
    render(await Shop());
    const hrefs = within(screen.getByRole("region", { name: "Collection" })).getAllByRole("link").map((l) => l.getAttribute("href"));
    expect(hrefs).toEqual(products.flatMap((p) => p.colorways.map((c) => `/shop/${p.slug}?colorway=${colorwaySlug(c.name)}`)));
  });

  it("shows the confirmed price without a placeholder note", async () => {
    render(await Shop());
    expect(screen.queryByText("Placeholder price")).toBeNull();
  });

  it("leaves the offer line to the top banner", async () => {
    render(await Shop());
    const hero = screen.getByRole("heading", { level: 1 }).closest("section") as HTMLElement;
    expect(within(hero).queryByText("Free shipping on 2 or more. Any 2 for $85.")).toBeNull();
  });

  it("avoids the words the owner ruled out", async () => {
    const { container } = render(await Shop());
    expect(container.textContent).not.toMatch(/purchase|\bitems?\b/i);
  });

  it("uses no exclamation points", async () => {
    const { container } = render(await Shop());
    expect(container.textContent).not.toContain("!");
  });
});

describe("Product page on laptops", () => {
  it("sizes the product title fluidly", async () => {
    await renderProduct("the-slip-dress");
    expect(screen.getByRole("heading", { level: 1 })).toHaveClass("text-[clamp(36px,3.2vw,52px)]");
  });

  it("caps the image column so the photo fits the viewport", async () => {
    const { container } = await renderProduct("the-slip-dress");
    expect(container.querySelector("main .grid")).toHaveClass("lg:grid-cols-[min(max(16rem,calc((100svh-14rem)*0.75)),calc(50%-2rem))_1fr]");
  });

  it("keeps the main photo at 3:4", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "Rose" }));
    expect(screen.getByRole("img", { name: "The Slip Dress in Rose, front" })).toHaveClass("aspect-[3/4]");
  });

  it("keeps the info column in view on desktop", async () => {
    await renderProduct("the-slip-dress");
    expect(screen.getByRole("heading", { level: 1 }).parentElement).toHaveClass("md:sticky", "md:top-32", "md:self-start");
  });

  it("narrows the image column below lg", async () => {
    const { container } = await renderProduct("the-slip-dress");
    expect(container.querySelector("main .grid")).toHaveClass("md:grid-cols-[min(max(16rem,calc((100svh-14rem)*0.75)),45%)_1fr]");
  });

  it("tightens the gap above the button on short laptop screens", async () => {
    await renderProduct("the-slip-dress");
    expect(screen.getByRole("button", { name: "Add to your bag" }).parentElement).toHaveClass("short:mt-5");
  });

  it("sets size pills 40px tall for mouse users from md", async () => {
    await renderProduct("the-slip-dress");
    expect(screen.getByRole("radio", { name: "M" }).parentElement).toHaveClass("md:pointer-fine:h-10", "md:min-w-12");
  });
});

describe("Product typography", () => {
  it("sets the product price in DM Sans 500", async () => {
    await renderProduct("the-slip-dress");
    expect(screen.getAllByText("$48.00")[0]).toHaveClass("font-sans", "font-medium");
  });

  it("reads the offer line at body size on desktop", async () => {
    confirmed();
    await renderProduct("the-slip-dress");
    expect(screen.getAllByText("Free shipping on 2 or more. Any 2 for $85.").at(-1)).not.toHaveClass("md:text-sm");
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
  it("shows the offer line once confirmed", async () => {
    confirmed();
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

  it("opens The Boujie Set on its front photo", async () => {
    await renderProduct("the-boujie-set");
    expect(screen.getByRole("img", { name: "The Boujie Set in After Dark, front" }).tagName).toBe("IMG");
  });

  it("keeps placeholders for a piece without photos", () => {
    const { container } = render(<ProductView product={unphotographed} intro={null} details={null} />);
    expect(container.querySelector("img")).toBeNull();
  });
});

describe("Gender neutral gift copy", () => {
  const gendered = /\b(her|hers|she)\b/i;

  it("keeps gendered pronouns off Home", () => {
    const { container } = render(<Home />);
    expect(container.textContent).not.toMatch(gendered);
  });

  it("keeps gendered pronouns off Send a Call", () => {
    const { container } = render(<SendACall />);
    expect(container.textContent).not.toMatch(gendered);
  });

  it("keeps gendered pronouns off the shop", async () => {
    const { container } = render(await Shop());
    expect(container.textContent).not.toMatch(gendered);
  });

  it("keeps gendered pronouns off The Slip Dress page", async () => {
    const { container } = await renderProduct("the-slip-dress");
    expect(container.textContent).not.toMatch(gendered);
  });
});

describe("Send as a gift", () => {
  it("opens the gift pop-up from a product page", async () => {
    await renderProduct("the-romper");
    expect(screen.getByRole("button", { name: "Send as a gift" })).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("starts the pop-up on the colour chosen on the page", async () => {
    await renderProduct("the-romper");
    fireEvent.click(screen.getByRole("radio", { name: "Mocha" }));
    fireEvent.click(screen.getByRole("button", { name: "Send as a gift" }));
    expect(within(screen.getByRole("dialog", { name: "Choose their gift" })).getByRole("radio", { name: "Mocha" })).toBeChecked();
  });

  it("leaves the gift button off a piece that is coming soon", () => {
    render(<ProductView product={{ ...products.find((p) => p.slug === "the-romper")!, comingSoon: true }} intro={null} details={null} />);
    expect(screen.queryByRole("button", { name: "Send as a gift" })).toBeNull();
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
  const cards = () => within(screen.getByRole("region", { name: "Collection" })).queryAllByRole("listitem");
  const press = (name: string) => fireEvent.click(screen.getAllByRole("button", { name })[0]);

  it("drops the every piece line from the header", async () => {
    render(await Shop());
    expect(screen.queryByText(/Every piece is a moment/)).toBeNull();
  });

  it("keeps the gift link out of the header", async () => {
    render(await Shop());
    const header = screen.getByRole("heading", { level: 1 }).closest("section") as HTMLElement;
    expect(within(header).queryByRole("link", { name: /Place a Call/ })).toBeNull();
  });

  it("opens the gift pop-up from below the grid", async () => {
    render(await Shop());
    expect(screen.getByRole("button", { name: "Sending it as a gift? Place a Call" })).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("draws the gift button as an outlined pill", async () => {
    render(await Shop());
    expect(screen.getByRole("button", { name: "Sending it as a gift? Place a Call" })).toHaveClass("cta");
  });

  it("heads the cards by piece", async () => {
    render(await Shop());
    const collection = screen.getByRole("region", { name: "Collection" });
    expect(within(collection).getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual(["The Slip Dress", "The Boujie Set", "The Romper"]);
  });

  it("lays four cards across on desktop", async () => {
    render(await Shop());
    expect(screen.getByRole("list", { name: "The Romper" })).toHaveClass("lg:grid-cols-4");
  });

  it("hides a piece with no card in the chosen colour", async () => {
    render(await Shop());
    press("Bloom");
    expect(within(screen.getByRole("region", { name: "Collection" })).getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual(["The Slip Dress"]);
  });

  it("scrolls the colour row sideways on its own on phones", async () => {
    render(await Shop());
    expect(screen.getByRole("group", { name: "Color" })).toHaveClass("max-md:overflow-x-auto");
  });

  it("lets the filter rows shrink so phones never scroll sideways", async () => {
    render(await Shop());
    expect(screen.getByRole("navigation", { name: "Pieces" }).parentElement).toHaveClass("min-w-0");
  });

  it("keeps the filters in view while scrolling on desktop", async () => {
    render(await Shop());
    expect(screen.getByRole("navigation", { name: "Pieces" }).parentElement).toHaveClass("md:sticky");
  });

  it("puts the price on its own line", async () => {
    render(await Shop());
    const price = within(screen.getByRole("region", { name: "Collection" })).getAllByText("$48.00")[0];
    expect(price).toHaveClass("block");
  });

  it("sets the collection header on ink", async () => {
    render(await Shop());
    expect(screen.getByRole("heading", { level: 1 }).closest("section")).toHaveClass("bg-ribbon");
  });

  it("titles the page The collection", async () => {
    render(await Shop());
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("The collection");
  });

  it("shows one card per colorway", async () => {
    render(await Shop());
    expect(cards()).toHaveLength(10);
  });

  it("narrows to one piece from the sidebar", async () => {
    render(await Shop());
    press("The Romper");
    expect(cards()).toHaveLength(4);
  });

  it("narrows to one colour", async () => {
    render(await Shop());
    press("After Dark");
    expect(cards().every((c) => c.textContent?.includes("After Dark"))).toBe(true);
  });

  it("spells color the US way", async () => {
    render(await Shop());
    expect(screen.getByRole("button", { name: "All colors" })).toBeInTheDocument();
  });

  it("draws the colour filter as a pill at every width", async () => {
    render(await Shop());
    expect(screen.getByRole("button", { name: "Rose" }).className.split(" ")).toEqual(expect.arrayContaining(["rounded-full", "border-[0.5px]"]));
  });

  it("draws the piece filter as a pill at every width", async () => {
    render(await Shop());
    expect(within(screen.getByRole("navigation", { name: "Pieces" })).getByRole("button", { name: "The Romper" }).className.split(" ")).toContain("rounded-full");
  });

  it("puts the colour's dot in its pill", async () => {
    render(await Shop());
    expect((screen.getByRole("button", { name: "Mocha" }).querySelector("[data-swatch]") as HTMLElement).style.background).toBe("rgb(74, 44, 34)");
  });

  it("leaves All colors without a dot", async () => {
    render(await Shop());
    expect(screen.getByRole("button", { name: "All colors" }).querySelector("[data-swatch]")).toBeNull();
  });

  it("fills the chosen pill", async () => {
    render(await Shop());
    fireEvent.click(screen.getByRole("button", { name: "Rose" }));
    expect(screen.getByRole("button", { name: "Rose" }).className.split(" ")).toEqual(expect.arrayContaining(["aria-pressed:bg-blush", "aria-pressed:border-pink"]));
  });

  it("names All pieces once in the filters", async () => {
    render(await Shop());
    expect(within(screen.getByRole("main")).getAllByText("All pieces")).toHaveLength(1);
  });

  it("offers a reset when nothing matches", async () => {
    render(await Shop());
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

  it("grounds the cutout with a contact shadow", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "Rose" }));
    expect(screen.getByRole("img", { name: "The Slip Dress in Rose, on its own" }).parentElement).toHaveClass("contact");
  });

  it("leaves the studio photo without the added shadow", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "Rose" }));
    expect(screen.getByRole("img", { name: "The Slip Dress in Rose, front" }).parentElement).not.toHaveClass("contact");
  });
});

describe("Studio photos", () => {
  it("opens The Slip Dress in Rose on its studio front photo", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "Rose" }));
    expect(screen.getByRole("img", { name: "The Slip Dress in Rose, front" }).getAttribute("src")).toMatch(/studio(\/|%2F)the-slip-dress-rose-front/);
  });

  it("shows four photos for The Romper in Rose", async () => {
    await renderProduct("the-romper");
    fireEvent.click(screen.getByRole("radio", { name: "Rose" }));
    expect(screen.getByRole("button", { name: "Photo 4 of 4" })).toBeInTheDocument();
  });

  it("shows four thumbnails for The Romper in Rose", async () => {
    await renderProduct("the-romper");
    fireEvent.click(screen.getByRole("radio", { name: "Rose" }));
    expect(screen.getAllByRole("button", { name: /^Show / })).toHaveLength(4);
  });

  it("shows a studio photo on the shop card", async () => {
    render(await Shop());
    const card = within(screen.getByRole("region", { name: "Collection" })).getAllByRole("listitem").find((c) => c.textContent?.includes("The Slip Dress") && c.querySelector("a")?.getAttribute("href")?.endsWith("colorway=rose"));
    expect(card?.querySelector("img")?.getAttribute("src")).toMatch(/studio(\/|%2F)the-slip-dress-rose-front/);
  });

  it("keeps three image to come frames for a piece without photos", () => {
    render(<ProductView product={unphotographed} intro={null} details={null} />);
    expect(screen.getAllByText("Image to come")).toHaveLength(6);
  });

  it("shows the close crop on The Boujie Set shop card", async () => {
    render(await Shop());
    const card = within(screen.getByRole("region", { name: "Collection" })).getAllByRole("listitem").find((c) => c.querySelector("a")?.getAttribute("href") === "/shop/the-boujie-set?colorway=rose");
    expect(card?.querySelector("img")?.getAttribute("src")).toMatch(/studio(\/|%2F)the-boujie-set-rose-card/);
  });

  it("keeps the Romper card on its front photo", async () => {
    render(await Shop());
    const card = within(screen.getByRole("region", { name: "Collection" })).getAllByRole("listitem").find((c) => c.querySelector("a")?.getAttribute("href") === "/shop/the-romper?colorway=mocha");
    expect(card?.querySelector("img")?.getAttribute("src")).toMatch(/studio(\/|%2F)the-romper-mocha-front/);
  });
});

describe("Product gallery thumbnails", () => {
  const slide = (name: string) => screen.getByRole("img", { name }).parentElement;

  it("shows one thumbnail per photo", async () => {
    await renderProduct("the-slip-dress");
    fireEvent.click(screen.getByRole("radio", { name: "Rose" }));
    expect(screen.getAllByRole("button", { name: /^Show / })).toHaveLength(3);
  });

  it("marks a view without a photo as image to come", () => {
    render(<ProductView product={unphotographed} intro={null} details={null} />);
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

  it("rings the selected thumbnail without thinning the focus outline", async () => {
    await renderProduct("the-slip-dress");
    expect(screen.getByRole("button", { name: "Show front" }).className).not.toMatch(/outline-1/);
  });
});

describe("Size guide", () => {
  const open = () => fireEvent.click(screen.getByRole("button", { name: "Size guide" }));
  beforeEach(confirmed);

  it("opens the size guide", async () => {
    await renderProduct("the-romper");
    open();
    expect(screen.getByRole("dialog", { name: "Size guide" })).toBeInTheDocument();
  });

  it("keeps the size guide outside the size choices", async () => {
    await renderProduct("the-romper");
    open();
    expect(screen.getByRole("dialog", { name: "Size guide" }).closest("fieldset")).toBeNull();
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
    expect(screen.getByRole("table", { name: "Measurements by size" })).toBeInTheDocument();
  });

  it("closes from the close button", async () => {
    await renderProduct("the-romper");
    open();
    fireEvent.click(screen.getByRole("button", { name: "Close size guide" }));
    expect(screen.queryByRole("dialog", { name: "Size guide" })).toBeNull();
  });
});

describe("Shop shows real product photos only", () => {
  const generated = (root: Element) => [...root.querySelectorAll("img")].map((img) => decodeURIComponent(img.getAttribute("src") ?? "")).filter((src) => /\/images\/(hero|details)\//.test(src));

  it("renders no generated model photo", async () => {
    render(await Shop());
    expect(generated(screen.getByRole("main"))).toEqual([]);
  });

  it("heads the shop with the Mocha Romper studio photo", async () => {
    render(await Shop());
    expect(decodeURIComponent(screen.getByRole("img", { name: "The lace neckline of The Romper in Mocha" }).getAttribute("src") ?? "")).toContain("studio/the-romper-mocha-front");
  });
  it("keeps the lace close-up on Send a Call", () => {
    render(<SendACall />);
    expect(decodeURIComponent(screen.getByRole("img", { name: "A close-up of the brown lace neckline of The Romper in Mocha" }).getAttribute("src") ?? "")).toContain("details/brown-romper-lace");
  });
});

describe("Shop on phones", () => {
  it("scrolls the filter row sideways on phones", async () => {
    render(await Shop());
    expect(screen.getByRole("navigation", { name: "Pieces" })).toHaveClass("max-md:overflow-x-auto");
  });

  it("leaves room for the focus ring inside the filter row", async () => {
    render(await Shop());
    expect(screen.getByRole("navigation", { name: "Pieces" })).toHaveClass("py-1.5");
  });

  it("keeps the color filters in the piece filter row", async () => {
    render(await Shop());
    expect(screen.getByRole("group", { name: "Color" }).parentElement).toBe(screen.getByRole("navigation", { name: "Pieces" }).parentElement);
  });

  it("gives each card name its own line", async () => {
    render(await Shop());
    const price = within(screen.getByRole("region", { name: "Collection" })).getAllByText("$48.00")[0];
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

describe("Quick add bar on phones", () => {
  let fire: (visible: boolean) => void = () => {};
  const bar = () => screen.queryByRole("region", { name: "Quick add" });
  const tap = () => fireEvent.click(within(bar() as HTMLElement).getByRole("button", { name: "Add to your bag" }));
  const leave = () => act(() => fire(false));

  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(cb: (entries: { isIntersecting: boolean; boundingClientRect: { top: number } }[]) => void) {
          fire = (visible) => cb([{ isIntersecting: visible, boundingClientRect: { top: visible ? 100 : -100 } }]);
        }
        observe() {}
        disconnect() {}
      },
    );
    Element.prototype.scrollIntoView = vi.fn();
  });
  afterEach(() => vi.unstubAllGlobals());

  it("stays hidden while the main button shows", async () => {
    await renderProduct("the-romper");
    act(() => fire(true));
    expect(bar()).toBeNull();
  });

  it("appears once the main button leaves the screen", async () => {
    await renderProduct("the-romper");
    leave();
    expect(bar()).not.toBeNull();
  });

  it("names the piece", async () => {
    await renderProduct("the-romper");
    leave();
    expect(within(bar() as HTMLElement).getByText("The Romper")).toBeInTheDocument();
  });

  it("names the chosen pick", async () => {
    await renderProduct("the-romper");
    fireEvent.click(screen.getByRole("radio", { name: "Rose" }));
    fireEvent.click(screen.getByRole("radio", { name: "M" }));
    leave();
    expect(within(bar() as HTMLElement).getByText("Rose, M")).toBeInTheDocument();
  });

  it("names no colorway before one is chosen", async () => {
    await renderProduct("the-romper");
    leave();
    expect(within(bar() as HTMLElement).queryByText(/Rose|Mocha|Powder Blue|After Dark/)).toBeNull();
  });

  it("shows the price", async () => {
    await renderProduct("the-romper");
    leave();
    expect(within(bar() as HTMLElement).getByText("$48.00")).toBeInTheDocument();
  });

  it("fills its button in pink", async () => {
    await renderProduct("the-romper");
    leave();
    expect(within(bar() as HTMLElement).getByRole("button", { name: "Add to your bag" })).toHaveClass("cta-primary");
  });

  it("asks for a colorway with a size when neither is chosen", async () => {
    await renderProduct("the-romper");
    leave();
    tap();
    expect(within(screen.getByRole("main")).getByRole("alert")).toHaveTextContent("Choose a colorway and a size first.");
  });

  it("scrolls back to the selectors when a choice is missing", async () => {
    await renderProduct("the-romper");
    leave();
    tap();
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it("moves focus to the colorways when a colorway is missing", async () => {
    await renderProduct("the-romper");
    leave();
    tap();
    expect(document.activeElement).toBe(screen.getByRole("radio", { name: "Powder Blue" }));
  });

  it("moves focus to the sizes when only the size is missing", async () => {
    await renderProduct("the-romper");
    fireEvent.click(screen.getByRole("radio", { name: "Mocha" }));
    leave();
    tap();
    expect(document.activeElement).toBe(screen.getByRole("radio", { name: "S" }));
  });

  it("adds the chosen piece to the bag", async () => {
    await renderProduct("the-romper");
    fireEvent.click(screen.getByRole("radio", { name: "Mocha" }));
    fireEvent.click(screen.getByRole("radio", { name: "M" }));
    leave();
    tap();
    expect(readBag()).toEqual([{ slug: "the-romper", colorway: "Mocha", size: "M", qty: 1 }]);
  });

  it("pads the bar for the iPhone home bar", async () => {
    await renderProduct("the-romper");
    leave();
    expect((bar() as HTMLElement).className).toContain("safe-area-inset-bottom");
  });
});

describe("Phone targets on product pages", () => {
  it("gives the gallery dots a 44px target", async () => {
    await renderProduct("the-slip-dress");
    expect(screen.getByRole("button", { name: "Photo 1 of 3" })).toHaveClass("size-11");
  });

  it("gives Size guide a 44px target", async () => {
    confirmed();
    await renderProduct("the-slip-dress");
    expect(screen.getByRole("button", { name: "Size guide" })).toHaveClass("min-h-11");
  });

  it("sets Fabric with Care at 16px on phones", async () => {
    const slipDress = products.find((p) => p.slug === "the-slip-dress")!;
    Object.assign(slipDress, { fabric: "Sample fabric.", care: "Sample care." });
    try {
      await renderProduct("the-slip-dress");
      expect(screen.getByText("Fabric").closest("dl")).toHaveClass("text-base");
    } finally {
      Object.assign(slipDress, { fabric: null, care: null });
    }
  });

  it("sets the missing choice note at 16px on phones", async () => {
    await renderProduct("the-slip-dress");
    expect(within(screen.getByRole("main")).getByRole("alert")).toHaveClass("text-base");
  });

  it("sets the offer sentence at 16px on phones", async () => {
    confirmed();
    await renderProduct("the-slip-dress");
    expect(within(screen.getByRole("main")).getByText("Free shipping on 2 or more. Any 2 for $85.")).toHaveClass("text-base");
  });
});

describe("Shop cards on phones", () => {
  const items = () => within(screen.getByRole("region", { name: "Collection" })).getAllByRole("listitem");

  it("keeps each card name on one line", async () => {
    render(await Shop());
    expect(within(items()[0]).getByText("The Slip Dress")).toHaveClass("truncate");
  });

  it("sets the card price at 17px", async () => {
    render(await Shop());
    expect(within(items()[0]).getByText("$48.00")).toHaveClass("text-[17px]");
  });

  it("centers a single last card", async () => {
    render(await Shop());
    expect(items().at(-1)).toHaveClass("max-lg:last:odd:justify-self-center");
  });
});

const blendedProductPhotos = (root: Element) => {
  const photos = [...root.querySelectorAll("img")].filter((img) => /images(\/|%2F)products/.test(img.getAttribute("src") ?? ""));
  expect(photos.length).toBeGreaterThan(0);
  return photos.filter((img) => img.classList.contains("mix-blend-multiply"));
};

describe("Product photo ground", () => {
  it("draws the contact shadow above the opaque photo", () => {
    const rule = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8").match(/\.contact::after\s*\{[^}]*\}/)?.[0] ?? "";
    expect(rule).toMatch(/z-index:\s*1;/);
    expect(rule).toMatch(/pointer-events:\s*none;/);
  });

  it("shows shop grid photos without a blend", async () => {
    const { container } = render(await Shop());
    expect(blendedProductPhotos(container)).toEqual([]);
  });

  it("shows product page photos without a blend", async () => {
    const { container } = await renderProduct("the-romper");
    expect(blendedProductPhotos(container)).toEqual([]);
  });
});

describe("Live stock from Shopify", () => {
  const romper = { ...products.find((p) => p.slug === "the-romper")!, stock: { "Rose/S": 0, "Rose/M": 2, "Rose/L": 1, "Rose/XL": 5, "Mocha/S": 3 } };
  const view = (product: Product) => render(<ProductView product={product} intro={null} details={null} />);
  const pick = (name: string) => fireEvent.click(screen.getByRole("radio", { name }));

  it("disables a sold-out size", () => {
    view(romper);
    pick("Rose");
    expect(screen.getByRole("radio", { name: "S, sold out" })).toBeDisabled();
  });

  it("crosses out a sold-out size", () => {
    view(romper);
    pick("Rose");
    expect(screen.getByRole("radio", { name: "S, sold out" }).closest("label")).toHaveClass("line-through");
  });

  it("clears a size that is sold out in the new colorway", () => {
    view(romper);
    pick("Mocha");
    pick("S");
    pick("Rose");
    expect(screen.queryByRole("radio", { name: /^S/, checked: true })).toBeNull();
  });

  it("says the size was cleared because it is sold out", () => {
    view(romper);
    pick("Mocha");
    pick("S");
    pick("Rose");
    expect(screen.getByText("S is sold out in Rose. Choose another size.")).toHaveAttribute("aria-live", "polite");
  });

  it("drops the sold out note on the next colorway change", () => {
    view(romper);
    pick("Mocha");
    pick("S");
    pick("Rose");
    pick("Mocha");
    expect(screen.queryByText("S is sold out in Rose. Choose another size.")).toBeNull();
  });

  it("says 2 left when two remain", () => {
    view(romper);
    pick("Rose");
    pick("M");
    expect(screen.getByText("2 left")).toBeInTheDocument();
  });

  it("announces the stock note to screen readers", () => {
    view(romper);
    pick("Rose");
    pick("M");
    expect(screen.getByText("2 left")).toHaveAttribute("aria-live", "polite");
  });

  it("says Last one when one remains", () => {
    view(romper);
    pick("Rose");
    pick("L");
    expect(screen.getByText("Last one")).toBeInTheDocument();
  });

  it("stays quiet with three or more left", () => {
    view(romper);
    pick("Rose");
    pick("XL");
    expect(screen.queryByText(/left|Last one/)).toBeNull();
  });

  it("shows Coming soon instead of Add to your bag", () => {
    view({ ...romper, comingSoon: true });
    expect(screen.queryByRole("button", { name: "Add to your bag" })).toBeNull();
    expect(screen.getByText("Coming soon")).toBeInTheDocument();
  });

  it("shows Coming soon instead of the price on shop cards", () => {
    render(<ShopGrid products={products.map((p) => (p.slug === "the-boujie-set" ? { ...p, comingSoon: true } : p))} />);
    const setCards = within(screen.getByRole("region", { name: "Collection" })).getAllByRole("listitem").filter((c) => c.textContent?.includes("The Boujie Set"));
    expect(setCards).toHaveLength(3);
    expect(setCards.every((c) => c.textContent?.includes("Coming soon") && !c.textContent.includes("$48.00"))).toBe(true);
  });
});

describe("Gallery across the md breakpoint", () => {
  let wide = true;
  let onChange: (() => void) | null = null;
  beforeEach(() => {
    wide = true;
    onChange = null;
    vi.stubGlobal("matchMedia", (q: string) => ({
      get matches() {
        return q === "(min-width: 48rem)" ? wide : false;
      },
      addEventListener: (_: string, fn: () => void) => (onChange = fn),
      removeEventListener() {},
    }));
  });
  afterEach(() => vi.unstubAllGlobals());

  const track = (container: HTMLElement) => {
    const el = container.querySelector(".snap-x") as HTMLDivElement;
    Object.defineProperty(el, "clientWidth", { configurable: true, value: 400 });
    return el;
  };

  it("scrolls to the chosen photo when the window narrows below md", async () => {
    const { container } = await renderProduct("the-romper");
    const el = track(container);
    fireEvent.click(screen.getByRole("button", { name: "Show back" }));
    wide = false;
    act(() => onChange?.());
    expect(el.scrollLeft).toBe(400);
  });

  it("keeps the chosen photo when the track scrolls at md", async () => {
    const { container } = await renderProduct("the-romper");
    const el = track(container);
    fireEvent.click(screen.getByRole("button", { name: "Show on its own" }));
    fireEvent.scroll(el);
    expect(screen.getByRole("button", { name: "Show on its own" })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("Gallery scroll cost", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("builds the screen size check once for many scrolls", async () => {
    const mm = vi.fn((q: string) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {} }));
    vi.stubGlobal("matchMedia", mm);
    const { container } = await renderProduct("the-romper");
    const el = container.querySelector(".snap-x") as HTMLDivElement;
    const before = mm.mock.calls.filter(([q]) => q === "(min-width: 48rem)").length;
    for (let i = 0; i < 10; i++) fireEvent.scroll(el);
    expect(mm.mock.calls.filter(([q]) => q === "(min-width: 48rem)").length).toBe(before);
  });
});

describe("Size guide drag", () => {
  const dialog = () => screen.getByRole("dialog", { name: "Size guide" });
  beforeEach(confirmed);

  it("stays open when a drag ends on the backdrop", async () => {
    await renderProduct("the-romper");
    fireEvent.click(screen.getByRole("button", { name: "Size guide" }));
    fireEvent.pointerDown(within(dialog()).getByRole("table"));
    fireEvent.click(dialog());
    expect(dialog()).toHaveAttribute("open");
  });

  it("closes on a click on the backdrop", async () => {
    await renderProduct("the-romper");
    fireEvent.click(screen.getByRole("button", { name: "Size guide" }));
    const d = dialog();
    fireEvent.pointerDown(d);
    fireEvent.click(d);
    expect(d).not.toHaveAttribute("open");
  });
});

describe("Gallery without matchMedia", () => {
  it("moves the dot with a swipe", async () => {
    const { container } = await renderProduct("the-romper");
    const el = container.querySelector(".snap-x") as HTMLDivElement;
    Object.defineProperty(el, "clientWidth", { configurable: true, value: 400 });
    el.scrollLeft = 400;
    fireEvent.scroll(el);
    expect(screen.getByRole("button", { name: "Photo 2 of 3" })).toHaveAttribute("aria-current", "true");
  });
});
