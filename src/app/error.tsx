"use client";

type ErrorPageProps = {
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="grid min-h-screen place-items-center bg-page px-6 text-center">
      <section className="max-w-md">
        <p className="text-sm font-semibold text-rose-600">Something went wrong</p>
        <h1 className="mt-2 text-2xl font-semibold text-content">
          We could not load your workspace.
        </h1>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
