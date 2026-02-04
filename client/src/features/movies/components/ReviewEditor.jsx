import { useState } from "react";
import api from "../../../services/api";
import StarRating from "../../../shared/ui/StarRating";

export default function ReviewEditor({
  tmdbId,
  existingState,
  refresh,
  closeEditor,
}) {
  const [rating, setRating] = useState(existingState?.rating || 0);
  const [review, setReview] = useState(existingState?.review || "");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!rating) {
      alert("Please select a rating");
      return;
    }

    try {
      setLoading(true);

      await api.patch(`/user-movies/${tmdbId}`, {
        status: "watched",
        rating,
        review,
      });

      refresh();
      closeEditor();
    } catch (err) {
      alert(err.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl space-y-4 border border-white/10">
      <h3 className="text-lg font-semibold">
        {existingState?.status === "watched"
          ? "Edit Review"
          : "Rate this Movie"}
      </h3>

      <StarRating rating={rating} setRating={setRating} />

      <textarea
        placeholder="Write your review (optional)..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="
          w-full p-3 rounded-lg
          bg-slate-800
          border border-white/10
          outline-none
          min-h-25
        "
      />

      <div className="flex gap-3">
        <button
          onClick={submit}
          disabled={loading}
          className="
            px-5 py-2
            bg-green-500
            hover:bg-green-400 hover:scale-103 transition cursor-pointer
            text-black
            rounded-lg
            font-semibold
          "
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          onClick={closeEditor}
          className="px-5 py-2 bg-white/10 hover:bg-white/20 hover:scale-103 transition cursor-pointer rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
