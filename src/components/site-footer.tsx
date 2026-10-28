import { Wordmark } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-wrap items-baseline justify-between gap-4 border-t border-card-border px-6 py-10 text-sm text-muted md:px-12">
      <Wordmark className="text-2xl text-ink" />
      <p>BoujieCall.com, launching soon</p>
      <p>© 2026 Boujie Call</p>
    </footer>
  );
}
