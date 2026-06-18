"use server";

import { prisma } from "@/lib/prisma";

export type InquiryState = { ok?: boolean; error?: boolean };

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

/**
 * Persist a contact-form submission so the lead isn't lost. The admin reads
 * these in the dashboard inbox. Returns a small state object the form uses to
 * show a success or error message.
 */
export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const name = str(formData, "name");
  const phone = str(formData, "phone");
  const matter = str(formData, "matter");
  const description = str(formData, "description");

  // Name, phone, matter, and description are required (email is optional).
  if (!name || !phone || !matter || !description) {
    return { error: true };
  }

  const email = str(formData, "email");
  const preferred = str(formData, "preferred") === "hi" ? "hi" : "en";

  try {
    await prisma.inquiry.create({
      data: {
        name,
        phone,
        email: email === "" ? null : email,
        matter,
        description,
        preferred,
      },
    });
  } catch {
    return { error: true };
  }

  return { ok: true };
}
