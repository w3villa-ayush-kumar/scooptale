import { useNavigate } from "react-router-dom";

export default function UpgradeCard() {
  const navigate = useNavigate();

  return (
    <div className="relative mt-10">
      <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-green-500/20 to-emerald-400/20 blur-xl" />

      <div className="relative rounded-2xl p-6 border border-green-400/30 bg-slate-900/80 backdrop-blur-xl flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">Unlock Premium Features</h3>

          <p className="text-slate-400 text-sm">
            Upgrade to Silver or Gold to post unlimited reviews and access
            advanced features.
          </p>
        </div>

        <button
          onClick={() => navigate("/plans")}
          className="px-5 py-2 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-400 transition duration-300"
        >
          Upgrade
        </button>
      </div>
    </div>
  );
}
