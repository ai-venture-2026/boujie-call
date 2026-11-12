import { getCallStore } from "./call-store";
import { hashToken, isExpired, TOKEN_SHAPE } from "./calls";
import { getProduct, stockKey } from "./products";
import { getCatalog } from "./shopify";

export type OpenCall = {
  state: "open";
  senderName: string;
  recipientName: string;
  note: string;
  piece: string;
  slug: string;
  colorway: string;
  photo: string;
  sizes: string[];
  soldOut: string[];
};
export type CallView = { state: "closed" | "missing" | "claimed" | "expired" } | OpenCall;

// Only what the claim page shows leaves the server: never the receiver's email or the tier paid for.
export async function callView(token: string): Promise<CallView> {
  if (!getCallStore() || !process.env.OWNER_EMAIL) return { state: "closed" };
  if (!TOKEN_SHAPE.test(token)) return { state: "missing" };
  const call = await getCallStore()!.byTokenHash(hashToken(token));
  const product = call ? getProduct(call.slug) : undefined;
  if (!call || !product) return { state: "missing" };
  if (call.status === "claimed") return { state: "claimed" };
  if (isExpired(call)) return { state: "expired" };
  const colorway = product.colorways.find((c) => c.name === call.colorway);
  const stock = (await getCatalog())?.[call.slug]?.stock ?? {};
  return {
    state: "open",
    senderName: call.senderName,
    recipientName: call.recipientName,
    note: call.note,
    piece: product.name,
    slug: call.slug,
    colorway: call.colorway,
    photo: colorway?.gallery?.[0]?.src ?? colorway?.images[0] ?? "",
    sizes: product.sizes,
    soldOut: product.sizes.filter((s) => stock[stockKey(call.colorway, s)] === 0),
  };
}
