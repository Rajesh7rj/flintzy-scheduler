"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock3, Menu, Plus } from "lucide-react";
import { Sidebar } from "@/components/sidebar/sidebar";
import {
  productName,
  workspaceNavigation,
  workspaceProfile,
} from "@/lib/workspace";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [timeZone, setTimeZone] = useState<string | null>(null);
  const pathname = usePathname();
  const pageTitle =
    workspaceNavigation.find((item) => item.href === pathname)?.label ??
    "Publishing";
  const isPublishing = pathname === "/publishing";

  useEffect(() => {
    if (!isMobileSidebarOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileSidebarOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileSidebarOpen]);

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  return (
    <div className="min-h-screen bg-page">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-line bg-surface lg:block">
        <Sidebar
          productName={productName}
          profile={workspaceProfile}
          navigationItems={workspaceNavigation}
          pathname={pathname}
        />
      </aside>

      {isMobileSidebarOpen ? (
        <div
          className="fixed inset-0 z-50 bg-slate-950/35 lg:hidden"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsMobileSidebarOpen(false);
            }
          }}
        >
          <aside className="h-full w-[min(19rem,88vw)] bg-surface shadow-2xl">
            <Sidebar
              productName={productName}
              profile={workspaceProfile}
              navigationItems={workspaceNavigation}
              pathname={pathname}
              onClose={() => setIsMobileSidebarOpen(false)}
            />
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-64">
        <header className="border-b border-line bg-surface">
          <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(true)}
                aria-label="Open navigation"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl text-content-muted transition-colors hover:bg-surface-muted hover:text-content lg:hidden"
              >
                <Menu className="size-5" />
              </button>
              <div className="min-w-0">
                <p className="text-sm font-medium text-content-muted">
                  Workspace
                </p>
                <h1 className="mt-1 truncate text-2xl font-semibold tracking-tight text-content sm:text-3xl">
                  {pageTitle}
                </h1>
              </div>
            </div>

            {isPublishing ? (
              <div className="flex shrink-0 items-center gap-3">
                <div className="hidden h-11 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-sm font-medium text-content-muted sm:flex">
                  <Clock3 className="size-4" />
                  <span>{timeZone ?? "Local time"}</span>
                </div>
                <Link
                  href="/publishing?compose=1"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_4px_10px_rgba(93,63,211,0.2)] transition-colors hover:bg-brand-hover"
                >
                  <Plus className="size-4" />
                  <span className="hidden sm:inline">New post</span>
                  <span className="sm:hidden">New</span>
                </Link>
              </div>
            ) : null}
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
