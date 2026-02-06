import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function OAuthFailure() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Social login failed. Please try again.", {
      id: "oauth-error",
    });

    const t = setTimeout(() => {
      navigate("/login");
    }, 4000);

    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1120] text-white">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-10 w-105 text-center shadow-xl">
        <XCircle className="mx-auto text-red-500 mb-4" size={48} />

        <h1 className="text-2xl font-semibold mb-2">Social Login Failed</h1>

        <p className="text-slate-400 mb-6">
          We couldn't sign you in using that provider.
          <br />
          Please try again or use another method.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="w-full bg-green-500 hover:bg-green-600 transition rounded-lg py-2 font-medium"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
