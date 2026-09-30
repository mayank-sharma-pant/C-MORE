import { DestinationManager } from "@/components/admin/managers";
import { getDestinations } from "@/lib/content";

export default async function Page() {
  return (
    <div>
      <h1 className="mb-8 font-display text-3xl">Destinations</h1>
      <DestinationManager items={await getDestinations()} />
    </div>
  );
}
