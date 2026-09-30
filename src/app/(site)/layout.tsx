import { Footer, Navbar, WhatsApp } from "@/components/chrome";
import { SiteMotion } from "@/components/site-motion";
import { SmoothScroll } from "@/components/smooth-scroll";
import { getSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <SmoothScroll />
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <Navbar />
      <main id="content">
        <SiteMotion>{children}</SiteMotion>
      </main>
      <Footer settings={settings} />
      <WhatsApp number={settings.whatsapp} />
    </>
  );
}
