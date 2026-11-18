"use client";

import { useId, useState } from "react";

// No email service is connected yet, so a valid submit only confirms the list is not open.
export function WaitlistForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [message, setMessage] = useState("");
  const id = useId();
  const dark = tone === "dark";

  return (
    <form
      className="max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        setMessage("The list opens soon. We have not saved your email yet, so check back at launch.");
      }}
    >
      <label htmlFor={id} className={`label block ${dark ? "text-blush/75" : "text-ink/80"}`}>
        Email address
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-0 md:flex-col md:gap-3 lg:flex-row lg:gap-0">
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="name@email.com"
          className={`h-12 w-full min-w-0 border px-4 sm:flex-1 md:flex-none lg:flex-1 text-base ${dark ? "border-blush/40 bg-blush/5 text-blush placeholder:text-blush/65 focus:border-blush focus-visible:outline-blush" : "border-ink/40 bg-white/80 text-ink placeholder:text-ink/65 focus:border-ink"}`}
        />
        <button type="submit" className="cta cta-primary shrink-0">
          Join the waitlist
        </button>
      </div>
      <p role="status" className={`mt-3 text-[15px] ${dark ? "text-blush/75" : "text-muted"}`}>
        {message}
      </p>
    </form>
  );
}
