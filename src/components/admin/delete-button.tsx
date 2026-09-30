"use client";

import { useRouter } from "next/navigation";

export function DeleteButton({ href }: { href: string }) {
  const router = useRouter();

  async function remove() {
    if (!confirm("Remove this from the site?")) return;
    await fetch(href, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button type="button" onClick={remove} className="text-saffron">
      Remove
    </button>
  );
}
