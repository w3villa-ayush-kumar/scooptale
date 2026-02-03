export default function ReviewsList({ reviews }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">User Reviews</h2>

      {reviews.map((r, i) => (
        <div
          key={i}
          className="bg-slate-900 p-4 rounded-xl border border-white/10"
        >
          <div className="font-semibold">
            {r.user.name} ⭐ {r.rating}
          </div>

          <p className="text-slate-300 mt-2">{r.review}</p>
        </div>
      ))}
    </div>
  );
}
