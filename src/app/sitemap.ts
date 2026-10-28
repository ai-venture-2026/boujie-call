import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/shop", ...products.map((p) => `/shop/${p.slug}`)].map((path) => ({ url: new URL(path, SITE_URL).href }));
}
