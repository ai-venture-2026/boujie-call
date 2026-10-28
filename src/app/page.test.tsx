import { existsSync } from "node:fs";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import Home from "./page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WaitlistForm } from "@/components/waitlist-form";
import { BAG_KEY } from "@/lib/bag";
import { heroSlides } from "@/lib/content";

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

  it("points Shop the collection at the shop", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Shop the collection" })).toHaveAttribute("href", "/shop");
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
    expect(within(hero()).getByText("LUXURY NIGHTWEAR GIFTS")).toBeInTheDocument();
  });

  it("gives the hero a single shop link", () => {
    render(<Home />);
    expect(within(hero()).getAllByRole("link", { name: "Shop the collection" }).map((l) => l.getAttribute("href"))).toEqual(["/shop"]);
  });

  it("shows the steps without number labels", () => {
    render(<Home />);
    const list = screen.getByRole("list", { name: "How it works" });
    expect(within(list).queryAllByText(/^0[1-3]$/)).toEqual([]);
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
    expect(screen.getAllByRole("img", { name: /image to come/ }).length).toBeGreaterThanOrEqual(1);
  });
});

describe("Home night half", () => {
  it("lays out the tiers as spreads in order", () => {
    render(<Home />);
    const names = screen.getAllByRole("article").map((a) => within(a).getByRole("heading", { level: 3 }).textContent);
    expect(names).toEqual(["The Mini Call", "The Signature Call", "The Boujie Experience"]);
  });

  it("keeps the tier spreads on light grounds", () => {
    render(<Home />);
    expect(screen.getAllByRole("article").filter((a) => a.closest(".bg-ink"))).toEqual([]);
  });

  it("keeps one ink section in main", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("main .bg-ink")).toHaveLength(1);
  });


  it("keeps an unconfirmed social as plain text", () => {
    render(<Home />);
    expect(within(screen.getByRole("main")).getByText("Instagram, link to come").closest("a")).toBeNull();
  });

  it("sets the closing section on blush", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("section#waitlist")).toHaveClass("bg-blush");
  });
});

describe("Hero carousel", () => {
  const current = () => screen.getAllByRole("button", { name: /^Show slide/ }).findIndex((b) => b.getAttribute("aria-current") === "true") + 1;
  const visible = () => screen.getAllByRole("group", { hidden: true }).filter((g) => g.getAttribute("aria-hidden") !== "true");

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("starts on the first of four slides", () => {
    render(<Home />);
    expect([visible().length, current()]).toEqual([1, 1]);
  });

  it("advances to the second slide after 5 seconds", () => {
    render(<Home />);
    act(() => vi.advanceTimersByTime(5000));
    expect(current()).toBe(2);
  });

  it("stays put once paused", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: "Pause slideshow" }));
    act(() => vi.advanceTimersByTime(20000));
    expect(current()).toBe(1);
  });

  it("links the caption to the piece she wears", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "The Slip Dress · After Dark" })).toHaveAttribute("href", "/shop/the-slip-dress");
  });

  it("does not advance under reduced motion", () => {
    vi.stubGlobal("matchMedia", (q: string) => ({ matches: q.includes("reduce"), addEventListener() {}, removeEventListener() {} }));
    render(<Home />);
    act(() => vi.advanceTimersByTime(20000));
    expect(current()).toBe(1);
  });
});

describe("How it works spread", () => {
  const section = () => screen.getByRole("list", { name: "How it works" }).closest("section") as HTMLElement;

  it("sits on blush", () => {
    render(<Home />);
    expect(section()).toHaveClass("bg-blush");
  });

  it("shows the gift being opened instead of a product photo", () => {
    render(<Home />);
    expect(within(section()).getByRole("img").getAttribute("aria-label")).toBe("Hands untying the ribbon on a Boujie Call gift box, image to come");
  });
});

describe("Day to night turn", () => {
  const night = () => screen.getByRole("heading", { name: "Irresistible enough to wear that night." }).closest(".bg-ink") as HTMLElement;

  it("shows the evening photograph instead of a packshot", () => {
    render(<Home />);
    expect(within(night()).getByRole("img").getAttribute("src")).toContain("mocha-romper");
  });

  it("links the caption to The Romper", () => {
    render(<Home />);
    expect(within(night()).getByRole("link", { name: "The Romper · Mocha" })).toHaveAttribute("href", "/shop/the-romper");
  });
});

describe("De-slop", () => {
  it("renders no section markers", () => {
    render(<Home />);
    expect(screen.queryByText(/^‹ \d\d ›$/)).toBeNull();
  });

  it("keeps the tier spreads free of decorative glyphs", () => {
    render(<Home />);
    const text = (a: HTMLElement) => {
      const copy = a.cloneNode(true) as HTMLElement;
      copy.querySelectorAll("[role=img]").forEach((img) => img.remove());
      return copy.textContent ?? "";
    };
    expect(screen.getAllByRole("article").filter((a) => text(a).includes("✦"))).toEqual([]);
  });

  it("drops the How it works eyebrow", () => {
    render(<Home />);
    const section = screen.getByRole("list", { name: "How it works" }).closest("section") as HTMLElement;
    expect(within(section).queryByText("How it works", { selector: "p" })).toBeNull();
  });

  it("uses the slim pill in the mobile drawer", () => {
    const { container } = render(<SiteHeader />);
    expect(container.querySelector(".btn")).toBeNull();
  });
});

