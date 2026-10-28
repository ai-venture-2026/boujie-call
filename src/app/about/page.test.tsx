import { render, screen, within } from "@testing-library/react";
import About from "./page";

describe("About", () => {
  it("has one h1 with the brand promise", () => {
    render(<About />);
    expect(screen.getAllByRole("heading", { level: 1 }).map((h) => h.textContent)).toEqual(["Every girl deserves a Boujie Call."]);
  });

  it("lists the three pillars in order", () => {
    render(<About />);
    const pillars = within(screen.getByRole("list", { name: "What we stand for" })).getAllByRole("heading");
    expect(pillars.map((p) => p.textContent)).toEqual(["Luxe without pretense", "Made for the moment", "For her, by her"]);
  });

  it("attributes the founder quote", () => {
    render(<About />);
    expect(screen.getByText("Founder, Boujie Call").closest("figure")?.querySelector("blockquote")).toHaveTextContent("Something she would actually remember.");
  });

  it("uses no dashes in the copy", () => {
    const { container } = render(<About />);
    const dashes = [0x2013, 0x2014].map((c) => String.fromCharCode(c));
    expect(dashes.some((d) => container.textContent?.includes(d))).toBe(false);
  });

  it("sends the closing button to the Send a Call waitlist", () => {
    render(<About />);
    expect(screen.getByRole("link", { name: "Join the waitlist" })).toHaveAttribute("href", "/send-a-call#waitlist");
  });

  it("marks the hero for the adaptive nav", () => {
    render(<About />);
    expect(screen.getByRole("heading", { level: 1 }).closest("section")).toHaveAttribute("data-nav", "dark");
  });
});
