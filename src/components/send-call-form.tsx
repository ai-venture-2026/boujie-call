"use client";

import Image from "next/image";
import { useState } from "react";
import { formatPrice, type Tier } from "@/lib/content";
import type { Product } from "@/lib/products";
import { startCall } from "@/lib/send-call";

const field = "h-12 w-full border border-ink/40 bg-white/80 px-4 text-base text-ink focus:border-ink";
const pill = "cursor-pointer rounded-full border-[0.5px] border-ink/25 px-4 py-2.5 text-base transition-colors hover:border-pink has-checked:border-pink has-checked:bg-blush has-focus-visible:outline-2";

export function SendCallForm({ tiers, pieces }: { tiers: Tier[]; pieces: Product[] }) {
  const [tier, setTier] = useState(tiers.find((t) => t.popular)?.name ?? tiers[0]?.name ?? "");
  const [slug, setSlug] = useState(pieces[0]?.slug ?? "");
  const piece = pieces.find((p) => p.slug === slug);
  const [colorway, setColorway] = useState(piece?.colorways[0]?.name ?? "");
  const colour = piece?.colorways.find((c) => c.name === colorway);
  const photo = colour?.gallery?.[0]?.src ?? colour?.images[0];
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  async function submit(form: FormData) {
    setSending(true);
    const value = (k: string) => String(form.get(k) ?? "");
    const result = await startCall({ tier, slug, colorway, senderName: value("senderName"), senderEmail: value("senderEmail"), recipientName: value("recipientName"), recipientEmail: value("recipientEmail"), note });
    setSending(false);
    if (result.ok) setDone(true);
    else setError(result.message);
  }

  if (done) return <p role="status" className="mt-10 font-serif text-3xl">Your Call is saved. Checkout for Calls opens soon.</p>;

  return (
    <form action={submit} className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
      <div className="relative aspect-[3/4] overflow-hidden bg-stone md:sticky md:top-28 md:self-start">
        {photo && <Image src={photo} alt={`${piece?.name} in ${colorway}`} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />}
      </div>
      <div className="grid content-start gap-10">
        <div role="radiogroup" aria-label="Choose a Call" className="grid gap-3">
          <p className="text-base">Choose a Call</p>
          {tiers.map((t) => (
            <label key={t.name} className="flex cursor-pointer items-start justify-between gap-4 border-[0.5px] border-ink/20 p-4 has-checked:border-pink has-checked:bg-blush has-focus-visible:outline-2">
              <input type="radio" name="tier" aria-label={t.name} className="sr-only" checked={tier === t.name} onChange={() => setTier(t.name)} />
              <span>
                <span className="block text-lg">{t.name}</span>
                <span className="mt-1 block text-[15px] text-muted">{t.contents}</span>
              </span>
              <span className="text-base font-medium">{t.priceCents === null ? "" : formatPrice(t.priceCents)}</span>
            </label>
          ))}
        </div>
        <div role="radiogroup" aria-label="Choose a piece" className="grid gap-3">
          <p className="text-base">Choose a piece</p>
          <div className="flex flex-wrap gap-2">
            {pieces.map((p) => (
              <label key={p.slug} className={pill}>
                <input type="radio" name="slug" aria-label={p.name} className="sr-only" checked={slug === p.slug} onChange={() => {
                  setSlug(p.slug);
                  setColorway(p.colorways[0]?.name ?? "");
                }} />
                {p.name}
              </label>
            ))}
          </div>
        </div>
        <div role="radiogroup" aria-label="Choose a colour" className="grid gap-3">
          <p className="text-base">
            Colour: <span className="text-muted">{colorway}</span>
          </p>
          <div className="flex flex-wrap gap-1">
            {piece?.colorways.map((c) => (
              <label key={c.name} className="grid size-11 cursor-pointer place-items-center rounded-full has-checked:ring-1 has-checked:ring-pink has-focus-visible:outline-2">
                <input type="radio" name="colorway" aria-label={c.name} className="sr-only" checked={colorway === c.name} onChange={() => setColorway(c.name)} />
                <span aria-hidden="true" className="size-8 rounded-full border-[0.5px] border-ink/15" style={{ background: c.swatch ?? c.hex }} />
              </label>
            ))}
          </div>
        </div>
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-3 text-base">From you, to her</legend>
          <label className="grid gap-1 text-[15px]">
            Your name
            <input name="senderName" autoComplete="name" required maxLength={40} className={field} />
          </label>
          <label className="grid gap-1 text-[15px]">
            Your email
            <input name="senderEmail" type="email" autoComplete="email" required maxLength={254} className={field} />
          </label>
          <label className="grid gap-1 text-[15px]">
            Her first name
            <input name="recipientName" autoComplete="off" required maxLength={40} className={field} />
          </label>
          <label className="grid gap-1 text-[15px]">
            Her email
            <input name="recipientEmail" type="email" autoComplete="off" required maxLength={254} className={field} />
          </label>
        </fieldset>
        <div className="grid gap-1">
          <label className="grid gap-1 text-[15px]">
            Your note
            <textarea name="note" required maxLength={300} rows={4} value={note} onChange={(e) => setNote(e.target.value)} aria-describedby="note-count" className="w-full border border-ink/40 bg-white/80 p-4 text-base text-ink focus:border-ink" />
          </label>
          <span id="note-count" className="text-right text-[14px] text-muted">{note.length} of 300</span>
        </div>
        <p role="alert" className="text-base empty:hidden">
          {error}
        </p>
        <button type="submit" disabled={sending} className="cta cta-primary w-full sm:w-auto">
          Continue
        </button>
      </div>
    </form>
  );
}
