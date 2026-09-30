import { HomeView } from "@/components/home-view";
import { getDestinations, getPackages, getSettings, getTestimonials } from "@/lib/content";

export default async function HomePage() {
  const [packages, destinations, testimonials, settings] = await Promise.all([
    getPackages(),
    getDestinations(),
    getTestimonials(),
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
