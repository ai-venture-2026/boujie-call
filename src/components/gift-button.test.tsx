import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { GiftButton } from "./gift-button";
import * as sendModule from "@/lib/send-call";

const open = () => fireEvent.click(screen.getByRole("button", { name: "Send a Call" }));
const dialog = () => screen.getByRole("dialog", { name: "Choose her gift" });
const type = (label: string, value: string) => fireEvent.change(within(dialog()).getByLabelText(label), { target: { value } });
const toDetails = () => fireEvent.click(within(dialog()).getByRole("button", { name: "Next" }));
const fill = () => {
  type("Your name", "Mia");
  type("Your email", "mia@example.com");
  type("Her first name", "Ana");
  type("Her email", "ana@example.com");
  type("Your note", "Happy birthday");
};

beforeEach(() => vi.stubEnv("NEXT_PUBLIC_CALLS_OPEN", "true"));
afterEach(() => vi.unstubAllEnvs());
beforeEach(() => vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ "the-slip-dress": 4800, "the-romper": 4800 }) })));
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Gift pop-up", () => {
  it("counts the steps once Send a Call is open", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    expect(within(dialog()).getByText("Step 1 of 2")).toBeInTheDocument();
  });

  it("opens on the gift choice", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    expect(within(dialog()).getByRole("radiogroup", { name: "Choose a Call" })).toBeInTheDocument();
  });

  it("offers only pieces Shopify prices", async () => {
    render(<GiftButton label="Send a Call" />);
    open();
    await waitFor(() => expect(within(dialog()).queryByRole("radio", { name: "The Boujie Set" })).toBeNull());
  });

  it("starts on the colour it was given", () => {
    render(<GiftButton label="Send a Call" start={{ slug: "the-romper", colorway: "Mocha" }} />);
    open();
    expect(within(dialog()).getByRole("radio", { name: "Mocha" })).toBeChecked();
  });

  it("moves to her details on Next", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    toDetails();
    expect(within(dialog()).getByLabelText("Her email")).toBeInTheDocument();
  });

  it("keeps the choice when going back", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    fireEvent.click(within(dialog()).getByRole("radio", { name: "The Romper" }));
    toDetails();
    fireEvent.click(within(dialog()).getByRole("button", { name: "Back" }));
    expect(within(dialog()).getByRole("radio", { name: "The Romper" })).toBeChecked();
  });

  it("sends the gift to be saved", async () => {
    const start = vi.spyOn(sendModule, "startCall").mockResolvedValue({ ok: true });
    render(<GiftButton label="Send a Call" start={{ slug: "the-romper", colorway: "Rose" }} />);
    open();
    toDetails();
    fill();
    fireEvent.click(within(dialog()).getByRole("button", { name: "Continue" }));
    await waitFor(() =>
      expect(start).toHaveBeenCalledWith({ tier: "The Signature Call", slug: "the-romper", colorway: "Rose", senderName: "Mia", senderEmail: "mia@example.com", recipientName: "Ana", recipientEmail: "ana@example.com", note: "Happy birthday" }),
    );
  });

  it("shows the answer inside the pop-up", async () => {
    vi.spyOn(sendModule, "startCall").mockResolvedValue({ ok: false, message: "Send a Call opens soon." });
    render(<GiftButton label="Send a Call" />);
    open();
    toDetails();
    fill();
    fireEvent.click(within(dialog()).getByRole("button", { name: "Continue" }));
    expect(await within(dialog()).findByRole("alert")).toHaveTextContent("Send a Call opens soon.");
  });

  it("closes without sending", () => {
    const start = vi.spyOn(sendModule, "startCall");
    render(<GiftButton label="Send a Call" />);
    open();
    fireEvent.click(within(dialog()).getByRole("button", { name: "Close" }));
    expect(document.querySelector("dialog")).not.toHaveAttribute("open");
    expect(start).not.toHaveBeenCalled();
  });

  it("names each pop-up's choices apart when a page has two", () => {
    render(
      <>
        <GiftButton label="Send a Call" />
        <GiftButton label="Gift it" />
      </>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Send a Call" }));
    fireEvent.click(screen.getByRole("button", { name: "Gift it" }));
    const names = [...document.querySelectorAll<HTMLInputElement>('input[aria-label="The Signature Call"]')].map((r) => r.name);
    expect(new Set(names).size).toBe(2);
  });
});

describe("Gift pop-up before Send a Call opens", () => {
  beforeEach(() => vi.stubEnv("NEXT_PUBLIC_CALLS_OPEN", ""));

  it("says Send a Call opens soon", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    expect(within(dialog()).getByText("Send a Call opens soon. Look around, and come back to send her gift.")).toBeInTheDocument();
  });

  it("labels the pop-up Coming soon instead of a step", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    expect(within(dialog()).queryByText(/Step 1 of 2/)).toBeNull();
  });

  it("offers no way on to her details", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    expect(within(dialog()).queryByRole("button", { name: "Next" })).toBeNull();
  });
});
