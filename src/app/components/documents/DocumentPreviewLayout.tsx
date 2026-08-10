import type { ReactNode } from "react";
import { Icon, Button, Badge, Card, IconBox } from "../ui";

export function DocumentPreviewLayout({
  onClose,
  onShare,
  title,
  subtitle,
  statusBadge,
  children,
  renewalAction,
  trailingContent,
}: {
  onClose: () => void;
  onShare: () => void;
  title: string;
  subtitle: string;
  statusBadge: { label: string; bg: string; color: string };
  children: ReactNode;
  renewalAction?: { onClick: () => void };
  trailingContent?: ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white">
      <div className="flex shrink-0 items-center justify-between border-b border-[#ccc] bg-white px-4 py-3">
        <Button
          onClick={onClose}
          variant="link"
          size="none"
          className="flex items-center gap-2 p-1 -ml-1 text-[#0046a8] no-underline"
          aria-label="Cerrar"
        >
          <Icon name="close" size={15} className="shrink-0" />
          <span className="text-[12px] font-medium tracking-[1.2px]">Cerrar</span>
        </Button>
        <button
          type="button"
          onClick={onShare}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#0046a8] px-3 py-1.5 text-[#0046a8] transition-colors active:bg-blue-50"
        >
          <Icon name="share" size={13} className="shrink-0" />
          <span className="text-[12px] font-medium tracking-[1px]">Compartir</span>
        </button>
      </div>

      <div className="flex shrink-0 items-center justify-between border-b border-[#ccc] bg-white px-4 py-3">
        <div className="min-w-0">
          <p className="text-[16px] leading-[1.5] text-[#333]">{title}</p>
          <p className="mt-0.5 text-[12px] leading-[1.5] text-[#666]">{subtitle}</p>
        </div>
        <Badge size="sm" weight="bold" bg={statusBadge.bg} color={statusBadge.color} className="ml-2 shrink-0">
          {statusBadge.label}
        </Badge>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden overscroll-contain bg-[#f2f2f2] p-4 pb-8">
        {children}
        {renewalAction && (
          <Card variant="elevated" overflow="hidden" className="shrink-0 overflow-hidden rounded-[8px]">
            <Button
              onClick={renewalAction.onClick}
              variant="list-row"
              size="none"
              fullWidth
              className="flex items-center gap-4 px-4 py-[14px] active:bg-gray-50"
            >
              <IconBox>
                <Icon name="refresh" size={20} className="text-[#0f5ac4]" />
              </IconBox>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-[16px] leading-[19.5px] text-[#333]">Solicita renovación o reimpresión</p>
                <p className="mt-0.5 text-[12px] leading-[16.5px] text-[#666]">
                  Inicia el proceso desde la app, retira presencialmente
                </p>
              </div>
              <Icon name="chevron_right" size={20} className="shrink-0 text-[#0f5ac4]" />
            </Button>
          </Card>
        )}
        {trailingContent}
      </div>
    </div>
  );
}

export function DocumentPreviewSection({ children }: { children: ReactNode }) {
  return (
    <section className="flex w-full min-w-0 flex-col gap-2">
      <p className="text-[12px] tracking-[0.9px] text-[#666]">Vista previa del documento</p>
      {children}
    </section>
  );
}
