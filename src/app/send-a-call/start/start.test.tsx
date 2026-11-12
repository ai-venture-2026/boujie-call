import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import StartPage from "./page";
import * as sendModule from "@/lib/send-call";
import * as shopifyModule from "@/lib/shopify";

vi.mock("next/navigation", () => ({ notFound: () => { throw new Error("NEXT_NOT_FOUND"); }, usePathname: () => "/send-a-call/start" }));

const page = async () => render(await StartPage());
const type = (label: string, value: string) => fireEvent.change(screen.getByLabelText(label), { target: { value } });
const fill = () => {
  type("Your name", "Mia");
  type("Your email", "mia@example.com");
  type("Their first name", "Ana");
  type("Their email", "ana@example.com");
  type("Your note", "Happy birthday");
};

beforeEach(() => {
  vi.stubEnv("SEND_A_CALL_ENABLED", "true");
  vi.spyOn(shopifyModule, "getCatalog").mockResolvedValue({
    "the-slip-dress": { priceCents: 4800, stock: {} },
    "the-romper": { priceCents: 4800, stock: {} },
  });
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("Send a Call form", () => {
  it("offers the three Calls", async () => {
    await page();
    expect(within(screen.getByRole("radiogroup", { name: "Choose a Call" })).getAllByRole("radio")).toHaveLength(3);
  });

  it("shows each Call's price", async () => {
    await page();
    expect(screen.getByText("$55.00")).toBeInTheDocument();
  });

  it("offers only pieces Shopify sells", async () => {
    await page();
    const pieces = within(screen.getByRole("radiogroup", { name: "Choose a piece" })).getAllByRole("radio").map((r) => r.getAttribute("aria-label"));
    expect(pieces).toEqual(["The Slip Dress", "The Romper"]);
  });

  it("lists the colours of the chosen piece", async () => {
    await page();
    fireEvent.click(screen.getByRole("radio", { name: "The Romper" }));
    const colours = within(screen.getByRole("radiogroup", { name: "Choose a colour" })).getAllByRole("radio").map((r) => r.getAttribute("aria-label"));
    expect(colours).toEqual(["Powder Blue", "Mocha", "After Dark", "Rose"]);
  });

  it("counts the note against 300 characters", async () => {
    await page();
    type("Your note", "Hello");
    expect(screen.getByText("5 of 300")).toBeInTheDocument();
  });

  it("sends the chosen gift to be saved", async () => {
    const start = vi.spyOn(sendModule, "startCall").mockResolvedValue({ ok: true });
    await page();
    fireEvent.click(screen.getByRole("radio", { name: "The Signature Call" }));
    fireEvent.click(screen.getByRole("radio", { name: "The Romper" }));
    fireEvent.click(screen.getByRole("radio", { name: "Rose" }));
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    await waitFor(() =>
      expect(start).toHaveBeenCalledWith({ tier: "The Signature Call", slug: "the-romper", colorway: "Rose", senderName: "Mia", senderEmail: "mia@example.com", recipientName: "Ana", recipientEmail: "ana@example.com", note: "Happy birthday" }),
    );
  });

  it("confirms a saved Call", async () => {
    vi.spyOn(sendModule, "startCall").mockResolvedValue({ ok: true });
    await page();
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(await screen.findByText("Your Call is saved. Checkout for Calls opens soon.")).toBeInTheDocument();
  });

  it("shows a refused field as an alert", async () => {
    vi.spyOn(sendModule, "startCall").mockResolvedValue({ ok: false, message: "Choose a Call." });
    await page();
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Choose a Call.");
  });

  it("does not exist while the switch is off", async () => {
    vi.stubEnv("SEND_A_CALL_ENABLED", "");
    await expect(page()).rejects.toThrow("NEXT_NOT_FOUND");
  });
});
