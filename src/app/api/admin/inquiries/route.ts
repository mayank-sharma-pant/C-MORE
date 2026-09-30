import { jsonOk } from "@/lib/admin/api";
import { getInquiries } from "@/lib/content";

export async function GET() {
  return jsonOk(await getInquiries());
}
