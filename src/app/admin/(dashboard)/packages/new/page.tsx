import { PackageEditor } from "@/components/admin/package-editor";

export default function NewPackagePage() {
  return (
    <div>
      <h1 className="mb-8 font-display text-3xl">New package</h1>
      <PackageEditor mode="create" />
    </div>
  );
}
