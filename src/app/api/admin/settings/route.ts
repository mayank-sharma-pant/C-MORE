import { jsonOk } from "@/lib/admin/api";
import { getSettings, saveSettings } from "@/lib/content";
import type { SiteSettings } from "@/lib/types";

export async function GET() {
  return jsonOk(await getSettings());
}

export async function PUT(request: Request) {
  const body = (await request.json()) as SiteSettings;
  await saveSettings(body);
  return jsonOk(body);
}
