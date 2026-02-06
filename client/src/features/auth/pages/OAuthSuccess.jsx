import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { toast } from "sonner";

export default function OAuthSuccess() {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const token = params.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const initAuth = async () => {
      await login(token);

      toast.success("Logged in successfully");

      navigate("/profile", { replace: true });
    };

    initAuth();
  }, [token, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-300">
      Signing you in...
    </div>
  );
}
