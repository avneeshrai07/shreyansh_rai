interface PageHeroProps {
  label: string;
  /** This is the page's single <h1> (HARD_FOCUS_RULES S1). */
  title: string;
  subtitle?: string;
}

/**
 * Dark banner at the top of every inner page. Renders the page <h1>.
 * Dark background → all text explicitly set light (HARD_FOCUS_RULES T9).
 */
export function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <header className="w-full bg-text-primary py-16 md:py-24 px-4 md:px-8">
      <div className="w-full max-w-5xl mx-auto">
        <p className="text-xs font-sans font-medium uppercase tracking-widest text-brand-gold-light">
          {label}
        </p>
        <h1 className="mt-2 font-serif text-3xl md:text-5xl font-bold text-white leading-tight">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl font-sans text-base text-slate-400">
            {subtitle}
          </p>
        ) : null}
      </div>
    </header>
  );
}
