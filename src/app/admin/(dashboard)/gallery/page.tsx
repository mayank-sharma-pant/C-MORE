import { GalleryManager } from "@/components/admin/managers";
import { getGallery } from "@/lib/content";

export default async function Page() {
  return (
    <div>
      <h1 className="mb-8 font-display text-3xl">Gallery</h1>
      <GalleryManager items={await getGallery()} />
    </div>
  );
}
