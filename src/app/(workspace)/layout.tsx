import type { ReactNode } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

type WorkspaceLayoutProps = {
  children: ReactNode;
};

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  return <DashboardShell>{children}</DashboardShell>;
}
