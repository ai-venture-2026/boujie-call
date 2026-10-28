// THE PRODUCT DATA FILE. Every name, price, colorway and photo for the shop lives here.
// To go live: replace the placeholder names, set real prices in cents (4800 = $48.00)
// and set placeholderPrice to false, then add photo paths to each colorway's images.

export type Colorway = {
  name: string;
  hex: string;
  // Photo paths in /public, in gallery order. Empty shows placeholder frames.
  images: string[];
};

export type Product = {
  slug: string;
  name: string;
  priceCents: number;
  placeholderPrice: boolean;
  description: string;
  fabric: string;
  care: string;
  // Any number of colorways per piece.
  colorways: Colorway[];
  sizes: string[];
};

const sizes = ["XS", "S", "M", "L", "XL"];

// Placeholder colorways drawn from the brand palette.
const blushSilk: Colorway = { name: "Blush silk", hex: "#fde8f0", images: [] };
const afterDark: Colorway = { name: "After dark", hex: "#141014", images: [] };
const creamLace: Colorway = { name: "Cream lace", hex: "#fff8fb", images: [] };
const boujiePink: Colorway = { name: "Boujie pink", hex: "#f2a7c3", images: [] };
const blackRibbon: Colorway = { name: "Black ribbon", hex: "#1a1018", images: [] };

export const products: Product[] = [
  {
    slug: "the-slip-dress",
    name: "The Slip Dress",
    priceCents: 4800,
    placeholderPrice: true,
    description: "The one she reaches for when the night is hers. A soft, fluid slip that skims and moves with her.",
    fabric: "Satin with lace trim.",
    care: "Hand wash cold, lay flat to dry.",
    colorways: [blushSilk, afterDark, creamLace],
    sizes,
  },
  {
    slug: "the-boujie-set",
    name: "The Boujie Set",
    priceCents: 4800,
    placeholderPrice: true,
    description: "A satin cami and shorts set, cute enough for brunch and soft enough to sleep in.",
    fabric: "Satin with lace trim.",
    care: "Hand wash cold, lay flat to dry.",
    colorways: [boujiePink, blackRibbon, creamLace],
    sizes,
  },
  {
    slug: "the-romper",
    name: "The Romper",
    priceCents: 4800,
    placeholderPrice: true,
    description: "One piece, zero effort. Soft, flirty, and made to be lived in.",
    fabric: "Stretch satin with lace trim.",
    care: "Hand wash cold, lay flat to dry.",
    colorways: [blushSilk, afterDark, boujiePink, creamLace],
    sizes,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
