export default function EmptyState({
  title,
  description,
  action,
  className = "",
}) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center ${className}`.trim()}
    >
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-bold text-slate-500 shadow-sm">
          —
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
        </div>
        {action ? <div className="pt-2">{action}</div> : null}
      </div>
    </div>
  );
}