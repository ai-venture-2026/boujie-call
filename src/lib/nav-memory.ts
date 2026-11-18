// The page before the current one, held in the running app's memory only: leaving the site, a new tab or a reload starts fresh,
// so back links never send a shopper off the site. Paths only, which holds while no in-site page pushes a same-path entry.
let here: string | null = null;
let prev: string | null = null;

export function rememberPage(path: string) {
  if (here === path) return;
  prev = here;
  here = path;
}

export function previousPage(): string | null {
  return prev;
}

export function forgetPages() {
  here = null;
  prev = null;
}
