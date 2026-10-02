import { jsonError, jsonOk } from "@/lib/admin/api";
import { readStore, writeStore } from "@/lib/store";

type Subscriber = {
  email: string;
  subscribed: boolean;
  updatedAt: string;
};

export async function GET() {
  return jsonOk(await readStore<Subscriber[]>("newsletter.json", []));
}

export async function DELETE(request: Request) {
  const email = new URL(request.url).searchParams.get("email")?.trim().toLowerCase();
  if (!email) return jsonError("That address is missing.");
  const list = await readStore<Subscriber[]>("newsletter.json", []);
  await writeStore(
    "newsletter.json",
    list.filter((item) => item.email !== email),
  );
  return jsonOk({ ok: true });
}
