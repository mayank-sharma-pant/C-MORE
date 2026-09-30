import { getPackages } from "@/lib/content";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function GET() {
  const packages = await getPackages();
  const origin = "https://www.cmoretravels.in";
  const items = packages
    .map((pkg) => {
      const link = `${origin}/packages/${pkg.slug}`;
      const description = `${pkg.duration}. ${pkg.locations.join(", ")}. From ${pkg.priceDisplay} per person.`;
      return `<item><title>${escapeXml(pkg.name)}</title><link>${link}</link><guid>${link}</guid><description>${escapeXml(description)}</description></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>C More Travel &amp; Tours</title><link>${origin}/packages</link><description>Tour packages from C More Travel &amp; Tours, New Delhi.</description>${items}</channel></rss>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
