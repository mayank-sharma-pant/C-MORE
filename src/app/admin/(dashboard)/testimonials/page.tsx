import { TestimonialManager } from "@/components/admin/managers";
import { getTestimonials } from "@/lib/content";

export default async function Page() {
  return (
    <div>
      <h1 className="mb-8 font-display text-3xl">Testimonials</h1>
      <TestimonialManager items={await getTestimonials()} />
    </div>
  );
}
