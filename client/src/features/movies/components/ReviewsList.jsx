export default function ReviewsList({ reviews }) {
  if (!reviews?.length) {
    return <div className="text-slate-400">No reviews yet.</div>;
  }

  return (
    <div className="space-y-6">
      <h2
        className="text-xl sm:text-2xl
 font-semibold"
      >
        User Reviews
      </h2>

      {reviews.map((r, i) => (
        <div
          key={r._id || i}
          className={`
            bg-slate-900 p-4 rounded-xl border
            ${r.user?.isCurrentUser ? "border-green-400" : "border-white/10"}
          `}
        >
          <div className="font-semibold">
            {r.user?.isCurrentUser ? "You" : r.user?.name} ⭐ {r.rating}
          </div>

          {r.review && <p className="text-slate-300 mt-2">{r.review}</p>}
        </div>
      ))}
    </div>
  );
}
