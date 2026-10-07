import { Navigate, Outlet } from "react-router";
import { Navbar } from "../components/Navbar";

export const PrivateRoutes = () => {
  const isLogged = localStorage.getItem("isLogged");

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};