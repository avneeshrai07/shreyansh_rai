"use client";

import { useLang } from "@/context/LanguageContext";

/**
 * Single-button EN / हिं language switch (ADVOCATE_PORTFOLIO_PLAN 7.4).
 */
export function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "hi" : "en")}
      className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-3 py-1 font-sans text-sm text-text-secondary border border-slate-300 rounded hover:border-brand-gold hover:text-brand-gold transition-colors"
      aria-label={
        lang === "en" ? "Switch to Hindi" : "Switch to English (अंग्रेज़ी)"
      }
    >
      {lang === "en" ? "हिं" : "EN"}
    </button>
  );
}
