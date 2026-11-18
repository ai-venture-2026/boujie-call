import { render, screen, within } from "@testing-library/react";
import SendACall from "./page";
import Home from "../page";

describe("Send a Call page", () => {
  it("titles the page Place your Boujie Call.", () => {
    render(<SendACall />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Place your Boujie Call.");
  });

  it("describes the hero wall as soft pink", () => {
    render(<SendACall />);
    const hero = screen.getByRole("heading", { level: 1 }).closest("section") as HTMLElement;
    expect(within(hero).getByRole("img")).toHaveAccessibleName(/soft pink wall/);
  });

  it("shows the rose slip photo in the hero", () => {
    render(<SendACall />);
    const hero = screen.getByRole("heading", { level: 1 }).closest("section") as HTMLElement;
    expect(within(hero).getByRole("img").getAttribute("src")).toContain("hero-rose-slip");
  });

  it("opens the gift pop-up from the hero", () => {
    render(<SendACall />);
    const hero = screen.getByRole("heading", { level: 1 }).closest("section") as HTMLElement;
    expect(within(hero).getByRole("button", { name: "Send a Call" })).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("marks the page Coming soon while it is closed", () => {
    render(<SendACall />);
    const hero = screen.getByRole("heading", { level: 1 }).closest("section") as HTMLElement;
    expect(within(hero).getByText("Send a Call, Coming soon")).toBeInTheDocument();
  });

  it("drops Coming soon once it opens", () => {
    vi.stubEnv("NEXT_PUBLIC_CALLS_OPEN", "true");
    render(<SendACall />);
    vi.unstubAllEnvs();
    expect(screen.queryByText(/Coming soon/)).toBeNull();
  });

  it("never offers the waitlist", () => {
    const { container } = render(<SendACall />);
    expect(container.textContent).not.toMatch(/waitlist/i);
  });


  it("lists the four steps in order", () => {
    render(<SendACall />);
    const steps = within(screen.getByRole("list", { name: "How a Call works" })).getAllByRole("heading");
    expect(steps.map((s) => s.textContent)).toEqual(["You choose their tier", "You write your message", "They get the Call", "They pick up"]);
  });

  it("lists five things inside every box", () => {
    render(<SendACall />);
    expect(within(screen.getByRole("list", { name: "Inside every Boujie Call" })).getAllByRole("listitem")).toHaveLength(5);
  });

  it("shows the three tier prices", () => {
    render(<SendACall />);
    expect(["$40.00", "$55.00", "$75.00"].map((p) => within(screen.getByRole("main")).queryByText(p) !== null)).toEqual([true, true, true]);
  });

  it("drops Price to come", () => {
    render(<SendACall />);
    expect(screen.queryByText("Price to come")).toBeNull();
  });

  it("tags only The Signature Call as most popular", () => {
    render(<SendACall />);
    expect(screen.getAllByText("Most popular").map((t) => t.closest("article")?.querySelector("h3")?.textContent)).toEqual(["The Signature Call"]);
  });

  it("shortens the tier note", () => {
    render(<SendACall />);
    expect(screen.getByText("Contents confirmed at launch.")).toBeInTheDocument();
  });

  it("keeps the ruled out words off Send a Call", () => {
    const { container } = render(<SendACall />);
    expect(container.textContent).not.toMatch(/purchase|\bitems?\b|\bcart\b|\border\b|!/i);
  });

  it("describes the Call as an email", () => {
    const { container } = render(<SendACall />);
    expect(container.textContent).toMatch(/get an email/);
  });
});

describe("Send a Call on phones", () => {
  it("sets the hero words over the photo", () => {
    render(<SendACall />);
    expect(screen.getByRole("heading", { level: 1 }).parentElement).toHaveClass("max-md:absolute", "max-md:bg-[linear-gradient(to_top,color-mix(in_srgb,var(--color-ribbon)_90%,transparent),color-mix(in_srgb,var(--color-ribbon)_75%,transparent)_calc(100%-10rem),transparent)]");
  });

  it("lays the four steps in one column on phones", () => {
    render(<SendACall />);
    expect(screen.getByRole("list", { name: "How a Call works" })).toHaveClass("grid-cols-1");
  });
});

describe("Send a Call close", () => {
  const close = (c: HTMLElement) => c.querySelector("section#gift") as HTMLElement;

  it("sets the hero on ink", () => {
    render(<SendACall />);
    expect(screen.getByRole("heading", { level: 1 }).closest("section")).toHaveClass("bg-ribbon");
  });

  it("sets the box contents on blush", () => {
    render(<SendACall />);
    expect(screen.getByRole("heading", { name: "Inside every Boujie Call" }).parentElement).toHaveClass("bg-blush");
  });

  it("sets the closing section on ink", () => {
    const { container } = render(<SendACall />);
    expect(close(container)).toHaveClass("bg-ribbon");
  });

  it("closes on the mocha romper banner", () => {
    const { container } = render(<SendACall />);
    expect(within(close(container)).getByRole("img").getAttribute("src")).toContain("mocha-romper-banner");
  });

  it("ends on the gift button", () => {
    const { container } = render(<SendACall />);
    expect(within(close(container)).getByRole("button", { name: "Send a Call" })).toHaveAttribute("aria-haspopup", "dialog");
  });
});

describe("Call channel across pages", () => {
  it("drops the old email wording on Home", async () => {
    const { container } = render(await Home());
    expect(container.textContent).not.toMatch(/name and number/);
  });

  it("drops the old email wording on Send a Call", () => {
    const { container } = render(<SendACall />);
    expect(container.textContent).not.toMatch(/name and number/);
  });
});
