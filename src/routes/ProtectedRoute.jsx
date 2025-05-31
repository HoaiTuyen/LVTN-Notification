// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("access_token");

  if (!token) return <Navigate to="/" replace />;

  const payload = JSON.parse(atob(token.split(".")[1]));
  const roles = payload.role || [];
  const authority =
    roles.length > 0 ? roles[0].authority.toLowerCase() : "student";

  if (!allowedRoles.includes(authority)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
