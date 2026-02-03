export default function MovieCardSkeleton() {
  return (
    <div
      className="
        rounded-2xl overflow-hidden
        bg-white/5 border border-white/10
      "
    >
      <div className="aspect-2/3 w-full skeleton" />
    </div>
  );
}
