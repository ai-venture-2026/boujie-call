import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const sources = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const path = join(dir, e.name);
    if (e.isDirectory()) return sources(path);
    return /\.tsx?$/.test(e.name) && !e.name.includes(".test.") ? [path] : [];
  });

const imagePaths = sources("src").flatMap((file) => readFileSync(file, "utf8").match(/\/images\/[\w./-]+\.(?:webp|png)/g) ?? []);

describe("Public images", () => {
  it("keeps one folder per use", () => {
    expect(readdirSync("public/images").sort()).toEqual(["about", "banners", "brand", "brunch-night", "details", "gift-strip", "hero", "products", "send-a-call"]);
  });

  it("keeps no images loose in public", () => {
    expect(readdirSync("public").filter((f) => /\.(?:png|webp|jpe?g|svg)$/.test(f))).toEqual([]);
  });

  it("points every image path in src at a file in public", () => {
    expect(imagePaths.filter((p) => !existsSync(`public${p}`))).toEqual([]);
  });

  it("keeps the logo files in brand", () => {
    expect(["logo-ink.png", "logo-pink.png", "monogram-ink.png"].filter((f) => !existsSync(`public/images/brand/${f}`))).toEqual([]);
  });
});
