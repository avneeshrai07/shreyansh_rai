"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "hi";

const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
}>({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);

/**
 * Keeps the document <html lang="..."> attribute in sync with the selected
 * language for accessibility + SEO (HARD_FOCUS_RULES S12). Render inside the
 * LanguageProvider. Renders nothing.
 */
export function LangAttributeSync() {
  const { lang } = useLang();
  useEffect(() => {
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
  }, [lang]);
  return null;
}
