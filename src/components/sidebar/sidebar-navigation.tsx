import Link from "next/link";
import type { WorkspaceNavigationItem } from "@/lib/workspace";

type SidebarNavigationProps = {
  items: WorkspaceNavigationItem[];
  pathname: string;
  onNavigate?: () => void;
};

export function SidebarNavigation({
  items,
  pathname,
  onNavigate,
}: SidebarNavigationProps) {
  return (
    <nav className="mt-8" aria-label="Workspace navigation">
      <p className="mb-2 px-3 text-xs font-bold uppercase tracking-[0.12em] text-content-muted">
        Workspace
      </p>
      <ul className="space-y-1">
        {items.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-brand"
                    : "text-content-muted hover:bg-surface-muted hover:text-content"
                }`}
              >
                <Icon className="size-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
