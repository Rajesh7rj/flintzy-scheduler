import { Suspense } from "react";
import { PublishingDashboard } from "@/components/dashboard/publishing-dashboard";
import { getPosts } from "@/lib/posts";

export default function PublishingPage() {
  return (
    <Suspense
      fallback={<div className="h-11 max-w-2xl animate-pulse rounded-xl bg-surface-muted" />}
    >
      <PublishingDashboard posts={getPosts()} />
    </Suspense>
  );
}
