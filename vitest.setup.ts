import "@testing-library/jest-dom/vitest";
import { configure } from "@testing-library/react";

// A busy machine makes renders several times slower; prices and pop-ups can take more than the 1 s default to appear.
configure({ asyncUtilTimeout: 5000 });

// jsdom has no showModal or close on <dialog>.
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
  this.setAttribute("open", "");
};
HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
  this.removeAttribute("open");
};

// Shop filters live in the address, so each test starts on a clean address.
beforeEach(() => window.history.replaceState(null, "", "/"));
