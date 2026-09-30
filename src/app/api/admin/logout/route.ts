import { jsonOk } from "@/lib/admin/api";
import { clearAdminSession } from "@/lib/admin/auth";

export async function POST() {
  await clearAdminSession();
  return jsonOk({ ok: true });
}
