export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-2xl bg-slate-200 ${className}`.trim()} />;
}

export function SkeletonText({ lines = 3, className = "" }) {
  return (
    <div className={`space-y-3 ${className}`.trim()} aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={`skeleton-text-${index}`}
          className={index === lines - 1 ? "h-4 w-3/4" : "h-4 w-full"}
        />
      ))}
    </div>
  );
}

export function SkeletonImage({ className = "" }) {
  return <Skeleton className={`aspect-[4/3] w-full ${className}`.trim()} />;
}

export function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`.trim()}
      aria-hidden="true"
    >
      <Skeleton className="h-5 w-24" />
      <SkeletonText lines={2} className="mt-4" />
      <SkeletonImage className="mt-5" />
      <SkeletonText lines={3} className="mt-5" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-16 py-16 sm:space-y-20 sm:py-24 lg:space-y-24 lg:py-32">
      <section className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Skeleton className="mx-auto h-4 w-36" />
        <Skeleton className="mx-auto mt-5 h-12 w-3/4" />
        <SkeletonText lines={3} className="mx-auto mt-6 max-w-3xl" />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={`page-skeleton-${index}`} />
        ))}
      </section>
    </div>
  );
}