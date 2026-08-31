import type { ReactNode } from "react";
import { BottomSheet } from "./BottomSheet";
import { Button, Icon } from "./ui";

export function FilterSheet({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      panelClassName="bg-white border-t border-border"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="type-label-section text-muted-foreground">{title}</p>
        <Button onClick={onClose} variant="icon-muted" size="icon" aria-label="Cerrar">
          <Icon name="close" size={15} />
        </Button>
      </div>
      <div className="flex flex-col gap-5 px-4 py-4">{children}</div>
      <div className="px-4 pb-6">
        <Button onClick={onClose} variant="primary" size="md" fullWidth>
          Aplicar filtros
        </Button>
      </div>
    </BottomSheet>
  );
}

export function FilterSection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="type-label-section text-muted-foreground">{label}</p>
      <div className="overflow-hidden rounded-md pt-2">{children}</div>
    </div>
  );
}

export function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <Button
      type="button"
      onClick={() => onChange(!checked)}
      variant="list-row"
      size="none"
      className="flex w-full items-center justify-between border-b border-border py-2.5 last:border-b-0"
    >
      <span className="text-xs leading-4 text-foreground">{label}</span>
      <span className="flex shrink-0 p-1">
        <Icon
          name={checked ? "check_box" : "check_box_outline_blank"}
          size={16}
          className={checked ? "text-primary" : "text-muted-foreground"}
        />
      </span>
    </Button>
  );
}

export function RadioRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <Button
      type="button"
      onClick={onChange}
      variant="list-row"
      size="none"
      className="flex w-full items-center justify-between border-b border-border py-2.5 last:border-b-0"
    >
      <span className="text-xs leading-4 text-foreground">{label}</span>
      <span className="flex shrink-0 p-1">
        <Icon
          name={checked ? "radio_button_checked" : "radio_button_unchecked"}
          size={16}
          className={checked ? "text-primary" : "text-muted-foreground"}
        />
      </span>
    </Button>
  );
}

export function ClearFiltersButton({ onClick }: { onClick: () => void }) {
  return (
    <Button type="button" variant="inline-cta" size="none" onClick={onClick} className="self-start">
      Limpiar filtros
    </Button>
  );
}
