import { Link } from "react-router-dom";
import logo from "../assets/scooptale.png";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className="sticky top-3 z-50 flex justify-center">
      <div className="relative flex items-center">
        <Link
          to="/login"
          className={` ${scrolled ? "px-5 py-1 opacity-65" : "px-7 py-3"} transition-all duration-300 ease-out text-sm font-medium
                     bg-green-500
                     hover:bg-green-600
                     rounded-l-full`}
        >
          Login
        </Link>

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
                       hover:border-white ${scrolled ? "h-14 w-14 " : "h-28 w-28"} transition-all duration-300 ease-out`}
          >
            <img
              src={logo}
              alt="Scooptale"
              className={`w-auto rounded-full object-cover ${scrolled ? "h-17" : "h-34"} transition-all duration-300 ease-out`}
            />
          </div>
        </Link>

        <Link
          to="/signup"
          className={`${scrolled ? "px-5 py-1 opacity-65" : "px-7 py-3"} transition-all duration-300 ease-out text-sm font-semibold bg-blue-500
                     hover:bg-blue-600
                      rounded-r-full`}
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
}
