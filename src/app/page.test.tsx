import { existsSync } from "node:fs";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import Home from "./page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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

  it("links TikTok to the placeholder handle", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "TikTok" })).toHaveAttribute("href", "https://www.tiktok.com/@boujiecall");
  });

  it("links Instagram to the placeholder handle", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "https://www.instagram.com/boujiecall");
  });

  it("keeps Discover the piece outlined", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "Discover the piece" })).not.toHaveClass("cta-primary");
  });

  it("sets View all pieces as a text link", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "View all pieces" })).toHaveClass("link", "label", "text-ink", "min-h-11");
  });

  it("drops the pill from View all pieces", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "View all pieces" })).not.toHaveClass("cta");
  });
});

const pages = ["Home", "Shop", "Send a Call", "About"];
const linkNames = (nav: HTMLElement) => within(nav).getAllByRole("link").map((l) => l.textContent);

describe("SiteHeader", () => {
  it("gives the menu button a 44px target", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveClass("size-11");
  });

  it("gives the logo link a 44px target", () => {
    render(<SiteHeader />);
    expect(screen.getAllByRole("link", { name: "Boujie Call home" })[0]).toHaveClass("min-h-11");
  });

  it("lists the four pages in the main nav", () => {
    render(<SiteHeader />);
    expect(linkNames(screen.getByRole("navigation", { name: "Main" }))).toEqual(pages);
  });

  it("points Shop the collection at the shop", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Shop the collection" })).toHaveAttribute("href", "/shop");
  });

  it("shows the pink logo", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("img", { name: "Boujie Call" })).toHaveClass("bg-pink");
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

  it("signs off with the BC monogram", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("img", { name: "Boujie Call" }).className).toContain("monogram");
  });

  it("links the pieces from the Shop column", () => {
    render(<SiteFooter />);
    expect(linkNames(screen.getByRole("navigation", { name: "Shop" }))).toEqual(["The Slip Dress", "The Boujie Set", "The Romper", "All pieces"]);
  });

  it("signs off with the brand line", () => {
    render(<SiteFooter />);
    expect(screen.getByText("Luxury nightwear gifts.")).toHaveClass("font-serif", "italic");
  });

  it("puts the monogram first for screen readers", () => {
    render(<SiteFooter />);
    const monogram = screen.getByRole("img", { name: "Boujie Call" });
    expect(monogram.compareDocumentPosition(screen.getByRole("navigation", { name: "Shop" })) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("gives footer links a 44px target on phones", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveClass("max-md:min-h-11");
  });

  it("sets footer links at 16px on phones", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveClass("max-md:text-base");
  });

  it("hides the handles under the monogram on phones", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "TikTok @boujiecall" }).closest("ul")).toHaveClass("max-md:hidden");
  });

  it("shows the social handles under the monogram", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "TikTok @boujiecall" })).toHaveAttribute("href", "https://www.tiktok.com/@boujiecall");
  });

  it("keeps the footer free of forms", () => {
    render(<SiteFooter />);
    expect(within(screen.getByRole("contentinfo")).queryByRole("textbox")).toBeNull();
  });

});

describe("Home signup", () => {
  it("leaves the waitlist off Home", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("section#waitlist")).toBeNull();
  });

  it("keeps email fields off Home", () => {
    render(<Home />);
    expect(screen.queryByLabelText("Email address")).toBeNull();
  });

  it("keeps the ruled out words off Home", () => {
    const { container } = render(<Home />);
    expect(container.textContent).not.toMatch(/purchase|\bitems?\b|\bcart\b|\border\b|!/i);
  });
});

describe("Bag link", () => {
  beforeEach(() => localStorage.clear());

  it("names the live piece count", () => {
    localStorage.setItem(BAG_KEY, JSON.stringify([{ slug: "the-romper", colorway: "Rose", size: "S", qty: 2 }]));
    render(<SiteHeader />);
    expect(screen.getByRole("button", { name: "Your bag, 2 pieces" })).toHaveAttribute("aria-expanded", "false");
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
});

describe("Home night half", () => {
  it("sets the hero on ink", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 }).closest("[data-nav=dark]")).toHaveClass("bg-ribbon");
  });


  it("sets the closing section on Cream Lace", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("section#closing")).toHaveClass("bg-cream");
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
    expect(screen.getAllByRole("link", { name: "The Slip Dress · After Dark" })[0]).toHaveAttribute("href", "/shop/the-slip-dress");
  });

  it("does not advance under reduced motion", () => {
    vi.stubGlobal("matchMedia", (q: string) => ({ matches: q.includes("reduce"), addEventListener() {}, removeEventListener() {} }));
    render(<Home />);
    act(() => vi.advanceTimersByTime(20000));
    expect(current()).toBe(1);
  });
});

