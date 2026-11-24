"use server";

import type { BagLine } from "./bag";
import { forSale, getProduct, MAX_QTY, stockKey } from "./products";
import { API_VERSION, getCatalog } from "./shopify";

export type CheckoutResult = { ok: true; url: string; cart?: string } | { ok: false; message: string };

const SOON = "Checkout opens soon. Your bag is saved for launch.";
const RETRY = "We couldn't open checkout. Please try again.";
const GONE = "A piece in your bag is no longer available. Remove it and try again.";
const MAX_LINES = 20;
const CART = `mutation ($lines: [CartLineInput!]!) { cartCreate(input: { lines: $lines }) { cart { id checkoutUrl } userErrors { message } } }`;

const ORDER = `query ($id: ID!) { cart(id: $id) { id } }`;
const CART_ID = /^gid:\/\/shopify\/Cart\/[^\s/]{1,300}$/;
const on = () => process.env.SHOPIFY_CHECKOUT_ENABLED === "true";

const fail = (message: string): CheckoutResult => ({ ok: false, message });

const storefront = (query: string, variables: object) =>
  fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN ?? "" },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });

// Lines come from browser storage, so every field is checked before Shopify sees it.
const valid = (l: BagLine) => {
  const product = typeof l === "object" && l !== null ? getProduct(l.slug) : undefined;
  return !!product && forSale(product, l.colorway) && product.sizes.includes(l.size) && Number.isInteger(l.qty) && l.qty >= 1 && l.qty <= MAX_QTY;
};

// Off until SHOPIFY_CHECKOUT_ENABLED is "true" at launch; the shop keeps reading Shopify either way.
export async function startCheckout(lines: BagLine[]): Promise<CheckoutResult> {
  if (!on()) return fail(SOON);
  if (!Array.isArray(lines) || lines.length === 0 || lines.length > MAX_LINES || !lines.every(valid)) return fail(GONE);

  const catalog = await getCatalog();
  if (!catalog) return fail(RETRY);
  const merch = [];
  for (const l of lines) {
    const key = stockKey(l.colorway, l.size);
    const live = catalog[l.slug];
    if (live?.stock[key] === 0) return fail(`${getProduct(l.slug)?.name} in ${l.colorway}, ${l.size} is sold out`);
    const id = live?.variants?.[key];
    if (!id) return fail(GONE);
    merch.push({ merchandiseId: id, quantity: l.qty });
  }

  try {
    const res = await storefront(CART, { lines: merch });
    const result = res.ok ? (await res.json())?.data?.cartCreate : null;
    const url: unknown = result?.cart?.checkoutUrl;
    if (result?.userErrors?.length || typeof url !== "string" || !url.startsWith("https://")) return fail(RETRY);
    const id: unknown = result?.cart?.id;
    return { ok: true, url, ...(typeof id === "string" && { cart: id }) };
  } catch (error) {
    console.error("Shopify checkout unavailable", error);
    return fail(RETRY);
  }
}

// Shopify deletes a cart once its order is placed, so only a clean null answer counts; any doubt keeps the bag.
// No order can exist while checkout is off, so the check never reaches Shopify before launch.
export async function orderPlaced(cart: string): Promise<boolean> {
  if (!on() || typeof cart !== "string" || !CART_ID.test(cart)) return false;
  try {
    const res = await storefront(ORDER, { id: cart });
    const body = res.ok ? await res.json() : null;
    return !!body?.data && body.data.cart === null && !body.errors?.length;
  } catch {
    return false;
  }
}
