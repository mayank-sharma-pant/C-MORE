import { DestinationManager } from "@/components/admin/managers";
import { DeskHeader } from "@/components/admin/shell";
import { getDestinations } from "@/lib/content";

export default async function Page() {
  return (
    <div>
      <DeskHeader title="Destinations" lede="Places listed on the public destinations page." />
      <DestinationManager items={await getDestinations()} />
    </div>
  );
}
