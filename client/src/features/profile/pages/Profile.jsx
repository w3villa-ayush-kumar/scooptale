import api from "../../../services/api.js";
import { useApp } from "../../../context/useApp.js";

import ProfileCard from "../components/ProfileCard";
import { useState } from "react";

export default function Profile() {
  const { user, loadingUser, refreshUser } = useApp();

  const [saving, setSaving] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState(() => ({
    name: user?.name || "",
    address: user?.address || "",
  }));

  const saveProfile = async () => {
    try {
      setSaving(true);
      await api.put("/user/me", form);
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

      await api.put("/user/me", {
        address: location.address,
        location: {
          lat: location.lat,
          lng: location.lng,
        },
      });

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
    <div className="relative min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black text-white px-6 py-24">
      {/* glow */}
      <div className="absolute -top-32 -left-32 w-125 h-125 bg-green-500/10 blur-2xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-emerald-400/10 blur-2xl rounded-full" />

      <div className="relative max-w-5xl mx-auto">
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
        />
      </div>
    </div>
  );
}
