import LocationPicker from "../../../shared/ui/LocationPicker";
import PlanBadge from "../../../shared/ui/PlanBadge";
import AvatarUploader from "../../../shared/ui/AvatarUploader";
import api from "../../../services/api.js";
import { useApp } from "../../../context/useApp.js";
import { useEffect, useState } from "react";

export default function Profile() {
  const { user, loadingUser, refreshUser } = useApp();

  const [saving, setSaving] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const saveProfile = async () => {
    try {
      setSaving(true);

      await api.put("/user/me", form);

      await refreshUser();
      setEditing(false);
    } catch (err) {
      console.log(err);
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

      await api.put("/user/me", {
        address: location.address,
        location: {
          lat: location.lat,
          lng: location.lng,
        },
      });

      await refreshUser();
      setShowMap(false);
    } catch (err) {
      console.log(err);
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
    <div className="relative min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black text-white px-6 py-24">
      <div className="absolute -top-32 -left-32 w-125 h-125 bg-green-500/10 blur-2xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-emerald-400/10 blur-2xl rounded-full" />

      <div className="relative max-w-5xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 -rotate-2 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10" />

          <div className="relative rounded-3xl p-10 bg-slate-950/70 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <AvatarUploader />

                <div>
                  {editing ? (
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="
                        text-3xl font-bold bg-transparent
                        border-b border-white/20
                        focus:border-green-400 outline-none
                      "
                    />
                  ) : (
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                  )}

                  <p className="text-slate-400">{user.email}</p>

                  <div className="mt-2">
                    <PlanBadge
                      plan={user.currentPlan}
                      expiresAt={user.planExpiresAt}
                    />
                  </div>
                </div>
              </div>

              {editing ? (
                <div className="flex gap-3">
                  <button
                    onClick={cancelEditing}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveProfile}
                    disabled={saving}
                    className="
                      px-5 py-2 rounded-xl
                      bg-green-500 text-black font-semibold
                      hover:bg-green-400 transition
                      disabled:opacity-60
                    "
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="
                    px-4 py-2 rounded-xl
                    bg-white/10 hover:bg-white/20
                    transition text-sm
                  "
                >
                  Edit
                </button>
              )}
            </div>

            <div className="my-8 h-px bg-white/10" />

            <div className="grid gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                <p className="text-slate-400 text-sm">Address</p>

                {editing ? (
                  <input
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className="
                      mt-2 w-full bg-transparent
                      border-b border-white/20
                      focus:border-green-400 outline-none
                      text-lg
                    "
                  />
                ) : (
                  <p className="mt-2 text-lg font-medium">
                    {user?.address || "Not added"}
                  </p>
                )}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                <p className="text-slate-400 text-sm mb-4">Update Location</p>

                {!showMap ? (
                  <button
                    onClick={() => setShowMap(true)}
                    className="
                      px-5 py-2 rounded-xl
                      bg-green-500 text-black font-semibold
                      hover:bg-green-400 transition
                    "
                  >
                    Update Location
                  </button>
                ) : (
                  <LocationPicker onSelect={saveLocation} />
                )}

                {saving && showMap && (
                  <p className="text-green-400 text-sm mt-2">
                    Saving location...
                  </p>
                )}
              </div>
            </div>

            {user.currentPlan === "free" && (
              <div className="relative mt-10">
                <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-green-500/20 to-emerald-400/20 blur-xl" />

                <div
                  className="
                    relative rounded-2xl p-6
                    border border-green-400/30
                    bg-slate-900/80 backdrop-blur-xl
                    flex items-center justify-between
                  "
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      Unlock Premium Features
                    </h3>

                    <p className="text-slate-400 text-sm">
                      Upgrade to Silver or Gold to post unlimited reviews and
                      access advanced features.
                    </p>
                  </div>

                  <button
                    className="
                      px-5 py-2 rounded-xl
                      bg-green-500 text-black font-semibold
                      hover:bg-green-400 transition duration-300
                    "
                  >
                    Upgrade
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
