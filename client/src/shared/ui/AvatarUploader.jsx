import { useRef, useState } from "react";
import api from "../../services/api.js";
import { useApp } from "../../context/useApp.js";

export default function AvatarUploader() {
  const fileRef = useRef(null);
  const { user, setUser } = useApp();

  const [uploading, setUploading] = useState(false);

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);

      const { data } = await api.post("/user/me/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser((prev) => ({
        ...prev,
        profileImageUrl: data.profileImageUrl,
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`relative group w-24 h-24 ${
        uploading ? "pointer-events-none opacity-90" : "cursor-pointer"
      }`}
      onClick={!uploading ? handleClick : undefined}
    >
      <div className="relative h-24 w-24 rounded-full overflow-hidden border border-white/20 group-hover:border-green-400 transition">
        {/* Avatar */}
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="avatar"
            className={`
            h-full w-full object-cover
            transition duration-300
            ${uploading ? "scale-105 blur-sm" : "group-hover:scale-110"}
          `}
          />
        ) : (
          <div className="h-full w-full bg-green-500 flex items-center justify-center text-3xl font-bold text-black">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
        )}

        {/* ✅ Hover Overlay (ONLY when NOT uploading) */}
        {!uploading && (
          <div
            className="
            absolute inset-0 rounded-full
            bg-black/50 opacity-0
            group-hover:opacity-100
            flex items-center justify-center
            text-xs font-semibold
            transition
          "
          >
            Change
          </div>
        )}

        {/* ✅ Uploading Overlay */}
        {uploading && (
          <div className="absolute inset-0 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="h-7 w-7 border-2 border-white/90 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 rounded-full border-2 border-green-400/40 animate-pulse" />
          </div>
        )}
      </div>

      {/* Hidden input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFile}
      />
    </div>
  );
}
