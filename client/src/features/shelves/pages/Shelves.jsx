import { useEffect, useState } from "react";
import { useApp } from "../../../context/useApp";
import ShelfRow from "../components/ShelfRow";
import ShelvesSkeleton from "../components/ShelvesSkeleton";
import ShelvesStats from "../components/ShelvesStats";
import api from "../../../services/api";
import { toast } from "sonner";

export default function Shelves() {
  const { user } = useApp();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchShelves = async () => {
      try {
        setError(false);

        const res = await api.get("/user-movies/shelves");
        setData(res.data.data);
      } catch (err) {
        console.error("Failed to load shelves", err);

        setError(true);

        toast.error("Failed to load your movies", {
          id: "shelves-error",
        });
      }
    };

    fetchShelves();
  }, [user]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400">
        Failed to load your movies. Please refresh.
      </div>
    );
  }

  if (!user || !data) {
    return (
      <div className="min-h-screen p-10 bg-slate-950 text-white">
        <ShelvesSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-10 py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">My Movies</h1>

        <ShelvesStats stats={data.stats} />

        <div className="space-y-12">
          <ShelfRow title="🎬 Watchlist" movies={data.watchlist} />
          <ShelfRow title="✅ Watched" movies={data.watched} />
          <ShelfRow title="⭐ Reviewed" movies={data.reviewed} />
        </div>
      </div>
    </div>
  );
}
