import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser, isLoggedIn } from "../services/auth";

function AdminRoute({ children }) {
  const location = useLocation();

  // User must be logged in
  if (!isLoggedIn()) {
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location }}
      />
    );
  }

  // Get logged in user
  const user = getCurrentUser();

  // User must be an admin
  if (!user || user.role !== "admin") {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}

export default AdminRoute;