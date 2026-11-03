import { readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const dir = join(process.cwd(), "public/images/products");
const stone = [0xf9, 0xee, 0xf2];

describe("Product photos", () => {
  it.each(readdirSync(dir).filter((f) => f.endsWith(".webp")))("%s sits on #F9EEF2", async (file) => {
    const { data, info } = await sharp(join(dir, file)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const corners = [0, info.width - 1, (info.height - 1) * info.width, info.height * info.width - 1];
    for (const px of corners) {
      const rgb = [...data.subarray(px * 3, px * 3 + 3)];
      rgb.forEach((v, i) => expect(Math.abs(v - stone[i])).toBeLessThanOrEqual(2));
    }
  });
});
