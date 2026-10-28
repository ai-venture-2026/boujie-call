import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";
import robots from "./robots";
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
      "https://boujiecall.com/shop/the-slip-dress",
      "https://boujiecall.com/shop/the-boujie-set",
      "https://boujiecall.com/shop/the-romper",
    ]);
  });
});

describe("robots", () => {
  it("points crawlers to the sitemap", () => {
    expect(robots().sitemap).toBe("https://boujiecall.com/sitemap.xml");
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
});

describe("404 button", () => {
  it("uses the slim pill", () => {
    const { container } = render(<NotFound />);
    expect(container.querySelector(".btn")).toBeNull();
  });
});
