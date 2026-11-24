export type PolicySection = { heading?: string; body: string[] };
export type Policy = { updated: string; sections: PolicySection[] };
export type HelpContent = {
  contactEmail: string | null;
  topics: { q: string; a: string | null }[];
  privacy: Policy | null;
  terms: Policy | null;
};

// The owner's answers go here. A page and its footer link go live only once its text exists (Alex, 2026-11-13).
const content: HelpContent = {
  contactEmail: "BoujieCall@gmail.com",
  topics: [
    { q: "How long does shipping take?", a: null },
    { q: "What is your returns policy?", a: null },
    { q: "How do I find my size?", a: null },
    {
      q: "How does Send a Call work?",
      a: "Choose a Call, a piece and a colour, then add their first name, their email and your note. They get an email with your note and a private link, choose their size and tell us where to send it, and we ship it, beautifully wrapped, to their door.",
    },
    { q: "Do I need their address to send a gift?", a: "No. They enter their own size and address when they open their gift link, so the surprise stays a surprise." },
    { q: "What if they never claim their gift?", a: "If your gift isn't claimed within 30 days, we email you a code so you can send it to someone else." },
  ],
  privacy: null,
  terms: null,
};

export const getHelp = () => content;

export function helpLinks(c: HelpContent) {
  return [
    c.contactEmail && { href: "/help", label: "Help" },
    c.privacy && { href: "/privacy", label: "Privacy Policy" },
    c.terms && { href: "/terms", label: "Terms of Service" },
  ].filter((l): l is { href: string; label: string } => !!l);
}
