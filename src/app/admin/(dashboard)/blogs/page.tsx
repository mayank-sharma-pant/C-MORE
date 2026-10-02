import { BlogManager } from "@/components/admin/managers";
import { DeskHeader } from "@/components/admin/shell";
import { getPosts } from "@/lib/content";

export default async function Page() {
  return (
    <div>
      <DeskHeader title="Journal" lede="Stories on the public journal. Separate paragraphs with a blank line." />
      <BlogManager items={await getPosts()} />
    </div>
  );
}
