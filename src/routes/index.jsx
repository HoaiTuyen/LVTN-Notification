import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login";
import Admin from "../components/pages/Admin";
// import NotFound from "../pages/NotFound";
import Lecturer from "../components/pages/Lecturer";
import Student from "../components/pages/Student";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ClassRoom from "../components/Admin/ClassRoom/ClassRoom";
import ListStudentOfClass from "../components/Admin/ClassRoom/ListStudentOfClass";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="class" element={<ClassRoom />} />
        <Route
          path="class/:classId/students"
          element={<ListStudentOfClass />}
        />
        <Route
          path="/giang-vien"
          element={
            <ProtectedRoute allowedRoles={["TEACHER"]}>
              <Lecturer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sinh-vien"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <Student />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;
