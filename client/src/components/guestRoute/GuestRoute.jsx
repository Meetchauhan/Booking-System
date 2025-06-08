import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // or use auth context/store

  return token ? <Navigate to="/dashboard" replace /> : children;
};

export default GuestRoute;
