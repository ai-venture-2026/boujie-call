import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ClaimForm } from "@/components/claim-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { callView } from "@/lib/call-view";

export const metadata: Metadata = { title: "Your Boujie Call", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const notes = { claimed: "This gift has already been claimed.", expired: "This gift link has expired.", closed: "Claiming opens soon." };

export default async function CallPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const view = await callView(token);
  if (view.state === "missing") notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 pt-10 pb-28 md:px-12">
        {view.state === "open" ? (
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="relative aspect-[3/4] overflow-hidden bg-stone">
              {view.photo && <Image src={view.photo} alt={`${view.piece} in ${view.colorway}`} fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />}
            </div>
            <div>
              <p className="label text-rose-deep">A Call for {view.recipientName}</p>
              <h1 className="mt-4 text-[clamp(36px,3.2vw,52px)] leading-[1.05]">
                {view.senderName} sent you {view.piece} in {view.colorway}
              </h1>
              <p className="mt-6 font-serif text-2xl leading-relaxed italic">“{view.note}”</p>
              <ClaimForm token={token} recipientName={view.recipientName} sizes={view.sizes} soldOut={view.soldOut} colorway={view.colorway} />
            </div>
          </div>
        ) : (
          <div className="flex min-h-[40vh] flex-col items-start justify-center gap-4">
            <p className="label text-rose-deep">Boujie Call</p>
            <h1 className="text-[clamp(32px,3vw,48px)]">{notes[view.state]}</h1>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
