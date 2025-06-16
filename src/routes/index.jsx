import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/auth/Login";
import Admin from "../components/pages/Admin";
// import NotFound from "../pages/NotFound";
import Lecturer from "../components/pages/Lecturer";
import Student from "../components/pages/Student";
import EmployeeDashboard from "../components/pages/Employee";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ClassRoom from "../components/Admin/ClassRoom/ClassRoom";
import ListStudentOfClass from "../components/Admin/ClassRoom/ListStudentByClass/ListStudentOfClass";
import Account from "../components/Admin/Account/Account";
import Department from "../components/Admin/Department/Department";
import StudentAdmin from "../components/Admin/Student/Student";
import Group from "../components/Admin/Group/Group";
import HomeAdmin from "../components/Admin/Home/Home";
import LecturerAdmin from "../components/Admin/Lecturer/Lecturer";
import Subject from "../components/Admin/Subject/Subject";
import Semester from "../components/Admin/Semester/Semester";
import NotificationType from "../components/Admin/NotificationType/NotificationType";

import AdminProfilePage from "../components/Admin/Account/AccountSetting";
//student
import NotificationsPage from "../components/Student/NotificationPage";
import StudentProfilePage from "../components/Student/ProfileStudent";
//Lecturer
import TeacherProfile from "../components/Lecturer/settingLecturer";
import LecturerCreateNotification from "../components/Lecturer/Notification/creatNotification";
import SentNotifications from "../components/Lecturer/Notification/sentNotification";
//Employee
import EmployeeCreateNotification from "../components/Employee/Notification/createNotification";
import EmployeeSentNotifications from "../components/Employee/Notification/sentNotification";
import EmployeeNotificationDetail from "../components/Employee/Notification/detailNotification";
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
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<HomeAdmin />} />
          <Route path="account" element={<Account />} />
          <Route path="department" element={<Department />} />
          <Route path="subject" element={<Subject />} />
          <Route path="semester" element={<Semester />} />
          <Route path="group" element={<Group />} />
          <Route path="notification-type" element={<NotificationType />} />
          <Route path="student-admin" element={<StudentAdmin />} />
          <Route path="lecturer-admin" element={<LecturerAdmin />} />
          <Route path="class">
            <Route index element={<ClassRoom />} />
            <Route path=":classId/students" element={<ListStudentOfClass />} />
          </Route>
          <Route path="setting" element={<AdminProfilePage />} />
        </Route>
        <Route
          path="/giang-vien"
          element={
            <ProtectedRoute allowedRoles={["TEACHER"]}>
              <Lecturer />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<TeacherProfile />} />
          <Route path="notification" element={<LecturerCreateNotification />} />
          <Route path="sentNotification" element={<SentNotifications />} />
        </Route>
        <Route
          path="/nhan-vien"
          element={
            <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="notification" element={<EmployeeCreateNotification />} />
          <Route
            path="sentNotification"
            element={<EmployeeSentNotifications />}
          />
          <Route
            path="sentNotification/:notificationId"
            element={<EmployeeNotificationDetail />}
          />
        </Route>
        <Route
          path="/sinh-vien"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <Student />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<StudentProfilePage />} />
          <Route path="notification" element={<NotificationsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;
