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
  // Shop grid and product page photos with their alt view; Home and the bag keep images.
  gallery?: { src: string; view: string }[];
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
  // Live from Shopify, keyed "Colorway/Size": 0 sold out, n left, null in stock with no count.
  stock?: Record<string, number | null>;
  // Shopify answered but does not sell this piece.
  comingSoon?: boolean;
};

export const MAX_QTY = 10;

export const stockKey = (colorway: string, size: string) => `${colorway}/${size}`;

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

export const colorwaySlug = (name: string) => name.toLowerCase().replaceAll(" ", "-");

// Cutouts live in public/images/products as <slug>-<colorway>.webp, studio photos in studio/<slug>-<colorway>-<view>.webp.
const photographed = (slug: string, colorways: Colorway[], studio: Record<string, string[]>): Colorway[] =>
  colorways.map((c) => {
    const name = `${slug}-${colorwaySlug(c.name)}`;
    const cutout = `/images/products/${name}.webp`;
    const views = (studio[c.name] ?? []).map((view) => ({ src: `/images/products/studio/${name}-${view}.webp`, view }));
    return { ...c, images: [cutout], gallery: [...views, { src: cutout, view: "on its own" }] };
  });

const frontBack = ["front", "back"];

export const products: Product[] = [
  {
    slug: "the-slip-dress",
    name: "The Slip Dress",
    priceCents: 4800,
    placeholderPrice: false,
    description: "The one she reaches for when the night is hers. A soft, fluid slip that skims and moves with her.",
    fabric: "Satin with lace trim.",
    care: "Hand wash cold, lay flat to dry.",
    colorways: photographed("the-slip-dress", [rose, afterDark, bloom], { Rose: frontBack, "After Dark": frontBack, Bloom: frontBack }),
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
    colorways: photographed("the-boujie-set", [afterDark, powderBlue, rose], { "After Dark": frontBack, "Powder Blue": ["front", "side"], Rose: frontBack }),
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
    colorways: photographed("the-romper", [powderBlue, mocha, afterDark, rose], { "Powder Blue": frontBack, Mocha: frontBack, "After Dark": frontBack, Rose: ["front", "back", "side"] }),
    sizes,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const OFFER = "Free shipping on 2 or more. Any 2 for $85.";