describe("De-slop", () => {
  it("renders no section markers", () => {
    render(<Home />);
    expect(screen.queryByText(/^‹ \d\d ›$/)).toBeNull();
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

describe("Closing section", () => {
  const close = (c: HTMLElement) => c.querySelector("section#closing") as HTMLElement;

  it("sets the banner photo in the closing section", () => {
    const { container } = render(<Home />);
    expect(within(close(container)).getByRole("img").getAttribute("src")).toContain("blue-romper-banner");
  });

  it("offers an outlined Shop the collection pill in the closing section", () => {
    const { container } = render(<Home />);
    expect(within(close(container)).getByRole("link", { name: "Shop the collection" })).not.toHaveClass("cta-primary");
  });

  it("sends the closing pill to the shop", () => {
    const { container } = render(<Home />);
    expect(within(close(container)).getByRole("link", { name: "Shop the collection" })).toHaveAttribute("href", "/shop");
  });

  it("keeps the closing headline", () => {
    const { container } = render(<Home />);
    expect(within(close(container)).getByRole("heading", { level: 2 })).toHaveTextContent("Be first to receive a Boujie Call.");
  });

  it("sets the closing words in ink over the photo", () => {
    const { container } = render(<Home />);
    expect(close(container).querySelector(".text-rose, .text-pink")).toBeNull();
  });

  it("ends on the closing line", () => {
    const { container } = render(<Home />);
    expect(within(close(container)).getByText("The pieces are here. Find the one that feels like her.")).toBeInTheDocument();
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

  it("fills the hero CTA in pink", () => {
    render(<Home />);
    expect(within(hero()).getByRole("link", { name: "Shop the collection" })).toHaveClass("cta-primary");
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

  it("drops the line above the closing line", () => {
    render(<Home />);
    expect(screen.getByText("The pieces are here. Find the one that feels like her.")).not.toHaveClass("border-t-[0.5px]");
  });

  it("keeps social placeholders out of the footer", () => {
    render(<SiteFooter />);
    expect(screen.queryByText(/link to come/)).toBeNull();
  });
});

describe("Piece cards on phones", () => {
  it("stacks the colorway count under the price below sm", () => {
    render(<Home />);
    const count = within(screen.getByRole("list", { name: "Pieces" })).getAllByText("3 colorways")[0];
    expect(count.parentElement).toHaveClass("flex-col", "sm:flex-row");
  });

  it("sets the card price at body size", () => {
    render(<Home />);
    expect(within(screen.getByRole("list", { name: "Pieces" })).getAllByText("$48.00")[0]).toHaveClass("text-base");
  });
});

describe("Typography", () => {
  it("lets every Home label take the shared label size", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll('[class*="text-[10px]"], [class*="md:text-xs"]')).toHaveLength(0);
  });

  it("sets piece names in Cormorant 500", () => {
    render(<Home />);
    expect(within(screen.getByRole("list", { name: "Pieces" })).getByRole("heading", { name: "The Slip Dress" })).toHaveClass("font-medium");
  });

  it("sets step titles in Cormorant 500", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Place the Call" })).toHaveClass("font-medium");
  });

  it("sets Home prices in DM Sans 500", () => {
    render(<Home />);
    expect(within(screen.getByRole("list", { name: "Pieces" })).getAllByText("$48.00")[0]).toHaveClass("font-sans", "font-medium");
  });

});

describe("Colour rhythm", () => {
  it("sets the dark section accent in pink", () => {
    render(<Home />);
    expect(screen.getByText("receives")).toHaveClass("text-pink");
  });

  it("sets the light section accent in rose", () => {
    render(<Home />);
    expect(screen.getByText("pieces")).toHaveClass("text-rose");
  });

  it("sets the gift section on Black Ribbon", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /Someone places a call/ }).closest("section")).toHaveClass("bg-ribbon");
  });

  it("fills only the hero pill on Home", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("main .cta-primary")).toHaveLength(1);
  });
});

