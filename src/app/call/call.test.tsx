import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CallPage, { metadata } from "./[token]/page";
import * as viewModule from "@/lib/call-view";
import * as claimModule from "@/lib/claim";

vi.mock("next/navigation", () => ({ notFound: () => { throw new Error("NEXT_NOT_FOUND"); }, usePathname: () => "/call/x" }));

const open = { state: "open" as const, senderName: "Mia", recipientName: "Ana", note: "Happy birthday", piece: "The Romper", slug: "the-romper", colorway: "Rose", photo: "/images/products/studio/the-romper-rose-front.webp", sizes: ["S", "M", "L", "XL"], soldOut: ["S"] };
const page = async () => render(await CallPage({ params: Promise.resolve({ token: "t" }) }));

const fill = () => {
  fireEvent.change(screen.getByLabelText("Street address"), { target: { value: "12 Main St" } });
  fireEvent.change(screen.getByLabelText("City"), { target: { value: "Atlanta" } });
  fireEvent.change(screen.getByLabelText("State"), { target: { value: "GA" } });
  fireEvent.change(screen.getByLabelText("ZIP code"), { target: { value: "30303" } });
};

afterEach(() => vi.restoreAllMocks());

describe("Claim page", () => {
  beforeEach(() => vi.spyOn(viewModule, "callView").mockResolvedValue(open));

  it("headlines who sent which gift", async () => {
    await page();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Mia sent you The Romper in Rose");
  });

  it("shows the sender's note", async () => {
    await page();
    expect(screen.getByText("“Happy birthday”")).toBeInTheDocument();
  });

  it("shows no price", async () => {
    await page();
    expect(screen.getByRole("main").textContent).not.toContain("$");
  });

  it("disables a sold out size", async () => {
    await page();
    expect(screen.getByRole("radio", { name: "S, sold out" })).toBeDisabled();
  });

  it("claims the gift with the form values", async () => {
    const claim = vi.spyOn(claimModule, "claimCall").mockResolvedValue({ ok: true });
    await page();
    fireEvent.click(screen.getByRole("radio", { name: "M" }));
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Claim my gift" }));
    await waitFor(() => expect(claim).toHaveBeenCalledWith("t", { size: "M", address: { name: "Ana", line1: "12 Main St", line2: "", city: "Atlanta", state: "GA", zip: "30303" } }));
  });

  it("confirms a claimed gift with the city", async () => {
    vi.spyOn(claimModule, "claimCall").mockResolvedValue({ ok: true });
    await page();
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Claim my gift" }));
    expect(await screen.findByText("It's yours. We'll send it to Atlanta, GA.")).toBeInTheDocument();
  });

  it("shows a refused claim as an alert", async () => {
    vi.spyOn(claimModule, "claimCall").mockImplementation(() => new Promise((done) => setTimeout(() => done({ ok: false, message: "Choose your size." }), 50)));
    await page();
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Claim my gift" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Choose your size."));
  });
});

describe("Claim page states", () => {
  it.each([
    ["claimed", "This gift has already been claimed."],
    ["expired", "This gift link has expired."],
    ["closed", "Claiming opens soon."],
  ] as const)("explains a %s link without a form", async (state, text) => {
    vi.spyOn(viewModule, "callView").mockResolvedValue({ state });
    await page();
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Claim my gift" })).toBeNull();
  });

  it("answers not found for a link that matches no gift", async () => {
    vi.spyOn(viewModule, "callView").mockResolvedValue({ state: "missing" });
    await expect(page()).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("keeps claim links out of search engines", () => {
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });
});
