import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { jsonError, jsonOk } from "@/lib/admin/api";

const types: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) return jsonError("Choose a picture.");
  const extension = types[file.type];
  if (!extension) return jsonError("Use a JPG, PNG, WebP, or GIF.");
  if (file.size > 8 * 1024 * 1024) return jsonError("That picture is larger than 8 MB.");

  const name = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${extension}`;
  const directory = path.join(process.cwd(), "public", "uploads");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, name), Buffer.from(await file.arrayBuffer()));
  return jsonOk({ url: `/uploads/${name}` }, 201);
}
