import { useEffect, useState } from "react";
import api from "../../../services/api";
import StarRating from "../../../shared/ui/StarRating";
import { toast } from "sonner";

export default function ReviewEditor({
  tmdbId,
  existingState,
  setData,
  closeEditor,
}) {
  const [rating, setRating] = useState(existingState?.rating || 0);
  const [review, setReview] = useState(existingState?.review || "");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!rating) {
      toast.error("Please add a rating before saving");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      await api.patch(`/user-movies/${tmdbId}`, {
        status: "watched",
        rating,
        review,
      });

      const updatedUserState = {
        saved: true,
        status: "watched",
        rating,
        review,
      };

      setData((prev) => {
        if (!prev) return prev;

        const reviews = [...prev.reviews];

        const index = reviews.findIndex((r) => r.user?.isCurrentUser === true);

        if (index !== -1) {
          reviews[index] = {
            ...reviews[index],
            rating,
            review,
          };
        } else {
          reviews.unshift({
            rating,
            review,
            user: {
              name: "You",
              isCurrentUser: true,
            },
          });
        }

        return {
          ...prev,
          userState: updatedUserState,
          reviews,
        };
      });

      toast.success("Your review has been saved", { id: "review-saved" });
      closeEditor();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to save review",
        { id: "review-error" },
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setRating(existingState?.rating || 0);
    setReview(existingState?.review || "");
  }, [existingState]);

  return (
    <div className="bg-slate-900 p-4 sm:p-6 rounded-xl space-y-4 border border-white/10">
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
            bg-green-500 text-black
            rounded-lg font-semibold
            cursor-pointer
            transition
            hover:bg-green-400
            hover:scale-103
            disabled:opacity-60
          "
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          onClick={closeEditor}
          className="px-5 py-2 bg-white/10 hover:bg-white/20 hover:scale-103 cursor-pointer rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
