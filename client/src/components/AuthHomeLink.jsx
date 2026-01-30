import { Link } from "react-router-dom";
import logo from "../assets/scooptale.png";

export default function AuthHomeLink() {
  return (
    <Link to="/" className="fixed top-1 left-1/2 -translate-x-1/2 z-50 ">
      <img src={logo} alt="Scooptale" className="h-30 w-auto" />
    </Link>
  );
}
