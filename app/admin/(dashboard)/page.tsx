import { FileText, MessageSquareQuote, Scale, User } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [caseCount, testimonialCount] = await Promise.all([
    prisma.caseResult.count(),
    prisma.testimonial.count(),
  ]);

  const sections = [
    {
      title: "About",
      description: "Profile, bio, education, highlights, social links.",
      meta: "Single page",
      icon: User,
    },
    {
      title: "Contact",
      description: "Phone, email, office address, hours, map.",
      meta: "Single page",
      icon: FileText,
    },
    {
      title: "Case Results",
      description: "Track record entries shown on the case results page.",
      meta: `${caseCount} ${caseCount === 1 ? "entry" : "entries"}`,
      icon: Scale,
    },
    {
      title: "Testimonials",
      description: "Client testimonials shown across the site.",
      meta: `${testimonialCount} ${testimonialCount === 1 ? "entry" : "entries"}`,
      icon: MessageSquareQuote,
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-text-primary md:text-3xl">
        Dashboard
      </h1>
      <p className="mt-1 font-sans text-sm text-text-secondary">
        Manage the content that appears on the public website.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sections.map(({ title, description, meta, icon: Icon }) => (
          <div
            key={title}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand-gold-faint">
                <Icon className="size-5 text-brand-gold" aria-hidden="true" />
              </span>
              <span className="rounded-full bg-surface-muted px-2.5 py-0.5 font-sans text-xs font-medium text-text-muted">
                {meta}
              </span>
            </div>
            <h2 className="mt-4 font-serif text-lg font-semibold text-text-primary">
              {title}
            </h2>
            <p className="mt-1 font-sans text-sm text-text-secondary">
              {description}
            </p>
            <p className="mt-3 font-sans text-xs font-medium uppercase tracking-wide text-brand-gold">
              Editor coming next
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
