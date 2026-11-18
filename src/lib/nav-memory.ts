// The page before the current one, per browser tab, so back links can use history instead of reloading the page at its top.
const HERE = "bc-here";
const PREV = "bc-prev";

export function rememberPage(path: string) {
  try {
    const here = sessionStorage.getItem(HERE);
    if (here === path) return;
    if (here) sessionStorage.setItem(PREV, here);
    sessionStorage.setItem(HERE, path);
  } catch {}
}

export function previousPage(): string | null {
  try {
    return sessionStorage.getItem(PREV);
  } catch {
    return null;
  }
}
