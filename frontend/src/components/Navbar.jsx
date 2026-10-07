import { useState } from "react";
import { Link, useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.status === 200) {
        localStorage.removeItem("isLogged");
        navigate("/login");
        return;
      }

      setError("No se pudo cerrar la sesión");
    } catch (error) {
      console.log("Error al cerrar sesión", error);
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="flex items-center justify-between bg-slate-800 p-4 text-white">
      <Link to="/home" className="text-xl font-bold">
        Mi Blog
      </Link>

      <div className="flex items-center gap-2">
        {error && <span className="text-sm text-red-300">{error}</span>}
        <button
          className="rounded-2xl bg-red-500 px-4 py-1"
          type="button"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "saliendo..." : "Logout"}
        </button>
      </div>
    </nav>
  );
};