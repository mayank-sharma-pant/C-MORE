import { SettingsForm } from "@/components/admin/managers";
import { DeskHeader } from "@/components/admin/shell";
import { getSettings } from "@/lib/content";

export default async function Page() {
  return (
    <div>
      <DeskHeader title="Office details" lede="Phone, PayPal, social links, and the address shown on the public site. Saved links are stored with https://." />
      <SettingsForm settings={await getSettings()} />
    </div>
  );
}
