"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Server Actions are reachable via direct POST requests, so every one of them
// re-checks the admin session before touching the database.
async function requireAdmin(): Promise<void> {
  if (!(await getSession())) {
    throw new Error("Unauthorized");
  }
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

/** Optional string: empty input becomes null so the Hindi fallback kicks in. */
function optStr(formData: FormData, key: string): string | null {
  const value = str(formData, key);
  return value === "" ? null : value;
}

function bool(formData: FormData, key: string): boolean {
  return formData.get(key) != null;
}

/** Rating clamped to 1–5; out-of-range or empty falls back to 5. */
function rating(formData: FormData): number {
  const n = Number.parseInt(str(formData, "rating"), 10);
  if (!Number.isFinite(n)) return 5;
  return Math.min(5, Math.max(1, n));
}

function refresh(): void {
  // Highlighted testimonials appear on the home page; all on /testimonials.
  revalidatePath("/");
  revalidatePath("/testimonials");
  revalidatePath("/admin/testimonials");
}

export async function createTestimonial(formData: FormData): Promise<void> {
  await requireAdmin();

  const clientName = str(formData, "clientName");
  const quoteEn = str(formData, "quoteEn");
  if (!clientName || !quoteEn) {
    return;
  }

  await prisma.testimonial.create({
    data: {
      clientName,
      clientRoleEn: optStr(formData, "clientRoleEn"),
      clientRoleHi: optStr(formData, "clientRoleHi"),
      quoteEn,
      quoteHi: optStr(formData, "quoteHi"),
      rating: rating(formData),
      caseType: optStr(formData, "caseType"),
      isHighlight: bool(formData, "isHighlight"),
    },
  });

  refresh();
}

export async function updateTestimonial(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = str(formData, "id");
  const clientName = str(formData, "clientName");
  const quoteEn = str(formData, "quoteEn");
  if (!id || !clientName || !quoteEn) {
    return;
  }

  await prisma.testimonial.update({
    where: { id },
    data: {
      clientName,
      clientRoleEn: optStr(formData, "clientRoleEn"),
      clientRoleHi: optStr(formData, "clientRoleHi"),
      quoteEn,
      quoteHi: optStr(formData, "quoteHi"),
      rating: rating(formData),
      caseType: optStr(formData, "caseType"),
      isHighlight: bool(formData, "isHighlight"),
    },
  });

  refresh();
}

export async function deleteTestimonial(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = str(formData, "id");
  if (!id) return;

  await prisma.testimonial.delete({ where: { id } });

  refresh();
}
