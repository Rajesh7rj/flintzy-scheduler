import type { Post } from "@/types/post";

type QueueSummaryProps = {
  posts: Post[];
};

const summaryItems = [
  { status: "scheduled", label: "Scheduled", color: "text-brand" },
  { status: "published", label: "Published", color: "text-emerald-600" },
  { status: "failed", label: "Needs attention", color: "text-rose-500" },
] as const;

export function QueueSummary({ posts }: QueueSummaryProps) {
  return (
    <section className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-content-muted">
          Your queue
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-content sm:text-3xl">
          {posts.length} {posts.length === 1 ? "post" : "posts"}{" "}
          <span className="font-normal text-content-muted">in the pipeline</span>
        </h2>
      </div>

      <dl className="grid grid-cols-3 gap-8 sm:gap-12">
        {summaryItems.map((item) => {
          const count = posts.filter((post) => post.status === item.status).length;

          return (
            <div key={item.status}>
              <dd className={`text-2xl font-bold ${item.color}`}>{count}</dd>
              <dt className="mt-1 text-xs text-content-muted sm:text-sm">{item.label}</dt>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
