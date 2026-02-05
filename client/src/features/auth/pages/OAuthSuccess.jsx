import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

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

    login(token);

    setTimeout(() => {
      navigate("/profile", { replace: true });
    }, 100);
  }, [token, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-300">
      Signing you in...
    </div>
  );
}
