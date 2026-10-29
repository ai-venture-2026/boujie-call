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

  it("frames the waitlist around Send a Call opening", () => {
    render(<About />);
    expect(screen.getByText("Be first when Send a Call opens.")).toBeInTheDocument();
  });

  it("fills the closing button in pink", () => {
    render(<About />);
    expect(screen.getByRole("link", { name: "Join the waitlist" })).toHaveClass("cta-primary");
  });

  it("keeps the ruled out words off About", () => {
    const { container } = render(<About />);
    expect(container.textContent).not.toMatch(/purchase|\bitems?\b|\bcart\b|\border\b|!/i);
  });

  it("sets the closing section on blush", () => {
    render(<About />);
    expect(screen.getByRole("link", { name: "Join the waitlist" }).closest("section")).toHaveClass("bg-blush");
  });

  it("closes on the rose dress banner", () => {
    render(<About />);
    const close = screen.getByRole("link", { name: "Join the waitlist" }).closest("section") as HTMLElement;
    expect(within(close).getByRole("img").getAttribute("src")).toContain("rose-dress-banner");
  });

  it("shows the blue romper photo in the hero", () => {
    render(<About />);
    const hero = screen.getByRole("heading", { level: 1 }).closest("section") as HTMLElement;
    expect(within(hero).getByRole("img").getAttribute("src")).toContain("hero-blue-romper");
  });

  it("shows the After Dark portrait beside our story", () => {
    render(<About />);
    const story = screen.getByRole("heading", { name: "It started with a feeling." }).closest("section") as HTMLElement;
    expect(within(story).getByRole("img").getAttribute("src")).toContain("story-after-dark");
  });

  it("sets the hero words over the photo on phones", () => {
    render(<About />);
    expect(screen.getByRole("heading", { level: 1 }).parentElement).toHaveClass("max-md:absolute");
  });

  it("marks the hero for the adaptive nav", () => {
    render(<About />);
    expect(screen.getByRole("heading", { level: 1 }).closest("section")).toHaveAttribute("data-nav", "dark");
  });
});
