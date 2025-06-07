// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("access_token");
  console.log("Token:", token);

  if (!token) return <Navigate to="/" replace />;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded payload:", payload);
    console.log("Roles from payload:", payload.role);

    const roles = payload.role || [];
    console.log("Parsed roles:", roles);

    const authority = roles.length > 0 ? roles[0].authority : "STUDENT";
    console.log("Final authority:", authority);
    console.log("Allowed roles:", allowedRoles);

    if (!allowedRoles.includes(authority)) {
      console.log("Access denied - role not allowed");
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (error) {
    console.error("Error parsing token:", error);
    return <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;
