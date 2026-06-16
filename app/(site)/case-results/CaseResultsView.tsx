"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useContent } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { CaseCard } from "@/components/sections/CaseCard";
import type { CaseResult } from "@/lib/sanity/queries";

const ALL = "__all__";

function uniqueSorted(values: (string | undefined)[]) {
  return Array.from(new Set(values.filter(Boolean) as string[])).sort();
}

const selectClasses =
  "w-full text-base font-sans border border-slate-200 rounded-lg px-4 py-3 min-h-[48px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent";

export function CaseResultsView({ cases }: { cases: CaseResult[] }) {
  const c = useContent();

  const [court, setCourt] = useState(ALL);
  const [outcome, setOutcome] = useState(ALL);
  const [category, setCategory] = useState(ALL);

  const courts = useMemo(() => uniqueSorted(cases.map((x) => x.court)), [cases]);
  const outcomes = useMemo(
    () => uniqueSorted(cases.map((x) => x.outcome)),
    [cases],
  );
  const categories = useMemo(
    () => uniqueSorted(cases.map((x) => x.category)),
    [cases],
  );

  const filtered = cases.filter(
    (x) =>
      (court === ALL || x.court === court) &&
      (outcome === ALL || x.outcome === outcome) &&
      (category === ALL || x.category === category),
  );

  return (
    <main id="main-content">
      <article>
        <PageHero
          label={c.pages.caseResults.label}
          title={c.pages.caseResults.title}
          subtitle={c.pages.caseResults.subtitle}
        />

        <section
          aria-labelledby="cases-heading"
          className="w-full px-4 md:px-8 py-12 md:py-20 max-w-5xl mx-auto"
        >
          <h2 id="cases-heading" className="sr-only">
            {c.pages.caseResults.title}
          </h2>

          {/* Filters — first on mobile (M9) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="block">
              <span className="block mb-1 font-sans text-xs font-medium uppercase tracking-wide text-text-secondary">
                {c.caseResults.filterCourt}
              </span>
              <select
                value={court}
                onChange={(e) => setCourt(e.target.value)}
                className={selectClasses}
              >
                <option value={ALL}>{c.caseResults.filterAll}</option>
                {courts.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="block mb-1 font-sans text-xs font-medium uppercase tracking-wide text-text-secondary">
                {c.caseResults.filterOutcome}
              </span>
              <select
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                className={selectClasses}
              >
                <option value={ALL}>{c.caseResults.filterAll}</option>
                {outcomes.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="block mb-1 font-sans text-xs font-medium uppercase tracking-wide text-text-secondary">
                {c.caseResults.filterCategory}
              </span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={selectClasses}
              >
                <option value={ALL}>{c.caseResults.filterAll}</option>
                {categories.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="mt-6 font-sans text-sm text-text-muted">
            {filtered.length}{" "}
            {filtered.length === 1
              ? c.caseResults.resultsCount
              : c.caseResults.resultsCountPlural}
          </p>

          {filtered.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {filtered.map((item) => (
                <CaseCard key={item._id} data={item} />
              ))}
            </div>
          ) : (
            <p className="mt-4 font-sans text-sm text-text-secondary">
              {c.caseResults.empty}
            </p>
          )}

          {/* Internal links (S7: Cases → About, Contact) */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/about"
              className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 border border-brand-gold text-brand-gold font-sans font-medium text-sm rounded-lg hover:bg-brand-gold-faint transition-colors duration-200"
            >
              {c.pages.about.title}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 bg-brand-gold text-white font-sans font-medium text-sm rounded-lg hover:bg-brand-gold-light transition-colors duration-200"
            >
              {c.homeCta.button}
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
