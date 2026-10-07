import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFetch = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(url, { credentials: "include" });
      const result = await response.json();

      if (response.status === 401) {
        setError("Sesión inexistente, volvé a iniciar sesión");
        return;
      }

      if (response.status === 403) {
        setError("No tenés permisos para ver este contenido");
        return;
      }

      if (response.status === 400) {
        setError(result.errors[0].msg);
        return;
      }

      if (response.status === 500) {
        setError("Error interno del servidor, intentá más tarde");
        return;
      }

      setData(result);
    } catch (error) {
      console.log("Error al consultar la api", error);
      setError("No se pudo conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFetch();
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
};