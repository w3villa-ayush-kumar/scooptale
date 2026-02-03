export default function MoviePageSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative h-[70vh] skeleton" />

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <div className="h-10 w-72 skeleton rounded-lg" />

        <div className="space-y-3">
          <div className="h-4 w-full skeleton rounded" />
          <div className="h-4 w-5/6 skeleton rounded" />
          <div className="h-4 w-4/6 skeleton rounded" />
        </div>

        <div className="flex gap-4">
          <div className="h-12 w-32 skeleton rounded-full" />
          <div className="h-12 w-32 skeleton rounded-full" />
        </div>

        <div className="space-y-4">
          <div className="h-6 w-40 skeleton rounded" />

          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-xl">
              <div className="h-4 w-32 skeleton rounded mb-2" />
              <div className="h-3 w-full skeleton rounded mb-1" />
              <div className="h-3 w-5/6 skeleton rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
