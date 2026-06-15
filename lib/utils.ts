/**
 * cn — tiny conditional className joiner (HARD_FOCUS_RULES T5).
 * Filters out falsy values and joins the rest with a space.
 */
export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}
