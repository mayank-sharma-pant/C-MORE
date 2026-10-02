import { jsonError, jsonOk } from "@/lib/admin/api";
import { setAdminSession, verifyAdminLogin } from "@/lib/admin/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };
  if (!verifyAdminLogin(body.username || "", body.password || "")) {
    return jsonError("That name or password is not right.", 401);
  }
  await setAdminSession();
  return jsonOk({ ok: true });
}
