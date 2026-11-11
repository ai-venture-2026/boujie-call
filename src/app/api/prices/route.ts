import { getCatalog } from "@/lib/shopify";

export const revalidate = 60;

export async function GET() {
  const catalog = await getCatalog();
  const prices = Object.fromEntries(Object.entries(catalog ?? {}).flatMap(([slug, p]) => (p.priceCents ? [[slug, p.priceCents]] : [])));
  return Response.json(prices);
}
