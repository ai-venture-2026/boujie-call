import { fireEvent, render, screen, within } from "@testing-library/react";
import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("Header links on the page already open", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it("scrolls Home to the top from the logo", () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getAllByRole("link", { name: "Boujie Call home" })[0]);
    expect(window.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
  });

  it("scrolls Home to the top from the Home link", () => {
    render(<SiteHeader />);
    fireEvent.click(within(screen.getByRole("navigation", { name: "Main" })).getByRole("link", { name: "Home" }));
    expect(window.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
  });

  it("scrolls Home to the top from the phone menu", () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("link", { name: "Home" }));
    expect(window.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
  });

  it("leaves the page in place on a Cmd click", () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getAllByRole("link", { name: "Boujie Call home" })[0], { metaKey: true });
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("leaves the scroll alone for a link to another page", () => {
    render(<SiteHeader />);
    fireEvent.click(within(screen.getByRole("navigation", { name: "Main" })).getByRole("link", { name: "Shop" }));
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
