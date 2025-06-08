import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  console.log("PublicRoute - Token:", token);

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      const roles = payload.role || [];

      const authority = roles.length > 0 ? roles[0].authority : "STUDENT";

      if (authority === "ADMIN") return <Navigate to="/admin" replace />;
      if (authority === "TEACHER") return <Navigate to="/giang-vien" replace />;
      if (authority === "STUDENT") return <Navigate to="/sinh-vien" replace />;
    } catch (error) {
      console.error("PublicRoute - Error parsing token:", error);
      return children;
    }
  }

  return children;
};

export default PublicRoute;
