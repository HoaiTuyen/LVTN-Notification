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

const HomePageStudent = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const data = jwtDecode(token);
  const userId = data.userId;

  // Dữ liệu thống kê
  const studentStats = {
    totalCourses: 6,
    totalGroups: 3,
    unreadNotifications: 5,
    gpa: 3.7,
    completedCredits: 90,
    totalCredits: 150,
  };

  // Danh sách thông báo
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await handleListNotification("desc", 0, 5);
      if (res?.data) {
        setNotifications(res.data.notifications);
      }
      setLoadingNotifications(false);
    };
    fetchNotifications();
  }, []);

  // Danh sách nhóm học tập
  const [groups, setGroups] = useState([]);

  const [loadingGroups, setLoadingGroups] = useState(true);
  useEffect(() => {
    const fetchGroups = async () => {
      const res = await handleListGroupByStudent(userId, 0, 5);
      console.log(res);

      if (res?.data) {
        setGroups(res.data);
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
                Môn học đang theo
              </CardTitle>
              <BookOpen className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">
                {studentStats.totalCourses}
              </div>
              <p className="text-sm text-gray-500">Môn học</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Nhóm học tập
              </CardTitle>
              <Users className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">
                {studentStats.totalGroups}
              </div>
              <p className="text-sm text-gray-500">Nhóm</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Thông báo mới
              </CardTitle>
              <Bell className="h-6 w-6 text-red-500" />
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-3xl font-bold text-red-500">
                {studentStats.unreadNotifications}
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
                <Badge variant="outline">
                  {studentStats.unreadNotifications} mới
                </Badge>
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
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/sinh-vien/notification">Xem tất cả thông báo</Link>
              </Button>
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
            <CardContent>
              <div className="space-y-4">
                {loadingGroups ? (
                  <div className="flex items-center justify-center py-4">
                    <Spin size="large" />
                  </div>
                ) : (
                  groups.slice(0, 5).map((group) => (
                    <div key={group.id} className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 ">
                        <AvatarFallback className="bg-blue-600 text-white">
                          {group.teacherName
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{group.groupName}</p>
                        <p className="text-xs text-gray-500">
                          Giảng viên: {group.teacherName}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/sinh-vien/groupStudy">Xem tất cả nhóm</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
export default HomePageStudent;
