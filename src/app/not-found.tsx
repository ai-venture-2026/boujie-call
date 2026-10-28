import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 pt-24 pb-32 md:px-12 md:pt-36">
        <h1 className="max-w-3xl text-5xl md:text-7xl">This page didn&apos;t pick up.</h1>
        <p className="mt-6 font-serif text-2xl italic text-muted">It may have moved, or it was never here.</p>
        <Link href="/" className="pill mt-12">
          Back to home
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
