"use client";

import { SearchX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getQueueDayLabel } from "@/lib/date";
import type { Post } from "@/types/post";
import { PostCard } from "./post-card";

type PostQueueProps = {
  posts: Post[];
  retryingPostIds?: string[];
  onRetry?: (post: Post) => void;
  newPostId?: string;
};

type PostGroup = {
  label: string;
  posts: Post[];
};

function groupPostsByDay(posts: Post[]): PostGroup[] {
  const groups = new Map<string, Post[]>();

  for (const post of posts) {
    const label = getQueueDayLabel(post.scheduledAt);
    const currentPosts = groups.get(label) ?? [];

    currentPosts.push(post);
    groups.set(label, currentPosts);
  }

  return Array.from(groups, ([label, groupedPosts]) => ({
    label,
    posts: groupedPosts,
  }));
}

function QueueSkeleton() {
  return (
    <section aria-busy="true" aria-label="Loading posts" className="max-w-[1100px]">
      <div className="h-5 w-28 animate-pulse rounded bg-surface-muted" />
      <div className="mt-4 space-y-4">
        <div className="h-40 animate-pulse rounded-2xl bg-surface-muted" />
        <div className="h-40 animate-pulse rounded-2xl bg-surface-muted" />
      </div>
    </section>
  );
}

export function PostQueue({
  posts,
  retryingPostIds = [],
  onRetry,
  newPostId,
}: PostQueueProps) {
  const [isClient, setIsClient] = useState(false);
  const groups = useMemo(() => groupPostsByDay(posts), [posts]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !newPostId) {
      return;
    }

    document.getElementById(`post-${newPostId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [isClient, newPostId, posts]);

  if (!isClient) {
    return <QueueSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <section className="max-w-[1100px] rounded-2xl border border-dashed border-line bg-surface px-6 py-14 text-center">
        <SearchX className="mx-auto size-7 text-content-muted" aria-hidden="true" />
        <h2 className="mt-4 text-lg font-semibold text-content">No posts found</h2>
        <p className="mt-2 text-sm text-content-muted">
          Try changing your search or filter selection.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-[1100px] space-y-8" aria-label="Post queue">
      {groups.map((group) => (
        <section key={group.label}>
          <div className="flex items-center gap-3">
            <h2 className="shrink-0 text-sm font-bold text-content">{group.label}</h2>
            <div className="h-px flex-1 bg-line" />
            <span className="text-xs font-medium text-content-muted">
              {group.posts.length} {group.posts.length === 1 ? "post" : "posts"}
            </span>
          </div>

          <div className="mt-4 space-y-4">
            {group.posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isRetrying={retryingPostIds.includes(post.id)}
                onRetry={onRetry}
                isNew={post.id === newPostId}
              />
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
