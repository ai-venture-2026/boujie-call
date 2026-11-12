// Form values come from the browser: strings only, over-long values refused rather than cut,
// and control, line-break, zero-width and direction characters flattened so the label matches what is stored.
export const clean = (value: unknown, max: number) => {
  if (typeof value !== "string" || value.length > max * 2) return null;
  const text = value.replace(/[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u2028-\u202e\u2060-\u2064\ufeff]+/g, " ").trim();
  return text.length > max ? null : text;
};

export const hasControl = (value: unknown) => typeof value === "string" && /[\u0000-\u001f\u007f]/.test(value);
