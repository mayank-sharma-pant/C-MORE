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

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  const items = await getGallery();
  await saveGallery(items.filter((item) => item.id !== id));
  return jsonOk({ ok: true });
}
