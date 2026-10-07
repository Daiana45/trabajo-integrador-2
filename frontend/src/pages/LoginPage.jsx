import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { form, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("isLogged", true);
        navigate("/home");
        return;
      }

      if (response.status === 400) {
        setError(data.errors.map((err) => err.msg).join(", "));
        return;
      }

      if (response.status === 401) {
        setError("Credenciales incorrectas");
        return;
      }

      if (response.status === 403) {
        setError("No tenés permisos para realizar esta acción");
        return;
      }

      setError("Error interno del servidor, intentá más tarde");
    } catch (error) {
      console.log("Error al iniciar sesión", error);
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto mt-10 max-w-sm p-4">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>

      {location.state?.message && (
        <p className="mb-2 font-bold text-green-700">
          {location.state.message}
        </p>
      )}

      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="email"
          className="rounded border p-1"
          placeholder="email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          className="rounded border p-1"
          placeholder="password"
          name="password"
          value={form.password}
          onChange={handleInputChange}
        />

        {error && <p className="font-bold text-red-700">{error}</p>}

        <button
          className="rounded-2xl bg-blue-400 p-1"
          type="submit"
          disabled={loading}
        >
          {loading ? "cargando..." : "Login"}
        </button>
      </form>

      <p className="mt-4">
        ¿No tenés cuenta?{" "}
        <Link to="/register" className="font-bold text-blue-600">
          Registrate
        </Link>
      </p>
    </main>
  );
};