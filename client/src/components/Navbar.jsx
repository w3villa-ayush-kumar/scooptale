import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/scooptale.png";
import { useEffect, useState } from "react";
import { useApp } from "../context/useApp";

export default function Navbar() {
  const { user, logout, loadingUser } = useApp();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const firstName = user?.name?.trim().split(/\s+/)[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-3 z-50 flex justify-center">
      <div className="relative flex items-center">
        {!loadingUser && !user ? (
          <Link
            to="/login"
            className={`${scrolled ? "px-5 py-1 opacity-70" : "px-7 py-3"}
              bg-blue-500 hover:bg-blue-600 rounded-l-full transition-all duration-400 ease-out`}
          >
            Login
          </Link>
        ) : user ? (
          <button
            onClick={handleLogout}
            className={`${scrolled ? "px-5 py-1 opacity-70" : "px-7 py-3"}
              bg-red-500 hover:bg-red-600 rounded-l-full transition-all duration-400 ease-out`}
          >
            Logout
          </button>
        ) : null}

        <Link
          to="/"
          className="relative z-10 -mx-3 flex items-center justify-center"
        >
          <div
            className={` rounded-full
                       bg-slate-950
                       border border-white/20
                       shadow-2xl
                       flex items-center justify-center
                       hover:border-white ${scrolled ? "h-14 w-14 " : "h-25 w-25"} transition-all duration-400 ease-out`}
          >
            <img
              src={logo}
              alt="Scooptale"
              className={`w-auto rounded-full object-cover ${scrolled ? "h-17" : "h-30"} transition-all duration-400 ease-out`}
            />
          </div>
        </Link>

        {!loadingUser && !user ? (
          <Link
            to="/signup"
            className={`${scrolled ? "px-5 py-1 opacity-70" : "px-7 py-3"}
              bg-blue-500 hover:bg-blue-600 rounded-r-full transition-all duration-400 ease-out`}
          >
            Sign up
          </Link>
        ) : user ? (
          <Link
            to="/profile"
            className={`${scrolled ? "px-4 py-1" : "px-6 py-3"}
              bg-green-500 hover:bg-green-600 rounded-r-full transition-all duration-400 ease-out`}
          >
            {firstName}
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
