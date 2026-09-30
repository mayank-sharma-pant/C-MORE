import { jsonError, jsonOk } from "@/lib/admin/api";
import { getTestimonials, saveTestimonials } from "@/lib/content";
import type { Testimonial } from "@/lib/types";

export async function GET() {
  return jsonOk(await getTestimonials());
}

export async function POST(request: Request) {
  const body = (await request.json()) as Testimonial;
  if (!body.quote?.trim()) return jsonError("The note needs the words they sent.");
  const items = await getTestimonials();
  const next = { ...body, id: body.id || crypto.randomUUID() };
  items.unshift(next);
  await saveTestimonials(items);
  return jsonOk(next, 201);
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  const items = await getTestimonials();
  await saveTestimonials(items.filter((item) => item.id !== id));
  return jsonOk({ ok: true });
}
