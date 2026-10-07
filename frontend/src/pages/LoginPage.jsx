import { Link } from "react-router";
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {
  const { form, handleInputChange, handleReset } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    handleReset();
  };

  return (
    <main className="mx-auto mt-10 max-w-sm p-4">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>

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

        <button className="rounded-2xl bg-blue-400 p-1" type="submit">
          Login
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