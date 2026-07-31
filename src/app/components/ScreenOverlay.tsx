import { createPortal } from "react-dom";
import { useEffect, type ReactNode } from "react";

/** Full-screen overlay portaled to document.body so it sits above BottomNav (z-40). */
export function ScreenOverlay({
  children,
  zIndex = 100,
  className = "",
}: {
  children: ReactNode;
  zIndex?: number;
  className?: string;
}) {
  useEffect(() => {
    const { overflow, overscrollBehavior } = document.body.style;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.overscrollBehavior = overscrollBehavior;
    };
  }, []);

  return createPortal(
    <div
      data-screen-overlay
      className={`fixed inset-0 flex h-dvh justify-center overflow-hidden overscroll-none bg-background ${className}`}
      style={{ zIndex }}
    >
      <div className="flex h-full min-h-0 w-full max-w-[390px] flex-col overflow-hidden overscroll-none">
        {children}
      </div>
    </div>,
    document.body,
  );
}

/** Centered dialog above full-screen flows. */
export function DialogOverlay({
  children,
  zIndex = 110,
  onBackdropClick,
}: {
  children: ReactNode;
  zIndex?: number;
  onBackdropClick?: () => void;
}) {
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center overscroll-none bg-black/60 px-6"
      style={{ zIndex }}
      onClick={onBackdropClick}
    >
      <div
        className="w-full max-w-[390px]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
