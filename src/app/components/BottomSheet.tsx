import { AnimatePresence, motion } from "motion/react";
import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { sheetBackdropTransition, sheetPanelTransition } from "../motion/tokens";

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  panelClassName?: string;
  backdropClassName?: string;
  overlayClassName?: string;
  zIndexClassName?: string;
  closeOnBackdrop?: boolean;
  pointerEventsNone?: boolean;
  onExitComplete?: () => void;
}

export function BottomSheet({
  open,
  onClose,
  children,
  panelClassName = "",
  backdropClassName = "bg-foreground/30",
  overlayClassName = "",
  zIndexClassName = "z-[100]",
  closeOnBackdrop = true,
  pointerEventsNone = false,
  onExitComplete,
}: BottomSheetProps) {
  const sheet = (
    <AnimatePresence onExitComplete={onExitComplete}>
      {open && (
        <motion.div
          key="bottom-sheet"
          className={`fixed inset-0 flex items-end justify-center ${zIndexClassName} ${pointerEventsNone ? "pointer-events-none" : ""} ${overlayClassName}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={sheetBackdropTransition}
        >
          <motion.div
            className={`absolute inset-0 ${backdropClassName} ${pointerEventsNone ? "pointer-events-auto" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={sheetBackdropTransition}
            onClick={closeOnBackdrop ? onClose : undefined}
            aria-hidden
          />
          <motion.div
            className={`relative w-full max-w-[390px] ${panelClassName}`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={sheetPanelTransition}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(sheet, document.body);
}
