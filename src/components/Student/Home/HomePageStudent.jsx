import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Users,
  Bell,
  Calendar,
  Award,
  Clock,
  Trophy,
  ChartBar,
  MessageSquare,
  Folder,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { handleListNotification } from "../../../controller/NotificationController";
import { handleListGroupByStudent } from "../../../controller/AccountController";
import useWebSocket from "../../../config/Websorket";
import { Spin } from "antd";
import dayjs from "dayjs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import {
  handleUnreadCountNotificationUser,
  handleGetDetailUser,
} from "../../../controller/AccountController";
import { handleTotalCourseSchedule } from "../../../controller/StudentController";
import { handleListSemester } from "../../../controller/SemesterController";
const HomePageStudent = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const data = jwtDecode(token);
  const userId = data.userId;
  const [stats, setStats] = useState({
    totalSubjects: 0,
    totalCourses: 0,
    totalGroups: 0,
    notifications: 0,
    unreadNotifications: 0,
  });

  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [groups, setGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [studentId, setStudentId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  useEffect(() => {
    const fetchInfo = async () => {
      const res = await handleGetDetailUser(userId);
      console.log(res.data.studentId);
      if (res?.data) {
        setStudentId(res.data.studentId);
      }
    };
    const fetchSemester = async () => {
      const res = await handleListSemester();
      console.log(res.data.semesters[0].id);
      if (res?.data) {
        setSemesterId(res.data.semesters[0].id);
      }
    };
    const fetchNotifications = async () => {
      const pageSize = 10;
      let allNotification = [];
      let page = 0;
      let totalPages = 1;
      do {
        const res = await handleListNotification("desc", page, pageSize);

        if (res?.data) {
          allNotification = [...allNotification, ...res.data.notifications];
          totalPages = res.data.totalPages;
          page++;
        } else {
          break; // stop if bad data
        }
      } while (page < totalPages);
      if (allNotification) {
        setStats((prev) => ({
          ...prev,
          notifications: allNotification.length,
        }));
        setNotifications(allNotification);
      }
      setLoadingNotifications(false);
    };
    const fetchUnreadNotification = async () => {
      const res = await handleUnreadCountNotificationUser(userId);
      if (res?.data) {
        setStats((prev) => ({
          ...prev,
          unreadNotifications: res.data,
        }));
      }
    };
    const fetchTotalCourseSchedule = async () => {
      const res = await handleTotalCourseSchedule(studentId, semesterId);
      console.log(res.data);
      if (res?.data) {
        setStats((prev) => ({
          ...prev,
          totalCourses: res.data,
        }));
      }
    };
    const init = async () => {
      await fetchInfo();
      await fetchSemester();
    };
    init();
    fetchNotifications();
    fetchUnreadNotification();
    fetchTotalCourseSchedule();
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      const pageSize = 10;
      let allGroup = [];
      let page = 0;
      let totalPages = 1;
      do {
        const res = await handleListGroupByStudent(userId, page, pageSize);

        if (res?.data) {
          allGroup = [...allGroup, ...res.data];
          totalPages = res.data.totalPages;
          page++;
        } else {
          break;
        }
      } while (page < totalPages);
      if (allGroup) {
        setStats((prev) => ({
          ...prev,
          totalGroups: allGroup.length,
        }));
        setGroups(allGroup);
      }
      setLoadingGroups(false);
    };
    fetchGroups();
  }, [userId]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 p-0">
      <div className="space-y-8 p-8 overflow-y-auto max-h-[700px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Nhóm học tập
              </CardTitle>
              <Users className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">
                {stats.totalGroups}
              </div>
              <p className="text-sm text-gray-500">Nhóm</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Lớp học phần
              </CardTitle>
              <BookOpen className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">
                {stats.totalCourses}
              </div>
              <p className="text-sm text-gray-500">Lớp học phần </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Thông báo đã đọc
              </CardTitle>
              <Bell className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-3xl font-bold text-green-500">
                {stats.notifications}
              </div>
              <p className="text-sm text-gray-500">Đã đọc</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Thông báo</CardTitle>
              <Bell className="h-6 w-6 text-red-500" />
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-3xl font-bold text-red-500">
                {stats.unreadNotifications}
              </div>
              <p className="text-sm text-gray-500">Chưa đọc</p>
            </CardContent>
          </Card>

          {/* <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GPA</CardTitle>
              <Award className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-3xl font-bold text-green-500">
                {studentStats.gpa}
              </div>
              <p className="text-sm text-gray-500">Điểm trung bình</p>
            </CardContent>
          </Card> */}
        </motion.div>

        {/* Recent Notifications */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
        >
          <Card className="col-span-3 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Thông báo mới</CardTitle>
                <Badge variant="outline">{stats.notifications} mới</Badge>
              </div>
              <CardDescription>
                Các thông báo mới nhất từ giảng viên và nhóm học tập
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loadingNotifications ? (
                  <div className="flex items-center justify-center py-4">
                    <Spin size="large" />
                  </div>
                ) : notifications.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Không có thông báo
                  </p>
                ) : (
                  notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            notification.type === "important"
                              ? "bg-red-500"
                              : notification.type === "assignment"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {dayjs(notification.createdAt).format(
                            "DD/MM/YYYY HH:mm"
                          )}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {notifications.length > 0 && (
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link to="/sinh-vien/notification">Xem tất cả thông báo</Link>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Recent Groups */}
          <Card className="col-span-4 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Nhóm học tập</CardTitle>
              </div>
              <CardDescription>
                Các nhóm học tập bạn đang tham gia
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full">
              <div className="flex flex-col h-full">
                <div className="flex-1 space-y-4">
                  {loadingGroups ? (
                    <div className="flex items-center justify-center py-4">
                      <Spin size="large" />
                    </div>
                  ) : groups.length === 0 ? (
                    <p className="text-center text-gray-500">
                      Không có nhóm học tập
                    </p>
                  ) : (
                    groups.slice(0, 5).map((group) => (
                      <div
                        key={group.id}
                        className="flex items-center space-x-3"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-600 text-white">
                            {group.teacherName
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {group.groupName}
                          </p>
                          <p className="text-xs text-gray-500">
                            Giảng viên: {group.teacherName}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {groups.length > 0 && (
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link to="/sinh-vien/group-study">Xem tất cả nhóm</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
export default HomePageStudent;
