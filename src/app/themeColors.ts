export const THEME_COLORS = {
  home: "#01084D",
  light: "#FFFFFF",
} as const;

export type ThemeColor = (typeof THEME_COLORS)[keyof typeof THEME_COLORS];
