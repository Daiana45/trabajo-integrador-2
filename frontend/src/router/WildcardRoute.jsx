import { Navigate } from "react-router";

export const WildcardRoute = () => {
  const isLogged = localStorage.getItem("isLogged");

  return <Navigate to={isLogged ? "/home" : "/login"} />;
};