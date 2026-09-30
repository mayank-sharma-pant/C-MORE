"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { ItineraryDay } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

export function Itinerary({ days }: { days: ItineraryDay[] }) {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  return (
    <ol className="divide-y divide-line border-y border-line">
      {days.map((day, index) => {
        const expanded = open === index;
        return (
          <li key={`${day.day}-${day.title}`}>
            <button
              type="button"
              className="flex w-full items-baseline gap-4 py-4 text-left transition-colors duration-300 hover:text-garden"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? -1 : index)}
            >
              <span className="w-14 shrink-0 text-[11px] uppercase tracking-[0.16em] text-saffron">
                {day.day}
              </span>
              <span className="font-display text-lg text-ink">{day.title}</span>
            </button>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 sm:pl-[4.5rem]">
                    <p className="max-w-3xl whitespace-pre-line text-[15px] leading-relaxed text-muted">
                      {day.description}
                    </p>
                    {day.meals && <p className="mt-3 text-sm text-ink">Meals: {day.meals}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
