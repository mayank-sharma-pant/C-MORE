import { jsonError, jsonOk } from "@/lib/admin/api";
import { getPosts, savePosts } from "@/lib/content";
import { slugify } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

export async function GET() {
  return jsonOk(await getPosts());
}

export async function POST(request: Request) {
  const body = (await request.json()) as BlogPost;
  if (!body.title?.trim()) return jsonError("A story needs a title.");
  const posts = await getPosts();
  const slug = body.slug?.trim() || slugify(body.title);
  if (posts.some((item) => item.slug === slug)) return jsonError("That story address is already used.");
  const next = { ...body, slug, date: body.date || new Date().toISOString().slice(0, 10) };
  posts.unshift(next);
  await savePosts(posts);
  return jsonOk(next, 201);
}

export async function PUT(request: Request) {
  const body = (await request.json()) as BlogPost;
  const posts = await getPosts();
  const index = posts.findIndex((item) => item.slug === body.slug);
  if (index < 0) return jsonError("Story not found.", 404);
  posts[index] = body;
  await savePosts(posts);
  return jsonOk(body);
}

export async function DELETE(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  const posts = await getPosts();
  await savePosts(posts.filter((item) => item.slug !== slug));
  return jsonOk({ ok: true });
}
