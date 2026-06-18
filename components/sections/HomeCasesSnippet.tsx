"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CaseCard } from "@/components/sections/CaseCard";
import type { CaseResult } from "@/lib/content/types";

export function HomeCasesSnippet({ cases }: { cases: CaseResult[] }) {
  const c = useContent();

  return (
    <section
      aria-labelledby="home-cases-heading"
      className="w-full bg-surface-soft"
    >
      <div className="w-full px-4 md:px-8 py-12 md:py-20 max-w-5xl mx-auto">
        <SectionHeader
          label={c.homeCases.label}
          heading={c.homeCases.heading}
          headingId="home-cases-heading"
        />

        {cases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {cases.map((item) => (
              <CaseCard key={item.id} data={item} />
            ))}
          </div>
        ) : (
          <p className="font-sans text-sm text-text-secondary">
            {c.homeCases.empty}
          </p>
        )}

        <div className="mt-8">
          <Link
            href="/case-results"
            className="inline-flex items-center gap-1 min-h-[44px] font-sans text-sm font-medium text-brand-gold underline-offset-4 hover:underline"
          >
            {c.homeCases.viewAll}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
