import { fireEvent, render, screen, within } from "@testing-library/react";
import BagPage from "./page";
import { BAG_KEY, MAX_QTY, readBag, setQty } from "@/lib/bag";

const fill = (lines: object[]) => localStorage.setItem(BAG_KEY, JSON.stringify(lines));
const slip = { slug: "the-slip-dress", colorway: "Rose", size: "M", qty: 1 };
const romper = { slug: "the-romper", colorway: "Mocha", size: "S", qty: 1 };

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
