"use client";

import { useId, useState } from "react";

// No email service is connected yet, so a valid submit only confirms the list is not open.
export function WaitlistForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [message, setMessage] = useState("");
  const id = useId();
  const dark = tone === "dark";

  return (
    <form
      className="flex max-w-xl flex-wrap items-end gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        setMessage("The list opens soon. We have not saved your email yet, so check back at launch.");
      }}
    >
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Your email"
        className={`min-w-0 flex-1 basis-64 border-0 border-b-[0.5px] bg-transparent px-0 py-3 ${dark ? "border-blush/30 text-blush placeholder:text-muted-dark focus:border-blush" : "border-ink/30 text-ink placeholder:text-muted focus:border-ink"}`}
      />
      <button type="submit" className="cta grow sm:grow-0">
        Join the waitlist
      </button>
      <p role="status" className={`basis-full text-sm ${dark ? "text-muted-dark" : "text-muted"}`}>
        {message}
      </p>
    </form>
  );
}
