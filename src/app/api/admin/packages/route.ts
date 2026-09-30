import { jsonError, jsonOk } from "@/lib/admin/api";
import { getPackages, savePackages } from "@/lib/content";
import { slugify } from "@/lib/utils";
import type { TourPackage } from "@/lib/types";

export async function GET() {
  return jsonOk(await getPackages());
}

export async function POST(request: Request) {
  const body = (await request.json()) as TourPackage;
  if (!body.name?.trim()) return jsonError("A package needs a name.");
  const packages = await getPackages();
  const slug = body.slug?.trim() || slugify(body.name);
  if (packages.some((item) => item.slug === slug)) {
    return jsonError("That address is already used. Change the name.");
  }
  const next = { ...body, slug, name: body.name.trim(), price: Number(body.price) || 0 };
  packages.unshift(next);
  await savePackages(packages);
  return jsonOk(next, 201);
}

export async function PUT(request: Request) {
  const body = (await request.json()) as TourPackage & { originalSlug?: string };
  const { originalSlug, ...pkg } = body;
  const packages = await getPackages();
  const index = packages.findIndex((item) => item.slug === (originalSlug || pkg.slug));
  if (index < 0) return jsonError("That package is no longer on the site.", 404);
  packages[index] = { ...pkg, price: Number(pkg.price) || 0 };
  await savePackages(packages);
  return jsonOk(packages[index]);
}

export async function DELETE(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  const packages = await getPackages();
  await savePackages(packages.filter((item) => item.slug !== slug));
  return jsonOk({ ok: true });
}
