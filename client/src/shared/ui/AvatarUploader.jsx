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
    <div className="relative group cursor-pointer" onClick={handleClick}>
      <div
        className="
        h-24 w-24 rounded-full
        overflow-hidden
        border border-white/20
        group-hover:border-green-400
        transition
        "
      >
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="avatar"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-green-500 flex items-center justify-center text-3xl font-bold text-black">
            {user?.name?.charAt(0)}
          </div>
        )}
      </div>

      <div
        className="
        absolute inset-0 rounded-full
        bg-black/50 opacity-0
        group-hover:opacity-100
        flex items-center justify-center
        text-xs
        transition
        "
      >
        {uploading ? "Uploading..." : "Change"}
      </div>

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
