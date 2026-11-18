"use client";

import { useState } from "react";
import { US_STATES } from "@/lib/us-states";
import { claimCall } from "@/lib/claim";

const field = "h-12 w-full border border-ink/40 bg-white/80 px-4 text-base text-ink focus:border-ink";

export function ClaimForm({ token, recipientName, sizes, soldOut, colorway }: { token: string; recipientName: string; sizes: string[]; soldOut: string[]; colorway: string }) {
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(form: FormData) {
    setSending(true);
    const value = (k: string) => String(form.get(k) ?? "");
    const address = { name: value("name"), line1: value("line1"), line2: value("line2"), city: value("city"), state: value("state"), zip: value("zip") };
    const result = await claimCall(token, { size, address });
    setSending(false);
    if (result.ok) setDone(`It's yours. We'll send it to ${address.city.trim()}, ${address.state}.`);
    else setError(result.message);
  }

  if (done) return <p role="status" className="mt-10 font-serif text-3xl">{done}</p>;

  return (
    <form action={submit} className="mt-10 grid gap-6">
      <fieldset>
        <legend className="text-base">
          Your size: <span className="text-muted">{size ?? "choose one"}</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((s) => {
            const gone = soldOut.includes(s);
            return (
              <label key={s} className={`grid h-11 min-w-14 place-items-center rounded-full border-[0.5px] border-ink/25 px-4 text-base transition-colors has-checked:border-pink has-checked:bg-blush has-focus-visible:outline-2 ${gone ? "cursor-not-allowed text-muted line-through" : "cursor-pointer hover:border-pink"}`}>
                <input type="radio" name="size" value={s} aria-label={gone ? `${s}, sold out` : s} disabled={gone} className="sr-only" checked={size === s} onChange={() => setSize(s)} />
                {s}
              </label>
            );
          })}
        </div>
        {soldOut.length > 0 && <p className="mt-2 text-[15px] text-muted">Crossed out sizes are sold out in {colorway}.</p>}
      </fieldset>
      <fieldset className="grid gap-4">
        <legend className="text-base">Where should we send it?</legend>
        <label className="grid gap-1 text-[15px]">
          Name
          <input name="name" autoComplete="name" defaultValue={recipientName} required maxLength={80} className={field} />
        </label>
        <label className="grid gap-1 text-[15px]">
          Street address
          <input name="line1" autoComplete="address-line1" required maxLength={100} className={field} />
        </label>
        <label className="grid gap-1 text-[15px]">
          Apartment, suite (optional)
          <input name="line2" autoComplete="address-line2" maxLength={100} className={field} />
        </label>
        <div className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr]">
          <label className="grid gap-1 text-[15px]">
            City
            <input name="city" autoComplete="address-level2" required maxLength={60} className={field} />
          </label>
          <label className="grid gap-1 text-[15px]">
            State
            <select name="state" autoComplete="address-level1" required defaultValue="" className={field}>
              <option value="" disabled>
                Choose
              </option>
              {US_STATES.map((st) => (
                <option key={st}>{st}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-[15px]">
            ZIP code
            <input name="zip" autoComplete="postal-code" inputMode="numeric" required maxLength={10} className={field} />
          </label>
        </div>
      </fieldset>
      <p role="alert" className="text-base empty:hidden">
        {error}
      </p>
      <button type="submit" disabled={sending} className="cta cta-primary w-full sm:w-auto">
        Claim my gift
      </button>
    </form>
  );
}
