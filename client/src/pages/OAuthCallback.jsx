import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Backend already returned JSON
        const res = await fetch(window.location.href);
        const data = await res.json();

        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch {
        navigate("/login");
      }
    };

    fetchToken();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-300">
      Signing you in...
    </div>
  );
}
