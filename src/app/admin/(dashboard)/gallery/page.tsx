import { GalleryManager } from "@/components/admin/managers";
import { DeskHeader } from "@/components/admin/shell";
import { getGallery } from "@/lib/content";

export default async function Page() {
  return (
    <div>
      <DeskHeader title="Gallery" lede="Photos on the gallery page. Upload a file from this computer, or paste an image address." />
      <GalleryManager items={await getGallery()} />
    </div>
  );
}
