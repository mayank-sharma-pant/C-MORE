import { cookies } from "next/headers";
import { COOKIE_NAME, SESSION_DAYS, createSessionToken } from "@/lib/admin/token";

export function verifyAdminPassword(password: string) {
  return password === (process.env.ADMIN_PASSWORD || "cmore1991");
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, await createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
