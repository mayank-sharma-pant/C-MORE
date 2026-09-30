import { BlogManager } from "@/components/admin/managers";
import { getPosts } from "@/lib/content";

export default async function Page() {
  return (
    <div>
      <h1 className="mb-8 font-display text-3xl">Journal</h1>
      <BlogManager items={await getPosts()} />
    </div>
  );
}
