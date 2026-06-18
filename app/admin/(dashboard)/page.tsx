import Link from "next/link";
import {
  BarChart3,
  FileText,
  Inbox,
  MessageSquareQuote,
  Scale,
  User,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [caseCount, testimonialCount, statCount, unreadInquiryCount] =
    await Promise.all([
      prisma.caseResult.count(),
      prisma.testimonial.count(),
      prisma.stat.count(),
      prisma.inquiry.count({ where: { isRead: false } }),
    ]);

  const sections = [
    {
      title: "Stats",
      description: "The figures in the strip below the hero on the home page.",
      meta: `${statCount} ${statCount === 1 ? "entry" : "entries"}`,
      icon: BarChart3,
      href: "/admin/stats",
    },
    {
      title: "About",
      description: "Profile, bio, education, highlights, social links.",
      meta: "Single page",
      icon: User,
      href: "/admin/about",
    },
    {
      title: "Contact",
      description: "Phone, email, office address, hours, map.",
      meta: "Single page",
      icon: FileText,
      href: "/admin/contact",
    },
    {
      title: "Case Results",
      description: "Track record entries shown on the case results page.",
      meta: `${caseCount} ${caseCount === 1 ? "entry" : "entries"}`,
      icon: Scale,
      href: "/admin/case-results",
    },
    {
      title: "Testimonials",
      description: "Client testimonials shown across the site.",
      meta: `${testimonialCount} ${testimonialCount === 1 ? "entry" : "entries"}`,
      icon: MessageSquareQuote,
      href: "/admin/testimonials",
    },
    {
      title: "Inquiries",
      description: "Messages submitted through the contact form.",
      meta:
        unreadInquiryCount > 0 ? `${unreadInquiryCount} new` : "No new messages",
      icon: Inbox,
      href: "/admin/inquiries",
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
        {sections.map(({ title, description, meta, icon: Icon, href }) => (
          <Link
            key={title}
            href={href}
            className="group rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-gold"
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
            <p className="mt-3 font-sans text-xs font-medium uppercase tracking-wide text-brand-gold opacity-0 transition-opacity group-hover:opacity-100">
              Open editor →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
