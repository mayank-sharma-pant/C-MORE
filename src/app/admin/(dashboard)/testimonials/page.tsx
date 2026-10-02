import { TestimonialManager } from "@/components/admin/managers";
import { DeskHeader } from "@/components/admin/shell";
import { getTestimonials } from "@/lib/content";

export default async function Page() {
  return (
    <div>
      <DeskHeader title="Testimonials" lede="Short notes from travellers, shown on the testimonials page." />
      <TestimonialManager items={await getTestimonials()} />
    </div>
  );
}
