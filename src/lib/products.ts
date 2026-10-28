// THE PRODUCT DATA FILE. Fallback catalog until the Shopify Storefront API is connected.
// Every name, price, colorway and photo for the shop lives here. Prices are in cents
// (4800 = $48.00). Add photo paths to each colorway's images when photography arrives.

export type Colorway = {
  name: string;
  hex: string;
  // Optional CSS background for prints; plain colorways use hex.
  swatch?: string;
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

const sizes = ["S", "M", "L", "XL"];

// Hex values are stand-ins until product photos exist.
const rose: Colorway = { name: "Rose", hex: "#f2a7c3", images: [] };
const afterDark: Colorway = { name: "After Dark", hex: "#141014", images: [] };
const powderBlue: Colorway = { name: "Powder Blue", hex: "#b9d3ea", images: [] };
const mocha: Colorway = { name: "Mocha", hex: "#4a2c22", images: [] };
const bloom: Colorway = {
  name: "Bloom",
  hex: "#ffffff",
  swatch: "radial-gradient(circle, #f7b8cc 1.5px, transparent 2px) 0 0 / 9px 9px, radial-gradient(circle, #bfe6d2 1.5px, transparent 2px) 4.5px 4.5px / 9px 9px, #ffffff",
  images: [],
};

export const products: Product[] = [
  {
    slug: "the-slip-dress",
    name: "The Slip Dress",
    priceCents: 4800,
    placeholderPrice: false,
    description: "The one she reaches for when the night is hers. A soft, fluid slip that skims and moves with her.",
    fabric: "Satin with lace trim.",
    care: "Hand wash cold, lay flat to dry.",
    colorways: [rose, afterDark, bloom],
    sizes,
  },
  {
    slug: "the-boujie-set",
    name: "The Boujie Set",
    priceCents: 4800,
    placeholderPrice: false,
    description: "A satin cami and shorts set, cute enough for brunch and soft enough to sleep in.",
    fabric: "Satin with lace trim.",
    care: "Hand wash cold, lay flat to dry.",
    colorways: [afterDark, powderBlue, rose],
    sizes,
  },
  {
    slug: "the-romper",
    name: "The Romper",
    priceCents: 4800,
    placeholderPrice: false,
    description: "One piece, zero effort. Soft, flirty, and made to be lived in.",
    fabric: "Stretch satin with lace trim.",
    care: "Hand wash cold, lay flat to dry.",
    colorways: [powderBlue, mocha, afterDark, rose],
    sizes,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const OFFER = "Free shipping on 2 or more. Any 2 for $85.";
