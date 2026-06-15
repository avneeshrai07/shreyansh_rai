"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useContent } from "@/lib/content";

const inputClasses =
  "w-full text-base font-sans border border-slate-200 rounded-lg px-4 py-3 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent placeholder:text-text-muted";

const labelClasses =
  "block mb-1 font-sans text-sm font-medium text-text-primary";

export function ContactForm() {
  const c = useContent();

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    matter: "",
    description: "",
    preferred: "en",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const set = (key: keyof typeof values, v: string) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  const handleSubmit = () => {
    if (!values.name || !values.phone || !values.matter || !values.description) {
      setError(true);
      return;
    }
    setError(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-start gap-3 bg-brand-gold-faint border border-amber-200 rounded-lg p-5">
        <CheckCircle2
          className="size-6 shrink-0 text-brand-gold mt-0.5"
          aria-hidden="true"
        />
        <p
          role="status"
          className="font-sans text-base text-text-primary leading-relaxed"
        >
          {c.contact.success}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-serif text-xl font-medium text-text-primary">
        {c.contact.formHeading}
      </h2>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="cf-name" className={labelClasses}>
            {c.contact.fullName} *
          </label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="cf-phone" className={labelClasses}>
            {c.contact.phoneNumber} *
          </label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="cf-email" className={labelClasses}>
            {c.contact.emailAddress}
          </label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="cf-matter" className={labelClasses}>
            {c.contact.matterType} *
          </label>
          <select
            id="cf-matter"
            value={values.matter}
            onChange={(e) => set("matter", e.target.value)}
            className={`${inputClasses} bg-white`}
          >
            <option value="">—</option>
            {c.contact.matterTypes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cf-desc" className={labelClasses}>
            {c.contact.description} *
          </label>
          <textarea
            id="cf-desc"
            rows={4}
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            className={`${inputClasses} resize-none`}
          />
        </div>

        <fieldset>
          <legend className={labelClasses}>
            {c.contact.preferredLanguage}
          </legend>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center gap-2 min-h-[44px] font-sans text-base text-text-secondary">
              <input
                type="radio"
                name="cf-lang"
                value="en"
                checked={values.preferred === "en"}
                onChange={(e) => set("preferred", e.target.value)}
                className="size-4 accent-brand-gold"
              />
              {c.contact.langEnglish}
            </label>
            <label className="inline-flex items-center gap-2 min-h-[44px] font-sans text-base text-text-secondary">
              <input
                type="radio"
                name="cf-lang"
                value="hi"
                checked={values.preferred === "hi"}
                onChange={(e) => set("preferred", e.target.value)}
                className="size-4 accent-brand-gold"
              />
              {c.contact.langHindi}
            </label>
          </div>
        </fieldset>

        {error ? (
          <p role="alert" className="font-sans text-sm text-red-600">
            {c.contact.fullName}, {c.contact.phoneNumber},{" "}
            {c.contact.matterType} &amp; {c.contact.description}.
          </p>
        ) : null}

        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center justify-center w-full min-h-[52px] px-6 py-3 bg-brand-gold text-white font-sans font-medium text-base rounded-lg hover:bg-brand-gold-light transition-colors duration-200"
        >
          {c.contact.submit}
        </button>

        <p className="font-sans text-xs text-text-muted">
          {c.contact.legalNote}
        </p>
      </div>
    </div>
  );
}
