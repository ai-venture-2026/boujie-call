"use client";

import { useState } from "react";

// No email service is connected yet, so a valid submit only confirms the list is not open.
export function WaitlistForm() {
  const [message, setMessage] = useState("");

  return (
    <form
      className="flex max-w-xl flex-wrap items-end gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        setMessage("The list opens soon. We have not saved your email yet, so check back at launch.");
      }}
    >
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Your email"
        className="min-w-0 flex-1 basis-64 border-0 border-b-[0.5px] border-ink/30 bg-transparent px-0 py-3 text-ink placeholder:text-muted focus:border-ink"
      />
      <button type="submit" className="cta grow sm:grow-0">
        Join the waitlist
      </button>
      <p role="status" className="basis-full text-sm text-muted">
        {message}
      </p>
    </form>
  );
}
