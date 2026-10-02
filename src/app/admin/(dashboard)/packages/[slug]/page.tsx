import { notFound } from "next/navigation";
import { PackageEditor } from "@/components/admin/package-editor";
import { DeskHeader } from "@/components/admin/shell";
import { getPackage } from "@/lib/content";

export default async function EditPackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  if (!pkg) notFound();
  return (
    <div>
      <DeskHeader title={pkg.name} lede="Changes show on the public package page after you save." />
      <PackageEditor mode="edit" initial={pkg} />
    </div>
  );
}
