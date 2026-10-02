"use client";

import { useEffect, useState } from "react";

export function VisitorCounter({ initial }: { initial: number }) {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/visits", { method: "POST" })
      .then((response) => response.json())
      .then((body: { count?: number }) => {
        if (!cancelled && typeof body.count === "number") setCount(body.count);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  return <span>Visitor No. {count.toLocaleString("en-IN")}</span>;
}
