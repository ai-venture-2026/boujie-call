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
  fabric: string | null;
  care: string | null;
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

// Every link into a product page names the colour it shows, so the page opens on it.
export const productHref = (slug: string, colour: string) => `/shop/${slug}?colorway=${colorwaySlug(colour)}`;

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
    description: "The one you reach for when the night is yours.",
    fabric: null,
    care: null,
    colorways: photographed("the-slip-dress", [rose, afterDark, bloom], { Rose: frontBack, "After Dark": frontBack, Bloom: frontBack }),
    sizes,
  },
  {
    slug: "the-boujie-set",
    name: "The Boujie Set",
    priceCents: 4800,
    placeholderPrice: false,
    description: "A cami and shorts set, cute enough for brunch and soft enough to sleep in.",
    fabric: null,
    care: null,
    colorways: photographed("the-boujie-set", [afterDark, powderBlue, rose], { "After Dark": frontBack, "Powder Blue": ["front", "side"], Rose: frontBack }),
    sizes,
  },
  {
    slug: "the-romper",
    name: "The Romper",
    priceCents: 4800,
    placeholderPrice: false,
    description: "One piece, zero effort. Soft, flirty, and made to be lived in.",
    fabric: null,
    care: null,
    colorways: photographed("the-romper", [powderBlue, mocha, afterDark, rose], { "Powder Blue": frontBack, Mocha: frontBack, "After Dark": frontBack, Rose: frontBack }),
    sizes,
  },
];

// A colour counts as sold out only when every size is known to be at 0; unknown counts stay buyable.
export function availability(product: Product, colour: string): "Coming soon" | "Sold out" | null {
  if (product.comingSoon) return "Coming soon";
  return product.sizes.length > 0 && product.sizes.every((s) => product.stock?.[stockKey(colour, s)] === 0) ? "Sold out" : null;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

// Facts the owner has not confirmed stay null and their lines stay hidden; her answers go here (Alex, 2026-11-13).
export const getOffer = (): string | null => null;

// Vendor garment measurements in cm, laid flat, from the size chart Alex sent on 2026-11-24. The vendor lists bust,
// waist and hem as half widths, doubled here; leg opening and front length are listed whole. The Boujie Set chart was unreadable.
const garment: Record<string, { columns: string[]; cm: Record<string, number[]> }> = {
  "the-slip-dress": {
    columns: ["Bust", "Waist", "Hem", "Front length"],
    cm: { S: [70, 57.6, 83, 58.5], M: [74, 61.6, 87, 60.3], L: [78, 65.6, 91, 62.1], XL: [82, 69.6, 95, 63.9] },
  },
  "the-romper": {
    columns: ["Bust", "Waist", "Leg opening"],
    cm: { S: [57, 47.4, 43.5], M: [61, 51.4, 45.06], L: [65, 55.4, 46.62], XL: [69, 59.4, 48.18] },
  },
};

const inchesAndCm = (cm: number) => `${(cm / 2.54).toFixed(1)} / ${Number(cm.toFixed(1))}`;

export const getSizeColumns = (slug: string): string[] => garment[slug]?.columns ?? [];

export const getSizeChart = (slug: string): Record<string, string[]> | null => {
  const chart = garment[slug];
  return chart ? Object.fromEntries(Object.entries(chart.cm).map(([size, cm]) => [size, cm.map(inchesAndCm)])) : null;
};
