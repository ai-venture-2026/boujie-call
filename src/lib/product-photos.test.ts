import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const dir = join(process.cwd(), "public/images/products");
const stone = [0xf8, 0xd7, 0xe3];

describe("Product photos", () => {
  it.each(readdirSync(dir).filter((f) => f.endsWith(".webp")))("%s sits on #F8D7E3", async (file) => {
    const { data, info } = await sharp(join(dir, file)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const { width: w, height: h } = info;
    const border = [...Array(w).keys()].flatMap((x) => [x, (h - 1) * w + x]).concat([...Array(h).keys()].flatMap((y) => [y * w, y * w + w - 1]));
    for (const px of border) {
      const rgb = [...data.subarray(px * 3, px * 3 + 3)];
      rgb.forEach((v, i) => expect(Math.abs(v - stone[i]), `${file} pixel ${px}`).toBeLessThanOrEqual(2));
    }
  });

  const studio = join(dir, "studio");
  it.each(readdirSync(studio).filter((f) => f.endsWith(".webp")))("studio %s has #F8D7E3 top corners", async (file) => {
    const { data, info } = await sharp(join(studio, file)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    for (const px of [0, info.width - 1]) {
      const rgb = [...data.subarray(px * 3, px * 3 + 3)];
      rgb.forEach((v, i) => expect(Math.abs(v - stone[i]), `${file} pixel ${px}`).toBeLessThanOrEqual(2));
    }
  });

  it("sets the card ground to the same pink as the photos", () => {
    expect(readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8")).toMatch(/--color-stone:\s*#f8d7e3;/);
  });
});
