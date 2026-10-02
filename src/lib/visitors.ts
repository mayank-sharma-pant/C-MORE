import { readStore, writeStore } from "@/lib/store";

type VisitorStore = { count: number };

let queue = Promise.resolve();

function exclusive<T>(task: () => Promise<T>) {
  const run = queue.then(task, task);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export function getVisitorCount() {
  return exclusive(async () => {
    const store = await readStore<VisitorStore>("visitors.json", { count: 39261 });
    return store.count;
  });
}

export function setVisitorCount(count: number) {
  return exclusive(async () => {
    const next = Math.max(0, Math.floor(count));
    await writeStore("visitors.json", { count: next });
    return next;
  });
}

export function recordVisit(alreadyCounted: boolean) {
  return exclusive(async () => {
    const store = await readStore<VisitorStore>("visitors.json", { count: 39261 });
    if (alreadyCounted) return store.count;
    const count = store.count + 1;
    await writeStore("visitors.json", { count });
    return count;
  });
}
