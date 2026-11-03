import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { SiteHeader } from "./site-header";
import { BAG_KEY, BAG_OPENED } from "@/lib/bag";

const fill = (lines: object[]) => localStorage.setItem(BAG_KEY, JSON.stringify(lines));
const slip = { slug: "the-slip-dress", colorway: "Rose", size: "M", qty: 1 };
const icon = () => screen.getByRole("button", { name: /^Your bag/ });
const panel = () => screen.queryByRole("region", { name: "Your bag" });

describe("Mini bag", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.useRealTimers());

  it("opens from the bag icon", () => {
    render(<SiteHeader />);
    fireEvent.click(icon());
    expect(panel()).not.toBeNull();
  });

  it("closes when the icon is pressed again", () => {
    render(<SiteHeader />);
    fireEvent.click(icon());
    fireEvent.click(icon());
    expect(panel()).toBeNull();
  });

  it("closes on Escape", () => {
    render(<SiteHeader />);
    fireEvent.click(icon());
    fireEvent.keyDown(document, { key: "Escape" });
    expect(panel()).toBeNull();
  });

  it("closes on a click outside", () => {
    render(<SiteHeader />);
    fireEvent.click(icon());
    fireEvent.pointerDown(document.body);
    expect(panel()).toBeNull();
  });

  it("shows the empty state", () => {
    render(<SiteHeader />);
    fireEvent.click(icon());
    expect(within(panel() as HTMLElement).getByText("Your bag is empty")).toBeInTheDocument();
  });

  it("shows three pieces with a count of the rest", () => {
    fill(["S", "M", "L", "XL"].map((size) => ({ ...slip, size })));
    render(<SiteHeader />);
    fireEvent.click(icon());
    expect(within(panel() as HTMLElement).getByText("+ 1 more")).toBeInTheDocument();
  });

  it("links View bag to the bag page", () => {
    fill([slip]);
    render(<SiteHeader />);
    fireEvent.click(icon());
    expect(within(panel() as HTMLElement).getByRole("link", { name: "View bag" })).toHaveAttribute("href", "/bag");
  });

  it("fills Checkout in pink", () => {
    fill([slip]);
    render(<SiteHeader />);
    fireEvent.click(icon());
    expect(within(panel() as HTMLElement).getByRole("button", { name: "Checkout" })).toHaveClass("cta-primary");
  });

  it("outlines the header Shop the collection", () => {
    const { container } = render(<SiteHeader />);
    expect(container.querySelector("a.cta[href='/shop']")).not.toHaveClass("cta-primary");
  });

  it("answers Checkout with a note instead of a payment", async () => {
    fill([slip]);
    render(<SiteHeader />);
    fireEvent.click(icon());
    fireEvent.click(within(panel() as HTMLElement).getByRole("button", { name: "Checkout" }));
    expect(await within(panel() as HTMLElement).findByText(/Checkout opens soon\./)).toBeInTheDocument();
  });

  it("opens when a piece is added", () => {
    render(<SiteHeader />);
    act(() => void window.dispatchEvent(new Event(BAG_OPENED)));
    expect(panel()).not.toBeNull();
  });

  it("closes three seconds after a piece is added", () => {
    vi.useFakeTimers();
    render(<SiteHeader />);
    act(() => void window.dispatchEvent(new Event(BAG_OPENED)));
    act(() => void vi.advanceTimersByTime(3100));
    expect(panel()).toBeNull();
  });

  it("stays open while hovered", () => {
    vi.useFakeTimers();
    render(<SiteHeader />);
    act(() => void window.dispatchEvent(new Event(BAG_OPENED)));
    fireEvent.mouseEnter(panel() as HTMLElement);
    act(() => void vi.advanceTimersByTime(3100));
    expect(panel()).not.toBeNull();
  });
});
