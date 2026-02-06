import LocationPicker from "../../../shared/ui/LocationPicker";

export default function LocationCard({
  showMap,
  setShowMap,
  saveLocation,
  user,
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
      <p className="text-slate-400 text-sm mb-4">Update Location</p>

      {!showMap ? (
        <button
          onClick={() => setShowMap(true)}
          className="px-5 py-2 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-400 transition"
        >
          Update Location
        </button>
      ) : (
        <LocationPicker
          onSelect={saveLocation}
          initialLocation={user?.location}
        />
      )}
    </div>
  );
}
