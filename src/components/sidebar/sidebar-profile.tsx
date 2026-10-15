import { ChevronDown } from "lucide-react";

export type SidebarProfileProps = {
  initials: string;
  name: string;
  workspaceName: string;
};

export function SidebarProfile({
  initials,
  name,
  workspaceName,
}: SidebarProfileProps) {
  return (
    <div className="mt-7 border-y border-line py-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-violet-400 text-xs font-bold text-white">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-content">{name}</p>
          <p className="mt-0.5 text-xs text-content-muted">{workspaceName}</p>
        </div>
        <ChevronDown className="ml-auto size-4 shrink-0 text-content-muted" />
      </div>
    </div>
  );
}
