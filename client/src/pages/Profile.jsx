import { useApp } from "../context/useApp";

export default function Profile() {
  const { user, loadingUser } = useApp();

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
  console.log(user.location);
  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black text-white px-6 py-24">
      <div className="absolute -top-32 -left-32 w-125 h-125 bg-green-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-emerald-400/10 blur-3xl rounded-full" />

      <div className="relative max-w-5xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 -rotate-1 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10" />

          <div className="relative rotate-1 rounded-3xl p-10 bg-slate-950/70 border border-white/10">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center text-3xl font-bold text-black">
                {user.name?.charAt(0)}
              </div>

              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>

                <p className="text-slate-400">{user.email}</p>

                <span className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded-full">
                  {user.currentPlan?.toUpperCase()} PLAN
                </span>
              </div>
            </div>

            <div className="my-8 h-px bg-white/10" />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                <p className="text-slate-400 text-sm">Address</p>
                <p className="mt-1">{user.address || "Not added"}</p>
              </div>

              <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                <p className="text-slate-400 text-sm">Location</p>
                <p className="mt-1">
                  {user.location?.lat != null && user.location?.lng != null
                    ? `${user.location.lat}, ${user.location.lng}`
                    : "Not added"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
