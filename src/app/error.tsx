"use client";

import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 pt-24 pb-32 md:px-12 md:pt-36">
        <h1 className="max-w-3xl text-5xl md:text-7xl">This page didn&apos;t load.</h1>
        <p className="mt-6 font-serif text-2xl italic text-muted">Give it another moment, or carry on shopping.</p>
        <div className="mt-12 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="cta cta-primary">
            Try again
          </button>
          <Link href="/shop" className="cta">
            Back to the shop
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
