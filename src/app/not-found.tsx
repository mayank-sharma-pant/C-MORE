import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-mist px-6 text-center">
      <div>
        <p className="text-[11px] uppercase tracking-[0.28em] text-saffron">Missing page</p>
        <h1 className="mt-3 font-display text-3xl text-ink">This route is not on the map.</h1>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 text-sm text-white">
          Back to the start
        </Link>
      </div>
    </main>
  );
}
