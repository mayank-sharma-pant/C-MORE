import { jsonError, jsonOk } from "@/lib/admin/api";
import { getInquiries, saveInquiries } from "@/lib/content";
import type { Inquiry } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Inquiry>;
  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return jsonError("Name, email, and a message are required.");
  }
  const inquiries = await getInquiries();
  const next: Inquiry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    kind: body.kind === "career" ? "career" : "enquiry",
    name: body.name.trim(),
    email: body.email.trim(),
    phone: body.phone?.trim() || "",
    interest: body.interest?.trim() || "",
    travellers: body.travellers?.trim() || "",
    dates: body.dates?.trim() || "",
    message: body.message.trim(),
  };
  inquiries.unshift(next);
  await saveInquiries(inquiries);
  return jsonOk({ ok: true }, 201);
}
