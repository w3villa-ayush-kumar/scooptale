import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

export default function OAuthSuccess() {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      login(token); // 🔑 SAME FLOW
      navigate("/profile");
    } else {
      navigate("/login");
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-300">
      Signing you in...
    </div>
  );
}
