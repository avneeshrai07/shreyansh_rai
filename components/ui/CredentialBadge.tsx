import type { ReactNode } from "react";

/**
 * Pill badge for qualifications / credentials (HARD_FOCUS_RULES T7).
 */
export function CredentialBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block mr-2 mb-2 px-3 py-1.5 font-sans text-xs text-text-secondary bg-surface-muted border border-slate-200 rounded-full">
      {children}
    </span>
  );
}
