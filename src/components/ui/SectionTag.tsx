export function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-chip border border-red-500/25 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-red-300 uppercase">
      <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true" />
      {children}
    </span>
  );
}
