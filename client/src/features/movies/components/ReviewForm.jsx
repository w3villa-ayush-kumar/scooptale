import { useState } from "react";
import api from "../../../services/api";

export default function ReviewForm({ tmdbId, userState, refresh }) {
  const [text, setText] = useState("");

  if (!userState?.saved || userState.status !== "watched") {
    return null;
  }

  const submitReview = async () => {
    try {
      await api.patch(`/user-movies/${tmdbId}`, {
        review: text,
      });

      setText("");
      refresh();
    } catch (err) {
      alert(err.response?.data?.error);
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review..."
        className="w-full bg-slate-900 border border-white/10 rounded-xl p-3"
      />

      <button
        onClick={submitReview}
        className="px-5 py-2 bg-purple-500 rounded-lg"
      >
        Submit Review
      </button>
    </div>
  );
}
