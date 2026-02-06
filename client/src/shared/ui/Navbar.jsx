import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/scooptale.png";
import { useEffect, useState } from "react";
import { useApp } from "../../context/useApp";

export default function Navbar({ variant = "default" }) {
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
    <nav
      className={`
        flex items-center gap-1 sm:gap-2 shrink-0 whitespace-nowrap
       ${variant === "default" ? " bg-black/40 backdrop-blur-lg border border-white/10" : ""}
        rounded-full
        px-2 sm:px-4 py-1 sm:py-2
        shadow-2xl
        transition-all duration-300
        ${scrolled ? "sm:scale-95" : "scale-100"}
      `}
    >
      {variant === "default" &&
        !loadingUser &&
        (!user ? (
          <Link
            to="/login"
            className="
              px-3 sm:px-5
py-1.5 sm:py-2
text-xs sm:text-sm
              bg-blue-500 hover:bg-blue-600
              rounded-full transition
            "
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="
              px-3 sm:px-5
py-1.5 sm:py-2
text-xs sm:text-sm
              bg-red-500 hover:bg-red-600
              rounded-full transition
            "
          >
            Logout
          </button>
        ))}

      <Link to="/" className="flex items-center justify-center ">
        <div
          className={`
            rounded-full
            bg-slate-950
            border border-white/20
            hover:border-white
            flex items-center justify-center
            transition-all duration-300
            ${
              scrolled
                ? "h-12 w-12 sm:h-16 sm:w-16"
                : "h-14 w-14 sm:h-20 sm:w-20"
            }
            ${variant === "auth" ? "h-16 w-16 sm:h-22 sm:w-22" : ""}

          `}
        >
          <img
            src={logo}
            alt="Scooptale"
            className={`
              object-cover rounded-full
              transition-all duration-300
              ${scrolled ? "h-12 sm:h-16" : "h-14 sm:h-20"}
              ${variant === "auth" ? "h-26" : ""}
            `}
          />
        </div>
      </Link>

      {variant === "default" &&
        !loadingUser &&
        (!user ? (
          <Link
            to="/signup"
            className="
              px-3 sm:px-5
py-1.5 sm:py-2
text-xs sm:text-sm
              bg-blue-500 hover:bg-blue-600
              rounded-full transition
            "
          >
            Sign up
          </Link>
        ) : (
          <Link
            to="/profile"
            className="
              px-3 sm:px-5
py-1.5 sm:py-2
text-xs sm:text-sm
              bg-green-500 hover:bg-green-600
              rounded-full transition
            "
          >
            {firstName}
          </Link>
        ))}
    </nav>
  );
}
