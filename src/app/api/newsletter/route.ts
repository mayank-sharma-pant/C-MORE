import { jsonError, jsonOk } from "@/lib/admin/api";
import { readStore, writeStore } from "@/lib/store";

type Subscriber = {
  email: string;
  subscribed: boolean;
  updatedAt: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string; subscribe?: boolean } | null;
  const email = body?.email?.trim().toLowerCase() || "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonError("A valid email is required.");
  }
  const subscribed = body?.subscribe !== false;
  const list = await readStore<Subscriber[]>("newsletter.json", []);
  const existing = list.find((item) => item.email === email);
  if (existing) {
    existing.subscribed = subscribed;
    existing.updatedAt = new Date().toISOString();
  } else {
    list.unshift({ email, subscribed, updatedAt: new Date().toISOString() });
  }
  await writeStore("newsletter.json", list);
  return jsonOk({ ok: true }, 201);
}
