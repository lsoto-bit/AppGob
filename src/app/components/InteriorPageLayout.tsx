import type { ReactNode } from "react";
import { Icon, Button } from "./ui";
import { GobFranja } from "./GobFranja";
import { cn } from "../lib/utils";

export function InteriorBackButton({
  onClick,
  label = "Inicio",
  className,
}: {
  onClick: () => void;
  label?: string;
  className?: string;
}) {
  return (
    <Button
      onClick={onClick}
      variant="nav-back"
      size="none"
      className={cn("tracking-[1.2px]", className)}
      aria-label={`Volver a ${label}`}
    >
      <Icon name="arrow_back" size={18} />
      <span className="text-[12px]">{label}</span>
    </Button>
  );
}

export function InteriorPageLayout({
  onBack,
  backLabel = "Inicio",
  onFranjaClick,
  showFranja = true,
  headerClassName,
  backRowExtra,
  title,
  subtitle,
  titleExtra,
  description,
  toolbar,
  children,
  className,
}: {
  onBack: () => void;
  backLabel?: string;
  onFranjaClick?: () => void;
  showFranja?: boolean;
  headerClassName?: string;
  backRowExtra?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  titleExtra?: ReactNode;
  description?: ReactNode;
  toolbar?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex min-h-screen w-full max-w-[390px] flex-col bg-white", className)}>
      <header
        className={cn(
          "relative shrink-0 border-b border-[#e6e6e6] bg-white px-4 pb-3 pt-10",
          headerClassName,
        )}
      >
        {showFranja && <GobFranja onClick={onFranjaClick} />}
        <div className={cn("flex items-center justify-between", backRowExtra && "gap-2")}>
          <InteriorBackButton onClick={onBack} label={backLabel} className="mb-0" />
          {backRowExtra}
        </div>

        <div className={cn("pt-4", subtitle == null && description == null && "pb-1")}>
          <div className="flex items-start justify-between gap-3">
            <h1
              className="text-[24px] font-medium leading-[1.5] text-[#333]"
              style={{ fontFamily: "'Roboto Slab', sans-serif" }}
            >
              {title}
            </h1>
            {titleExtra}
          </div>
          {subtitle != null && (
            <p className="mt-1 text-[11px] leading-[16.5px] text-[#808080]">{subtitle}</p>
          )}
          {description != null && (
            <p className="mt-1 text-[12px] leading-[1.5] text-[#808080]">{description}</p>
          )}
        </div>
      </header>

      {toolbar != null && (
        <div className="shrink-0 bg-[#f2f2f2] px-4 py-3">{toolbar}</div>
      )}

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#f2f2f2]">
        {children}
      </div>
    </div>
  );
}

export function InteriorPageBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-1 flex-col overflow-y-auto px-4 pb-6 pt-5", className)}>
      {children}
    </div>
  );
}

export function InteriorPageSection({
  label,
  children,
  className,
}: {
  label?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col gap-2", className)}>
      {label != null && (
        <div className="text-[12px] tracking-[1px] text-[#666]">{label}</div>
      )}
      {children}
    </section>
  );
}
