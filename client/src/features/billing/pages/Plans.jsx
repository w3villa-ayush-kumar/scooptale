import { useState } from "react";
import api from "../../../services/api";
import { useApp } from "../../../context/useApp";
import { toast } from "sonner";

const PLAN_CONFIG = [
  {
    id: "silver",
    name: "Silver",
    price: "₹500",
    features: ["Unlimited Saves", "Post Reviews", "Shelves"],
  },
  {
    id: "gold",
    name: "Gold",
    price: "₹1000",
    features: ["Everything in Silver", "Priority Features"],
  },
];

export default function Plans() {
  const { user } = useApp();
  const [loading, setLoading] = useState(null);

  const checkout = async (plan) => {
    try {
      setLoading(plan);

      const res = await api.post("/payments/checkout", { plan });

      toast.loading("Redirecting to secure checkout...", {
        id: "checkout",
      });

      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);

      toast.error(err?.response?.data?.error || "Failed to start checkout");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Upgrade Your Plan</h1>

        <p className="text-slate-400 mb-12">
          Current plan:
          <span className="text-green-400 ml-2 capitalize">
            {user?.currentPlan}
          </span>
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {PLAN_CONFIG.map((plan) => {
            const isCurrent = user?.currentPlan === plan.id;

            return (
              <div
                key={plan.id}
                className="
                  rounded-3xl
                  bg-white/5
                  border border-white/10
                  p-8
                  hover:border-green-400/40
                  transition
                "
              >
                <h2 className="text-2xl font-semibold">{plan.name}</h2>

                <p className="text-3xl text-green-400 mt-2">{plan.price}</p>

                <ul className="mt-6 space-y-2 text-slate-300">
                  {plan.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>

                <button
                  onClick={() => checkout(plan.id)}
                  disabled={loading === plan.id || isCurrent}
                  className="
                    mt-8 w-full py-3 rounded-xl
                    bg-green-500 text-black font-semibold
                    hover:bg-green-400
                    disabled:opacity-40
                  "
                >
                  {loading === plan.id
                    ? "Redirecting..."
                    : isCurrent
                      ? "Current Plan"
                      : "Upgrade"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
