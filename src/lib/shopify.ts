import { stockKey, type Product } from "./products";

export type Catalog = Record<string, { priceCents: number | null; stock: Record<string, number | null> }>;

type Variant = {
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: { amount: string };
  selectedOptions: { name: string; value: string }[];
};

const API_VERSION = "2026-07";
const QUERY = `{ products(first: 50) { nodes { handle variants(first: 100) { nodes { availableForSale quantityAvailable price { amount } selectedOptions { name value } } } } } }`;

const option = (v: Variant, name: string) => v.selectedOptions.find((o) => o.name.toLowerCase() === name)?.value;

// Null means use products.ts as it is: not configured, unreachable, or no data.
export async function getCatalog(): Promise<Catalog | null> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN;
  if (!domain || !token) return null;
  try {
    const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token },
      body: JSON.stringify({ query: QUERY }),
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const nodes: { handle: string; variants: { nodes: Variant[] } }[] | undefined = (await res.json())?.data?.products?.nodes;
    if (!nodes) return null;
    return Object.fromEntries(
      nodes.map((p) => {
        const stock: Record<string, number | null> = {};
        for (const v of p.variants.nodes) {
          const color = option(v, "color");
          const size = option(v, "size");
          if (!color || !size) continue;
          const qty = v.quantityAvailable;
          stock[stockKey(color, size)] = !v.availableForSale ? 0 : typeof qty === "number" && qty > 0 ? qty : null;
        }
        const cents = Math.round(Number(p.variants.nodes[0]?.price.amount) * 100);
        return [p.handle, { priceCents: cents > 0 ? cents : null, stock }];
      }),
    );
  } catch {
    return null;
  }
}

export function withLive(products: Product[], catalog: Catalog | null): Product[] {
  if (!catalog) return products;
  return products.map((p) => {
    const live = catalog[p.slug];
    if (!live) return { ...p, comingSoon: true };
    const known = new Set(p.colorways.flatMap((c) => p.sizes.map((s) => stockKey(c.name, s))));
    const stock = Object.fromEntries(Object.entries(live.stock).filter(([key]) => known.has(key)));
    return { ...p, priceCents: live.priceCents ?? p.priceCents, stock };
  });
}
