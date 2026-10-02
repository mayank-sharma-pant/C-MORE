import { HomeView } from "@/components/home-view";
import { getDestinations, getPackages, getPublishedTestimonials, getSettings } from "@/lib/content";

export default async function HomePage() {
  const [packages, destinations, testimonials, settings] = await Promise.all([
    getPackages(),
    getDestinations(),
    getPublishedTestimonials(),
    getSettings(),
  ]);

  return (
    <HomeView
      packages={packages}
      destinations={destinations}
      testimonials={testimonials}
      settings={settings}
    />
  );
}