describe("Tier list", () => {
  const boxes = (c: HTMLElement) => c.querySelector("section#boxes") as HTMLElement;

  it("shows no images", () => {
    const { container } = render(<Home />);
    expect(within(boxes(container)).queryAllByRole("img")).toEqual([]);
  });

  it("sits on cream", () => {
    const { container } = render(<Home />);
    expect(boxes(container)).toHaveClass("bg-cream");
  });
});

describe("Closing section", () => {
  const close = (c: HTMLElement) => c.querySelector("section#waitlist") as HTMLElement;

  it("holds the socials", () => {
    const { container } = render(<Home />);
    expect(within(close(container)).getByRole("heading", { name: "Catch us before we drop." })).toBeInTheDocument();
  });

  it("ends on the closing line", () => {
    const { container } = render(<Home />);
    expect(within(close(container)).getByText("The call is coming. Are you going to pick up?")).toBeInTheDocument();
  });

  it("is not a centered stack", () => {
    const { container } = render(<Home />);
    expect(close(container).querySelector(".text-center")).toBeNull();
  });
});

describe("Hero polish", () => {
  const hero = () => screen.getByRole("region", { name: "The gift that makes her feel like the moment." });

  it("shows no counter text", () => {
    render(<Home />);
    expect(within(hero()).queryByText(/\d\d \/ \d\d|Pause/)).toBeNull();
  });

  it("jumps to a slide from its control", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: "Show slide 3" }));
    expect(screen.getAllByRole("group", { hidden: true })[2]).toHaveAttribute("aria-hidden", "false");
  });

  it("keeps sparkles out of the hero text", () => {
    render(<Home />);
    expect(hero().textContent).not.toContain("✦");
  });

  it("styles the hero CTA as a button", () => {
    render(<Home />);
    expect(within(hero()).getByRole("link", { name: "Shop the collection" })).toHaveClass("cta");
  });

  it("leaves nothing after the CTA label", () => {
    render(<Home />);
    expect(within(hero()).getByRole("link", { name: "Shop the collection" }).children).toHaveLength(0);
  });
});

describe("Strict pass", () => {
  it("sets step body text at 16px", () => {
    render(<Home />);
    const list = screen.getByRole("list", { name: "How it works" });
    expect(within(list).getByText(/Choose a gift tier/)).toHaveClass("text-base");
  });

  it("cuts to ink without a scroll fade", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Irresistible enough to wear that night." }).closest(".bg-ink")).not.toHaveClass("nightfall");
  });

  it("drops the line above the closing line", () => {
    render(<Home />);
    expect(screen.getByText("The call is coming. Are you going to pick up?")).not.toHaveClass("border-t-[0.5px]");
  });

  it("keeps social placeholders out of the footer", () => {
    render(<SiteFooter />);
    expect(screen.queryByText(/link to come/)).toBeNull();
  });
});

describe("Colour rhythm", () => {
  it("sets the accent words in rose", () => {
    const { container } = render(<Home />);
    const accents = [...container.querySelectorAll("main em")].filter((e) => ["receives", "brunch.", "vibe.", "drop."].includes(e.textContent ?? ""));
    expect(accents.map((e) => e.classList.contains("text-rose"))).toEqual([true, true, true, true]);
  });
});

describe("Hero split", () => {
  it("sets the hero text on a white panel", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 }).closest(".bg-white")).not.toBeNull();
  });

  it("clears the header over the hero on desktop", () => {
    render(<Home />);
    expect(screen.getByRole("banner")).toHaveClass("md:bg-transparent");
  });

  it("keeps the header white off Home", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("banner")).not.toHaveClass("md:bg-transparent");
  });

  it("centres the shop button with the nav links", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("navigation", { name: "Main" }).parentElement).toContainElement(screen.getByRole("link", { name: "Shop the collection" }));
  });
});

describe("Hero pace", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("keeps advancing while the mouse is over the hero", () => {
    render(<Home />);
    fireEvent.mouseEnter(screen.getByRole("region", { name: "The gift that makes her feel like the moment." }));
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByRole("button", { name: "Show slide 2" })).toHaveAttribute("aria-current", "true");
  });
});

describe("Hero photographs", () => {
  it("runs the four new studio photographs in casting order", () => {
    expect(heroSlides.map((s) => `${s.piece} · ${s.colorway} · ${s.src}`)).toEqual([
      "The Slip Dress · After Dark · /images/hero/black-slip-studio.webp",
      "The Romper · Powder Blue · /images/hero/blue-romper-studio.webp",
      "The Slip Dress · Rose · /images/hero/pink-slip-studio.webp",
      "The Romper · Mocha · /images/hero/brown-romper-studio.webp",
    ]);
  });

  it("points every hero image at a file in public", () => {
    expect(heroSlides.filter((s) => !existsSync(`public${s.src}`))).toEqual([]);
  });
});
