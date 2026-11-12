import type { CallStore } from "./calls";

// The developer returns the database adapter here (decision 0001); until then claiming is closed.
export function getCallStore(): CallStore | null {
  return null;
}
