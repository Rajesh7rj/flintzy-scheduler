import { Clock3, MoreHorizontal, RefreshCw } from "lucide-react";
import { PlatformIcon } from "@/components/shared/platform-icon";
import { PLATFORM_CONFIG, STATUS_CONFIG } from "@/lib/constants";
import { formatScheduledDate, formatScheduledTime } from "@/lib/date";
import type { Post } from "@/types/post";

type PostCardProps = {
  post: Post;
  isRetrying?: boolean;
  onRetry?: (post: Post) => void;
  isNew?: boolean;
};

const statusDotColors = {
  scheduled: "bg-violet-500",
  published: "bg-emerald-500",
  failed: "bg-rose-500",
};

export function PostCard({
  post,
  isRetrying = false,
  onRetry,
  isNew = false,
}: PostCardProps) {
  const status = isRetrying
    ? { label: "Retrying", color: "text-amber-600" }
    : STATUS_CONFIG[post.status];
  const isFailed = post.status === "failed";
  const hasRetryError = isFailed && !isRetrying;

  return (
    <article
      id={`post-${post.id}`}
      className={`scroll-mt-6 rounded-2xl border bg-surface px-5 py-4 shadow-[0_2px_5px_rgba(42,31,87,0.02)] transition-colors sm:px-6 ${
        hasRetryError
          ? "border-rose-200 bg-rose-50/30"
          : isRetrying
            ? "border-amber-200 bg-amber-50/40"
            : isNew
              ? "border-brand/40 bg-indigo-50/30 ring-2 ring-brand/15"
            : "border-line"
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold uppercase tracking-[0.1em]">
        {isRetrying ? (
          <RefreshCw className="size-3.5 animate-spin text-amber-500" />
        ) : (
          <span className={`size-2 rounded-full ${statusDotColors[post.status]}`} />
        )}
        <span className={status.color}>{status.label}</span>
        {isRetrying ? (
          <span className="normal-case tracking-normal text-amber-600">
            Scheduling your post again…
          </span>
        ) : null}
        {hasRetryError && post.errorMessage ? (
          <span className="normal-case tracking-normal text-rose-500">
            {post.errorMessage}
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex items-start justify-between gap-5">
        <p className="min-w-0 flex-1 text-sm leading-6 text-content sm:text-base">
          {post.content}
        </p>
        {post.mediaUrl ? (
          <img
            src={post.mediaUrl}
            alt="Post media preview"
            className="size-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-32"
          />
        ) : null}
      </div>

      {isFailed || isRetrying ? (
        <button
          type="button"
          onClick={() => onRetry?.(post)}
          disabled={isRetrying || !onRetry}
          className={`mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
            isRetrying
              ? "bg-amber-100 text-amber-700"
              : "bg-rose-100 text-rose-600 hover:bg-rose-200"
          }`}
        >
          <RefreshCw className={`size-4 ${isRetrying ? "animate-spin" : ""}`} />
          {isRetrying ? "Retrying publication..." : "Retry publish"}
        </button>
      ) : null}

      <div className="mt-4 flex items-center gap-3 border-t border-line pt-3">
        <div className="flex items-center gap-2">
          {post.platforms.map((platform) => {
            const config = PLATFORM_CONFIG[platform];

            return (
              <span
                key={platform}
                title={config.label}
                className={`inline-flex size-7 items-center justify-center rounded-lg ${config.surfaceColor} ${config.color}`}
              >
                <PlatformIcon platform={platform} className="size-3.5" />
                <span className="sr-only">{config.label}</span>
              </span>
            );
          })}
        </div>

        <span className="ml-auto flex items-center gap-1.5 text-xs text-content-muted">
          <Clock3 className="size-4" />
          {formatScheduledTime(post.scheduledAt)}
          <span className="hidden sm:inline">{formatScheduledDate(post.scheduledAt)}</span>
        </span>
        <MoreHorizontal className="size-5 text-content-muted" aria-hidden="true" />
      </div>
    </article>
  );
}
