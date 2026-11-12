import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SendCallForm } from "@/components/send-call-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { tiers } from "@/lib/content";
import { products } from "@/lib/products";
import { getCatalog, withLive } from "@/lib/shopify";

export const metadata: Metadata = { title: "Send a Call | Boujie Call", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function StartPage() {
  if (process.env.SEND_A_CALL_ENABLED !== "true") notFound();
  const pieces = withLive(products, await getCatalog()).filter((p) => !p.comingSoon);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 pt-10 pb-28 md:px-12">
        <p className="label text-rose-deep">Send a Call</p>
        <h1 className="mt-4 text-[clamp(36px,3.6vw,56px)] leading-[1.05]">Choose their gift.</h1>
        <SendCallForm tiers={tiers} pieces={pieces} />
      </main>
      <SiteFooter />
    </>
  );
}
