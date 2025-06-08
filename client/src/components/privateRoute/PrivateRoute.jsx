import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Or check auth from Redux/store

  return token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