describe("Hero split", () => {
  it("sets the hero text on ink", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 }).closest("[data-hero-words]")).toHaveClass("md:bg-ribbon");
  });

  it("sets the header on ink", () => {
    render(<Home />);
    expect(screen.getByRole("banner")).toHaveClass("bg-ribbon");
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

describe("Home rebuild round 1", () => {
  it("keeps the gift tiers off Home", () => {
    render(<Home />);
    expect(screen.queryByText("The Signature Call")).toBeNull();
  });

  it("pairs The Romper in Mocha with a close-up of its lace", () => {
    render(<Home />);
    expect(screen.getByRole("img", { name: /close-up of the brown lace/ })).toBeInTheDocument();
  });

  it("links the detail button to The Romper", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "Discover the piece" })).toHaveAttribute("href", "/shop/the-romper");
  });

  it("keeps hero photos out of the strip", () => {
    const { container } = render(<Home />);
    const srcs = [...container.querySelectorAll("[data-strip] img")].map((i) => decodeURIComponent(i.getAttribute("src") ?? ""));
    expect(srcs.filter((s) => s.includes("/images/hero/"))).toEqual([]);
  });

  it("shows the new close-up in section two", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("#detail img[alt*='hip']")?.getAttribute("src")).toContain("brown-romper-hip");
  });

  it("runs a strip of five photos under the statement", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("[data-strip] img")).toHaveLength(5);
  });

  it("sets the footer on ink", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("contentinfo")).toHaveAttribute("data-nav", "dark");
  });
});

describe("Home rebuild round 2", () => {
  it("keeps each piece name on one line", () => {
    render(<Home />);
    expect(within(screen.getByRole("list", { name: "Pieces" })).getByRole("heading", { name: "The Boujie Set" })).toHaveClass("truncate");
  });

  it("centers a single last piece card on phones", () => {
    render(<Home />);
    expect(within(screen.getByRole("list", { name: "Pieces" })).getAllByRole("listitem").at(-1)).toHaveClass("max-sm:last:odd:justify-self-center");
  });

  it("keeps the moment heading in sentence case on phones", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /Someone places a call/ }).className.split(" ")).not.toContain("uppercase");
  });

  it("sets the moment heading in capitals on desktop", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /Someone places a call/ })).toHaveClass("md:uppercase");
  });

  it("links each piece in the pieces grid", () => {
    render(<Home />);
    const grid = screen.getByRole("region", { name: "The pieces" });
    expect(within(grid).getAllByRole("link").map((l) => l.getAttribute("href"))).toEqual(["/shop", "/shop/the-slip-dress", "/shop/the-romper", "/shop/the-boujie-set"]);
  });

  it("lists the pieces as three equal cards with the unphotographed one last", () => {
    render(<Home />);
    const cards = within(screen.getByRole("list", { name: "Pieces" })).getAllByRole("heading");
    expect(cards.map((c) => c.textContent)).toEqual(["The Slip Dress", "The Romper", "The Boujie Set"]);
  });

  it("accents the closing headline in deep rose", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("section#closing h2 em")).toHaveClass("text-rose-deep");
  });
});

describe("Nav position", () => {
  it("holds the desktop nav inside the header", () => {
    const { container } = render(<SiteHeader />);
    expect(container.querySelector("nav[aria-label=Main]")?.parentElement).toHaveClass("md:absolute");
  });

  it("opens the header with the offer bar", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("banner").firstElementChild).toHaveTextContent("Free shipping on 2 or more. Any 2 for $85.");
  });

  it("sets the offer bar on Dusty Rose", () => {
    render(<SiteHeader />);
    expect(screen.getAllByText("Free shipping on 2 or more. Any 2 for $85.")[0]).toHaveClass("bg-dusty", "text-ribbon", "tracking-[0.12em]");
  });

  it("tints the footer monogram pink", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("img", { name: "Boujie Call" })).toHaveClass("bg-pink");
  });
});

