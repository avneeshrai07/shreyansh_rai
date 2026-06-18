"use client";

import { useLang } from "@/context/LanguageContext";
import type { Testimonial } from "@/lib/content/types";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function TestimonialCard({ data }: { data: Testimonial }) {
  const { lang } = useLang();
  const quote = lang === "hi" && data.quoteHi ? data.quoteHi : data.quoteEn;
  const role =
    lang === "hi" && data.clientRoleHi ? data.clientRoleHi : data.clientRoleEn;
  const rating = data.rating ?? 5;

  return (
    <article className="break-inside-avoid mb-6 bg-white border border-slate-100 rounded-lg p-6">
      {/* Star rating */}
      <p
        className="font-sans text-base tracking-wide text-brand-gold-light"
        aria-label={`Rated ${rating} out of 5`}
      >
        <span aria-hidden="true">
          {"★".repeat(rating)}
          <span className="text-slate-200">{"★".repeat(5 - rating)}</span>
        </span>
      </p>

      {/* Quote with signature gold bar */}
      <blockquote className="mt-4 border-l-4 border-brand-gold pl-4">
        <p className="font-serif italic text-base text-text-primary leading-relaxed">
          <span
            className="font-serif text-brand-gold not-italic"
            aria-hidden="true"
          >
            “
          </span>
          {quote}
        </p>
      </blockquote>

      {/* Client identity */}
      <div className="mt-5 flex items-center gap-3">
        <span
          className="flex items-center justify-center size-10 rounded-full bg-brand-gold-faint font-serif text-sm text-brand-gold"
          aria-hidden="true"
        >
          {initials(data.clientName)}
        </span>
        <div>
          <p className="font-sans font-medium text-text-primary">
            {data.clientName}
          </p>
          {role || data.caseType ? (
            <p className="font-sans text-xs text-text-muted">
              {role ?? data.caseType}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
