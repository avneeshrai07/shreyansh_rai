import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  heading: string;
  /** id applied to the <h2> so a parent <section> can aria-labelledby it. */
  headingId?: string;
  centered?: boolean;
}

/**
 * Reusable section eyebrow label + <h2> (HARD_FOCUS_RULES S2 — always an h2).
 */
export function SectionHeader({
  label,
  heading,
  headingId,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-8", centered && "text-center")}>
      <p className="text-xs font-sans font-medium uppercase tracking-widest text-brand-gold">
        {label}
      </p>
      <h2
        id={headingId}
        className="mt-1 font-serif text-2xl md:text-3xl font-semibold text-text-primary"
      >
        {heading}
      </h2>
    </div>
  );
}
