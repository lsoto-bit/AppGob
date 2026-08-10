import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { DocumentQrCode } from "./DocumentAssets";

export function OfficialDocumentCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full min-w-0 overflow-hidden rounded-[8px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] select-none",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function OfficialDocumentHeader({
  emblem,
  title,
  country = "República de Chile",
  issuer,
}: {
  emblem?: ReactNode;
  title: string;
  country?: string;
  issuer: string;
}) {
  return (
    <div className="flex items-center gap-4 bg-[#0046a8] px-4 py-2">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {emblem}
        <p className="min-w-0 text-[12px] leading-[1.2] tracking-[0.7px] text-white">{title}</p>
      </div>
      <div className="shrink-0 text-right text-white">
        <p className="text-[12px] tracking-[0.7px]">{country}</p>
        <p className="text-[8px] tracking-[0.7px]">{issuer}</p>
      </div>
    </div>
  );
}

export function OfficialDocumentFields({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-col gap-3 p-3", className)}>{children}</div>;
}

export function OfficialDocumentField({
  label,
  value,
  emphasis = false,
  compact = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
  compact?: boolean;
}) {
  return (
    <div className="border-b border-dashed border-[#ccc] pb-1">
      <p className="text-[8px] tracking-[0.7px] text-[#666]">{label}</p>
      <p
        className={cn(
          "break-words pt-0.5 text-[#333]",
          emphasis
            ? "text-[12px] font-medium leading-[18px]"
            : compact
              ? "text-[11px] leading-[16.5px]"
              : "text-[12px] leading-[1.5]",
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function OfficialDocumentFooter({
  signatureLabel,
  qr,
}: {
  signatureLabel: string;
  qr?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-t border-[#0046a8] p-4">
      <div className="flex flex-col gap-1">
        <div className="h-1.5 w-24 bg-[#f2f2f2]" />
        <div className="h-1.5 w-16 bg-[#f2f2f2]" />
        <p className="pt-0.5 text-[8px] tracking-[0.8px] text-[#666]">{signatureLabel}</p>
      </div>
      {qr ?? <DocumentQrCode />}
    </div>
  );
}
