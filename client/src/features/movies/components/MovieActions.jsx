import { useState } from "react";
import api from "../../../services/api";
import ReviewEditor from "./ReviewEditor";
import StarRating from "../../../shared/ui/StarRating";

export default function MovieActions({ tmdbId, userState, refresh }) {
  const [editing, setEditing] = useState(false);

  const saveMovie = async () => {
    try {
      await api.post(`/user-movies/${tmdbId}`);
      refresh();
    } catch (err) {
      alert(err.response?.data?.error);
    }
  };

  if (!userState?.saved) {
    return (
      <button
        onClick={saveMovie}
        className="px-6 py-3 bg-green-500 hover:bg-green-400 hover:scale-103 transition cursor-pointer text-black rounded-lg font-semibold"
      >
        Save Movie
      </button>
    );
  }

  return (
    <div className="space-y-4">
      {userState.status === "saved" && !editing && (
        <button
          onClick={() => setEditing(true)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-400 hover:scale-103 transition cursor-pointer rounded-lg font-semibold"
        >
          Mark as Watched
        </button>
      )}

      {userState.status === "watched" && !editing && (
        <div className="flex items-center gap-4">
          <span className="text-green-400 font-semibold">Watched</span>

          <StarRating rating={userState.rating} readOnly />

          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 hover:scale-103 transition cursor-pointer rounded-lg"
          >
            Edit
          </button>
        </div>
      )}

      {editing && (
        <ReviewEditor
          tmdbId={tmdbId}
          existingState={userState}
          refresh={refresh}
          closeEditor={() => setEditing(false)}
        />
      )}
    </div>
  );
}
