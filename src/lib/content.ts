export type Tier = { name: string; priceCents: number | null; contents: string };
export type Social = { label: string; url: string | null };

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function formatPrice(cents: number | null): string {
  if (cents === null) return "Price to come";
  if (cents < 0) throw new RangeError(`price cannot be negative: ${cents}`);
  return usd.format(cents / 100);
}

export const steps = [
  {
    title: "Place the Call",
    body: "Choose a gift tier and write her a personal message. All you need is her name and email.",
  },
  {
    title: "She gets the Call",
    body: "She receives a beautiful notification with your message inside and a link to claim her gift.",
  },
  {
    title: "She picks up",
    body: "She chooses her size and style, and we ship it, beautifully wrapped, to her door.",
  },
];

// Prices stay null until the client confirms them.
export const tiers: Tier[] = [
  { name: "The Mini Call", priceCents: null, contents: "Satin sleep set, body mist, message card, luxury box." },
  { name: "The Signature Call", priceCents: null, contents: "Everything in the Mini, plus a forever rose and black satin ribbon." },
  { name: "The Boujie Experience", priceCents: null, contents: "Everything in the Signature, plus a silk mask, mini candle and premium box." },
];

// URLs stay null until the client confirms the handles.
export const socials: Social[] = [
  { label: "TikTok", url: null },
  { label: "Instagram", url: null },
];

export const pages = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/send-a-call", label: "Send a Call" },
  { href: "/about", label: "About" },
];

export const SITE_URL = "https://boujiecall.com";

// Home hero photos. "text" is the type colour that reads on the photo's empty left side.
export type HeroSlide = { src: string; alt: string; slug: string; piece: string; colorway: string; focus: string; text: "ink" | "cream" };

export const heroSlides: HeroSlide[] = [
  { src: "/images/hero/black-slip-studio.webp", alt: "A woman laughs, turning away, in The Slip Dress in After Dark", slug: "the-slip-dress", piece: "The Slip Dress", colorway: "After Dark", focus: "48% 40%", text: "ink" },
  { src: "/images/hero/blue-romper-studio.webp", alt: "A woman sits on the floor in The Romper in Powder Blue", slug: "the-romper", piece: "The Romper", colorway: "Powder Blue", focus: "40% 60%", text: "ink" },
  { src: "/images/hero/pink-slip-studio.webp", alt: "A woman stands with a hand on her hip in The Slip Dress in Rose", slug: "the-slip-dress", piece: "The Slip Dress", colorway: "Rose", focus: "50% 30%", text: "ink" },
  { src: "/images/hero/brown-romper-studio.webp", alt: "A woman sits with one knee raised in The Romper in Mocha", slug: "the-romper", piece: "The Romper", colorway: "Mocha", focus: "52% 40%", text: "ink" },
];
