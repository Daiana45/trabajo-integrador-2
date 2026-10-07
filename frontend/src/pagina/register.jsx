import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const { form, handleInputChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    biography: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setErrors([]);

      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (response.status === 201) {
        handleReset();
        navigate("/login", {
          state: { message: "Registro exitoso, ya podés iniciar sesión" },
        });
        return;
      }

      if (response.status === 400) {
        setErrors(data.errors);
        return;
      }

      if (response.status === 403) {
        setErrors([
          { path: "permisos", msg: "No tenés permisos para esta acción" },
        ]);
        return;
      }

      setErrors([
        { path: "servidor", msg: "Error interno del servidor, intentá más tarde" },
      ]);
    } catch (error) {
      console.log("Error al registrarse", error);
      setErrors([
        { path: "conexion", msg: "No se pudo conectar con el servidor" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto mt-10 max-w-sm p-4">
      <h1 className="mb-4 text-2xl font-bold">Registro</h1>

      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="rounded border p-1"
          placeholder="username"
          name="username"
          value={form.username}
          onChange={handleInputChange}
        />
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
        <input
          type="text"
          className="rounded border p-1"
          placeholder="nombre"
          name="firstName"
          value={form.firstName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          className="rounded border p-1"
          placeholder="apellido"
          name="lastName"
          value={form.lastName}
          onChange={handleInputChange}
        />
        <textarea
          className="rounded border p-1"
          placeholder="biografía (opcional)"
          name="biography"
          value={form.biography}
          onChange={handleInputChange}
        />

        {errors.length > 0 && (
          <ul className="font-bold text-red-700">
            {errors.map((error) => (
              <li key={`${error.path}-${error.msg}`}>{error.msg}</li>
            ))}
          </ul>
        )}

        <button
          className="rounded-2xl bg-blue-400 p-1"
          type="submit"
          disabled={loading}
        >
          {loading ? "cargando..." : "Registrarme"}
        </button>
      </form>

      <p className="mt-4">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="font-bold text-blue-600">
          Iniciá sesión
        </Link>
      </p>
    </main>
  );
};