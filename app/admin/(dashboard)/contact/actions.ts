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

/** Optional string: empty input becomes null so the view's fallback kicks in. */
function optStr(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? "").trim();
  return value === "" ? null : value;
}

export async function updateContact(formData: FormData): Promise<void> {
  await requireAdmin();

  const data = {
    headingEn: optStr(formData, "headingEn"),
    headingHi: optStr(formData, "headingHi"),
    subheadingEn: optStr(formData, "subheadingEn"),
    subheadingHi: optStr(formData, "subheadingHi"),
    phone: optStr(formData, "phone"),
    whatsapp: optStr(formData, "whatsapp"),
    email: optStr(formData, "email"),
    officeAddressEn: optStr(formData, "officeAddressEn"),
    officeAddressHi: optStr(formData, "officeAddressHi"),
    officeHoursEn: optStr(formData, "officeHoursEn"),
    officeHoursHi: optStr(formData, "officeHoursHi"),
    googleMapsEmbedUrl: optStr(formData, "googleMapsEmbedUrl"),
  };

  await prisma.contact.upsert({
    where: { id: "contact" },
    update: data,
    create: { id: "contact", ...data },
  });

  // The contact page renders this content; the editor re-reads it on reload.
  revalidatePath("/contact");
  revalidatePath("/admin/contact");
}
