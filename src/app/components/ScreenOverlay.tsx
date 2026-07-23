import { createPortal } from "react-dom";
import type { ReactNode } from "react";

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
  return createPortal(
    <div
      className={`fixed inset-0 flex justify-center bg-background ${className}`}
      style={{ zIndex }}
    >
      <div className="w-full max-w-[390px] min-h-full flex flex-col">{children}</div>
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
      className="fixed inset-0 flex items-center justify-center bg-black/60 px-6"
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
