import {
  BarChart3,
  CalendarDays,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

export type WorkspaceNavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type WorkspaceProfile = {
  initials: string;
  name: string;
  workspaceName: string;
};

export const productName = "Flintzy";

export const workspaceProfile: WorkspaceProfile = {
  initials: "RJ",
  name: "Rajesh Janyani",
  workspaceName: "Personal workspace",
};

export const workspaceNavigation: WorkspaceNavigationItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Publishing", href: "/publishing", icon: CalendarDays },
];
