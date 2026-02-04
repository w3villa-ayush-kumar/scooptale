export default function ShelvesSkeleton() {
  return (
    <div className="space-y-10 animate-pulse">
      {[1, 2, 3].map((row) => (
        <div key={row}>
          <div className="h-6 w-40 bg-white/10 rounded mb-4" />

          <div className="flex gap-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-full h-60 bg-white/10 rounded-xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
