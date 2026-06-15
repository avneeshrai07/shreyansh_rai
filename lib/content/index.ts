"use client";

import { useLang } from "@/context/LanguageContext";
import { en } from "./en";
import { hi } from "./hi";

/**
 * useContent — returns the static UI strings for the active language.
 * Use inside Client Components only (depends on the language context).
 */
export function useContent() {
  const { lang } = useLang();
  return lang === "hi" ? hi : en;
}

export { en, hi };
export type { Content } from "./en";
