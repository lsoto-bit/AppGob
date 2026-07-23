import type { BottomNavTab, Page } from "../components/BottomNav";

export type NavDirection = "forward" | "back";

export const PAGE_DEPTH: Record<Page, number> = {
  home: 0,
  notifications: 1,
  alerts: 1,
  assistance: 1,
  documents: 1,
  profile: 1,
  lugares: 1,
  "pago-deudas": 1,
  settings: 2,
  autorizaciones: 1,
};

export const BOTTOM_NAV_ACTIVE: Partial<Record<Page, BottomNavTab>> = {
  home: "home",
  alerts: "notifications",
  notifications: "notifications",
  documents: "documents",
  profile: "profile",
  lugares: "more",
  assistance: "more",
  "pago-deudas": "more",
  autorizaciones: "more",
};

export function getNavDirection(from: Page, to: Page): NavDirection {
  if (to === "home") return "back";
  if (from === "home") return "forward";
  if (PAGE_DEPTH[to] < PAGE_DEPTH[from]) return "back";
  if (PAGE_DEPTH[to] > PAGE_DEPTH[from]) return "forward";
  return "forward";
}
