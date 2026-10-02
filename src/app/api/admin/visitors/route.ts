import { jsonError, jsonOk } from "@/lib/admin/api";
import { getVisitorCount, setVisitorCount } from "@/lib/visitors";

export async function GET() {
  return jsonOk({ count: await getVisitorCount() });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as { count?: number };
  const count = Number(body.count);
  if (!Number.isFinite(count) || count < 0) return jsonError("Enter a visitor number.");
  return jsonOk({ count: await setVisitorCount(count) });
}
