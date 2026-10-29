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
    body: "Choose a gift tier and write her a personal message. All you need is her first name and number.",
  },
  {
    title: "She gets the Call",
    body: "She gets a text with your message inside and a link to claim her gift.",
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
  { label: "Instagram", url: "https://www.instagram.com/boujiecall/" },
];

export const pages = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/send-a-call", label: "Send a Call" },
  { href: "/about", label: "About" },
];

// Vercel sets VERCEL_PROJECT_PRODUCTION_URL to the project's production host, so share images and the sitemap follow the deployed address.
export function siteUrl(env: Record<string, string | undefined>): string {
  if (env.NEXT_PUBLIC_SITE_URL) return env.NEXT_PUBLIC_SITE_URL;
  if (env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "https://boujiecall.com";
}

export const SITE_URL = siteUrl(process.env);

// Home hero photos. "text" is the type colour that reads on the photo's empty left side.
export type HeroSlide = { src: string; alt: string; slug: string; piece: string; colorway: string; focus: string; text: "ink" | "cream" };

export const heroSlides: HeroSlide[] = [
  { src: "/images/hero/black-slip-studio.webp", alt: "A woman laughs, turning away, in The Slip Dress in After Dark", slug: "the-slip-dress", piece: "The Slip Dress", colorway: "After Dark", focus: "48% 40%", text: "ink" },
  { src: "/images/hero/blue-romper-studio.webp", alt: "A woman sits on the floor in The Romper in Powder Blue", slug: "the-romper", piece: "The Romper", colorway: "Powder Blue", focus: "40% 60%", text: "ink" },
  { src: "/images/hero/pink-slip-studio.webp", alt: "A woman stands with a hand on her hip in The Slip Dress in Rose", slug: "the-slip-dress", piece: "The Slip Dress", colorway: "Rose", focus: "50% 30%", text: "ink" },
  { src: "/images/hero/brown-romper-studio.webp", alt: "A woman sits with one knee raised in The Romper in Mocha", slug: "the-romper", piece: "The Romper", colorway: "Mocha", focus: "52% 40%", text: "ink" },
];

// Send a Call page. From the owner's prompts; prices and add-ons stay out until confirmed.
export const callSteps = [
  { title: "You choose her tier", body: "Pick the gift tier that feels like her." },
  { title: "You write her message", body: "A personal note printed on her call card inside the box." },
  { title: "She gets the Call", body: "She gets a text with your note and a link to claim her gift." },
  { title: "She picks up", body: "She clicks her claim link, chooses her size and style, and we ship to her door." },
];

export const boxContents = [
  { name: "Satin sleep set", note: "The hero piece. Soft, cute, and completely her." },
  { name: "Forever rose", note: "A preserved rose with a Boujie Calling branded tag." },
  { name: "Body mist", note: "A mini fragrance spray that smells like the brand." },
  { name: "Her call card", note: "Your personal message, printed beautifully inside." },
  { name: "Luxury box", note: "A blush pink rigid box with black satin ribbon and a BC wax seal." },
];
