import { readFileSync } from "node:fs";
import { fireEvent, render, screen } from "@testing-library/react";
import NotFound from "./not-found";
import robots from "./robots";
import ErrorPage from "./error";
import { indexing } from "@/lib/content";
import sitemap from "./sitemap";
import { metadata } from "./layout";

vi.mock("next/font/google", () => ({ Cormorant_Garamond: () => ({ variable: "" }), DM_Sans: () => ({ variable: "" }) }));

describe("404 page", () => {
  it("says the page didn't pick up", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("This page didn't pick up.");
  });

  it("links back home", () => {
    render(<NotFound />);
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
  });
});

describe("sitemap", () => {
  it("lists only the pages that exist", () => {
    expect(sitemap().map((e) => e.url)).toEqual([
      "https://boujiecall.com/",
      "https://boujiecall.com/shop",
      "https://boujiecall.com/send-a-call",
      "https://boujiecall.com/about",
      "https://boujiecall.com/shop/the-slip-dress",
      "https://boujiecall.com/shop/the-boujie-set",
      "https://boujiecall.com/shop/the-romper",
    ]);
  });
});

describe("robots", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("points crawlers to the sitemap", () => {
    expect(robots().sitemap).toBe("https://boujiecall.com/sitemap.xml");
  });

  it("opens the live site to search engines", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    expect(robots().rules).toEqual({ userAgent: "*", allow: "/" });
  });

  it("closes previews to search engines", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    expect(robots().rules).toEqual({ userAgent: "*", disallow: "/" });
  });

  it("marks pages noindex off the live site", () => {
    expect(indexing({ VERCEL_ENV: "preview" })).toEqual({ index: false, follow: false });
  });

  it("leaves indexing alone on the live site", () => {
    expect(indexing({ VERCEL_ENV: "production" })).toBeUndefined();
  });
});

describe("error page", () => {
  it("offers to try again", () => {
    const reset = vi.fn();
    render(<ErrorPage error={new Error("x")} reset={reset} />);
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(reset).toHaveBeenCalled();
  });

  it("links back to the shop", () => {
    render(<ErrorPage error={new Error("x")} reset={() => {}} />);
    expect(screen.getByRole("link", { name: "Back to the shop" })).toHaveAttribute("href", "/shop");
  });
});

describe("share metadata", () => {
  it("resolves URLs against boujiecall.com", () => {
    expect(String(metadata.metadataBase)).toBe("https://boujiecall.com/");
  });

  it("ships a 1200 by 630 share image", () => {
    const png = readFileSync("src/app/opengraph-image.png");
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
  });

  it("describes the share image for screen readers", () => {
    expect(readFileSync("src/app/opengraph-image.alt.txt", "utf8")).toMatch(/gift box/);
  });
});

describe("404 button", () => {
  it("uses the slim pill", () => {
    const { container } = render(<NotFound />);
    expect(container.querySelector(".btn")).toBeNull();
  });
});
