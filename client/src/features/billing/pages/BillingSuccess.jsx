import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../../context/useApp";
import api from "../../../services/api";
import { toast } from "sonner";

export default function BillingSuccess() {
  const navigate = useNavigate();
  const { setUser } = useApp();

  useEffect(() => {
    let interval;

    const checkPlan = async () => {
      try {
        const res = await api.get("/user/me");
        const updatedUser = res.data.data;

        setUser(updatedUser);

        if (updatedUser.currentPlan !== "free") {
          clearInterval(interval);

          toast.success("Your plan is now active!", {
            id: "plan-success",
          });

          setTimeout(() => {
            navigate("/profile", { replace: true });
          }, 800);
        }
      } catch (err) {
        console.error(err);

        toast.error("Failed to confirm your plan. Refresh the page.", {
          id: "plan-error",
        });
      }
    };

    interval = setInterval(checkPlan, 1500);

    return () => clearInterval(interval);
  }, [navigate, setUser]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="relative mx-auto mb-8 h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-green-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-green-400 border-t-transparent animate-spin" />
        </div>

        <h1 className="text-3xl font-semibold tracking-tight">
          Activating your plan
        </h1>

        <p className="text-slate-400 mt-3">
          Hang tight — this usually takes just a few seconds.
        </p>
      </div>
    </div>
  );
}
