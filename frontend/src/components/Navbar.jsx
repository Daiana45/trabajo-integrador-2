import { Link } from "react-router";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-slate-800 p-4 text-white">
      <Link to="/home" className="text-xl font-bold">
        Mi Blog
      </Link>

      <button className="rounded-2xl bg-red-500 px-4 py-1" type="button">
        Logout
      </button>
    </nav>
  );
};