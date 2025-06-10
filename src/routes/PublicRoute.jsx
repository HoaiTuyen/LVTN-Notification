import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  console.log("PublicRoute - Token:", token);

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("payload:", payload);

      const roles = payload.role || [];
      console.log("roles:", roles);

      const authority = roles.length > 0 ? roles[0].authority : "STUDENT";
      console.log("authority:", authority);

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
