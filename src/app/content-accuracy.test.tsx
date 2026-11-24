import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "./page";
import About from "./about/page";
import BagPage from "./bag/page";
import ProductPage from "./shop/[slug]/page";
import { metadata as shopMetadata } from "./shop/page";
import { SiteHeader } from "@/components/site-header";
import { BAG_KEY } from "@/lib/bag";
import * as productsModule from "@/lib/products";

const OLD_OFFER = "Free shipping on 2 or more. Any 2 for $85.";
const renderProduct = async (slug: string) => render(await ProductPage({ params: Promise.resolve({ slug }) }));
const fill = (lines: object[]) => localStorage.setItem(BAG_KEY, JSON.stringify(lines));
const slip = { slug: "the-slip-dress", colorway: "Rose", size: "M", qty: 1 };
const romper = { slug: "the-romper", colorway: "Mocha", size: "S", qty: 1 };
const description = (slug: string) => productsModule.products.find((p) => p.slug === slug)?.description;

beforeEach(() => localStorage.clear());
afterEach(() => vi.restoreAllMocks());

describe("Offer before the owner confirms one", () => {
  it("leaves the offer bar out of the header", () => {
    render(<SiteHeader />);
    expect(screen.queryByText(OLD_OFFER)).toBeNull();
  });

  it("leaves no offer bar element in the header", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("banner").querySelector(".bg-dusty")).toBeNull();
  });

  it("leaves the offer out of the phone menu", () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.queryByText(OLD_OFFER)).toBeNull();
  });

  it("leaves the offer off product pages", async () => {
    await renderProduct("the-romper");
    expect(within(screen.getByRole("main")).queryByText(OLD_OFFER)).toBeNull();
  });

  it("claims no two piece price in the bag", () => {
    fill([slip, romper]);
    render(<BagPage />);
    expect(screen.queryByText("Any 2 for $85 applied at checkout")).toBeNull();
  });

  it("claims no free shipping for two pieces", () => {
    fill([slip, romper]);
    render(<BagPage />);
    expect(screen.queryByText("You've unlocked free shipping")).toBeNull();
  });

  it("does not nudge toward free shipping at one piece", () => {
    fill([slip]);
    render(<BagPage />);
    expect(screen.queryByText("Add one more piece for free shipping")).toBeNull();
  });

  it("shows the owner's offer once she confirms it", () => {
    vi.spyOn(productsModule, "getOffer").mockReturnValue("Any 2 for $90.");
    render(<SiteHeader />);
    expect(screen.getByRole("banner").firstElementChild).toHaveTextContent("Any 2 for $90.");
  });
});

describe("Product details before the owner confirms them", () => {
  it.each(["the-slip-dress", "the-boujie-set", "the-romper"])("shows the owner's fabric blend on %s", async (slug) => {
    await renderProduct(slug);
    expect(screen.getByText("Fabric").nextElementSibling).toHaveTextContent("76% nylon, 24% spandex");
  });

  it("shows no Care row", async () => {
    await renderProduct("the-boujie-set");
    expect(screen.queryByText("Care")).toBeNull();
  });

  it("shows no Size guide while a size is missing from the chart", async () => {
    vi.spyOn(productsModule, "getSizeChart").mockReturnValue({ S: ["32", "26", "36"], M: ["34", "28", "38"], L: ["36", "30", "40"] });
    await renderProduct("the-romper");
    expect(screen.queryByRole("button", { name: "Size guide" })).toBeNull();
  });

  it("shows no Size guide without measurements", async () => {
    await renderProduct("the-boujie-set");
    expect(screen.queryByRole("button", { name: "Size guide" })).toBeNull();
  });

  it("lists a chart's cells per size as given", async () => {
    vi.spyOn(productsModule, "getSizeChart").mockReturnValue({ S: ["32", "26", "36"], M: ["34", "28", "38"], L: ["36", "30", "40"], XL: ["38", "32", "42"] });
    await renderProduct("the-romper");
    fireEvent.click(screen.getByRole("button", { name: "Size guide" }));
    expect(within(screen.getByRole("row", { name: /^M/ })).getAllByRole("cell").map((c) => c.textContent)).toEqual(["34", "28", "38"]);
  });
});

describe("Copy without an unconfirmed fabric", () => {
  it("describes the Boujie Set without a fabric", () => {
    expect(description("the-boujie-set")).toBe("A cami and shorts set, cute enough for brunch and soft enough to sleep in.");
  });

  it("describes the Slip Dress without a fabric", () => {
    expect(description("the-slip-dress")).toBe("The one you reach for when the night is yours.");
  });

  it("introduces the pieces on Home without a fabric", async () => {
    render(await Home());
    expect(screen.getByText("Made to be gifted. Sizes S to XL.")).toBeInTheDocument();
  });

  it("describes the shop without a fabric", () => {
    expect(shopMetadata.description).toBe("The Slip Dress, The Boujie Set and The Romper. Nightwear pieces in sizes S to XL.");
  });

  it("names the About gift photo without a fabric", () => {
    render(<About />);
    expect(screen.getByAltText("A woman in a rose slip dress rests her hand on a gift box beside her")).toBeInTheDocument();
  });
});
