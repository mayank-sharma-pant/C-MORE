import { jsonError, jsonOk } from "@/lib/admin/api";
import { getTestimonials, saveTestimonials } from "@/lib/content";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { name?: string; email?: string; detail?: string; quote?: string } | null;
  const name = body?.name?.trim() || "";
  const email = body?.email?.trim() || "";
  const quote = body?.quote?.trim() || "";
  if (!name || !email || quote.length < 20) {
    return jsonError("Name, email, and a short note are required.");
  }
  const items = await getTestimonials();
  const next = {
    id: crypto.randomUUID(),
    name,
    email,
    quote,
    detail: body?.detail?.trim() || "",
    status: "pending" as const,
  };
  items.unshift(next);
  await saveTestimonials(items);
  return jsonOk({ ok: true }, 201);
}
