import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Scale } from "lucide-react";
import { getSession } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  // Already signed in → straight to the dashboard.
  if (await getSession()) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-soft px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="flex flex-col items-center text-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-brand-gold-faint">
              <Scale className="size-6 text-brand-gold" aria-hidden="true" />
            </span>
            <h1 className="mt-4 font-serif text-2xl font-semibold text-text-primary">
              Admin Dashboard
            </h1>
            <p className="mt-1 font-sans text-sm text-text-secondary">
              Sign in to manage the website content.
            </p>
          </div>

          <LoginForm />
        </div>

        <p className="mt-6 text-center font-sans text-xs text-text-muted">
          Shreyansh Rai — Advocate
        </p>
      </div>
    </main>
  );
}
