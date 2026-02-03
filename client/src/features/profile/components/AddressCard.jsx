export default function AddressCard({ editing, form, setForm, user }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
      <p className="text-slate-400 text-sm">Address</p>

      {editing ? (
        <input
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="mt-2 w-full bg-transparent border-b border-white/20 focus:border-green-400 outline-none text-lg"
        />
      ) : (
        <p className="mt-2 text-lg font-medium">
          {user?.address || "Not added"}
        </p>
      )}
    </div>
  );
}
