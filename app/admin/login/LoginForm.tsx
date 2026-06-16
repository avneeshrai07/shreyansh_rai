"use client";

import { useActionState } from "react";
import { Lock, LogIn } from "lucide-react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="username"
          className="block font-sans text-sm font-medium text-text-secondary"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          autoFocus
          required
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 font-sans text-sm text-text-primary shadow-sm outline-none transition-colors focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block font-sans text-sm font-medium text-text-secondary"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 font-sans text-sm text-text-primary shadow-sm outline-none transition-colors focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30"
        />
      </div>

      {state.error ? (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-3.5 py-2.5 font-sans text-sm text-red-700"
        >
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-gold px-4 py-2.5 font-sans text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-gold-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? (
          "Signing in…"
        ) : (
          <>
            <LogIn className="size-4" aria-hidden="true" />
            Sign in
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 font-sans text-xs text-text-muted">
        <Lock className="size-3" aria-hidden="true" />
        Secure area — authorised access only.
      </p>
    </form>
  );
}
