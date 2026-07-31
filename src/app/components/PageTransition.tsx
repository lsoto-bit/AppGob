import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";
import { pageSlideOffsetPx, pageTransition } from "../motion/tokens";
import type { NavDirection } from "../motion/navigation";

export type { NavDirection };

interface PageTransitionProps {
  pageKey: string;
  direction: NavDirection;
  reserveBottomNav?: boolean;
  children: ReactNode;
}

const PAGE_VARIANTS = {
  forward: {
    initial: (offset: number, fade: number) => ({ x: offset, opacity: fade, zIndex: 1 }),
    animate: { x: 0, opacity: 1, zIndex: 1 },
    exit: (offset: number, fade: number) => ({ x: -offset * 0.6, opacity: fade, zIndex: 0 }),
  },
  back: {
    initial: (offset: number, fade: number) => ({ x: -offset, opacity: fade, zIndex: 1 }),
    animate: { x: 0, opacity: 1, zIndex: 1 },
    exit: (offset: number, fade: number) => ({ x: offset * 0.6, opacity: fade, zIndex: 0 }),
  },
} as const;

export function PageTransition({
  pageKey,
  direction,
  reserveBottomNav = false,
  children,
}: PageTransitionProps) {
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? 0 : pageSlideOffsetPx;
  const fade = reduceMotion ? 1 : 0.96;
  const variant = PAGE_VARIANTS[direction];

  return (
    <div className="relative w-full max-w-[390px] min-h-screen overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={pageKey}
          className={`absolute inset-0 w-full min-h-full overflow-y-auto overflow-x-hidden bg-background ${
            reserveBottomNav ? "pb-[72px]" : ""
          }`}
          initial={variant.initial(offset, fade)}
          animate={variant.animate}
          exit={variant.exit(offset, fade)}
          transition={pageTransition}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
