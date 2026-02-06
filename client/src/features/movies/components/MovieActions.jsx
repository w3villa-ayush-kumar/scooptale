import { useState } from "react";
import api from "../../../services/api";
import ReviewEditor from "./ReviewEditor";
import StarRating from "../../../shared/ui/StarRating";
import { toast } from "sonner";

export default function MovieActions({ tmdbId, userState, setData }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const saveMovie = async () => {
    try {
      setSaving(true);

      await api.post(`/user-movies/${tmdbId}`);

      setData((prev) => ({
        ...prev,
        userState: {
          saved: true,
          status: "saved",
        },
      }));

      toast.success("Movie saved to your library", { id: "save-movie" });
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Please login to save movies");
        return;
      }

      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong",
      );
    } finally {
      setSaving(false);
    }
  };

  if (!userState?.saved) {
    return (
      <button
        onClick={saveMovie}
        disabled={saving}
        className="px-6 py-3 w-full sm:w-auto bg-green-500 hover:bg-green-400 hover:scale-103 cursor-pointer transition text-black rounded-lg font-semibold"
      >
        {saving ? "Saving..." : "Save Movie"}
      </button>
    );
  }

  return (
    <div className="space-y-4">
      {userState.status === "saved" && !editing && (
        <button
          onClick={() => setEditing(true)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-400 hover:scale-103 cursor-pointer transition rounded-lg font-semibold"
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
            className="px-4 py-2 bg-white/10 hover:bg-white/20 hover:scale-103 cursor-pointer rounded-lg"
          >
            Edit
          </button>
        </div>
      )}

      {editing && (
        <ReviewEditor
          tmdbId={tmdbId}
          existingState={userState}
          setData={setData}
          closeEditor={() => setEditing(false)}
        />
      )}
    </div>
  );
}
