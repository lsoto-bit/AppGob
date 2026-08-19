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
      <div className="flex shrink-0 items-center justify-between border-b border-border bg-white px-4 py-3">
        <Button
          onClick={onClose}
          variant="link"
          size="none"
          className="flex items-center gap-2 p-1 -ml-1 text-primary no-underline"
          aria-label="Cerrar"
        >
          <Icon name="close" size={15} className="shrink-0" />
          <span className="text-xs font-medium">Cerrar</span>
        </Button>
        <button
          type="button"
          onClick={onShare}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary px-3 h-[36px] text-primary transition-colors active:bg-muted"
        >
          <Icon name="share" size={13} className="shrink-0" />
          <span className="text-xs font-medium">Compartir</span>
        </button>
      </div>

      <div className="flex shrink-0 items-center justify-between border-b border-border bg-white px-4 py-3">
        <div className="min-w-0">
          <p className="text-base leading-[1.5] text-foreground">{title}</p>
          <p className="mt-0.5 text-xs leading-[1.5] text-muted-foreground">{subtitle}</p>
        </div>
        <Badge size="sm" weight="bold" bg={statusBadge.bg} color={statusBadge.color} className="ml-2 shrink-0">
          {statusBadge.label}
        </Badge>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden overscroll-contain bg-muted p-4 pb-8">
        {children}
        {renewalAction && (
          <Card variant="elevated" overflow="hidden" className="shrink-0 overflow-hidden rounded-[8px]">
            <Button
              onClick={renewalAction.onClick}
              variant="list-row"
              size="none"
              fullWidth
              className="flex items-center gap-4 px-4 py-[14px] active:bg-muted"
            >
              <IconBox>
                <Icon name="refresh" size={20} className="text-primary" />
              </IconBox>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-base leading-[19.5px] text-foreground">Solicita renovación o reimpresión</p>
                <p className="mt-0.5 text-xs leading-[16.5px] text-muted-foreground">
                  Inicia el proceso desde la app, retira presencialmente
                </p>
              </div>
              <Icon name="chevron_right" size={20} className="shrink-0 text-primary" />
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
      <p className="text-xs tracking-[0.9px] text-muted-foreground">Vista previa del documento</p>
      {children}
    </section>
  );
}
