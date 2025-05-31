import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const roles = payload.role || [];
    const authority =
      roles.length > 0 ? roles[0].authority.toLowerCase() : "student";

    if (authority === "admin") return <Navigate to="/admin" replace />;
    if (authority === "lecturer") return <Navigate to="/giang-vien" replace />;
    if (authority === "student") return <Navigate to="/sinh-vien" replace />;
  }

  return children;
};

export default PublicRoute;
