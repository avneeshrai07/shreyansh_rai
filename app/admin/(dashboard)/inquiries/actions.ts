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

export async function markRead(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = str(formData, "id");
  const isRead = str(formData, "isRead") === "true";
  if (!id) return;

  await prisma.inquiry.update({ where: { id }, data: { isRead } });

  revalidatePath("/admin/inquiries");
}

export async function deleteInquiry(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = str(formData, "id");
  if (!id) return;

  await prisma.inquiry.delete({ where: { id } });

  revalidatePath("/admin/inquiries");
}
