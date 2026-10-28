import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "./page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WaitlistForm } from "@/components/waitlist-form";
import { BAG_KEY } from "@/lib/bag";

describe("Home", () => {
  it("has one h1 with the brand promise", () => {
    render(<Home />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings.map((h) => h.textContent)).toEqual(["The gift that makes her feel like the moment."]);
  });

  it("lists the three steps in order", () => {
    render(<Home />);
    const steps = within(screen.getByRole("list", { name: "How it works" })).getAllByRole("heading");
    expect(steps.map((s) => s.textContent)).toEqual(["Place the Call", "She gets the Call", "She picks up"]);
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

const pages = ["Home", "Shop", "Send a Call", "About"];
const linkNames = (nav: HTMLElement) => within(nav).getAllByRole("link").map((l) => l.textContent);

describe("SiteHeader", () => {
  it("lists the four pages in the main nav", () => {
    render(<SiteHeader />);
    expect(linkNames(screen.getByRole("navigation", { name: "Main" }))).toEqual(pages);
  });

  it("points Join the waitlist at the Home signup", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Join the waitlist" })).toHaveAttribute("href", "/#waitlist");
  });

  it("shows the ink logo", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("img", { name: "Boujie Call" }).getAttribute("src")).toContain("logo-ink");
  });

  it("opens the drawer from the menu button", () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("dialog")).toHaveAttribute("open");
  });

  it("closes the drawer from the close button", () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.getByRole("dialog", { hidden: true })).not.toHaveAttribute("open");
  });

  it("closes the drawer when a link is chosen", () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("link", { name: "Shop" }));
    expect(screen.getByRole("dialog", { hidden: true })).not.toHaveAttribute("open");
  });
});

describe("SiteFooter", () => {
  it("lists the four pages", () => {
    render(<SiteFooter />);
    expect(linkNames(screen.getByRole("navigation", { name: "Footer" }))).toEqual(pages);
  });

  it("shows the pink logo", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("img", { name: "Boujie Call" }).getAttribute("src")).toContain("logo-pink");
  });
});

describe("Home signup", () => {
  it("anchors the signup section as waitlist", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("section#waitlist")).not.toBeNull();
  });
});

describe("WaitlistForm", () => {
  const submit = (email: string) => {
    render(<WaitlistForm />);
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: email } });
    fireEvent.click(screen.getByRole("button", { name: "Join the waitlist" }));
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

describe("Bag link", () => {
  beforeEach(() => localStorage.clear());

  it("names the live piece count", () => {
    localStorage.setItem(BAG_KEY, JSON.stringify([{ slug: "the-romper", colorway: "Rose", size: "S", qty: 2 }]));
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Your bag, 2 pieces" })).toHaveAttribute("href", "/bag");
  });
});

describe("Waitlist copy", () => {
  it("never says Join the list", () => {
    const { container } = render(<Home />);
    expect(container.textContent).not.toContain("Join the list");
  });
});

describe("Home editorial redesign", () => {
  const hero = () => screen.getByRole("region", { name: "The gift that makes her feel like the moment." });

  it("labels the hero as luxury nightwear gifts", () => {
    render(<Home />);
    expect(within(hero()).getByText("BOUJIE CALL ✦ LUXURY NIGHTWEAR GIFTS")).toBeInTheDocument();
  });

  it("gives the hero a single waitlist link", () => {
    render(<Home />);
    expect(within(hero()).getAllByRole("link", { name: "Join the waitlist" })).toHaveLength(1);
  });

  it("numbers the steps 01 to 03", () => {
    render(<Home />);
    const list = screen.getByRole("list", { name: "How it works" });
    expect(within(list).getAllByText(/^0[1-3]$/).map((n) => n.textContent)).toEqual(["01", "02", "03"]);
  });

  it("turns from brunch to night in two headings", () => {
    render(<Home />);
    const turn = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(turn).toEqual(expect.arrayContaining(["Cute enough to open at brunch.", "Irresistible enough to wear that night."]));
  });

  it("sets the night half of the turn on ink", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Irresistible enough to wear that night." }).closest(".bg-ink")).not.toBeNull();
  });

  it("marks missing photos as images to come", () => {
    render(<Home />);
    expect(screen.getAllByRole("img", { name: /image to come/ }).length).toBeGreaterThanOrEqual(2);
  });
});
