export type Email = { to: string; subject: string; html: string; text: string };
export type Sent = { ok: true } | { ok: false; reason: "not configured" | "failed" | "no channel" };

// Without both settings nothing is sent, so preview and local builds never email real people.
export async function sendEmail(email: Email): Promise<Sent> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!key || !from) return { ok: false, reason: "not configured" };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, ...email }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? { ok: true } : { ok: false, reason: "failed" };
  } catch (error) {
    console.error("Resend unavailable", error);
    return { ok: false, reason: "failed" };
  }
}
