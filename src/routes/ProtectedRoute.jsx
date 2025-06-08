// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("access_token");

  if (!token) return <Navigate to="/" replace />;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    const roles = payload.role || [];

    const authority = roles.length > 0 ? roles[0].authority : "STUDENT";
    if (!allowedRoles.includes(authority)) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (error) {
    console.error("Error parsing token:", error);
    return <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;
