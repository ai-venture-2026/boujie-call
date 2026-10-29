import { render, screen, within } from "@testing-library/react";
import SendACall from "./page";
import Home from "../page";

describe("Send a Call page", () => {
  it("titles the page Place your Boujie Call.", () => {
    render(<SendACall />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Place your Boujie Call.");
  });

  it("shows the rose slip photo in the hero", () => {
    render(<SendACall />);
    const hero = screen.getByRole("heading", { level: 1 }).closest("section") as HTMLElement;
    expect(within(hero).getByRole("img").getAttribute("src")).toContain("hero-rose-slip");
  });

  it("points its button at the waitlist form", () => {
    render(<SendACall />);
    expect(screen.getByRole("link", { name: "Join the waitlist" })).toHaveAttribute("href", "#waitlist");
  });

  it("lists the four steps in order", () => {
    render(<SendACall />);
    const steps = within(screen.getByRole("list", { name: "How a Call works" })).getAllByRole("heading");
    expect(steps.map((s) => s.textContent)).toEqual(["You choose her tier", "You write her message", "She gets the Call", "She picks up"]);
  });

  it("lists five things inside every box", () => {
    render(<SendACall />);
    expect(within(screen.getByRole("list", { name: "Inside every Boujie Call" })).getAllByRole("listitem")).toHaveLength(5);
  });

  it("shows the three tier prices", () => {
    render(<SendACall />);
    expect(["$40.00", "$55.00", "$75.00"].map((p) => screen.queryByText(p) !== null)).toEqual([true, true, true]);
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

  it("describes the Call as a text message", () => {
    const { container } = render(<SendACall />);
    expect(container.textContent).toMatch(/gets a text/);
  });
});

describe("Send a Call on phones", () => {
  it("sets the hero words over the photo", () => {
    render(<SendACall />);
    expect(screen.getByRole("heading", { level: 1 }).parentElement).toHaveClass("max-md:absolute");
  });

  it("lays the four steps in one column on phones", () => {
    render(<SendACall />);
    expect(screen.getByRole("list", { name: "How a Call works" })).toHaveClass("grid-cols-1");
  });
});

describe("Send a Call close", () => {
  const close = (c: HTMLElement) => c.querySelector("section#waitlist") as HTMLElement;

  it("sets the closing section on ink", () => {
    const { container } = render(<SendACall />);
    expect(close(container)).toHaveClass("bg-ink");
  });

  it("closes on the mocha romper banner", () => {
    const { container } = render(<SendACall />);
    expect(within(close(container)).getByRole("img").getAttribute("src")).toContain("mocha-romper-banner");
  });

  it("frames the waitlist around Send a Call opening", () => {
    const { container } = render(<SendACall />);
    expect(within(close(container)).getByText("Be first when Send a Call opens.")).toBeInTheDocument();
  });

  it("keeps the waitlist form in the closing section", () => {
    const { container } = render(<SendACall />);
    expect(within(close(container)).getByLabelText("Email address")).toHaveAttribute("type", "email");
  });
});

describe("Call channel across pages", () => {
  it("drops the old email wording on Home", () => {
    const { container } = render(<Home />);
    expect(container.textContent).not.toMatch(/name and email/);
  });

  it("drops the old email wording on Send a Call", () => {
    const { container } = render(<SendACall />);
    expect(container.textContent).not.toMatch(/name and email/);
  });
});
