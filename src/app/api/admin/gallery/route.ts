import { jsonError, jsonOk } from "@/lib/admin/api";
import { getGallery, saveGallery } from "@/lib/content";
import type { GalleryImage } from "@/lib/types";

export async function GET() {
  return jsonOk(await getGallery());
}

export async function POST(request: Request) {
  const body = (await request.json()) as GalleryImage;
  if (!body.src?.trim()) return jsonError("Paste an image address.");
  const items = await getGallery();
  const next = { ...body, id: body.id || crypto.randomUUID() };
  items.unshift(next);
  await saveGallery(items);
  return jsonOk(next, 201);
}

export async function PUT(request: Request) {
  const body = (await request.json()) as GalleryImage;
  const items = await getGallery();
  const index = items.findIndex((item) => item.id === body.id);
  if (index < 0) return jsonError("Photo not found.", 404);
  items[index] = body;
  await saveGallery(items);
  return jsonOk(body);
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  const items = await getGallery();
  await saveGallery(items.filter((item) => item.id !== id));
  return jsonOk({ ok: true });
}
