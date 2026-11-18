import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { GiftButton } from "./gift-button";
import * as sendModule from "@/lib/send-call";

const open = () => fireEvent.click(screen.getByRole("button", { name: "Send a Call" }));
const dialog = () => screen.getByRole("dialog", { name: "Choose their gift" });
const type = (label: string, value: string) => fireEvent.change(within(dialog()).getByLabelText(label), { target: { value } });
const checked = (group: string) => within(dialog()).queryByRole("radiogroup", { name: group })?.querySelector("input:checked") ?? null;
const pick = (group: string, name?: string) => {
  const radios = within(within(dialog()).getByRole("radiogroup", { name: group })).getAllByRole("radio");
  fireEvent.click(name ? radios.find((r) => r.getAttribute("aria-label") === name)! : radios[0]);
};
// A shopper picks whatever is still missing, then presses Next.
const toDetails = () => {
  if (!checked("Choose a Call")) pick("Choose a Call", "The Signature Call");
  if (!checked("Choose a piece")) pick("Choose a piece", "The Romper");
  if (!checked("Choose a colour")) pick("Choose a colour");
  fireEvent.click(within(dialog()).getByRole("button", { name: "Next" }));
};
const fill = () => {
  type("Your name", "Mia");
  type("Your email", "mia@example.com");
  type("Their first name", "Ana");
  type("Their email", "ana@example.com");
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

  it("moves to their details on Next", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    toDetails();
    expect(within(dialog()).getByLabelText("Their email")).toBeInTheDocument();
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

describe("Gift pop-up starts with nothing chosen", () => {
  it("opens a general Send a Call with no Call or piece chosen", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    expect([checked("Choose a Call"), checked("Choose a piece")]).toEqual([null, null]);
  });

  it("keeps Next greyed out while a choice is missing", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    pick("Choose a Call", "The Mini Call");
    pick("Choose a piece", "The Romper");
    expect(within(dialog()).getByRole("button", { name: "Next" })).toHaveAttribute("aria-disabled", "true");
  });

  it("explains what is still missing beside Next", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    expect(within(dialog()).getByRole("button", { name: "Next" })).toHaveAccessibleDescription("Choose a Call, a piece and a colour.");
  });

  it("enables Next once all three are chosen", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    pick("Choose a Call", "The Mini Call");
    pick("Choose a piece", "The Romper");
    pick("Choose a colour", "Mocha");
    expect(within(dialog()).getByRole("button", { name: "Next" })).toHaveAttribute("aria-disabled", "false");
  });

  it("hides the colour row until a piece is chosen", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    expect(within(dialog()).queryByRole("radiogroup", { name: "Choose a colour" })).toBeNull();
  });

  it("shows the piece's colours once it is chosen", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    pick("Choose a piece", "The Romper");
    expect(within(within(dialog()).getByRole("radiogroup", { name: "Choose a colour" })).getAllByRole("radio").length).toBeGreaterThan(0);
  });

  it("keeps Next reachable by keyboard while a choice is missing", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    expect(within(dialog()).getByRole("button", { name: "Next" })).not.toBeDisabled();
  });

  it("stays on step 1 when Next is pressed with a choice missing", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    fireEvent.click(within(dialog()).getByRole("button", { name: "Next" }));
    expect(within(dialog()).getByText("Step 1 of 2")).toBeInTheDocument();
  });

  it("drops the hint from Next once everything is chosen", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    pick("Choose a Call", "The Mini Call");
    pick("Choose a piece", "The Romper");
    pick("Choose a colour", "Mocha");
    expect(within(dialog()).getByRole("button", { name: "Next" })).not.toHaveAttribute("aria-describedby");
  });

  it("keeps Next unavailable for a piece that is not for sale", async () => {
    render(<GiftButton label="Send as a gift" start={{ slug: "the-boujie-set", colorway: "Rose" }} />);
    fireEvent.click(screen.getByRole("button", { name: "Send as a gift" }));
    await waitFor(() => expect(within(dialog()).queryByRole("radio", { name: "The Boujie Set" })).toBeNull());
    pick("Choose a Call", "The Mini Call");
    expect(within(dialog()).getByRole("button", { name: "Next" })).toHaveAttribute("aria-disabled", "true");
  });

  it("keeps Next unavailable for a colour the piece does not come in", () => {
    render(<GiftButton label="Send as a gift" start={{ slug: "the-romper", colorway: "Bloom" }} />);
    fireEvent.click(screen.getByRole("button", { name: "Send as a gift" }));
    pick("Choose a Call", "The Mini Call");
    expect(within(dialog()).getByRole("button", { name: "Next" })).toHaveAttribute("aria-disabled", "true");
  });

  it("clears the colour when another piece is chosen", () => {
    render(<GiftButton label="Send a Call" start={{ slug: "the-romper", colorway: "Mocha" }} />);
    open();
    pick("Choose a piece", "The Slip Dress");
    expect(checked("Choose a colour")).toBeNull();
  });

  it("keeps the product page's choice in Send as a gift", () => {
    render(<GiftButton label="Send as a gift" start={{ slug: "the-romper", colorway: "Mocha" }} />);
    fireEvent.click(screen.getByRole("button", { name: "Send as a gift" }));
    expect([checked("Choose a Call"), checked("Choose a piece")?.getAttribute("aria-label"), checked("Choose a colour")?.getAttribute("aria-label")]).toEqual([null, "The Romper", "Mocha"]);
  });
});

describe("Gift pop-up before Send a Call opens", () => {
  beforeEach(() => vi.stubEnv("NEXT_PUBLIC_CALLS_OPEN", ""));

  it("lets people see their details step", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    toDetails();
    expect(within(dialog()).getByLabelText("Their email")).toBeInTheDocument();
  });

  it("greys out the final button", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    toDetails();
    expect(within(dialog()).getByRole("button", { name: "Opens soon" })).toBeDisabled();
  });

  it("says sending opens soon beside the final button", () => {
    render(<GiftButton label="Send a Call" />);
    open();
    toDetails();
    expect(within(dialog()).getByText("Send a Call opens soon. You can look through the form, but nothing is sent yet.")).toBeInTheDocument();
  });

  it("never sends while closed", () => {
    const start = vi.spyOn(sendModule, "startCall");
    render(<GiftButton label="Send a Call" />);
    open();
    toDetails();
    fireEvent.click(within(dialog()).getByRole("button", { name: "Opens soon" }));
    expect(start).not.toHaveBeenCalled();
  });
});
