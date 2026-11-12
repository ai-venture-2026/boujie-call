"use client";

import Image from "next/image";
import { useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useLivePrices } from "@/lib/bag";
import { callsOpen, formatPrice, tiers } from "@/lib/content";
import { products } from "@/lib/products";
import { startCall } from "@/lib/send-call";

const field = "h-12 w-full border border-ink/40 bg-white/80 px-4 text-base text-ink focus:border-ink";
const pill = "cursor-pointer rounded-full border-[0.5px] border-ink/25 px-4 py-2.5 text-base transition-colors hover:border-pink has-checked:border-pink has-checked:bg-blush has-focus-visible:outline-2";

// One pop-up for every Send a Call button: step 1 picks the gift, step 2 who it is from and for.
export function GiftButton({ label, className = "cta cta-primary", start }: { label: string; className?: string; start?: { slug: string; colorway: string } }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useId();
  const host = useSyncExternalStore(() => () => {}, () => document.body, () => null);
  const prices = useLivePrices();
  const priced = products.filter((p) => p.slug in prices);
  const pieces = priced.length ? priced : products;

  const [step, setStep] = useState<1 | 2>(1);
  const [tier, setTier] = useState(tiers.find((t) => t.popular)?.name ?? tiers[0].name);
  const [slug, setSlug] = useState(start?.slug ?? pieces[0].slug);
  const piece = products.find((p) => p.slug === slug);
  const [colorway, setColorway] = useState(start?.colorway ?? piece?.colorways[0]?.name ?? "");
  const colour = piece?.colorways.find((c) => c.name === colorway);
  const photo = colour?.gallery?.[0]?.src ?? colour?.images[0];
  const [details, setDetails] = useState({ senderName: "", senderEmail: "", recipientName: "", recipientEmail: "", note: "" });
  const [answer, setAnswer] = useState<{ ok: boolean; text: string } | null>(null);
  const [sending, setSending] = useState(false);
  // The pop-up's contents are built on first open, so pages do not carry the tiers and pieces in their HTML.
  const [opened, setOpened] = useState(false);
  const set = (k: keyof typeof details) => (e: { target: { value: string } }) => setDetails({ ...details, [k]: e.target.value });

  async function send() {
    setSending(true);
    const result = await startCall({ tier, slug, colorway, ...details });
    setSending(false);
    setAnswer(result.ok ? { ok: true, text: "Your Call is saved. Checkout for Calls opens soon." } : { ok: false, text: result.message });
  }

  const input = (k: keyof typeof details, text: string, type = "text", max = 40) => (
    <label className="grid gap-1 text-[15px]">
      {text}
      <input type={type} required maxLength={max} value={details[k]} onChange={set(k)} className={field} />
    </label>
  );

  return (
    <>
      <button type="button" aria-haspopup="dialog" onClick={() => {
          setOpened(true);
          dialog.current?.showModal();
        }} className={className}>
        {label}
      </button>
      {host &&
        createPortal(
          <dialog ref={dialog} aria-labelledby={title} onClick={(e) => e.target === dialog.current && dialog.current?.close()} className="m-auto max-h-[92svh] w-[min(40rem,calc(100%-2rem))] bg-cream p-0 text-ink backdrop:bg-ink/50">
            {opened && <div className="p-6 md:p-10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="label text-rose-deep">Step {step} of 2</p>
                  <h2 id={title} className="mt-2 text-3xl md:text-4xl">
                    Choose her gift
                  </h2>
                </div>
                <button type="button" aria-label="Close" onClick={() => dialog.current?.close()} className="grid size-11 place-items-center">
                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 28 28" stroke="currentColor" strokeWidth="1.25">
                    <path d="M7 7l14 14M21 7L7 21" />
                  </svg>
                </button>
              </div>

              {step === 1 ? (
                <div className="mt-6 grid gap-6 sm:grid-cols-[9rem_1fr]">
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone max-sm:hidden">
                    {photo && <Image src={photo} alt={`${piece?.name} in ${colorway}`} fill sizes="9rem" className="object-cover" />}
                  </div>
                  <div className="grid gap-5">
                    <div role="radiogroup" aria-label="Choose a Call" className="grid gap-2">
                      {tiers.map((t) => (
                        <label key={t.name} className="flex cursor-pointer items-center justify-between gap-4 border-[0.5px] border-ink/20 px-4 py-3 has-checked:border-pink has-checked:bg-blush has-focus-visible:outline-2">
                          <input type="radio" name={`${title}-tier`} aria-label={t.name} className="sr-only" checked={tier === t.name} onChange={() => setTier(t.name)} />
                          <span className="text-base">{t.name}</span>
                          <span className="text-[15px] font-medium">{t.priceCents === null ? "" : formatPrice(t.priceCents)}</span>
                        </label>
                      ))}
                    </div>
                    <div role="radiogroup" aria-label="Choose a piece" className="flex flex-wrap gap-2">
                      {pieces.map((p) => (
                        <label key={p.slug} className={pill}>
                          <input type="radio" name={`${title}-piece`} aria-label={p.name} className="sr-only" checked={slug === p.slug} onChange={() => {
                            setSlug(p.slug);
                            setColorway(p.colorways[0]?.name ?? "");
                          }} />
                          {p.name}
                        </label>
                      ))}
                    </div>
                    <div role="radiogroup" aria-label="Choose a colour" className="flex flex-wrap items-center gap-1">
                      <span className="mr-2 text-[15px]">
                        Colour: <span className="text-muted">{colorway}</span>
                      </span>
                      {piece?.colorways.map((c) => (
                        <label key={c.name} className="grid size-11 cursor-pointer place-items-center rounded-full has-checked:ring-1 has-checked:ring-pink has-focus-visible:outline-2">
                          <input type="radio" name={`${title}-colour`} aria-label={c.name} className="sr-only" checked={colorway === c.name} onChange={() => setColorway(c.name)} />
                          <span aria-hidden="true" className="size-8 rounded-full border-[0.5px] border-ink/15" style={{ background: c.swatch ?? c.hex }} />
                        </label>
                      ))}
                    </div>
                    <button type="button" onClick={() => setStep(2)} className="cta cta-primary w-full sm:w-auto sm:justify-self-start">
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (callsOpen()) void send();
                  }}
                  className="mt-6 grid gap-4"
                >
                  <p className="text-[15px] text-muted">
                    {tier}, {piece?.name} in {colorway}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {input("senderName", "Your name")}
                    {input("senderEmail", "Your email", "email", 254)}
                    {input("recipientName", "Her first name")}
                    {input("recipientEmail", "Her email", "email", 254)}
                  </div>
                  <label className="grid gap-1 text-[15px]">
                    Your note
                    <textarea required maxLength={300} rows={3} value={details.note} onChange={set("note")} aria-describedby={`${title}-count`} className="w-full border border-ink/40 bg-white/80 p-4 text-base text-ink focus:border-ink" />
                  </label>
                  <span id={`${title}-count`} className="-mt-2 text-right text-[14px] text-muted">
                    {details.note.length} of 300
                  </span>
                  {!callsOpen() && <p className="bg-blush px-4 py-3 text-[15px] text-rose-deep">Send a Call opens soon. You can look through the form, but nothing is sent yet.</p>}
                  {answer && (
                    <p role={answer.ok ? "status" : "alert"} className="text-base">
                      {answer.text}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={() => setStep(1)} className="cta">
                      Back
                    </button>
                    <button type="submit" disabled={sending || !callsOpen()} className="cta cta-primary disabled:cursor-not-allowed disabled:opacity-40">
                      {callsOpen() ? "Continue" : "Opens soon"}
                    </button>
                  </div>
                </form>
              )}
            </div>}
          </dialog>,
          host,
        )}
    </>
  );
}
