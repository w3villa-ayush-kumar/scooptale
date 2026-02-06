import AvatarUploader from "../../../shared/ui/AvatarUploader";
import PlanBadge from "../../../shared/ui/PlanBadge";
import { Download } from "lucide-react";

export default function ProfileHeader({
  user,
  editing,
  setEditing,
  form,
  setForm,
  saving,
  saveProfile,
  cancelEditing,
  downloadProfile,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
      <div className="flex items-center gap-4 sm:gap-6">
        <AvatarUploader />

        <div>
          {editing ? (
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="text-3xl font-bold bg-transparent border-b border-white/20 focus:border-green-400 outline-none"
            />
          ) : (
            <h1 className="text-3xl font-bold">{user.name}</h1>
          )}

          <p className="text-slate-400">{user.email}</p>

          <div className="mt-2">
            <PlanBadge plan={user.currentPlan} expiresAt={user.planExpiresAt} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {!editing && (
          <button
            onClick={downloadProfile}
            className="
              flex items-center gap-2
              px-4 py-2
              rounded-xl cursor-pointer
              bg-blue-500 hover:bg-blue-400
              text-black font-semibold
              transition
            "
          >
            <Download size={18} />
            Download
          </button>
        )}

        {editing ? (
          <>
            <button
              onClick={cancelEditing}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
            >
              Cancel
            </button>

            <button
              onClick={saveProfile}
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-400 transition disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-sm"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
