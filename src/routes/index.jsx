import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "../components/Auth/Login";
import Admin from "../components/Pages/Admin";
// import NotFound from "../pages/NotFound";
import Lecturer from "../components/Pages/Lecturer";
import Student from "../components/Pages/Student";
import EmployeeDashboard from "../components/Pages/Employee";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ClassRoom from "../components/Admin/ClassRoom/ClassRoom";
import ListStudentOfClass from "../components/Admin/ClassRoom/ListStudentByClass/ListStudentOfClass";
import Account from "../components/Admin/Account/Admin/Account";
import Department from "../components/Admin/Department/Department";
import StudentAdmin from "../components/Admin/Student/Student";
import Group from "../components/Admin/Group/Group";
import HomeAdmin from "../components/Admin/Home/Home";
import LecturerAdmin from "../components/Admin/Lecturer/Lecturer";
import Subject from "../components/Admin/Subject/Subject";
import Semester from "../components/Admin/Semester/Semester";
import NotificationType from "../components/Admin/NotificationType/NotificationType";
import ListClassOfDepartment from "../components/Admin/Department/ListClassByDepartment/ListClassByDepartment";
import AdminProfilePage from "../components/Admin/Account/AccountSetting";
import EmployeeAccount from "../components/Admin/Account/Employee/AccountEmployee";
import LecturerAccount from "../components/Admin/Account/Lecturer/LecturerAccount";
import StudentAccount from "../components/Admin/Account/Student/StudentAccount";
//student
import NotificationsPage from "../components/Student/Notification/NotificationPage";
import StudentProfilePage from "../components/Student/ProfileStudent";
import GroupStudyStudent from "../components/Student/Group/GroupStudy";
import StudentNotificationDetail from "../components/Student/Notification/DetailNotification";
import DetailGroupStudent from "../components/Student/Group/DetailGroup";
//Lecturer
import TeacherProfile from "../components/Lecturer/settingLecturer";
import LecturerCreateNotification from "../components/Lecturer/Notification/CreatNotification";
// import SentNotifications from "../components/Lecturer/Notification/TestsentNotification";
import GroupClassTeacher from "../components/Lecturer/GroupClass/GroupClass";
import DetailGroupLecturer from "../components/Lecturer/GroupClass/DetailGroup";
import LecturerNotificationDetail from "../components/Lecturer/Notification/DetailNotification";
import LecturerSentNotifications from "../components/Lecturer/Notification/SentNotification";
//Employee
import EmployeeCreateNotification from "../components/Employee/Notification/createNotification";
import EmployeeSentNotifications from "../components/Employee/Notification/sentNotification";
import EmployeeNotificationDetail from "../components/Employee/Notification/detailNotification";
import EmployeeProfilePage from "../components/Employee/ProfileEmployee";
import EmployeeStudentAccount from "../components/Employee/Account/Student/EmployeeStudentAccount";
import EmployeeLecturerAccount from "../components/Employee/Account/Lecturer/EmployeeLecturerAccount";
import EmployeeClassName from "../components/Employee/ClassRoom/EmployeeClassRoom";
import EmployeeListStudentOfClass from "../components/Employee/ClassRoom/ListStudentByClass/ListStudentOfClass";
import EmployeeSemester from "../components/Employee/Semester/EmployeeSemester";
import EmployeeSubject from "../components/Employee/Subject/EmployeeSubject";
function AppRoutes() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
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
            <Route path="account-admin" element={<Account />} />
            <Route path="account-employee" element={<EmployeeAccount />} />
            <Route path="account-teacher" element={<LecturerAccount />} />
            <Route path="account-student" element={<StudentAccount />} />
            <Route path="department">
              <Route index element={<Department />} />
              <Route
                path=":departmentId/class"
                element={<ListClassOfDepartment />}
              ></Route>
            </Route>
            <Route path="subject" element={<Subject />} />
            <Route path="semester" element={<Semester />} />
            <Route path="group" element={<Group />} />
            <Route path="notification-type" element={<NotificationType />} />
            <Route path="student-admin" element={<StudentAdmin />} />
            <Route path="lecturer-admin" element={<LecturerAdmin />} />
            <Route path="class">
              <Route index element={<ClassRoom />} />
              <Route
                path=":classId/students"
                element={<ListStudentOfClass />}
              />
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
            <Route
              path="notification"
              element={<LecturerCreateNotification />}
            />
            <Route path="groupClass" element={<GroupClassTeacher />} />
            <Route
              path="groupClass/:groupId"
              element={<DetailGroupLecturer />}
            />
            <Route
              path="sentNotification"
              element={<LecturerSentNotifications />}
            />
            <Route
              path="sentNotification/:notificationId"
              element={<LecturerNotificationDetail />}
            />
          </Route>

          <Route
            path="/nhan-vien"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="profile" element={<EmployeeProfilePage />} />
            <Route
              path="notification"
              element={<EmployeeCreateNotification />}
            />
            <Route
              path="sentNotification"
              element={<EmployeeSentNotifications />}
            />
            <Route
              path="sentNotification/:notificationId"
              element={<EmployeeNotificationDetail />}
            />
            <Route
              path="employee-account-student"
              element={<EmployeeStudentAccount />}
            />
            <Route
              path="employee-account-teacher"
              element={<EmployeeLecturerAccount />}
            />
            <Route path="class">
              <Route index element={<EmployeeClassName />} />
              <Route
                path=":classId/students"
                element={<EmployeeListStudentOfClass />}
              />
            </Route>
            <Route path="semester" element={<EmployeeSemester />} />
            <Route path="subject" element={<EmployeeSubject />} />
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
            <Route
              path="notification/:notificationId"
              element={<StudentNotificationDetail />}
            />
            <Route path="groupStudy" element={<GroupStudyStudent />} />
            <Route
              path="groupStudy/:groupStudyId"
              element={<DetailGroupStudent />}
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
export default AppRoutes;
