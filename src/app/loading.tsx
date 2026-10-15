export default function Loading() {
  return (
    <main className="min-h-screen bg-page p-6 sm:p-10">
      <div className="mx-auto max-w-5xl animate-pulse space-y-6">
        <div className="h-10 w-64 rounded-xl bg-surface-muted" />
        <div className="h-16 rounded-2xl bg-surface-muted" />
        <div className="h-44 rounded-2xl bg-surface-muted" />
        <div className="h-44 rounded-2xl bg-surface-muted" />
      </div>
    </main>
  );
}
