import { DeleteButton } from "@/components/admin/delete-button";
import { DeskHeader } from "@/components/admin/shell";
import { readStore } from "@/lib/store";

type Subscriber = {
  email: string;
  subscribed: boolean;
  updatedAt: string;
};

export default async function Page() {
  const items = await readStore<Subscriber[]>("newsletter.json", []);
  return (
    <div>
      <DeskHeader title="Newsletter" lede="People who used the footer form. Subscribed names stay on the list." />
      {items.length === 0 ? (
        <div className="rounded-[1.6rem] bg-card px-6 py-10">
          <h2 className="font-display text-3xl">No addresses yet</h2>
          <p className="mt-2 text-muted">They appear here after someone subscribes on the public site.</p>
        </div>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-[1.4rem] bg-card">
          {items.map((item) => (
            <li key={item.email} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div>
                <p className="font-display text-2xl">{item.email}</p>
                <p className="text-sm text-muted">
                  {item.subscribed ? "Subscribed" : "Unsubscribed"} · {new Date(item.updatedAt).toLocaleString("en-IN")}
                </p>
              </div>
              <DeleteButton href={`/api/admin/newsletter?email=${encodeURIComponent(item.email)}`} label="Remove" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
