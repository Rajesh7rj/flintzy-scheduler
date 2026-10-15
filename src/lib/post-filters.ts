import type { Platform, Post, PostStatus } from "@/types/post";

export type PostFilters = {
  query: string;
  platform: Platform | "all";
  status: PostStatus | "all";
};

export const defaultPostFilters: PostFilters = {
  query: "",
  platform: "all",
  status: "all",
};

export function filterPosts(posts: Post[], filters: PostFilters): Post[] {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      post.content.toLowerCase().includes(normalizedQuery);
    const matchesPlatform =
      filters.platform === "all" || post.platforms.includes(filters.platform);
    const matchesStatus =
      filters.status === "all" || post.status === filters.status;

    return matchesQuery && matchesPlatform && matchesStatus;
  });
}
