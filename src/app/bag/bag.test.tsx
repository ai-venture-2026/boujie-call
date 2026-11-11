import { fireEvent, render, screen, within } from "@testing-library/react";
import BagPage from "./page";
import * as checkoutModule from "@/lib/checkout";
import { BAG_KEY, MAX_QTY, readBag, setQty } from "@/lib/bag";

const fill = (lines: object[]) => localStorage.setItem(BAG_KEY, JSON.stringify(lines));
const slip = { slug: "the-slip-dress", colorway: "Rose", size: "M", qty: 1 };
const romper = { slug: "the-romper", colorway: "Mocha", size: "S", qty: 1 };

describe("Bag tick boxes", () => {
  const tick = (name: string) => screen.getByRole("checkbox", { name: `Check out ${name}` });
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  it("ticks every piece on first view", () => {
    fill([slip, romper]);
    render(<BagPage />);
    expect(tick("The Slip Dress, Rose, M")).toBeChecked();
  });

  it("keeps an unticked piece in the bag", () => {
    fill([slip, romper]);
    render(<BagPage />);
    fireEvent.click(tick("The Slip Dress, Rose, M"));
    expect(readBag()).toHaveLength(2);
  });

  it("totals only ticked pieces", () => {
    fill([slip, romper]);
    render(<BagPage />);
    fireEvent.click(tick("The Slip Dress, Rose, M"));
    expect(within(screen.getByText("Subtotal").parentElement as HTMLElement).getByText("$48.00")).toBeInTheDocument();
  });

  it("drops the two piece line when one piece is unticked", () => {
    fill([slip, romper]);
    render(<BagPage />);
    fireEvent.click(tick("The Slip Dress, Rose, M"));
    expect(screen.queryByText("Any 2 for $85 applied at checkout")).toBeNull();
  });

  it("sends only ticked pieces to checkout", () => {
    const start = vi.spyOn(checkoutModule, "startCheckout").mockResolvedValue({ ok: false, message: "x" });
    fill([slip, romper]);
    render(<BagPage />);
    fireEvent.click(tick("The Slip Dress, Rose, M"));
    fireEvent.click(screen.getByRole("button", { name: "Checkout" }));
    expect(start).toHaveBeenCalledWith([romper]);
  });

  it("disables checkout with nothing ticked", () => {
    fill([slip]);
    render(<BagPage />);
    fireEvent.click(tick("The Slip Dress, Rose, M"));
    expect(screen.getByRole("button", { name: "Checkout" })).toBeDisabled();
  });

  it("asks for a tick when nothing is ticked", () => {
    fill([slip]);
    render(<BagPage />);
    fireEvent.click(tick("The Slip Dress, Rose, M"));
    expect(screen.getByText("Tick a piece to check out.")).toBeInTheDocument();
  });
});

describe("Bag page", () => {
  beforeEach(() => localStorage.clear());

  it("shows the empty state when nothing is in the bag", () => {
    render(<BagPage />);
    expect(screen.getByText("Your bag is empty")).toBeInTheDocument();
  });

  it("labels each piece with its colourway", () => {
    fill([slip]);
    render(<BagPage />);
    expect(within(screen.getByRole("list", { name: "Pieces in your bag" })).getByText("Rose, M")).toBeInTheDocument();
  });

  it("raises the quantity with plus", () => {
    fill([slip]);
    render(<BagPage />);
    fireEvent.click(screen.getByRole("button", { name: "Add one more The Slip Dress, Rose, M" }));
    expect(readBag()[0].qty).toBe(2);
  });

  it("keeps the minus button disabled at one piece", () => {
    fill([slip]);
    render(<BagPage />);
    expect(screen.getByRole("button", { name: "Remove one The Slip Dress, Rose, M" })).toBeDisabled();
  });

  it("removes a piece", () => {
    fill([slip, romper]);
    render(<BagPage />);
    fireEvent.click(screen.getByRole("button", { name: "Remove The Slip Dress, Rose, M from your bag" }));
    expect(readBag()).toEqual([romper]);
  });

  it("shows the subtotal of every piece", () => {
    fill([{ ...slip, qty: 2 }]);
    render(<BagPage />);
    expect(screen.getByText("$96.00")).toBeInTheDocument();
  });

  it("shows the Shopify price for a piece", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ "the-slip-dress": 5000 }) }));
    fill([{ ...slip, qty: 2 }]);
    render(<BagPage />);
    expect(await screen.findByText("$100.00")).toBeInTheDocument();
    vi.unstubAllGlobals();
  });

  it("keeps the local price when Shopify does not answer", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    fill([slip]);
    render(<BagPage />);
    expect((await screen.findAllByText("$48.00")).length).toBeGreaterThan(0);
    vi.unstubAllGlobals();
  });

  it("nudges toward free shipping at one piece", () => {
    fill([slip]);
    render(<BagPage />);
    expect(screen.getByText("Add one more piece for free shipping")).toBeInTheDocument();
  });

  it("confirms free shipping at two pieces", () => {
    fill([slip, romper]);
    render(<BagPage />);
    expect(screen.getByText("You've unlocked free shipping")).toBeInTheDocument();
  });

  it("notes that the two piece price applies at checkout", () => {
    fill([slip, romper]);
    render(<BagPage />);
    expect(screen.getByText("Any 2 for $85 applied at checkout")).toBeInTheDocument();
  });

  it("answers checkout with a note instead of a payment", async () => {
    fill([slip]);
    render(<BagPage />);
    fireEvent.click(screen.getByRole("button", { name: "Checkout" }));
    expect(await screen.findByText(/Checkout opens soon\./)).toHaveAttribute("role", "status");
  });

  it("fills checkout in pink", () => {
    fill([slip]);
    render(<BagPage />);
    expect(screen.getByRole("button", { name: "Checkout" })).toHaveClass("cta-primary");
  });

  it("keeps the bag after checkout is pressed", () => {
    fill([slip]);
    render(<BagPage />);
    fireEvent.click(screen.getByRole("button", { name: "Checkout" }));
    expect(readBag()).toEqual([slip]);
  });

  it("caps a piece at the maximum quantity", () => {
    fill([slip]);
    setQty(slip, MAX_QTY + 5);
    expect(readBag()[0].qty).toBe(MAX_QTY);
  });

  it("avoids the words the owner ruled out", () => {
    fill([slip]);
    const { container } = render(<BagPage />);
    expect(container.textContent).not.toMatch(/\bcart\b|\bitems?\b|\border\b|purchase|!/i);
  });
});

const blendedProductPhotos = (root: Element) => {
  const photos = [...root.querySelectorAll("img")].filter((img) => /images(\/|%2F)products/.test(img.getAttribute("src") ?? ""));
  expect(photos.length).toBeGreaterThan(0);
  return photos.filter((img) => img.classList.contains("mix-blend-multiply"));
};

describe("Bag photo ground", () => {
  it("shows bag photos without a blend", () => {
    fill([slip, romper]);
    const { container } = render(<BagPage />);
    expect(blendedProductPhotos(container)).toEqual([]);
  });
});
