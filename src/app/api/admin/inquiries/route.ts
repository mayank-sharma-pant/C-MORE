import { jsonOk } from "@/lib/admin/api";
import { getInquiries, saveInquiries } from "@/lib/content";

export async function GET() {
  return jsonOk(await getInquiries());
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  const items = await getInquiries();
  await saveInquiries(items.filter((item) => item.id !== id));
  return jsonOk({ ok: true });
}
