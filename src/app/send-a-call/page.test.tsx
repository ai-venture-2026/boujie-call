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

  it("shows the three tiers with prices to come", () => {
    render(<SendACall />);
    expect(screen.getAllByText("Price to come")).toHaveLength(3);
  });

  it("describes the Call as a text message", () => {
    const { container } = render(<SendACall />);
    expect(container.textContent).toMatch(/gets a text/);
  });
});

describe("Send a Call close", () => {
  const close = (c: HTMLElement) => c.querySelector("section#waitlist") as HTMLElement;

  it("sets the closing section on ink", () => {
    const { container } = render(<SendACall />);
    expect(close(container)).toHaveClass("bg-ink");
  });

  it("pairs the closing section with the unboxing photo", () => {
    const { container } = render(<SendACall />);
    expect(within(close(container)).getByRole("img").getAttribute("src")).toContain("unboxing");
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
