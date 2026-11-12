import { callsOpen } from "@/lib/content";

// Shown beside Send a Call links until it can take gifts.
export function Soon({ href }: { href: string }) {
  if (href !== "/send-a-call" || callsOpen()) return null;
  return (
    <>
      {" "}
      <span className="label ml-1 rounded-full bg-blush px-2 py-0.5 align-middle font-sans text-rose-deep not-italic">Soon</span>
    </>
  );
}
