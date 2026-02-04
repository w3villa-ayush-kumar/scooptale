export default function ShelvesStats({ stats }) {
  const items = [
    { label: "Watchlist", value: stats.watchlist },
    { label: "Watched", value: stats.watched },
    { label: "Reviewed", value: stats.reviewed },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mb-12">
      {items.map((item) => (
        <div
          key={item.label}
          className="
            bg-white/5 border border-white/10
            rounded-2xl p-6 text-center
          "
        >
          <p className="text-3xl font-bold text-green-400">{item.value}</p>

          <p className="text-slate-400 text-sm mt-1">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
