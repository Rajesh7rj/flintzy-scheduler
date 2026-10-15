import posts from "@/data/posts.json";
import type { Post } from "@/types/post";

export function getPosts(): Post[] {
  return [...(posts as Post[])].sort(
    (firstPost, secondPost) =>
      new Date(firstPost.scheduledAt).getTime() -
      new Date(secondPost.scheduledAt).getTime(),
  );
}
