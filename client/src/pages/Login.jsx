import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuthButtons from "../components/OAuthButtons";
import api from "../services/api";
import { AppContext } from "../context/AppContext";
import AuthHomeLink from "../components/AuthHomeLink";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/auth/login", form);

      login(data.token);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden
                 bg-linear-to-br from-slate-950 via-slate-900 to-black
                 flex items-center justify-center text-white px-6"
    >
      <AuthHomeLink />
      <div className="absolute -top-40 -left-40 w-125 h-125 bg-green-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-emerald-400/15 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 -rotate-2 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10" />

        <div className="relative rotate-1 rounded-3xl p-8 bg-slate-950/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-slate-400">
            Sign in to continue your movie journey
          </p>

          <div className="mt-6">
            <OAuthButtons />
          </div>

          <div className="my-6 flex items-center gap-3 text-slate-500 text-sm">
            <div className="flex-1 h-px bg-white/10" />
            OR
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-400 text-sm">{error}</p>}

            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-green-400 transition"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-green-400 transition"
            />

            <button
              disabled={loading}
              className="w-full py-3 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-400 transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-400 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
