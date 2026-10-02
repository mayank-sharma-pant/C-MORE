import { TestimonialManager } from "@/components/admin/managers";
import { DeskHeader } from "@/components/admin/shell";
import { getTestimonials } from "@/lib/content";

export default async function Page() {
  return (
    <div>
      <DeskHeader title="Testimonials" lede="Notes sent from the public page stay hidden until you publish them." />
      <TestimonialManager items={await getTestimonials()} />
    </div>
  );
}
