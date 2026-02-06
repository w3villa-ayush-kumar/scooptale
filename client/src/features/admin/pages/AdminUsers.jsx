import { useEffect, useState } from "react";
import api from "../../../services/api.js";
import { toast } from "sonner";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);

  const [search, setSearch] = useState("");

  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 0;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await api.get("/admin/users", {
          params: { page, search },
        });

        setUsers(res.data.data.data);
        setMeta(res.data.data.meta);
      } catch (err) {
        console.error("Failed to load users", err);
        setUsers([]);
        toast.error(err?.response?.data?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, search]);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin — Users</h1>

        <input
          placeholder="Search by name or email..."
          className="w-full mb-6 p-3 rounded-lg bg-slate-900 border border-white/10"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <div className="bg-slate-900 rounded-xl border border-white/10 overflow-hidden">
          {loading ? (
            <div className="p-6">Loading users...</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-4">Name</th>
                  <th>Email</th>
                  <th>Plan</th>
                  <th>Active</th>
                  <th>Joined</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t border-white/10">
                    <td className="p-4">{u.name}</td>
                    <td>{u.email}</td>

                    <td className="capitalize">{u.currentPlan || "free"}</td>

                    <td>
                      {u.isPlanActive ? (
                        <span className="text-green-400">Active</span>
                      ) : (
                        <span className="text-red-400">Inactive</span>
                      )}
                    </td>

                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {meta && (
          <div className="flex items-center justify-between mt-8">
            <div className="text-slate-400">
              Page <span className="text-white">{meta.page}</span> of{" "}
              <span className="text-white">{totalPages}</span>
            </div>

            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-40"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(0, page - 3), page + 2)
                .map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1 rounded ${
                      p === page
                        ? "bg-green-500 text-black font-semibold"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {p}
                  </button>
                ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
