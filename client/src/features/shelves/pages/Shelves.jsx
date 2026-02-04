import { useEffect, useState } from "react";

import ShelfRow from "../components/ShelfRow";
import ShelvesSkeleton from "../components/ShelvesSkeleton";
import ShelvesStats from "../components/ShelvesStats";
import api from "../../../services/api";

export default function Shelves() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchShelves = async () => {
      try {
        const res = await api.get("/user-movies/shelves");
        setData(res.data);
      } catch (err) {
        console.error("Failed to load shelves", err);
      }
    };

    fetchShelves();
  }, []);

  if (!data) {
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
