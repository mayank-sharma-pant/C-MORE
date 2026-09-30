import { jsonError, jsonOk } from "@/lib/admin/api";
import { setAdminSession, verifyAdminPassword } from "@/lib/admin/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  if (!verifyAdminPassword(body.password || "")) {
    return jsonError("That password is not right.", 401);
  }
  await setAdminSession();
  return jsonOk({ ok: true });
}
