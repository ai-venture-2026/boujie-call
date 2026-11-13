"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { bagCount, rememberCheckout, offerNote, picked, priceOf, subtotalCents, useBag, useLivePrices } from "@/lib/bag";
import { startCheckout } from "@/lib/checkout";
import { formatPrice } from "@/lib/content";
import { getProduct } from "@/lib/products";

const SHOWN = 3;

export function MiniBag({ id, onHover, onNavigate }: { id: string; onHover: (over: boolean) => void; onNavigate: () => void }) {
  const lines = useBag();
  const prices = useLivePrices();
  const chosen = picked(lines);
  const count = bagCount(chosen);
  const choosing = chosen.length < lines.length;
  const [note, setNote] = useState("");
  const rest = lines.length - SHOWN;

  async function checkout() {
    const result = await startCheckout(chosen);
    if (result.ok) {
      rememberCheckout(result.cart, chosen);
      window.location.assign(result.url);
    }
    else setNote(result.message);
  }

  return (
    <div
      id={id}
      role="region"
      aria-label="Your bag"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="bag-in absolute inset-x-0 top-full z-50 border-[0.5px] border-card-border bg-card p-6 text-ink shadow-[0_24px_60px_-30px_rgba(20,16,20,0.35)] md:inset-x-auto md:right-12 md:w-[380px]"
    >
      <div className="flex items-baseline justify-between">
        <p className="font-serif text-2xl">Your bag</p>
        <p className="label text-muted">
          {count} {count === 1 ? "piece" : "pieces"}
        </p>
      </div>

      {lines.length === 0 ? (
        <div className="mt-6 flex flex-col items-start gap-6">
          <p className="text-muted">Your bag is empty</p>
          <Link href="/shop" onClick={onNavigate} className="cta">
            Shop the collection
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-5 border-t-[0.5px] border-card-border">
            {lines.slice(0, SHOWN).map((line) => {
              const product = getProduct(line.slug);
              if (!product) return null;
              const photo = product.colorways.find((c) => c.name === line.colorway)?.images[0];
              return (
                <li key={`${line.slug}-${line.colorway}-${line.size}`} className="flex gap-4 border-b-[0.5px] border-card-border py-4">
                  <div className="relative aspect-[3/4] w-14 shrink-0 bg-stone">
                    {photo && <Image src={photo} alt="" fill sizes="56px" className="object-cover" />}
                  </div>
                  <div className="flex flex-1 items-start justify-between gap-3">
                    <div>
                      <p className="font-serif text-lg leading-tight">{product.name}</p>
                      <p className="label mt-1 text-muted">
                        {line.colorway}, {line.size}
                        {line.qty > 1 && `, ${line.qty} pieces`}
                      </p>
                    </div>
                    <span className="text-[15px] font-medium">{formatPrice(priceOf(product.slug, prices))}</span>
                  </div>
                </li>
              );
            })}
          </ul>
          {rest > 0 && <p className="mt-3 text-[15px] text-muted">+ {rest} more</p>}
          {offerNote(count) && <p className="mt-5 font-serif text-lg italic">{offerNote(count)}</p>}
          <div className="mt-4 flex items-baseline justify-between">
            <span className="label">Subtotal</span>
            <span className="font-sans text-[17px] font-medium">{formatPrice(subtotalCents(chosen, prices))}</span>
          </div>
          {choosing && <p className="mt-4 text-[15px] text-muted">Choose what to check out in your bag.</p>}
          <div className={`mt-6 grid gap-3 ${choosing ? "" : "grid-cols-2"}`}>
            <Link href="/bag" onClick={onNavigate} className="cta px-4">
              View bag
            </Link>
            {!choosing && (
              <button type="button" onClick={checkout} className="cta cta-primary px-4">
                Checkout
              </button>
            )}
          </div>
          <p role="status" className="mt-3 text-[15px]">
            {note}
          </p>
        </>
      )}
    </div>
  );
}
