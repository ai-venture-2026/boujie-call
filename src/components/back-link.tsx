"use client";

import Link from "next/link";
import { previousPage } from "@/lib/nav-memory";

// Going back through history lets the browser restore the scroll position and the shop filters; otherwise this is a normal link.
export function BackLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || window.history.length < 2 || previousPage() !== href) return;
        e.preventDefault();
        window.history.back();
      }}
    >
      {children}
    </Link>
  );
}
