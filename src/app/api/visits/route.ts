import { NextResponse } from "next/server";
import { recordVisit } from "@/lib/visitors";

const COOKIE = "cmore_visit";

export async function POST(request: Request) {
  const alreadyCounted = request.headers.get("cookie")?.split(";").some((part) => part.trim().startsWith(`${COOKIE}=`)) ?? false;
  const count = await recordVisit(alreadyCounted);
  const response = NextResponse.json({ count });
  if (!alreadyCounted) {
    response.cookies.set(COOKIE, "1", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  return response;
}
