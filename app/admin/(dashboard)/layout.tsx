import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut, Scale } from "lucide-react";
import { getSession } from "@/lib/auth";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Real session validation (DB lookup). proxy.ts only does an optimistic
  // cookie-presence check, so this is the authoritative gate.
  if (!(await getSession())) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-surface-soft">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 md:px-8">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 font-serif text-lg font-semibold text-text-primary"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand-gold-faint">
              <Scale className="size-4 text-brand-gold" aria-hidden="true" />
            </span>
            Admin Dashboard
          </Link>

          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 font-sans text-sm font-medium text-text-secondary transition-colors hover:bg-surface-muted"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
        {children}
      </main>
    </div>
  );
}
