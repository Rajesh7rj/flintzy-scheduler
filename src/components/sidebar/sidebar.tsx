import { LogOut, X } from "lucide-react";
import type { WorkspaceNavigationItem } from "@/lib/workspace";
import { SidebarBrand } from "./sidebar-brand";
import { SidebarNavigation } from "./sidebar-navigation";
import {
  SidebarProfile,
  type SidebarProfileProps,
} from "./sidebar-profile";

type SidebarProps = {
  productName: string;
  profile: SidebarProfileProps;
  navigationItems: WorkspaceNavigationItem[];
  pathname: string;
  onClose?: () => void;
};

export function Sidebar({
  productName,
  profile,
  navigationItems,
  pathname,
  onClose,
}: SidebarProps) {
  return (
    <div className="flex h-full flex-col px-[18px] py-7">
      <div className="flex items-center justify-between gap-3">
        <SidebarBrand productName={productName} />
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="inline-flex size-10 items-center justify-center rounded-xl text-content-muted transition-colors hover:bg-surface-muted hover:text-content"
          >
            <X className="size-5" />
          </button>
        ) : null}
      </div>

      <SidebarProfile {...profile} />
      <SidebarNavigation
        items={navigationItems}
        pathname={pathname}
        onNavigate={onClose}
      />

      <div className="mt-auto border-t border-line pt-5">
        <span className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-content-muted">
          <LogOut className="size-5" />
          Log out
        </span>
      </div>
    </div>
  );
}
