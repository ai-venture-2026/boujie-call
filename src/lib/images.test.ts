import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const sources = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const path = join(dir, e.name);
    if (e.isDirectory()) return sources(path);
    return /\.tsx?$/.test(e.name) && !e.name.includes(".test.") ? [path] : [];
  });

const imagePaths = sources("src").flatMap((file) => readFileSync(file, "utf8").match(/\/images\/[\w./-]+\.(?:webp|png)/g) ?? []);

describe("Public images", () => {
  it("keeps one folder per use", () => {
    expect(readdirSync("public/images").sort()).toEqual(["about", "banners", "brand", "details", "gift-strip", "hero", "products", "send-a-call"]);
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

const pinkSwaps: [string, string, number, number][] = [
  ["public/images/hero/black-slip-studio.webp", "assets/shoot/hero/hero-1-black-slip.png", 0.05, 0.05],
  ["public/images/hero/blue-romper-studio.webp", "assets/shoot/hero/hero-2-blue-romper.png", 0.05, 0.05],
  ["public/images/hero/pink-slip-studio.webp", "assets/shoot/hero/hero-3-pink-slip.png", 0.05, 0.05],
  ["public/images/hero/brown-romper-studio.webp", "assets/shoot/hero/hero-4-brown-romper.png", 0.05, 0.05],
  ["public/images/gift-strip/ribbon.webp", "assets/shoot/home/strip-a-ribbon.png", 0.05, 0.05],
  ["public/images/gift-strip/open-box.webp", "assets/shoot/home/strip-b-open-box.png", 0.1, 0.95],
  ["public/images/gift-strip/card.webp", "assets/shoot/home/strip-c-card.png", 0.95, 0.5],
  ["public/images/gift-strip/unboxing.webp", "assets/shoot/home/strip-d-unboxing.png", 0.95, 0.05],
  ["public/images/gift-strip/mist.webp", "assets/shoot/home/strip-e-mist.png", 0.05, 0.05],
  ["public/images/details/brown-romper-hip.webp", "assets/shoot/home/section-2-mocha-romper.png", 0.05, 0.05],
  ["public/images/send-a-call/hero-rose-slip.webp", "assets/shoot/pages/send-a-call-hero-rose-slip.png", 0.05, 0.05],
  ["public/images/banners/blue-romper-banner.webp", "assets/shoot/banners/home-banner-blue-romper.png", 0.05, 0.05],
];

const groundHue = async (file: string, fx: number, fy: number) => {
  const { width = 0, height = 0 } = await sharp(file).metadata();
  const size = Math.max(8, Math.round(width / 40));
  const left = Math.min(width - size, Math.max(0, Math.round(fx * width) - size / 2));
  const top = Math.min(height - size, Math.max(0, Math.round(fy * height) - size / 2));
  const { channels } = await sharp(file).extract({ left: Math.round(left), top: Math.round(top), width: size, height: size }).stats();
  const [r, g, b] = channels.map((c) => c.mean);
  const max = Math.max(r, g, b);
  const d = max - Math.min(r, g, b);
  if (d === 0) return { hue: 0, sat: 0 };
  const hue = max === r ? (((g - b) / d) % 6) * 60 : max === g ? ((b - r) / d + 2) * 60 : ((r - g) / d + 4) * 60;
  return { hue: (hue + 360) % 360, sat: d / max };
};

describe("Pink batch swap", () => {
  it.each(pinkSwaps.flatMap(([web, shoot, x, y]) => [[web, x, y], [shoot, x, y]] as [string, number, number][]))("%s sits on soft pink", async (file, x, y) => {
    const { hue, sat } = await groundHue(file, x, y);
    expect(sat).toBeGreaterThan(0.04);
    expect(hue >= 300 || hue <= 15, `hue ${hue.toFixed(1)}`).toBe(true);
  });

  it("empties the drop folder down to its README", () => {
    expect(readdirSync("assets/pink-batch")).toEqual(["README.md"]);
  });

  it("lists only the three photos still waiting for pink", () => {
    const readme = readFileSync("assets/pink-batch/README.md", "utf8");
    const waiting = readme.split("## Staying")[0].match(/^\| [\w/-]+\.webp/gm) ?? [];
    expect(waiting.map((row) => row.slice(2)).sort()).toEqual(["about/hero-blue-romper.webp", "about/story-after-dark.webp", "details/brown-romper-lace.webp"]);
  });
});
