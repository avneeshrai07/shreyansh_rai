"use client";

import { cn } from "@/lib/utils";
import { useContent } from "@/lib/content";

export function StatsStrip() {
  const c = useContent();

  return (
    <section
      aria-label="Key statistics"
      className="w-full bg-text-primary px-4 md:px-8 py-8"
    >
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
        {c.stats.map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              "text-center md:px-6",
              i > 0 && "md:border-l md:border-slate-700",
            )}
          >
            <p className="font-serif text-3xl font-bold text-brand-gold-light">
              {stat.value}
            </p>
            <p className="mt-1 font-sans text-sm uppercase tracking-wider text-slate-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
