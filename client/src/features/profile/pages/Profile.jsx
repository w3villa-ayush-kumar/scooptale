import api from "../../../services/api.js";
import { useApp } from "../../../context/useApp.js";
import ProfileCard from "../components/ProfileCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const { user, loadingUser, refreshUser } = useApp();
  const [saving, setSaving] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [editing, setEditing] = useState(false);
  const [stats, setStats] = useState(null);

  const [form, setForm] = useState(() => ({
    name: user?.name || "",
    address: user?.address || "",
  }));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/user-movies/shelves");
        setStats(res.data.data.stats);
      } catch (err) {
        console.error("Failed to load stats", err);

        toast.error("Unable to load profile stats", {
          id: "stats-error",
        });
      }
    };

    fetchStats();
  }, []);

  const saveProfile = async () => {
    if (!form.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      setSaving(true);

      await toast.promise(
        api.put("/user/me", form),
        {
          loading: "Saving profile...",
          success: "Profile updated successfully",
          error: "Failed to update profile",
        },
        { id: "profile-save" },
      );

      await refreshUser();
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const cancelEditing = () => {
    setEditing(false);
    setForm({
      name: user?.name || "",
      address: user?.address || "",
    });
  };

  const saveLocation = async (location) => {
    try {
      setSaving(true);

      await toast.promise(
        api.put("/user/me", {
          address: location.address,
          location: {
            lat: location.lat,
            lng: location.lng,
          },
        }),
        {
          loading: "Updating location...",
          success: "Location updated",
          error: "Failed to update location",
        },
        { id: "location-save" },
      );

      await refreshUser();
      setShowMap(false);
    } finally {
      setSaving(false);
    }
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Unauthorized
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black text-white px-4 sm:px-6 py-12 sm:py20 pt-30">
      <div className="absolute -top-32 -left-32 w-125 h-125 bg-green-500/10 blur-2xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-emerald-400/10 blur-2xl rounded-full" />

      <div className="relative max-w-5xl px-4 sm:px-6 mx-auto space-y-14">
        <ProfileCard
          user={user}
          editing={editing}
          setEditing={setEditing}
          form={form}
          setForm={setForm}
          saving={saving}
          saveProfile={saveProfile}
          cancelEditing={cancelEditing}
          showMap={showMap}
          setShowMap={setShowMap}
          saveLocation={saveLocation}
          stats={stats}
        />
      </div>
    </div>
  );
}
