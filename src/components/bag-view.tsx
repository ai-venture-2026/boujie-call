"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { bagCount, rememberCheckout, offerNote, picked, removeFromBag, setQty, setSkip, priceOf, subtotalCents, useBag, useLivePrices, MAX_QTY } from "@/lib/bag";
import { startCheckout } from "@/lib/checkout";
import { formatPrice } from "@/lib/content";
import { getProduct } from "@/lib/products";

export function BagView() {
  const hint = useId();
  const lines = useBag();
  const prices = useLivePrices();
  const [note, setNote] = useState("");
  const chosen = picked(lines);
  const count = bagCount(chosen);

  async function checkout() {
    const result = await startCheckout(chosen);
    if (result.ok) {
      rememberCheckout(result.cart, chosen);
      window.location.assign(result.url);
    }
    else setNote(result.message);
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-start gap-8 py-10">
        <p className="font-serif text-3xl">Your bag is empty</p>
        <Link href="/shop" className="cta cta-primary">
          Shop the collection
        </Link>
      </div>
    );
  }

  return (
    <>
      <p id={hint} className="mb-6 text-[15px] text-muted">Untick a piece to leave it out of checkout.</p>
      <div className="grid gap-14 md:grid-cols-[1fr_22rem] md:gap-20">
        <ul aria-label="Pieces in your bag" className="border-t-[0.5px] border-card-border">
          {lines.map((line) => {
            const product = getProduct(line.slug);
            if (!product) return null;
            const photo = product.colorways.find((c) => c.name === line.colorway)?.images[0];
            const name = `${product.name}, ${line.colorway}, ${line.size}`;
            return (
              <li key={name} className="grid grid-cols-[auto_6rem_1fr] gap-4 border-b-[0.5px] border-card-border py-6 sm:grid-cols-[auto_7.5rem_1fr] sm:gap-5">
                <label className="-ml-3 grid size-11 cursor-pointer place-items-center self-center">
                  <input type="checkbox" aria-label={`Check out ${name}`} aria-describedby={hint} checked={!line.skip} onChange={(e) => setSkip(line, !e.target.checked)} className="size-5 cursor-pointer accent-pink" />
                </label>
                <div className="relative aspect-[3/4] bg-stone">
                  {photo && <Image src={photo} alt="" fill sizes="120px" className="object-cover" />}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-start justify-between gap-4 max-sm:flex-col max-sm:gap-1">
                    <Link href={`/shop/${product.slug}`} className="font-serif text-[26px] font-medium leading-tight hover:text-rose">
                      {product.name}
                    </Link>
                    <span className="text-[17px] font-medium">{formatPrice(priceOf(product.slug, prices))}</span>
                  </div>
                  <p className="label mt-2 text-muted">
                    {line.colorway}, {line.size}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                    <div className="flex items-center border-[0.5px] border-ink/30">
                      <button type="button" aria-label={`Remove one ${name}`} disabled={line.qty <= 1} onClick={() => setQty(line, line.qty - 1)} className="grid size-11 place-items-center disabled:opacity-30">
                        −
                      </button>
                      <span aria-label={`Quantity ${line.qty}`} className="w-8 text-center text-[15px]">
                        {line.qty}
                      </span>
                      <button type="button" aria-label={`Add one more ${name}`} disabled={line.qty >= MAX_QTY} onClick={() => setQty(line, line.qty + 1)} className="grid size-11 place-items-center disabled:opacity-30">
                        +
                      </button>
                    </div>
                    <button type="button" aria-label={`Remove ${name} from your bag`} onClick={() => removeFromBag(line)} className="label min-h-11 text-muted underline-offset-4 hover:text-ink hover:underline">
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="self-start bg-white p-8 md:pt-0 max-md:bg-transparent max-md:p-0">
          {offerNote(count) && <p className="font-serif text-xl italic md:pt-8">{offerNote(count)}</p>}
          <div className="mt-8 first:mt-0 flex items-baseline justify-between border-t-[0.5px] border-card-border pt-6">
            <span className="label">Subtotal</span>
            <span className="font-sans text-xl font-medium">{formatPrice(subtotalCents(chosen, prices))}</span>
          </div>
          <p className="mt-2 text-[15px] text-muted">Shipping and taxes calculated at checkout</p>
          <button type="button" onClick={checkout} disabled={count === 0} className="cta cta-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-40">
            Checkout
          </button>
          {count === 0 && <p className="mt-3 text-[15px] text-muted">Tick a piece to check out.</p>}
          <p role="status" className="mt-4 text-[15px] text-ink">
            {note}
          </p>
          <Link href="/shop" className="cta mt-6 w-full">
            Continue shopping
          </Link>
        </div>
      </div>
    </>
  );
}
