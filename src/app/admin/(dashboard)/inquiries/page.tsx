import { InquiryList } from "@/components/admin/managers";
import { getInquiries } from "@/lib/content";

export default async function Page() {
  return (
    <div>
      <h1 className="mb-8 font-display text-3xl">Enquiries</h1>
      <InquiryList items={await getInquiries()} />
    </div>
  );
}
