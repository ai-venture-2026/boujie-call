import { fireEvent, render, screen, within } from "@testing-library/react";
import { BackLink } from "@/components/back-link";
import { ShopGrid } from "@/components/shop-grid";
import { SiteHeader } from "@/components/site-header";
import { previousPage, rememberPage } from "@/lib/nav-memory";
import { products } from "@/lib/products";

let back: ReturnType<typeof vi.spyOn>;
let pathname = "/shop/the-romper";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

const backToShop = () => {
  render(<BackLink href="/shop">Back to the shop</BackLink>);
  return screen.getByRole("link", { name: "Back to the shop" });
};
const sections = () => within(screen.getByRole("region", { name: "Collection" })).getAllByRole("heading", { level: 2 }).map((h) => h.textContent);

beforeEach(() => {
  sessionStorage.clear();
  back = vi.spyOn(window.history, "back").mockImplementation(() => {});
  window.history.replaceState(null, "", "/shop");
});
afterEach(() => vi.restoreAllMocks());

describe("Page memory", () => {
  it("remembers the page before the current one", () => {
    rememberPage("/shop");
    rememberPage("/shop/the-romper");
    expect(previousPage()).toBe("/shop");
  });

  it("keeps the previous page when the same page is recorded twice", () => {
    rememberPage("/shop");
    rememberPage("/shop/the-romper");
    rememberPage("/shop/the-romper");
    expect(previousPage()).toBe("/shop");
  });

  it("records each page from the header", () => {
    rememberPage("/shop");
    pathname = "/shop/the-romper";
    render(<SiteHeader />);
    expect(previousPage()).toBe("/shop");
  });
});

describe("Back link", () => {
  it("goes back through history when it leads to the page just visited", () => {
    rememberPage("/shop");
    rememberPage("/shop/the-romper");
    fireEvent.click(backToShop());
    expect(back).toHaveBeenCalledOnce();
  });

  it("opens the page normally when the shopper arrived from elsewhere", () => {
    rememberPage("/shop/the-romper");
    const link = backToShop();
    fireEvent.click(link);
    expect(back).not.toHaveBeenCalled();
  });

  it("still links to the shop when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const link = backToShop();
    fireEvent.click(link);
    expect(back).not.toHaveBeenCalled();
    expect(link).toHaveAttribute("href", "/shop");
  });
});

describe("Shop filters in the address", () => {
  it("opens with the piece named in the address", () => {
    window.history.replaceState(null, "", "/shop?piece=the-romper");
    render(<ShopGrid products={products} />);
    expect(sections()).toEqual(["The Romper"]);
  });

  it("writes the chosen piece into the address", () => {
    render(<ShopGrid products={products} />);
    fireEvent.click(screen.getByRole("button", { name: "The Slip Dress" }));
    expect(new URLSearchParams(window.location.search).get("piece")).toBe("the-slip-dress");
  });

  it("writes the chosen colour into the address", () => {
    render(<ShopGrid products={products} />);
    fireEvent.click(screen.getByRole("button", { name: "Mocha" }));
    expect(new URLSearchParams(window.location.search).get("colour")).toBe("Mocha");
  });

  it("ignores a piece the shop does not carry", () => {
    window.history.replaceState(null, "", "/shop?piece=the-gown");
    render(<ShopGrid products={products} />);
    expect(sections()).toEqual(products.map((p) => p.name));
  });
});
