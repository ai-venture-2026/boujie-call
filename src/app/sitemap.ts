import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";
import { getHelp, helpLinks } from "@/lib/help";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/shop", "/send-a-call", "/about", ...products.map((p) => `/shop/${p.slug}`), ...helpLinks(getHelp()).map((l) => l.href)].map((path) => ({ url: new URL(path, SITE_URL).href }));
}
