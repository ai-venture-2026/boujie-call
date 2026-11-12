import type { MetadataRoute } from "next";
import { isLive, SITE_URL } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return { rules: isLive(process.env) ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
