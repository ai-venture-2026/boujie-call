import type { Metadata } from "next";
import { BagView } from "@/components/bag-view";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Your bag | Boujie Call",
  robots: { index: false },
};

export default function BagPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto min-h-[70svh] max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <h1 className="text-[clamp(2.5rem,4.4vw,4.25rem)] leading-[1.02]">
          Your <em className="text-rose">bag</em>
        </h1>
        <div className="mt-10">
          <BagView />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
