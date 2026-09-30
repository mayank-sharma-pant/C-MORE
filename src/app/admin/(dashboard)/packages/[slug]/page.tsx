import { notFound } from "next/navigation";
import { PackageEditor } from "@/components/admin/package-editor";
import { getPackage } from "@/lib/content";

export default async function EditPackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  if (!pkg) notFound();
  return (
    <div>
      <h1 className="mb-8 font-display text-3xl">Edit package</h1>
      <PackageEditor mode="edit" initial={pkg} />
    </div>
  );
}
