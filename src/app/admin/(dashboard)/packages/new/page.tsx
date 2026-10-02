import { PackageEditor } from "@/components/admin/package-editor";
import { DeskHeader } from "@/components/admin/shell";

export default function NewPackagePage() {
  return (
    <div>
      <DeskHeader title="New package" lede="It appears on the public packages page as soon as you save it." />
      <PackageEditor mode="create" />
    </div>
  );
}