describe("Home on phones", () => {
  it("lays the pieces in two columns", () => {
    render(<Home />);
    expect(screen.getByRole("list", { name: "Pieces" })).toHaveClass("grid-cols-2");
  });

  it("sets the hero words over the photo", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 }).closest("[data-hero-words]")).toHaveClass("max-md:absolute", "max-md:bg-[linear-gradient(to_top,color-mix(in_srgb,var(--color-ribbon)_90%,transparent),color-mix(in_srgb,var(--color-ribbon)_75%,transparent)_calc(100%-10rem),transparent)]");
  });

  it("left-aligns View all pieces under the subtitle on phones", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "View all pieces" })).toHaveClass("self-start", "md:self-auto");
  });

  it("centers View all pieces on the heading row", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "View all pieces" }).parentElement).toHaveClass("md:items-center", "md:justify-between");
  });

  it("frames every piece card with a hairline", () => {
    render(<Home />);
    const frames = within(screen.getByRole("list", { name: "Pieces" })).getAllByRole("link").map((a) => a.firstElementChild);
    expect(frames.every((f) => f?.classList.contains("border-card-border"))).toBe(true);
  });

  it("spaces the gift section with the fluid section token", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /Someone places a call/ }).closest("section")).toHaveClass("py-18", "md:py-section");
  });

  it("spaces the pieces section with the section token", () => {
    render(<Home />);
    expect(screen.getByRole("region", { name: /pieces/i })).toHaveClass("py-18", "md:py-section");
  });

  it("lays the gift strip in two columns", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("[data-strip]")).toHaveClass("grid-cols-2");
  });
});

describe("Home without the brunch and night pair", () => {
  it("leaves the pair region off Home", () => {
    render(<Home />);
    expect(screen.queryByRole("region", { name: "From brunch to after dark" })).toBeNull();
  });

  it("leaves the brunch headline off Home", () => {
    render(<Home />);
    expect(screen.queryByRole("heading", { name: "Cute enough to open at brunch." })).toBeNull();
  });

  it("leaves the night headline off Home", () => {
    render(<Home />);
    expect(screen.queryByRole("heading", { name: "Irresistible enough to wear that night." })).toBeNull();
  });
});

describe("Phone menu", () => {
  const open = () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    return screen.getByRole("dialog");
  };

  it("opens as a full-screen cream panel", () => {
    expect(open()).toHaveClass("bg-cream", "w-full");
  });

  it("shows the collection photo as a way into the shop", () => {
    expect(within(open()).getByRole("link", { name: "The collection" })).toHaveAttribute("href", "/shop");
  });

  it("carries the offer line", () => {
    expect(within(open()).getByText("Free shipping on 2 or more. Any 2 for $85.")).toBeInTheDocument();
  });

  it("links Instagram from the menu", () => {
    expect(within(open()).getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "https://www.instagram.com/boujiecall");
  });
});

describe("Sharp photos on phones", () => {
  const sizesOf = (img: Element | null) => img?.getAttribute("sizes") ?? "";

  it("asks for a hero photo as wide as it is drawn", () => {
    render(<Home />);
    expect(sizesOf(screen.getAllByRole("img", { name: /The Slip Dress|The Romper/ })[0])).toContain("150vh");
  });

  it("asks for a closing banner as wide as it is drawn", () => {
    const { container } = render(<Home />);
    expect(sizesOf(container.querySelector("section#closing img"))).toContain("270vw");
  });

  it("asks for the section two close-up as wide as it is drawn", () => {
    const { container } = render(<Home />);
    expect(sizesOf(container.querySelector("#detail img[alt*='hip']"))).toContain("190vw");
  });
});

const blendedProductPhotos = (root: Element) => {
  const photos = [...root.querySelectorAll("img")].filter((img) => /images(\/|%2F)products/.test(img.getAttribute("src") ?? ""));
  expect(photos.length).toBeGreaterThan(0);
  return photos.filter((img) => img.classList.contains("mix-blend-multiply"));
};

describe("Home photo ground", () => {
  it("shows home product photos without a blend", () => {
    const { container } = render(<Home />);
    expect(blendedProductPhotos(container)).toEqual([]);
  });
});
