"use client";

import { RotateCcw, Search } from "lucide-react";
import {
  PLATFORM_CONFIG,
  PLATFORMS,
  POST_STATUSES,
  STATUS_CONFIG,
} from "@/lib/constants";
import type { PostFilters as PostFilterValues } from "@/lib/post-filters";

type PostFiltersProps = {
  filters: PostFilterValues;
  resultCount: number;
  isPending: boolean;
  onChange: (nextFilters: Partial<PostFilterValues>) => void;
  onReset: () => void;
};

export function PostFilters({
  filters,
  resultCount,
  isPending,
  onChange,
  onReset,
}: PostFiltersProps) {
  const hasActiveFilters =
    filters.query.length > 0 ||
    filters.platform !== "all" ||
    filters.status !== "all";

  return (
    <section
      aria-label="Filter posts"
      className="flex flex-col gap-3 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(8rem,10rem)_minmax(8rem,10rem)] lg:max-w-2xl">
        <label className="relative col-span-2 block sm:col-span-1">
          <span className="sr-only">Search posts</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-content-muted" />
          <input
            type="search"
            value={filters.query}
            onChange={(event) => onChange({ query: event.target.value })}
            placeholder="Search posts…"
            className="h-11 w-full rounded-xl border border-line bg-surface px-9 text-sm text-content outline-none placeholder:text-content-muted focus:border-brand"
          />
        </label>

        <label>
          <span className="sr-only">Filter by platform</span>
          <select
            value={filters.platform}
            onChange={(event) =>
              onChange({
                platform: event.target.value as PostFilterValues["platform"],
              })
            }
            className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-content outline-none focus:border-brand"
          >
            <option value="all">All platforms</option>
            {PLATFORMS.map((platform) => (
              <option key={platform} value={platform}>
                {PLATFORM_CONFIG[platform].label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="sr-only">Filter by status</span>
          <select
            value={filters.status}
            onChange={(event) =>
              onChange({
                status: event.target.value as PostFilterValues["status"],
              })
            }
            className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-content outline-none focus:border-brand"
          >
            <option value="all">All statuses</option>
            {POST_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_CONFIG[status].label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center justify-between gap-3 lg:justify-end">
        <p aria-live="polite" className="text-sm text-content-muted">
          {isPending ? "Updating…" : `${resultCount} results`}
        </p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-content-muted transition-colors hover:bg-surface-muted hover:text-content"
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        ) : null}
      </div>
    </section>
  );
}
