import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "./page";
import { SiteHeader } from "@/components/site-header";
import { WaitlistForm } from "@/components/waitlist-form";

describe("Home", () => {
  it("has one h1 with the brand promise", () => {
    render(<Home />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings.map((h) => h.textContent)).toEqual(["The gift that makes her feel like the moment."]);
  });

  it("lists the three steps in order", () => {
    render(<Home />);
    const steps = within(screen.getByRole("list", { name: "How it works" })).getAllByRole("heading");
    expect(steps.map((s) => s.textContent)).toEqual(["Place the Call", "She Gets the Call", "She Picks Up"]);
  });

  it("shows a price placeholder on every tier", () => {
    render(<Home />);
    expect(screen.getAllByText("Price to come")).toHaveLength(3);
  });

  it("renders social channels without a URL as plain text", () => {
    render(<Home />);
    expect(screen.queryByRole("link", { name: /tiktok|instagram/i })).toBeNull();
  });
});

describe("SiteHeader", () => {
  it("labels the nav landmark Main", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
  });

  it("links the three page sections from the nav", () => {
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation");
    expect(within(nav).getAllByRole("link").map((l) => l.textContent)).toEqual(["How it works", "The boxes", "Join the list"]);
  });
});

describe("WaitlistForm", () => {
  const submit = (email: string) => {
    render(<WaitlistForm />);
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: email } });
    fireEvent.click(screen.getByRole("button", { name: "Join the list" }));
  };

  it("tells a valid signup the list opens soon", () => {
    submit("her@example.com");
    expect(screen.getByRole("status")).toHaveTextContent("The list opens soon");
  });

  it("shows no status for an invalid email", () => {
    submit("not-an-email");
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });
});
