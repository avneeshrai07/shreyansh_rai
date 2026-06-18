import Link from "next/link";
import { ArrowLeft, Mail, Phone, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { telHref } from "@/lib/site";
import { deleteInquiry, markRead } from "./actions";

export const metadata = {
  title: "Inquiries — Admin",
};

// Inquiries are time-sensitive leads, so never serve a cached copy.
export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function InquiriesAdminPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to dashboard
      </Link>

      <h1 className="mt-4 font-serif text-2xl font-semibold text-text-primary md:text-3xl">
        Inquiries
      </h1>
      <p className="mt-1 font-sans text-sm text-text-secondary">
        Messages submitted through the contact form. Newest first.
      </p>

      <div className="mt-8 space-y-4">
        {inquiries.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center font-sans text-sm text-text-muted">
            No inquiries yet.
          </p>
        )}

        {inquiries.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl border bg-white p-5 ${
              item.isRead ? "border-slate-200" : "border-brand-gold"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-lg font-semibold text-text-primary">
                    {item.name}
                  </h2>
                  {!item.isRead && (
                    <span className="rounded-full bg-brand-gold px-2 py-0.5 font-sans text-xs font-medium text-white">
                      New
                    </span>
                  )}
                </div>
                <p className="mt-0.5 font-sans text-xs text-text-muted">
                  {dateFmt.format(item.createdAt)} · {item.matter} · prefers{" "}
                  {item.preferred === "hi" ? "Hindi" : "English"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={telHref(item.phone)}
                  className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-brand-gold hover:underline"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {item.phone}
                </a>
                {item.email && (
                  <a
                    href={`mailto:${item.email}`}
                    className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-brand-gold hover:underline"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    {item.email}
                  </a>
                )}
              </div>
            </div>

            <p className="mt-3 whitespace-pre-line font-sans text-sm text-text-secondary">
              {item.description}
            </p>

            <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3">
              <form action={markRead}>
                <input type="hidden" name="id" value={item.id} />
                <input
                  type="hidden"
                  name="isRead"
                  value={(!item.isRead).toString()}
                />
                <button
                  type="submit"
                  className="font-sans text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                >
                  {item.isRead ? "Mark as unread" : "Mark as read"}
                </button>
              </form>

              <form action={deleteInquiry}>
                <input type="hidden" name="id" value={item.id} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-red-600 transition-colors hover:text-red-700"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
