"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";
import { useContext, useRef, type ReactNode } from "react";

const ease = [0.76, 0, 0.24, 1] as const;
const settle = [0.22, 1, 0.36, 1] as const;

function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  if (!frozen) return children;

  return <LayoutRouterContext.Provider value={frozen}>{children}</LayoutRouterContext.Provider>;
}

export function SiteMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={pathname}>
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[70] origin-bottom bg-ink"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1, transition: { duration: 0.55, ease } }}
        >
          <motion.span
            className="absolute inset-0 grid place-items-center font-display text-3xl text-white/90 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 1, transition: { duration: 0.3, delay: 0.25 } }}
          >
            C More
          </motion.span>
        </motion.div>
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[70] origin-top bg-ink"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0, transition: { duration: 0.7, ease, delay: 0.05 } }}
          exit={{ scaleY: 0 }}
        />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: settle, delay: 0.3 } }}
          exit={{ opacity: 1 }}
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
