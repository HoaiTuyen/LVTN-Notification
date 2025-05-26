import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login";
import Admin from "../components/pages/Admin";
// import NotFound from "../pages/NotFound";
import Lecturer from "../components/pages/Lecturer";
import Student from "../components/pages/Student";
import ProtectedRoute from "./ProtectedRoute";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/giang-vien"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Lecturer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sinh-vien"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Student />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;
