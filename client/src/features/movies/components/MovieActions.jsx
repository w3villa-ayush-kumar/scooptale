import api from "../../../services/api";

export default function MovieActions({ tmdbId, userState, refresh }) {
  const saveMovie = async () => {
    try {
      await api.post(`/user-movies/${tmdbId}`);
      refresh();
    } catch (err) {
      alert(err.response?.data?.error);
    }
  };

  const markWatched = async () => {
    const rating = prompt("Rate this movie (1-5)");

    if (!rating) return;

    try {
      await api.patch(`/user-movies/${tmdbId}`, {
        status: "watched",
        rating: Number(rating),
      });

      refresh();
    } catch (err) {
      alert(err.response?.data?.error);
    }
  };

  if (!userState?.saved) {
    return (
      <button
        onClick={saveMovie}
        className="px-6 py-3 bg-green-500 text-black rounded-xl cursor-pointer "
      >
        Save Movie
      </button>
    );
  }

  if (userState.status === "saved") {
    return (
      <button
        onClick={markWatched}
        className="px-6 py-3 bg-blue-500 rounded-xl"
      >
        Mark as Watched
      </button>
    );
  }

  return <div className="text-green-400 font-semibold">✓ Watched</div>;
}
