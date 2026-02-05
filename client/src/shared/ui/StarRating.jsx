export default function StarRating({
  rating = 0,
  setRating,
  readOnly = false,
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => {
            if (!readOnly && setRating) {
              setRating(star);
            }
          }}
          className={`
            text-2xl
            ${star <= rating ? "text-yellow-400" : "text-gray-500"}
            ${!readOnly ? "cursor-pointer hover:text-yellow-400 hover:scale-103" : ""}
          `}
        >
          ★
        </span>
      ))}
    </div>
  );
}
