/** Material Symbols Outlined icon names used across the app. */
export type IconName =
  | "account_balance"
  | "arrow_back"
  | "call"
  | "check"
  | "check_circle"
  | "chevron_left"
  | "chevron_right"
  | "close"
  | "content_copy"
  | "credit_card"
  | "description"
  | "directions"
  | "domain"
  | "expand_less"
  | "expand_more"
  | "face_unlock"
  | "favorite"
  | "fingerprint"
  | "home"
  | "key"
  | "language"
  | "location_on"
  | "logout"
  | "mail"
  | "minimize"
  | "more_horiz"
  | "my_location"
  | "notifications"
  | "open_in_new"
  | "pause"
  | "payments"
  | "play_arrow"
  | "person"
  | "radio_button_unchecked"
  | "refresh"
  | "replay"
  | "schedule"
  | "search"
  | "send"
  | "settings"
  | "share"
  | "smart_toy"
  | "support_agent"
  | "text_fields"
  | "tune"
  | "verified_user"
  | "visibility"
  | "visibility_off"
  | "warning";

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  /** 100–700; default 400 for readable outlined icons. */
  weight?: number;
  filled?: boolean;
};

export function Icon({
  name,
  size = 24,
  className,
  weight = 400,
  filled = false,
}: IconProps) {
  const opsz = Math.min(48, Math.max(20, size));

  return (
    <span
      className={`material-symbols-outlined select-none leading-none ${className ?? ""}`}
      style={{
        fontFamily: "'Material Symbols Outlined'",
        fontSize: size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${opsz}`,
      }}
      aria-hidden
    >
      {name}
    </span>
  );
}
