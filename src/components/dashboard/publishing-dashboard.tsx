"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PostComposer } from "@/components/composer/post-composer";
import { PostFilters } from "@/components/filters/post-filters";
import { PostQueue } from "@/components/queue/post-queue";
import { QueueSummary } from "@/components/queue/queue-summary";
import { Modal } from "@/components/shared/modal";
import { PLATFORMS, POST_STATUSES } from "@/lib/constants";
import { retryFailedPost } from "@/lib/mock-api";
import { formatScheduledDate, formatScheduledTime } from "@/lib/date";
import {
  defaultPostFilters,
  filterPosts,
  type PostFilters as PostFilterValues,
} from "@/lib/post-filters";
import type { Platform, Post, PostStatus } from "@/types/post";

type PublishingDashboardProps = {
  posts: Post[];
};

function isPlatform(value: string | null): value is Platform {
  return PLATFORMS.some((platform) => platform === value);
}

function isPostStatus(value: string | null): value is PostStatus {
  return POST_STATUSES.some((status) => status === value);
}

function getFiltersFromSearchParams(
  searchParams: URLSearchParams,
): PostFilterValues {
  const platform = searchParams.get("platform");
  const status = searchParams.get("status");

  return {
    query: searchParams.get("q") ?? defaultPostFilters.query,
    platform: isPlatform(platform) ? platform : defaultPostFilters.platform,
    status: isPostStatus(status) ? status : defaultPostFilters.status,
  };
}

export function PublishingDashboard({ posts }: PublishingDashboardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [dashboardPosts, setDashboardPosts] = useState(posts);
  const [retryingPostIds, setRetryingPostIds] = useState<string[]>([]);
  const [scheduledPost, setScheduledPost] = useState<Post | null>(null);

  const filters = useMemo(
    () => getFiltersFromSearchParams(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );
  const filteredPosts = useMemo(
    () => filterPosts(dashboardPosts, filters),
    [dashboardPosts, filters],
  );
  const isComposerOpen = searchParams.get("compose") === "1";

  useEffect(() => {
    if (!scheduledPost) {
      return;
    }

    const timeoutId = window.setTimeout(() => setScheduledPost(null), 5000);

    return () => window.clearTimeout(timeoutId);
  }, [scheduledPost]);

  function closeComposer() {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("compose");

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }

  function schedulePost(post: Post) {
    setDashboardPosts((currentPosts) =>
      [...currentPosts, post].sort(
        (firstPost, secondPost) =>
          new Date(firstPost.scheduledAt).getTime() -
          new Date(secondPost.scheduledAt).getTime(),
      ),
    );
    setScheduledPost(post);
    closeComposer();
  }

  async function retryPost(post: Post) {
    if (post.status !== "failed" || retryingPostIds.includes(post.id)) {
      return;
    }

    setRetryingPostIds((currentIds) => [...currentIds, post.id]);
    setDashboardPosts((currentPosts) =>
      currentPosts.map((currentPost) =>
        currentPost.id === post.id
          ? { ...currentPost, status: "scheduled", errorMessage: undefined }
          : currentPost,
      ),
    );

    try {
      await retryFailedPost();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "The post could not be retried.";

      setDashboardPosts((currentPosts) =>
        currentPosts.map((currentPost) =>
          currentPost.id === post.id
            ? { ...currentPost, status: "failed", errorMessage }
            : currentPost,
        ),
      );
    } finally {
      setRetryingPostIds((currentIds) =>
        currentIds.filter((postId) => postId !== post.id),
      );
    }
  }

  function updateFilters(nextFilters: Partial<PostFilterValues>) {
    const updatedFilters = { ...filters, ...nextFilters };
    const params = new URLSearchParams(searchParams.toString());

    if (updatedFilters.query) {
      params.set("q", updatedFilters.query);
    } else {
      params.delete("q");
    }

    if (updatedFilters.platform === "all") {
      params.delete("platform");
    } else {
      params.set("platform", updatedFilters.platform);
    }

    if (updatedFilters.status === "all") {
      params.delete("status");
    } else {
      params.set("status", updatedFilters.status);
    }

    const queryString = params.toString();

    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  }

  return (
    <div className="space-y-8">
      <PostFilters
        filters={filters}
        resultCount={filteredPosts.length}
        isPending={isPending}
        onChange={updateFilters}
        onReset={() => updateFilters(defaultPostFilters)}
      />
      {scheduledPost ? (
        <p
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
        >
          Post scheduled for {formatScheduledTime(scheduledPost.scheduledAt)} on{" "}
          {formatScheduledDate(scheduledPost.scheduledAt)}.
        </p>
      ) : null}
      <QueueSummary posts={dashboardPosts} />
      <PostQueue
        posts={filteredPosts}
        retryingPostIds={retryingPostIds}
        onRetry={retryPost}
        newPostId={scheduledPost?.id}
      />

      {isComposerOpen ? (
        <Modal
          title="Schedule a post"
          description="Create one post and publish it across the channels you select."
          onClose={closeComposer}
        >
          <PostComposer onSchedule={schedulePost} onCancel={closeComposer} />
        </Modal>
      ) : null}
    </div>
  );
}
