"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Link from "next/link";
import type { ElementType, MouseEvent, ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: reduce ? 0.01 : 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Lines({
  lines,
  as: Tag = "h2",
  className,
  delay = 0,
  onLoad = false,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
  onLoad?: boolean;
}) {
  const reduce = useReducedMotion();
  const trigger = onLoad ? { animate: "shown" } : { whileInView: "shown", viewport: { once: true, margin: "-10% 0px" } };

  return (
    <Tag className={className}>
      <motion.span className="block" initial={reduce ? false : "hidden"} {...trigger}>
        {lines.map((line, index) => (
          <span key={index} className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className="block will-change-transform"
              variants={{
                hidden: { y: "110%", rotate: 2 },
                shown: { y: "0%", rotate: 0, transition: { duration: 1.1, ease, delay: delay + index * 0.09 } },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export function Magnetic({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - box.left - box.width / 2) * 0.28);
    y.set((event.clientY - box.top - box.height / 2) * 0.35);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span style={{ x, y }} className="inline-block">
      <Link href={href} onMouseMove={move} onMouseLeave={leave} className={`btn-fill ${className ?? ""}`}>
        <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
      </Link>
    </motion.span>
  );
}
