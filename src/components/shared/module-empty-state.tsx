type ModuleEmptyStateProps = {
  title: string;
  description: string;
};

export function ModuleEmptyState({
  title,
  description,
}: ModuleEmptyStateProps) {
  return (
    <section
      aria-labelledby="module-empty-state-title"
      className="flex min-h-[calc(100vh-9rem)] items-center justify-center"
    >
      <div className="max-w-sm text-center">
        <h2
          id="module-empty-state-title"
          className="text-xl font-semibold tracking-tight text-content"
        >
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-content-muted">{description}</p>
      </div>
    </section>
  );
}
