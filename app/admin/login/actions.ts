"use server";

import { redirect } from "next/navigation";
import { createSession, getSession, verifyCredentials } from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Enter both username and password." };
  }

  if (!verifyCredentials(username, password)) {
    return { error: "Invalid username or password." };
  }

  // Don't stack duplicate sessions if a valid one already exists.
  if (!(await getSession())) {
    await createSession();
  }

  redirect("/admin");
}
