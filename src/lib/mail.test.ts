import { sendEmail } from "./mail";

const email = { to: "ana@example.com", subject: "Hi", html: "<p>Hi</p>", text: "Hi" };

describe("sendEmail", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });
  const configure = () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("MAIL_FROM", "Boujie Call <calls@boujiecall.com>");
  };

  it("posts the email to Resend", async () => {
    configure();
    const fetch = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetch);
    expect(await sendEmail(email)).toEqual({ ok: true });
    const [url, init] = fetch.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers.Authorization).toBe("Bearer re_test");
    expect(JSON.parse(init.body)).toEqual({ from: "Boujie Call <calls@boujiecall.com>", ...email });
  });

  it("reports a refused email as not sent", async () => {
    configure();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 422 }));
    expect(await sendEmail(email)).toEqual({ ok: false, reason: "failed" });
  });

  it("reports an unreachable service as not sent", async () => {
    configure();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    expect(await sendEmail(email)).toEqual({ ok: false, reason: "failed" });
  });

  it("sends nothing without the Resend settings", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    expect(await sendEmail(email)).toEqual({ ok: false, reason: "not configured" });
    expect(fetch).not.toHaveBeenCalled();
  });
});
