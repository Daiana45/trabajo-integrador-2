import { useFetch } from "../hooks/useFetch";
import { Navbar } from "../components/Navbar";

export const HomePage = () => {
  const { data, isLoading, error } = useFetch(
    "http://localhost:3000/api/articles",
  );

  return (
    <>
    <Navbar/>
    <main className="mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-3xl font-bold">Artículos publicados</h1>

      {isLoading && <p>Cargando artículos...</p>}

      {error && <p className="font-bold text-red-700">{error}</p>}

      {!isLoading && !error && data.length === 0 && (
        <p>No hay artículos publicados</p>
      )}

      <ul className="grid gap-4 sm:grid-cols-2">
        {data &&
          data.map((article) => (
            <li key={article.id} className="rounded-2xl border p-4 shadow">
              <h2 className="text-xl font-bold">{article.title}</h2>
              <p className="my-2">{article.excerpt}</p>
              <p className="text-sm text-gray-500">
                Autor: {article.author.username}
              </p>
            </li>
          ))}
      </ul>
    </main>
    </>
  );
};