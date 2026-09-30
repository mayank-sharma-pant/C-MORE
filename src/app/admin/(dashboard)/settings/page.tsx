import { SettingsForm } from "@/components/admin/managers";
import { getSettings } from "@/lib/content";

export default async function Page() {
  return (
    <div>
      <h1 className="mb-3 font-display text-3xl">Office details</h1>
      <p className="mb-8 max-w-xl text-muted">Phone, email, and address shown on the public site.</p>
      <SettingsForm settings={await getSettings()} />
    </div>
  );
}
