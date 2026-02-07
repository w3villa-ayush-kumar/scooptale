import api from "../../../services/api.js";
import { useApp } from "../../../context/useApp.js";
import ProfileCard from "../components/ProfileCard";
import ProfilePdf from "../pages/ProfilePdf";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Profile() {
  const { user, loadingUser, refreshUser } = useApp();

  const [saving, setSaving] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [editing, setEditing] = useState(false);
  const [stats, setStats] = useState(null);

  const pdfRef = useRef(null);

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
      }
    };

    fetchStats();
  }, []);

  const downloadProfile = async () => {
    if (!pdfRef.current) return;

    try {
      toast.loading("Preparing your premium PDF...");

      await document.fonts.ready;

      const images = pdfRef.current.querySelectorAll("img");

      await Promise.all(
        [...images].map((img) => {
          if (img.complete) return Promise.resolve();

          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        }),
      );

      const canvas = await html2canvas(pdfRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

      pdf.save("scooptale-profile.pdf");

      toast.dismiss();
      toast.success("Profile downloaded!");
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("Failed to export PDF");
    }
  };

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

      toast.success("Location updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save location");
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
      <div
        style={{
          position: "fixed",
          left: "-10000px",
          top: 0,
          pointerEvents: "none",
        }}
      >
        <ProfilePdf ref={pdfRef} user={user} stats={stats} />
      </div>

      <div className="relative max-w-5xl mx-auto space-y-14">
        <ProfileCard
          user={user}
          editing={editing}
          setEditing={setEditing}
          form={form}
          setForm={setForm}
          saving={saving}
          saveProfile={saveProfile}
          cancelEditing={() => setEditing(false)}
          showMap={showMap}
          setShowMap={setShowMap}
          saveLocation={saveLocation}
          stats={stats}
          downloadProfile={downloadProfile}
        />
      </div>
    </div>
  );
}
