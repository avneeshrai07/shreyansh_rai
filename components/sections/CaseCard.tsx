"use client";

import { useLang } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import type { CaseResult } from "@/lib/content/types";

// Outcome badge colours (HARD_FOCUS_RULES T8).
const outcomeBadgeClasses: Record<string, string> = {
  Acquittal: "bg-green-50 text-green-700 border border-green-200",
  "Bail Granted": "bg-blue-50 text-blue-700 border border-blue-200",
  "Charges Dropped": "bg-purple-50 text-purple-700 border border-purple-200",
  "Case Won": "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Sentence Reduced": "bg-orange-50 text-orange-700 border border-orange-200",
  "Stay Granted": "bg-amber-50 text-amber-700 border border-amber-200",
};

export function CaseCard({ data }: { data: CaseResult }) {
  const { lang } = useLang();
  const title = lang === "hi" && data.titleHi ? data.titleHi : data.titleEn;
  const summary =
    lang === "hi" && data.summaryHi ? data.summaryHi : data.summaryEn;

  return (
    <article className="bg-white border border-slate-100 rounded-lg p-5 hover:border-brand-gold hover:shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "inline-block text-xs font-sans font-medium px-2.5 py-1 rounded-full",
            outcomeBadgeClasses[data.outcome] ??
              "bg-slate-50 text-slate-600 border border-slate-200",
          )}
        >
          {data.outcome}
        </span>
        <span className="font-sans text-sm text-text-muted">{data.year}</span>
      </div>

      <h3 className="mt-3 font-serif text-lg text-text-primary leading-snug">
        {title}
      </h3>

      <p className="mt-1 font-sans text-xs uppercase tracking-wide text-brand-gold">
        {data.court}
      </p>

      <p className="mt-2 font-sans text-sm text-text-secondary leading-relaxed line-clamp-3">
        {summary}
      </p>

      {data.category ? (
        <span className="inline-block mt-3 font-sans text-xs text-text-secondary bg-surface-muted px-2.5 py-1 rounded-full">
          {data.category}
        </span>
      ) : null}
    </article>
  );
}
