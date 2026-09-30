import { jsonError, jsonOk } from "@/lib/admin/api";
import { getDestinations, saveDestinations } from "@/lib/content";
import { slugify } from "@/lib/utils";
import type { Destination } from "@/lib/types";

export async function GET() {
  return jsonOk(await getDestinations());
}

export async function POST(request: Request) {
  const body = (await request.json()) as Destination;
  if (!body.name?.trim()) return jsonError("A destination needs a name.");
  const items = await getDestinations();
  const slug = body.slug?.trim() || slugify(body.name);
  if (items.some((item) => item.slug === slug)) return jsonError("That destination already exists.");
  const next = { ...body, slug };
  items.unshift(next);
  await saveDestinations(items);
  return jsonOk(next, 201);
}

export async function PUT(request: Request) {
  const body = (await request.json()) as Destination;
  const items = await getDestinations();
  const index = items.findIndex((item) => item.slug === body.slug);
  if (index < 0) return jsonError("Destination not found.", 404);
  items[index] = body;
  await saveDestinations(items);
  return jsonOk(body);
}

export async function DELETE(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  const items = await getDestinations();
  await saveDestinations(items.filter((item) => item.slug !== slug));
  return jsonOk({ ok: true });
}
