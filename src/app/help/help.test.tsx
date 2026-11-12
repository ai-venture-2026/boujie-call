import { render, screen, within } from "@testing-library/react";
import HelpPage from "./page";
import PrivacyPage from "../privacy/page";
import TermsPage from "../terms/page";
import sitemap from "../sitemap";
import { SiteFooter } from "@/components/site-footer";
import * as helpModule from "@/lib/help";

vi.mock("next/navigation", () => ({ notFound: () => { throw new Error("NEXT_NOT_FOUND"); }, usePathname: () => "/help" }));

const empty = helpModule.getHelp();
const filled = {
  ...empty,
  contactEmail: "hello@boujiecall.com",
  topics: [
    { q: "How long does shipping take?", a: "Three to five business days." },
    { q: "What is your returns policy?", a: null },
  ],
  privacy: { updated: "1 December 2026", sections: [{ heading: "What we collect", body: ["Your name and email when you order."] }] },
};
const use = (content: typeof empty) => vi.spyOn(helpModule, "getHelp").mockReturnValue(content);

afterEach(() => vi.restoreAllMocks());

describe("Help page", () => {
  it("does not exist before the owner sends a contact email", () => {
    expect(() => HelpPage()).toThrow("NEXT_NOT_FOUND");
  });

  it("shows the contact email as a link", () => {
    use(filled);
    render(HelpPage());
    expect(screen.getByRole("link", { name: "hello@boujiecall.com" })).toHaveAttribute("href", "mailto:hello@boujiecall.com");
  });

  it("lists only the questions that have answers", () => {
    use(filled);
    render(HelpPage());
    expect(screen.getByText("How long does shipping take?")).toBeInTheDocument();
    expect(screen.queryByText("What is your returns policy?")).toBeNull();
  });
});

describe("Policy pages", () => {
  it("keeps Privacy Policy hidden until its text exists", () => {
    expect(() => PrivacyPage()).toThrow("NEXT_NOT_FOUND");
  });

  it("keeps Terms hidden until its text exists", () => {
    expect(() => TermsPage()).toThrow("NEXT_NOT_FOUND");
  });

  it("shows the Privacy Policy sections once written", () => {
    use(filled);
    render(PrivacyPage());
    expect(screen.getByRole("heading", { level: 2, name: "What we collect" })).toBeInTheDocument();
  });

  it("dates the Privacy Policy", () => {
    use(filled);
    render(PrivacyPage());
    expect(screen.getByText("Last updated 1 December 2026")).toBeInTheDocument();
  });
});

describe("Footer Help column", () => {
  it("stays out of the footer while nothing is live", () => {
    render(<SiteFooter />);
    expect(screen.queryByRole("navigation", { name: "Help" })).toBeNull();
  });

  it("links only the live pages", () => {
    use(filled);
    render(<SiteFooter />);
    const links = within(screen.getByRole("navigation", { name: "Help" })).getAllByRole("link").map((l) => l.textContent);
    expect(links).toEqual(["Help", "Privacy Policy"]);
  });
});

describe("Sitemap help pages", () => {
  it("adds live help pages to the sitemap", () => {
    use(filled);
    expect(sitemap().map((e) => e.url)).toEqual(expect.arrayContaining(["https://boujiecall.com/help", "https://boujiecall.com/privacy"]));
  });

  it("leaves Terms out of the sitemap until written", () => {
    use(filled);
    expect(sitemap().map((e) => e.url)).not.toContain("https://boujiecall.com/terms");
  });
});
