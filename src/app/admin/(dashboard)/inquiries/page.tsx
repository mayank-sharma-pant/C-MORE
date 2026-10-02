import { InquiryList } from "@/components/admin/managers";
import { DeskHeader } from "@/components/admin/shell";
import { getInquiries } from "@/lib/content";

export default async function Page() {
  const items = await getInquiries();
  return (
    <div>
      <DeskHeader title="Enquiries" lede={`${items.length} ${items.length === 1 ? "note" : "notes"} from the public forms.`} />
      <InquiryList items={items} />
    </div>
  );
}
